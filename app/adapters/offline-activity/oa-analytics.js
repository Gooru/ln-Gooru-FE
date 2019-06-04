import Ember from 'ember';
/**
 * Adapter to support the Offline activity Analytics operations
 *
 * @typedef {Object} OfflineActivityAnalyticsAdapter
 */
export default Ember.Object.extend({
  session: Ember.inject.service('session'),

  namespace: '/api/nucleus-insights/v2/dca/oa',

  /**
   * Fetch the list of OA that the teacher needs to grade for a given class
   * @param {string} classId
   * @returns {Object}
   */
  getOAToGrade(classId) {
    const adapter = this;
    const namespace = this.get('namespace');
    // eslint-disable-next-line no-unused-vars
    const url = `${namespace}/class/${classId}`;
    const stubUrl = '/stubs/oa-pending-grade.json';
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(stubUrl, options);
  },

  /**
   * Get the list of Students to-be graded for a given Offline Activity
   * @param {string} classId
   * @param {string} collectionId
   * @returns {Object}
   */
  getStudentListToGrade(classId, collectionId) {
    const adapter = this;
    const namespace = this.get('namespace');
    // eslint-disable-next-line no-unused-vars
    const url = `${namespace}/class/${classId}/collection/${collectionId}/students`;
    const stubUrl = '/stubs/oa-student-list-grading.json';
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(stubUrl, options);
  },

  defineHeaders: function() {
    return {
      Authorization: `Token ${this.get('session.token-api3')}`
    };
  }
});
