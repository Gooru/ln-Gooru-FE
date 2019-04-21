import Ember from 'ember';

export default Ember.Route.extend({

  queryParams: {
    id: {
      refreshModel: true
    }
  },

  /**
   * @type {libraryService} Library service object
   */
  libraryService: Ember.inject.service('api-sdk/library'),

  // -------------------------------------------------------------------------
  // Methods

  model: function(params) {
    const libraryId = params.id;
    return Ember.RSVP.hash({
      library: libraryId ? this.get('libraryService').fetchById(libraryId) : null
    });
  },

  setupController: function(controller, model) {
    controller.set('library', model.library);
  }
});
