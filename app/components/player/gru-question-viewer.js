import Ember from "ember";

/**
 * Player question viewer
 *
 * Component responsible for providing a frame where all question types
 * will be displayed i.e. it will be responsible for selecting any specific
 * question components per question type.
 *
 * @module
 * @see controllers/player.js
 * @augments ember/Component
 */
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @requires service:i18n
   */
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-question-viewer'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     * Action triggered when the user see a hint
     */
    showHint: function(){
      var actualHint = this.get('actualHint');

      this.get('hintsToDisplay').pushObject(this.get('question.hints').objectAt(actualHint));
      this.set('actualHint', ++actualHint);
    },

    showExplanation: function(){
      this.set('isExplanationShown', true);
    },

    /**
     * When the question is submitted
     */
    submitQuestion: function () {
      if (!this.get("submitted")){
        let questionResult = this.get("questionResult");
        this.sendAction("onSubmitQuestion", this.get("question"), questionResult);
      }
    },
    /**
     * When the question answer has been changed
     * @param {Resource} question the question
     */
    changeAnswer: function(question){
      if (!this.get("submitted")) {
        //todo track analytics
        this.set("question", question);
      }
    },

    /**
     * When the question answer has been completed
     * @param {Resource} question the question
     * @param { { answer: Object, correct: boolean } } stats
     */
    completeAnswer: function(question, stats){
      if (!this.get("submitted")) {
        let questionResult = this.get("questionResult");
        questionResult.set("userAnswer", stats.answer);
        questionResult.set("correct", stats.correct);

        this.set("question", question);
        this.set("answerCompleted", true);
      }
    },
    /**
     * When the question answer has been cleared
     * @param {Resource} question the question
     */
    clearAnswer: function(question){
      if (!this.get("submitted")) {
        //todo track analytics
        this.set("question", question);
        this.set("answerCompleted", false);
      }
    }
  },


  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties

  /**
   * Hits available for a question
   * @property {number} availableHints
   */
  actualHint: 0,

  /**
   * @property {boolean} indicates when the answer is completed
   */
  answerCompleted: false,

  /**
   * The collection
   * @property {Collection}
   */
  collection: null,

  /**
   * Hits available for a question
   * @property {number} availableHints
   */
  availableHints: Ember.computed('actualHint', 'question', function() {
    return this.get('question.hints.length') - this.get('actualHint');
  }),

  doesNotHaveExplanation: Ember.computed.not('question.explanation'),

  /**
   * Hints to display
   * @property {Array} hintsToDisplay
   */
  hintsToDisplay: Ember.A(),

  /**
   * Is the explanation shown?
   * @property {boolean} disableExplanation
   */
  isExplanationShown: false,

  /**
   * Is the explanation button disabled?
   * @property {boolean} disableHint
   */
  isExplanationButtonDisabled: Ember.computed.or('isExplanationShown', 'doesNotHaveExplanation'),

  /**
   * Is the hints button disabled?
   * @property {boolean} disableHint
   */
  isHintButtonDisabled: Ember.computed.not('availableHints'),

  /**
   * @property {boolean} indicates when the submit functionality is enabled
   */
  isSubmitDisabled: Ember.computed("answerCompleted", "submitted", function(){
    return this.get("submitted") || !this.get("answerCompleted");
  }),

  /**
   * @property {string} on submit question action
   */
  onSubmitQuestion: 'submitQuestion',

  /**
   * The question
   * @property {Resource} question
   */
  question: null,

  /**
   * Question result, it is passed as a parameter for this component
   * @property {QuestionResult}
   */
  questionResult: null,

  /**
   * Indicates when the collection is already submitted
   * @property {boolean}
   */
  submitted: false,

  /**
   * Default button text key
   * @property {string}
   */
  buttonTextKey: 'common.save',

  // -------------------------------------------------------------------------
  // Observers
  /**
   * Observes for the question itself
   * When it is changed some data should be reloaded
   */
  reloadQuestion: function() {
    this.setProperties({
      actualHint: 0,
      answerCompleted: false,
      hintsToDisplay: Ember.A(),
      isExplanationShown: false
    });
  }.observes("question")

  // -------------------------------------------------------------------------
  // Methods

});
