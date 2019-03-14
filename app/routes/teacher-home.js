import Ember from 'ember';
import PrivateRouteMixin from 'gooru-web/mixins/private-route-mixin';
import ConfigurationMixin from 'gooru-web/mixins/configuration';
import { ROLES, PLAYER_EVENT_SOURCE } from 'gooru-web/config/config';

/**
 * Teacher route
 *
 * @module
 * @augments Ember.Route
 */
export default Ember.Route.extend(PrivateRouteMixin, ConfigurationMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * @requires service:api-sdk/course
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @type {I18nService} Service to retrieve translations information
   */
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Open the player with the specific currentLocation
     *
     * @function actions:playItem
     * @param {string} currentLocation - All the params for the currentLocation
     */
    studyPlayer: function(currentLocation) {
      const route = this;
      let role = ROLES.STUDENT;
      let source = PLAYER_EVENT_SOURCE.COURSE_MAP;
      let courseId = currentLocation.get('courseId');
      let classId = currentLocation.get('classId');
      let unitId = currentLocation.get('unitId');
      let lessonId = currentLocation.get('lessonId');
      let collectionId = currentLocation.get('collectionId');
      let collectionType = currentLocation.get('collectionType');
      let collectionSubType = currentLocation.get(
        'collection.collectionSubType'
      );
      let pathId = currentLocation.get('collection.pathId') || 0;
      let queryParams = {
        classId,
        unitId,
        lessonId,
        collectionId,
        role,
        source,
        type: collectionType,
        subtype: collectionSubType,
        pathId
      };

      let suggestionPromise = null;
      // Verifies if it is a suggested Collection/Assessment
      if (collectionSubType) {
        suggestionPromise = route
          .get('navigateMapService')
          .startSuggestion(
            courseId,
            unitId,
            lessonId,
            collectionId,
            collectionType,
            collectionSubType,
            pathId,
            classId
          );
      } else {
        suggestionPromise = route
          .get('navigateMapService')
          .startCollection(
            courseId,
            unitId,
            lessonId,
            collectionId,
            collectionType,
            classId
          );
      }

      suggestionPromise.then(() =>
        route.transitionTo('study-player', courseId, {
          queryParams
        })
      );
    },

    /**
     * Triggered when a teacher card menu item is selected
     * @param {string} item
     * @param {string} classId
     */
    selectMenuItem: function(item, classId) {
      const route = this;
      if (item === 'students') {
        route.transitionTo('teacher.class.students-proficiency', classId);
      } else if (item === 'course-map') {
        route.transitionTo('teacher.class.course-map', classId);
      } else if (item === 'class-activities') {
        route.transitionTo('teacher.class.class-activities', classId);
      } else if (item === 'ca-report') {
        route.transitionTo('teacher.class.class-activities', classId, {
          queryParams: {
            tab: 'report'
          }
        });
      } else if (item === 'cm-report') {
        route.transitionTo('teacher.class.course-map', classId, {
          queryParams: {
            tab: 'report'
          }
        });
      } else if (item === 'atc') {
        route.transitionTo('teacher.class.atc', classId);
      } else if (item === 'class-management') {
        route.transitionTo('teacher.class.class-management', classId);
      } else {
        route.transitionTo('teacher-home');
      }
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Get model for the controller
   */
  model: function() {
    let route = this;
    let myClassessPromise = Ember.RSVP.resolve(
      route.controllerFor('application').loadUserClasses()
    );

    return Ember.RSVP.hash({
      myClasses: myClassessPromise
    }).then(function(hash) {
      const myClasses = hash.myClasses;
      const myId = route.get('session.userId');
      const activeClasses = myClasses.getTeacherActiveClasses(myId);
      const archivedClasses = myClasses.getTeacherArchivedClasses();
      return {
        activeClasses,
        archivedClasses
      };
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.set('featuredCourses', model.featuredCourses);
    controller.set('archivedClasses', model.archivedClasses);
    controller.set('activeClasses', model.activeClasses);
    let lastAccessedClassData = controller.getLastAccessedClassData();
    if (model.activeClasses.length) {
      controller.updateLastAccessedClassPosition(lastAccessedClassData.id);
    }
    controller.loadPerformance();
  },

  resetController(controller) {
    controller.set('showActiveClasses', true);
    controller.set('showArchivedClasses', false);
    controller.set('isActiveClassPerformanceLoaded', false);
    controller.set('isArchivedClassPerformanceLoaded', false);
  }
});
