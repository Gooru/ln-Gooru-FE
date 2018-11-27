import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller) {
    controller.get('classController').selectMenuItem('students');
    controller.loadStudentsProficiencyData();
  },

  resetController(controller) {
    controller.set('domainLevelSummary', null);
  }
});
