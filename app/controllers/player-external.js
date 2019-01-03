import Ember from 'ember';
import { PLAYER_EVENT_SOURCE } from 'gooru-web/config/config';

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Attributes
  queryParams: [
    'role',
    'type',
    'classId',
    'collectionId',
    'source',
    'courseId',
    'unitId',
    'lessonId'
  ],

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Actrion triggered when close external assessment player
     */
    onClosePlayer() {
      let controller = this;
      let classId = controller.get('classId');
      let source = controller.get('source');
      if (source === PLAYER_EVENT_SOURCE.DAILY_CLASS) {
        controller.transitionToRoute('student.class.class-activities', classId);
      } else {
        controller.transitionToRoute('index');
      }
    }
  }
});
