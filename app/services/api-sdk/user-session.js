import Ember from 'ember';

export default Ember.Service.extend({

  /**
   * Gets the last opened session.
   * @param context
   * @returns {Promise.<Array[Object]>}
   */
  getOpenSession: function(context) {
    var service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('userSessionAdapter').queryRecord({
        collectionType: context.collectionType,
        classId: context.classId,
        courseId: context.courseId,
        userId: context.userId,
        unitId: context.unitId,
        lessonId: context.lessonId,
        contentId: context.collectionId,
        openSession: false
      }).then(function(payload) {
        return resolve(service.get('userSessionSerializer').serializeOpenAssessment(payload));
      }, function(error) {
        reject(error);
      });
    });
  },

  /**
   * Gets all the session that were completed.
   * @param context
   * @returns {Promise.<Object>}
   */
  getCompletedSessions: function(context) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('userSessionAdapter').queryRecord({
        collectionType: context.collectionType,
        classId: context.classId,
        courseId: context.courseId,
        userId: context.userId,
        unitId: context.unitId,
        lessonId: context.lessonId,
        contentId: context.collectionId,
        openSession: true
      }).then(function(payload) {
        return resolve(service.get('userSessionSerializer').serializeSessionAssessments(payload));
      }, function(error) {
        reject(error);
      });
    });
  }

});
