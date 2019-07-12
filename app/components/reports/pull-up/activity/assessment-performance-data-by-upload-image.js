import Ember from 'ember';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';
import { addProtocolIfNecessary, generateUUID } from 'gooru-web/utils/utils';
import ModalMixin from 'gooru-web/mixins/modal';
export default Ember.Component.extend(ModalMixin, {
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['assessment-performance-data-by-upload-image'],

  /**
   * @property {MediaService} Media service API SDK
   */
  mediaService: Ember.inject.service('api-sdk/media'),

  /**
   * @property {AssessmentService} assessment service API SDK
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  /**
   * @requires service:notifications
   */
  notifications: Ember.inject.service(),

  /**
   * @property {I2dService} Media service API SDK
   */
  i2dService: Ember.inject.service('api-sdk/i2d'),

  // -------------------------------------------------------------------------
  // Properties
  /**
   * List of selected files
   * @prop {Array}
   */
  selectedFiles: Ember.A([]),

  /**
   * List of assessment questions
   * @prop {Array}
   */
  questions: Ember.A([]),

  /**
   * List of valid file extensions.
   * @prop {String}
   */
  mimeType: 'image/*',

  /**
   * It maintains the assessment Id.
   * @prop {String}
   */
  assessmentId: Ember.computed.alias('assessment.id'),

  /**
   * It maintains the format
   * @prop {String}
   */
  format: Ember.computed.alias('assessment.format'),

  /**
   * It maintains the id of course.
   * @prop {String}
   */
  courseId: Ember.computed.alias('course.id'),

  /**
   * It maintains the activity id.
   * @prop {String}
   */
  activityId: Ember.computed.alias('activityData.id'),

  /**
   * It maintains the whether button is disable or not.
   * @prop {Boolean}
   */
  isDisableButton: false,

  /**
   * It maintains the index position of current preview image.
   * @prop {Integer}
   */
  currentPreviewIndex: 0,

  /**
   * It maintains the whether we need to show confirm button or not.
   * @prop {Boolean}
   */
  showConfirm: false,

  /**
   * It maintains the whether we need to show toggle buttons or not.
   * @prop {Boolean}
   */
  showToggle: false,

  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  taxonomyTags: Ember.computed('assessment.standards.[]', function() {
    var standards = this.get('assessment.standards');
    if (standards) {
      standards = standards.filter(function(standard) {
        return !TaxonomyTagData.isMicroStandardId(standard.get('id'));
      });
    }
    return TaxonomyTag.getTaxonomyTags(standards);
  }),
  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Action triggered when user select any file.
     */
    prepareForSubmission(file) {
      const component = this;
      component.set('showConfirm', true);
      let selectedFiles = component.get('selectedFiles');
      component.readFile(file).then(function(fileData) {
        let uploadedFile = Ember.Object.create({
          file: fileData,
          url: fileData.data,
          name: fileData.name,
          isUploadSuccess: false
        });
        selectedFiles.pushObject(uploadedFile);
      });
    },

    /**
     * Action triggered when user select any file for re-upload.
     */
    prepareForReUpload(file) {
      const component = this;
      component.set('showConfirm', true);
      let selectedFile = component.get('selectedFile');
      component.readFile(file).then(function(fileData) {
        selectedFile.set('file', fileData);
        selectedFile.set('url', fileData.data);
        selectedFile.set('name', fileData.name);
        selectedFile.set('isUploadSuccess', false);
      });
    },

    /**
     * Action triggered when user click re-upload button.
     */
    onReUpload(selectedFile) {
      const component = this;
      component.set('selectedFile', selectedFile);
    },

    /**
     * Action triggered when user confirms the upload.
     */
    onConfirmUpload() {
      const component = this;
      component.set('isDisableButton', true);
      component.uploadImageFiles();
    },

    /**
     * Action triggered when user select student score button.
     */
    showStudentScores() {
      const component = this;
      component.set('showScoreReview', true);
    },

    /**
     * Action triggered when user select image preview button.
     */
    showImagePreview() {
      const component = this;
      component.set('showScoreReview', false);
    }

    /**
     * Action triggered when user select confirm score button.
     */
    // onConfirmScore() {
    //   const component = this;
    //   console.log(this.get('studentScores'));
    // }
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * It is used to convert the selected file to data url
   * @return {Promise Object}
   */
  readFile(file) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      const reader = new FileReader();
      reader.onloadend = function() {
        file.data = reader.result;
        resolve(file);
      };
      if (file) {
        reader.readAsDataURL(file);
      } else {
        reject();
      }
    });
  },

  /**
   * It is used to upload the selected filees to s3 and BE
   */
  uploadImageFiles() {
    const component = this;
    let selectedFiles = component.get('selectedFiles').filterBy('file');
    let filePromises = selectedFiles.map(selectedFile => {
      return new Ember.RSVP.Promise(function(resolve, reject) {
        return component
          .get('mediaService')
          .uploadContentFile(selectedFile.get('file'))
          .then(
            imageId => {
              selectedFile.set('isUploadSuccess', true);
              resolve(
                Ember.Object.create({
                  url: addProtocolIfNecessary(imageId),
                  id: selectedFile.get('id')
                })
              );
            },
            error => {
              selectedFile.set('isUploadFailed', true);
              reject(error);
            }
          );
      });
    });
    Promise.all(filePromises).then(imagePaths => {
      let reUploadedFiles = imagePaths.filterBy('id');
      let uploadedFiles = imagePaths
        .rejectBy('id')
        .map(image => image.get('url'));
      if (reUploadedFiles.length) {
        reUploadedFiles.map(uploadFile => {
          let request = Ember.Object.create({
            image_path: uploadFile.get('url')
          });
          component
            .get('i2dService')
            .replaceImage(uploadFile.get('id'), request)
            .then(() => {
              component.notifyUploadSuccess();
            });
        });
      }
      if (uploadedFiles.length) {
        const imageUploadContext = component.get('imageUploadContext');
        imageUploadContext.set('image_path', uploadedFiles);
        component
          .get('i2dService')
          .uploadImage(imageUploadContext)
          .then(() => {
            let model = {
              onConfirm: function() {
                component.sendAction('onClosePullUp');
              }
            };
            component.actions.showModal.call(
              component,
              'content.modals.i2d-message-dialog',
              model
            );
          });
      }
    });
  },

  notifyUploadSuccess() {
    const component = this;
    component.get('notifications').setOptions({
      positionClass: 'toast-top-full-width',
      toastClass: 'gooru-toast',
      timeOut: 10000
    });
    const successMsg = component.get('i18n').t('upload-success');
    component.get('notifications').success(successMsg);
  },

  /**
   * @function getAssessmentDataParams
   */
  getAssessmentDataParams() {
    let component = this;
    let questions = component.get('questions');
    let assessmentResources = Ember.A([]);
    let activeStudent = component.get('activeStudent');
    let activityData = component.get('activityData');
    let activityId = activityData.get('id');
    let conductedOn = new Date(activityData.activation_date) || new Date();
    let classId = component.get('classId');
    let assessment = component.get('assessment');
    let courseId = component.get('course') ? component.get('course').id : null;
    questions.map(question => {
      let resourceData = {
        resource_id: question.get('id'),
        resource_type: 'question',
        question_type: question.get('type'),
        score: Number(question.get('score')) || 0,
        max_score: question.get('maxScore'),
        time_spent: component.get('questionTimespent')
      };
      assessmentResources.push(resourceData);
    });
    let studentPerformanceData = {
      tenant_id: component.get('session.tenantId') || null,
      student_id: activeStudent.get('id'),
      session_id: generateUUID(),
      class_id: classId,
      collection_id: assessment.get('id'),
      collection_type: 'assessment',
      content_source: component.get('contentSource'),
      time_zone: component.get('timeZone'),
      conducted_on: conductedOn.toISOString(),
      path_id: 0,
      path_type: null,
      resources: assessmentResources,
      course_id: courseId,
      additionalContext: btoa(
        JSON.stringify({
          dcaContentId: activityId
        })
      )
    };
    return studentPerformanceData;
  }
});
