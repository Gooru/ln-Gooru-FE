import Ember from 'ember';
import { getBarGradeColor } from 'gooru-web/utils/utils';

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
  classNames: ['gru-student-class-card'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Opens the study player
     *
     * @function actions:playCollection
     * @param {string} type - collection or assessment
     * @param {string} item - collection, assessment, lesson or resource
     */
    playCollection: function() {
      const component = this;
      const currentLocation = component.get('class.currentLocation');
      let classData = component.get('class');
      let setting = classData.get('setting');
      let isPremiumCourse = setting
        ? setting['course.premium'] && setting['course.premium'] === true
        : false;
      let isGradeAdded = classData.get('grade');
      if (isPremiumCourse && !currentLocation && isGradeAdded) {
        component
          .get('router')
          .transitionTo('student.class.course-map', classData.get('id'));
      } else {
        component.sendAction('onPlayCollection', currentLocation, classData);
      }
    },

    /**
     *
     * Triggered when an menu item is selected
     * @param item
     */
    selectItem: function(item) {
      const classId = this.get('class.id');
      if (this.get('onItemSelected')) {
        this.sendAction('onItemSelected', item, classId);
      }
    },

    /**
     * Action triggered when clear alert message
     */
    onClearAlert() {
      let component = this;
      let classData = component.get('class');
      classData.set('isNotAbleToStartPlayer', false);
    }
  },

  didRender() {
    var component = this;
    component.$('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
  },
  // -------------------------------------------------------------------------
  // Events

  init: function() {
    let controller = this;
    controller._super(...arguments);
    // const configuration = controller.get('configurationService.configuration');
    // let isDemoClass =
    //   configuration.get('demoClass.code') === controller.get('class.code');
    // controller.set('isDemoClass', isDemoClass);
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
   * @property {boolean}
   * Computed property to identify class is demo class or not
   */
  isDemoClass: Ember.computed('demoClass', function() {
    let controller = this;
    return controller.get('demoClass.code') === controller.get('class.code');
  }),

  /**
   * @property {boolean} Show or not the current location
   */
  showCurrentLocation: Ember.computed('class.currentLocation', function() {
    return this.get('class.currentLocation');
  }),

  /**
   * @property {Boolean} isCompleted
   */
  isCompleted: Ember.computed('showCurrentLocation', function() {
    let controller = this;
    let showCurrentLocation = controller.get('showCurrentLocation');
    let currentLocation = controller.get('class.currentLocation');
    return showCurrentLocation && currentLocation.get('status') === 'complete';
  }),

  /**
   * @property {Number} total
   * Computed property for performance total to add a default value
   */
  total: Ember.computed.alias('class.performanceSummary.total'),

  /**
   * @property {Number} totalCompleted
   * Computed property for performance total completed to add a default value
   */
  totalCompleted: Ember.computed.alias(
    'class.performanceSummary.totalCompleted'
  ),

  /**
   * @property {Number} score percentage
   * Computed property for performance score percentage
   */
  scorePercentage: Ember.computed('class.performanceSummary', function() {
    const scorePercentage = this.get('class.performanceSummary.score');
    return scorePercentage >= 0 && scorePercentage !== null
      ? `${scorePercentage}%`
      : '--';
  }),

  /**
   * @property {Boolean}
   * Computed property  to identify class is started or not
   */
  hasStarted: Ember.computed('class.performanceSummary', function() {
    const scorePercentage = this.get('class.performanceSummary.score');
    return scorePercentage !== null && scorePercentage >= 0;
  }),

  /**
   * @property {Number} completed percentage
   * Computed property for performance completed percentage
   */
  completedPercentage: Ember.computed('class.performanceSummary', function() {
    const completed = this.get('class.performanceSummary.totalCompleted');
    const total =
      completed > this.get('class.performanceSummary.total')
        ? completed
        : this.get('class.performanceSummary.total');
    const percentage = completed ? parseInt((completed / total) * 100) : 0;

    return this.get('class.performanceSummary') !== null && percentage
      ? `${percentage}% ${this.get('i18n').t('common.completed').string}`
      : this.get('i18n').t('cards.gru-class-card.student.not-started').string;
  }),

  /**
   * @property {[Number]} barChartData
   */
  barChartData: Ember.computed(
    'class.performanceSummary',
    'class.performanceSummary.score',
    function() {
      let score = this.get('class.performanceSummary.score');
      let scoreColor = getBarGradeColor(score);
      const completed = this.get('class.performanceSummary.totalCompleted');
      const total = this.get('class.performanceSummary.total');
      const percentage = completed ? (completed / total) * 100 : 0;
      return [
        {
          color: scoreColor,
          percentage
        }
      ];
    }
  ),

  /**
   * @property {String} current location title
   * Computed property for current Location Title
   */
  currentLocationTitle: Ember.computed('class.currentLocation', function() {
    const currentLocation = this.get('class.currentLocation');
    let pathType = currentLocation.get('pathType');
    let prepandText = pathType === 'route0' ? 'Pre-study: ' : '';
    return currentLocation
      ? `${prepandText}${currentLocation.get('collectionTitle')}`
      : '';
  }),

  collectionType: Ember.computed('class.currentLocation', function() {
    let component = this;
    let currentLocation = component.get('class.currentLocation');
    let collectionType = currentLocation.get('collectionType');
    return collectionType === 'collection' ? 'collection' : 'assessment';
  })
});
