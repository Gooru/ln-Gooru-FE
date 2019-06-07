import Ember from 'ember';
import { getOAType, getOASubType } from 'gooru-web/utils/utils';
import ReferenceModel from 'gooru-web/models/content/oa/reference';

export default Ember.Component.extend({
  classNames: ['gru-edit-reference'],

  /**
   * @property {MediaService} Media service API SDK
   */
  mediaService: Ember.inject.service('api-sdk/media'),

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
  // -------------------------------------------------------------------------
  // Props

  /**
   * Offline activity Id, which associates task with OA, supplied by caller
   */
  oaId: null,

  /**
   * @property {model} reference model being edited
   */
  model: null,

  /**
   * @property {referenceSubType} supplied object from gru-reference definition of subTypes and associated mimetype for ui binding
   */
  referenceSubType: function() {
    return getOASubType();
  }.property(),

  submissionType: function() {
    return getOAType();
  }.property(),
  /**
   * @property {subTypeMimeType} returns the mimeType for selected subType
   */
  subTypeMimeType: function() {
    let selectedSubType = this.get('model.subType') || 'others',
      selectedMimeType = this.get('referenceSubType').findBy(
        'display_name',
        selectedSubType
      )
        ? this.get('referenceSubType').findBy('display_name', selectedSubType)
          .mimeType
        : '';
    this.set('model.subType', selectedSubType);
    return selectedMimeType;
  }.property('model.subType'),

  isEditing: null,

  // -------------------------------------------------------------------------
  // Events
  init() {
    this._super(...arguments);
    let chooseOne = this.get('i18n').t(
      'teacher-landing.class.class-settings.class-settings-sec.option-choose-one'
    ).string;

    let subTypeSel = Ember.Object.create({
      display_name: chooseOne
    });

    this.set('referenceSubType1', getOASubType());

    let referenceInstance = ReferenceModel.create({ oaId: this.get('oaId') });
    referenceInstance.set('subTypeSel', subTypeSel);
    console.log('referenceInstance', referenceInstance); //eslint-disable-line
    this.set('model', referenceInstance);
  },
  // -------------------------------------------------------------------------
  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     *
     * @param {object} subType, UI selection of subtype
     */
    onSubTypeChange: function(subType) {
      this.get('model').set('subType', subType.display_name);
    },

    /**
     * edit action //ToDo://revisit here
     */
    editContent: function() {
      this.set('model', this.get('model').copy());
      this.set('isEditing', true);
    },
    cancelEdit: function(/* params */) {
      //ToDo: Handle cancel
    },

    updateContent: function() {
      const component = this;
      component.set('isLoading', true);
      let editRefModel = component.get('model');
      let fileIdPromise = component.uploadSelectedFile();
      fileIdPromise.then(function(fileId) {
        editRefModel.location = fileId;
        component.updateReference(editRefModel).then(() => {
          component.set('isLoading', false); // needed to break the ref
        });
      });
    },

    //GRU-file-picker-events action
    selectFile: function(file) {
      let type = 'uploaded';
      if (file) {
        this.set('model.file', file);
        this.set('model.type', type);
        this.send('updateContent');
      }
    },
    updateURLRef: function() {
      const component = this;
      let editRefModel = component.get('model');
      this.set('model.type', 'remote');
      this.set('model.subType', 'url');

      component.updateReference(editRefModel).then(() => {
        component.set('isLoading', false);
      });
    }
  },

  expandCollapse(/* createdRefModel */) {
    //ToDo: Expand collapse
  },

  uploadSelectedFile() {
    const component = this;
    let fileToUpload = this.get('model').file;
    let fileIdPromise = new Ember.RSVP.resolve(fileToUpload);
    if (fileToUpload && typeof fileToUpload != 'string') {
      fileIdPromise = component
        .get('mediaService')
        .uploadContentFile(fileToUpload);
    }
    return fileIdPromise;
  },

  updateReference(model) {
    const component = this;
    return component
      .get('activityService')
      .createReferences(model)
      .then(createdRefModel => {
        component.expandCollapse(createdRefModel);
        component.updateParent(createdRefModel);
        component.set('model', createdRefModel.copy()); // needed to break the ref
      });
  }
});
