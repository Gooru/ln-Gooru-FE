import Ember from 'ember';
import {
  getTimeInMillisec,
  formatTime as formatTimeInMilliSec
} from 'gooru-web/utils/utils';

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

  actions: {
    //Action triggered when toggle timespent entry container
    onToggleTimespent() {
      const component = this;
      component.toggleProperty('isTimespentExpanded');
      component.$('.timespent-container').slideToggle();
    },

    //Action triggered when save entered timespent
    onSaveTimespent() {
      const component = this;
      component.set('isTimespentExpanded', false);
      component.$('.timespent-container').slideUp();
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {UUID} userId
   */
  userId: Ember.computed.alias('session.userId'),

  /**
   * @property {Number} oaTimespentHour
   */
  oaTimespentHour: 0,

  /**
   * @property {Number} oaTimespentMinute
   */
  oaTimespentMinute: 0,

  /**
   * @property {Boolean} isTimespentExpanded
   */
  isTimespentExpanded: true,

  /**
   * @property {Number} timespentInMilliSec
   */
  timespentInMilliSec: Ember.computed(
    'oaTimespentHour',
    'oaTimespentMinute',
    function() {
      const component = this;
      let hour = component.get('oaTimespentHour') || 0;
      let minute = component.get('oaTimespentMinute') || 0;
      return getTimeInMillisec(hour, minute);
    }
  ),

  /**
   * @property {Number} timespentInMilliSecCopy
   * Property for copied version of timespent in millisec
   */
  timespentInMilliSecCopy: 0,

  /**
   * @property {Boolean} isEnableSaveTimespent
   */
  isEnableSaveTimespent: Ember.computed('timespentInMilliSec', function() {
    const component = this;
    const timespentInMilliSec = component.get('timespentInMilliSec');
    const timespentInMilliSecCopy = component.get('timespentInMilliSecCopy');
    return (
      timespentInMilliSec > timespentInMilliSecCopy &&
      component.validateOATimespent()
    );
  }),

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
        let oaRubrics = tasksSubmissions.get('oaRubrics');
        let submittedTimespentInMillisec = oaRubrics
          ? oaRubrics.get('studentGrades.timeSpent')
          : 0;
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
            let recentTaskSubmission = studentTaskSubmissions
              .get('submissions')
              .get('lastObject');
            if (recentTaskSubmission) {
              task.set(
                'submissionText',
                recentTaskSubmission.get('submissionText')
              );
            }
          }
        });
        if (submittedTimespentInMillisec) {
          component.set(
            'timespentInMilliSecCopy',
            submittedTimespentInMillisec
          );
          component.formatMillisecondsToHourMinute(
            formatTimeInMilliSec(submittedTimespentInMillisec)
          );
        }
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
  },

  /**
   * @function formatMillisecondsToHourMinute
   * Method to extract hour and minute from fullstring
   */
  formatMillisecondsToHourMinute(timeString) {
    const component = this;
    let hour = 0;
    let minute = 0;
    if (timeString) {
      let splittedTime = timeString.split(' ');
      let firstHalfString = splittedTime[0];
      let secodHalfString = splittedTime[1];
      if (firstHalfString.includes('h')) {
        hour = firstHalfString.slice(0, -1);
      } else if (firstHalfString.includes('m')) {
        minute = firstHalfString.slice(0, -1);
      }
      if (secodHalfString.includes('m')) {
        minute = secodHalfString.slice(0, -1);
      }
    }
    component.set('oaTimespentHour', hour);
    component.set('oaTimespentMinute', minute);
  },

  /**
   * @function validateOATimespent
   * Method to validate OA timespent
   */
  validateOATimespent() {
    const component = this;
    let isValidTimeSpent = false;
    let hour = component.get('oaTimespentHour') || 0;
    let minute = component.get('oaTimespentMinute') || 0;
    if (hour || minute) {
      isValidTimeSpent =
        hour > 0 ? minute >= 0 && minute < 60 : minute > 0 && minute <= 60;
    }
    return isValidTimeSpent;
  }
});
