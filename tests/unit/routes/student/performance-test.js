import moduleForComponent from 'gooru-web/tests/helpers/module-for-component';
import { test } from 'ember-qunit';

moduleForComponent(
  'route:student/performance',
  'Unit | Route | student/performance',
  {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  }
);

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
