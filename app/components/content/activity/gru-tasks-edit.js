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

  /**
   * @param {Boolean } didValidate - value used to check if input has been validated or not
   */
  didValidate: false,

  isExpandedChild: false,

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
      });
    },
    removeLineItem() {
      const component = this;
      component.get('removeLineItem')(component.get('model'));
    },
    /**
     * Reset dirty model with clean model
     */
    cancelChanges() {
      this.get('cancelTask')();
    },

    updateSubmissionCollection() {
      //ToDo: Impl
    },

    expandTitle() {
      const component = this;
      component.collapseAll();
      component.showAllHeaders();
      let componentHead = component.$('.panel-default > a .associated-rubric');
      componentHead.addClass('hidden');
    }
  },

  collapseAll() {
    $(
      '#accordion > .gru-tasks-edit > .panel-default > .panel-collapse.collapse.in'
    ).removeClass('in');
  },

  showAllHeaders() {
    $(
      '#accordion > .gru-tasks-edit > .panel-default > a   .associated-rubric'
    ).removeClass('hidden');
  },

  // -------------------------------------------------------------------------
  // Events
  init() {
    this._super(...arguments);
    // let taskInstance = TaskModel.create({ oaId: this.get('oaId') });
    // this.set('model', taskInstance);
  },

  didInsertElement() {
    this._super(...arguments);
    const component = this;
    if (this.get('model') && this.get('model').id) {
      //ToDo: Is this required
    } else {
      let taskInstance = TaskModel.create(
        Ember.getOwner(this).ownerInjection()
      );

      taskInstance.set('oaId', this.get('oaId'));
      if (taskInstance.get('oaTaskSubmissions').length > 0) {
        let tsinst = Ember.A([]);
        taskInstance.set('oaTaskSubmissions', tsinst);
        console.log(`new i with oaId :${this.get('oaId')}`, taskInstance); //eslint-disable-line
      }
      this.set('model', taskInstance);
      let componentHead = component.$('.panel-default > a');
      Ember.run(() => componentHead.click()); //show new task form expanded
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Save tasks as per configured mode: edit/create, default mode is create new
   * Returns promise
   */
  validate() {
    const component = this;
    let model = component.get('model');
    var didValidate = new Ember.RSVP.Promise(function(resolve) {
      if (model) {
        model
          .validate()
          .then(
            ({ validations }) => resolve(validations.get('isValid')),
            () => resolve(false)
          );
      }
    });
    component.set('didValidate', didValidate);
    return didValidate;
  },
  saveTask() {
    const component = this;
    let model = component.get('model');
    return new Ember.RSVP.Promise(function(resolve) {
      component.validate().then(isValid => {
        if (isValid) {
          if (model && model.id) {
            resolve(
              component
                .get('activityService')
                .updateTask(model.oaId, model.id, model)
            );
          } else {
            resolve(component.get('activityService').createTask(model));
          }
        }
      });
    });
  }
});
