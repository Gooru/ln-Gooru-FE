import Ember from 'ember';

export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  session: Ember.inject.service('session'),
  i18n: Ember.inject.service(),

  setupController: function(controller) {
    controller.initControllerFromRoute();
  }
});
