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

  /**
   * Decide Whether need to show route0 accepted or preview view.
   * @return {Boolean}
   */
  showRoute0Suggestion: Ember.computed('route0', 'route0.status', function() {
    let controller = this;
    const route0 = controller.get('route0');
    let showRoute0Suggestion = route0.status === 'accepted';
    return showRoute0Suggestion;
  }),

  /**
   * Maintains the property value of whether route0 suggestion need to show or not
   * @type {Boolean}
   */
  route0Applicable: Ember.computed.alias('class.route0Applicable'),

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
