import Ember from 'ember';
import {
  PLAYER_EVENT_SOURCE,
  PLAYER_EVENT_MESSAGE
} from 'gooru-web/config/config';

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
    'lessonId',
    'isIframeMode'
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
      let isIframeMode = controller.get('isIframeMode');

      if (isIframeMode) {
        window.parent.postMessage(PLAYER_EVENT_MESSAGE.GRU_PUllUP_CLOSE, '*');
      } else if (source === PLAYER_EVENT_SOURCE.DAILY_CLASS) {
        controller.transitionToRoute('student.class.class-activities', classId);
      } else {
        controller.transitionToRoute('index');
      }
    }
  }
});
