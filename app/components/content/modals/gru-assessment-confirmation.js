import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'modals', 'gru-assessment-confirmation'],

  classNameBindings: ['component-class'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    start(){
      this.get('model').onStart();
      this.triggerAction({ action: 'closeModal'});
    },
    cancel(){
      this.get('model').onCancel();
    }
  },

  init() {
    this._super(...arguments);
    //this.set('unlimited', this.get('model.attempts')==-1 ? true : false);

  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {boolean} flag for disabling button
   */
  noAttempts: Ember.computed.equal('model.attempts', 0),
  unlimited: Ember.computed.equal('model.attempts', -1)
});
