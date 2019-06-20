import Ember from 'ember';
import { ROLES } from 'gooru-web/config/config';

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  queryParams: [
    'caContentId',
    'offlineActivityId',
    'classId',
    'role',
    'isPreview'
  ],

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
      //Redirect to CA if class ID is available otherwise go back to last accessed url
      if (classId) {
        controller.transitionToRoute('student.class.class-activities', classId);
      } else {
        window.history.back();
      }
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
  offlineActivity: {},

  /**
   * @property {Boolean} isPreview
   */
  isPreview: false
});
