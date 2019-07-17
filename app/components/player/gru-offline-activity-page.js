import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['oa-study-player', 'gru-offline-activity-page'],

  actions: {
    onStartPlayer() {
      const component = this;
      component.set('isShowLandingPage', false);
    },

    onClosePlayer() {
      // const component = this;
    }
  },

  isShowLandingPage: true,

  mapLocationContext: Ember.computed.alias('mapLocation.context'),

  classId: Ember.computed.alias('mapLocationContext.classId'),

  courseId: Ember.computed.alias('mapLocationContext.courseId'),

  unitId: Ember.computed.alias('mapLocationContext.unitId'),

  lessonId: Ember.computed.alias('mapLocationContext.lessonId')
});
