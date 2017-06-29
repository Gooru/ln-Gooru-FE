import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('library/gru-partner-library-card', 'Integration | Component | library/gru partner library card', {
  integration: true
});

test('Partner Library card', function(assert) {

  var library = {
    id: 1,
    name: 'Partner library',
    image: 'image-url',
    tenant: 'tenant-id',
    tenantRoot: null,
    courseCount: 5,
    assessmentCount: 12,
    collectionCount: 15,
    resourceCount: 0,
    questionCount: 45,
    rubricCount: 1,
    sequence: 1,
    taxonomy: null
  };

  this.set('library', library);

  this.render(hbs`{{library/gru-partner-library-card content=library}}`);
  const $component = this.$('.gru-partner-library-card');
  assert.ok($component.length, 'Component found');

  const $header = $component.find('.panel-heading');
  assert.ok($header.length, 'Missing header');
  assert.ok($header.find('.image img').length, 'Missing image');

  const $info = $header.find('.library-info');
  assert.ok($info.length, 'Missing library info container');
  assert.ok($info.find('.title-section h3').length, 'Missing name');

  const $countsContainer = $info.find('.counts-info');
  assert.equal($countsContainer.length, 2, 'Wrong number of counts container');
  assert.equal($countsContainer.find('.total-courses').text().trim(), '5 Courses', 'Wrong label for courses count');
  assert.equal($countsContainer.find('.total-collections').text().trim(), '15 Collections', 'Wrong label for collections count');
  assert.equal($countsContainer.find('.total-assessments').text().trim(), '12 Assessments', 'Wrong label for assessments count');
  assert.equal($countsContainer.find('.total-resources').text().trim(), '0 Resource', 'Wrong label for resources count');
  assert.equal($countsContainer.find('.total-questions').text().trim(), '45 Questions', 'Wrong label for questions count');
  assert.equal($countsContainer.find('.total-rubrics').text().trim(), '1 Rubric', 'Wrong label for rubrics count');

});
