import Ember from 'ember';

export default Ember.Route.extend({
  //
  // Actions
  actions: {
    didTransition() {
      let $viewport = Ember.$('head meta[name="viewport"]');
      $viewport.attr(
        'content',
        'width=device-width, initial-scale=1, maximum-scale=4'
      );
    },
    willTransition() {
      let $viewport = Ember.$('head meta[name="viewport"]');
      $viewport.attr(
        'content',
        'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
      );
    }
  },

  setupController(controller) {
    controller.get('classController').selectMenuItem('atc');
    controller.initializeController();
  },

  resetController(controller) {
    controller.set('activeMonth', moment().format('MM'));
    controller.set('activeYear', moment().format('YYYY'));
  }
});
