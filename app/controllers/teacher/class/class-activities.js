import Ember from 'ember';
import {
  PLAYER_EVENT_SOURCE
} from 'gooru-web/config/config';

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * Class controller
   */
  classController: Ember.inject.controller('teacher.class'),

  /**
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service('api-sdk/class-activity'),

  /**
   * @requires service:api-sdk/offline-activity-analytics
   */
  oaAnaltyicsService: Ember.inject.service(
    'api-sdk/offline-activity/oa-analytics'
  ),

  /**
   * @requires service:api-sdk/offline-activity
   */
  offlineActivityService: Ember.inject.service(
    'api-sdk/offline-activity/offline-activity'
  ),

  /**
   * @requires service:api-sdk/assessment
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  /**
   * @requires RubricService
   */
  rubricService: Ember.inject.service('api-sdk/rubric'),

  actions: {
    /**
     * Launch an assessment on-air
     *
     * @function actions:goLive
     */
    goLive(options) {
      const controller = this;
      const currentClass = controller.get('class');
      const classId = currentClass.get('id');
      const queryParams = {
        queryParams: {
          source: PLAYER_EVENT_SOURCE.DAILY_CLASS,
          collectionType: options.collectionType
        }
      };
      this.transitionToRoute(
        'reports.collection',
        classId,
        options.collectionId,
        queryParams
      );
    },

    activityAdded(newlyAddedActivity) {
      const controller = this;
      controller.set('newlyAddedActivity', newlyAddedActivity);
    }
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * A link to the parent class controller
   * @see controllers/class.js
   * @property {Class}
   */
  class: Ember.computed.alias('classController.class'),

  /**
   * @property {Object} course
   */
  course: Ember.computed.alias('class.course'),

  /**
   * @property {UUID} classId
   */
  classId: Ember.computed.alias('class.id'),

  /**
   * @property {UUID} courseId
   */
  courseId: Ember.computed.alias('course.id'),

  /**
   * @property {Array} students
   */
  students: Ember.computed.alias('class.members'),

  /**
   * @property {String} subjectCode
   */
  subjectCode: Ember.computed.alias('course.subject'),

  /**
   * @type {Boolean}
   * Property to check whether a class is premium
   */
  isPremiumClass: Ember.computed('class', function() {
    let controller = this;
    const currentClass = controller.get('class');
    let setting = currentClass.get('setting');
    return setting ? setting['course.premium'] : false;
  }),

  secondaryClasses: Ember.computed.alias('classController.secondaryClasses'),

  secondaryClassList: Ember.computed.alias(
    'classController.secondaryClassList'
  ),

  isSecondaryClass: Ember.computed.gt('secondaryClasses.length', 0),

  /*
   * @property {Json} classPreference
   */
  classPreference: Ember.computed.alias('class.preference'),

  isMultiClassEnabled: Ember.computed.alias(
    'classController.isMultiClassEnabled'
  ),

  todaysActivities: Ember.A([])
});
