import Ember from 'ember';

/**
 * Initialize session validation function
 */
export function initialize(application) {
  const sessionService = application.lookup('service:session');
  //  const sessionAPIService = application.lookup('service:api-sdk/session');

  Ember.$(document).ajaxStart(function() {
    //sessionAPIService.updateNetworkStatus(true);
  });

  Ember.$(document).ajaxStop(function() {
    //sessionAPIService.updateNetworkStatus(false);
  });

  Ember.$(document).ajaxError(function(event, jqXHR) {
    //sessionAPIService.updateNetworkStatus(false);

    if (jqXHR.status === 401) {
      let url = window.location.href;
      let hasAccessTokenInRequestParam = url.indexOf('access_token') > 0;
      if (hasAccessTokenInRequestParam) {
        window.location.href = '/sign-in';
      } else {
        sessionService.invalidate();
      }
    }
  });
}

export default {
  name: 'gooru-session-validation',
  after: 'gooru-session-service',
  initialize: initialize
};
