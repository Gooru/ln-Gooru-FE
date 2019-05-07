import Ember from 'ember';

/**
 * MileStone Course map controller
 *
 * Controller responsible of the logic for the course map milestone view
 */
export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * Inject the  student class parent controller.
   */
  studentClassController: Ember.inject.controller('student.class'),

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
    }
  }
});
