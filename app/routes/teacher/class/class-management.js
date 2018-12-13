import Ember from 'ember';

export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  session: Ember.inject.service('session'),
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Events
  didRender() {
    var component = this;
    component.$('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });
  },

  // -------------------------------------------------------------------------
  // Attributes

  /**
   * Toggle Options
   * @property {Ember.Array}
   */
  switchOptions: Ember.A([
    Ember.Object.create({
      label: 'yes',
      value: true
    }),
    Ember.Object.create({
      label: 'no',
      value: false
    })
  ]),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    onBackwardsChange: function(isChecked) {
      if (isChecked) {
        this.set('model.showFeedback', 'true');
      }
      //this.sendAction('action');
    },
    refreshRoute: function() {
      Ember.Logger.log('refreshRoute');
      this.refresh();
    }
  },
  // -------------------------------------------------------------------------
  // Methods

  /**
   * Set all controller properties from the model
   * @param controller
   */
  setupController: function(controller) {
    controller.resetValues();
    controller.set('tempClass', controller.get('class').copy());
    controller.get('classController').selectMenuItem('class-management');
    controller.setupDisplayProperties();
  }
});
