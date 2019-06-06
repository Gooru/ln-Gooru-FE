import Ember from 'ember';
import SubmissionModel from 'gooru-web/models/content/oa/task/submission';
import { getOAType, getOASubType } from 'gooru-web/utils/utils';

export default Ember.Component.extend({
  /**------------------------------------------------------------------------------------------------
   * Create/edit Submission, update parent for changes
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

  oaTaskId: null,

  submissionSubType: function() {
    return getOASubType();
  }.property(),

  submissionType: function() {
    return getOAType();
  }.property(),
  /**
   * Instance of TaskSubmission  model
   */
  model: null,

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Updates parent for changes
     */
    updateParent(Submission) {
      const component = this;
      component.get('updateParent')(Submission);
    },

    /**
     * Save content
     */
    updateContent() {
      const component = this;
      //ToDo: Call activityService API and save changes
      component.saveTaskSubmission().then(submission => {
        component.sendAction('updateParent', submission);
        component.set('model', component.get('model').copy());
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
    },

    onSubTypeChange(subType) {
      this.get('model').set('taskSubmissionSubType', subType.display_name);
    }
  },
  // -------------------------------------------------------------------------
  // Events
  init() {
    this._super(...arguments);
    let modelInstance = SubmissionModel.create({
      oaTaskId: this.get('oaTaskId')
    });

    //let modelInstance = SubmissionModel.create();
    this.set('model', modelInstance);
  },

  oaTaskIdChange: Ember.observer('oaTaskId', function() {
    let modelInstance = SubmissionModel.create({
      oaTaskId: this.get('oaTaskId')
    });

    let chooseOne = this.get('i18n').t(
      'teacher-landing.class.class-settings.class-settings-sec.option-choose-one'
    ).string;

    let taskSubmissionSubTypeSel = Ember.Object.create({
      display_name: chooseOne
    });

    modelInstance.set('taskSubmissionSubTypeSel', taskSubmissionSubTypeSel);
    this.set('model', modelInstance);
  }),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Save tasks as per configured mode: edit/create, default mode is create new
   * Returns promise
   */
  saveTaskSubmission() {
    const component = this;
    let model = component.get('model');
    //ToDo: Validate
    model.set('oaTaskId', component.get('oaTaskId'));
    model.set('oaId', component.get('oaId'));
    model.set('taskSubmissionType', 'uploaded');
    return component.get('activityService').createTaskSubmission(model);
  }
});
