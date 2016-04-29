import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import Course from 'gooru-web/models/content/course';

moduleForComponent('content/courses/gru-course-edit', 'Integration | Component | content/courses/gru course edit', {
  integration: true
});

test('it has header and main sections', function (assert) {

  var course = Course.create(Ember.getOwner(this).ownerInjection(), {
    title: "Course Title"
  });

  this.set('course', course);
  this.render(hbs`{{content/courses/gru-course-edit course=course}}`);

  var $container = this.$("article.content.courses.gru-course-edit");
  assert.ok($container.length, "Component");

  const $header = $container.find('> header');
  assert.ok($header.length, "Header");
  assert.ok($header.find('> .actions').length, "Header actions");
  assert.equal($header.find('> .actions > button').length, 5, "Number of header actions");
  assert.ok($header.find('> nav').length, "Header navigation");
  assert.equal($header.find('> nav > a').length, 3, "Number of header navigation links");

  assert.equal($container.find('> section').length, 3, "Number of edit sections");
  assert.ok($container.find('> section#information').length, "Information section");
  assert.ok($container.find('> section#builder').length, "Builder section");
  assert.ok($container.find('> section#settings').length, "Settings section");
});
