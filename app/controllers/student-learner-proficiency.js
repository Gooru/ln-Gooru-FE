import Ember from 'ember';
import StudentLearnerProficiency from 'gooru-web/mixins/student-learner-proficiency';
import { ROLES } from 'gooru-web/config/config';
export default Ember.Controller.extend(StudentLearnerProficiency, {
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
        .then(
          attemptIds =>
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

    /**
     * Action triggered when the user accept a suggestion
     */
    onAcceptSuggestion() {
      let controller = this;
      let suggestedContent = controller.get('suggestedContent');
      controller.playSuggestedContent(suggestedContent);
      controller.set('isShowSuggestion', false);
    },

    /**
     * Action triggered when the user ignore a suggestion
     */
    onIgnoreSuggestion() {
      let controller = this;
      controller.playNextContent();
      controller.set('isShowSuggestion', false);
    },

    /**
     * Action triggered when toggle screen mode
     */
    onToggleScreen() {
      let controller = this;
      let studyPlayerController = controller.get('studyPlayerController');
      let isFullScreen = studyPlayerController.get('isFullScreen');
      studyPlayerController.set('isFullScreen', !isFullScreen);
      controller.set('isFullScreen', !isFullScreen);
      if (isFullScreen) {
        Ember.$('body')
          .removeClass('fullscreen')
          .addClass('fullscreen-exit');
      } else {
        Ember.$('body')
          .removeClass('fullscreen-exit')
          .addClass('fullscreen');
      }
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
    return suggestions ? suggestions[0] : null;
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
   * @function checknPlayNext
   * Removing dependency on local storage and  bypassing next call when dont have a suggestion
   */
  checknPlayNext: function() {
    if (this.get('hasAnySuggestion')) {
      this.playNextContent();
    } else {
      const context = this.get('mapLocation.context'); //Already having context
      this.playGivenContent(context);
    }
  },

  /**
   * @function playNextContent
   * Method to play next content
   */
  playNextContent: function() {
    const component = this;
    const navigateMapService = this.get('navigateMapService');
    const context = this.get('mapLocation.context');
    navigateMapService.next(context).then(nextContext => {
      component.set('mapLocation', nextContext);
      component.playGivenContent(nextContext.context);
    });
  },

  /**
   * @function playGivenContent
   * Method to play given content
   */
  playGivenContent: function(context) {
    let status = (context.get('status') || '').toLowerCase();
    if (status !== 'done') {
      this.toPlayer();
    } else {
      this.set('mapLocation.context.status', 'done');
      this.set('hasSignatureCollectionSuggestions', false);
      this.set('hasSignatureCollectionSuggestions', false);
    }
  },

  /**
   * @function playSuggestedContent
   * Method to play suggested content
   */
  playSuggestedContent: function(suggestion) {
    const navigateMapService = this.get('navigateMapService');
    const courseMapService = this.get('courseMapService');
    navigateMapService
      .getStoredNext()
      .then(mapstoredloc => {
        let mapContext = mapstoredloc.get('context');
        var mapcontextloc = mapstoredloc.get('context');
        mapContext.ctx_user_id = this.get('session.userId');
        mapContext.ctx_class_id = mapContext.classId;
        mapContext.ctx_course_id = mapContext.courseId;
        mapContext.ctx_lesson_id = mapContext.lessonId;
        mapContext.ctx_collection_id = mapContext.collectionId;
        mapContext.ctx_milestone_id = mapContext.milestoneId;
        mapContext.ctx_unit_id = mapContext.unitId;
        mapContext.milestone_id = mapContext.milestoneId;
        mapContext.suggested_content_type = suggestion.type;
        mapContext.suggested_content_id = suggestion.id;
        mapContext.suggested_content_subtype =
          suggestion.subType === 'signature_collection'
            ? 'signature-collection'
            : 'signature-assessment';
        return Ember.RSVP.hash({
          context: mapcontextloc,
          pathId: courseMapService.addSuggestedPath(mapContext)
        });
      })
      .then(({ context, pathId }) => {
        context.collectionId = suggestion.id; // Setting new collection id
        context.pathId = pathId;
        //context.pathtype = "system"; //set system path only if required
        suggestion.pathId = pathId;
        return navigateMapService.startAlternatePathSuggestion(context);
      })
      .then(() => this.toPlayer(suggestion));
  },

  /**
   * @function toPlayer
   * Method to redirect user to player
   */
  toPlayer: function(suggestion) {
    const context = this.get('mapLocation.context');
    let queryParams = {
      role: ROLES.STUDENT,
      source: this.get('source')
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
