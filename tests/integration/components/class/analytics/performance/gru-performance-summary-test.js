import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import Ember from 'ember';

moduleForComponent('class/analytics/performance/gru-performance-summary', 'Integration | Component | class/analytics/performance/gru performance summary', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('Test for performance summary on valid unit values', function(assert) {
  const performance = Ember.Object.create(
     {
        title: "Quiz :: Indian History",
        type: "unit",
        score:75,
        completionDone: 0,
        completionTotal: 1,
        timeSpent: 4852359,
        isUnitOrLesson:true,
        ratingScore: 0,
        attempts: 2,
        isCompleted: false,
        hasStarted: true,
        displayableTimeSpent: "1h 30m"
      });

  this.set('performance', performance);


  this.render(hbs`{{class.analytics.performance.gru-performance-summary performance=performance}}`);

  const $component = this.$(); //component dom element

  const $performanceSummary = $component.find(".gru-performance-summary");

  T.exists(assert, $performanceSummary, 'Missing performance summary');

  const $scoreSummary = $component.find(".score .score-box");
  T.exists(assert, $scoreSummary, 'Missing Score summary');


  const $completionSummary = $component.find(".completion .gru-completion-chart");
  T.exists(assert, $completionSummary, 'Missing Completion summary');


  const $timeSpentSummary = $component.find(".timeSpent p");

  assert.equal(T.text($timeSpentSummary), "1h 30m", "Wrong time spent text ");

  const $attemptSummary = $component.find(".attempts p");
  assert.equal(T.text($attemptSummary), "2", "Wrong attempts text");
});

test('Test for performance summary on invalid unit values', function(assert) {
  const performance = Ember.Object.create(
    {
      title: "Quiz :: Indian History",
      type: "unit",
      completionTotal: 2,
      completionDone: 1,
      ratingScore: 0,
      isCompleted: false,
      hasStarted: true,
      isUnitOrLesson:true,
      isCollectionOrAssessment:false
    });

  this.set('performance', performance);


  this.render(hbs`{{class.analytics.performance.gru-performance-summary performance=performance selectedOption='scores'}}`);

  const $component = this.$(); //component dom element

  const $scoreSummary = $component.find(".score p");
  assert.equal(T.text($scoreSummary), "N/A", "Wrong score text");

  const $completionSummary = $component.find(".completion .gru-completion-chart");
  T.exists(assert, $completionSummary, 'Missing Completion summary');

  const $reactionSummary = $component.find(".reaction p");
  assert.equal(T.text($reactionSummary), "", "Wrong reaction summary text");

  const $timeSpentSummary = $component.find(".timeSpent p");
  assert.equal(T.text($timeSpentSummary), "", "Wrong time spent text");

  const $attemptSummary = $component.find(".attempts p");
  assert.equal(T.text($attemptSummary), "–", "Wrong attempt summary text");

});

test('Test for performance summary on selected reaction', function(assert) {
  const performance = Ember.Object.create(
    {
      title: "Quiz :: Indian History",
      type: "unit",
      completionTotal: 1,
      ratingScore: 0,
      isCompleted: false,
      hasStarted: true,
      isUnitOrLesson:true,
      isCollectionOrAssessment:false
    });

  this.set('performance', performance);


  this.render(hbs`{{class.analytics.performance.gru-performance-summary performance=performance selectedOption='reaction'}}`);

  const $component = this.$(); //component dom element

  const $reactionSummary = $component.find(".reaction.selected");
  T.exists(assert, $reactionSummary, 'Missing Reaction summary ');


});

