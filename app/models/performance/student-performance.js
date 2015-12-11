import DS from 'ember-data';

/**
 * Model that contains the student performance information
 * @typedef {Object} StudentPerformance
 */
export default DS.Model.extend({

  /**
   * @property {String} Title for the student performance
   */
  title: DS.attr('string'),
  /**
   * @property {String} Student performance type (e.g. unit, lesson, collection, assessment)
   */
  type: DS.attr('string'),
  /**
   * @property {Number} The performance score (in percentages e.g. 80%, 100%, 95%, etc)
   */
  score: DS.attr('number'),
  /**
   * @property {Number} The completion done in the unit, class or collection/assessment, e.g. It is the top number of the fraction 5/10
   */
  completionDone:  DS.attr('number'),
  /**
   * @property {Number} The total of completionin the unit, class or collection/assessment, e.g. It is the bottom number of the fraction 5/10
   */
  completionTotal: DS.attr('number'),
  /**
   * @property {Number} The registered time spent in the unit, class or collection/assessment
   */
  timeSpent: DS.attr('number'),
  /**
   *  @property {Number} The average rating score set for set for the unit, class or collection/assessment
   */
  ratingScore: DS.attr('number'),
  /**
   *  @property {Number} The number of attempts registered for the unit, class or collection/assessment
   */
  attempts: DS.attr('number')

});
