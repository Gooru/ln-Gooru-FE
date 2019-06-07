import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['gru-references'],

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  /**
   * @type {SessionService} Service to retrieve session information
   */
  session: Ember.inject.service('session'),

  /**
   * @requires service:api-sdk/offline-activity/offline-activity
   */
  activityService: Ember.inject.service(
    'api-sdk/offline-activity/offline-activity'
  ),

  /**
   * Collection model as instantiated by the route. This is the clean model used when not editing
   * or after any collection changes have been saved.
   * @property {Collection}
   */
  activityModel: null,

  /**
   * Activity model dirty copy passed by caller, for saving exemplar and reference
   */
  model: null,
  /**
   * Collection model as passed by the route. The dirty model used for editing and saving changes to.
   * This is sent to parent for syncing.holds list of references in the activity
   * @property {references}
   */
  references: null,

  isEditing: true,

  oaId: null,

  // -------------------------------------------------------------------------
  // Events
  init() {
    let component = this;
    component._super(...arguments);
  },
  // -------------------------------------------------------------------------
  // Properties

  createNewReference: null,

  actions: {
    /**
     * Action to save reference, and exemplar fields
     */
    updateContent: function() {
      this.get('updateContent')(this.get('model'));
    },

    cancelEdit: function() {
      let srcModel = this.get('activityModel').copy();
      this.set('model', srcModel);
    },

    /**
     * Action to save/ add reference
     */

    updateReferenceCollection(reference) {
      const component = this;
      let refsCol = component.get('references');
      refsCol.pushObject(reference);
      component.get('updateParent')();
    },

    deleteReference(refitem) {
      const component = this;
      component
        .get('activityService')
        .deleteReference(refitem)
        .then(refItem => {
          component.get('references').removeObject(refItem);
          component.get('updateParent')();
        });
    }
  }
});
