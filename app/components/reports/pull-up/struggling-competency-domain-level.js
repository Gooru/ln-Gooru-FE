import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['pull-up', 'struggling-competency-domain-level'],

  //-------------------------------------------------------------
  // Property
  testing: [1, 3, 4, 5],

  //-------------------------------------------------------------
  // Actions
  actions: {
    toggleDomain(test) {
      this.$(`.domain-accordion-${  test}`).slideToggle(500);
    }
  }
});
