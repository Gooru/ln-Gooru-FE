import Ember from 'ember';
import { SEARCH_FILTER_BY_CONTENT_TYPES } from 'gooru-web/config/config';

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

  willDestroyElement() {
    const component = this;
    component.set('selectedUserIds', Ember.A([]));
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
      component.resetSelectedUserIds(competencyData);
      component.set('activeCompetency', competencyData);
      component.toggleCompetencyContainer(competencySeq);
    },

    //Action triggered when close pullup
    onClosePullup() {
      const component = this;
      component.closePullUp();
    },

    //Action triggered when click on competency suggestion
    onSuggestAtCompetency(competency) {
      const component = this;
      component.resetSelectedUserIds(competency);
      component.sendAction('onSuggestAtCompetency', competency);
    },

    //Action triggered when filter by content type
    onFilterBy(contentType) {
      const component = this;
      let activeCompetency = component.get('activeCompetency');
      let userIds = component.get('selectedUserIds');
      component.sendAction('onSuggestAtCompetency', activeCompetency, contentType, userIds);
    },

    //Action triggered when select/unselect a student
    onSelectStudent(userCompletionData) {
      const component = this;
      let selectedUserIds = component.get('selectedUserIds');
      if (userCompletionData.get('selected')) {
        userCompletionData.set('selected', false);
        selectedUserIds.removeObject(userCompletionData);
      } else {
        userCompletionData.set('selected', true);
        selectedUserIds.pushObject(userCompletionData);
      }
      component.set('selectedUserIds', selectedUserIds);
      component.set('isShowStudentSuggestion', selectedUserIds.length > 0);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Array} contentTypes
   */
  contentTypes: SEARCH_FILTER_BY_CONTENT_TYPES,

  /**
   * @property {Object} activeCompetency
   */
  activeCompetency: null,

  /**
   * @property {Array} selectedUserIds
   */
  selectedUserIds: Ember.A([]),

  /**
   * @property {Boolean} isShowStudentSuggestion
   */
  isShowStudentSuggestion: false,

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
  },

  /**
   * @function resetSelectedUserIds
   * Method to reset selected userIds
   */
  resetSelectedUserIds(competencyData) {
    const component = this;
    let activeCompetency = component.get('activeCompetency');
    if (activeCompetency && (competencyData.get('competencyCode') !== activeCompetency.get('competencyCode'))) {
      let selectedUsers = component.get('selectedUserIds');
      component.set('selectedUserIds', Ember.A([]));
      selectedUsers.map( selectedUser => {
        selectedUser.set('selected', false);
      });
      component.set('isShowStudentSuggestion', false);
    }
  }
});
