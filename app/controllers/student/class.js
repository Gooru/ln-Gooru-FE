import Ember from 'ember';
import { ANONYMOUS_COLOR } from 'gooru-web/config/config';
import ConfigurationMixin from 'gooru-web/mixins/configuration';
import {
  flattenGutToFwCompetency,
  flattenGutToFwDomain
} from 'gooru-web/utils/taxonomy';
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
      const controller = this;
      if (
        controller.get('class.milestoneViewApplicable') &&
        controller.get('class.milestoneViewApplicable') === true
      ) {
        controller.populateMilestoneReport();
      } else {
        controller.openStudentCourseReport();
      }
    },

    //Action triggered when click on CA score
    onOpenCAReport() {
      this.populateClassActivityReport();
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
   * @property {string}
   * frameworkId its based on class or teacher preference
   */
  frameworkId: Ember.computed('class', function() {
    const controller = this;
    return controller.get('class.preference.framework');
  }),

  /**
   * @property {string}
   * subjectId its based on class or teacher preference
   */
  subjectId: Ember.computed('class', function() {
    const controller = this;
    return controller.get('class.preference.subject');
  }),

  /**
   * Maintains the state of course report visibility
   * @type {Boolean}
   */
  showCourseReport: false,

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

  /**
   * @property {Boolean} isShowClassActivityReport
   */
  isShowClassActivityReport: false,

  /**
   * @property {Boolean} isShowMilestoneReport
   */
  isShowMilestoneReport: false,

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
  },

  /**
   * @function populateClassActivityReport
   * Method to bring class activity report
   */
  populateClassActivityReport() {
    const controller = this;
    controller.set('isShowClassActivityReport', true);
  },

  /**
   * @function populateMilestoneReport
   * Method to populate milestone report
   */
  populateMilestoneReport() {
    const controller = this;
    controller.set('isShowMilestoneReport', true);
  },

  fetchCrossWalkFWC() {
    const controller = this;
    const frameworkId = controller.get('frameworkId');
    const subjectId = controller.get('subjectId');
    if (frameworkId) {
      let crossWalkFWCPromise = controller
        .get('taxonomyService')
        .fetchCrossWalkFWC(frameworkId, subjectId);
      crossWalkFWCPromise.then(crossWalkFWCData => {
        controller.set(
          'fwCompetencies',
          flattenGutToFwCompetency(crossWalkFWCData)
        );
        controller.set('fwDomains', flattenGutToFwDomain(crossWalkFWCData));
      });
    }
  }
});
