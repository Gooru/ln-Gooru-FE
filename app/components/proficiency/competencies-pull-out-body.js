import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:performance
   */
  performanceService: Ember.inject.service('performance'),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['competencies-pull-out-body'],
  // -------------------------------------------------------------------------
  // Properties

  /**
   * collection
   * @return {Object}
   */
  collection: null,

  /**
   * user id
   * @type {String}
   */
  userId: null,

  /**
   *  Indicates showSignatureAssessment true or not
   * @type {Boolean}
   */
  showSignatureAssessment: Ember.computed('competency', function() {
    let component = this;
    return component.get('competency.showSignatureAssessment');
  }),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     *
     * Triggered when an menu item is selected
     * @param item
     */
    onClickCollectionTitle: function(collection) {
      let component = this;
      let userId = component.get('userId');
      let collectionId = collection.get('id');
      let sessionId = collection.get('sessionId');
      let summaryReportPromise = null;
      if (collection.get('collectionType') === 'assessment') {
        summaryReportPromise = component
          .get('performanceService')
          .getUserPerformanceResourceInAssessment(
            userId,
            null,
            null,
            null,
            collectionId,
            sessionId,
            null
          );
      } else {
        summaryReportPromise = component
          .get('performanceService')
          .getUserPerformanceResourceInCollection(
            userId,
            null,
            null,
            null,
            collectionId,
            sessionId,
            null
          );
      }
      Ember.RSVP.hash({
        resources: summaryReportPromise
      }).then(({ resources }) => {
        component.set('resources', resources);
        component.resetAccordionArrowBasedOnState();
      });
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  resetAccordionArrowBasedOnState: function() {
    let component = this;
    if (
      component
        .$(`#${component.get('elementId')}-heading > .panel-title a i`)
        .hasClass('fa-caret-down')
    ) {
      component
        .$(`#${component.get('elementId')}-heading > .panel-title a i`)
        .addClass('fa-caret-up')
        .removeClass('fa-caret-down');
    } else {
      component
        .$(`#${component.get('elementId')}-heading > .panel-title a i`)
        .addClass('fa-caret-down')
        .removeClass('fa-caret-up');
    }
  }
});
