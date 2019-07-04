import Ember from 'ember';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['assessment-performance-data-by-upload-image'],

  /**
   * @property {MediaService} Media service API SDK
   */
  mediaService: Ember.inject.service('api-sdk/media'),

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
   * It maintains the current preview image index.
   * @prop {Integer}
   */
  currentPreviewIndex: 0,

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
     * @function actions:enableButtons
     */
    prepareForSubmission(file) {
      const component = this;
      let selectedFiles = component.get('selectedFiles');
      component.readFile(file).then(function(fileData) {
        selectedFiles.pushObject(Ember.Object.create({
          file: fileData,
          url: fileData.data,
          name: fileData.name
        }));
      });
    },

    onConfirm() {
      const component = this;
      component.set('isDisableButton', true);
      component.uploadImageFiles();
    }
  },

  // -------------------------------------------------------------------------
  // Methods

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

  uploadImageFiles() {
    const component = this;
    let selectedFiles = component.get('selectedFiles');
    let filePromises = selectedFiles.map((selectedFile) => {
      return component.get('mediaService').uploadContentFile(selectedFile.get('file'));
    });
    Promise.all(filePromises).then((uploadedFiles) => {
      const uploadImageContext = component.get('imageContext');
      uploadImageContext.set('image_path', uploadedFiles);
      component.get('i2dService').uploadImage(uploadImageContext);
    });
  }

});
