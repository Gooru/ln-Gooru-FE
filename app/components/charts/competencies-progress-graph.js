import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['charts', 'competencies-progress-graph'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    //Action triggered when click on progress graph
    onClickProgressChart() {
      this.sendAction('onClickProgressChart');
    }
  }
});
