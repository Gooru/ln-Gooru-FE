import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | integration', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: true,
      token: 'token-value'
    });
  }
});


test('teams route to info', function(assert) {
  visit('/integration/teams?token=invalid-token&classId=class-for-pochita-as-teacher&page=info');
  andThen(function() {
    assert.expect(1);
    assert.equal(currentURL(), '/sign-in');
  });
});


test('teams route to incorrect page', function(assert) {
  visit('/integration/teams?token=any-token&classId=class-for-pochita-as-teacher&page=unexistant-page');
  andThen(function() {
    assert.expect(1);
    assert.equal(currentURL(), '/integration/class-for-pochita-as-teacher');
  });
});

test('teams route to info', function(assert) {
  visit('/integration/teams?token=any-token&classId=class-for-pochita-as-teacher&page=info');
  andThen(function() {
    assert.expect(1);
    assert.equal(currentURL(), '/class/class-for-pochita-as-teacher/info');
  });
});

/* TODO This test is broken because we commented code in integration.js. We need to find a different approach for this.
test('teams route to data analytics page in a teacher class', function(assert) {
  visit('/integration/teams?token=any-token&classId=class-for-pochita-as-teacher&page=data');
  andThen(function() {
    assert.expect(1);
    assert.equal(currentURL(), '/class/class-for-pochita-as-teacher/analytics/performance/teacher');
  });
});
*/

test('teams route to data analytics page in a student class', function(assert) {
  visit('/integration/teams?token=any-token&classId=class-for-pochita-as-student&page=data');

  andThen(function() {
    assert.expect(1);
    assert.equal(currentURL(), '/class/class-for-pochita-as-student/analytics/performance/student');
  });
});

test('teams route to overview', function(assert) {
  visit('/integration/teams?token=any-token&classId=class-for-pochita-as-student&page=course-map');

  andThen(function() {
    assert.expect(1);
    assert.equal(currentURL(), '/class/class-for-pochita-as-student/overview?location=7fa6b7d9-7e9b-4465-a38d-3e25fe95f14f%2B3b7ecb54-6fc3-4381-a41d-760516dead16%2B19130c91-6c42-46f5-91da-11238b08c08f');
  });
});
