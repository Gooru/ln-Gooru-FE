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
      const component = this;
      component
        .$(
          '.image-preview-container #image-preview-carousel-wrapper .carousel-control'
        )
        .addClass('in-active');
      let selectedElement = component.$(
        '.image-preview-container #image-preview-carousel-wrapper .item.active'
      );
      let currentIndex = selectedElement.data('item-index');
      component.set('currentPreviewIndex', currentIndex);
      component
        .$('.image-preview-container #image-preview-carousel-wrapper')
        .carousel('prev');
    },

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
      let currentIndex = selectedElement.data('item-index');
      component.set('currentPreviewIndex', currentIndex);
      component
        .$('.image-preview-container #image-preview-carousel-wrapper')
        .carousel('next');
    },

    onConfirm() {
      const component = this;
      component.sendAction('onConfirm');
    }
  }
});
