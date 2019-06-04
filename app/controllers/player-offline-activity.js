import Ember from 'ember';
import { ROLES } from 'gooru-web/config/config';

export default Ember.Controller.extend({
  queryParams: ['caContentId', 'offlineActivityId', 'classId', 'role'],
  actions: {
    onStartPlayer() {
      const controller = this;
      controller.set('isShowStartPlayer', false);
    },

    /**
     * When closing the player
     */
    onClosePlayer: function() {
      const controller = this;
      const classId = controller.get('classId');
      controller.transitionToRoute('student.class.class-activities', classId);
    }
  },

  caContentId: null,

  offlineActivityId: null,

  classId: null,

  role: ROLES.STUDENT,

  isShowStartPlayer: true,

  offlineActivity: {}
});
