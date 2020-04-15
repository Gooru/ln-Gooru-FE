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

  beforeModel() {
    this.get('videConferenceService').fetchConferenceToken();
  },

  model(params) {
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
