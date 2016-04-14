import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('content/questions/gru-questions-edit', 'Integration | Component | content/questions/gru questions edit', {
  integration: true
});

test('it has header and main sections', function (assert) {

  this.render(hbs`{{content/questions/gru-questions-edit}}`);

  var $container = this.$("article.content.questions.gru-questions-edit");
  assert.ok($container.length, "Component");

  const $header = $container.find('> header');
  assert.ok($header.length, "Header");
  assert.ok($header.find('> .actions').length, "Header actions");
  assert.equal($header.find('> .actions > button').length, 4, "Number of header actions");
  assert.ok($container.find('.actions button.delete').length, "Missing Delete Button");
  assert.ok($container.find('.actions button.share').length, "Missing Share Button");
  assert.ok($container.find('.actions button.add').length, "Missing Add Button");
  assert.ok($container.find('.actions button.preview').length, "Missing Add Button");

  assert.ok($header.find('> nav').length, "Header navigation");
  assert.equal($header.find('> nav > a').length, 3, "Number of header navigation links");

  assert.equal($container.find('> section').length, 3, "Number of edit sections");
  assert.ok($container.find('> section#information').length, "Information section");
  assert.ok($container.find('> section#builder').length, "Builder section");
  assert.ok($container.find('> section#settings').length, "Settings section");
});

test('Layout of the settings section', function (assert) {
  this.render(hbs`{{content/questions/gru-questions-edit}}`);

  var $settingsSection = this.$("#settings");
  assert.ok($settingsSection.find('.header h2').length, "Section title");
  assert.ok($settingsSection.find('.panel-heading h3').length, "Panel subtitle");
  assert.ok($settingsSection.find('.panel-body .setting.publish-to i.visibility').length, "Visibility icon");
  assert.ok($settingsSection.find('.panel-body .setting.publish-to i.visibility + span').length, "Visibility label");
  assert.ok($settingsSection.find('.panel-body .gru-switch .toggle').length, "Profile toggle button");
  assert.ok($settingsSection.find('.panel-body .setting.request-to i.public').length, "Public icon");
  assert.ok($settingsSection.find('.panel-body .setting.request-to i.public + span').length, "Public label");
});
