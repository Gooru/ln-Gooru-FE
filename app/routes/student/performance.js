import Ember from 'ember';

export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @type {I18nService} Service to retrieve translations information
   */
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller) {
    controller.loadData();
  },

  deactivate: function() {
    this.get('controller').resetValues();
  }
});
