import Ember from 'ember';
import { PLAYER_EVENT_SOURCE } from 'gooru-web/config/config';

export default Ember.Component.extend({
  classNames: ['oa-study-player', 'gru-offline-activity-page'],

  actions: {
    onStartPlayer() {
      const component = this;
      component.set('isShowLandingPage', false);
    },

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

  isShowLandingPage: true,

  mapLocationContext: Ember.computed.alias('mapLocation.context'),

  classId: Ember.computed.alias('mapLocationContext.classId'),

  courseId: Ember.computed.alias('mapLocationContext.courseId'),

  unitId: Ember.computed.alias('mapLocationContext.unitId'),

  lessonId: Ember.computed.alias('mapLocationContext.lessonId')
});
