import Ember from 'ember';

/**
 * Class Activity model
 * typedef {Object} ClassActivity
 */
export default Ember.Object.extend({

  /**
   * @property {String} id - The class activity id
   */
  id: null,

  /**
   * @property {Date} date of class activity
   */
  date: null,

  /**
   * @property {Collection}
   */
  collection: null,

  /**
   * @property {CollectionPerformanceSummary}
   */
  performance: null,

  /**
   * @property { { courseId: string, unitId: string, lessonId: string, collectionId: string }}
   */
  context: null
});
