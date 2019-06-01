import Ember from 'ember';

export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Attributes

  queryParams: {
    classId: {
      refreshModel: true
    },
    courseId: {
      refreshModel: true
    },
    role: {
      refreshModel: true
    },
    contextId: {
      refreshModel: true
    },
    source: null
  },
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {ProfileService} Service to retrieve profile information
   */
  profileService: Ember.inject.service('api-sdk/profile'),

  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service('api-sdk/class'),

  /**
   * @type {CourseService} Service to retrieve course information
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyService: Ember.inject.service('taxonomy'),

  /**
   * Competency service dependency injection
   * @type {Object}
   */
  competencyService: Ember.inject.service('api-sdk/competency'),

  /**
   * @property {NavigateMapService}
   */
  navigateMapService: Ember.inject.service('api-sdk/navigate-map'),

  model: function(params) {
    let route = this;
    route._super(...arguments);
    let studentId = params.userId;
    const classId = params.classId;
    const courseId = params.courseId;
    const contextId = params.contextId || null;
    return Ember.RSVP
      .hash({
        profilePromise: route.get('profileService').readUserProfile(studentId),
        classPromise: route.get('classService').readClassInfo(classId),
        coursePromise: route.get('courseService').fetchById(courseId),
        taxonomyCategories: route.get('taxonomyService').getCategories(),
        mapLocation: contextId
          ? route.get('navigateMapService').getStoredNext()
          : null
      })
      .then(function(hash) {
        return Ember.Object.create({
          profile: hash.profilePromise,
          categories: hash.taxonomyCategories,
          class: hash.classPromise,
          course: hash.coursePromise,
          mapLocation: hash.mapLocation,
          contextId
        });
      });
  },

  setupController(controller, model) {
    controller.set('studentProfile', model.get('profile'));
    controller.set('class', model.get('class'));
    controller.set('course', model.get('course'));
    controller.set('taxonomyCategories', model.get('categories'));
    controller.set('mapLocation', model.get('mapLocation'));
    controller.set('contextId', model.get('contextId'));
    controller.loadData();
  },
  resetController(controller) {
    controller.set('showDomainInfo', false);
    controller.set('showCompetencyInfo', false);
    controller.set('selectedCompetency', null);
    controller.set('mapLocation', null);
    controller.set('source', null);
  }
});
