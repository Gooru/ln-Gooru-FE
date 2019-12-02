import Ember from 'ember';

export default Ember.Component.extend({
  //---------------------------------------------------------------
  // Attributes

  classNames: ['pull-up', 'struggling-competency-other-grade-level'],

  //-------------------------------------------------------------
  // Property

  /**
   * @property {Object} otherGradeCompetency
   * property hold other grade domain list
   */
  otherGradeCompetency: null,

  /**
   * @property {Object} gradeDomainIndex
   * property hold other grade index
   */
  gradeDomainIndex: null,

  //-------------------------------------------------------------
  // Actions

  actions: {
    // Action trigger when click grade accordion
    onToggleGrade(gradeIndex) {
      this.$(`.sc-other-grade-panel-accordian-${gradeIndex}`).slideToggle(500);
    },

    // Action trigger when click domain inside grade
    toggleDomain(gradeIndex, domainIndex) {
      this.$(
        `.sc-other-grade-domain-accordion-${gradeIndex}-${domainIndex}`
      ).slideToggle(500);
    },

    // Action trigger when click close
    onClosePullUp() {
      let component = this;
      component.$().slideUp({
        complete: function() {
          component.sendAction('closePullUp');
        }
      });
    },

    // Action trigger when click competency inside domain
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
