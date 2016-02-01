import Ember from "ember";

/**
 * Model for a learning target result.
 *
 * @typedef {Object} LearningTargetResult
 *
 */
export default Ember.Object.extend({

  /**
   * @property {String} description - Description of the learning target
   */
  description: '',

  /**
   * @property {Number} mastery - Score/mastery for the learning target
   */
  mastery: 0,

  /*
   * @property {Number[]} relatedQuestions - Array of QuestionDetailsResult ids
   */
  relatedQuestions: [],

  /**
   * @property {String} standard - Name/code of the standard this learning target belongs to
   */
  standard: '',

  /*
   * @property {ResourceResult[]} suggestedResources
   */
  suggestedResources: []

});
