import Ember from 'ember';
import ConfigurationMixin from 'gooru-web/mixins/configuration';
import { getObjectCopy, getObjectsDeepCopy } from 'gooru-web/utils/utils';

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

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    captureFeedback: function() {
      const controller = this;
      let feedbackObj = getObjectCopy(controller.get('collectionObj'));
      feedbackObj.isCollection = controller.get('collection.isCollection');
      feedbackObj.children = getObjectsDeepCopy(
        controller.get('collectionObj.children')
      );
      let resourcesResult = controller.get('attemptData.resourceResults');
      let resourceList = feedbackObj.get('children');
      resourceList.map(resource => {
        let result = resourcesResult.findBy('resourceId', resource.id);
        resource.reaction = result.reaction;
        resource.savedTime = result.savedTime;
        resource.score = result.score;
        resource.skipped = result.skipped;
      });
      controller.set('feedbackObj', feedbackObj);
      controller.set('isShowActivityFeedback', true);
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

  isIframeMode: false,

  isShowActivityFeedback: false,

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
  })
});
