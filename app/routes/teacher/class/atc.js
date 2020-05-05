import Ember from 'ember';

export default Ember.Route.extend({
  // Actions
  actions: {
    willTransition() {
      const viewport = Ember.$('head meta[name="viewport"]');
      viewport.attr(
        'content',
        'width=device-width, initial-scale=1, maximum-scale=12, user-scalable=1'
      );
    },
    didTransition() {
      const viewport = Ember.$('head meta[name="viewport"]');
      viewport.attr(
        'content',
        'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
      );
      // Load crosswalk framework for given class subject and framework
      this.get('controller')
        .get('classController')
        .loadCrosswalkFramework();
    }
  },

  setupController(controller) {
    controller.get('classController').selectMenuItem('atc');
  },

  resetController(controller) {
    controller.set('activeMonth', moment().format('MM'));
    controller.set('selectedSecondary', null);
    controller.set('activeYear', moment().format('YYYY'));
  }
});
