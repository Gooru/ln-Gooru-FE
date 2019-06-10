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
      //ToDo: Reset dirty model with clean model
    },

    updateSubmissionCollection() {
      //ToDo: Impl
    },

    expandTitle() {
      const component = this;
      component.showAllHeaders();
      component.collapseAll();
      component.$(
        '#accordion > .gru-tasks-edit > .panel-default > a .associated-rubric'
      );
      let componentHead = component.$('.panel-default > a .associated-rubric');
      componentHead.addClass('hidden');
    }
  },

  didInsertElement1() {
    //let component = this;
    $('#accordion .panel-default').on('click', function() {
      $('#accordion .panel-collapse').collapse('toggle');
    });
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

  didReceiveAttrs() {
    this._super(...arguments);
    console.log('didReceiveAttrs', 'didReceiveAttrs'); //eslint-disable-line
    if (this.get('model') && this.get('model').id) {
      console.log('Edit mode', 'Enter'); //eslint-disable-line
    } else {
      let taskInstance = TaskModel.create({ oaId: this.get('oaId') });
      this.set('model', taskInstance);
    }
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
    if (model && model.id) {
      return component
        .get('activityService')
        .updateTask(model.oaId, model.id, model);
    } else {
      return component.get('activityService').createTask(model);
    }

    //ToDo: Validate
  }
});
