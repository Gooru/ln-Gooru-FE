import Ember from 'ember';
import { getOASubType } from 'gooru-web/utils/utils';

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

  isEditing: false,

  isExemplarEditing: false,

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
      this.set('isEditing', false);
    },

    cancelEdit: function() {
      this.set('isEditing', false);
      let srcModelValue = this.get('activityModel.reference');
      this.set('model.reference', srcModelValue);
    },

    editContent() {
      this.set('isEditing', true);
    },

    /**
     * Action to save reference, and exemplar fields
     */
    updateExemplarContent: function() {
      this.get('updateContent')(this.get('model'));
      this.set('isExemplarEditing', false);
    },

    cancelExemplarEdit: function() {
      this.set('isExemplarEditing', false);
      let srcModelValue = this.get('activityModel.exemplar');
      this.set('model.exemplar', srcModelValue);
    },

    editExemplarContent() {
      this.set('isExemplarEditing', true);
    },

    /**
     * Action to save/ add reference
     */

    updateReferenceCollection(reference) {
      const component = this;
      let refsCol = component.get('references');
      refsCol.pushObject(reference);
      component.refreshReference();
      component.get('updateParent')();
    },

    deleteReference(refitem) {
      const component = this;
      if (refitem && refitem.length > 0) {
        refitem = refitem[0];
      } else {
        return;
      }
      component.deleteReferenceItem(refitem);
    },

    deleteUrlReference(refitem) {
      const component = this;
      component.deleteReferenceItem(refitem);
    }
  },

  deleteReferenceItem(refitem) {
    const component = this;
    component
      .get('activityService')
      .deleteReference(refitem)
      .then(refItem => {
        let refsCol = component.get('references');
        refsCol.removeObject(refItem);
        component.refreshReference();
        component.get('updateParent')();
      });
  },
  refreshReference() {
    const component = this;
    let refsCol = component.get('references');
    let newSource = refsCol.slice(0);
    Ember.set(this, 'references', newSource);
    component.set('references', refsCol);
  },

  parsedReference: Ember.computed('references', function() {
    const component = this;
    let uploadedCol = component
      .get('references')
      .filter(f => f.type === 'uploaded');
    let displayData = Ember.A([]);
    let allTypes = getOASubType();

    allTypes.forEach(ref => {
      let filterCol = uploadedCol.filter(f => f.subType === ref.display_name);
      let displayItem = {
        subType: ref.display_name,
        refData: filterCol,
        mimeType: ref.mimeType,
        count: filterCol.length
      };
      displayData.pushObject(displayItem);
    });
    return displayData;
  })
});
