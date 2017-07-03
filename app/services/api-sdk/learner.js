import Ember from 'ember';
import LearnerSerializer from 'gooru-web/serializers/learner/learner';
import LearnerAdapter from 'gooru-web/adapters/learner/learner';

/**
 * @typedef {Object} LearnerService
 */
export default Ember.Service.extend({

  /**
   * @property {LearnerSerializer} learnerSerializer
   */
  learnerSerializer: null,

  /**
   * @property {LearnerAdapter} learnerAdapter
   */
  learnerAdapter: null,

  init: function () {
    this._super(...arguments);
    this.set('learnerSerializer', LearnerSerializer.create(Ember.getOwner(this).ownerInjection()));
    this.set('learnerAdapter', LearnerAdapter.create(Ember.getOwner(this).ownerInjection()));
  },
  /**
   * Fetches the learner locations
   *
   * @param userId - user to fetch the learner locations
   * @param contentType - one of course, collection or assessment
   * @param offset - for paginated listing of learner locations
   * @param limit - for paginated listing of learner locations
   * @returns {Promise}
   */
  fetchLocations: function(userId, contentType, offset = 0, limit = 20) {
    const service = this;
    return new Ember.RSVP.Promise((resolve, reject) => {
      service.get('learnerAdapter').fetchLocations(userId, contentType, offset, limit)
        .then(
          response => resolve(service.get('learnerSerializer').normalizeLocations(response)),
          reject
        );
    });
  },

  /**
   * Fetches the learner performance
   *
   * @param userId - user to fetch the learner performance
   * @param contentType - one of course, collection or assessment
   * @param offset - for paginated listing of learner performance
   * @param limit - for paginated listing of learner performance
   * @returns {Promise}
   */
  fetchPerformance: function(userId, contentType, offset = 0, limit = 20) {
    const service = this;
    return new Ember.RSVP.Promise((resolve, reject) => {
      service.get('learnerAdapter').fetchPerformance(userId, contentType, offset, limit)
        .then(
          response => resolve(service.get('learnerSerializer').normalizePerformances(response)),
          reject
        );
    });
  },
  /**
   * Fetches the learner performance in lesson
   *
   * @param courseId - course to fetch the learner performance
   * @param unitId - unit to fetch the learner performance
   * @param lessonId - lesson to fetch the learner performance
   *  @param collectionType
   * @returns {Promise}
   */
  fetchPerformanceLesson: function(courseId, unitId, lessonId, collectionType) {
    const service = this;
    return new Ember.RSVP.Promise((resolve, reject) => {
      service.get('learnerAdapter').fetchPerformanceLesson(courseId, unitId, lessonId, collectionType)
        .then(
          response => resolve(service.get('learnerSerializer').normalizePerformancesLesson(response)),
          reject
        );
    });
  }
});
