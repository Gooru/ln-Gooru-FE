import Ember from 'ember';
export default Ember.Route.extend({
  queryParams: {
    context: {
      refreshModel: true
    }
  },
  model(params) {
    return params;
  },
  setupController: function(controller, model) {
    controller
      .get('guestController')
      .send('authenticate', model.userType, model.context || null);
  }
});
