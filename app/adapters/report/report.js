import Ember from 'ember';

/**
 * Adapter to support the class report APIs
 *
 * @typedef {Object} ReportAdapter
 */
export default Ember.Object.extend({
  namespace: '/api/reports/v1/',

  session: Ember.inject.service('session'),

  /**
   * @function fetchStudentsWeeklySummaryReport
   * Method to fetch students weekly summary report
   */
  fetchStudentsWeeklySummaryReport(classId, data) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}class/${classId}/student/summary/weekly`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * @function fetchStudentsSummaryReport
   * Method to fetch students summary report
   */
  fetchStudentsSummaryReport(classId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}class/${classId}/student/summary`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Creates the headers required by API 3.0
   * @returns {{Authorization: string}}
   */
  defineHeaders: function() {
    return {
      Authorization: `Token ${this.get('session.token-api3')}`
    };
  }
});
