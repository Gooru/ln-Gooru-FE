import Ember from 'ember';

export default Ember.Route.extend({

  setupController(controller) {
    controller.get('classController').selectMenuItem('atc-view');
  }
});
