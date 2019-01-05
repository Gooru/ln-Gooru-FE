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

  /**
   * @requires service:api-sdk/collection
   */
  collectionService: Ember.inject.service('api-sdk/collection'),

  // -------------------------------------------------------------------------
  // Methods

  model: function(params) {
    const route = this;
    let itemType = params.type;
    let resource =
      itemType === 'collection-external'
        ? route
          .get('collectionService')
          .readExternalCollection(params.collectionId)
        : route
          .get('assessmentService')
          .readExternalAssessment(params.collectionId);
    return Ember.RSVP.hash({
      externalResource: resource
    }).then(({ externalResource }) => {
      let mapLocation = Ember.Object.create({
        context: Ember.Object.create({
          classId: params.classId,
          courseId: externalResource.get('courseId'),
          unitId: externalResource.get('unitId'),
          collectionId: externalResource.get('id'),
          lessonId: externalResource.get('lessonId'),
          itemType: itemType
        })
      });
      return {
        source: params.source,
        mapLocation,
        externalResource,
        itemType
      };
    });
  },

  setupController(controller, model) {
    controller.set('mapLocation', model.mapLocation);
    controller.set('source', model.source);
    controller.set('resourceType', model.itemType);
    controller.set('externalResource', model.externalResource);
  }
});
