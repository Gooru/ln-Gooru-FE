import Ember from 'ember';
import {
  PLAYER_EVENT_SOURCE
} from 'gooru-web/config/config';

/**
 * Student Class Activity Panel
 *
 * Panel that displays a collection/assessment information
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-student-class-activity-panel'],

  classNameBindings: [
    'visible:visibility-on:visibility-off',
    'item.isAssessment:assessment:collection'
  ],

  /**
   * @requires service:api-sdk/collection
   */
  collectionService: Ember.inject.service('api-sdk/collection'),
  /**
   * @type AnalyticsService
   */
  analyticsService: Ember.inject.service('api-sdk/analytics'),

  /**
   * @requires service:api-sdk/assessment
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  /**
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service('api-sdk/class-activity'),

  /**
   * @property {Ember.Service} session service
   */
  session: Ember.inject.service('session'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggred when dca report action invoke
     */
    studentDcaReport: function(assessment, studentPerformance, activityDate) {
      this.sendAction(
        'studentDcaReport',
        assessment,
        studentPerformance,
        activityDate
      );
    },

    /**
     * Action triggered when the user play collection
     */
    onPlayContent(classActivity) {
      let component = this;
      let content = classActivity.get('collection');
      let contentId = content.get('id');
      let collectionType = content.get('collectionType');
      let classData = component.get('class');
      let classId = classData.get('id');
      let caContentId = classActivity.get('id');
      let queryParams = {
        collectionId: content.get('id'),
        classId,
        role: 'student',
        source: component.get('source'),
        type: collectionType,
        caContentId
      };
      if (
        collectionType === 'assessment-external' ||
        collectionType === 'collection-external'
      ) {
        component.get('router').transitionTo('player-external', {
          queryParams
        });
      } else {
        component.get('router').transitionTo('player', contentId, {
          queryParams
        });
      }
    }
  },

  // -------------------------------------------------------------------------
  // Events

  didRender: function() {
    this._super(...arguments);
    this.$('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {ClassActivity}
   */
  classActivity: null,

  /**
   * @property {Class}
   */
  class: null,

  /**
   * @property {Collection/Assessment} item
   */
  item: Ember.computed.alias('classActivity.collection'),

  /**
   * @property {CollectionPerformanceSummary}
   */
  collectionPerformanceSummary: Ember.computed.alias(
    'classActivity.collection.performance'
  ),

  /**
   * @property {String} source
   */
  source: PLAYER_EVENT_SOURCE.DAILY_CLASS,

  /**
   * @property {boolean}
   */
  visible: Ember.computed.alias('classActivity.isActive'),


  isOfflineActivity: Ember.computed.equal('item.format', PLAYER_EVENT_SOURCE.OFFLINE_CLASS),

  /**
   * Class activity date
   * @type {Date}
   */
  activityDate: null,

  /**
   * It is used to find activity is today or not
   * @return {Boolean}
   */
  isToday: Ember.computed('activityDate', function() {
    let activityDate = this.get('activityDate');
    let currentDate = moment().format('YYYY-MM-DD');
    return currentDate === activityDate;
  })
});
