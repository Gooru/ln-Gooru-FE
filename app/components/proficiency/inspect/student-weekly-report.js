import Ember from 'ember';
import { getDomainCode } from 'gooru-web/utils/taxonomy';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['weekly-report', 'student-weekly-report'],

  // -------------------------------------------------------------------------
  // Dependencies
  reportService: Ember.inject.service('api-sdk/report'),

  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    const component = this;
    component.loadSummaryReportData();
  },

  didRender() {
    const component = this;
    component
      .$('.body-container .body-right')
      .on('scroll', component.scrollEventHandler);
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    //Action triggered when toggle report period
    onToggleReportPeriod(component = this) {
      component.$('.report-period-selector .report-periods').slideToggle();
    },

    //Action triggered when select a reprot period
    onSelectReportPeriod(reportPeriod) {
      const component = this;
      component.set('rangeStartDate', null);
      component.set('rangeEndDate', null);
      component.set('activeReportPeriod', null);
      let isWeeklyReport = reportPeriod.get('value') !== 'till-now';
      if (reportPeriod.get('type') === 'weekly') {
        component.set(
          'activeWeek',
          reportPeriod.get('value') === 'current-week' ? 0 : 1
        );
      }
      if (reportPeriod.get('type') === 'custom') {
        component.onRangePickerReport(event);
      } else {
        component.loadSummaryReportData(isWeeklyReport);
        component.resetActiveStudentData();
      }
      component.set('activeReportPeriod', reportPeriod);
      component.actions.onToggleReportPeriod(component);
    },

    //Action triggered when select a student
    onSelectStudent(reportData) {
      const component = this;
      if (reportData.get('active')) {
        component.resetActiveStudentData();
      } else {
        component.parseStudentCompetencies(reportData);
        component.resetActiveStudentData();
        reportData.set('active', true);
        component.set('isShowStudentCompetencies', true);
      }
    },

    //Action triggered when remove a student
    onRemoveActiveStudentData() {
      this.resetActiveStudentData();
    },

    /**
     * Select from date and to date while submit
     */

    onChangeDateForStudent(startDate, endDate) {
      let components = this;
      components.set('rangeStartDate', moment(startDate).format('YYYY-MM-DD'));
      components.set('rangeEndDate', moment(endDate).format('YYYY-MM-DD'));
      components.loadSummaryReportData(false);
      components.resetActiveStudentData();
    },

    /**
     * Close range date picker
     */

    onCloseDatePicker() {
      this.$('.student-rangepicker-container').hide();
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
   * Set custom range start date
   */
  rangeStartDate: null,

  /**
   * Set custom range end date
   */
  rangeEndDate: null,

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

  /**
   * @property {Object} activeReportPeriod
   */
  activeReportPeriod: Ember.computed('reportPeriods', function() {
    return this.get('reportPeriods').objectAt(0);
  }),

  /**
   * @property {Array} reportPeriods
   */
  reportPeriods: Ember.computed(function() {
    const component = this;
    return Ember.A([
      Ember.Object.create({
        text: component.get('i18n').t('this-week'),
        value: 'current-week',
        type: 'weekly'
      }),
      Ember.Object.create({
        text: component.get('i18n').t('previous-week'),
        value: 'previous-week',
        type: 'weekly'
      }),
      Ember.Object.create({
        text: component.get('i18n').t('beginning-till-now'),
        value: 'till-now',
        type: 'complete'
      }),
      Ember.Object.create({
        text: component.get('i18n').t('custom-range'),
        value: 'custom-range',
        type: 'custom'
      })
    ]);
  }),

  // -------------------------------------------------------------------------
  // Methods

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
          masteredCompetencies: masteredCompetencies.concat(
            completedCompetencies
          ),
          masteredCompetenciesCount:
            masteredCompetencies.length + completedCompetencies.length,
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
   * @function parseStudentCompetencies
   * Method to parse student performed competencies
   */
  parseStudentCompetencies(studentReportData) {
    const component = this;
    let studentDomainCompetencies = Ember.A([]);
    const weeklyReportData = studentReportData.get('weeklyReportData');
    let masteredCompetencies = weeklyReportData.get('masteredCompetencies');
    let inprogressCompetencies = weeklyReportData.get('inprogressCompetencies');
    let studentCompetencies = masteredCompetencies.concat(
      inprogressCompetencies
    );
    let domainCompetencies = component.get(
      'domainLevelSummary.domainCompetencies'
    );
    studentCompetencies.map(competency => {
      let domainCode = getDomainCode(competency.id);
      let domainCompetencyData = domainCompetencies.findBy(
        'domainCode',
        domainCode
      );
      let competencies = Ember.A([]);
      let domainData = Ember.Object.create({
        domainCode: null,
        domainName: null,
        competencies
      });
      if (domainCompetencyData) {
        domainData.set('domainCode', domainCode);
        domainData.set('domainName', domainCompetencyData.domainName);
        let competencyData = domainCompetencyData.competencies.findBy(
          'competencyCode',
          competency.id
        );
        competencies.pushObject(
          Ember.Object.create({
            status: competency.status,
            competencyName: competencyData.competencyName,
            competencyStudentDesc: competencyData.competencyStudentDesc,
            competencyCode: competencyData.competencyCode,
            displayCode: competency.code
          })
        );
      }
      let parsedDomainData = studentDomainCompetencies.findBy(
        'domainCode',
        domainCode
      );
      if (parsedDomainData) {
        let parsedDomainCompetencies = parsedDomainData.get('competencies');
        parsedDomainData.set(
          'competencies',
          competencies.concat(parsedDomainCompetencies)
        );
      } else {
        studentDomainCompetencies.pushObject(domainData);
      }
    });
    component.set('studentDomainCompetencies', studentDomainCompetencies);
  },

  /**
   * @func resetActiveStudentData
   * Method to reset active student
   */
  resetActiveStudentData() {
    const component = this;
    component
      .get('studentsSummaryReportData')
      .map(reportData => reportData.set('active', false));
    component.set('isShowStudentCompetencies', false);
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
    const startDate = component.get('rangeStartDate');
    const endDate = component.get('rangeEndDate');
    const dataParam = {
      fromDate: startDate,
      toDate: endDate
    };
    const customParam =
      component.get('activeReportPeriod.type') === 'custom' ? dataParam : null;
    return component
      .get('reportService')
      .fetchStudentsSummaryReport(classId, customParam);
  },

  /**
   * @function scrollEventHandler
   * Method to handle scrolling event for respective container
   */
  scrollEventHandler() {
    const scrollingElementContainer = this;
    const targetElementContainer = Ember.$(
      '.student-weekly-report .header-container .header-right'
    );
    targetElementContainer.scrollLeft(scrollingElementContainer.scrollLeft);
  },

  /**
   * Show range date picker while click dropdown custom option
   */
  onRangePickerReport(event) {
    let component = this;
    let datepickerEle = component.$('.student-rangepicker-container');
    let selectedContentEle = component.$(event.target);
    if (!selectedContentEle.hasClass('active')) {
      selectedContentEle.addClass('active');
      datepickerEle.show();
    } else {
      selectedContentEle.removeClass('active');
      datepickerEle.hide();
    }
  }
});
