import Ember from 'ember';
import { ROLES, PLAYER_EVENT_SOURCE } from 'gooru-web/config/config';
import {
  createStudyPlayerQueryParams,
  hasSuggestions
} from 'gooru-web/utils/navigation-util';

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {NavigateMapService}
   */
  navigateMapService: Ember.inject.service('api-sdk/navigate-map'),

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
    return classData.route0Applicable;
  }),

  /**
   * @property {Number} classGrade
   */
  classGrade: Ember.computed('class', function() {
    let controller = this;
    let classData = controller.get('class');
    let classGrade = classData.get('grade');
    return classGrade ? parseInt(classGrade) : null;
  }),

  /**
   * @property {UUID} classId
   */
  classId: Ember.computed('class', function() {
    let controller = this;
    let classData = controller.get('class');
    return classData.get('id');
  }),

  /**
   * @property {UUID} courseId
   */
  courseId: Ember.computed('class', function() {
    let controller = this;
    let classData = controller.get('class');
    return classData.get('courseId');
  }),

  /**
   * @property {String} subjectCode
   */
  subjectCode: Ember.computed('class', function() {
    let aClass = this.get('class');
    let subject = aClass.get('preference.subject');
    return subject;
  }),

  // -------------------------------------------------------------------------
  // Methods

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
    nextPromise.then(controller.nextPromiseHandler).then(queryParams => {
      controller.transitionToRoute('study-player', courseId, {
        queryParams
      });
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
