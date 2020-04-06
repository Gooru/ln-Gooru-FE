import Ember from 'ember';

export default Ember.Route.extend({
  videConferenceService: Ember.inject.service('api-sdk/video-conference'),

  queryParams: {
    videoConference: {
      refreshModel: true
    }
  },

  // -------------------------------------------------------------------------
  // Dependencies

  model(params) {
    this.get('videConferenceService').fetchConferenceToken();
    if (params.videoConference) {
      window.close();
    }
  },

  setupController(controller) {
    controller.get('classController').selectMenuItem('class-activities');
  },

  // Reset controller properties
  resetController(controller) {
    controller.resetProperties();
  }
});
