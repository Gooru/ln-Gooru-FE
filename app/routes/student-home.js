import Ember from 'ember';
import PrivateRouteMixin from 'gooru-web/mixins/private-route-mixin';
import ConfigurationMixin from 'gooru-web/mixins/configuration';
import {
  ROLES,
  PLAYER_EVENT_SOURCE,
  CLASS_SKYLINE_INITIAL_DESTINATION
} from 'gooru-web/config/config';
import {
  currentLocationToMapContext,
  createStudyPlayerQueryParams,
  hasSuggestions
} from 'gooru-web/utils/navigation-util';

/**
 * Student home route
 *
 * @module
 * @augments Ember.Route
 */
export default Ember.Route.extend(PrivateRouteMixin, ConfigurationMixin, {
  // -------------------------------------------------------------------------
  // Dependencies
  analyticsService: Ember.inject.service('api-sdk/analytics'),

  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * @type {CourseService} Service to retrieve course information
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @property {NavigateMapService}
   */
  navigateMapService: Ember.inject.service('api-sdk/navigate-map'),

  /**
   * @dependency {i18nService} Service to retrieve translations information
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
     * Open the player with the specific currentLocation
     *
     * @function actions:playItem
     * @param {string} currentLocation - All the params for the currentLocation
     */
    studyPlayer: function(currentLocation, classData) {
      const route = this;
      let classId = currentLocation
        ? currentLocation.get('classId')
        : classData.get('id');
      let courseId = currentLocation
        ? currentLocation.get('courseId')
        : classData.get('courseId');
      if (route.findClassIsPermium(classData)) {
        route.doCheckClassDestination(
          classData,
          classId,
          courseId,
          currentLocation
        );
      } else {
        route.playContent(classData, classId, courseId, currentLocation);
      }
    },

    /**
     * Triggered when a student card menu item is selected
     * @param {string} item
     * @param {string} classId
     */
    selectMenuItem: function(item, classId, courseId) {
      const route = this;
      let queryParams = {
        queryParams: {
          tab: 'report'
        }
      };
      if (item === 'cm-report') {
        route.transitionTo('student.class.course-map', classId, queryParams);
      } else if (item === 'ca-report') {
        route.transitionTo(
          'student.class.class-activities',
          classId,
          queryParams
        );
      } else if (item === 'profile') {
        let userId = this.get('session.userId');
        route.transitionTo(
          'student.class.student-learner-proficiency',
          classId,
          {
            queryParams: {
              userId: userId,
              classId: classId,
              courseId: courseId,
              role: 'student'
            }
          }
        );
      } else if (item === 'course-map') {
        route.transitionTo('student.class.course-map', classId);
      } else if (item === 'class-activities') {
        route.transitionTo('student.class.class-activities', classId);
      } else {
        route.transitionTo('student-home');
      }
    }
  },

  // -------------------------------------------------------------------------
  // Methods
  model: function() {
    let route = this;
    const configuration = this.get('configurationService.configuration');
    let localStorage = this.getLocalStorage();
    const userId = this.get('session.userId');
    const localStorageLogins = `${userId}_logins`;
    let loginCount = localStorage.getItem(localStorageLogins);
    loginCount = loginCount ? 0 + loginCount : 0;

    let firstCoursePromise = Ember.RSVP.resolve(Ember.Object.create({}));
    let secondCoursePromise = Ember.RSVP.resolve(Ember.Object.create({}));
    let thirdCoursePromise = Ember.RSVP.resolve(Ember.Object.create({}));
    let fourthCoursePromise = Ember.RSVP.resolve(Ember.Object.create({}));
    var featuredCourses = Ember.A([]);

    const firstCourseId = configuration.get(
      'exploreFeaturedCourses.firstCourseId'
    );
    const secondCourseId = configuration.get(
      'exploreFeaturedCourses.secondCourseId'
    );
    const thirdCourseId = configuration.get(
      'exploreFeaturedCourses.thirdCourseId'
    );
    const fourthCourseId = configuration.get(
      'exploreFeaturedCourses.fourthCourseId'
    );

    if (firstCourseId && loginCount <= 5) {
      firstCoursePromise = route.get('courseService').fetchById(firstCourseId);
    }
    if (secondCourseId && loginCount <= 5) {
      secondCoursePromise = route
        .get('courseService')
        .fetchById(secondCourseId);
    }
    if (thirdCourseId && loginCount <= 5) {
      thirdCoursePromise = route.get('courseService').fetchById(thirdCourseId);
    }
    if (fourthCourseId && loginCount <= 5) {
      fourthCoursePromise = route
        .get('courseService')
        .fetchById(fourthCourseId);
    }

    const myId = route.get('session.userId');
    let myClasses =
      route.modelFor('application').myClasses || // when refreshing the page the variable is accessible at the route
      route.controllerFor('application').get('myClasses'); // after login the variable is refreshed at the controller

    return Ember.RSVP.hash({
      firstCourse: firstCoursePromise,
      secondCourse: secondCoursePromise,
      thirdCourse: thirdCoursePromise,
      fourthCourse: fourthCoursePromise,
      myClasses: myClasses
    }).then(function(hash) {
      const firstFeaturedCourse = hash.firstCourse;
      const secondFeaturedCourse = hash.secondCourse;
      const thirdFeaturedCourse = hash.thirdCourse;
      const fourthFeaturedCourse = hash.fourthCourse;
      featuredCourses.push(firstFeaturedCourse);
      featuredCourses.push(secondFeaturedCourse);
      featuredCourses.push(thirdFeaturedCourse);
      featuredCourses.push(fourthFeaturedCourse);

      const activeClasses = hash.myClasses.getStudentActiveClasses(myId);
      return {
        activeClasses,
        featuredCourses,
        loginCount
      };
    });
  },

  afterModel(resolvedModel) {
    this.loadClassCardsData(resolvedModel.activeClasses);
  },

  loadClassCardsData(activeClasses) {
    let route = this;
    let classCourseIds = route.getListOfClassCourseIds(activeClasses);
    let courseIDs = route.getListOfCourseIds(activeClasses);
    let myId = route.get('session.userId');
    let nonPremiumClasses = activeClasses.filter(classData => {
      let setting = classData.get('setting');
      return setting === null || !setting['course.premium'];
    });
    let nonPremiumClassCourseIds = route.getListOfClassCourseIds(
      nonPremiumClasses
    );
    let nonPremiumClassIds = nonPremiumClasses.map(classData => {
      return classData.get('id');
    });
    let premiumClassIds = activeClasses
      .filter(classData => {
        let setting = classData.get('setting');
        return setting !== null && setting['course.premium'];
      })
      .map(classData => {
        return classData.get('id');
      });

    let courseCardsPromise = route
      .get('courseService')
      .fetchCoursesCardData(courseIDs);
    let perfPromise = route
      .get('performanceService')
      .findClassPerformanceSummaryByStudentAndClassIds(
        myId,
        nonPremiumClassCourseIds
      );
    let locationPromise = route
      .get('analyticsService')
      .getUserCurrentLocationByClassIds(classCourseIds, myId);
    let competencyCompletionStats =
      premiumClassIds.length > 0
        ? route
          .get('competencyService')
          .getCompetencyCompletionStats(premiumClassIds, myId)
        : Ember.RSVP.resolve([]);
    let caClassPerfSummaryPromise =
      nonPremiumClassIds.length > 0
        ? route
          .get('performanceService')
          .getCAPerformanceData(nonPremiumClassIds, myId)
        : Ember.RSVP.resolve([]);

    Ember.RSVP.hash({
      classPerformanceSummaryItems: perfPromise,
      classesLocation: locationPromise,
      courseCards: courseCardsPromise,
      caClassPerfSummary: caClassPerfSummaryPromise,
      competencyStats: competencyCompletionStats
    }).then(function(hash) {
      const classPerformanceSummaryItems = hash.classPerformanceSummaryItems;
      const classesLocation = hash.classesLocation;
      const courseCards = hash.courseCards;

      activeClasses.forEach(function(activeClass) {
        const classId = activeClass.get('id');
        const courseId = activeClass.get('courseId');

        activeClass.set(
          'currentLocation',
          classesLocation.findBy('classId', classId)
        );
        activeClass.set(
          'performanceSummary',
          classPerformanceSummaryItems.findBy('classId', classId)
        );
        activeClass.set(
          'performanceSummaryForDCA',
          hash.caClassPerfSummary.findBy('classId', classId)
        );
        activeClass.set(
          'competencyStats',
          hash.competencyStats.findBy('classId', classId)
        );

        if (courseId) {
          let course = courseCards.findBy('id', activeClass.get('courseId'));
          activeClass.set('course', course);
        }
      });
    });
  },

  /**
   * @function getListOfClassCourseIds
   * Method to fetch class and course ids from the list of classess
   */
  getListOfClassCourseIds(activeClasses) {
    let listOfActiveClassCourseIds = Ember.A([]);
    activeClasses.map(activeClass => {
      if (activeClass.courseId) {
        let classCourseId = {
          classId: activeClass.id,
          courseId: activeClass.courseId
        };
        listOfActiveClassCourseIds.push(classCourseId);
      }
    });
    return listOfActiveClassCourseIds;
  },

  /**
   * @function getListOfCourseIds
   * Method to fetch course ids from the list of classess
   */
  getListOfCourseIds(activeClasses) {
    let listOfActiveCourseIds = Ember.A([]);
    activeClasses.map(activeClass => {
      if (activeClass.courseId) {
        listOfActiveCourseIds.push(activeClass.courseId);
      }
    });
    return listOfActiveCourseIds;
  },

  setupController: function(controller, model) {
    controller.set('steps', model.tourSteps);
    controller.set('featuredCourses', model.featuredCourses);
    controller.set('activeClasses', model.activeClasses);
    controller.set('loginCount', model.loginCount);
  },

  /**
   * Before leaving the route
   */
  deactivate: function() {
    this.controller.set('isLoading', false);
  },

  /** returns options promise chain resolving response
   * @param
   */
  nextPromiseHandler(resp) {
    let queryParams = {
      role: ROLES.STUDENT,
      source: PLAYER_EVENT_SOURCE.COURSE_MAP,
      courseId: hasSuggestions(resp) ? resp.context.courseId : resp.courseId // Only in case of suggestions we dont have courseId in suggestion
    };
    let isContentMapped = true;
    queryParams = createStudyPlayerQueryParams(
      hasSuggestions(resp) ? resp.suggestions[0] : resp.context || resp,
      queryParams
    );
    isContentMapped = !!(queryParams.collectionId || queryParams.id);
    if (isContentMapped) {
      return Ember.RSVP.resolve(queryParams);
    } else {
      return Ember.RSVP.reject(null);
    }
  },

  playContent(classData, classId, courseId, currentLocation) {
    const route = this;
    const controller = route.get('controller');
    let activeClasses = controller.get('activeClasses');
    let navigateMapService = route.get('navigateMapService');
    let options = {
        role: ROLES.STUDENT,
        source: PLAYER_EVENT_SOURCE.COURSE_MAP,
        courseId,
        classId
      },
      nextPromise = null;
    //start studying
    if (currentLocation == null || currentLocation === '') {
      nextPromise = navigateMapService.continueCourse(
        options.courseId,
        options.classId
      );
    } else if (currentLocation.get('status') === 'complete') {
      //completed
      nextPromise = navigateMapService.contentServedResource(
        currentLocationToMapContext(currentLocation)
      );
    } else {
      //in-progress
      // Next not required, get the params from current location
      nextPromise = route.nextPromiseHandler(
        currentLocationToMapContext(currentLocation)
      );
    }
    nextPromise
      .then(route.nextPromiseHandler)
      .then(queryParams => {
        route.transitionTo('study-player', courseId, {
          queryParams
        });
      })
      .catch(() => {
        let selectedClass = activeClasses.findBy('id', classData.get('id'));
        selectedClass.set('isNotAbleToStartPlayer', true);
        // Below logic is used to clear the left over state of study player,
        // in order to avoid the conflict.
        navigateMapService
          .getLocalStorage()
          .removeItem(navigateMapService.generateKey());
      });
  },

  doCheckClassDestination(classData, classId, courseId, currentLocation) {
    const route = this;
    return route
      .get('skylineInitialService')
      .fetchState(classId)
      .then(skylineInitialState => {
        let destination = skylineInitialState.get('destination');
        if (
          destination === CLASS_SKYLINE_INITIAL_DESTINATION.classSetupInComplete
        ) {
          return route.transitionTo('student.class.setup-in-complete', classId);
        } else if (
          destination === CLASS_SKYLINE_INITIAL_DESTINATION.showDirections ||
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
        } else {
          route.playContent(classData, classId, courseId, currentLocation);
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
