import Ember from 'ember';
import PlayerController from 'gooru-web/controllers/player';

/**
 * Study Player Controller
 *
 * @module
 * @augments ember/PlayerController
 */
export default PlayerController.extend({
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
    'milestoneId'
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
      isNotification: false
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
  }
});
