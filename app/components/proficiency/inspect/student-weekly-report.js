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
    component.loadSummaryReportData();
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    onToggleReportPeriod(component = this) {
      component.$('.report-period-selector .report-periods').slideToggle();
    },

    onSelectReportPeriod(reportPeriod) {
      const component = this;
      let isWeeklyReport = reportPeriod.get('value') !== 'till-now';
      if (reportPeriod.get('type') === 'weekly') {
        component.set(
          'activeWeek',
          reportPeriod.get('value') === 'current-week' ? 0 : 1
        );
      }
      component.set('activeReportPeriod', reportPeriod);
      component.loadSummaryReportData(isWeeklyReport);
      component.actions.onToggleReportPeriod(component);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Number} activeWeek
   * Property for number of earlier week data to be populated
   * Default 0 => Current Week
   */
  activeWeek: 0,

  /**
   * @property {UUID} classId
   */
  classId: Ember.computed.alias('class.id'),

  /**
   * @property {Date} startDate
   * Property for summary report start date
   */
  startDate: Ember.computed('activeWeek', function() {
    const today = moment().subtract(this.get('activeWeek'), 'weeks');
    const startDate = today.startOf('week').format('YYYY-MM-DD');
    return startDate;
  }),

  /**
   * @property {Date} endDate
   * Property for summary report end date
   */
  endDate: Ember.computed('activeWeek', function() {
    const today = moment().subtract(this.get('activeWeek'), 'weeks');
    const endDate = today.endOf('week').format('YYYY-MM-DD');
    return endDate;
  }),

  activeReportPeriod: Ember.computed('reportPeriods', function() {
    return this.get('reportPeriods').objectAt(0);
  }),

  /**
   * @property {Array} reportPeriods
   */
  reportPeriods: Ember.A([
    Ember.Object.create({
      text: 'This Week',
      value: 'current-week',
      type: 'weekly'
    }),
    Ember.Object.create({
      text: 'Previous Week',
      value: 'previous-week',
      type: 'weekly'
    }),
    Ember.Object.create({
      text: 'Beginning Till Now',
      value: 'till-now',
      type: 'complete'
    })
  ]),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function loadSummaryReportData
   * Method to load summary report data
   */
  loadSummaryReportData(isWeekly = true) {
    const component = this;
    component.set('isLoading', true);
    return Ember.RSVP
      .hash({
        summaryReportData: isWeekly
          ? component.fetchStudentsWeeklySummaryReport()
          : component.fetchStudentsClassSummaryReport()
      })
      .then(({ summaryReportData }) => {
        component.parseStudentsWeeklySummaryReportData(summaryReportData);
      });
  },

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
        parsedStudentsSummaryReportData.sortBy('student.lastName')
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
  },

  /**
   * @function fetchStudentsClassSummaryReport
   * Method to fetch students class summary report
   */
  fetchStudentsClassSummaryReport() {
    const component = this;
    const classId = component.get('classId');
    return component.get('reportService').fetchStudentsSummaryReport(classId);
  }
});
