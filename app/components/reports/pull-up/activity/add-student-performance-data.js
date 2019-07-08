import Ember from 'ember';
import {
  CONTENT_TYPES
} from 'gooru-web/config/config';
import {
  cleanFilename
} from 'gooru-web/utils/utils';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['add-data', 'add-student-performance-data'],

  /**
   * @property {I2dService} Media service API SDK
   */
  i2dService: Ember.inject.service('api-sdk/i2d'),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    onClosePullUp() {
      this.sendAction('onClosePullUp');
    },

    onSelectOption(option) {
      this.set('selectedOption', option.name);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * It maintains the assessment Id.
   * @prop {String}
   */
  collectionId: Ember.computed.alias('collection.id'),

  /**
   * It maintains the format
   * @prop {String}
   */
  format: Ember.computed.alias('collection.format'),

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

  uploadedFiles: Ember.A([]),

  /**
   * It maintains the content is whether assessment or not
   * @prop {String}
   */
  isAsessmentAddData: Ember.computed('contentType', function() {
    const component = this;
    const contentType = component.get('contentType');
    return (
      contentType === CONTENT_TYPES.ASSESSMENT ||
      contentType === CONTENT_TYPES.EXTERNAL_ASSESSMENT
    );
  }),

  // -------------------------------------------------------------------------
  // Events
  init() {
    const component = this;
    component._super(...arguments);
    if (component.get('isAsessmentAddData')) {
      component.searchImageUpload();
    }
  },

  //Methods
  searchImageUpload() {
    const component = this;
    component.set('isLoading', true);
    component.get('i2dService')
      .searchImage(component.serializeUploadContext())
      .then((result) => {
        component.set('isLoading', false);
        if (result.length) {
          component.set('selectedOption', 'upload-image');
          component.serializeUploadedFiles(result);
        }
      });
  },

  /**
   * Serialize data of uploaded images
   * @return {Object}
   */
  serializeUploadedFiles(uploads) {
    const component = this;
    let uploadedFiles = Ember.A([]);
    let reviewedUpload = uploads.findBy('status', -1); //Change the status value to 3 for appropiate review status
    const isReviewed = !!reviewedUpload;
    component.set('isImagePreview', isReviewed);
    uploads.map((item) => {
      component.get('i2dService').fetchImageData(item.get('id')).then((content) => {
        uploadedFiles.pushObject(Ember.Object.create({
          url: item.get('imagePath'),
          isUpload: true,
          isError: false,
          content,
          isConversionError: item.get('status') === -1,
          name: cleanFilename(item.get('imagePath'))
        }));
      });
    });
    component.set('uploadedFiles', uploadedFiles);
  },

  /**
   * Serialize context of image upload
   * @return {Object}
   */
  serializeUploadContext() {
    const component = this;
    let imageUploadContext = Ember.Object.create({
      ctx_class_id: component.get('classId'),
      ctx_class_code: component.get('classCode'),
      ctx_source: 'ca',
      item_real_id: component.get('collectionId'),
      item_code: `${component.get('classCode')}${component.get('activityId')}`,
      item_type: component.get('format'),
      ctx_course_id: null,
      ctx_item_id: component.get('activityId'),
      ctx_unit_id: null,
      ctx_lesson_id: null,
      ctx_collection_id: null,
      ctx_path_id: 0,
      ctx_path_type: null
    });
    component.set('imageUploadContext', imageUploadContext);
    return imageUploadContext;
  }
});
