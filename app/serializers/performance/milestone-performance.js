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
    response = {
      content: [
        {
          usageData: [
            {
              reaction: null,
              timeSpent: 23000,
              attempts: 1,
              completedCount: 1,
              scoreInPercentage: 80,
              totalCount: 2
            }
          ],
          userUid: 'b126e844-a2d6-4448-8bb3-0161ebf69e7e',
          milestoneId: '74f914eb-70d4-4ab5-98eb-b7a33606165f_SBCG_355_3_v1'
        },

        {
          usageData: [],
          userUid: 'b126e844-a2d6-4448-8bb3-0161ebf69e7e',
          milestoneId: '74f914eb-70d4-4ab5-98eb-b7a33606165f_SBCG_355_3_v2'
        }
      ]
    };

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
              completedInPrecentage: Math.round(
                (data.completedCount / data.totalCount) * 100
              )
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
   * Normalized  performance data for milestone.
   * @return {Array}
   */

  normalizePerformanceDataForMilestone(response) {
    let resultSet = Ember.A();
    response = {
      content: [
        {
          usageData: [
            {
              reaction: null,
              timeSpent: 107000,
              lessonId: '316f3410-66c4-402b-8d1b-c5faf00badcc',
              unitId: null,
              scoreInPercentage: 0,
              totalCount: 0,
              views: 0
            },
            {
              reaction: null,
              timeSpent: 194000,
              lessonId: '6ff10e5b-068e-4ccc-bafe-040d8727bb93',
              unitId: '0f7e5119-1c21-428a-a1f3-9959c39822d5',
              completedCount: 2,
              scoreInPercentage: 0,
              totalCount: 0,
              views: 2
            },
            {
              reaction: null,
              timeSpent: 76417,
              lessonId: 'f8d1b1f6-3720-423a-86a9-5bcbde45381b',
              unitId: '0f7e5119-1c21-428a-a1f3-9959c39822d5',
              completedCount: 0,
              scoreInPercentage: 0,
              totalCount: 0,
              views: 5
            },
            {
              reaction: null,
              timeSpent: 4181031,
              lessonId: 'b8f061de-aa9b-4834-aeeb-2f73d0926563',
              unitId: '0f7e5119-1c21-428a-a1f3-9959c39822d5',
              completedCount: 3,
              scoreInPercentage: 0,
              totalCount: 0,
              views: 39
            }
          ],
          userUid: '95a744e1-631e-4642-875d-8b07a5e3b421'
        }
      ]
    };

    if (response.content !== undefined && response.content.length > 0) {
      response = Ember.A(response.content);
      response.forEach(data => {
        let result = Ember.Object.create(data);
        let usageData = result.get('usageData');
        if (usageData && usageData.length > 0) {
          usageData.forEach(data => {
            let milestonePerformance = Ember.Object.create({
              performance: Ember.Object.create({
                timeSpent: data.timeSpent,
                scoreInPercentage: data.scoreInPercentage
              }),
              lessonId: data.lessonId,
              userUid: result.get('userUid')
            });
            resultSet.pushObject(milestonePerformance);
          });
        }
      });
    }

    return resultSet;
  }
});
