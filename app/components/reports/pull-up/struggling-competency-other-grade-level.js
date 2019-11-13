import Ember from 'ember';

export default Ember.Component.extend({
  //---------------------------------------------------------------
  // Attributes

  classNames: ['pull-up', 'struggling-competency-other-grade-level'],

  //-------------------------------------------------------------
  // Property
  otherGradeCompetency: null,

  gradeDomainIndex: null,

  //-------------------------------------------------------------
  // Actions

  actions: {
    onToggleGrade(gradeIndex) {
      this.$(`.sc-other-grade-panel-accordian-${gradeIndex}`).slideToggle(500);
    },

    toggleDomain(gradeIndex, domainIndex) {
      this.$(
        `.sc-other-grade-domain-accordion-${gradeIndex}-${domainIndex}`
      ).slideToggle(500);
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
