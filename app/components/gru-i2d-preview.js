import Ember from 'ember';
import { I2D_CONVERSION_STATUS } from 'gooru-web/config/config';
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['gru-i2d-preview'],

  /**
   * @property {I2dService} Media service API SDK
   */
  i2dService: Ember.inject.service('api-sdk/i2d'),

  // -------------------------------------------------------------------------
  // Properties
  /**
   * It maintains the images which needs to display
   * @prop {Array}
   */
  previewContents: null,

  /**
   * List of valid file extensions.
   * @prop {String}
   */
  mimeType: 'image/*',

  /**
   * It maintains the preview content
   * @prop {Array}
   */
  activeContent: Ember.computed('activePreviewIndex', function() {
    const component = this;
    const currentIndexPosition = component.get('activePreviewIndex');
    return component.get('previewContents').objectAt(currentIndexPosition);
  }),

  // -------------------------------------------------------------------------
  // Events

  didInsertElement() {
    const component = this;
    if (component.get('showScoreReview')) {
      component.fetchImageData();
    }
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Action triggered when we click on previous
     */
    onClickPrev() {
      const component = this;
      component
        .$(
          '.image-preview-container #image-preview-carousel-wrapper .carousel-control'
        )
        .addClass('in-active');
      let selectedElement = component.$(
        '.image-preview-container #image-preview-carousel-wrapper .item.active'
      );
      const previewContents = component.get('previewContents');
      let currentIndex = selectedElement.data('item-index');
      let selectedIndex = currentIndex - 1;
      if (currentIndex === 0) {
        selectedIndex = previewContents.length - 1;
      }
      component.set('activePreviewIndex', selectedIndex);
      component
        .$('.image-preview-container #image-preview-carousel-wrapper')
        .carousel('prev');
    },

    /**
     * Action triggered when we click on next
     */
    onClickNext() {
      const component = this;
      component
        .$(
          '.image-preview-container #image-preview-carousel-wrapper .carousel-control'
        )
        .addClass('in-active');
      let selectedElement = component.$(
        '.image-preview-container #image-preview-carousel-wrapper .item.active'
      );
      const previewContents = component.get('previewContents');
      let currentIndex = selectedElement.data('item-index');
      let selectedIndex = currentIndex + 1;
      if (previewContents.length - 1 === currentIndex) {
        selectedIndex = 0;
      }
      component.set('activePreviewIndex', selectedIndex);
      component
        .$('.image-preview-container #image-preview-carousel-wrapper')
        .carousel('next');
    },

    /**
     * Action triggered when we click on thumbnail
     */
    onSelectImage(index) {
      const component = this;
      component.set('activePreviewIndex', index);
      if (component.get('showScoreReview')) {
        component.fetchImageData();
      }
    },

    /**
     * Action triggered when we click on confirm upload button
     */
    onConfirmUpload() {
      const component = this;
      component.sendAction('onConfirmUpload');
    },

    /**
     * Action triggered when we click on confirm score button
     */
    onConfirmScore() {
      const component = this;
      component.sendAction('onConfirmScore');
    },

    /**
     * Action triggered when user clicks on reupload button
     */
    onReUpload() {
      const component = this;
      component.set('selectedFile', component.get('activeContent'));
    },

    /**
     * Action triggered when file loaded from file picker
     */
    prepareForReUpload(file) {
      const component = this;
      component.sendAction('onPrepareForReUpload', file);
    }
  },

  // -------------------------------------------------------------------------
  // Methods
  /**
   * Method is used to fetch image data
   */
  fetchImageData() {
    const component = this;
    const uploadContent = component.get('activeContent');
    component.set('isLoading', true);
    component
      .get('i2dService')
      .fetchImageData(uploadContent.get('id'))
      .then(content => {
        const uploadStatus = content.get('uploadInfo.status');
        const parsedData = content.get('parsedData');
        const conversionErros = content.get('conversionInfo.errorCodes');
        component.set('conversionErros', conversionErros);
        component.set(
          'questions',
          component.parseQuestions(parsedData).sortBy('sequence')
        );
        component.set('studentScores', component.parseScores(parsedData));
        component.set('uploadStatus', uploadStatus);
        component.set(
          'isUploadReadyForReview',
          uploadStatus === I2D_CONVERSION_STATUS.READY_FOR_REVIEW
        );
        component.set('isLoading', false);
      });
  },

  /**
   * Method is used to parse questions
   * @return {Array}
   */
  parseQuestions(data) {
    let questions = data.uniqBy('questionId');
    return questions.map(question => {
      return Ember.Object.create({
        id: question.questionId,
        title: question.questionTitle,
        type: question.questionType,
        maxScore: question.maxScore,
        sequence: question.questionSequence
      });
    });
  },

  /**
   * Method is used to parse scores
   * @return {Array}
   */
  parseScores(data) {
    const component = this;
    let users = data
      .uniqBy('userId')
      .filter(user => user && user.get('userId'));
    return users.map(user => {
      let student = component.parseUserDetails(user);
      let studentData = data.filterBy('userId', student.get('userId'));
      student.set('questions', studentData);
      return student;
    });
  },

  /**
   * Method is used to parse user details
   * @return {Object}
   */
  parseUserDetails(user) {
    return Ember.Object.create({
      userId: user.get('userId'),
      username: user.get('username'),
      email: user.get('email'),
      firstName: user.get('firstName'),
      lastName: user.get('lastName')
    });
  }
});
