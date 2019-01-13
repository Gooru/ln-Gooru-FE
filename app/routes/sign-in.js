import Ember from 'ember';
import PublicRouteMixin from 'gooru-web/mixins/public-route-mixin';

export default Ember.Route.extend(PublicRouteMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * The session service.
   * @property session
   * @readOnly
   */
  session: Ember.inject.service('session'),

  /**
   * @requires service:notifications
   */
  notifications: Ember.inject.service(),

  /**
   * @requires service:authentication
   */
  authenticationService: Ember.inject.service('api-sdk/authentication'),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Maintains the state of anonymous session data.
   * @type {Session}
   */
  anonymousSessionData: null,

  // -------------------------------------------------------------------------
  // Methods
  model: function(params) {
    return params;
  },

  beforeModel(transition) {
    let nonce = transition.queryParams.nonce;
    let route = this;
    let authenticationService = this.get('authenticationService');
    return authenticationService.authenticateAsAnonymous(nonce).then(data => {
      route.set('anonymousSessionData', data);
      return route
        .get('session')
        .authenticateAsAnonymousWithData(data)
        .then(() => {
          let applicationController = route.controllerFor('application');
          return Ember.RSVP.all([applicationController.setupTenant()]);
        });
    });
  },

  /**
   * Set all controller properties used in the template
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    // remove old notifications
    this.get('notifications').remove();
    controller.set('redirectURL', model.redirectURL);
    controller.set('anonymousSessionData', this.get('anonymousSessionData'));
    controller.resetProperties();
    this.handleRedirectionBasedOnDomain(controller);
  },

  /**
   * Verfiy the domain have any directions before model get execute.
   */
  handleRedirectionBasedOnDomain: function(controller) {
    let domain = window.location.hostname;
    let redirectURL = this.get('controller').get('redirectURL');
    this.get('authenticationService')
      .domainBasedRedirection(domain, redirectURL)
      .then(function(data) {
        if (data && data.statusCode === 303) {
          window.location.href = data.redirectUrl;
        } else {
          controller.set('isRedirectionDomainDone', true);
        }
      });
  }
});
