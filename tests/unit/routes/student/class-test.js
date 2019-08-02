import moduleForComponent from 'gooru-web/tests/helpers/module-for-component';
import { test } from 'ember-qunit';

moduleForComponent('route:student/class', 'Unit | Route | student/class', {
  // Specify the other units that are required for this test.
  /* needs: [
    'service:api-sdk/authentication',
    'service:api-sdk/session',
    'service:api-sdk/class',
    'service:api-sdk/performance',
    'service:api-sdk/course',
    'service:api-sdk/unit',
    'service:api-sdk/navigate-map',
    'service:api-sdk/skyline-initial',
    'service:api-sdk/competency'
  ] */
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
