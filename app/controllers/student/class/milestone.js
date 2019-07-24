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

  // -------------------------------------------------------------------------
  // Actions

  actions: {
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
  }
});
