import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['gru-image-preview'],

  // -------------------------------------------------------------------------
  // Properties
  /**
   * It maintains the images which needs to display
   * @prop {Array}
   */
  previewImages: null,

  actions: {
    onClickPrev() {
      let component = this;
      component
        .$(
          '.image-preview-container #image-preview-carousel-wrapper .carousel-control'
        )
        .addClass('in-active');
      component
        .$('.image-preview-container #image-preview-carousel-wrapper')
        .carousel('prev');
    },

    onClickNext() {
      let component = this;
      component
        .$(
          '.image-preview-container #image-preview-carousel-wrapper .carousel-control'
        )
        .addClass('in-active');
      component
        .$('.image-preview-container #image-preview-carousel-wrapper')
        .carousel('next');
    }
  }
});
