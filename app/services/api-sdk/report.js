import Ember from 'ember';
import ReportAdapter from 'gooru-web/adapters/report/report';
import ReportSerializer from 'gooru-web/serializers/report/report';

export default Ember.Service.extend({
  // -------------------------------------------------------------------------
  // Events

  init: function() {
    this._super(...arguments);
    this.set(
      'adapter',
      ReportAdapter.create(Ember.getOwner(this).ownerInjection())
    );
    this.set(
      'serializer',
      ReportSerializer.create(Ember.getOwner(this).ownerInjection())
    );
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {GoalAdapter} adapter
   */
  adapter: null,

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function fetchStudentsSummaryReport
   * Method to fetch students summary report data
   */
  fetchStudentsSummaryReport(classId, params) {
    const service = this;
    const adapter = service.get('adapter');
    const serializer = service.get('serializer');
    return new Ember.RSVP.Promise(function(resolve, reject) {
      adapter.fetchStudentsSummaryReport(classId, params).then(
        function(reportData) {
          resolve(serializer.normalizeStudentsSummaryReport(reportData));
        },
        function(error) {
          if (error.status === 406) {
            let data = JSON.parse(error.responseText);
            reject({ status: 406, message: data.message });
          } else {
            reject(error);
          }
        }
      );
    });
  },

  /**
   * @function fetchStudentsWeeklySummaryReport
   * Method to fetch student's weekly summary report data
   */
  fetchStudentsWeeklySummaryReport(classId, data) {
    const service = this;
    const adapter = service.get('adapter');
    const serializer = service.get('serializer');
    return new Ember.RSVP.Promise(function(resolve, reject) {
      adapter.fetchStudentsWeeklySummaryReport(classId, data).then(
        function(weeklyReportData) {
          resolve(
            serializer.normalizeStudentsWeeklySummaryReport(weeklyReportData)
          );
        },
        function(error) {
          if (error.status === 406) {
            let data = JSON.parse(error.responseText);
            reject({ status: 406, message: data.message });
          } else {
            reject(error);
          }
        }
      );
    });
  }
});
