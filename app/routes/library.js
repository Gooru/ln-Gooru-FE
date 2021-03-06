import Ember from 'ember';
/**
 * Library route
 *
 * @module
 * @augments Ember.Route
 */

export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @type {searchService} Search service object
   */
  searchService: Ember.inject.service('api-sdk/search'),

  /**
   * @type {libraryService} Library service object
   */
  libraryService: Ember.inject.service('api-sdk/library'),

  /**
   * @property {Service} session
   */
  session: Ember.inject.service('session'),

  // -------------------------------------------------------------------------
  // Methods

  model: function() {
    return Ember.RSVP.hash({
      libraries: this.get('libraryService').fetchLibraries(),
      session: this.get('session')
    });
  },

  setupController: function(controller, model) {
    controller.set('libraries', model.libraries);
    controller.set('session', model.session);
    this.resetFilter();
  },

  resetFilter() {
    const router = this;
    const userId = router.get('session.userId');
    if (userId) {
      window.localStorage.removeItem(`${userId}_search_filter`);
    }
  }
});
