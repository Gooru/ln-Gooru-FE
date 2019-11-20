import Ember from 'ember';

export default Ember.Controller.extend({
  parentController: Ember.inject.controller('profile'),

  userProfile: Ember.computed.alias('parentController.profile'),

  userPreference: Ember.computed.alias('parentController.userPreference')
});
