import Ember from 'ember';

/**
 * MileStone Course map controller
 *
 * Controller responsible of the logic for the course map milestone view
 */
export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  queryParams: ['location'],

  location: null,

  /**
   * Inject the  student class parent controller.
   */
  studentClassController: Ember.inject.controller('student.class'),

  session: Ember.inject.service('session'),

  rubricService: Ember.inject.service('api-sdk/rubric'),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Number} barChartData
   */
  barChartData: Ember.computed(function() {
    return this.get('studentClassController.barChartData');
  }),

  /**
   * Overall class level performance percentage.
   */
  performancePercentage: Ember.computed(function() {
    return this.get('studentClassController.performancePercentage');
  }),

  /**
   * Milestone progress decorator property
   */
  mileStone: Ember.computed(function() {
    return {
      iconClass: 'msaddonTop',
      offset: {
        left: '-20px',
        top: '9px'
      }
    };
  }),

  /**
   * Decide Whether need to show route0 accepted view or not.
   * @return {Boolean}
   */
  showRoute0Suggestion: Ember.computed('route0', 'route0.status', function() {
    let controller = this;
    const route0 = controller.get('route0');
    let showRoute0Suggestion = route0.status === 'accepted';
    return showRoute0Suggestion;
  }),

  /**
   * Decide Whether need to show route0  preview view or not.
   * @return {Boolean}
   */
  showRoute0SuggestionPreview: Ember.computed(
    'route0',
    'route0.status',
    function() {
      let controller = this;
      const route0 = controller.get('route0');
      let showRoute0Suggestion = route0.status === 'pending';
      return showRoute0Suggestion;
    }
  ),

  /**
   * Maintains the property value of whether route0 suggestion need to show or not
   * @type {Boolean}
   */
  route0Applicable: Ember.computed.alias('class.route0Applicable'),

  /**
   * Maintains the state of whether need to show all the rescoped content or not.
   * @type {Boolean}
   */
  showAllRescopedContent: false,

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

  /**
   * @property {Object} activeReportPeriod
   */
  activeReportPeriod: Ember.computed(function() {
    const component = this;
    return Ember.Object.create({
      text: component.get('i18n').t('common.progress-report'),
      value: 'progress-report',
      type: 'default'
    });
  }),

  /**
   * @property {UUID} userId
   * Current logged in user Id
   */
  userId: Ember.computed.alias('session.userId'),

  /**
   * @property {UUID} classId
   */
  classId: Ember.computed.alias('studentClassController.class.id'),

  /**
   * @property {UUID} courseId
   */
  courseId: Ember.computed.alias('studentClassController.course.id'),

  /**
   * Set custom range start date
   */
  rangeStartDate: null,

  /**
   * Set course activated date
   **/
  courseStartDate: Ember.computed('course.createdDate', function() {
    if (this.get('course.createdDate')) {
      return moment(this.get('course.createdDate')).format('YYYY-MM-DD');
    }
    return moment()
      .subtract(1, 'M')
      .format('YYYY-MM-DD');
  }),

  /**
   * Set custom range end date
   */
  rangeEndDate: Ember.computed(function() {
    return moment()
      .endOf('day')
      .format('YYYY-MM-DD');
  }),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    resetPerformance: function() {
      const component = this;
      component.get('studentClassController').send('reloadData');
    },

    /**
     * This method will take care of routing page to student locate me view.
     */
    mileStoneHandler: function() {
      let component = this;
      component.transitionToRoute('student-locate', {
        queryParams: {
          classId: component.get('class.id'),
          courseId: component.get('class.courseId')
        }
      });
    },

    onToggleRescope() {
      this.toggleProperty('showAllRescopedContent');
    },

    //Action triggered when toggle course info
    onToggleCourseInfo() {
      $('.rescope-content-preview.course-info-toggle-container').slideToggle();
    },

    //Action triggered when toggle report period
    onToggleReportPeriod() {
      $('.title-container .report-periods').slideToggle();
    },

    //Action triggered when select a reprot period
    onSelectReportPeriod(reportPeriod) {
      const controller = this;
      controller.set('activeReportPeriod', reportPeriod);
      controller.send('onToggleReportPeriod');
      if (reportPeriod.get('type') === 'custom') {
        controller.onRangePickerReport();
      } else {
        controller.set('isShowStudentProgressReport', true);
      }
    },

    /**
     * Close range date picker
     */

    onCloseDatePicker() {
      $('.student-rangepicker-container').hide();
    },

    /**
     * Select from date and to date while submit
     */

    onChangeDateForStudent(startDate, endDate) {
      const controller = this;
      controller.set('rangeStartDate', moment(startDate).format('YYYY-MM-DD'));
      controller.set('rangeEndDate', moment(endDate).format('YYYY-MM-DD'));
      controller.set('isShowStudentProgressReport', true);
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function loadSelfGradeItems
   * Method to load self grading items
   * @return {Promise}
   */
  loadSelfGradeItems() {
    const controller = this;
    controller.fetchOaItemsToGradeByStudent().then(function(selfGradeItems) {
      controller.set('selfGradeItems', selfGradeItems.get('gradeItems'));
    });
  },

  /**
   * @function fetchOaItemsToGradeByStudent
   * Method to fetch list of OA items to be graded by student
   * @return {Promise}
   */
  fetchOaItemsToGradeByStudent() {
    const controller = this;
    const requestParam = {
      classId: controller.get('classId'),
      type: 'oa',
      source: 'coursemap',
      courseId: controller.get('courseId'),
      userId: controller.get('userId')
    };
    return controller.get('rubricService').getOaItemsToGrade(requestParam);
  },

  /**
   * Show range date picker while click dropdown custom option
   */
  onRangePickerReport() {
    let datepickerEle = $('.student-rangepicker-container');
    datepickerEle.show();
  }
});
