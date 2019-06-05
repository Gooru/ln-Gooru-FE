import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['offline-activity-player', 'gru-offline-activity-submission'],

  oaAnalyticsService: Ember.inject.service(
    'api-sdk/offline-activity/oa-analytics'
  ),

  session: Ember.inject.service('session'),

  didInsertElement() {
    const component = this;
    component.loadTaskSubmissionData();
  },

  userId: Ember.computed.alias('session.userId'),

  loadTaskSubmissionData() {
    const component = this;
    component.set('isLoading', true);
    return Ember.RSVP
      .hash({
        tasksSubmissions: component.fetchTasksSubmissions()
      })
      .then(({ tasksSubmissions }) => {
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
