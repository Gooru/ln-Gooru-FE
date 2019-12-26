import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['pull-up', 'struggling-competency-domain-level'],

  //-------------------------------------------------------------
  // Property

  /**
   * @property {Array} gradeDomainsList
   * property hold grade domain list
   */
  gradeDomainsList: [],

  /**
   * @property {Number} gradeDomainIndex
   * property hold grade domain index
   */
  gradeDomainIndex: null,

  //-------------------------------------------------------------
  // Actions

  actions: {
    // Action triggered when click domain
    toggleDomain(domainIndex) {
      this.$(`.domain-accordion-${domainIndex}`).slideToggle(500);
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
