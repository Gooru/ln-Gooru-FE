import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['pull-up', 'struggling-competency-domain-level'],

  //-------------------------------------------------------------
  // Property

  /**
   * @property {Object} gradeDomainsList
   * property hold grade domain list
   */
  gradeDomainsList: null,

  /**
   * @property {Object} gradeDomainIndex
   * property hold grade domain index
   */
  gradeDomainIndex: null,

  //-------------------------------------------------------------
  // Actions

  actions: {
    // Action triggered when click domain
    toggleDomain(test) {
      this.$(`.domain-accordion-${test}`).slideToggle(500);
    },

    //Action triggered when click close
    onClosePullUp() {
      let component = this;
      component.$().slideUp({
        complete: function() {
          component.sendAction('closePullUp');
        }
      });
    },

    // Action trigger when select competency
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
