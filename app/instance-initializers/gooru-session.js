import Ember from 'ember';
import { getParameterByName } from 'gooru-web/utils/utils';

/**
 * Initialize session
 */
export function initialize(application) {
  const sessionService = application.lookup('service:session');
  const internalSession = application.lookup('session:main');

  internalSession.reopen({
    /**
     * Restores the session, if the session does not exist then creates a new session for an anonymous user
     * @returns {Ember.RSVP.Promise}
     */
    restore: function() {
      return new Ember.RSVP.Promise((resolve, reject) => {
        this._super().then(resolve, function() {
          let nonce = getParameterByName('nonce');
          sessionService.authenticateAsAnonymous(nonce).then(resolve, reject);
        });
      });
    }
  });
}

export default {
  name: 'gooru-session',
  after: 'gooru-session-service',
  initialize: initialize
};
