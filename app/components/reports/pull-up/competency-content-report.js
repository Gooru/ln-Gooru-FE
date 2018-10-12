import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['competency-content-report'],

  // -------------------------------------------------------------------------
  // Dependencies
  competencyService: Ember.inject.service('api-sdk/competency'),

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    let component = this;
    component.loadCompetencyPerformanceData();
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Action triggered when click global view
     */
    onToggleCompetencyInfoView() {
      let component = this;
      component.toggleProperty('isShowGlobalInfo');
      if (component.get('isShowGlobalInfo')) {
        component.sendAction('onToggleGlobalCompetencyView', component.get('competency.competencyCode'));
      }
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function loadCompetencyPerformanceData
   * Method to load individual competency performance of the user
   */
  loadCompetencyPerformanceData() {
    let component = this;
    return Ember.RSVP.hash({
      collectionPerformances: component.fetchUserCompetencyPerformance()
    })
      .then(({collectionPerformances}) => {
        component.set('collectionPerformances', collectionPerformances);
      });
  },

  /**
   * @function fetchUserCompetencyPerformance
   * Method to fetch competency performance of an user
   */
  fetchUserCompetencyPerformance() {
    let component = this;
    let competencyService = component.get('competencyService');
    let userId = component.get('userId');
    let competencyCode = component.get('competency.competencyCode');
    let status = component.get('competency.status');
    return new Ember.RSVP.resolve(competencyService.getUserPerformanceCompetencyCollections(userId, competencyCode, status));
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Array} collectionPerformances
   */
  collectionPerformances: Ember.A([]),

  /**
   * @property {Boolean} isShowGlobalInfo
   */
  isShowGlobalInfo: false
});
