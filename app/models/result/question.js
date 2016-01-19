import DS from "ember-data";

/**
 * Model for a question that has been answered. This question result is one of many
 * question results that comprise an attempt by a user to complete an assessment.
 *
 * @typedef {Object} QuestionResult
 *
 */
export default DS.Model.extend({

  /**
   * @property {number} attempt - ID of the attempt this question result belongs to
   */
  attempt: DS.attr('number'),

  /**
   * @property {Object} question - Question that this question result refers to
   * This object is a subset of resource/resource. It has the following properties:
   *
   * id: DS.attr('number'),
   * questionType: DS.attr('string'),
   * text: DS.attr('string'),
   * hints: DS.attr(),
   * explanation: DS.attr('string'),
   * order: DS.attr('number'),
   */
  question: DS.attr(),

  /**
   * @property {number} user - ID of the author that committed this question result
   */
  user: DS.attr('number'),

  /**
   * @property {boolean} correct - Was the answer provided by the user correct?
   */
  correct: DS.attr('boolean'),

  /**
   * @property {number} reaction - Value of the reaction the user had towards the question
   */
  reaction: DS.attr('number'),

  /**
   * @property {number} timeSpent - Time in seconds that it took the user to answer the question
   */
  timeSpent: DS.attr('number'),

  /**
   * @property {Object} answer - Answer provided by the user
   */
  answer: DS.attr()

});

