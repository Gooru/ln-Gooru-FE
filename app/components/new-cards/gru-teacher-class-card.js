import Ember from 'ember';
import { isNumeric } from 'gooru-web/utils/math';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:i18n
   */
  i18n: Ember.inject.service(),

  /**
   * @type {CourseService} Service to retrieve course information
   */
  courseService: Ember.inject.service('api-sdk/course'),

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['new-cards gru-teacher-class-cards'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     *
     * Triggered when an menu item is selected
     * @param item
     */
    selectItem: function(item) {
      const classData = this.get('class');
      const classId = classData.id;
      if (this.get('onItemSelected')) {
        this.sendAction('onItemSelected', item, classId);
      }
    },

    /**
     * If course associated with class redirect to ATC View else add to course view
     */
    lanuchAddCourseOrATCView() {
      let course = this.get('course');
      if (course) {
        this.send('selectItem', 'atc');
      } else {
        this.send('selectItem', 'course-map');
      }
    }
  },
  // -------------------------------------------------------------------------
  // Events

  init: function() {
    const component = this;
    component._super(...arguments);
  },

  didRender() {
    var component = this;
    component.$('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
  },
  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Class} class information
   */
  class: null,

  /**
   * @property {Course} course information
   */
  course: null,

  /**
   * @property {Boolean}
   * Computed property  to identify class  CM is started or not
   */
  hasCMStarted: Ember.computed('class.performanceSummary', function() {
    const scorePercentage = this.get('class.performanceSummary.score');
    return scorePercentage !== null && isNumeric(scorePercentage);
  }),

  /**
   * @property {Boolean}
   * Computed property  to identify class CA is started or not
   */
  hasCAStarted: Ember.computed('class.performanceSummaryForDCA', function() {
    const scorePercentage = this.get(
      'class.performanceSummaryForDCA.scoreInPercentage'
    );
    return scorePercentage !== null && isNumeric(scorePercentage);
  }),

  /**
   * The class is premium
   * @property {String}
   */
  isPremiumClass: Ember.computed('class', function() {
    const controller = this;
    let currentClass = controller.get('class');
    let classSetting = currentClass.get('setting');
    return classSetting ? classSetting['course.premium'] : false;
  })
});
