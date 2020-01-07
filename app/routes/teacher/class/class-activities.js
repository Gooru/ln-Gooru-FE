import Ember from 'ember';

export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  setupController(controller) {
    controller.get('classController').selectMenuItem('class-activities');
  },

  // Reset controller properties
  resetController(controller) {
    controller.resetProperties();
  }
});
