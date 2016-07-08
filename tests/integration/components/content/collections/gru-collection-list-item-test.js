import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import Question from 'gooru-web/models/content/question';
import Resource from 'gooru-web/models/content/resource';
import { RESOURCE_TYPES } from 'gooru-web/config/config';
import { QUESTION_CONFIG } from 'gooru-web/config/question';

moduleForComponent('content/collections/gru-collection-list-item', 'Integration | Component | content/collections/gru collection list item', {
  integration: true,

  beforeEach: function () {
    this.inject.service('i18n');
  }
});

test('it renders resources correctly', function (assert) {

  const resource = Resource.create({
    title: 'Resource Title'
  });

  this.set('resource', resource);
  this.set('index', 0);
  this.set('isSorting', false);
  this.render(hbs`{{content/collections/gru-collection-list-item model=resource index=index isSorting=isSorting}}`);

  const $component = this.$('li.content.collections.gru-collection-list-item');
  assert.ok($component.length, 'Component');

  const $container = $component.find('.panel-heading');
  assert.ok($container.find('> h3').text(), 1, 'Index');
  assert.ok($container.find('> a strong').text(), this.get('resource.title'), 'Resource title');
  assert.notOk($container.find('.drag-icon .drag_handle').length, 'Drag icon should be hidden');

  //TODO: check when there are standards
  assert.ok($container.find('> .detail > span').text(), this.get('i18n').t('common.add-standard').string, 'No standards text');

  const $actions = $container.find('> .detail > .actions');
  assert.ok($actions.length, 'Actions container');

  assert.ok($actions.find('button:eq(0)').hasClass('add-item'), 'First action button');
  assert.ok($actions.find('button:eq(1)').hasClass('narration'), 'Second action button');
  assert.ok($actions.find('button:eq(2)').hasClass('delete-item'), 'Third action button');
  assert.ok($actions.find('button:eq(3)').hasClass('copy-to'), 'Fourth action button');
  assert.ok($actions.find('button:eq(4)').hasClass('move-item'), 'Five action button');
  assert.ok($actions.find('button:eq(5)').hasClass('copy-item'), 'Six action button');
  assert.ok($actions.find('button:eq(6)').hasClass('edit-item'), 'Seven action button');

  RESOURCE_TYPES.forEach(function(type_string) {

    // Check icons and subtitles specific to each resource type
    Ember.run(() => {
      this.set('resource.format', type_string);
    });
    assert.ok($container.find('> a > i').hasClass(type_string + '-icon'), 'Resource icon');
    assert.ok($container.find('> a span').text(),
      this.get('i18n').t('common.resource').string + ' | ' + this.get('i18n').t('common.resource-format.' + type_string).string, 'Resource subtitle');

  }.bind(this));

  this.set('isSorting', true);
  assert.ok($container.find('.drag-icon .drag_handle').length, 'Drag icon should be appear');

});

test('it renders questions correctly', function (assert) {

  const question = Question.create({
    title: 'Question Title',
    format: 'question'
  });

  this.set('question', question);
  this.set('index', 0);
  this.render(hbs`{{content/collections/gru-collection-list-item model=question index=index}}`);

  const $component = this.$('li.content.collections.gru-collection-list-item');
  assert.ok($component.length, 'Component');

  const $container = $component.find('.panel-heading');
  assert.ok($container.find('> h3').text(), 1, 'Index');
  assert.ok($container.find('> a > i').hasClass('question-icon'), 'Question icon');
  assert.ok($container.find('> a strong').text(), this.get('question.title'), 'Question title');

  //TODO: check when there are standards
  assert.ok($container.find('> .detail > span').text(), this.get('i18n').t('common.add-standard').string, 'No standards text');

  const $actions = $container.find('> .detail > .actions');
  assert.ok($actions.length, 'Actions container');

  assert.ok($actions.find('button:eq(0)').hasClass('add-item'), 'First action button');
  assert.ok($actions.find('button:eq(1)').hasClass('narration'), 'Second action button');
  assert.ok($actions.find('button:eq(2)').hasClass('delete-item'), 'Third action button');
  assert.ok($actions.find('button:eq(3)').hasClass('move-item'), 'Fourth action button');
  assert.ok($actions.find('button:eq(4)').hasClass('copy-item'), 'Third action button');
  assert.ok($actions.find('button:eq(5)').hasClass('edit-item'), 'Fourth action button');

  Object.keys(QUESTION_CONFIG).forEach(function(question_type) {
    // Check subtitle specific to each question type
    Ember.run(() => {
      this.set('question.type', question_type);
    });

    assert.ok($container.find('> a span').text(),
      this.get('i18n').t('common.question').string + ' | ' + this.get('i18n').t('common.question-type.' + question_type).string, 'Question subtitle');
  }.bind(this));

});

test('it expands/collapses the narration panel', function (assert) {

  const question = Question.create(Ember.getOwner(this).ownerInjection(), {
    title: 'Question Title',
    format: 'question'
  });

  this.set('question', question);
  this.set('index', 0);
  this.render(hbs`{{content/collections/gru-collection-list-item model=question index=index}}`);

  const $panel = this.$('li.content.collections.gru-collection-list-item > .panel');
  assert.ok($panel.length, 'Panel');
  assert.ok($panel.hasClass('collapsed'), 'Panel collapsed');

  $panel.find('.detail.visible .actions button.narration i').click();

  assert.ok($panel.hasClass('expanded'), 'Narration Panel expanded after clicking narration button');

  assert.ok($panel.find('> .panel-body').length, 'panel body');

  assert.ok($panel.find('> .panel-body .narration .gru-textarea').length, 'Narration Field');

  $panel.find('.detail .actions .narration').click();
  assert.ok($panel.hasClass('collapsed'), 'Narration Panel collapsed after clicking narration button');

});
