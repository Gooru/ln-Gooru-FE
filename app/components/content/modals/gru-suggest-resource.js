import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'modals', 'gru-suggest-resource'],

  classNameBindings: ['component-class'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    confirm: function() {
      this.set("isLoading", true);
      this.get('model').onConfirm().then(
        this.get('closeModal').bind(this)
      );
    },

    cancel: function() {
      this.get('closeModal').call(this);
    }

  },

  // -------------------------------------------------------------------------
  // Properties
  isLoading: false,

  suggestedResources : [],

  // -------------------------------------------------------------------------
  // Methods

  closeModal: function () {
    const component = this;
    component.triggerAction({
      action: component.get('onCloseModal')
    });
  },
  init() {
    this._super(...arguments);
    this.set("suggestedResources", this.model[0].suggestResults);
  }
});
