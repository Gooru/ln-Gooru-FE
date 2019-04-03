import Ember from 'ember';
import PlayerRoute from 'gooru-web/routes/player';
import PrivateRouteMixin from 'gooru-web/mixins/private-route-mixin';
import {
  CONTENT_TYPES,
  CLASS_SKYLINE_INITIAL_DESTINATION
} from 'gooru-web/config/config';

/**
 * Study Player Route
 *
 * The context player route extends the player route to provide the study player
 * controller with additional information available only to signed-in users
 *
 * @module
 * @extends PlayerRoute
 */
export default PlayerRoute.extend(PrivateRouteMixin, {
  templateName: 'study-player',

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {SessionService} Service to retrieve session information
   */
  session: Ember.inject.service('session'),

  /**
   * @property {NavigateMapService}
   */
  navigateMapService: Ember.inject.service('api-sdk/navigate-map'),

  /**
   * @type {suggestService} Service to retrieve suggest resources
   */
  suggestService: Ember.inject.service('api-sdk/suggest'),

  route0Service: Ember.inject.service('api-sdk/route0'),

  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service('api-sdk/class'),

  /**
   * @type {SkylineInitialService} Service to retrieve skyline initial service
   */
  skylineInitialService: Ember.inject.service('api-sdk/skyline-initial'),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    didTransition() {
      /*
       * Pre load timeline data and set that data to model.
       */
      return true; // Bubble the didTransition event
    },
    /**
     * When the submission is complete
     */
    onFinish: function() {
      let controller = this.get('controller');
      let contextId = controller.get('contextResult.contextId');
      let classId = controller.get('classId');
      let queryParams = {
        courseId: controller.get('course.id'),
        collectionId: controller.get('collection.id'),
        type: controller.get('type'),
        role: controller.get('role'),
        lessonId: controller.get('lessonId'),
        unitId: controller.get('unitId'),
        contextId,
        source: controller.get('source'),
        minScore: controller.get('minScore'),
        pathType: controller.get('pathType') || ''
      };
      if (classId) {
        queryParams.classId = classId;
      }
      /**@description { next calls moves from on finish and goes into report next }
       * @see study-student-collection > next
       */
      this.transitionTo('reports.study-student-collection', {
        queryParams
      });
    },

    updateModelM(option) {
      var mdl = this.modelFor(this.routeName);
      Object.assign(mdl, option);
    }
  },
  /**
   *
   * @param {mapcontext} params
   * @description set local storage such  study player gets value from local store when item is being played
   */
  setStudyPlayerForTeacherNotifications(params) {
    const route = this;
    const mapSerializer = route.get('navigateMapService').get('serializer');
    let normDataModel = Ember.Object.create(params);
    let serDataCtx = {};
    serDataCtx.context = mapSerializer.serializeMapContext(normDataModel);
    route
      .get('navigateMapService')
      .getLocalStorage()
      .setItem(
        route.get('navigateMapService').generateKey(),
        JSON.stringify(serDataCtx)
      );
  },

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
    if (params.isNotification) {
      route.setStudyPlayerForTeacherNotifications(params);
    }

    return route
      .get('navigateMapService')
      .getMapLocation(params)
      .then(function(mapLocation) {
        const courseId = mapLocation.get('context.courseId');
        const unitId = mapLocation.get('context.unitId');
        const lessonId = mapLocation.get('context.lessonId');

        const collectionId =
          mapLocation.get('context.itemId') ||
          mapLocation.get('context.collectionId');

        params.type =
          mapLocation.get('context.itemType') ||
          mapLocation.get('context.collectionType');
        params.classId = params.classId || mapLocation.get('context.classId');
        if (params.type === CONTENT_TYPES.EXTERNAL_ASSESSMENT) {
          route.transitionTo('study-player-external');
        }
        var unitPromise = null;
        var lessonPromise = null;
        var notificationNextPromise = null;
        if (params.pathType === 'route0') {
          let route0Model = route.get('route0Service').getRoute0({
            classId: params.classId,
            courseId: courseId
          });
          if (route0Model) {
            let units = Ember.Object.create(),
              lessono = Ember.Object.create();
            route0Model.route0Content.units.forEach(function(unit) {
              if (unit.unitId === unitId) {
                units = Ember.Object.create({
                  id: unitId,
                  title: unit.unitTitle,
                  sequence: unit.unitSequence
                });
              }
            });

            route0Model.route0Content.units.forEach(function(unit) {
              if (unit.unitId === unitId) {
                unit.lessons.forEach(function(lesson) {
                  if (lesson.lessonId === lessonId) {
                    let cols = [];
                    lesson.collections.forEach(function(col) {
                      cols.push(
                        Ember.Object.create({
                          id: col.collectionId,
                          title: col.collectionTitle,
                          sequence: col.collectionSequence
                        })
                      );
                    });
                    let colobj = Ember.A(cols);
                    lessono = Ember.Object.create({
                      id: lessonId,
                      title: lesson.lessonTitle,
                      sequence: lesson.lessonSequence,
                      children: colobj
                    });
                  }
                });
              }
            });
            let unitmodeldata = Ember.Object.create(units);
            let lessonmodeldata = Ember.Object.create(lessono);
            unitPromise = Ember.RSVP.Promise.resolve(unitmodeldata);
            lessonPromise = Ember.RSVP.Promise.resolve(lessonmodeldata);
          }
        } else {
          unitPromise = route.get('unitService').fetchById(courseId, unitId);
          lessonPromise = route
            .get('lessonService')
            .fetchById(courseId, unitId, lessonId);
        }

        if (params.isNotification) {
          notificationNextPromise = route
            .get('navigateMapService')
            .startCollection(
              courseId,
              unitId,
              lessonId,
              collectionId,
              params.type,
              params.classId,
              +params.pathId,
              params.pathType
            );
        }

        return Ember.RSVP.hash({
          course: route.get('courseService').fetchById(courseId),
          unit: unitPromise,
          lesson: lessonPromise,
          suggestedResources:
            collectionId != null
              ? route
                .get('suggestService')
                .suggestResourcesForCollection(
                  route.get('session.userId'),
                  collectionId
                )
              : null,
          notificationNextStarted: notificationNextPromise
        }).then(function(hash) {
          //setting query params using the map location
          params.collectionId = collectionId;
          //params.classId = params.classId || mapLocation.get('context.classId');
          params.unitId = params.unitId || mapLocation.get('context.unitId');
          params.lessonId =
            params.lessonId || mapLocation.get('context.lessonId');
          params.pathId = params.pathId || mapLocation.get('context.pathId');
          params.collectionSubType =
            params.subtype || mapLocation.get('context.collectionSubType');

          // Set the correct unit sequence number
          if (params.pathType !== 'route0') {
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
          }
          //loads the player model if it has no suggestions
          return route.playerModel(params).then(function(model) {
            return Object.assign(model, {
              course: hash.course,
              unit: hash.unit,
              lesson: hash.lesson,
              mapLocation,
              collectionId: params.collectionId,
              type: params.type,
              minScore: params.minScore,
              suggestedResources: hash.suggestedResources,
              collectionSource: params.collectionSource,
              collectionSubType: params.collectionSubType
            });
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
      showConfirmation: model.collection && !isAnonymous,
      mapLocation: model.mapLocation,
      classId: mapLocation.get('context.classId'),
      //setting query params variables using the map location
      unitId: mapLocation.get('context.unitId'),
      lessonId: mapLocation.get('context.lessonId'),
      collectionId: model.collectionId,
      courseId: mapLocation.get('context.courseId'),
      type: model.type,
      minScore: model.minScore,
      suggestedResources: model.suggestedResources,
      collectionSource: model.collectionSource,
      collectionSubType: model.collectionSubType,
      isStudyPlayer: true,
      class: this.get('class')
    });
  },

  selectMenuItem: function(item) {
    const route = this;
    const controller = route.get('controller');
    const currentItem = controller.get('menuItem');

    if (item !== currentItem) {
      controller.selectMenuItem(item);
      if (item === 'class-management') {
        route.transitionTo('teacher.class.class-management');
      } else if (item === 'course-map') {
        route.transitionTo('teacher.class.course-map');
      } else if (item === 'performance') {
        route.transitionTo('teacher.class.performance');
      } else if (item === 'class-activities') {
        route.transitionTo('teacher.class.class-activities');
      } else if (item === 'close') {
        let backurl = this.get('backUrls');
        backurl = backurl || controller.get('backUrls');
        if (backurl) {
          route.transitionTo(backurl);
        } else {
          if (controller.class.isArchived) {
            route.transitionTo('teacher-home'); //, (query - params showArchivedClasses = "true" showActiveClasses = "false") class="back-to" } }
          } else {
            route.transitionTo('teacher-home');
          }
        }
      }
    }
  },

  deactivate: function() {
    this.get('controller').resetValues();
  },

  doCheckClassDestination(classId) {
    const route = this;
    const classPromise = classId
      ? route.get('classService').readClassInfo(classId)
      : Ember.RSVP.resolve({});
    return classPromise.then(function(classData) {
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
