import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import Ember from 'ember';

moduleForComponent(
  'charts/gru-performance-chart',
  'Integration | Component | charts/gru performance chart',
  {
    integration: true
  }
);

test('Layout', function(assert) {
  assert.expect(3);

  var performanceSummary = Ember.Object.create({
    totalCompleted: 3,
    score: 25,
    total: 4
  });

  this.set('performanceSummary', performanceSummary);
  this.render(
    hbs`{{charts/gru-performance-chart performanceSummary=performanceSummary}}`
  );
  const $component = this.$(); //component dom element

  const $performanceChart = $component.find('.gru-performance-chart');
  T.exists(assert, $performanceChart, 'Missing performance chart component');
  assert.equal(
    $performanceChart
      .find('.percentage')
      .text()
      .trim(),
    '25%',
    'Wrong percentage text'
  );
});

test('Layout - Full bar segment', function(assert) {
  assert.expect(2);

  var performanceSummary = Ember.Object.create({
    totalCompleted: 4,
    score: 25,
    total: 4
  });

  this.set('performanceSummary', performanceSummary);
  this.render(
    hbs`{{charts/gru-performance-chart performanceSummary=performanceSummary}}`
  );
  const $component = this.$(); //component dom element

  const $segmentBar = $component.find('.gru-performance-chart .segment');
  assert.ok($segmentBar.hasClass('full'), 'Missing full class');
});
