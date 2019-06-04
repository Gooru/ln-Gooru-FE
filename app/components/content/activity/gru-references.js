import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['gru-references'],

  /**
   * @requires service:api-sdk/course
   */
  activityService: Ember.inject.service('api-sdk/activity'),

  isEditing: true,

  referenceSubType: Ember.A([
    Ember.Object.create({
      display_name: 'image',
      code: '1',
      mimeType: 'image/*'
    }),
    Ember.Object.create({
      display_name: 'pdf',
      code: '2',
      mimeType: 'application/pdf'
    }),
    Ember.Object.create({
      display_name: 'presentation',
      mimeType:
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    }),
    Ember.Object.create({
      display_name: 'document',
      code: '4',
      mimeType:
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    }),
    Ember.Object.create({
      display_name: 'others',
      code: '5',
      mimeType: 'application/pdf,image/*'
    })
  ]),

  referenceType: Ember.A([
    { display_name: 'remote', code: '0' },
    { display_name: 'uploaded', code: '1' }
  ]),

  oaId: null,

  model: null,

  /**
   * @property {references} holds list of references in the activity
   */
  references: Ember.A([]),

  editingRefModel: Ember.computed('refModel', function() {
    let tempEditRef = {};
    Object.assign(tempEditRef, this.get('refModel'));
    return Ember.Object.create(tempEditRef);
  }),

  //ToDo: Move this out to a file
  referenceModel: Ember.Object.extend({
    id: null,
    oaId: null,
    type: null,
    subType: null,
    location: null,
    copy: function() {
      var properties = [];
      var enumerableKeys = Object.keys(this);

      for (let i = 0; i < enumerableKeys.length; i++) {
        let key = enumerableKeys[i];
        let value = Ember.typeOf(this.get(key));
        if (value === 'string' || value === 'number' || value === 'boolean') {
          properties.push(key);
        }
      }
    }
  }),
  init() {
    let component = this;
    component._super(...arguments);

    let refModel = component.get('referenceModel').create({
      id: null,
      oaId: component.get('model.id'),
      type: null,
      subType: null,
      location: null
    });
    component.set('refModel', refModel);
  },

  createNewReference: null,

  actions: {
    createNewReference: function() {
      this.set('createNewReference', true);
    },
    updateContent: function() {
      this.get('updateContent')(this.get('model'));
    },
    cancelEdit: function() {
      let srcModel = this.get('activityModel').copy();
      this.set('model', srcModel);
    },
    updateReferenceCollection(reference) {
      if (this.get('editingRefModel')) {
        let editingModelRefs = this.get('model.references');
        editingModelRefs.pushObject(reference);
        Ember.set(this, 'references', editingModelRefs);
        let editModel = this.get('model');
        Ember.set(editModel, 'references', editingModelRefs);

        this.get('updateParent')(editModel);
      }
    },
    deleteReference(refitem) {
      const component = this;
      component
        .get('activityService')
        .deleteReference(refitem)
        .then(function() {
          //dser
        });
    }
  }
});
