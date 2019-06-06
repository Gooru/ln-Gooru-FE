import Ember from 'ember';
import TaskModel from 'gooru-web/models/content/oa/task';

export default Ember.Component.extend({
  /**------------------------------------------------------------------------------------------------
   * Create/edit task, update parent for changes
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
   * Offline activity Id, which associates task with OA, supplied by caller
   */
  oaId: null,

  /**
   * Instance of TaskModel
   */
  model: null,

  isEditing: true,
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['content', 'gru-tasks-edit'],
  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Updates parent for changes
     */
    updateParent(task) {
      const component = this;
      //task = task || component.get('model');
      component.get('updateParent')(task);
    },

    /**
     * Save content
     */
    updateContent() {
      const component = this;
      //ToDo: Call activityService API and save changes
      component.saveTask().then(task => {
        component.sendAction('updateParent', task);
        component.set('model', task.copy()); // needed to break the ref
      });
    },

    /**
     * Reset dirty model with clean model
     */
    cancelChanges() {
      //ToDo: Reset dirty model with clean model
    },

    updateSubmissionCollection() {
      //ToDo: Impl
    }
  },
  // -------------------------------------------------------------------------
  // Events
  init() {
    this._super(...arguments);
    let taskInstance = TaskModel.create({ oaId: this.get('oaId') });
    this.set('model', taskInstance);
  },
  // -------------------------------------------------------------------------
  // Properties

  /**
   * Save tasks as per configured mode: edit/create, default mode is create new
   * Returns promise
   */
  saveTask() {
    const component = this;
    let model = component.get('model');
    //ToDo: Validate
    return component.get('activityService').createTask(model);
  }
});
