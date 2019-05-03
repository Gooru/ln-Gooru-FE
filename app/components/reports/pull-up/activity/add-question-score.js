import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['add-data', 'add-question-score'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    //Action triggered when add question score
    onAddQuestionScore(questionScore) {
      const component = this;
      component.set('question.score', questionScore);
      component.set('question.isScored', true);
      component.sendAction('onToggleQuestion', component.get('seq') + 1);
    },

    //Action triggered when toggle question
    onToggleQuestion(seq) {
      const component = this;
      component.sendAction('onToggleQuestion', seq);
    },

    //Action triggered when scroll multi scores
    onScrollScore(direction) {
      const component = this;
      const scrollListConatiner = component.$('.scores-list');
      let currentPos = scrollListConatiner.scrollLeft();
      let scrollToPos =
        direction === 'left' ? currentPos - 56 : currentPos + 56;
      scrollListConatiner.animate(
        {
          scrollLeft: scrollToPos
        },
        200
      );
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Object} question
   */
  question: null,

  /**
   * @property {Array} questionScores
   */
  questionScores: Ember.computed('question.maxScore', function() {
    const component = this;
    let questionMaxScore = component.get('question.maxScore');
    let questionScores = Ember.A([]);
    for (let scoreVal = 0; scoreVal <= questionMaxScore; scoreVal++) {
      questionScores.push(scoreVal);
    }
    return questionScores;
  }),

  /**
   * @property {Boolean} isBooleanScore
   */
  isBooleanScore: Ember.computed.lte('question.maxScore', 1),

  /**
   * @property {Boolean} isShowScrollableScores
   */
  isShowScrollableScores: Ember.computed(function() {
    const component = this;
    const numberOfScores = component.get('questionScores.length');
    return numberOfScores > 5;
  }),

  /**
   * @property {Boolean} isOverwriteScore
   */
  isOverwriteScore: false,

  /**
   * @property {Boolean} disableScoreOverwite
   */
  disableScoreOverwite: Ember.computed(
    'isOverwriteScore',
    'question.type',
    function() {
      const component = this;
      const isOverwriteScore = component.get('isOverwriteScore');
      const questionType = component.get('question.type');
      return isOverwriteScore && questionType === 'OE';
    }
  )
});
