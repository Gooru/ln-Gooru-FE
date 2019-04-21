import Ember from 'ember';
export default Ember.Controller.extend({

  /**
   * @type {Controller} Application controller
   */
  appController: Ember.inject.controller('application'),

  /**
   * @property {Profile} Session Profile
   */
  sessionProfile: Ember.computed.alias('appController.profile')

});
