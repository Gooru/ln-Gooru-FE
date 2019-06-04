import { moduleForModel, test } from 'ember-qunit';

moduleForModel(
  'serializers/content/activity',
  'Unit | Serializer | serializers/content/activity',
  {
    // Specify the other units that are required for this test.
    needs: ['serializer:serializers/content/activity']
  }
);

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
