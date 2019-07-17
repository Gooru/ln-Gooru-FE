import Ember from 'ember';
/**
 * Adapter to support the Offline activity Analytics operations
 *
 * @typedef {Object} OfflineActivityAnalyticsAdapter
 */
export default Ember.Object.extend({
  session: Ember.inject.service('session'),

  namespace: '/api/nucleus-insights/v2',

  /**
   * Fetch the list of OA that the teacher needs to grade for a given class
   * @param {string} classId
   * @param {string} userId
   * @returns {Object}
   */
  getOAToGrade(classId, userId) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/rubrics/items`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data: {
        classId,
        userId
      }
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Get the student submissions
   * @param {string} classId
   * @param {string} activityId
   * @param {string} studentId
   * @returns {Object}
   */
  getSubmissionsToGrade(classId, activityId, studentId) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/dca/class/${classId}/oa/${activityId}/student/${studentId}/submissions`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Get the list of Students to-be graded for a given Offline Activity
   * @param {string} classId
   * @param {string} activityId
   * @returns {Object}
   */
  getStudentListToGrade(classId, activityId) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/rubrics/items/${activityId}/students`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data: {
        classId
      }
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Submit student submission by teacher | student
   * @param {Object} Grade
   * @returns {Promise}
   */
  submitOAGrade(data) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/rubrics/grades/collections`;
    const options = {
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: adapter.defineHeaders(),
      data: JSON.stringify(data)
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * @function getOaCompletedStudents
   * @param {UUID} classId
   * @param {UUID} oaId
   * @param {UUID} itemId CA content ID
   * Method to get list of students who have marked an OA as completed
   */
  getOaCompletedStudents(classId, oaId, itemId) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/dca/class/${classId}/oa/${oaId}/item/${itemId}/students`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },

  defineHeaders: function() {
    return {
      Authorization: `Token ${this.get('session.token-api3')}`
    };
  }
});
