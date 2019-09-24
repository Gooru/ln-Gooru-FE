import Ember from 'ember';
import QuestionMixin from 'gooru-web/mixins/reports/assessment/questions/question';

/**
 * Multiple choice
 *
 * Component responsible for show the reorder, what option are selected
 * and the correct option.
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend(QuestionMixin, {
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'assessment', 'questions', 'gru-reorder'],

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  answers: Ember.computed(
    'question',

    function() {
      let component = this;
      let question = component.get('question');
      let questionUtil = component.getQuestionUtil(question);
      let userAnswers = component.get('userAnswer');
      let correctAnswers = questionUtil.getCorrectAnswer();
      let answers = question.get('answers').sortBy('order');

      let userAnswersWithText =
        userAnswers &&
        userAnswers.map(function(userAns) {
          let userAnsValue = answers.findBy('id', userAns),
            userAnsText = userAnsValue ? userAnsValue.text : '';
          return {
            value: userAns,
            userAnsText: userAnsText
          };
        });

      return answers.map(function(answer, inx) {
        const userAnswer =
          (userAnswers && userAnswers.findBy('value', answer.value)) || {};
        const correctAnswer = correctAnswers.findBy(
          'value',
          (userAnswer && userAnswer.value) || null
        );
        const correct =
          correctAnswer &&
          correctAnswers.indexOf(correctAnswer) ===
            userAnswers.indexOf(userAnswer);
        return {
          showCorrect: component.get('showCorrect'),
          selectedOrderText:
            userAnswersWithText &&
            userAnswersWithText.length > 0 &&
            userAnswersWithText[inx].userAnsText,
          selectedOrder: userAnswers
            ? userAnswers.indexOf(userAnswer) + 1
            : inx,
          text: answer.get('text'),
          correct
        };
      });
    }
  )

  // -------------------------------------------------------------------------
  // Observers

  // -------------------------------------------------------------------------
  // Methods
});
