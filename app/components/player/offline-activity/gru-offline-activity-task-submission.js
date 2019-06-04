import Ember from 'ember';
import { OA_TASK_SUBMISSION_TYPES } from 'gooru-web/config/config';
import { inferUploadType } from 'gooru-web/utils/utils';

export default Ember.Component.extend({
  classNames: [
    'offline-activity-player',
    'gru-offline-activity-task-submission'
  ],

  mediaService: Ember.inject.service('api-sdk/media'),

  session: Ember.inject.service('session'),

  offlineActivityService: Ember.inject.service(
    'api-sdk/offline-activity/offline-activity'
  ),

  didInsertElement() {
    const component = this;
    component.setDefaultProperties();
  },

  actions: {
    onUploadFile(file) {
      const component = this;
      const task = component.get('task');
      let uploadedFiles = task.get('files');
      let existingFile = uploadedFiles.findBy('name', file.name);
      if (existingFile) {
        //overwrite existing file
        let uploadedFilePos = uploadedFiles.indexOf(existingFile);
        uploadedFiles[uploadedFilePos] = file;
      } else {
        //add new file
        uploadedFiles.pushObject(file);
        if (component.get('isUploadedRequiredTaskFiles')) {
          component.get('listOfFilesUploads').pushObject(
            Ember.Object.create({
              isFileAvailable: false
            })
          );
        }
      }
      let fileType = inferUploadType(file.name, OA_TASK_SUBMISSION_TYPES);
      file.fileType = fileType.value || 'others';
      file.icon = OA_TASK_SUBMISSION_TYPES.findBy('value', file.fileType).icon;
    },

    onSaveTask() {
      const component = this;
      component.set('isSubmittingTask', true);
      component.uploadFilesToS3().then(function() {
        component.set('isSubmittingTask', false);
        component.submitTaskDetails(component.createTaskSubmissionPayload());
      });
    },

    onToggleTask() {
      this.toggleProperty('isTaskExpanded');
      this.$('.task-details-container').slideToggle();
    },

    onRemoveFile(filePos) {
      this.removeFile(filePos);
    }
  },

  oaTaskSubmissions: Ember.computed.alias('task.oaTaskSubmissions'),

  oaTaskUploadSubmissions: Ember.computed.filter('oaTaskSubmissions', function(
    submission
  ) {
    // const component = this;
    return submission.get('taskSubmissionType') === 'uploaded';
    // return oaTaskSubmissions.filter(submission => submission.get('taskSubmissionType') === 'uploaded');
  }),

  mandatoryUploads: Ember.computed('oaTaskSubmissions', function() {
    const component = this;
    const oaTaskSubmissions = component.get('oaTaskSubmissions');
    const uploadSubmissions = oaTaskSubmissions.filter(
      submission => submission.get('taskSubmissionType') === 'uploaded'
    );
    return uploadSubmissions.length;
  }),

  oaTaskRemoteSubmissions: Ember.computed.filter('oaTaskSubmissions', function(
    submission
  ) {
    // const component = this;
    // const oaTaskSubmissions = component.get('oaTaskSubmissions');
    // return oaTaskSubmissions.filter(submission => submission.taskSubmissionType === 'remote');
    return submission.get('taskSubmissionType') === 'remote';
  }),

  mandatoryUrls: Ember.computed('oaTaskRemoteSubmissions', function() {
    const component = this;
    return component.get('oaTaskRemoteSubmissions.length');
  }),

  isUploadedRequiredTaskFiles: Ember.computed('task.files.[]', function() {
    const component = this;
    let uploadedFiles = component.get('task.files');
    let mandatoryUploads = component.get('mandatoryUploads');
    return uploadedFiles ? uploadedFiles.length >= mandatoryUploads : false;
  }),

  isAddedRequiredTaskUrls: Ember.computed('task.urls.@each.value', function() {
    const component = this;
    let taskUrls = component.get('task.urls');
    let mandatoryUrls = component.get('mandatoryUrls');
    let uploadedUrls = taskUrls
      ? taskUrls.filter(url => url.value)
      : Ember.A([]);
    return uploadedUrls.length === mandatoryUrls;
  }),

  isEnableTaskSubmission: Ember.computed(
    'isUploadedRequiredTaskFiles',
    'isAddedRequiredTaskUrls',
    'task.submissionText',
    function() {
      const component = this;
      const isUploadedRequiredTaskFiles = component.get(
        'isUploadedRequiredTaskFiles'
      );
      const isAddedRequiredTaskUrls = component.get('isAddedRequiredTaskUrls');
      const taskSubmissionText = component.get('task.submissionText');
      return (
        isUploadedRequiredTaskFiles &&
        isAddedRequiredTaskUrls &&
        taskSubmissionText
      );
    }
  ),

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

  isTaskExpanded: true,

  contentSource: 'dailyclassactivity',

  userId: Ember.computed.alias('session.userId'),

  classId: null,

  caContentId: null,

  listOfFilesUploads: Ember.computed('mandatoryUploads', function() {
    const component = this;
    let arrayWithDefaultLength = new Array(component.get('mandatoryUploads'));
    return arrayWithDefaultLength.fill(
      Ember.Object.create({ isFileAvailable: false })
    );
  }),

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

  uploadFileIntoS3(fileObject) {
    const component = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      return Ember.RSVP
        .hash({
          UUIDFileName: component
            .get('mediaService')
            .uploadContentFile(fileObject)
        })
        .then(({ UUIDFileName }) => {
          return resolve((fileObject.UUIDFileName = UUIDFileName));
        }, reject);
    });
  },

  submitTaskDetails(taskSubmissionPayload) {
    const component = this;
    component
      .get('offlineActivityService')
      .oaTaskSubmissions(taskSubmissionPayload);
  },

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
    let submissionUrls = task.get('urls');
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

  removeFile() {
    return true;
  },

  setDefaultProperties() {
    const component = this;
    component.set('task.files', Ember.A([]));
    component.set('task.urls', component.get('oaTaskRemoteSubmissions'));
    component.set('fileUploadErrors', Ember.A());
  }
});
