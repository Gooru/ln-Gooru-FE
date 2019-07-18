import Ember from 'ember';
import {
  getTimeInMillisec,
  formatTime as formatTimeInMilliSec
} from 'gooru-web/utils/utils';
import { ROLES, PLAYER_EVENT_SOURCE } from 'gooru-web/config/config';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['offline-activity-player', 'gru-offline-activity-submission'],

  classNameBindings: ['isPreview:player-preview', 'isOaCompleted:oa-completed'],

  // -------------------------------------------------------------------------
  // Dependencies
  oaAnalyticsService: Ember.inject.service(
    'api-sdk/offline-activity/oa-analytics'
  ),

  oaService: Ember.inject.service('api-sdk/offline-activity/offline-activity'),

  session: Ember.inject.service('session'),

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    const component = this;
    component.loadTaskSubmissionData();
    if (!component.get('isTeacher')) {
      component.doCheckOaCompleted();
    }
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
    },

    //Action triggered when click on complete submission
    onCompleteSubmission() {
      const component = this;
      component.markOACompleted().then(function() {
        component.set('isOaCompleted', true);
        component.set('isShowCompletionConfirmation', false);
      });
    },

    //Action triggered when click on cancel button in the confirmation popup
    onCancelCompletion() {
      this.set('isShowCompletionConfirmation', false);
    },

    //Action triggered when click on confirm/yes button in the confirmation popup
    onShowCompletionConfirmation() {
      const component = this;
      component.set('isShowCompletionConfirmation', true);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  classId: null,

  courseId: null,

  unitId: null,

  lessonId: null,

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

  /**
   * @property {Boolean} isPreview
   * Property to show the player in read only mode or not
   */
  isPreview: false,

  /**
   * @property {String} contentSource
   * Assign DCA player event source as default
   */
  contentSource: PLAYER_EVENT_SOURCE.DAILY_CLASS,

  /**
   * @property {Boolean} isShowCompletionConfirmation
   * Property to check whether to show or not the completeion confirmation popup
   */
  isShowCompletionConfirmation: false,

  /**
   * @property {Boolean} isOaCompleted
   * Property to evaluate whether the OA is completed or not
   */
  isOaCompleted: false,

  oaId: Ember.computed.alias('offlineActivity.id'),

  /**
   * @property {Boolean} isEnableCompletionButton
   * Property to check whether to enable or not the mark complete button
   */
  isEnableCompletionButton: Ember.computed(
    'activityTasks.@each.isAddedMandatorySubmission',
    'activityTasks.@each.isTaskSubmitted',
    function() {
      const component = this;
      const activityTasks = component.get('activityTasks') || Ember.A([]);
      const isInCompleteTaskAvailable = activityTasks.filter(
        task => !task.isAddedMandatorySubmission
      );
      const isUnSubmittedTaskAvailable = activityTasks.filter(
        task => !task.isTaskSubmitted
      );
      return !(
        isInCompleteTaskAvailable.length || isUnSubmittedTaskAvailable.length
      );
    }
  ),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function loadTaskSubmissionData
   * Method to load student submitted oa task data
   */
  loadTaskSubmissionData() {
    const component = this;
    component.set('isLoading', true);
    return Ember.RSVP
      .hash({
        tasksSubmissions: !component.get('isPreview')
          ? component.fetchTasksSubmissions()
          : null
      })
      .then(({ tasksSubmissions }) => {
        if (!component.isDestroyed) {
          let activityTasks = component.get('offlineActivity.tasks');
          if (tasksSubmissions) {
            let studentTasksSubmissions = tasksSubmissions.get('tasks');
            let oaRubrics = tasksSubmissions.get('oaRubrics');
            let submittedTimespentInMillisec = oaRubrics
              ? oaRubrics.get('studentGrades.timeSpent')
              : 0;
            studentTasksSubmissions.map(taskSubmission => {
              let activityTask = activityTasks.findBy(
                'id',
                taskSubmission.get('taskId')
              );

              if (activityTask) {
                let activityTaskSubmissions = taskSubmission.get('submissions');
                activityTask.set(
                  'studentTaskSubmissions',
                  activityTaskSubmissions
                );
                if (activityTaskSubmissions.length) {
                  let taskSubmissionText = activityTaskSubmissions.findBy(
                    'submissionType',
                    'free-form-text'
                  );
                  activityTask.set(
                    'submissionText',
                    taskSubmissionText
                      ? taskSubmissionText.get('submissionInfo')
                      : null
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
          }
          component.set('activityTasks', activityTasks);
          component.set('isLoading', false);
        }
      });
  },

  /**
   * @function doCheckOaCompleted
   * Method to check whether the OA is completed by the student or not
   */
  doCheckOaCompleted() {
    const component = this;
    return component.fetchOaCompletedStudents().then(function(students) {
      const userId = component.get('userId');
      let isCompletedByStudent = students.includes(userId);
      component.set('isOaCompleted', isCompletedByStudent);
    });
  },

  /**
   * @function fetchTasksSubmissions
   * Method to fetch student submitted oa task data
   */
  fetchTasksSubmissions() {
    const component = this;
    const classId = component.get('classId');
    const oaId = component.get('caContentId') || component.get('oaId');
    const userId = component.get('userId');
    let dataParam = undefined;
    if (component.get('isStudyPlayer')) {
      const courseId = component.get('courseId');
      const unitId = component.get('unitId');
      const lessonId = component.get('lessonId');
      dataParam = {
        courseId,
        unitId,
        lessonId
      };
    }
    return component
      .get('oaAnalyticsService')
      .getSubmissionsToGrade(classId, oaId, userId, dataParam);
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
  },

  /**
   * @function markOACompleted
   * @return {Promise}
   * Method to update the OA status for active student
   */
  markOACompleted() {
    const component = this;
    const classId = component.get('classId');
    const caContentId = component.get('caContentId');
    const oaId = component.get('oaId');
    const contentSource = component.get('contentSource');
    const studentId = component.get('userId');
    const oaData = {
      class_id: classId,
      oa_dca_id: parseInt(caContentId),
      oa_id: oaId,
      content_source: contentSource,
      student_id: studentId,
      marked_by: ROLES.STUDENT,
      path_id: 0,
      path_type: null
    };
    return component.get('oaService').updateOACompleted(oaData);
  },

  /**
   * @function fetchOaCompletedStudents
   * @return {Promise}
   * Method to get list of students who have marked an OA as completed
   */
  fetchOaCompletedStudents() {
    const component = this;
    const classId = component.get('classId');
    const oaId = component.get('oaId');
    const caContentId = component.get('caContentId') || null;
    const courseId = component.get('courseId');
    const unitId = component.get('unitId');
    const lessonId = component.get('lessonId');
    let dataParam = null;
    if (component.get('isStudyPlayer')) {
      dataParam = {
        courseId,
        unitId,
        lessonId
      };
    }
    return component
      .get('oaAnalyticsService')
      .getOaCompletedStudents(classId, oaId, caContentId, dataParam);
  }
});
