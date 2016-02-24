import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:events/collection-play', 'Unit | Adapter | events/collection-play', {});

test('Post event to stop the collection play', function(assert) {
  const adapter = this.subject();
  const data = {
    query: {apiKey: 'api-1'},
    body: {
      eventName:"collection.play",
      context: {
        type: 'stop'
      }
    }

  };
  const url = adapter.postData(data);

  assert.equal(url, '/api/nucleus-insights/v1/api/nucleus-insights/v1/event?apiKey=api-1', 'Wrong url');
  assert.equal(data.body.eventName, 'collection.play', 'Wrong event name');
  assert.equal(data.body.context.type, 'stop', 'The type should be stop');
});

test('Post event to start the collection play', function(assert) {
  const adapter = this.subject();
  const data = {
    query: {apiKey: 'api-1'},
    body: {
      eventName:"collection.play",
      context: {
        type: 'start'
      }
    }

  };
  const url = adapter.postData(data);

  assert.equal(url, '/api/nucleus-insights/v1/api/nucleus-insights/v1/event?apiKey=api-1', 'Wrong url');
  assert.equal(data.body.eventName, 'collection.play', 'Wrong event name');
  assert.equal(data.body.context.type, 'start', 'The type should be start');
});



