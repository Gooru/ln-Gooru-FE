import Ember from 'ember';
import { isCompatibleVW } from 'gooru-web/utils/utils';

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * Analytics Service
   */
  analyticsService: Ember.inject.service('api-sdk/analytics'),

  /**
   * Class Service
   */
  classService: Ember.inject.service('api-sdk/class'),

  /**
   * Session Service
   */
  session: Ember.inject.service('session'),

  /**
   * Class Controller
   */
  classController: Ember.inject.controller('teacher.class'),

  /**
   * Class Activities Service
   */
  classActivitiesService: Ember.inject.service('api-sdk/class-activity'),

  /**
   * Competency Service
   */
  competencyService: Ember.inject.service('api-sdk/competency'),

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

  /**
   * @property {Boolean} isShowCompetencyCompletionReport
   */
  isShowCompetencyCompletionReport: false,

  /**
   * Maintains the value which of month activities displaying
   * @type {Integer}
   */
  activeMonth: Ember.computed(function() {
    return moment().format('MM');
  }),

  /**
   * @property {Boolean} isCurrentMonth
   */
  isCurrentMonth: Ember.computed('activeMonth', function() {
    const controller = this;
    let activeMonth = controller.get('activeMonth');
    let currentMonth = moment().format('MM');
    return activeMonth === currentMonth;
  }),

  /**
   * Maintains the value which of year activities displaying
   * @type {Integer}
   */
  activeYear: Ember.computed(function() {
    return moment().format('YYYY');
  }),

  /**
   * @property {String} userAgent
   */
  userAgent: 'desktop',

  /**
   * @property {Boolean} isExpandedView
   */
  isExpandedView: false,

  /**
   * @property {Boolean} isShowAtcView
   */
  isShowAtcView: Ember.computed('students', 'courseId', function() {
    const controller = this;
    let isStudentsAvailable = controller.get('students.length');
    let isCourseMapped = controller.get('courseId');
    return isStudentsAvailable && isCourseMapped;
  }),

  /**
   * @property {Boolean} isShowActivitySearchContentPullup
   * Property to show/hide activity search content pullup
   */
  isShowActivitySearchContentPullup: false,

  /**
   * @property {String} defaultContentTypeToSuggest
   * Property to hold default content suggstion
   */
  defaultContentTypeToSuggest: 'collection',

  /**
   * @property {Array} selectedStudents
   * Property to hold list of students to suggest
   */
  selectedStudents: Ember.A([]),

  /**
   * @property {Json} classPreference
   */
  classPreference: Ember.computed.alias('class.preference'),

  /**
   * @property {Number} maxLimitToSuggestContent
   */
  maxLimitToSuggestContent: 6,

  /**
   * @property {Array} fwCompetencies
   */
  fwCompetencies: Ember.computed.alias('classController.fwCompetencies'),

  /**
   * @property {Array} fwDomains
   */
  fwDomains: Ember.computed.alias('classController.fwDomains'),

  secondaryClassess: Ember.computed.alias('classController.secondaryClassess'),

  secondaryClassToBeShownList: Ember.computed('secondaryClassess', function() {
    return this.get('secondaryClassess')
      ? this.get('secondaryClassess')
      : Ember.A([]);
  }),

  selectedSecondaryClassList: Ember.A([]),

  isMultiClassEnabled: Ember.computed.alias(
    'classController.isMultiClassEnabled'
  ),

  // -------------------------------------------------------------------------
  // Events
  initializeController() {
    const controller = this;
    if (controller.get('isPremiumClass') && controller.get('isShowAtcView')) {
      if (isCompatibleVW('medium')) {
        controller.set('userAgent', 'mobile');
      }
      controller.loadData();
    }
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    onSelectSecondaryClass(secondaryClass) {
      const controller = this;
      controller.get('selectedSecondaryClassList').pushObject(secondaryClass);
      controller
        .get('secondaryClassToBeShownList')
        .removeObject(secondaryClass);
    },

    onRemoveClassView(classId) {
      const controller = this;
      controller.get('selectedSecondaryClassList').removeObject(classId);
      controller.get('secondaryClassToBeShownList').pushObject(classId);
    }
  }

  // -------------------------------------------------------------------------
  // Functions
});
