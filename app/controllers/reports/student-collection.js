import Ember from 'ember';
import ConfigurationMixin from 'gooru-web/mixins/configuration';
import { getObjectCopy, getObjectsDeepCopy } from 'gooru-web/utils/utils';
import { FEEDBACK_USER_CATEGORY } from 'gooru-web/config/config';

/**
 *
 * Controls the access to the analytics data for a
 * student related to a collection of resources
 *
 */

export default Ember.Controller.extend(ConfigurationMixin, {
  queryParams: [
    'classId',
    'courseId',
    'unitId',
    'lessonId',
    'collectionId',
    'userId',
    'type',
    'role',
    'contextId',
    'source',
    'minScore',
    'milestoneId',
    'isIframeMode'
  ],
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:api-sdk/taxonomy
   */
  taxonomyService: Ember.inject.service('api-sdk/taxonomy'),

  session: Ember.inject.service('session'),

  /**
   * @property {activityFeedbackService}
   */
  activityFeedbackService: Ember.inject.service('api-sdk/activity-feedback'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    captureFeedback: function() {
      this.set('isShowActivityFeedback', true);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {string} indicates if it is collection or assessment
   */
  type: null,

  /**
   * @property {string} indicates if it is a student or teacher view
   */
  role: null,

  /**
   * Indicates the component of the application that is originating the events
   * @property {String} source
   */
  source: null,

  /**
   * @property {Boolean} isAnonymous
   */
  isAnonymous: Ember.computed.alias('session.isAnonymous'),

  isIframeMode: false,

  isShowActivityFeedback: false,

  isFeedbackCapture: false,

  // -------------------------------------------------------------------------
  // Observers

  /**
   * Fill standards info when the report data changes
   */
  quizzesAttemptDataObserver: Ember.observer('attemptData', function() {
    let learningTargets = this.get('attemptData.mastery')
      ? this.get('attemptData.mastery')
      : [];
    if (learningTargets.length) {
      let taxonomyIds = learningTargets.mapBy('id');
      let taxonomyService = this.get('taxonomyService');
      taxonomyService
        .fetchCodesByIds(taxonomyIds)
        .then(function(taxonomyStandards) {
          learningTargets.forEach(function(learningTarget) {
            let learningTargetInfo = taxonomyStandards.findBy(
              'id',
              learningTarget.id
            );
            learningTarget.setProperties({
              displayCode: learningTargetInfo.code,
              description: learningTargetInfo.title
            });
          });
        });
    }
  }),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function fetchActivityFeedbackCateory
   * Method to fetch learning activity feedback
   */

  fetchActivityFeedbackCateory() {
    const controller = this;
    let role = controller.get('session.role');
    let userCategoryId = FEEDBACK_USER_CATEGORY[`${role}`];
    controller
      .get('activityFeedbackService')
      .getFeedbackCategory(userCategoryId)
      .then(categoryLists => {
        controller.set('categoryLists', categoryLists);
        let collectionFeedback = getObjectCopy(controller.get('collectionObj'));
        let isCollection = controller.get('collection.isCollection');
        let listOfResources = getObjectsDeepCopy(
          controller.get('collectionObj.children')
        );
        let resourcesResult = controller.get('attemptData.resourceResults');
        let contentCategory = isCollection
          ? categoryLists.get('collections')
          : categoryLists.get('assessments');
        let resourceList = Ember.A([]);
        listOfResources.map(resource => {
          let result = resourcesResult.findBy('resourceId', resource.id);
          let type = resource.get('content_format')
            ? resource.get('content_format')
            : 'question';
          let resourceCategory = categoryLists.get(`${type}s`);
          resource.set('reaction', result.reaction);
          resource.set('savedTime', result.savedTime);
          resource.set('score', result.score);
          resource.set('skipped', result.skipped);
          resource.set(
            'feedbackCategory',
            resourceCategory.sortBy('feedbackTypeId')
          );
          if (resourceCategory.length) {
            resourceList.push(resource);
          }
        });
        collectionFeedback.set('isCollection', isCollection);
        collectionFeedback.set('children', resourceList);
        collectionFeedback.set(
          'feedbackCategory',
          contentCategory.sortBy('feedbackTypeId')
        );
        if (
          (contentCategory && contentCategory.length) ||
          (resourceList && resourceList.length)
        ) {
          controller.set('collectionFeedback', collectionFeedback);
          this.set('isFeedbackCapture', true);
        }
      });
  }
});
