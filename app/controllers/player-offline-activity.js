import Ember from 'ember';
import { ROLES } from 'gooru-web/config/config';

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Attributes
  queryParams: ['caContentId', 'classId', 'role', 'isPreview'],

  // -------------------------------------------------------------------------
  // Dependencies
  oaAnalyticsService: Ember.inject.service(
    'api-sdk/offline-activity/oa-analytics'
  ),

  session: Ember.inject.service('session'),

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
   * Default role value
   */
  role: ROLES.STUDENT,

  /**
   * @property {Boolean} isShowStartPlayer
   */
  isShowStartPlayer: Ember.computed('offlineActivitySubmissions', function() {
    const controller = this;
    const offlineActivitySubmissions = controller.get(
      'offlineActivitySubmissions'
    );
    const oaTaskSubmissions = offlineActivitySubmissions
      ? offlineActivitySubmissions.tasks.objectAt(0)
      : null;
    return !(oaTaskSubmissions && oaTaskSubmissions.taskId);
  }),

  /**
   * @property {Object} offlineActivity
   */
  offlineActivity: {},

  /**
   * @property {Boolean} isPreview
   */
  isPreview: false,

  /**
   * @property {Boolean} isTeacher
   */
  isTeacher: Ember.computed.equal('role', ROLES.TEACHER),

  /**
   * @property {Object} offlineActivitySubmissions
   * Property for selected offline activity submissions
   */
  offlineActivitySubmissions: null,

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function loadOfflineActivitySubmissions
   * Method to load offline activity submissions
   */
  loadOfflineActivitySubmissions() {
    const controller = this;
    controller.set('isLoading', true);
    Ember.RSVP.hash({
      offlineActivitySubmissions: !(
        controller.get('isPreview') && controller.get('isTeacher')
      )
        ? controller.fetchTasksSubmissions()
        : null
    }).then(({ offlineActivitySubmissions }) => {
      controller.set('offlineActivitySubmissions', offlineActivitySubmissions);
      controller.set('isLoading', false);
    });
  },

  /**
   * @function fetchTasksSubmissions
   * Method to fetch student submitted oa task data
   */
  fetchTasksSubmissions() {
    const component = this;
    const classId = component.get('classId');
    const oaId = component.get('caContentId');
    const userId = component.get('session.userId');
    return component
      .get('oaAnalyticsService')
      .getSubmissionsToGrade(classId, oaId, userId);
  }
});
