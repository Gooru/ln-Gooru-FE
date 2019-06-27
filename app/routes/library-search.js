import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    libraryId: {
      refreshModel: true
    },
    type: {
      refreshModel: true
    },
    profileId: {
      refreshModel: true
    },
    isBack: {
      refreshModel: true
    },
    term: {
      refreshModel: true
    },
    activeContentType: false
  },

  /**
   * @type {libraryService} Library service object
   */
  libraryService: Ember.inject.service('api-sdk/library'),

  /**
   * @type {ProfileService} Service to retrieve profile information
   */
  profileService: Ember.inject.service('api-sdk/profile'),

  /**
   * @property {Service} session
   */
  session: Ember.inject.service('session'),

  // -------------------------------------------------------------------------
  // Methods

  model: function(params) {
    const libraryId = params.libraryId;
    const profileId = params.profileId
      ? params.profileId
      : !this.get('session.isAnonymous') ? this.get('session.userId') : null;
    return Ember.RSVP.hash({
      library: libraryId
        ? this.get('libraryService').fetchById(libraryId)
        : null,
      profile: profileId
        ? this.get('profileService').readUserProfile(profileId)
        : null
    });
  },

  setupController: function(controller, model) {
    controller.set('library', model.library);
    controller.set('profile', model.profile);
    controller.initializeSelectedFilter();
    if (controller.get('term')) {
      controller.searchByParams(controller.get('term'));
    } else {
      controller.fetchContent();
    }
  },

  resetController(controller) {
    var queryParams = controller.get('queryParams');
    queryParams.forEach(function(param) {
      controller.set(param, undefined);
    });
    controller.resetProperties();
  }
});
