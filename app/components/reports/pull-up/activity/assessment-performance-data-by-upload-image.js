import Ember from 'ember';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';
import { addProtocolIfNecessary } from 'gooru-web/utils/utils';
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
   * List of error messages to present to the user for conditions that the loaded image does not meet
   * @prop {String[]}
   */
  filePickerErrors: Ember.A([]),

  /**
   * List of assessment questions
   * @prop {Array}
   */
  assessmentQuestions: Ember.A([]),

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
   * @prop {Integer}
   */
  showConfirm: false,

  // uploadedStudentScores: Ember.computed('selectedFiles.@each.content.parsedData.[]',
  //   'assessmentQuestions',
  //   function() {
  //     const component = this;
  //     const uploadedFiles = this.get('selectedFiles');
  //     let studentScores = component.parseConvertedData(uploadedFiles);
  //     return studentScores;
  //   }),

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
        selectedFiles.pushObject(
          Ember.Object.create({
            file: fileData,
            url: fileData.data,
            name: fileData.name,
            isUpload: false
          })
        );
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
        selectedFile.set('isUpload', false);
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
              selectedFile.set('isUpload', true);
              resolve(addProtocolIfNecessary(imageId));
            },
            error => {
              selectedFile.set('isUpload', false);
              reject(error);
            }
          );
      });
    });
    Promise.all(filePromises).then(uploadedFiles => {
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
  }
});
