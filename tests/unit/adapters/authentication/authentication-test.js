import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import Pretender from 'pretender';

moduleFor('adapter:authentication/authentication', 'Unit | Adapter | authentication/authentication', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
  beforeEach: function() {
    this.pretender = new Pretender();
  },
  afterEach: function() {
    this.pretender.shutdown();
  }
});

test('postAuthentication for anonymous account', function(assert) {
  const adapter = this.subject();
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  const data = {
    isAnonymous: true
  };
  const routes = function() {
    this.post('/api/nucleus-auth/v1/token', function(request) {
      let requestBodyJson = JSON.parse(request.requestBody);
      assert.equal('anonymous', requestBodyJson['grant_type']);
      return [200, {'Content-Type': 'application/json'}, JSON.stringify({})];
    }, false);
  };

  this.pretender.map(routes);
  this.pretender.unhandledRequest = function(verb, path) {
    assert.ok(false, `Wrong request [${verb}] url: ${path}`);
  };

  adapter.postAuthentication(data)
    .then(function(response) {
      assert.deepEqual({}, response, 'Wrong response');
    });
});

test('postAuthentication for normal account', function(assert) {
  const adapter = this.subject();
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  const data = {
    isAnonymous: false,
    username: 'username',
    password: 'password'
  };
  const encodedCredentials = window.btoa('username:password');
  const routes = function() {
    this.post('/api/nucleus-auth/v1/token', function(request) {
      let requestBodyJson = JSON.parse(request.requestBody);
      assert.equal('credential', requestBodyJson['grant_type']);
      assert.equal('Basic ' + encodedCredentials, request.requestHeaders['Authorization']);
      return [200, {'Content-Type': 'application/json'}, JSON.stringify({})];
    }, false);
  };

  this.pretender.map(routes);
  this.pretender.unhandledRequest = function(verb, path) {
    assert.ok(false, `Wrong request [${verb}] url: ${path}`);
  };

  adapter.postAuthentication(data)
    .then(function(response) {
      assert.deepEqual({}, response, 'Wrong response');
    });
});
