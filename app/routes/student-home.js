import Ember from 'ember';
import PrivateRouteMixin from 'gooru-web/mixins/private-route-mixin';
import ConfigurationMixin from 'gooru-web/mixins/configuration';
import { ROLES, PLAYER_EVENT_SOURCE } from 'gooru-web/config/config';
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
      const controller = route.get('controller');
      let navigateMapService = route.get('navigateMapService');
      let classId = currentLocation ? currentLocation.get('classId') : classData.get('id');
      let courseId = currentLocation ? currentLocation.get('courseId') : classData.get('courseId');
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
      } else if (currentLocation.get('status') === 'complete') {  //completed
        nextPromise = navigateMapService.contentServedResource(
          currentLocationToMapContext(currentLocation)
        );
      } else {  //in-progress
        // Next not required, get the params from current location
        nextPromise = route.nextPromiseHandler(
          currentLocationToMapContext(currentLocation)
        );
      }
      nextPromise.then(route.nextPromiseHandler).then(queryParams => {
        route.transitionTo('study-player', courseId, { queryParams });
      })
        .catch(() => {
          controller.set('isNotAbleToStartPlayer', true);
          // Below logic is used to clear the left over state of study player,
          // in order to avoid the conflict.
          navigateMapService
            .getLocalStorage()
            .removeItem(navigateMapService.generateKey());
        });
    },

    /**
     * Triggered when a student card menu item is selected
     * @param {string} item
     * @param {string} classId
     */
    selectMenuItem: function(item, classId) {
      const route = this;
      const controller = route.get('controller');
      const queryParams = {
        queryParams: {
          tab: 'report'
        }
      };
      controller.set('isNotAbleToStartPlayer', false);
      if (item === 'report') {
        route.transitionTo('student.class.course-map', classId, queryParams);
      } else if (item === 'profile') {
        route.transitionTo('student.class.profile', classId);
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

    //Steps for Take a Tour functionality
    const tourSteps = Ember.A([
      {
        elementSelector: '.gru-take-tour',
        title: route.get('i18n').t('gru-take-tour.student-home.stepOne.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepOne.description')
      },
      {
        elementSelector: '.gru-header .home-link',
        title: route.get('i18n').t('gru-take-tour.student-home.stepTwo.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepTwo.description')
      },
      {
        elementSelector: '.gru-header .search-navbar-form',
        title: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepThree.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepThree.description')
      },
      {
        elementSelector: '.gru-header .menu-navbar .study-link',
        title: route.get('i18n').t('gru-take-tour.student-home.stepFour.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepFour.description')
      },
      {
        elementSelector: '.gru-header .menu-navbar .library-link',
        title: route.get('i18n').t('gru-take-tour.student-home.stepFive.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepFive.description')
      },
      {
        elementSelector: '.gru-header .menu-navbar .profile-link',
        title: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepSeven.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepSeven.description')
      },
      {
        elementSelector: '.gru-header .menu-navbar .dropdown .profile-more',
        title: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepEight.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepEight.description')
      },
      {
        elementSelector: '.student-left-panel .featured-courses',
        title: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepFeaturedCourses.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepFeaturedCourses.description')
      },
      {
        elementSelector: '.student-navigator .active-classes a',
        title: route.get('i18n').t('gru-take-tour.student-home.stepTen.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepTen.description')
      },
      {
        elementSelector: '.student-navigator .independent-learning a',
        title: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepEleven.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepEleven.description')
      },
      {
        elementSelector: '.content .gru-join-class-card',
        title: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepTwelve.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepTwelve.description')
      },
      {
        title: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepThirteen.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-home.stepThirteen.description')
      }
    ]);

    let myClasses =
      route.modelFor('application').myClasses || //when refreshing the page the variable is accessible at the route
      route.controllerFor('application').get('myClasses'); //after login the variable is refreshed at the controller
    let firstCoursePromise = Ember.RSVP.resolve(Ember.Object.create({}));
    let secondCoursePromise = Ember.RSVP.resolve(Ember.Object.create({}));
    let thirdCoursePromise = Ember.RSVP.resolve(Ember.Object.create({}));
    let fourthCoursePromise = Ember.RSVP.resolve(Ember.Object.create({}));
    const myId = route.get('session.userId');
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
    let myClassessPromise = Ember.RSVP.resolve(
      route.controllerFor('application').loadUserClasses()
    );
    var featuredCourses = Ember.A([]);

    if (firstCourseId) {
      firstCoursePromise = route.get('courseService').fetchById(firstCourseId);
    }
    if (secondCourseId) {
      secondCoursePromise = route
        .get('courseService')
        .fetchById(secondCourseId);
    }
    if (thirdCourseId) {
      thirdCoursePromise = route.get('courseService').fetchById(thirdCourseId);
    }
    if (fourthCourseId) {
      fourthCoursePromise = route
        .get('courseService')
        .fetchById(fourthCourseId);
    }
    return Ember.RSVP.hash({
      firstCourse: firstCoursePromise,
      secondCourse: secondCoursePromise,
      thirdCourse: thirdCoursePromise,
      fourthCourse: fourthCoursePromise,
      myClasses: myClassessPromise
    }).then(function(hash) {
      const firstFeaturedCourse = hash.firstCourse;
      const secondFeaturedCourse = hash.secondCourse;
      const thirdFeaturedCourse = hash.thirdCourse;
      const fourthFeaturedCourse = hash.fourthCourse;
      const activeClasses = myClasses.getStudentActiveClasses(myId);
      featuredCourses.push(firstFeaturedCourse);
      featuredCourses.push(secondFeaturedCourse);
      featuredCourses.push(thirdFeaturedCourse);
      featuredCourses.push(fourthFeaturedCourse);

      return {
        activeClasses,
        featuredCourses,
        tourSteps
      };
    });
  },

  afterModel(resolvedModel) {
    let route = this;
    let activeClasses = resolvedModel.activeClasses;
    let classCourseIds = route.getListOfClassCourseIds(activeClasses);
    let myId = route.get('session.userId');

    Ember.RSVP.hash({
      classPerformanceSummaryItems: route
        .get('performanceService')
        .findClassPerformanceSummaryByStudentAndClassIds(myId, classCourseIds),
      classesLocation: route
        .get('analyticsService')
        .getUserCurrentLocationByClassIds(classCourseIds, myId)
    }).then(function(hash) {
      const classPerformanceSummaryItems = hash.classPerformanceSummaryItems;
      const classesLocation = hash.classesLocation;
      activeClasses.forEach(function(activeClass) {
        const classId = activeClass.get('id');
        activeClass.set(
          'currentLocation',
          classesLocation.findBy('classId', classId)
        );
        activeClass.set(
          'performanceSummary',
          classPerformanceSummaryItems.findBy('classId', classId)
        );
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

  setupController: function(controller, model) {
    controller.set('steps', model.tourSteps);
    controller.set('featuredCourses', model.featuredCourses);
    controller.set('activeClasses', model.activeClasses);
  },

  resetController(controller) {
    controller.set('isNotAbleToStartPlayer', false);
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
    isContentMapped = !!queryParams.collectionId;
    if (isContentMapped) {
      return Ember.RSVP.resolve(queryParams);
    } else {
      return Ember.RSVP.reject(null);
    }
  }
});
