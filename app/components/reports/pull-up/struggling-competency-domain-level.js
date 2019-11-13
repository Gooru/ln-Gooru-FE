import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['pull-up', 'struggling-competency-domain-level'],

  //-------------------------------------------------------------
  // Property
  gradeDomainsList: null,

  gradeDomainIndex: null,

  //-------------------------------------------------------------
  // Actions

  actions: {
    toggleDomain(test) {
      this.$(`.domain-accordion-${test}`).slideToggle(500);
    },

    onClosePullUp() {
      let component = this;
      component.$().slideUp({
        complete: function() {
          component.sendAction('closePullUp');
        }
      });
    },

    onSelectCompetency(competency, domain) {
      let component = this;
      competency.set('domainName', domain.get('domainName'));
      component.sendAction('selectCompetency', competency);
    }
  },

  //------------------------------------------------------------------------
  // Hooks

  didInsertElement() {
    this.openPullUp();
  },

  //---------------------------------------------------------------------
  // Method

  openPullUp() {
    let component = this;
    component.$().slideDown();
  }
});
