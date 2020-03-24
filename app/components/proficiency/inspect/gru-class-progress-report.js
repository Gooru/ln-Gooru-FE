import Ember from 'ember';
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['class-progress-report-preview'],

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    const component = this;
    component.$('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
  },

  //--------------------------------------------------------------------------
  //Actions
  actions: {
    onPrintPreview() {
      window.print();
    }
  }
});
