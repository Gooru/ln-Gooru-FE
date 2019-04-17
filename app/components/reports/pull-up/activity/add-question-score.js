import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['add-data', 'add-question-score'],

  actions: {
    onAddQuestionScore(questionScore) {
      const component = this;
      component.set('question.score', questionScore);
      component.sendAction('onToggleQuestion', component.get('seq') + 1);
    },

    onToggleQuestion(seq) {
      const component = this;
      component.sendAction('onToggleQuestion', seq);
    }
  },

  question: null,

  questionScore: Ember.computed('question.maxScore', function() {
    const component = this;
    let questionMaxScore = component.get('question.maxScore');
    let questionScores = Ember.A([]);
    for (let scoreVal = 0; scoreVal <= questionMaxScore; scoreVal++) {
      questionScores.push(scoreVal);
    }
    return questionScores;
  }),

  isBooleanScore: Ember.computed.lte('question.maxScore', 1)
});
