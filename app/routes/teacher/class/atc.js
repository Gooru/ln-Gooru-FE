import Ember from 'ember';

export default Ember.Route.extend({

  setupController(controller) {
    controller.get('classController').selectMenuItem('atc');
    controller.initializeController();
  },

  resetController(controller) {
    controller.set('activeMonth', moment().format('MM'));
    controller.set('activeYear', moment().format('YYYY'));
  }
});
