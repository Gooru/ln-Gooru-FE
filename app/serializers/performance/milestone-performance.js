import Ember from 'ember';
import DS from 'ember-data';

/**
 * Serializer for Milestone Performance model
 *
 * @typedef {Object} MilestonePerformanceSerializer
 */
export default DS.JSONAPISerializer.extend({
  /**
   * Normalized  performance data for milestones.
   * @return {Array}
   */
  normalizePerformanceDataForMilestones(response) {
    let resultSet = Ember.A();
    if (response.content !== undefined && response.content.length > 0) {
      response = Ember.A(response.content);
      response.forEach(data => {
        let result = Ember.Object.create(data);
        let usageData = result.get('usageData');
        if (usageData && usageData.length > 0) {
          let data = usageData.objectAt(0);
          let milestonePerformance = Ember.Object.create({
            performance: Ember.Object.create({
              timeSpent: data.timeSpent,
              completedCount: data.completedCount,
              scoreInPercentage: data.scoreInPercentage,
              totalCount: data.totalCount,
              completedInPrecentage:
                data.totalCount > 0
                  ? Math.round(data.completedCount / data.totalCount * 100)
                  : undefined
            }),
            milestoneId: result.get('milestoneId'),
            userUid: result.get('userUid')
          });

          resultSet.pushObject(milestonePerformance);
        }
      });
    }
    return resultSet;
  },

  /**
   * Normalized  lesson performance data for milestone.
   * @return {Array}
   */

  normalizeLessonsPerformanceDataForMilestone(responsePayload) {
    let normalizedLessonsPerformance = Ember.A([]);
    if (
      responsePayload.content !== undefined &&
      responsePayload.content.length
    ) {
      let usersLessonsPerformance = responsePayload.content;
      usersLessonsPerformance.map(userLessonsPerformance => {
        if (
          userLessonsPerformance.usageData &&
          userLessonsPerformance.usageData.length
        ) {
          let lessonsPerforamanceData = userLessonsPerformance.usageData;
          lessonsPerforamanceData.map(lessonPerformanceData => {
            let normalizedLessonPerformanceData = Ember.Object.create({
              lessonId: lessonPerformanceData.lessonId,
              performance: Ember.Object.create({
                scoreInPercentage: lessonPerformanceData.scoreInPercentage,
                timeSpent: lessonPerformanceData.timeSpent,
                completedCount: lessonPerformanceData.completedCount,
                totalCount: lessonPerformanceData.totalCount,
                attempts: lessonPerformanceData.attempts
              }),
              userUid: userLessonsPerformance.userUid
            });
            normalizedLessonsPerformance.pushObject(
              normalizedLessonPerformanceData
            );
          });
        }
      });
    }
    return normalizedLessonsPerformance;
  }
});
