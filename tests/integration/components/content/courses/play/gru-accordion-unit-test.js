import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import BuilderItem from 'gooru-web/models/content/builder/item';
import Course from 'gooru-web/models/content/course';
import Lesson from 'gooru-web/models/content/lesson';
import Unit from 'gooru-web/models/content/unit';
import Ember from 'ember';

const unitServiceStub = Ember.Service.extend({

  fetchById(courseId, unitId) {
    if (courseId && unitId) {
      let unit = Unit.create(Ember.getOwner(this).ownerInjection(), {
        bigIdeas: 'Big ideas text',
        essentialQuestions: 'Essential questions text',
        id: '123',
        title: 'Sample Unit Name',
        children: [
          Lesson.create(Ember.getOwner(this).ownerInjection(), {
            id: 'lesson-123',
            sequence: 1,
            title: 'Lesson Title A'
          }),
          Lesson.create(Ember.getOwner(this).ownerInjection(), {
            id: 'lesson-456',
            sequence: 2,
            title: 'Lesson Title B'
          })
        ]
      });
      return Ember.RSVP.resolve(unit);
    } else {
      return Ember.RSVP.reject('Fetch failed');
    }
  }

});

moduleForComponent('content/courses/play/gru-accordion-unit', 'Integration | Component | content/courses/play/gru accordion unit', {
  integration: true,

  beforeEach: function () {
    this.inject.service('i18n');

    this.register('service:api-sdk/unit', unitServiceStub);
    this.inject.service('api-sdk/unit');
  }
});

test('it renders the unit correctly, if the unit has no lessons', function (assert) {

  const unit = BuilderItem.create({
    data: Unit.create(Ember.getOwner(this).ownerInjection(), {
      id: '123',
      title: 'Sample Unit Name'
    }),
    isEditing: false
  });

  this.set('index', 0);
  this.set('unit', unit);
  this.render(hbs`{{content/courses/play/gru-accordion-unit model=unit index=index }}`);

  const $component = this.$('.content.courses.gru-accordion.gru-accordion-unit.view');
  assert.ok($component.length, 'Component');

  const $heading = $component.find('.view .panel-heading');
  assert.equal($heading.find('h3').text(), this.get('i18n').t('common.unit').string + " " + (this.get('index') + 1), 'Header prefix');
  assert.ok($heading.find('strong').text(), unit.get('title'), 'Unit title');
  assert.equal($heading.find('.detail > span').text(), '0 ' + this.get('i18n').t('common.lessonObj', { count: 0}).string, 'Lesson text');

  const $lessonList = $component.find('.view .panel-body ol.accordion-unit');
  assert.ok($lessonList.length, 'Lesson list');
  assert.equal($lessonList.find('li.lesson').length, 0, 'No lessons by default');
});

test('it expands/collapses the unit', function (assert) {

  const unit = BuilderItem.create({
    data: Unit.create(Ember.getOwner(this).ownerInjection(), {
      id: '123'
    }),
    isEditing: false,
    isExpanded: false
  });

  this.on('externalAction', function () {
    assert.ok(true);
  });

  this.set('course', Course.create({
    id: 'course-id-123'
  }));
  this.set('unit', unit);
  this.render(hbs`
    {{content/courses/play/gru-accordion-unit
      course=course
      model=unit
      onExpandUnit=(action 'externalAction') }}
    `);

  const $container = this.$('.content.courses.gru-accordion.gru-accordion-unit > .view');
  assert.ok($container.length, 'Container');
  assert.ok($container.hasClass('collapsed'), 'Container collapsed');


  $container.find('> .panel-heading > h3 > a').click();
  assert.ok($container.hasClass('expanded'), 'Container expanded after clicking header prefix');


  $container.find('> .panel-heading > h3 > a').click();
  assert.ok($container.hasClass('collapsed'), 'Container collapsed after clicking header prefix');


  $container.find('> .panel-heading > strong > a').click();
  assert.ok($container.hasClass('expanded'), 'Container expanded after clicking header title');


  $container.find('> .panel-heading > strong > a').click();
  assert.ok($container.hasClass('collapsed'), 'Container collapsed after clicking header title');
});

test('it loads lessons and renders them after clicking on the unit name', function (assert) {
  const unit = BuilderItem.create({
    data: Unit.create(Ember.getOwner(this).ownerInjection(), {
      id: '123',
      lessonCount: 2
    }),
    isEditing: false,
    isExpanded: false
  });

  //onExpandUnit action must be defined
  this.on('externalAction', function () {});

  this.set('course', Course.create({
    id: 'course-id-123'
  }));
  this.set('unit', unit);
  this.set('isLoaded', false);  // Binding to check on the state
  this.render(hbs`
    {{content/courses/play/gru-accordion-unit
      course=course
      model=unit
      isLoaded=isLoaded
      onExpandUnit=(action 'externalAction') }}
    `);

  const $container = this.$('.content.courses.gru-accordion.gru-accordion-unit > .view');
  assert.ok($container.hasClass('collapsed'), 'Container collapsed');
  assert.ok(!this.get('isLoaded'), 'Data not loaded');

  $container.find('> .panel-heading > strong > a').click();
  assert.ok($container.hasClass('expanded'), 'Container expanded');
  assert.equal($container.find('.panel-heading .detail > span').text(), '2 ' + this.get('i18n').t('common.lessonObj', { count: 2}).string, 'Lesson text');
  assert.equal($container.find('.accordion-unit > li.gru-accordion-lesson').length, 2, 'Number of lessons loaded');
  assert.ok(this.get('isLoaded'), 'Data was loaded');
});
