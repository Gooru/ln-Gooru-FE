import Ember from 'ember';

export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  offlineActivityService: Ember.inject.service(
    'api-sdk/offline-activity/offline-activity'
  ),

  // -------------------------------------------------------------------------
  // Events
  model(queryParams) {
    const route = this;
    const offlineActivityId = queryParams.offlineActivityId;
    const offlineActivityService = route.get('offlineActivityService');
    return Ember.RSVP.hash({
      offlineActivity: offlineActivityId
        ? offlineActivityService.readActivity(offlineActivityId)
        : {}
    }).then(({ offlineActivity }) => {
      return Ember.Object.create({
        offlineActivity
      });
    });
  },

  setupController(controller, model) {
    controller.set('offlineActivity', model.get('offlineActivity'));
    controller.loadOfflineActivitySubmissions();
  },

  resetController(controller) {
    controller.set('offlineActivity', {});
    controller.set('isPreview', false);
    controller.set('offlineActivitySubmissions', null);
  }
});
