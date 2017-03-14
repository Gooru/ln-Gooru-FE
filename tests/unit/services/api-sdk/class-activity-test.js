import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';

moduleForService('service:api-sdk/class-activity', 'Unit | Service | api-sdk/class-activity', {
});

test('addContentToClass', function(assert) {
  const service = this.subject();

  assert.expect(5);

  service.set('classActivityAdapter', Ember.Object.create({
    addContentToClass: function(classId, contentId, contentType, context) {
      assert.equal(classId, 123, 'Wrong class id');
      assert.equal(contentId, 321, 'Wrong content id');
      assert.equal(contentType, 'assessment', 'Wrong content type');
      assert.equal(context, 'any context', 'Wrong context');
      return Ember.RSVP.resolve(true);
    }
  }));

  var done = assert.async();
  service.addContentToClass(123, 321, 'assessment', 'any context')
    .then(function(response) {
      assert.ok(response, 'fake-response', 'Wrong response');
      done();
    });
});


test('enableClassContent', function(assert) {
  const service = this.subject();

  assert.expect(4);

  service.set('classActivityAdapter', Ember.Object.create({
    enableClassContent: function(classId, contentId, activationDate) {
      assert.equal(classId, 123, 'Wrong class id');
      assert.equal(contentId, 321, 'Wrong content id');
      assert.equal(activationDate, 'any activation date', 'Wrong activation date');
      return Ember.RSVP.resolve(true);
    }
  }));

  var done = assert.async();
  service.enableClassContent(123, 321, 'any activation date')
    .then(function(response) {
      assert.ok(response, 'fake-response', 'Wrong response');
      done();
    });
});

test('findClassContent', function(assert) {
  const service = this.subject();

  assert.expect(4);

  service.set('classActivityAdapter', Ember.Object.create({
    findClassContent: function(classId, contentType) {
      assert.equal(classId, 123, 'Wrong class id');
      assert.equal(contentType, 'any content type', 'Wrong content type');
      return Ember.RSVP.resolve('fake-payload');
    }
  }));

  service.set('classActivitySerializer', Ember.Object.create({
    normalizeFindClassActivities: function(payload) {
      assert.equal(payload, 'fake-payload', 'Wrong payload');
      return Ember.RSVP.resolve([]);
    }
  }));

  var done = assert.async();
  service.findClassContent(123, 'any content type')
    .then(function(response) {
      assert.ok(response, 'fake-response', 'Wrong response');
      done();
    });
});
