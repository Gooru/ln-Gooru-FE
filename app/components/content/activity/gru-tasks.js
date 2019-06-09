import Ember from 'ember';

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
  tasks: null,

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['content', 'gru-task'],
  // -------------------------------------------------------------------------
  // Actions
  actions: {
    addNewTask() {
      const component = this;
      component.set('task', 'dummy');
    },
    updateTaskCollection(task) {
      const component = this;
      let tasksCol = component.get('tasks');
      tasksCol.pushObject(task);
      component.get('updateParent')();
    },
    removeLineItem(task) {
      const component = this;
      component.removeTask(task).then(task => {
        let tasksCol = component.get('tasks');
        tasksCol.removeObject(task);
        component.get('updateParent')();
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
  removeTask(task) {
    const component = this;
    //ToDo: Validate
    return component.get('activityService').removeTask(task);
  }
});
