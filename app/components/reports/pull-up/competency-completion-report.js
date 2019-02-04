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
      if (!competencyData.get('usersCompletionSummary')) {
        component.set('isLoading', true);
        component
          .fetchUsersCompetencyPerformanceSummary(
            domainData.domainCode,
            competencyData.competencyCode
          )
          .then(function(usersCompletionSummary) {
            competencyData.set(
              'usersCompletionSummary',
              usersCompletionSummary.sortBy('score')
            );
            component.set('isLoading', false);
          });
      }
      component.toggleCompetencyContainer(competencySeq);
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
    const competencyContainer = component.$(
      '.competency-container .users-completion-container'
    );
    const selectedCompletionContainer = component.$(
      `.competency-${competencySeq} .users-completion-container`
    );
    if (selectedCompletionContainer.hasClass('collapsed')) {
      competencyContainer.removeClass('expanded').addClass('collapsed');
      selectedCompletionContainer.addClass('expanded').removeClass('collapsed');
    } else {
      selectedCompletionContainer.toggleClass('expanded').addClass('collapsed');
    }
  },

  /**
   * @function fetchUsersCompetencyPerformanceSummary
   * Method to fetch user competency performance summary
   */
  fetchUsersCompetencyPerformanceSummary(domain, tx_code) {
    const controller = this;
    const competencyService = controller.get('competencyService');
    const classId = controller.get('classId');
    let month = controller.get('activeMonth');
    let year = controller.get('activeYear');
    let agent = controller.get('userAgent');
    let requestBody = {
      classId,
      domain,
      tx_code,
      month,
      year,
      agent
    };
    return Ember.RSVP.hash({
      usersPerformanceSummary: competencyService.getUsersCompetencyPerformanceSummary(
        requestBody
      )
    }).then(({ usersPerformanceSummary }) => {
      return usersPerformanceSummary;
    });
  }
});
