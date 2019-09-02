import Ember from 'ember';

export default Ember.Component.extend({
  //----------------------------------------------------
  // Events

  //----------------------------------------------------
  // Properties

  /**
   * Set Start Date for student activity
   */
  startDate: '',

  /**
   * Set Start Date for student activity
   */
  endDate: '',

  //-----------------------------------------------------
  // Actions
  actions: {
    changeStartDate: function(event) {
      this.set('startDate', event);
    },
    changeEndDate: function(event) {
      this.set('endDate', event);
    },
    onSubmit: function() {
      let component = this;
      let startDate = component.get('startDate');
      let endDate = component.get('endDate');
      component.sendAction('onChangeDateForStudent', startDate, endDate);
      this.sendAction('onClose');
    },
    close() {
      this.sendAction('onClose');
    }
  }

  //----------------------------------------------------
  // Methods
});
