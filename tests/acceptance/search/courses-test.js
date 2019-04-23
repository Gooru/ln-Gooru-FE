import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | search/courses', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: true,
      token: 'collections-token',
      user: {
        gooruUId: 'collections-token-user-id'
      }
    });
  }
});
