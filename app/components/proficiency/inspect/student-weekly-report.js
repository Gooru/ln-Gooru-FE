import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['weekly-report', 'student-weekly-report'],

  // -------------------------------------------------------------------------
  // Dependencies
  reportService: Ember.inject.service('api-sdk/report'),

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    const component = this;
    component.set('isLoading', true);
    component
      .fetchStudentsWeeklySummaryReport()
      .then(function(summaryReportData) {
        component.parseStudentsWeeklySummaryReportData(summaryReportData);
      });
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {UUID} classId
   */
  classId: Ember.computed.alias('class.id'),

  /**
   * @property {Date} startDate
   * Property for summary report start date
   */
  startDate: Ember.computed(function() {
    const today = moment();
    const startDate = today.startOf('week').format('YYYY-MM-DD');
    return startDate;
  }),

  /**
   * @property {Date} endDate
   * Property for summary report end date
   */
  endDate: Ember.computed(function() {
    const today = moment();
    const endDate = today.endOf('week').format('YYYY-MM-DD');
    return endDate;
  }),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function parseStudentsWeeklySummaryReportData
   * Method to parse students weekly summary report
   */
  parseStudentsWeeklySummaryReportData(summaryReportData) {
    const component = this;
    let parsedStudentsSummaryReportData = Ember.A([]);
    let studentsSummaryReportData = summaryReportData.get(
      'studentsSummaryData'
    );
    studentsSummaryReportData.map(studentSummaryReportData => {
      let parsedStudentSummaryData = Ember.Object.create({
        student: studentSummaryReportData.get('student'),
        weeklyReportData: Ember.Object.create({})
      });
      let summaryData = studentSummaryReportData.get('summaryData');
      let weeklySummaryData = summaryData || null;
      if (weeklySummaryData) {
        let completedCompetencies = weeklySummaryData.get(
          'completedCompetencies'
        );
        let inprogressCompetencies = weeklySummaryData.get(
          'inprogressCompetencies'
        );
        let interactionContents = weeklySummaryData.get('interactionData');
        let masteredCompetencies = weeklySummaryData.get(
          'masteredCompetencies'
        );
        let suggestionContents = weeklySummaryData.get('suggestionData');
        //parse low level data
        let assessmentInteration = interactionContents.get('assessmentData');
        let collectionInteraction = interactionContents.get('collectionData');
        let assessmentSuggestion = suggestionContents.get('assessmentData');
        let collectionSuggestion = suggestionContents.get('collectionData');
        let weeklyReportData = Ember.Object.create({
          masteredCompetencies:
            masteredCompetencies.length + completedCompetencies.length,
          inprogressCompetencies: inprogressCompetencies.length,
          totalTimespent:
            collectionInteraction.get('totalTimespent') +
            assessmentInteration.get('totalTimespent'),
          collectionTimespent: collectionInteraction.get('totalTimespent'),
          assessmentTimespent: assessmentInteration.get('totalTimespent'),
          badgeEarned: masteredCompetencies.length,
          averageScore: assessmentInteration.get('averageScore'),
          suggestionTaken:
            assessmentSuggestion.get('count') +
            collectionSuggestion.get('count')
        });
        parsedStudentSummaryData.set('weeklyReportData', weeklyReportData);
      }
      parsedStudentsSummaryReportData.pushObject(parsedStudentSummaryData);
    });
    if (!component.isDestroyed) {
      component.set(
        'studentsSummaryReportData',
        parsedStudentsSummaryReportData
      );
      component.set('isLoading', false);
    }
  },

  /**
   * @function fetchStudentsWeeklySummaryReport
   * Method to fetch students weekly summary report
   */
  fetchStudentsWeeklySummaryReport() {
    const component = this;
    const classId = component.get('classId');
    const startDate = component.get('startDate');
    const endDate = component.get('endDate');
    const dataParam = {
      fromDate: startDate,
      toDate: endDate
    };
    return component
      .get('reportService')
      .fetchStudentsWeeklySummaryReport(classId, dataParam);
  }
});
