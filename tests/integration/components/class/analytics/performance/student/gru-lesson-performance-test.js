import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import Ember from 'ember';
import wait from 'ember-test-helpers/wait';

// Stub performance service

moduleForComponent('class/analytics/performance/student/gru-lesson-performance', 'Integration | Component | class/analytics/performance/student/gru lesson performance', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('Test for started lesson performance', function(assert) {
  const lesson = Ember.Object.create(
    {
      id:'333-555-777',
      title: "Quiz :: Indian History",
      type: "lesson",
      score:75,
      completionDone: 0,
      completionTotal: 1,
      timeSpent: 4852359,
      ratingScore: 0,
      isCompleted: true,
      hasStarted: true,
      collections:Ember.A([
        Ember.Object.create({
          id:'first-collection-id',
          title: "Indian History Collection",
          type: "collection",
          score:75,
          completionDone: 1,
          completionTotal: 1,
          timeSpent: 4852359,
          ratingScore: 0,
          isCompleted: true,
          isCollection: true,
          hasStarted:true
        }),
        Ember.Object.create({
          id:'second-collection-id',
          title: "Indian History Assessment",
          type: "assessment",
          score:75,
          completionDone: 0,
          completionTotal: 1,
          timeSpent: 442359,
          ratingScore: 0,
          isCompleted: false,
          isAssessment: true
        })
      ])
    });
  this.set('lesson', lesson);
  this.set('index',0);
  this.set('selectedLessonId', 'not-my-id');
  this.set('onSelectLesson', function(){
    assert.ok(true, "This should be called 1 time");
  });
  assert.expect(12);
  this.render(hbs`{{class.analytics.performance.student.gru-lesson-performance
    lesson=lesson
    localIndex=index
    index=index
    onSelectLesson=onSelectLesson
    selectedLessonId=selectedLessonId
  }}`);
  const $component = this.$();

  T.exists(assert, $component, 'Missing Lesson Container');

  const $lessonTitle = $component.find(".lesson-performance-content .title .section-title");

  assert.equal($lessonTitle.text().trim(), "L1:     Quiz :: Indian History", "Wrong title");

  const $clickableAnchor= $component.find(".gru-lesson-performance-container a"); //component dom element
  T.exists(assert, $clickableAnchor, 'Missing Clickable Anchor');

  Ember.run(() => {
    $clickableAnchor.click();
  });

  return wait().then(function() {
    const $collectionsContainer = $component.find(".collections-container");
    assert.equal($collectionsContainer.hasClass('in'), true, "Collections container did not open");

    const $firstCollection = $component.find("div.collections-container div.collection-performance:first-child");
    T.exists(assert, $firstCollection, 'Missing First collection');

    const $collectionTitle = $component.find(".collections-container .collection-performance .collection-performance-content .title .section-title");
    T.exists(assert, $collectionTitle, 'Missing collection Title');
    assert.equal($collectionTitle.text().trim(), "C1:     Indian History CollectionA1:     Indian History Assessment", "Wrong title");

    const $collectionRedoButton = $component.find(".collections-container .collection-performance:nth-child(2) .collection-performance-content .title button.collection-redo-button");
    T.exists(assert, $collectionRedoButton, 'Missing collection redo button');
    assert.equal($collectionRedoButton.hasClass('collection-redo-button'), true, "Redo class from button missing");

    const $collectionViewReportButton = $component.find(".collections-container .collection-performance.collection-performance:nth-child(1) .collection-performance-content .title button.collection-view-report-button");
    T.exists(assert, $collectionViewReportButton, 'Missing collection view report button');
    assert.equal($collectionViewReportButton.hasClass('collection-view-report-button'), true, "View report class from second button missing");

  });
});

test('Test for not started lesson performance', function(assert) {
  const lesson = Ember.Object.create(
    {
      id:'333-555-777',
      title: "Quiz :: Indian History",
      type: "lesson",
      score:75,
      completionDone: 0,
      completionTotal: 1,
      timeSpent: 4852359,
      ratingScore: 0,
      hasStarted: false,
      collections:Ember.A([
        Ember.Object.create({
          id:'first-collection-id',
          title: "Indian History Collection",
          type: "collection",
          score:75,
          completionDone: 0,
          completionTotal: 1,
          timeSpent: 4852359,
          ratingScore: 0,
          isCompleted: false,
          isCollection: true,
          hasStarted:true
        }),
        Ember.Object.create({
          id:'second-collection-id',
          title: "Indian History Assessment",
          type: "assessment",
          score:75,
          completionDone: 5,
          completionTotal: 5,
          timeSpent: 442359,
          ratingScore: 0,
          isCompleted: true,
          hasStarted:false,
          isAssessment: true
        }),
        Ember.Object.create({
          id:'third-collection-id',
          title: "Indian History Assessment",
          type: "assessment",
          score:75,
          completionDone: 0,
          completionTotal: 1,
          timeSpent: 0,
          ratingScore: 0,
          isCompleted: true,
          hasStarted:false,
          isAssessment: true
        })
      ])
    });

  this.set('lesson', lesson);
  this.set('index',0);
  this.set('selectedLessonId', 'not-my-id');
  this.set('onSelectLesson', function(){
    assert.ok(true, "This should be called 1 time");
  });

  assert.expect(11);

  this.render(hbs`{{class.analytics.performance.student.gru-lesson-performance
    lesson=lesson
    localIndex=index
    index=index
    selectedLessonId=selectedLessonId
    onSelectLesson=onSelectLesson
  }}`);
  const $component = this.$();

  T.exists(assert, $component, 'Missing Lesson Container');

  const $lessonTitle = $component.find(".lesson-performance-content .title .section-title");

  assert.equal($lessonTitle.text().trim(), "L1:     Quiz :: Indian History", "Wrong title");

  const $clickableAnchor= $component.find(".gru-lesson-performance-container a"); //component dom element
  T.exists(assert, $clickableAnchor, 'Missing Clickable Anchor');

  const $arrowRightIcon = $component.find(".lessons-container .title .icon i.keyboard_arrow_right");
  T.exists(assert, $arrowRightIcon, "Missing arrow right icon");

  Ember.run(() => {
    $clickableAnchor.click();
  });

  assert.ok($arrowRightIcon.hasClass("keyboard_arrow_down"), "Missing arrow down icon");

  return wait().then(function() {

    const $firstCollection = $component.find("div.collections-container div.collection-performance:nth-child(2)");
    T.exists(assert, $firstCollection, 'Missing Second collection');

    const $collectionTitle = $component.find(".collections-container .collection-performance .collection-performance-content .title .section-title");
    T.exists(assert, $collectionTitle, 'Missing collection Title');

    assert.equal($collectionTitle.text().trim(), "A2: Indian History Assessment", "Wrong title");

    const $collectionStudyButton = $component.find(".collections-container div:first-child .collection-performance-title div button:first-child");

    T.exists(assert, $collectionStudyButton, 'Missing collection study button');


    assert.equal($collectionStudyButton.hasClass('collection-study-button'), true, "Study class from first button missing");



  });


});
test('Test lesson performance with no collections', function(assert) {
  const lesson = Ember.Object.create(
    {
      id:'333-555-777',
      title: "Quiz :: Indian History",
      type: "lesson",
      score:75,
      completionDone: 0,
      completionTotal: 1,
      timeSpent: 4852359,
      ratingScore: 0,
      hasStarted: false,
      collections:Ember.A()
    });

  this.set('lesson', lesson);
  this.set('index',0);
  this.set('selectedLessonId', 'not-my-id');
  this.set('onSelectLesson', function(){
    assert.ok(true, "This should be called 1 time each click");
  });

  assert.expect(6);
  this.render(hbs`{{class.analytics.performance.student.gru-lesson-performance
    lesson=lesson
    localIndex=index
    index=index
    selectedLessonId=selectedLessonId
    onSelectLesson=onSelectLesson
  }}`);
  const $component = this.$();

  T.exists(assert, $component, 'Missing Lesson Container');

  const $clickableAnchor= $component.find(".gru-lesson-performance-container a"); //component dom element
  T.exists(assert, $clickableAnchor, 'Missing Clickable Anchor');


  Ember.run(() => {
    $clickableAnchor.click();
  });

  return wait().then(function() {
    const $collectionsContainer = $component.find(".collections-container");
    assert.equal($collectionsContainer.hasClass('in'), true, "Collections container did not open");

    const $collectionNoContentSpan = $component.find(".collections-container span");

    T.exists(assert, $collectionNoContentSpan, 'Missing no content message span');
    assert.equal(T.text($collectionNoContentSpan), "No content available", "Wrong no content message");
  });



});
