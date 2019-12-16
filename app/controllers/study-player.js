import Ember from 'ember';
import PlayerController from 'gooru-web/controllers/player';
import { ROLES } from 'gooru-web/config/config';
import studyPlayer from 'gooru-web/mixins/study-player';
/**
 * Study Player Controller
 *
 * @module
 * @augments ember/PlayerController
 */
export default PlayerController.extend(studyPlayer, {
  queryParams: [
    'resourceId',
    'role',
    'type',
    'subtype',
    'sourceId',
    'classId',
    'unitId',
    'lessonId',
    'collectionId',
    'source',
    'pathId',
    'minScore',
    'collectionSource',
    'isStudyPlayer',
    'pathType',
    'itemId',
    'isNotification',
    'milestoneId',
    'isIframeMode'
  ],

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {CourseMapService}
   */
  courseMapService: Ember.inject.service('api-sdk/course-map'),

  /**
   * @property {NavigateMapService}
   */
  navigateMapService: Ember.inject.service('api-sdk/navigate-map'),

  /**
   * @type {AttemptService} attemptService
   * @property {Ember.Service} Service to send attempt related events
   */
  quizzesAttemptService: Ember.inject.service('quizzes/attempt'),

  session: Ember.inject.service('session'),

  /**
   * @dependency {i18nService} Service to retrieve translations information
   */
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * If the user want to continue playing the collection
     */
    playActualCollection: function() {
      const navigateMapService = this.get('navigateMapService');
      navigateMapService
        .getStoredNext()
        .then(mapLocation => navigateMapService.next(mapLocation.context))
        .then(() => this.set('showSuggestion', false));
    },

    updateModel(option) {
      this.send('updateModelM', option);
    },

    onPlayNext: function() {
      const controller = this;
      let contextId = controller.get('contextResult.context.id');
      let profileId = controller.get('session.userData.gooruUId');
      const navigateMapService = controller.get('navigateMapService');
      controller
        .get('quizzesAttemptService')
        .getAttemptIds(contextId, profileId)
        .then(attemptIds =>
          !attemptIds || !attemptIds.length
            ? {}
            : controller
              .get('quizzesAttemptService')
              .getAttemptData(attemptIds[attemptIds.length - 1])
        )
        .then(attemptData =>
          Ember.RSVP.hash({
            attemptData,
            mapLocationNxt: navigateMapService.getStoredNext()
          })
        )
        .then(({ mapLocationNxt, attemptData }) => {
          if (controller.get('hasSuggestion')) {
            mapLocationNxt.context.set('status', 'content-served');
          }

          mapLocationNxt.context.set('score', attemptData.get('averageScore'));
          return navigateMapService.next(mapLocationNxt.context);
        })
        .then(({ context, suggestions, hasContent }) => {
          controller.set('mapLocation.context', context);
          controller.set('mapLocation.suggestions', suggestions);
          controller.set('mapLocation.hasContent', hasContent);
          controller.checknPlayNext();
        });
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {string}
   */
  classId: null,

  /**
   * @property {string}
   */
  milestoneId: null,

  /**
   * @property {string}
   */
  unitId: null,

  /**
   * @property {string}
   */
  lessonId: null,

  /**
   * @property {string}
   */
  collectionId: null,

  /**
   * @property {string}
   */
  pathId: null,

  /**
   * student test report shows confetti badge.
   * @property {integer}
   */
  minScore: null,

  /**
   * Source of collection
   * @property {Sring}
   */
  collectionSource: null,

  /**
   * @property {Boolean}
   * Property to find out whether study-player rendered or not
   */
  isStudyPlayer: true,

  /**
   * Indicate if show pre test suggestion
   * @property {Boolean} showSuggestion
   */
  showSuggestion: true,

  /**
   * Current map location
   * @property {MapLocation}
   */
  mapLocation: null,

  /**
   * Indicates if it should default player header
   * @property {boolean}
   */
  showPlayerHeader: false,

  /**
   * @property {Array} list of suggested resources of a collection
   */
  suggestedResources: null,

  /**
   * @property {Boolean} isFullScreen
   * Property to enable/disable fullscreen mode
   */
  isFullScreen: false,

  isNotification: false,

  isIframeMode: false,

  /**
   * Resets to default values
   */
  resetValues: function() {
    //TODO: call the parent reset values method
    this.setProperties({
      showSuggestion: true,
      classId: null,
      milestoneId: null,
      unitId: null,
      lessonId: null,
      collectionId: null,
      resourceId: null,
      type: null,
      isStudyPlayer: true,
      isNotification: false,
      isIframeMode: false
    });
  },

  /**
   * @function toggleScreenMode
   * Method to toggle screen mode
   */
  toggleScreenMode() {
    let controller = this;
    let isFullScreen = controller.get('isFullScreen');
    if (isFullScreen) {
      Ember.$('body').addClass('fullscreen');
    } else {
      Ember.$('body').removeClass('fullscreen');
    }
  },

  /**
   * Navigate to study player to play next collection/assessment
   */
  toPlayer: function(suggestion) {
    const context = this.get('mapLocation.context');
    let queryParams = {
      role: ROLES.STUDENT,
      source: this.get('source'),
      isIframeMode: this.get('isIframeMode')
    };
    let classId = context.get('classId');
    if (classId) {
      queryParams.classId = classId;
    }
    let milestoneId = context.get('milestoneId');
    if (milestoneId) {
      queryParams.milestoneId = milestoneId;
    }
    if (suggestion) {
      queryParams.courseId = context.courseId;
      queryParams.milestoneId = context.get('milestoneId');
      queryParams.unitId = context.get('unitId');
      queryParams.lessonId = context.lessonId;
      queryParams.collectionId = suggestion.get('id');
      queryParams.pathId = suggestion.pathId;
      queryParams.subtype =
        suggestion.subType === 'signature_collection'
          ? 'signature-collection'
          : 'signature-assessment';
      queryParams.pathType = 'system';
      this.set('isShowActivityFeedback', false);
      this.transitionToRoute('study-player', context.get('courseId'), {
        queryParams
      });
      this.get('target').send('reloadPlayer');
    } else {
      this.set('isShowActivityFeedback', false);
      queryParams.type = context.itemType || null; //Type is important to decide whether next item is external or normal
      queryParams.pathId = context.pathId || 0;
      queryParams.pathType = context.pathType || null;
      this.transitionToRoute('study-player', context.get('courseId'), {
        queryParams
      });
      this.get('target').send('reloadPlayer');
    }
  }
});
