import Ember from 'ember';
/* import { getOAType, getOASubType } from 'gooru-web/utils/utils'; */

export default Ember.Component.extend({
  /**------------------------------------------------------------------------------------------------
   * Structure
   *    -tasks Layout,
   *        -list of tasks
   *        -- Line item of each task
   *        -- Invoke New Task
   *            -- Invoke Submission Layout
   *                -- List of submissions
   *                -- New Submission
   * ------------------------------------------------------------------------------------------------
   * Models
   *  Parent Models : Receives activityModel, editingActivity Model
   *  Own Models :
   *     editingActivity> Tasks : List of Task Models
   *      editingActivity> Tasks > Task : Task Entity Model
   *        editingActivity> Tasks > Task > submissions : List of Submission Models
   *         editingActivity> Tasks > Task > submissions > submission: Submission Entity Model
   * ------------------------------------------------------------------------------------------------
   *    UI Interaction:
   *         Load from Tasks tab click, or scroll down if mandatory OA is created
   *         Detects empty Tasks collection > Open New Task creation, otherwise show list of tasks, AND
   *         Task Creation form at the end. Saving task adds to task list again with empty task creation form
   *
   * ------------------------------------------------------------------------------------------------*/

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:api-sdk/offline-activity/offline-activity
   */
  activityService: Ember.inject.service(
    'api-sdk/offline-activity/offline-activity'
  ),

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  /**
   * @type {SessionService} Service to retrieve session information
   */
  session: Ember.inject.service('session'),

  /**
   * Collection model as instantiated by the route. This is the clean model used when not editing
   * or after any collection changes have been saved.
   * @property {Collection}
   */
  activityModel: null,

  /**
   * Collection model as passed by the route. The dirty model used for editing and saving changes to.
   * This is sent to parent for syncing.
   * @property {Collection}
   */
  submissions: null,

  oaId: null,
  oaTaskId: null,

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['content', 'gru-task'],
  // -------------------------------------------------------------------------
  // Actions
  actions: {
    updateSubmissionCollection(submission) {
      const component = this;
      let taskSubmissionsCol = component.get('submissions');
      taskSubmissionsCol.pushObject(submission);
      /* component.get('updateParent')(); */
    },
    removeLineItem(submission) {
      const component = this;
      component.removeSubmission(submission).then(submission => {
        let tasksSubmissionsCol = component.get('submissions');
        tasksSubmissionsCol.removeObject(submission);
        /* component.get('updateParent')(); */
      });
    }
  },
  // -------------------------------------------------------------------------
  // Events
  init() {
    this._super(...arguments);
  },
  // -------------------------------------------------------------------------
  // Properties
  removeSubmission(tasksSubmission) {
    const component = this;
    //ToDo: Validate
    return component
      .get('activityService')
      .removeTaskSubmission(tasksSubmission);
  }
});
