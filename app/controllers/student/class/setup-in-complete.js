import Ember from 'ember';

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Actions
  actions: {
    back() {
      this.transitionToRoute('student-home');
    }
  }
});
