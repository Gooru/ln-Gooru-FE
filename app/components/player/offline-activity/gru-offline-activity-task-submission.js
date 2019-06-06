import Ember from 'ember';
import { OA_TASK_SUBMISSION_TYPES } from 'gooru-web/config/config';
import { inferUploadType, cleanFilename } from 'gooru-web/utils/utils';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: [
    'offline-activity-player',
    'gru-offline-activity-task-submission'
  ],

  // -------------------------------------------------------------------------
  // Dependencies
  mediaService: Ember.inject.service('api-sdk/media'),

  session: Ember.inject.service('session'),

  offlineActivityService: Ember.inject.service(
    'api-sdk/offline-activity/offline-activity'
  ),

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    const component = this;
    component.setDefaultProperties();
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    //Action triggered when select a file from picker
    onUploadFile(file) {
      const component = this;
      const task = component.get('task');
      let uploadedFiles = task.get('files');
      //add new file
      uploadedFiles.pushObject(file);
      if (component.get('isUploadedRequiredTaskFiles')) {
        component.get('listOfFilesUploads').pushObject(
          Ember.Object.create({
            isFileAvailable: false
          })
        );
      }
      let fileType = inferUploadType(file.name, OA_TASK_SUBMISSION_TYPES);
      file.fileType = fileType ? fileType.value : 'others';
      file.icon = OA_TASK_SUBMISSION_TYPES.findBy('value', file.fileType).icon;
    },

    //Action triggered when click on save
    onSaveTask() {
      const component = this;
      component.set('isSubmittingTask', true);
      component.uploadFilesToS3().then(function() {
        component.set('isSubmittingTask', false);
        component.submitTaskDetails(component.createTaskSubmissionPayload());
        component.actions.onToggleTask(component);
      });
    },

    //Action triggered when click on toggle task container
    onToggleTask(component = this) {
      component.toggleProperty('isTaskExpanded');
      component.$('.task-details-container').slideToggle();
    },

    //Action triggered when click on remove selected file
    onRemoveFile(filePos) {
      this.removeFile(filePos);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Array} studentTaskSubmissions
   * Property for list of student submission respective to task
   */
  studentTaskSubmissions: Ember.computed(
    'task.studentTaskSubmissions',
    function() {
      const component = this;
      const studentTaskSubmissions = component.get(
        'task.studentTaskSubmissions'
      );
      return studentTaskSubmissions ? studentTaskSubmissions : Ember.A([]);
    }
  ),

  /**
   * @property {Array} studentTaskUploadSubmission
   * Property for list of student task upload submissions
   */
  studentTaskUploadSubmission: Ember.computed.filter(
    'studentTaskSubmissions',
    function(taskSubmission) {
      return taskSubmission.submissionType === 'uploaded';
    }
  ),

  /**
   * @property {Array} studentTaskUrlSubmission
   * Property for list of student task url submissions
   */
  studentTaskUrlSubmission: Ember.computed.filter(
    'studentTaskSubmissions',
    function(taskSubmission) {
      return taskSubmission.submissionType === 'remote';
    }
  ),

  /**
   * @property {Array} oaTaskSubmissions
   * Property to capture student submissions
   */
  oaTaskSubmissions: Ember.computed.alias('task.oaTaskSubmissions'),

  /**
   * @property {Array} oaTaskUploadSubmissions
   * Property to capture student uploaded submissions
   */
  oaTaskUploadSubmissions: Ember.computed.filter('oaTaskSubmissions', function(
    submission
  ) {
    return submission.get('taskSubmissionType') === 'uploaded';
  }),

  /**
   * @property {Number} mandatoryUploads
   * Property for number of mandatory upload count
   */
  mandatoryUploads: Ember.computed('oaTaskSubmissions', function() {
    const component = this;
    const oaTaskSubmissions = component.get('oaTaskSubmissions');
    const uploadSubmissions = oaTaskSubmissions.filter(
      submission => submission.get('taskSubmissionType') === 'uploaded'
    );
    return uploadSubmissions.length;
  }),

  /**
   * @property {Array} oaTaskRemoteSubmissions
   * Property to capture student added url submissions
   */
  oaTaskRemoteSubmissions: Ember.computed.filter('oaTaskSubmissions', function(
    submission
  ) {
    return submission.get('taskSubmissionType') === 'remote';
  }),

  /**
   * @property {Number} mandatoryUrls
   * Property for number of mandatory url submissions
   */
  mandatoryUrls: Ember.computed('oaTaskRemoteSubmissions', function() {
    const component = this;
    return component.get('oaTaskRemoteSubmissions.length');
  }),

  /**
   * @property {Boolean} isUploadedRequiredTaskFiles
   * Property to check is student uploaded required files
   */
  isUploadedRequiredTaskFiles: Ember.computed(
    'task.files.[]',
    'studentTaskUploadSubmission',
    function() {
      const component = this;
      let uploadedFiles = component.get('task.files');
      let mandatoryUploads = component.get('mandatoryUploads');
      let studentTaskUploadSubmission = component.get(
        'studentTaskUploadSubmission.length'
      );
      return uploadedFiles
        ? uploadedFiles.length + studentTaskUploadSubmission >= mandatoryUploads
        : false;
    }
  ),

  /**
   * @property {Boolean} isAddedRequiredTaskUrls
   * Property to check is student added required urls
   */
  isAddedRequiredTaskUrls: Ember.computed(
    'task.urls.@each.value',
    'studentTaskUrlSubmission',
    function() {
      const component = this;
      let taskUrls = component.get('task.urls');
      let mandatoryUrls = component.get('mandatoryUrls');
      let studentTaskUrlSubmission = component.get(
        'studentTaskUrlSubmission.length'
      );
      let uploadedUrls = taskUrls
        ? taskUrls.filter(url => url.value)
        : Ember.A([]);
      return uploadedUrls.length + studentTaskUrlSubmission >= mandatoryUrls;
    }
  ),

  /**
   * @property {Boolean} isEnableTaskSubmission
   * Property to check whether to enable or not save button
   */
  isEnableTaskSubmission: Ember.computed(
    'task.urls.@each.value',
    'task.files.[]',
    'task.submissionText',
    function() {
      const component = this;
      let addedUrls = component.get('task.ulrs')
        ? component
          .get('task.urls')
          .filter(url => !url.get('isSubmittedUrl') && url.get('value'))
        : false;
      let addedFiles = component.get('task.files')
        ? component.get('task.files').length
        : false;
      let addedAnswerText = component.get('task.submissionText');
      return addedUrls || addedFiles || addedAnswerText;
    }
  ),

  /**
   * @property {Array} typeBasedMandatoryUploads
   * Property for list of type based mandatory submission count
   */
  typeBasedMandatoryUploads: Ember.computed(function() {
    const component = this;
    const oaTaskUploadSubmissions = component.get('oaTaskSubmissions');
    let typeBasedMandatoryUploads = Ember.A([]);
    OA_TASK_SUBMISSION_TYPES.map(submissionType => {
      let type = submissionType.value;
      let typeBasedSubmission = oaTaskUploadSubmissions.filterBy(
        'taskSubmissionSubType',
        type
      );
      if (typeBasedSubmission.length) {
        let typeBasedSubmissionCount = Ember.Object.create({
          type,
          mandatorySubmissionCount: typeBasedSubmission.length,
          isUploaded: false,
          pendingCount: typeBasedSubmission.length
        });
        typeBasedMandatoryUploads.pushObject(typeBasedSubmissionCount);
      }
    });
    return typeBasedMandatoryUploads;
  }),

  /**
   * @property {Boolean} isTaskExpanded
   */
  isTaskExpanded: true,

  /**
   * @property {String} contentSource
   * Property for content source send to Analytics
   * TODO hardcoded due to currently support available at DCA
   */
  contentSource: 'dailyclassactivity',

  /**
   * @property {UUID} userId
   */
  userId: Ember.computed.alias('session.userId'),

  /**
   * @property {UUID} classId
   */
  classId: null,

  /**
   * @property {UUId} caContentId
   */
  caContentId: null,

  /**
   * @property {Array} listOfFilesUploads
   * Property to handle the visibility of number of files needs to be uploaded
   */
  listOfFilesUploads: Ember.computed('mandatoryUploads', function() {
    const component = this;
    let studentTaskUploadSubmission = component.get(
      'studentTaskUploadSubmission.length'
    );
    let mandatoryUploads = component.get('mandatoryUploads');
    let defaultUploadCount = mandatoryUploads - studentTaskUploadSubmission;
    defaultUploadCount = defaultUploadCount <= 0 ? 1 : defaultUploadCount;
    let arrayWithDefaultLength = new Array(defaultUploadCount);
    return arrayWithDefaultLength.fill(
      Ember.Object.create({
        isFileAvailable: false
      })
    );
  }),

  /**
   * @property {Boolean} isStudentSubmitted
   * Property to check whether the student has submitted this task
   */
  isStudentSubmitted: Ember.computed.gte('studentTaskSubmissions.length', 1),

  /**
   * Maintains the mode the component view
   * @type {Boolean}
   */
  isReadOnly: false,

  /**
   * Maintains the value of show the submissions or not
   * @type {Boolean}
   */
  showSubmissions: false,

  /**
   * Maintains the value of show toggle or not
   * @type {Boolean}
   */
  showToggle: false,

  /*
   * @property {Number} timespentInMilliSec
   * Property for student submitted timespent in millisec
   */
  timespentInMilliSec: 0,

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function uploadFilesToS3
   * Method to upload list of files into S3
   */
  uploadFilesToS3() {
    const component = this;
    let files = component.get('task.files');
    let uploadedFilesPromise = files.map(file => {
      return component.uploadFileIntoS3(file).then(function(fileObject) {
        return fileObject;
      });
    });
    return Ember.RSVP.allSettled(uploadedFilesPromise);
  },

  /**
   * @function uploadFileIntoS3
   * Method to upload given file into S3
   */
  uploadFileIntoS3(fileObject) {
    const component = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      return Ember.RSVP
        .hash({
          fileLocation: component
            .get('mediaService')
            .uploadContentFile(fileObject)
        })
        .then(({ fileLocation }) => {
          let cdnUrls = component.get('session.cdnUrls');
          let UUIDFileName = cleanFilename(fileLocation, cdnUrls);
          return resolve((fileObject.UUIDFileName = UUIDFileName));
        }, reject);
    });
  },

  /**
   * @function submitTaskDetails
   * Method to send student task submissions into Analytics
   */
  submitTaskDetails(taskSubmissionPayload) {
    const component = this;
    component
      .get('offlineActivityService')
      .oaTaskSubmissions(taskSubmissionPayload);
  },

  /**
   * @function createTaskSubmissionPayload
   * Method to create task submission request payload
   */
  createTaskSubmissionPayload() {
    const component = this;
    const task = component.get('task');
    const userId = component.get('userId');
    const contentSource = component.get('contentSource');
    const classId = component.get('classId');
    const caContentId = component.get('caContentId');
    let taskSubmissions = [];
    let uploadedFiles = task.get('files');
    uploadedFiles.map(uploadedFile => {
      let submissionContext = Ember.Object.create({
        submissionValue: uploadedFile.UUIDFileName,
        submissionType: 'uploaded',
        submissionSubType: uploadedFile.fileType
      });
      taskSubmissions.push(
        component.getTaskSubmissionContext(submissionContext)
      );
    });
    //fetch only newly added urls
    let submissionUrls = task
      .get('urls')
      .filter(
        taskUrl => taskUrl.get('value') && !taskUrl.get('isSubmittedUrl')
      );
    submissionUrls.map(submissionUrl => {
      let submissionContext = Ember.Object.create({
        submissionValue: submissionUrl.get('value'),
        submissionType: 'remote',
        submissionSubType: 'url'
      });
      taskSubmissions.push(
        component.getTaskSubmissionContext(submissionContext)
      );
    });
    if (!taskSubmissions.length) {
      //if no uploads are available, send submission text alone
      taskSubmissions = [
        {
          task_id: task.get('id'),
          submission_info: null,
          submission_text: task.get('submissionText'),
          submission_type: null,
          submission_subtype: null
        }
      ];
    }
    return {
      student_id: userId,
      class_id: classId,
      oa_dca_id: parseInt(caContentId),
      oa_id: task.get('oaId'),
      content_source: contentSource,
      submissions: taskSubmissions
    };
  },

  /**
   * @function getTaskSubmissionContext
   * Metho to create individual submission payload
   */
  getTaskSubmissionContext(submissionContext) {
    const component = this;
    const task = component.get('task');
    return {
      task_id: task.get('id'),
      submission_info: submissionContext.get('submissionValue'),
      submission_text: task.get('submissionText'),
      submission_type: submissionContext.get('submissionType'),
      submission_subtype: submissionContext.get('submissionSubType')
    };
  },

  /**
   * @function removeFile
   * Method to remove selected file
   */
  removeFile() {
    return true;
  },

  /**
   * @function setDefaultProperties
   * Method to set default values to properties
   */
  setDefaultProperties() {
    const component = this;
    component.set('task.files', Ember.A([]));
    component.set('task.urls', component.get('oaTaskRemoteSubmissions'));
    component.set('fileUploadErrors', Ember.A());
    if (component.get('isStudentSubmitted')) {
      let studentTaskUrlSubmission = component.get('studentTaskUrlSubmission');
      let taskUrls = component.get('task.urls');
      studentTaskUrlSubmission.forEach(function(taskUrlSubmission, urlIndex) {
        let taskUrl = taskUrls.objectAt(urlIndex);
        if (taskUrl) {
          taskUrl.set('value', taskUrlSubmission.submissionInfo);
          taskUrl.set('isSubmittedUrl', true);
        } else {
          taskUrls.pushObject(
            Ember.Object.create({
              value: taskUrlSubmission.submissionInfo,
              isSubmittedUrl: true
            })
          );
        }
      });
    }
  }
});
