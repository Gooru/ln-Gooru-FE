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
    return Ember.RSVP.hash({
      library: this.get('libraryService').fetchById(params.id)
    });
  },

  setupController: function(controller, model) {
    console.log(model.library)
    controller.set('library', model.library);
  }

});
