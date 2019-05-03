import Ember from 'ember';
import PrivateRouteMixin from 'gooru-web/mixins/private-route-mixin';
import { ROLES, PLAYER_EVENT_SOURCE } from 'gooru-web/config/config';
import {
  hasSuggestions,
  createStudyPlayerQueryParams,
  currentLocationToMapContext
} from 'gooru-web/utils/navigation-util';

export default Ember.Route.extend(PrivateRouteMixin, {
  queryParams: {
    refresh: {
      refreshModel: true
    }
  },

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service('api-sdk/class'),

  /**
   * @type {PerformanceService} Service to retrieve class performance summary
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * @type {CourseService} Service to retrieve course information
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @type {UnitService} Service to retrieve unit information
   */
  unitService: Ember.inject.service('api-sdk/unit'),

  analyticsService: Ember.inject.service('api-sdk/analytics'),

  /**
   * @property {NavigateMapService}
   */
  navigateMapService: Ember.inject.service('api-sdk/navigate-map'),

  /**
   * @type {i18nService} Service to retrieve translations information
   */
  i18n: Ember.inject.service(),

  /**
   * @type {SkylineInitialService} Service to retrieve skyline initial service
   */
  skylineInitialService: Ember.inject.service('api-sdk/skyline-initial'),

  /**
   * @requires service:api-sdk/competency
   */
  competencyService: Ember.inject.service('api-sdk/competency'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Triggered when a class menu item is selected
     * @param {string} item
     */
    selectMenuItem: function(item) {
      const route = this;
      const controller = route.get('controller');
      const currentItem = controller.get('menuItem');
      controller.set('isNotAbleToStartPlayer', false);
      if (item !== currentItem) {
        controller.selectMenuItem(item);
        const queryParams = {
          queryParams: {
            filterBy: 'assessment'
          }
        };

        if (item === 'performance') {
          route.transitionTo('student.class.performance', queryParams);
        } else if (item === 'course-map') {
          route.transitionTo('student.class.course-map');
        } else if (item === 'class-activities') {
          route.transitionTo('student.class.class-activities');
        } else if (item === 'study-player') {
          route.studyPlayer(controller.get('classmodel').currentLocation);
        } else if (item === 'profile-prof') {
          let userId = this.get('session.userId');
          controller.transitionToRoute(
            'student.class.student-learner-proficiency',
            {
              queryParams: {
                userId: userId,
                classId: controller.get('class').id,
                courseId: controller.get('course').id,
                role: 'student'
              }
            }
          );
        }
      }
    }
  },
  /**
   * Open the player with the specific currentLocation
   *
   * @function actions:playItem
   * @param {string} currentLocation - All the params for the currentLocation
   * @summary
   * 1.  Current location null or Empty > Next call with 'continue' (continue on courseId, classId ) > Study player
   * 1.1 Handle suggestions when 'continue' and there is a teacher suggestion > Send suggestion to study player (should prompt for start dialog )
   * 2.  Current location with status not complete > NO next call, launch study player directly
   * 3.  Current location with status complete. Next call with 'content-served' (start on courseId, classId, pathId, pathType, ...  +SCORE) > Study Player
   * 3.1 Handle suggestions when 'content-served' and there is a suggestion > Send suggestion to Study Player (should prompt for accept/ignore dialog )
   */
  studyPlayer: function(currentLocation) {
    const route = this;
    const controller = route.get('controller');
    const navMapServc = route.get('navigateMapService');
    let locationContext = currentLocation
      ? currentLocationToMapContext(currentLocation)
      : null;
    controller.set('locationContext', locationContext);
    let options = {
        role: ROLES.STUDENT,
        source: PLAYER_EVENT_SOURCE.COURSE_MAP,
        courseId: controller.get('course').id,
        classId: controller.get('class').id
      },
      nextPromise = null;
    if (currentLocation == null || currentLocation === '') {
      nextPromise = navMapServc.continueCourse(
        options.courseId,
        options.classId
      ); //Complete
    } else if (currentLocation.get('status') === 'complete') {
      //content_served
      nextPromise = navMapServc.contentServedResource(locationContext);
    } else {
      // Next not required, get the params from current location when in-progress
      // in-progress case- when in progress score is null by location api
      nextPromise = route.nextPromiseHandler(locationContext);
    }

    nextPromise
      .then(route.nextPromiseHandler)
      .then(parsedOptions => {
        return route.launchStudyPlayer(parsedOptions);
      })
      .catch(() => {
        controller.set('isNotAbleToStartPlayer', true);
      });
  },

  /** returns options promise chain resolving response
   * @param
   */
  nextPromiseHandler(resp) {
    let queryParams = {
      role: ROLES.STUDENT,
      source: PLAYER_EVENT_SOURCE.COURSE_MAP,
      courseId: hasSuggestions(resp) ? resp.context.courseId : resp.courseId, // Only in case of suggestions we dont have courseId in suggestion
      classId: hasSuggestions(resp) ? resp.context.classId : resp.classId // Only in case of suggestions we dont have classId in suggestion
    };
    queryParams = createStudyPlayerQueryParams(
      hasSuggestions(resp) ? resp.suggestions[0] : resp.context || resp,
      queryParams
    );
    let isContentMapped = true;
    var respctx = hasSuggestions(resp) || resp.context ? resp.context : resp;
    queryParams.lessonId = respctx.lessonId;
    queryParams.courseId = respctx.courseId;
    queryParams.collectionId = respctx.collectionId;
    queryParams.unitId = respctx.unitId;
    queryParams.collectionType = resp.type || respctx.type;
    queryParams.type = respctx.itemType;
    queryParams.role = ROLES.STUDENT;
    queryParams.source = PLAYER_EVENT_SOURCE.COURSE_MAP;
    if (hasSuggestions(resp)) {
      queryParams.hasSuggestion = resp.suggestions[0].id;
    }
    isContentMapped = !!queryParams.collectionId;
    if (isContentMapped) {
      return Ember.RSVP.resolve(queryParams);
    } else {
      return Ember.RSVP.reject(null);
    }
  },

  /**
   * launches study player
   * @param options {object} is the queryParams required to launch study-player
   */
  launchStudyPlayer(queryParams) {
    const route = this;
    if (queryParams.hasSuggestion) {
      route.transitionTo('reports.study-student-collection', {
        queryParams
      });
    } else {
      route.transitionTo('study-player', queryParams.courseId, {
        queryParams
      });
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Get model for the controller
   */
  model: function(params) {
    const route = this;
    const myId = route.get('session.userId');
    const classId = params.classId;
    const classPromise = route.get('classService').readClassInfo(classId);
    const membersPromise = route.get('classService').readClassMembers(classId);

    return classPromise.then(function(classData) {
      let classCourseId = null;
      if (classData.courseId) {
        classCourseId = Ember.A([
          {
            classId: params.classId,
            courseId: classData.courseId
          }
        ]);
      }
      const performanceSummaryPromise = classCourseId
        ? route
          .get('performanceService')
          .findClassPerformanceSummaryByStudentAndClassIds(
            myId,
            classCourseId
          )
        : null;
      let caClassPerfSummaryPromise = route
        .get('performanceService')
        .getCAPerformanceData([classId], myId);
      return Ember.RSVP.hash({
        class: classPromise,
        members: membersPromise,
        classPerformanceSummaryItems: performanceSummaryPromise,
        performanceSummaryForDCA: caClassPerfSummaryPromise
      }).then(function(hash) {
        const aClass = hash.class;
        const members = hash.members;
        const classPerformanceSummaryItems = hash.classPerformanceSummaryItems;
        let classPerformanceSummary = classPerformanceSummaryItems
          ? classPerformanceSummaryItems.findBy('classId', classId)
          : null;
        aClass.set('performanceSummary', classPerformanceSummary);
        const performanceSummaryForDCA = hash.performanceSummaryForDCA
          ? hash.performanceSummaryForDCA.objectAt(0)
          : null;
        aClass.set('performanceSummaryForDCA', performanceSummaryForDCA);
        const courseId = aClass.get('courseId');
        let visibilityPromise = Ember.RSVP.resolve([]);
        let coursePromise = Ember.RSVP.resolve(Ember.Object.create({}));
        let skylineInitialStatePromise = Ember.RSVP.resolve(
          Ember.Object.create({})
        );
        let isPremiumCourse = route.findClassIsPermium(aClass);
        if (courseId) {
          visibilityPromise = route
            .get('classService')
            .readClassContentVisibility(classId);
          coursePromise = route.get('courseService').fetchById(courseId);
          if (isPremiumCourse) {
            skylineInitialStatePromise = route
              .get('skylineInitialService')
              .fetchState(classId);
          }
        }
        const competencyCompletionStats = isPremiumCourse
          ? route
            .get('competencyService')
            .getCompetencyCompletionStats([classId], myId)
          : Ember.RSVP.resolve(Ember.A());

        //Pass courseId as query param for student current location
        let locationQueryParam = {
          courseId
        };

        if (
          aClass.milestoneViewApplicable &&
          aClass.milestoneViewApplicable === true &&
          aClass.preference &&
          aClass.preference.framework
        ) {
          locationQueryParam.fwCode = aClass.preference.framework;
        }

        var userLocationPromise = route
          .get('analyticsService')
          .getUserCurrentLocation(classId, myId, locationQueryParam);

        return Ember.RSVP.hash({
          contentVisibility: visibilityPromise,
          course: coursePromise,
          skylineInitialState: skylineInitialStatePromise,
          currentLocation: userLocationPromise,
          competencyStats: competencyCompletionStats
        }).then(function(hash) {
          const contentVisibility = hash.contentVisibility;
          const course = hash.course;
          var currentLocation = hash.currentLocation;
          const skylineInitialState = hash.skylineInitialState;
          aClass.set('owner', members.get('owner'));
          aClass.set('collaborators', members.get('collaborators'));
          aClass.set('members', members.get('members'));
          aClass.set('currentLocation', currentLocation);
          aClass.set(
            'competencyStats',
            hash.competencyStats.findBy('classId', classId)
          );
          return Ember.RSVP.hash({
            class: aClass,
            course: course,
            members: members,
            units: course.get('children') || [],
            contentVisibility: contentVisibility,
            currentLocation: currentLocation,
            skylineInitialState: skylineInitialState,
            isPremiumCourse: isPremiumCourse
          });
        });
      });
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.set('class', model.class);
    controller.set('course', model.course);
    controller.set('units', model.units);
    controller.set('contentVisibility', model.contentVisibility);
    controller.set('skylineInitialState', model.skylineInitialState);
    controller.set('isPremiumCourse', model.isPremiumCourse);
    controller.set('classmodel', model);
  },

  resetController(controller) {
    controller.set('isNotAbleToStartPlayer', false);
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
