import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['pull-up', 'competency-completion-report'],

  // -------------------------------------------------------------------------
  // Dependencies
  competencyService: Ember.inject.service('api-sdk/competency'),

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    this.openPullUp();
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    //Action triggered when select a competency
    onSelectCompetency(competencyData, competencySeq) {
      const component = this;
      let domainData = component.get('domainData');
      component.fetchUsersCompetencyPerformanceSummary(domainData.domainCode, competencyData.competencyCode).then(function(usersCompletionSummary) {
        competencyData.set('usersCompletionSummary', usersCompletionSummary);
        component.toggleCompetencyContainer(competencySeq);
      });
    },

    //Action triggered when close pullup
    onClosePullup() {
      const component = this;
      component.closePullUp();
    }
  },

  // -------------------------------------------------------------------------
  // Functions

  /**
   * Function to animate the  pullup from bottom to top
   */
  openPullUp() {
    let component = this;
    component.$().animate(
      {
        top: '10%'
      },
      400
    );
  },

  closePullUp() {
    let component = this;
    component.$().animate(
      {
        top: '100%'
      },
      400,
      function() {
        component.set('showPullUp', false);
      }
    );
  },

  /**
   * @function toggleCompetencyContainer
   * Method to toggle competency container view
   */
  toggleCompetencyContainer(competencySeq) {
    const component = this;
    const $competencyContainer = component.$('.competency-container .users-completion-container');
    const $selectedCompletionContainer = component.$(`.competency-${competencySeq} .users-completion-container`);
    if (component.$($selectedCompletionContainer).hasClass('collapsed')) {
      component.$($competencyContainer).removeClass('expanded').addClass('collapsed');
      component.$($selectedCompletionContainer).addClass('expanded').removeClass('collapsed');
    } else {
      component.$($selectedCompletionContainer).toggleClass('expanded').addClass('collapsed');
    }
  },

  /**
   * @function fetchUsersCompetencyPerformanceSummary
   * Method to fetch user competency performance summary
   */
  fetchUsersCompetencyPerformanceSummary(domainCode, competencyCode) {
    const controller = this;
    const competencyService = controller.get('competencyService');
    const classId = controller.get('classId');
    let month = controller.get('activeMonth');
    let year = controller.get('activeYear');
    let agent = controller.get('userAgent');
    let filters = {
      month,
      year,
      agent
    };
    return Ember.RSVP.hash({
      usersPerformanceSummary: competencyService.getUsersCompetencyPerformanceSummary(classId, domainCode, competencyCode, filters)
    })
      .then(({usersPerformanceSummary}) => {
        return usersPerformanceSummary;
      });
  }
});
