import Ember from 'ember';
import { ANONYMOUS_COLOR } from 'gooru-web/config/config';
import ConfigurationMixin from 'gooru-web/mixins/configuration';

export default Ember.Controller.extend(ConfigurationMixin, {
  // -------------------------------------------------------------------------
  // Dependencies
  session: Ember.inject.service('session'),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Collapses the header section
     * @param {boolean} state
     */
    toggleHeader: function(state) {
      var $panels = $('.header .panel');
      if (state) {
        $panels.slideUp();
      } else {
        $panels.slideDown();
      }
    },

    /**
     * Trigger the event to open student course report
     */
    openCourseReport: function() {
      this.openStudentCourseReport();
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * DidInsertElement ember event
   */
  didInsertElement: function() {
    var item = this.get('menuItem');
    this.selectMenuItem(item);
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * The class presented to the user
   * @property {Class}
   */
  class: null,

  /**
   * The course presented to the user
   * @property {Course}
   */
  course: null,

  /**
   * The units presented to the user
   * @property {Unit}
   */
  units: null,

  /**
   * The menuItem selected
   * @property {String}
   */
  menuItem: null,

  /**
   * @property {ClassContentVisibility}
   */
  contentVisibility: null,

  /**
   * @property {boolean} Indicates if course has 1 or more units
   */
  hasUnits: Ember.computed.gt('course.unitCount', 0),

  /**
   * @property {boolean} Indicates if class has 1 or more students
   */
  hasStudents: Ember.computed.gt('class.countMembers', 0),

  barChartData: Ember.computed(function() {
    const completed = this.get('class.performanceSummary.totalCompleted');
    const total = this.get('class.performanceSummary.total');
    const percentage = completed ? (completed / total) * 100 : 0;
    return [
      {
        color: ANONYMOUS_COLOR,
        percentage
      }
    ];
  }),

  performancePercentage: Ember.computed('barChartData', function() {
    let data = this.get('barChartData').objectAt(0);
    return data.percentage.toFixed(0);
  }),

  /**
   * Maintains the state of course report visibility
   * @type {Boolean}
   */
  showCourseReport: false,

  /**
   * @property {Boolean}
   * Computed property  to identify class is started or not
   */
  hasStarted: Ember.computed('class.performanceSummary', function() {
    const scorePercentage = this.get('class.performanceSummary.score');
    return scorePercentage !== null && scorePercentage >= 0;
  }),

  demoClass: Ember.computed.alias('configuration.demoClass'),

  /**
   * @property {Boolean} isShowNavigatorLanding
   */
  isShowNavigatorLanding: Ember.computed(
    'class.currentLocation',
    'demoClass',
    function() {
      let controller = this;
      let classData = controller.get('class');
      let currentLocation = classData.get('currentLocation') || null;
      let setting = classData.get('setting');
      let isPremiumCourse = setting
        ? setting['course.premium'] && setting['course.premium'] === true
        : false;
      let isGradeAdded = classData.get('grade');
      return isPremiumCourse && !currentLocation && isGradeAdded;
    }
  ),

  /**
   * Property to identify when there is no content to play
   */
  isNotAbleToStartPlayer: false,

  /**
   * Property used to identify destination.
   * @type {String}
   */
  destination: Ember.computed.alias('skylineInitialState.destination'),

  /**
   * Property used to identify whether class has premium course or not.
   * @type {Boolean}
   */
  isPremiumCourse: false,

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Selected the menu item
   * @param {string} item
   */
  selectMenuItem: function(item) {
    this.set('menuItem', item);
  },

  openStudentCourseReport() {
    let controller = this;
    controller.set('showCourseReport', true);
    let params = Ember.Object.create({
      userId: controller.get('session.userId'),
      classId: controller.get('class.id'),
      class: controller.get('class'),
      courseId: controller.get('course.id'),
      course: controller.get('course'),
      isTeacher: false,
      isStudent: true,
      loadUnitsPerformance: true
    });
    controller.set('studentCourseReportContext', params);
  },

  onClosePullUp() {
    let controller = this;
    controller.set('showCourseReport', false);
  }
});
