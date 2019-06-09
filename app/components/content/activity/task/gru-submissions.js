import Ember from 'ember';
import { getOASubType } from 'gooru-web/utils/utils';
import SubmissionModel from 'gooru-web/models/content/oa/task/submission';

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
      component.refreshSubmission();
      // component.get('updateParent')();
    },
    removeLineItem(submission) {
      const component = this;
      if (submission.refData && submission.refData.length > 0) {
        submission = submission.refData[0];
      } else {
        return;
      }
      component.removeSubmission(submission).then(submission => {
        let tasksSubmissionsCol = component.get('submissions');
        tasksSubmissionsCol.removeObject(submission);
        component.refreshSubmission();

        /* component.get('updateParent')(); */
      });
    },
    /**
     * Save content
     */
    updateContent(taskSubmissionSubType) {
      const component = this;
      //ToDo: Call activityService API and save changes
      component.saveTaskSubmission(taskSubmissionSubType).then(submission => {
        component.send('updateSubmissionCollection', submission);
        //component.set('model', component.get('model').copy());
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
    tasksSubmission.set('oaTaskId', component.get('oaTaskId'));
    //ToDo: Validate
    return component
      .get('activityService')
      .removeTaskSubmission(tasksSubmission);
  },
  parsedSubmissions: Ember.computed('submissions', function() {
    try {
      const component = this;
      let uploadedCol = component
        .get('submissions')
        .filter(f => f.taskSubmissionType === 'uploaded');
      console.log('uploadedCol', uploadedCol); //eslint-disable-line
      let displayData = Ember.A([]);
      let allTypes = getOASubType();

      allTypes.forEach(ref => {
        let filterCol = uploadedCol.filter(
          f => f.taskSubmissionSubType === ref.display_name
        );
        console.log('filterCol', filterCol); //eslint-disable-line
        let displayItem = {
          taskSubmissionSubType: ref.display_name,
          refData: filterCol,
          mimeType: ref.mimeType,
          count: filterCol.length
        };
        displayData.pushObject(displayItem);
      });
      console.log('displayData > parsedSubmissions', displayData); //eslint-disable-line
      return displayData;
    } catch (e) {
      console.log('e', e); //eslint-disable-line
    }
  }),

  saveTaskSubmission(taskSubmissionSubType) {
    const component = this;
    let model = SubmissionModel.create({
      oaTaskId: this.get('oaTaskId')
    });
    //ToDo: Validate
    //let model = component.get('model');
    model.set('oaTaskId', component.get('oaTaskId'));
    model.set('oaId', component.get('oaId'));
    model.set('taskSubmissionType', 'uploaded');
    model.set('taskSubmissionSubType', taskSubmissionSubType);
    return component.get('activityService').createTaskSubmission(model);
  },
  refreshSubmission() {
    const component = this;
    let subCol = component.get('submissions');
    let newSource = subCol.slice(0);
    Object.assign(newSource, subCol);
    Ember.set(this, 'submissions', newSource);
    //Ember.set(this, 'submissions', subCol);
  },
  initRefreshSubmission() {
    const component = this;
    let subCol = component.get('submissions');
    let newSource = subCol.slice(0);
    Ember.set(this, 'submissions', newSource);
  }
});
