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
  previewContent: null,

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
      const previewContent = component.get('previewContent');
      let currentIndex = selectedElement.data('item-index');
      let selectedIndex = currentIndex - 1;
      if (currentIndex === 0) {
        selectedIndex = previewContent.length - 1;
      }
      component.set('currentPreviewIndex', selectedIndex);
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
      const previewContent = component.get('previewContent');
      let currentIndex = selectedElement.data('item-index');
      let selectedIndex = currentIndex + 1;
      if (previewContent.length - 1 === currentIndex) {
        selectedIndex = 0;
      }
      component.set('currentPreviewIndex', selectedIndex);
      component
        .$('.image-preview-container #image-preview-carousel-wrapper')
        .carousel('next');
    },

    onConfirmUpload() {
      const component = this;
      component.sendAction('onConfirmUpload');
    },

    onConfirmScore() {
      const component = this;
      component.sendAction('onConfirmScore');
    }
  }
});
