import Ember from 'ember';
import {
  ASSESSMENT_SUB_TYPES,
  EMOTION_VALUES,
  DISABLED_EMOTION_UNICODE
} from 'gooru-web/config/config';
import PlayerController from 'gooru-web/controllers/player';

/**
 *
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
    'pathId'
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

    /**
     * If the user want to continue playing the suggestion
     */
    playSuggestion: function() {
      const controller = this;
      const courseMapService = controller.get('courseMapService');
      const suggestion = controller.get('mapLocation.preTestSuggestion');
      const context = controller.get('mapLocation.context');
      courseMapService.createNewPath(context, suggestion).then(function() {
        Ember.run(() =>
          controller.setProperties({
            resourceId: null,
            unitId: null,
            lessonId: null,
            collectionId: null,
            type: null
          })
        );
        //sending action to route
        controller.send('loadPreTest');
      });
    },

    loadPreTest: () => {
      return true;
    },
    /**
     * It will set the choosen react value to context result.
     * This reaction data will send back to the quizzes events.
     * @param  {Number} It has the choosen react value.
     */
    onChooseReaction: function(value) {
      this.get('contextResult.resourceResults')
        .findBy('resourceId', this.get('resourceId'))
        .set('reaction', value);
    },
    /**
     * This get triggered when resource get selected from left nav of player.
     * @param  {Object} it has the resource object
     */
    onSelectNavigatorItem: function(resource) {
      let resourceResults = this.get('contextResult.resourceResults');
      let resourceResult = resourceResults.findBy('resourceId', resource.id);
      this.set('ratingScore', resourceResult.get('reaction'));
      let emotion = EMOTION_VALUES.findBy('value', this.get('ratingScore'));
      let selectedUnicode = emotion
        ? emotion.unicode
        : DISABLED_EMOTION_UNICODE;
      this.set('selectedUnicode', selectedUnicode);
    },
    /**
     * This action will triggered when start the player.
     */
    onStartPlayer: function() {
      let resourceId = this.get('resourceId');
      if (resourceId) {
        let resourceResults = this.get('contextResult.resourceResults');
        let resourceResult = resourceResults.findBy('resourceId', resourceId);
        if (resourceResult) {
          this.set('ratingScore', resourceResult.get('reaction'));
          let emotion = EMOTION_VALUES.findBy('value', this.get('ratingScore'));
          let selectedUnicode = emotion
            ? emotion.unicode
            : DISABLED_EMOTION_UNICODE;
          this.set('selectedUnicode', selectedUnicode);
        }
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
   * Indicates if it should show the back button
   * @property {boolean}
   */
  showBackButton: false,

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
   * @property {boolean}
   */
  hasPreTestSuggestions: Ember.computed.alias(
    'mapLocation.hasPreTestSuggestions'
  ),

  /**
   * Pre test suggestion
   * @property {String} typeSuggestion
   */
  typeSuggestion: ASSESSMENT_SUB_TYPES.PRE_TEST,

  /**
   * Shows the breadcrumbs info of the collection
   * @property {Array[]}
   */
  breadcrumbs: Ember.computed('collection', 'lesson', 'unit', function() {
    let unit = this.get('unit');
    let lesson = this.get('lesson');
    let collection = this.get('collection');
    let lessonChildren = lesson.children;
    let titles = Ember.A([]);

    let isChild = lessonChildren.findBy('id', collection.id);

    if (unit) {
      titles.push(
        Ember.Object.create({
          shortTitle: `U${unit.get('sequence')}`,
          actualTitle: unit.get('title')
        })
      );
    }
    if (lesson) {
      titles.push(
        Ember.Object.create({
          shortTitle: `L${lesson.get('sequence')}`,
          actualTitle: lesson.get('title')
        })
      );
    }
    if (collection && isChild) {
      if (collection.isCollection) {
        let collections = lessonChildren.filter(
          collection => collection.format === 'collection'
        );
        collections.forEach((child, index) => {
          if (child.id === collection.id) {
            let collectionSequence = index + 1;
            titles.push(
              Ember.Object.create({
                shortTitle: `C${collectionSequence}`,
                actualTitle: collection.get('title')
              })
            );
          }
        });
      } else {
        let assessments = lessonChildren.filter(
          assessment => assessment.format === 'assessment'
        );
        assessments.forEach((child, index) => {
          if (child.id === collection.id) {
            let assessmentSequence = index + 1;
            titles.push(
              Ember.Object.create({
                shortTitle: `A${assessmentSequence}`,
                actualTitle: collection.get('title')
              })
            );
          }
        });
      }
    } else {
      titles.push(
        Ember.Object.create({
          actualTitle: collection.get('title')
        })
      );
    }
    return titles;
  }),

  /**
   * Course version Name
   * @property {String}
   */
  courseVersion: Ember.computed.alias('course.version'),

  /**
   * property will have the rating score.
   * @property {Number}
   */
  ratingScore: 0,

  /**
   * Emotion unicode to show the choosen reaction.
   * @property {String}
   */
  selectedUnicode: DISABLED_EMOTION_UNICODE,

  /**
   * Course id
   * @property {String}
   */
  courseId: null,

  /**
   * This will decide to show react widget or not
   * @type {Boolean}
   */
  showReactButton: false,

  /**
   * Resets to default values
   */
  resetValues: function() {
    //TODO: call the parent reset values method
    this.setProperties({
      showSuggestion: true,
      classId: null,
      unitId: null,
      lessonId: null,
      collectionId: null,
      resourceId: null,
      type: null,
      selectedUnicode: DISABLED_EMOTION_UNICODE,
      ratingScore: null,
      courseVersion: null,
      courseId: null
    });
  }
});
