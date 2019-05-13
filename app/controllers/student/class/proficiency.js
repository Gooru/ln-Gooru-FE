import Ember from 'ember';
import {
  ROLES,
  PLAYER_EVENT_SOURCE,
  CLASS_SKYLINE_INITIAL_DESTINATION
} from 'gooru-web/config/config';
import {
  createStudyPlayerQueryParams,
  hasSuggestions
} from 'gooru-web/utils/navigation-util';

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {SkylineInitialService} Service to retrieve skyline initial service
   */
  skylineInitialService: Ember.inject.service('api-sdk/skyline-initial'),

  /**
   * @property {NavigateMapService}
   */
  navigateMapService: Ember.inject.service('api-sdk/navigate-map'),

  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service('api-sdk/class'),

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  /**
   * @property {Service} Notifications service
   */
  notifications: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Action triggered when select next action
     */
    onMoveNext(curStep) {
      let controller = this;
      if (curStep === 'playNext') {
        controller.startPlaying();
      } else if (curStep === 'destination') {
        let classId = controller.get('classId');
        controller.get('classService').updateProfileBaseline(classId);
      }
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Boolean} isShowRoute0Destination
   */
  isShowRoute0Destination: false,

  /**
   * @property {Boolean} isShowInspectDestination
   */
  isShowInspectDestination: false,

  /**
   * @property {Boolean} isRoute0Applicable
   */
  isRoute0Applicable: Ember.computed('class', function() {
    let controller = this;
    let classData = controller.get('class');
    return classData.get('route0Applicable');
  }),

  /**
   * @property {Number} classGrade
   */
  classGrade: Ember.computed('class', function() {
    let controller = this;
    let classData = controller.get('class');
    let classGrade = classData.get('gradeCurrent');
    return classGrade ? parseInt(classGrade) : null;
  }),

  /**
   * @property {UUID} classId
   */
  classId: Ember.computed.alias('class.id'),

  /**
   * @property {UUID} courseId
   */
  courseId: Ember.computed.alias('class.courseId'),

  /**
   * @property {String} subjectCode
   */
  subjectCode: Ember.computed.alias('class.preference.subject'),

  /**
   * Property used to identify destination.
   * @type {String}
   */
  destination: Ember.computed.alias('skylineInitialState.destination'),

  /**
   * Property used to identify the status of LP computation
   * @type {Boolean}
   */
  isLPComputeInprogress: Ember.computed.equal(
    'destination',
    CLASS_SKYLINE_INITIAL_DESTINATION.ILPInProgress
  ),

  /**
   * Maintains the status check interval value
   * @return {Number}
   */
  pollingStatusCheckInterval: 5000,

  /**
   * Maintains state of chart needs to redraw or not.
   * @type {Boolean}
   */
  reDrawChart: false,

  /**
   * Maintains the state check interval object
   */
  stateCheckInterval: null,

  // -------------------------------------------------------------------------
  // Methods

  initialize() {
    let controller = this;
    controller._super(...arguments);
    Ember.run.scheduleOnce('afterRender', controller, function() {
      controller.checkStateOfSkylineInitial();
    });
  },

  /**
   * Method used to check the status of  skyline initial.
   */
  checkStateOfSkylineInitial() {
    let controller = this;
    let isLPComputeInprogress = controller.get('isLPComputeInprogress');
    if (isLPComputeInprogress) {
      let pollingStatusCheckInterval = controller.get(
        'pollingStatusCheckInterval'
      );
      let stateCheckInterval = Ember.run.later(function() {
        controller.loadSkylineIntialState();
      }, pollingStatusCheckInterval);
      controller.set('stateCheckInterval', stateCheckInterval);
    }
  },

  /**
   * Method used to load the skyline intial state data
   */
  loadSkylineIntialState() {
    let controller = this;
    let classId = controller.get('classId');
    controller
      .get('skylineInitialService')
      .fetchState(classId)
      .then(skylineInitialStateRes => {
        if (!controller.get('isDestroyed')) {
          let skylineInitialState = controller.get('skylineInitialState');
          skylineInitialState.set(
            'destination',
            skylineInitialStateRes.get('destination')
          );
          skylineInitialState.set(
            'context',
            skylineInitialStateRes.get('context')
          );
          let isLPComputeInprogress = controller.get('isLPComputeInprogress');
          if (isLPComputeInprogress) {
            controller.checkStateOfSkylineInitial();
          } else {
            controller.set('reDrawChart', true);
          }
        }
      });
  },

  /**
   * @function startPlaying
   * Method to play first item that needs to be played
   */
  startPlaying() {
    const controller = this;
    let classData = controller.get('class');
    let navigateMapService = controller.get('navigateMapService');
    let classId = classData.get('id');
    let courseId = classData.get('courseId');
    let options = {
        role: ROLES.STUDENT,
        source: PLAYER_EVENT_SOURCE.COURSE_MAP,
        courseId,
        classId
      },
      nextPromise = null;
    //start studying
    nextPromise = navigateMapService.continueCourse(
      options.courseId,
      options.classId
    );
    const errorMessage = controller
      .get('i18n')
      .t('common.errors.no-studymaterial').string;

    controller.get('notifications').clear();
    controller.get('notifications').setOptions({
      positionClass: 'toast-top-full-width student-class-proficiency'
    });
    nextPromise
      .then(controller.nextPromiseHandler)
      .then(queryParams => {
        if (queryParams.collectionId) {
          controller.transitionToRoute('study-player', courseId, {
            queryParams
          });
        } else {
          controller.get('notifications').warning(errorMessage);
          navigateMapService
            .getLocalStorage()
            .removeItem(navigateMapService.generateKey());
        }
      })
      .catch(() => {
        controller.get('notifications').warning(errorMessage);
        navigateMapService
          .getLocalStorage()
          .removeItem(navigateMapService.generateKey());
      });
  },

  /**
   * @function nextPromiseHandler
   */
  nextPromiseHandler(resp) {
    let queryParams = {
      role: ROLES.STUDENT,
      source: PLAYER_EVENT_SOURCE.COURSE_MAP,
      courseId: hasSuggestions(resp) ? resp.context.courseId : resp.courseId // Only in case of suggestions we dont have courseId in suggestion
    };
    queryParams = createStudyPlayerQueryParams(
      hasSuggestions(resp) ? resp.suggestions[0] : resp.context || resp,
      queryParams
    );
    return Ember.RSVP.resolve(queryParams);
  }
});
