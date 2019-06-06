import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['offline-activity-player', 'gru-offline-activity-submission'],

  // -------------------------------------------------------------------------
  // Dependencies
  oaAnalyticsService: Ember.inject.service(
    'api-sdk/offline-activity/oa-analytics'
  ),

  session: Ember.inject.service('session'),

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    const component = this;
    component.loadTaskSubmissionData();
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {UUID} userId
   */
  userId: Ember.computed.alias('session.userId'),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function loadTaskSubmissionData
   * Method to load student submitted oa task data
   */
  loadTaskSubmissionData() {
    const component = this;
    component.set('isLoading', true);
    return Ember.RSVP.hash({
      tasksSubmissions: component.fetchTasksSubmissions()
    }).then(({ tasksSubmissions }) => {
      if (!component.isDestroyed) {
        let studentTasksSubmissions = tasksSubmissions.get('tasks');
        let activityTasks = component.get('offlineActivity.tasks');
        activityTasks.map(task => {
          let studentTaskSubmissions = studentTasksSubmissions.findBy(
            'taskId',
            task.get('id')
          );
          if (studentTaskSubmissions) {
            task.set(
              'studentTaskSubmissions',
              studentTaskSubmissions.get('submissions')
            );
            task.set(
              'submissionText',
              studentTaskSubmissions.get('submissions').objectAt(0)
                .submissionText
            );
          }
        });
        component.set('activityTasks', activityTasks);
        component.set('isLoading', false);
      }
    });
  },

  /**
   * @function fetchTasksSubmissions
   * Method to fetch student submitted oa task data
   */
  fetchTasksSubmissions() {
    const component = this;
    const classId = component.get('classId');
    const caContentId = component.get('caContentId');
    const userId = component.get('userId');
    return component
      .get('oaAnalyticsService')
      .getSubmissionsToGrade(classId, caContentId, userId);
  }
});
