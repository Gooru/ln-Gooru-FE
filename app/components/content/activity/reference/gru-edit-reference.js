import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['gru-edit-reference'],

  /**
   * @property {MediaService} Media service API SDK
   */
  mediaService: Ember.inject.service('api-sdk/media'),

  /**
   * @requires service:api-sdk/course
   */
  activityService: Ember.inject.service('api-sdk/activity'),

  // -------------------------------------------------------------------------
  // Props
  /**
   * @property {model} reference model
   */
  model: null,

  /**
   * @property {editingModel} reference model being edited
   */
  editingModel: null,

  /**
   * @property {referenceSubType} supplied object from gru-reference definition of subTypes and associated mimetype for ui binding
   */
  referenceSubType: null,

  /**
   * @property {subTypeMimeType} returns the mimeType for selected subType
   */
  subTypeMimeType: function() {
    let selectedSubType = this.get('editingModel.subType') || 'others',
      selectedMimeType = this.get('referenceSubType').findBy(
        'display_name',
        selectedSubType
      )
        ? this.get('referenceSubType').findBy('display_name', selectedSubType)
          .mimeType
        : '';
    this.set('editingModel.subType', selectedSubType);
    return selectedMimeType;
  }.property('editingModel.subType'),

  isEditing: null,

  id: null,

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     *
     * @param {object} subType, UI selection of subtype
     */
    onSubTypeChange: function(subType) {
      this.get('editingModel').set('subType', subType.display_name);
    },

    /**
     * edit action
     */
    editContent: function() {
      this.set('editingModel', this.get('model').copy());
      this.set('isEditing', true);
    },
    cancelEdit: function(/* params */) {
      //ToDo: Handle cancel
    },

    updateContent: function() {
      const component = this;
      component.set('isLoading', true);
      let editRefModel = component.get('editingModel');
      let fileIdPromise = component.uploadSelectedFile();
      fileIdPromise.then(function(fileId) {
        editRefModel.location = fileId;
        component
          .get('activityService')
          .createReferences(editRefModel)
          .then(function(createdRefModel) {
            component.expandCollapse(createdRefModel);
            component.sendReferenceToCollection(createdRefModel);
            return Ember.RSVP.resolve(true);
          })
          .then(
            function() {
              component.set('isLoading', false);
            },
            function() {
              component.set('isLoading', false);
              component.get('showErrorMessage')();
            }
          );
      });
    },

    //GRU-file-picker-events action
    selectFile: function(file) {
      let type = 'uploaded';
      if (file) {
        this.set('editingModel.file', file);
        this.set('editingModel.type', type);
        this.sendAction('updateContent');
      }
    },
    updateURLRef: function() {
      const component = this;
      let editRefModel = component.get('editingModel');

      let type = 'remote';
      this.set('editingModel.type', type);
      this.set('editingModel.subType', 'url');

      component
        .get('activityService')
        .createReferences(editRefModel)
        .then(function(createdRefModel) {
          component.expandCollapse(createdRefModel);
          component.sendReferenceToCollection(createdRefModel);
          return Ember.RSVP.resolve(true);
        })
        .then(
          function() {
            component.set('isLoading', false);
          },
          function() {
            component.set('isLoading', false);
            component.get('showErrorMessage')();
          }
        );
    }
  },

  expandCollapse(/* createdRefModel */) {
    //ToDo: Expand collapse
  },

  sendReferenceToCollection(createdRefModel) {
    this.get('updateReferenceCollection')(createdRefModel);
  },

  uploadSelectedFile() {
    const component = this;
    let fileToUpload = this.get('editingModel').file;
    let fileIdPromise = new Ember.RSVP.resolve(fileToUpload);
    if (
      fileToUpload &&
      fileToUpload !== this.get('model').get('file') &&
      typeof fileToUpload != 'string'
    ) {
      fileIdPromise = component
        .get('mediaService')
        .uploadContentFile(fileToUpload);
    }
    return fileIdPromise;
  }
});
