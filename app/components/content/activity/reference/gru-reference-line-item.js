import Ember from 'ember';
import { getOAType, getOASubType } from 'gooru-web/utils/utils';
import ReferenceModel from 'gooru-web/models/content/oa/reference';

export default Ember.Component.extend({
  classNames: ['gru-reference-line-item'],

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
  /**
   * List of error messages to present to the user for conditions that the loaded image does not meet
   * @prop {String[]}
   */
  filePickerErrors: null,

  // -------------------------------------------------------------------------
  // Events
  init() {
    this._super(...arguments);
    this.set('filePickerErrors', Ember.A());

    let chooseOne = this.get('i18n').t(
      'teacher-landing.class.class-settings.class-settings-sec.option-choose-one'
    ).string;

    let subTypeSel = Ember.Object.create({
      display_name: chooseOne
    });

    this.set('referenceSubType1', getOASubType());

    let referenceInstance = this.getNewReferenceModel();

    referenceInstance.set('subTypeSel', subTypeSel);
    this.set('model', referenceInstance);
  },

  didInsertElement() {
    this._super(...arguments);
    let chooseOne = this.get('i18n').t(
      'teacher-landing.class.class-settings.class-settings-sec.option-choose-one'
    ).string;

    let subTypeSel = Ember.Object.create({
      display_name: chooseOne
    });

    this.set('referenceSubType1', getOASubType());

    let referenceInstance = this.getNewReferenceModel();

    referenceInstance.set('subTypeSel', subTypeSel);
    this.set('model', referenceInstance);
  },
  // -------------------------------------------------------------------------
  // -------------------------------------------------------------------------
  // Actions

  actions: {
    deleteReference(refItem) {
      this.deleteReference(refItem);
    },
    prepareForSubmission(file) {
      this.set('selectedFile', file);
      this.get('onSelectFile')(file);
    },

    /**
     * @function actions:disableButtons
     */
    // eslint-disable-next-line no-dupe-keys
    resetFileSelection() {
      // Reset the input element in the file picker
      // http://stackoverflow.com/questions/1043957/clearing-input-type-file-using-jquery/13351234#13351234
      var $fileInput = this.$('input[type="file"]');
      $fileInput
        .wrap('<form>')
        .closest('form')
        .get(0)
        .reset();
      $fileInput.unwrap();

      this.set('selectedFile', null);
      this.get('onSelectFile')(null);
    },

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
      component.validate().then(isValid => {
        if (isValid) {
          component.set('isLoading', true);
          let editRefModel = component.get('model');
          let fileIdPromise = component.uploadSelectedFile();
          fileIdPromise.then(function(fileId) {
            editRefModel.location = fileId;
            component.updateReference(editRefModel).then(() => {
              component.set('isLoading', false); // needed to break the ref
            });
          });
        }
      });
    },

    //GRU-file-picker-events action
    selectFile: function(file) {
      let type = 'uploaded';
      if (file) {
        this.set('model.file', file);
        this.set('model.type', type);
        this.set('model.subType', file.extraParam || file.subType);

        this.send('updateContent');
      }
    },
    updateURLRef: function() {
      const component = this;
      let editRefModel = component.get('model');
      this.set('model.type', 'remote');
      this.set('model.subType', 'url');
      component.validate().then(isValid => {
        if (isValid) {
          component.updateReference(editRefModel).then(() => {
            component.set('isLoading', false);
            let referenceInstance = component.getNewReferenceModel();
            this.set('model', referenceInstance);
          });
        }
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
        let referenceInstance = this.getNewReferenceModel();
        component.set('model', referenceInstance); // needed to break the ref
      });
  },

  getNewReferenceModel() {
    return ReferenceModel.create(Ember.getOwner(this).ownerInjection(), {
      oaId: this.get('oaId')
    });
  },
  validate() {
    const component = this;
    let model = component.get('model');
    var didValidate;
    if (model.get('type') === 'uploaded') {
      didValidate = new Ember.RSVP.Promise(function(resolve) {
        resolve(true);
      });
    } else {
      didValidate = new Ember.RSVP.Promise(function(resolve) {
        if (model) {
          model
            .validate()
            .then(
              ({ validations }) => resolve(validations.get('isValid')),
              () => resolve(false)
            );
        }
      });
    }
    component.set('didValidate', didValidate);
    return didValidate;
  }
});
