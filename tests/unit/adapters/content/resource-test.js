import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForAdapter from 'gooru-web/tests/helpers/module-for-adapter';

moduleForAdapter('adapter:content/resource', 'Unit | Adapter | content/resource', {
  // needs: []
});

test('createResource', function(assert) {
  const adapter = this.subject();
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  const data = {
    body: {}
  };
  this.pretender.map(function() {
    this.post('/api/nucleus/v1/resources', function() {
      return [201, {'Content-Type': 'text/plain'}, ''];
    }, false);
  });
  adapter.createResource(data)
    .then(function(response) {
      assert.equal('', response, 'Wrong response');
    });
});

test('readResource', function(assert) {
  const adapter = this.subject();
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  this.pretender.map(function() {
    this.get('/api/nucleus/v1/resources/12345', function() {
      return [200, {'Content-Type': 'application/json'}, JSON.stringify({})];
    }, false);
  });

  this.pretender.unhandledRequest = function(verb, path) {
    assert.ok(false, `Wrong request [${verb}] url: ${path}`);
  };

  adapter.readResource(12345)
    .then(function(response) {
      assert.deepEqual({}, response, 'Wrong response');
    });
});

test('updateResource', function(assert) {
  const adapter = this.subject();
  const expectedData = {
    'short_title': 'The short title'
  };
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  this.pretender.map(function() {
    this.put('/api/nucleus/v1/resources/resource-id', function(request) {
      let requestBodyJson = JSON.parse(request.requestBody);
      assert.deepEqual(requestBodyJson, expectedData, 'Expected request body is not correct');
      return [204, {'Content-Type': 'application/json'}, ''];
    }, false);
  });
  adapter.updateResource('resource-id', expectedData)
    .then(function() {
      assert.ok(true);
    }, function() {
      assert.ok(false, 'Update resource failed');
    });
});
