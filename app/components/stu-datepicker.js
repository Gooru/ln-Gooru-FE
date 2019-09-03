import Ember from 'ember';

export default Ember.Component.extend({
  //----------------------------------------------------
  // Events

  //----------------------------------------------------
  // Properties

  /**
   * Set Start Date for student activity progress report
   */
  startDate: '',

  /**
   * Set End Date for student activity progress report
   */
  endDate: '',

  //-----------------------------------------------------
  // Actions
  actions: {
    /**
     * @param {Date} event
     */
    changeStartDate: function(event) {
      this.set('startDate', event);
    },

    /**
     * @param {Date} event
     */
    changeEndDate: function(event) {
      this.set('endDate', event);
    },

    /**
     * Submit from date and end date for custom range report
     */
    onSubmit: function() {
      let component = this;
      let startDate = component.get('startDate');
      let endDate = component.get('endDate');
      component.sendAction('onChangeDateForStudent', startDate, endDate);
      this.sendAction('onClose');
    },

    /**
     * Send close action for Range datepicker
     */
    close() {
      this.sendAction('onClose');
    }
  }

  //----------------------------------------------------
  // Methods
});
