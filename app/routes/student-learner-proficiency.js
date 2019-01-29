import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    let route = this;
    route._super(...arguments);
  }
});
