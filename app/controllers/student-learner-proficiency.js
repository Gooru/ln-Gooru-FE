import Ember from 'ember';
import StudentLearnerProficiency from 'gooru-web/mixins/student-learner-proficiency';
import { ROLES } from 'gooru-web/config/config';
import studyPlayer from 'gooru-web/mixins/study-player';
export default Ember.Controller.extend(StudentLearnerProficiency, studyPlayer, {
  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {NavigateMapService}
   */
  navigateMapService: Ember.inject.service('api-sdk/navigate-map'),

  /**
   * @type {AttemptService} attemptService
   * @property {Ember.Service} Service to send attempt related events
   */
  quizzesAttemptService: Ember.inject.service('quizzes/attempt'),

  /**
   * @property {CourseMapService}
   */
  courseMapService: Ember.inject.service('api-sdk/course-map'),

  /**
   * @property {session}
   */
  session: Ember.inject.service('session'),

  /**
   * @requires studyPlayerController
   */
  studyPlayerController: Ember.inject.controller('study-player'),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    //Action triggered when click on next
    onPlayNext() {
      const controller = this;
      const navigateMapService = controller.get('navigateMapService');
      const profileId = controller.get('session.userData.gooruUId');
      const contextId = controller.get('contextId');
      controller
        .get('quizzesAttemptService')
        .getAttemptIds(contextId, profileId)
        .then(attemptIds =>
          !attemptIds || !attemptIds.length
            ? {}
            : this.get('quizzesAttemptService').getAttemptData(
              attemptIds[attemptIds.length - 1]
            )
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
          let suggestedContent = controller.get('suggestedContent');
          if (suggestedContent) {
            controller.set('isShowSuggestion', true);
          } else {
            controller.checknPlayNext();
          }
        });
    },

    closePullUp() {
      const component = this;
      component.set('isOpenPlayer', false);
    },

    playContent(queryParams, contentId, content) {
      const component = this;
      component.set(
        'playerUrl',
        component.target
          .get('router')
          .generate('player', contentId, { queryParams })
      );
      component.set('isOpenPlayer', true);
      component.set('playerContent', content);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {UUID} contextId
   */
  contextId: null,

  /**
   * Report Source Type
   * @property {String} source
   */
  source: null,

  /**
   * @property {String} role
   */
  role: null,

  /**
   * @property {UUID} unitId
   * Unit ID available in query param
   */
  unitId: null,

  /**
   * @property {UUID} lessonId
   * Lesson ID available in query param
   */
  lessonId: null,

  /**
   * @property {UUID} milestoneId
   * Milestone ID available in query param
   */
  milestoneId: null,

  /**
   * @property {Number} pathId
   * Path Id available in query param
   */
  pathId: 0,

  /**
   * @property {String} pathType
   * Path type available in query param
   */
  pathType: null,

  /**
   * @property {UUID} unitId
   * Unit ID available in query param
   */
  collectionType: null,

  /**
   * @property {UUID} unitId
   * Unit ID available in query param
   */
  collectionId: null,

  /**
   * @property {boolean}
   */
  hasSignatureCollectionSuggestions: Ember.computed.alias(
    'mapLocation.hasSignatureCollectionSuggestions'
  ),

  /**
   * @property {boolean}
   */
  hasSignatureAssessmentSuggestions: Ember.computed.alias(
    'mapLocation.hasSignatureAssessmentSuggestions'
  ),

  /**
   * @property {boolean}
   */
  isDone: Ember.computed('mapLocation.context.status', function() {
    return (
      (this.get('mapLocation.context.status') || '').toLowerCase() === 'done'
    );
  }),

  /**
   * @property {boolean}
   */
  hasAnySuggestion: Ember.computed(
    'hasSignatureAssessmentSuggestions',
    'hasSignatureCollectionSuggestions',
    'showSuggestion',
    function() {
      return (
        (this.get('hasSignatureCollectionSuggestions') ||
          this.get('hasSignatureAssessmentSuggestions')) &&
        this.get('showSuggestion')
      );
    }
  ),

  /**
   * @property {Json}
   * Computed property to store suggestedContent
   */
  suggestedContent: Ember.computed('mapLocation', function() {
    let controller = this;
    let suggestions = controller.get('mapLocation.suggestions');
    return suggestions && suggestions[0] ? suggestions[0] : null;
  }),

  /**
   * @property {Boolean} isPlayerProficiency
   * Property to check whether to show player proficiency or not
   */
  isPlayerProficiency: Ember.computed('contextId', function() {
    return !!this.get('contextId');
  }),

  /**
   * @property {Boolean} isFullScreen
   */
  isFullScreen: Ember.computed(function() {
    let controller = this;
    let studyPlayerController = controller.get('studyPlayerController');
    let isFullScreen = studyPlayerController.get('isFullScreen');
    return isFullScreen;
  }),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function toPlayer
   * Method to redirect user to player
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
      this.transitionToRoute('study-player', context.get('courseId'), {
        queryParams
      });
    } else {
      queryParams.type = context.itemType || null; //Type is important to decide whether next item is external or normal
      queryParams.pathId = context.pathId || 0;
      queryParams.pathType = context.pathType || null;
      this.transitionToRoute('study-player', context.get('courseId'), {
        queryParams
      });
    }
  }
});
