import Ember from 'ember';

export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Methods

  setupController(controller) {
    controller.init();
  }
});
