import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  didRender() {
    let component = this;
    component.$('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
  },

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-player-summary-footer'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered for the next button
     */
    parentNext: function() {
      this.sendAction('parents');
    },

    /**
     * Action triggered when toggle screen mode
     */
    onToggleScreen() {
      let component = this;
      component.sendAction('onToggleScreen');
    },

    onExit(route, id) {
      let component = this;
      let isIframeMode = component.get('isIframeMode');
      if (isIframeMode) {
        window.parent.postMessage('PUllUP_CLOSE', '*');
      } else {
        component.sendAction('onExit', route, id);
      }
    }
  }
});
