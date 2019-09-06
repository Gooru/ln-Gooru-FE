import Ember from 'ember';
import PrivateRouteMixin from 'gooru-web/mixins/private-route-mixin';
import {
  CLASS_SKYLINE_INITIAL_DESTINATION,
  CONTENT_TYPES
} from 'gooru-web/config/config';

export default Ember.Route.extend(PrivateRouteMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  queryParams: {
    collectionId: {
      refreshModel: true
    }
  },

  /**
   * @type {SessionService} Service to retrieve session information
   */
  session: Ember.inject.service('session'),

  /**
   * @property {NavigateMapService}
   */
  navigateMapService: Ember.inject.service('api-sdk/navigate-map'),

  /**
   * @property {Ember.Service} Service to retrieve an assessment
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  /**
   * @property {Ember.Service} Service to retrieve a collection
   */
  collectionService: Ember.inject.service('api-sdk/collection'),

  offlineActivityService: Ember.inject.service(
    'api-sdk/offline-activity/offline-activity'
  ),

  /**
   * @type {UnitService} Service to retrieve course information
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @type {UnitService} Service to retrieve unit information
   */
  unitService: Ember.inject.service('api-sdk/unit'),

  /**
   * @type {LessonService} Service to retrieve lesson information
   */
  lessonService: Ember.inject.service('api-sdk/lesson'),

  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service('api-sdk/class'),

  /**
   * @type {SkylineInitialService} Service to retrieve skyline initial service
   */
  skylineInitialService: Ember.inject.service('api-sdk/skyline-initial'),

  // -------------------------------------------------------------------------
  // Methods

  beforeModel(transition) {
    this._super(...arguments);
    if (!this.get('session.isAnonymous')) {
      const queryParams = transition.queryParams;
      if (queryParams && queryParams.classId) {
        return this.doCheckClassDestination(queryParams.classId);
      }
    }
  },

  model: function(params) {
    const route = this;
    return route
      .get('navigateMapService')
      .getMapLocation(params)
      .then(function(mapLocation) {
        const courseId = mapLocation.get('context.courseId');
        const unitId = mapLocation.get('context.unitId');
        const lessonId = mapLocation.get('context.lessonId');
        params.collectionId =
          params.collectionId ||
          mapLocation.get('context.itemId') ||
          mapLocation.get('context.collectionId');
        const contentType = params.type;
        return Ember.RSVP.hash({
          //loading breadcrumb information and navigation info
          course: route.get('courseService').fetchById(courseId),
          unit: route.get('unitService').fetchById(courseId, unitId),
          lesson: route
            .get('lessonService')
            .fetchById(courseId, unitId, lessonId),
          collection:
            contentType === CONTENT_TYPES.EXTERNAL_COLLECTION
              ? route
                .get('collectionService')
                .readExternalCollection(params.collectionId)
              : contentType === CONTENT_TYPES.OFFLINE_ACTIVITY
                ? route
                  .get('offlineActivityService')
                  .readActivity(params.collectionId)
                : route
                  .get('assessmentService')
                  .readExternalAssessment(params.collectionId)
        }).then(function(hash) {
          //setting query params using the map location

          params.type =
            params.type ||
            mapLocation.get('context.itemType') ||
            mapLocation.get('context.collectionType');
          params.classId = params.classId || mapLocation.get('context.classId');
          params.unitId = params.unitId || mapLocation.get('context.unitId');
          params.lessonId =
            params.lessonId || mapLocation.get('context.lessonId');
          params.pathId = params.pathId || mapLocation.get('context.pathId');
          params.collectionSubType =
            params.subtype || mapLocation.get('context.collectionSubType');

          // Set the correct unit sequence number
          hash.course.children.find((child, index) => {
            let found = false;
            if (child.get('id') === hash.unit.get('id')) {
              found = true;
              hash.unit.set('sequence', index + 1);
            }
            return found;
          });

          // Set the correct lesson sequence number
          hash.unit.children.find((child, index) => {
            let found = false;
            if (child.get('id') === hash.lesson.get('id')) {
              found = true;
              hash.lesson.set('sequence', index + 1);
            }
            return found;
          });
          return Ember.RSVP.hash({
            course: hash.course,
            unit: hash.unit,
            lesson: hash.lesson,
            collection: hash.collection,
            mapLocation,
            collectionId: params.collectionId,
            type: params.type
          });
        });
      });
  },

  setupController(controller, model) {
    this._super(...arguments);
    const isAnonymous = model.isAnonymous;
    const mapLocation = model.mapLocation;
    controller.setProperties({
      course: model.course,
      unit: model.unit,
      lesson: model.lesson,
      collection: model.collection,
      showConfirmation:
        model.collection &&
        !(model.collection.get('isCollection') || isAnonymous), //TODO: move to computed
      mapLocation: model.mapLocation,
      classId: mapLocation.get('context.classId'),
      //setting query params variables using the map location
      unitId: mapLocation.get('context.unitId'),
      lessonId: mapLocation.get('context.lessonId'),
      collectionId: model.collectionId,
      type: model.type,
      content: mapLocation.content,
      class: this.get('class')
    });
  },

  deactivate: function() {
    this.get('controller').resetValues();
  },

  resetController(controller) {
    controller.set('isShowOaLandingPage', true);
  },

  doCheckClassDestination(classId) {
    const route = this;
    const classPromise = classId
      ? route.get('classService').readClassInfo(classId)
      : Ember.RSVP.resolve({});
    return classPromise.then(function(classData) {
      route.set('class', classData);
      if (route.findClassIsPermium(classData)) {
        return route
          .get('skylineInitialService')
          .fetchState(classId)
          .then(skylineInitialState => {
            let destination = skylineInitialState.get('destination');
            if (
              destination ===
              CLASS_SKYLINE_INITIAL_DESTINATION.classSetupInComplete
            ) {
              return route.transitionTo(
                'student.class.setup-in-complete',
                classId
              );
            } else if (
              destination ===
                CLASS_SKYLINE_INITIAL_DESTINATION.showDirections ||
              destination === CLASS_SKYLINE_INITIAL_DESTINATION.ILPInProgress
            ) {
              return route.transitionTo('student.class.proficiency', classId);
            } else if (
              destination === CLASS_SKYLINE_INITIAL_DESTINATION.diagnosticPlay
            ) {
              return route.transitionTo(
                'student.class.diagnosis-of-knowledge',
                classId
              );
            }
          });
      }
    });
  },

  /**
   * Method used to identify course is permium or not
   * @return {Boolean}
   */
  findClassIsPermium(aClass) {
    let setting = aClass.get('setting');
    let isPremiumCourse = setting ? setting['course.premium'] : false;
    return isPremiumCourse;
  }
});
