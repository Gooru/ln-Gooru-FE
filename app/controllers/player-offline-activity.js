import Ember from 'ember';
import { ROLES } from 'gooru-web/config/config';

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  queryParams: ['caContentId', 'offlineActivityId', 'classId', 'role'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    //Action triggered when click on start player
    onStartPlayer() {
      const controller = this;
      controller.set('isShowStartPlayer', false);
    },

    //Action triggered when click on close player
    onClosePlayer: function() {
      const controller = this;
      const classId = controller.get('classId');
      controller.transitionToRoute('student.class.class-activities', classId);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {UUID} caContentId
   * DCA content ID
   */
  caContentId: null,

  /**
   * @property {UUID} offlineActivityId
   */
  offlineActivityId: null,

  /**
   * @property {UUID} classId
   */
  classId: null,

  /**
   * @property {Object} role
   */
  role: ROLES.STUDENT,

  /**
   * @property {Boolean} isShowStartPlayer
   */
  isShowStartPlayer: true,

  /**
   * @property {Object} offlineActivity
   */
  offlineActivity: {}
});
