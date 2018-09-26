import Ember from 'ember';

/**
 * External Assessment Player Route
 */
export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {NavigateMapService}
   */
  navigateMapService: Ember.inject.service('api-sdk/navigate-map'),

  /**
   * @requires service:api-sdk/assessment
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  // -------------------------------------------------------------------------
  // Methods

  model: function(params) {
    const route = this;
    return Ember.RSVP.hash({
      externalAssessment: route.get('assessmentService').readExternalAssessment(params.collectionId)
    })
      .then(({externalAssessment}) => {
        let mapLocation = Ember.Object.create({
          context: Ember.Object.create({
            classId: params.classId,
            courseId: externalAssessment.get('courseId'),
            unitId: externalAssessment.get('unitId'),
            collectionId: externalAssessment.get('id'),
            itemType: 'assessment-external'
          })
        });
        return {
          source: params.source,
          mapLocation,
          externalAssessment
        };
      });
  },

  setupController(controller, model) {
    controller.set('mapLocation', model.mapLocation);
    controller.set('source', model.source);
    controller.set('externalAssessment', model.externalAssessment);
  }

});
