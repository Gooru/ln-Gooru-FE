import Ember from 'ember';
import { PLAYER_EVENT_SOURCE } from 'gooru-web/config/config';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['oa-study-player', 'gru-offline-activity-page'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    //Action triggered when click on start button
    onStartPlayer() {
      const component = this;
      component.set('isShowLandingPage', false);
    },

    //Action triggered when click on cancel button
    onClosePlayer() {
      const component = this;
      const classId = component.get('classId');
      const source = component.get('source');
      if (classId && source === PLAYER_EVENT_SOURCE.COURSE_MAP) {
        component
          .get('router')
          .transitionTo('student.class.course-map', classId, {
            queryParams: {
              refresh: true
            }
          });
      } else if (classId && source === PLAYER_EVENT_SOURCE.DAILY_CLASS) {
        component
          .get('router')
          .transitionTo('student.class.class-activities', classId);
      } else {
        component.get('router').transitionTo('student-home');
      }
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Boolean} isShowLandingPage
   * Property to show/hide OA start page
   */
  isShowLandingPage: true,

  /**
   * @property {Object} mapLocationContext
   * Property for current mapLocation context
   */
  mapLocationContext: Ember.computed.alias('mapLocation.context'),

  /**
   * @property {UUID} classId
   * Property for active class ID
   */
  classId: Ember.computed.alias('mapLocationContext.classId'),

  /**
   * @property {UUID} courseId
   * Property for active course ID
   */
  courseId: Ember.computed.alias('mapLocationContext.courseId'),

  /**
   * @property {UUID} unitId
   * Property for active Item's Unit ID
   */
  unitId: Ember.computed.alias('mapLocationContext.unitId'),

  /**
   * @property {UUID} lessonId
   * Property for active item's lesson ID
   */
  lessonId: Ember.computed.alias('mapLocationContext.lessonId')
});
