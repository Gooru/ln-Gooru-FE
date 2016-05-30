import Ember from 'ember';

export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {ProfileService} Service to retrieve profile information
   */
  profileService: Ember.inject.service('api-sdk/profile'),


  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function() {
    //TODO check for path
  },

  /**
   * Get model for the controller
   */
  model: function(params) {
    let route = this;
    let profile = null;
    let userId = params.userId;
    if (userId) {
      let isUsername = !/-.*-/.exec(userId);
      profile = isUsername ?
        route.get('profileService').readUserProfileByUsername(params.userId) :
        route.get('profileService').readUserProfile(params.userId);
    }

    return Ember.RSVP.hash({
      profile: profile
    });
  },

  redirect: function(){
    const currentUrl = this.get("router.url");
    const isRoot = !/^\/(.*)\//.exec(currentUrl);
    if (isRoot) {
      this.transitionTo("profile.content.courses");
    }
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.set('profile', model.profile);
  },

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Triggered when a class menu item is selected
     * @param {string} item
     */
    selectMenuItem: function(item){
      const route = this;
      const controller = route.get('controller');
      const currentMenuItem = controller.get('menuItem');
      controller.selectMenuItem(item);

      if (currentMenuItem !== item) {
        if (item === 'content'){
          route.transitionTo('profile.' + item + '.courses');
        }else if (item === 'network'){
          route.transitionTo('profile.' + item + '.following');
        }
        else {
          route.transitionTo('profile.' + item);
        }
      }
    }

  }

  // -------------------------------------------------------------------------
  // Events

});
