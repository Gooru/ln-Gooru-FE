import Ember from 'ember';
import { ROLES, CONTENT_TYPES } from 'gooru-web/config/config';
import { roundFloat } from 'gooru-web/utils/math';

/**
 * Study Player External Controller
 *
 * @module
 */
export default Ember.Controller.extend({
  queryParams: [
    'resourceId',
    'role',
    'type',
    'sourceId',
    'classId',
    'courseId',
    'collectionId',
    'unitId',
    'lessonId',
    'milestoneId',
    'source'
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

  studyPlayerController: Ember.inject.controller('study-player'),

  /**
   * @property {Ember.Service} Service to retrieve an assessment
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  /**
   * @property {Ember.Service} Service to retrieve a collection
   */
  collectionService: Ember.inject.service('api-sdk/collection'),

  offlineActivityService: Ember.inject.service(
    'api-sdk/offline-activity/offline-activity'
  ),

  /**
   * @type {UnitService} Service to retrieve unit information
   */
  unitService: Ember.inject.service('api-sdk/unit'),

  /**
   * @type {LessonService} Service to retrieve lesson information
   */
  lessonService: Ember.inject.service('api-sdk/lesson'),

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
    playNext: function() {
      let controller = this;
      let submittedDataParams = controller.get('dataParams');
      let submittedScoreInPercentage = submittedDataParams
        ? controller.getScoreInPercentage(submittedDataParams)
        : null;
      controller.playNextContent(submittedScoreInPercentage);
    },

    /**
     * Action triggered when toggle screen view
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
   * @property {string}
   */
  classId: null,

  /**
   * @property {string}
   */
  courseId: null,

  /**
   * @property {string}
   */
  collectionId: null,

  /**
   * Indicates if it should show the back button
   * @property {boolean}
   */
  showBackButton: false,

  /**
   * @property {String} It decide to show the back to course map or not.
   */
  showBackToCourseMap: true,

  /**
   * Indicates if it should default player header
   * @property {boolean}
   */
  showPlayerHeader: false,

  /**
   * Current map location
   * @property {MapLocation}
   */
  mapLocation: null,

  /**
   * @property {Object} dataParams
   * Submitted external assessment data params
   */
  dataParams: null,

  /**
   * Resets to default values
   */
  resetValues: function() {
    //TODO: call the parent reset values method
    this.setProperties({
      collectionId: null,
      resourceId: null,
      type: null
    });
  },

  /**
   * @property {Boolean} isFullScreen
   */
  isFullScreen: Ember.computed(function() {
    let controller = this;
    let studyPlayerController = controller.get('studyPlayerController');
    let isFullScreen = studyPlayerController.get('isFullScreen');
    return isFullScreen;
  }),

  isAsssessment: Ember.computed('type', function() {
    let controller = this;
    let type = controller.get('type');
    return type === 'assessment-external';
  }),

  /**
   * @property {Boolean} isOfflineActivity
   * Property to whether the current item is an Offline Activity or not
   */
  isOfflineActivity: Ember.computed('type', function() {
    const component = this;
    return component.get('type') === CONTENT_TYPES.OFFLINE_ACTIVITY;
  }),

  isDone: false,

  /**
   * @property {Boolean} isShowOaLandingPage
   * Property to show/hide OA landing page
   */
  isShowOaLandingPage: true,

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Navigate to study player to play next collection/assessment
   */
  toPlayer: function() {
    const context = this.get('mapLocation.context');
    let queryParams = {
      role: ROLES.STUDENT,
      source: this.get('source')
    };
    let classId = context.get('classId');
    if (classId) {
      queryParams.classId = classId;
    }
    this.transitionToRoute('study-player', context.get('courseId'), {
      queryParams
    });
  },

  /**
   * @function playNextContent
   * Method to play next content
   */
  playNextContent: function(submittedScoreInPercentage) {
    const controller = this;
    const navigateMapService = this.get('navigateMapService');
    let context = this.get('mapLocation.context');
    context.score = submittedScoreInPercentage;
    navigateMapService
      .getStoredNext()
      .then(() => navigateMapService.next(context))
      .then(mapLocation => {
        let status = (mapLocation.get('context.status') || '').toLowerCase();
        let nextContentType = mapLocation.get('context.itemType');
        if (status === 'done') {
          controller.setProperties({
            isDone: true,
            hasAnySuggestion: false
          });
        } else {
          if (
            nextContentType === CONTENT_TYPES.EXTERNAL_ASSESSMENT ||
            nextContentType === CONTENT_TYPES.EXTERNAL_COLLECTION ||
            nextContentType === CONTENT_TYPES.OFFLINE_ACTIVITY
          ) {
            controller.playNextExternalContent(mapLocation);
          } else {
            controller.toPlayer();
          }
        }
      });
  },

  /**
   * @function playNextExternalContent
   * Method to play external content as next item
   */
  playNextExternalContent(mapLocation) {
    const controller = this;
    const context = mapLocation.get('context');
    const courseId = context.get('courseId');
    const unitId = context.get('unitId');
    const lessonId = context.get('lessonId');
    const collectionId = context.get('itemId');
    const collectionType = context.get('itemType');
    let unit = controller.get('unit');
    let lesson = controller.get('lesson');
    let lastPlayedUnitId = unit.get('id');
    let lastPlayedLessonId = lesson.get('id');
    return Ember.RSVP
      .hash({
        //loading breadcrumb information and navigation info
        unit:
          lastPlayedUnitId !== unitId
            ? controller.get('unitService').fetchById(courseId, unitId)
            : unit,
        lesson:
          lastPlayedLessonId !== lessonId
            ? controller
              .get('lessonService')
              .fetchById(courseId, unitId, lessonId)
            : lesson,
        collection:
          collectionType === CONTENT_TYPES.EXTERNAL_ASSESSMENT
            ? controller
              .get('assessmentService')
              .readExternalAssessment(collectionId)
            : collectionType === CONTENT_TYPES.OFFLINE_ACTIVITY
              ? controller
                .get('offlineActivityService')
                .readActivity(collectionId)
              : controller
                .get('collectionService')
                .readExternalCollection(collectionId)
      })
      .then(({ unit, lesson, collection }) => {
        controller.setProperties({
          unitId: unit.get('id'),
          lessonId: lesson.get('id'),
          collectionId: collection.get('id'),
          type: collectionType,
          unit,
          lesson,
          collection,
          mapLocation,
          content: mapLocation.get('content'),
          dataParams: null,
          isShowOaLandingPage: true //By default show OA Landing page
        });
      });
  },

  /**
   * @function getScoreInPercentage
   * Method to get score in percentage
   */
  getScoreInPercentage(dataParams) {
    let scoreInPercentage = dataParams.percent_score;
    if (!scoreInPercentage) {
      let score = parseInt(dataParams.score);
      let maxScore = parseInt(dataParams.max_score);
      scoreInPercentage = score / maxScore * 100;
    }
    return roundFloat(scoreInPercentage);
  }
});
