import Ember from 'ember';
import { PLAYER_EVENT_SOURCE, SUGGESTION_TYPE } from 'gooru-web/config/config';

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
    showSuggestions() {
      let component = this;
      let panelContainerEle = component.$('.suggestions');
      if (!panelContainerEle.hasClass('active')) {
        panelContainerEle.slideDown({
          start: function() {
            component.$(this).addClass('active');
            component.$(this).css('display', 'grid');
            let classActivity = component.get('classActivity');
            classActivity.set('isSuggestionFetched', false);
            component.sendAction('onShowSuggestion', classActivity);
          }
        });
      } else {
        panelContainerEle.slideUp({
          start: function() {
            component.$(this).removeClass('active');
          }
        });
      }
    },
    /**
     * Action triggered when the user play collection
     */
    onPlaySuggestionContent(suggestionContent) {
      const component = this;
      const content = suggestionContent.get('collection');
      const contentId = suggestionContent.get('suggestedContentId');
      const collectionType = suggestionContent.get('suggestedContentType');
      const classData = component.get('class');
      const classId = classData.get('id');
      const caContentId = component.get('classActivity.id');
      const pathId = suggestionContent.get('suggestedToContext.firstObject.id');
      const pathType = component.get('suggestionPathType');
      let queryParams = {
        collectionId: contentId,
        classId,
        role: 'student',
        source: component.get('source'),
        type: collectionType,
        caContentId,
        pathId,
        pathType,
        isIframeMode: true
      };
      if (
        collectionType === 'assessment-external' ||
        collectionType === 'collection-external'
      ) {
        let playerUrl = component
          .get('router')
          .generate('player-external', { queryParams });
        component.sendAction('playContent', playerUrl, content);
      } else if (collectionType === 'offlineactivity') {
        queryParams.offlineActivityId = contentId;
        let playerUrl = component
          .get('router')
          .generate('player-offline-activity', contentId, { queryParams });
        component.sendAction('playContent', playerUrl, content);
      } else {
        let playerUrl = component
          .get('router')
          .generate('player', contentId, { queryParams });
        component.sendAction('playContent', playerUrl, content);
      }
      component.sendAction('playContent', playerUrl, Ember.Object.create({
        format: collectionType,
        title: suggestionContent.get('title'),
        thumbnailUrl: suggestionContent.get('url'),
        isSuggestedContentPlay: true
      }));
    },
    /**
     * Action triggred when dca report action invoke
     */
    studentDcaReport: function(assessment, studentPerformance, activityDate) {
      let classActivity = this.get('classActivity');
      this.sendAction(
        'studentDcaReport',
        assessment,
        studentPerformance,
        activityDate,
        classActivity,
        false
      );
    },

    studentSuggestionReport(suggestion) {
      let classActivity = this.get('classActivity');
      const activityDate = this.get('activityDate');
      this.sendAction(
        'studentDcaReport',
        suggestion,
        suggestion.get('performance'),
        activityDate,
        classActivity,
        true
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
        caContentId,
        isIframeMode: true
      };
      if (
        collectionType === 'assessment-external' ||
        collectionType === 'collection-external'
      ) {
        let playerUrl = component
          .get('router')
          .generate('player-external', { queryParams });
        component.sendAction('playContent', playerUrl, content);
      } else if (collectionType === 'offline-activity') {
        queryParams.offlineActivityId = contentId;
        let playerUrl = component
          .get('router')
          .generate('player-offline-activity', contentId, { queryParams });
        component.sendAction('playContent', playerUrl, content);
      } else {
        let playerUrl = component
          .get('router')
          .generate('player', contentId, { queryParams });
        component.sendAction('playContent', playerUrl, content);
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
   * @property {Number} suggestionCount
   */
  suggestionCount: Ember.computed.alias('classActivity.suggestionCount'),

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

  isOfflineActivity: Ember.computed.equal(
    'item.format',
    PLAYER_EVENT_SOURCE.OFFLINE_CLASS
  ),

  suggestionPathType: SUGGESTION_TYPE.CA_TEACHER,

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
  }),

  /**
   * It is used to find activity is future or not
   * @return {Boolean}
   */
  isActivityFuture: Ember.computed('activityDate', function() {
    let activityDate = this.get('activityDate');
    let currentDate = moment().format('YYYY-MM-DD');
    return moment(activityDate).isAfter(currentDate);
  }),

  suggestions: Ember.computed.alias('classActivity.suggestions')
});
