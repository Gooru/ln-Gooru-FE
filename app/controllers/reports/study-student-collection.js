import Ember from 'ember';
import StudentCollection from 'gooru-web/controllers/reports/student-collection';
import {
  ASSESSMENT_SUB_TYPES,
  ROLES,
  CONTENT_TYPES,
  SCORES,
  PLAYER_EVENT_MESSAGE
} from 'gooru-web/config/config';
import { getDomainCode } from 'gooru-web/utils/taxonomy';
import { getObjectCopy, getObjectsDeepCopy } from 'gooru-web/utils/utils';
import StudyPlayer from 'gooru-web/mixins/study-player';

/**
 *
 * Controls the access to the analytics data for a
 * student related to a collection of resources
 *
 */

export default StudentCollection.extend(StudyPlayer, {
  /**
   * Confetti Initialize once Component Initialize
   */
  confettiSetup() {
    let controller = this;
    let averageScore = controller.get('attemptData.averageScore');
    let minScore = controller.get('minScore');
    let role = controller.get('role');
    let type = controller.get('type');
    if (
      (role === 'student' &&
        type === 'assessment' &&
        minScore &&
        minScore <= averageScore) ||
      (role === 'student' && type === 'assessment' && averageScore >= 80)
    ) {
      Ember.run.later(function() {
        controller.set('enableConfetti', false);
      }, 5400);
      controller.set('enableConfetti', true);
    }
  },

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
   * @requires studyPlayerController
   */
  studyPlayerController: Ember.inject.controller('study-player'),

  /**
   * @dependency {i18nService} Service to retrieve translations information
   */
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered for the next button
     */
    next: function(controller = this) {
      let contextId = controller.get('contextId');
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
          let suggestedContent = controller.get('suggestedContent');
          if (suggestedContent) {
            controller.set('isShowActivityFeedback', false);
            controller.set('isShowSuggestion', true);
          } else {
            controller.checknPlayNext();
          }
          controller.toggleScreenMode();
          controller.set('isShowMasteryGreeting', false);
        });
    },

    OnShowMasteryOrNext() {
      const component = this;
      if (component.get('isLoadProficiencyProgress')) {
        component.set('isShowActivityFeedback', false);
        component.set('isShowMasteryGreeting', true);
      } else {
        component.actions.next(component);
      }
    },

    playSignatureAssessmentSuggestions: function() {
      this.playSuggestedContent(
        this.get('mapLocation.signatureAssessmentSuggestions')
      );
    },

    playSignatureCollectionSuggestions: function() {
      this.playSuggestedContent(
        this.get('mapLocation.signatureCollectionSuggestions')
      );
    },

    onRedirectToProfiencyProgress() {
      const controller = this;
      controller.showStudentProficiencyProgress();
      controller.set('isShowMasteryGreeting', false);
    },

    onExit(rouet, id) {
      const controller = this;
      let isIframeMode = controller.get('isIframeMode');
      if (isIframeMode) {
        window.parent.postMessage(PLAYER_EVENT_MESSAGE.GRU_PUllUP_CLOSE, '*');
      } else {
        controller.transitionToRoute(rouet, id);
      }
    },

    OnFeedbackCapture: function() {
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
      this.set('isShowActivityFeedback', true);
      this.set('isStatusDone', false);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Course} course
   */
  course: null,

  /**
   * @property {Unit} unit
   */
  unit: null,

  /**
   * @property {Lesson} lesson
   */
  lesson: null,

  /**
   * @property {Collection} collection
   */
  collection: null,

  /**
   *signatureAssessmentType suggestion
   * @property {String} signatureAssessmentType
   */
  signatureAssessmentType: ASSESSMENT_SUB_TYPES.SIGNATURE_ASSESSMENT,

  /**
   *signatureCollectionType suggestion
   * @property {String} signatureCollectionType
   */
  signatureCollectionType: ASSESSMENT_SUB_TYPES.SIGNATURE_COLLECTION,

  /**
   * Indicate if show pre test suggestion
   * @property {Boolean} showSuggestion
   */
  showSuggestion: true,

  /**
   * Current map location
   * @property {MapSuggestions}
   */
  mapLocation: null,

  /**
   * Current class  assessment minScore
   * @property {integer}
   */
  minScore: null,

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
   * @property {pathType}
   */
  pathType: null,

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
   * confettiTruth  for all statisfactions
   * @property {boolean} source
   */
  enableConfetti: false,

  /**
   * Report Source Type
   * @property {String}
   */
  source: null,

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
   * @property {Boolean}
   * Property to show/hide suggestion component
   */
  isShowSuggestion: false,

  /**
   * @property {Boolean} isFullScreen
   */
  isFullScreen: Ember.computed(function() {
    let controller = this;
    let studyPlayerController = controller.get('studyPlayerController');
    let isFullScreen = studyPlayerController.get('isFullScreen');
    return isFullScreen;
  }),

  /**
   * @property {Boolean} isPremiumCourse
   */
  isPremiumCourse: Ember.computed('course', function() {
    const controller = this;
    return controller.get('course.version') === 'premium';
  }),

  /**
   * @property {Boolean} isLoadProficiencyProgress
   */
  isLoadProficiencyProgress: Ember.computed(
    'attemptData.averageScore',
    'collectionObj',
    'isPremiumCourse',
    'mapLocation.context',
    'isAssessmentHasFRQ',
    function() {
      const controller = this;
      const averageScore = controller.get('attemptData.averageScore');
      const isPremiumCourse = controller.get('isPremiumCourse');
      const context = controller.get('mapLocation.context');
      const isAssessmentHasFRQ = controller.get('isAssessmentHasFRQ');
      const collectionObj = controller.get('collectionObj');
      const isTeaherSuggestion = context.get('pathType') === 'teacher';
      const isSignatureAssessment =
        context.get('itemSubType') === 'signature-assessment';
      return (
        isPremiumCourse &&
        context.get('itemType') === CONTENT_TYPES.ASSESSMENT &&
        collectionObj.get('gutCodes.length') &&
        !isAssessmentHasFRQ &&
        !isTeaherSuggestion &&
        !isSignatureAssessment &&
        averageScore >= SCORES.VERY_GOOD
      );
    }
  ),

  /**
   * @property {Boolean} isShowMasteryGreeting
   * Property to show mastery greeting message
   */
  isShowMasteryGreeting: false,

  /**
   * @property {Boolean} isAssessmentHasFRQ
   * Property to evaluate whether the completed collection has FR Question
   */
  isAssessmentHasFRQ: Ember.computed('collectionObj', function() {
    const controller = this;
    const questions = controller.get('collectionObj.children');
    const frQuesitons = questions.filter(question =>
      question.get('isOpenEnded')
    );
    return !!frQuesitons.length;
  }),

  isShowActivityFeedback: false,

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Resets to default values
   */
  resetValues: function() {
    this.setProperties({
      courseId: null,
      userId: null,
      role: null,
      contextId: null,
      source: null,
      classId: '',
      unitId: null,
      milestoneId: null,
      lessonId: null,
      collectionId: null,
      type: null,
      isShowMasteryGreeting: false
    });
  },

  /**
   * @function toggleScreenMode
   * Method to toggle screen mode
   */
  toggleScreenMode() {
    let controller = this;
    let studyPlayerController = controller.get('studyPlayerController');
    studyPlayerController.toggleScreenMode();
  },

  /**
   * @function showStudentProficiencyProgress
   * Method to redirect the student into the proficiency progress page whenever they acquired 80% or more
   */
  showStudentProficiencyProgress() {
    const controller = this;
    const contextId = controller.get('contextId');
    const profileId = controller.get('session.userData.gooruUId');
    const context = this.get('mapLocation.context');

    let queryParams = {
      classId: context.get('classId'),
      courseId: context.get('courseId'),
      contextId,
      role: ROLES.STUDENT,
      source: controller.get('source'),
      assessmentId: controller.get('collection.id'),
      collectionId: controller.get('collection.id'),
      milestoneId: context.get('milestoneId'),
      unitId: context.get('unitId'),
      lessonId: context.get('lessonId'),
      pathId: context.get('pathId') || 0,
      pathType: context.get('pathType') || null,
      isIframeMode: controller.get('isIframeMode')
    };
    controller.updateStudentMasteredCompetencies();
    controller.transitionToRoute('student-learner-proficiency', profileId, {
      queryParams
    });
  },

  /**
   * @function updateStudentMasteredCompetencies
   * Method to update the mastered competency into local storage to populate learner profile at FE
   */
  updateStudentMasteredCompetencies() {
    const controller = this;
    const localStorage = controller.get('navigateMapService').getLocalStorage();
    const storageKey = controller
      .get('navigateMapService')
      .getMasteredCompetenciesKey();
    let storedCompetencies = localStorage.getItem(storageKey);
    let studentMasteredCompetencies = storedCompetencies
      ? JSON.parse(storedCompetencies)
      : Ember.A([]);
    let masteredCompetencies = controller.get('collectionObj.gutCodes');
    masteredCompetencies.map(competencyCode => {
      if (
        !studentMasteredCompetencies.findBy('competencyCode', competencyCode)
      ) {
        let domainCode = getDomainCode(competencyCode);
        studentMasteredCompetencies.push({
          domainCode,
          competencyCode
        });
      }
    });
    studentMasteredCompetencies.filter(competency => {
      competency.isHighLight = false;
    });
    let lastMasteredCompetency = studentMasteredCompetencies.objectAt(
      studentMasteredCompetencies.length - 1
    );
    lastMasteredCompetency.isHighLight = true;
    localStorage.setItem(
      storageKey,
      JSON.stringify(studentMasteredCompetencies)
    );
  }
});
