import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import Ember from "ember";

moduleForComponent('/class/analytics/performance/teacher/gru-metrics-sub-header', 'Integration | Component | /class/analytics/performance/teacher/gru-metrics-sub-header', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});
test('Metrics Sub Header Layout', function(assert) {
  assert.expect(1);

  this.render(hbs`{{class/analytics/performance/teacher/gru-metrics-sub-header }}`);

  const $component = this.$(); //component dom element
  const $subHeader = $component.find(".metrics-sub-header");

  T.exists(assert, $subHeader, 'Missing sub header section');

});

test('Verify that there is sub header selected', function(assert) {
  assert.expect(1);

  this.on('parentAction', function(option){
    assert.ok(option.get("value") === 'score', "Selected options should be score");
  });


  this.render(hbs`{{class/analytics/performance/teacher/gru-metrics-sub-header onSortChange='parentAction'}}`);
  var $component = this.$(); //component dom element
  var $subHeader = $component.find(".metrics-sub-header");
  $subHeader.find(".score").click(); //select score
});

test('Verify the data picker options selected are in the component', function(assert) {
  assert.expect(3);

  const dataPickerOptionsMock= Ember.A(["score","completion"]);

  this.set('dataPickerOptions', dataPickerOptionsMock);

  this.render(hbs`{{class/analytics/performance/teacher/gru-metrics-sub-header dataPickerOptions=dataPickerOptions}}`);

  var $component = this.$(); //component dom element
  var $subHeader = $component.find(".metrics-sub-header");

  var $score = $subHeader.find(".score");
  T.exists(assert, $score, 'Missing score sub header');

  var $completion = $subHeader.find(".completion");
  T.exists(assert, $completion, 'Missing completion sub header');

  var $studyTime = $subHeader.find(".study-time");
  T.notExists(assert, $studyTime, "study time sub header shouldn't be visible");
});
