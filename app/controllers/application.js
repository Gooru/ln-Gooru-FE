import Ember from 'ember';
import ConfigurationMixin from 'gooru-web/mixins/configuration';

export default Ember.Controller.extend(ConfigurationMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:session
   */
  session: Ember.inject.service('session'),

  /**
   * @type {ProfileService} Service to retrieve profile information
   */
  profileService: Ember.inject.service('api-sdk/profile'),


  classService: Ember.inject.service('api-sdk/class'),

  /**
   * @property {TenantService}
   */
  tenantService: Ember.inject.service('api-sdk/tenant'),

  // -------------------------------------------------------------------------
  // Attributes

  queryParams: ['themeId', 'lang'],

  /**
   * @property {string} application theme
   */
  themeId: null,

  /**
   * @property {string} application locale
   */
  lang: null,


  /**
   * @property {Tenant} tenant
   */
  tenant: null,

  /**
   * Maintain the state of redirection completed or not
   * @property {Boolean}
   */
  isRedirectionDomainDone: false,

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered after a user has signed in
     * @see sign-in.hbs
     */
    signIn: function() {
      return true;
    },

    /**
     * Action triggered when logging out
     */
    logout: function() {
      return true;
    }
  },
  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {GruTheme} application theme
   */
  theme: null,

  /**
   * @property {ClassesModel} list of user classes
   */
  myClasses: null,

  /**
   * @property {Profile}
   */
  profile: null,
  // -------------------------------------------------------------------------
  // Methods

  loadUserClasses: function() {
    const controller = this;
    const profile = controller.get('profile');
    let profilePromise = profile ?
      Ember.RSVP.resolve(profile) :
      controller
        .get('profileService')
        .readUserProfile(controller.get('session.userId'));

    return profilePromise.then(function(userProfile) {
      controller.set('profile', userProfile);
      return controller
        .get('classService')
        .findMyClasses(userProfile)
        .then(function(classes) {
          controller.set('myClasses', classes);
          return classes;
        });
    });
  },
  /**
   * Reload Session Profile Data
   */
  loadSessionProfile: function(profile) {
    const controller = this;
    const sessionId = controller.get('session.userId');
    let profilePromise = profile ?
      Ember.RSVP.resolve(profile) :
      controller.get('profileService').readUserProfile(sessionId);

    return profilePromise.then(function(userProfile) {
      controller.set('profile', userProfile);
    });
  },

  /**
   * Setups the tenant information
   * @returns {Promise.<Tenant>}
   */
  setupTenant: function() {
    const controller = this;
    const tenantService = controller.get('tenantService');
    return tenantService.findTenantFromCurrentSession().then(function(tenant) {
      controller.set('tenant', tenant);
      return tenant;
    });
  }
});
