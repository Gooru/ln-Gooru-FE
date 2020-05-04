import Ember from 'ember';
import StudentLearnerProficiency from 'gooru-web/mixins/student-learner-proficiency';
export default Ember.Component.extend(StudentLearnerProficiency, {
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-student-class-progress-report-popup'],

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyService: Ember.inject.service('taxonomy'),

  reportService: Ember.inject.service('api-sdk/report'),

  // -------------------------------------------------------------------------
  // Events

  didInsertElement() {
    const component = this;
    component.$('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
    component.loadStudentSummaryReportData();
    component.getTaxonomyCategories();
  },

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * @function onClose
     */
    onClose() {
      this.set('isShowReport', false);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Boolean} isShowReport used to toggle popup show
   */
  isShowReport: false,

  /**
   * @property {Object} studentProfile
   */
  studentProfile: Ember.computed(function() {
    const component = this;
    return Ember.Object.create({
      id: component.get('userId')
    });
  }),

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

  reportStartDate: Ember.computed('startDate', function() {
    return this.get('reportPeriod.value') === 'till-now'
      ? null
      : this.get('startDate');
  }),

  reportEndDate: Ember.computed('endDate', function() {
    return this.get('reportPeriod.value') === 'till-now'
      ? null
      : this.get('endDate');
  }),

  // -------------------------------------------------------------------------
  // Observer

  // -------------------------------------------------------------------------
  // Methods
  /**
   * @function getTaxonomyCategories
   * Method to get Taxonomy Categories
   */

  getTaxonomyCategories() {
    const component = this;
    return Ember.RSVP.hash({
      taxonomyCategories: component.get('taxonomyService').getCategories()
    }).then(({ taxonomyCategories }) => {
      component.set('taxonomyCategories', taxonomyCategories);
      component.loadData();
    });
  },

  loadStudentSummaryReportData() {
    const component = this;
    let reportPeriod = component.get('reportPeriod');
    let isWeeklyReport = reportPeriod.get('value') !== 'till-now';
    if (reportPeriod.get('type') === 'weekly') {
      component.set(
        'activeWeek',
        reportPeriod.get('value') === 'current-week' ? 0 : 1
      );
    }
    if (reportPeriod.get('type') === 'custom') {
      component.set('reportStartDate', component.get('rangeStartDate'));
      component.set('reportEndDate', component.get('rangeEndDate'));
      component.loadSummaryReportData(isWeeklyReport);
    } else {
      component.loadSummaryReportData(isWeeklyReport);
    }
  },

  /**
   * @function loadSummaryReportData
   * Method to load summary report data
   */
  loadSummaryReportData(isWeekly = true) {
    const component = this;
    component.set('isLoading', true);
    return Ember.RSVP.hash({
      summaryReportData: isWeekly
        ? component.fetchStudentsWeeklySummaryReport()
        : component.fetchStudentsClassSummaryReport()
    }).then(({ summaryReportData }) => {
      component.parseStudentsWeeklySummaryReportData(summaryReportData);
    });
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
    const subjectCode = component.get('class.preference.subject');
    const userId = component.get('userId');
    const dataParam = {
      fromDate: startDate,
      toDate: endDate,
      subjectCode: subjectCode,
      userId: userId
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
    const startDate = component.get('rangeStartDate');
    const endDate = component.get('rangeEndDate');
    const subjectCode = component.get('class.preference.subject');
    const userId = component.get('userId');
    const dataParam = {
      fromDate: startDate,
      toDate: endDate,
      subjectCode: subjectCode,
      userId: userId
    };
    const customParam =
      component.get('activeReportPeriod.type') === 'custom'
        ? dataParam
        : { subjectCode: subjectCode, userId: userId };
    return component
      .get('reportService')
      .fetchStudentsSummaryReport(classId, customParam);
  },

  /**
   * @function parseStudentsWeeklySummaryReportData
   * Method to parse students weekly summary report
   */
  parseStudentsWeeklySummaryReportData(summaryReportData) {
    const component = this;
    let studentsSummaryReportData = summaryReportData.get(
      'studentsSummaryData'
    );
    let studentSummaryData = studentsSummaryReportData.get('firstObject');
    component.set('studentInfo', studentSummaryData.get('student'));
    let summaryData = studentSummaryData.get('summaryData');
    let weeklySummaryData = summaryData || null;
    if (weeklySummaryData) {
      let completedCompetencies = weeklySummaryData.get(
        'completedCompetencies'
      );
      let inprogressCompetencies = weeklySummaryData.get(
        'inprogressCompetencies'
      );
      let inferredCompetencies = weeklySummaryData.get('inferredCompetencies');
      let interactionContents = weeklySummaryData.get('interactionData');
      let masteredCompetencies = weeklySummaryData.get('masteredCompetencies');
      let suggestionContents = weeklySummaryData.get('suggestionData');
      //parse low level data
      let assessmentInteration = interactionContents.get('assessmentData');
      let collectionInteraction = interactionContents.get('collectionData');
      let assessmentSuggestion = suggestionContents.get('assessmentData');
      let collectionSuggestion = suggestionContents.get('collectionData');
      let weeklyReportData = Ember.Object.create({
        masteredCompetencies: masteredCompetencies.concat(
          completedCompetencies
        ),
        masteredCompetenciesCount:
          masteredCompetencies.length + completedCompetencies.length,
        inferredCompetencies: inferredCompetencies,
        inferredCompetenciesCount: inferredCompetencies.length,
        inprogressCompetencies: inprogressCompetencies,
        inprogressCompetenciesCount: inprogressCompetencies.length,
        totalTimespent:
          collectionInteraction.get('totalTimespent') +
          assessmentInteration.get('totalTimespent'),
        collectionTimespent: collectionInteraction.get('totalTimespent'),
        assessmentTimespent: assessmentInteration.get('totalTimespent'),
        isNotStarted: assessmentInteration.get('isNotStarted'),
        badgeEarned: masteredCompetencies.length,
        averageScore: assessmentInteration.get('averageScore'),
        suggestionTaken:
          assessmentSuggestion.get('count') + collectionSuggestion.get('count')
      });
      component.set('weeklyReportData', weeklyReportData);
    }
    // let parsedStudentsSummaryReportData = Ember.A([]);
    // studentsSummaryReportData.map(studentSummaryReportData => {
    //   let parsedStudentSummaryData = Ember.Object.create({
    //     student: studentSummaryReportData.get('student'),
    //     weeklyReportData: Ember.Object.create({})
    //   });
    //   let summaryData = studentSummaryReportData.get('summaryData');
    //   let weeklySummaryData = summaryData || null;
    //   if (weeklySummaryData) {
    //     let completedCompetencies = weeklySummaryData.get(
    //       'completedCompetencies'
    //     );
    //     let inprogressCompetencies = weeklySummaryData.get(
    //       'inprogressCompetencies'
    //     );
    //     let inferredCompetencies = weeklySummaryData.get(
    //       'inferredCompetencies'
    //     );
    //     let interactionContents = weeklySummaryData.get('interactionData');
    //     let masteredCompetencies = weeklySummaryData.get(
    //       'masteredCompetencies'
    //     );
    //     let suggestionContents = weeklySummaryData.get('suggestionData');
    //     //parse low level data
    //     let assessmentInteration = interactionContents.get('assessmentData');
    //     let collectionInteraction = interactionContents.get('collectionData');
    //     let assessmentSuggestion = suggestionContents.get('assessmentData');
    //     let collectionSuggestion = suggestionContents.get('collectionData');
    //     let weeklyReportData = Ember.Object.create({
    //       masteredCompetencies: masteredCompetencies.concat(
    //         completedCompetencies
    //       ),
    //       masteredCompetenciesCount:
    //         masteredCompetencies.length + completedCompetencies.length,
    //       inferredCompetencies: inferredCompetencies,
    //       inferredCompetenciesCount: inferredCompetencies.length,
    //       inprogressCompetencies: inprogressCompetencies,
    //       inprogressCompetenciesCount: inprogressCompetencies.length,
    //       totalTimespent:
    //         collectionInteraction.get('totalTimespent') +
    //         assessmentInteration.get('totalTimespent'),
    //       collectionTimespent: collectionInteraction.get('totalTimespent'),
    //       assessmentTimespent: assessmentInteration.get('totalTimespent'),
    //       isNotStarted: assessmentInteration.get('isNotStarted'),
    //       badgeEarned: masteredCompetencies.length,
    //       averageScore: assessmentInteration.get('averageScore'),
    //       suggestionTaken:
    //         assessmentSuggestion.get('count') +
    //         collectionSuggestion.get('count')
    //     });
    //     parsedStudentSummaryData.set('weeklyReportData', weeklyReportData);
    //   }
    //   parsedStudentsSummaryReportData.pushObject(parsedStudentSummaryData);
    // });
    // if (!component.isDestroyed) {
    //   component.set(
    //     'studentsSummaryReportData',
    //     parsedStudentsSummaryReportData.sortBy('student.lastName')
    //   );

    // let studentsSummaryReportData = component.get(
    //   'studentsSummaryReportData'
    // );
    // let studentsDomainPerformance = component.get(
    //   'studentsDomainPerformance'
    // );
    // console.log(studentsDomainPerformance,"studentsDomainPerformance");
    // studentsDomainPerformance.map(studentsDomain => {
    //   let studentSummary = studentsSummaryReportData.find(studentsSummary => {
    //     return studentsDomain.id === studentsSummary.student.id;
    //   });
    //   if (studentSummary) {
    //     let masteredCompetencies =
    //       studentSummary.weeklyReportData.masteredCompetencies;
    //     let inprogressCompetencies =
    //       studentSummary.weeklyReportData.inprogressCompetencies;
    //     let studentCompetencies = inprogressCompetencies.concat(
    //       masteredCompetencies
    //     );
    //     let domainCompetencies = component.get(
    //       'domainLevelSummary.domainCompetencies'
    //     );
    //     studentCompetencies.map(competency => {
    //       let domainCode = getDomainCode(competency.id);
    //       let domainCompetencyData = domainCompetencies.findBy(
    //         'domainCode',
    //         domainCode
    //       );
    //       if (domainCompetencyData) {
    //         let competencyData = domainCompetencyData.competencies.findBy(
    //           'competencyCode',
    //           competency.id
    //         );
    //         competency.competencyStudentDesc =
    //           competencyData.competencyStudentDesc;
    //       }
    //     });
    //     studentsDomain.set('studentCompetencies', studentCompetencies);
    //     studentsDomain.set(
    //       'weeklyReportData',
    //       studentSummary.weeklyReportData
    //     );
    // }
    // });

    //   component.set('isLoading', false);
    // }
  }
});
