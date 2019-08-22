import Ember from 'ember';
import {
  ROLES,
  PLAYER_EVENT_SOURCE,
  CONTENT_TYPES
} from 'gooru-web/config/config';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['student-class-milestone-course-map-route0'],

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:session
   */
  session: Ember.inject.service(),

  /**
   * @type {performanceService} Service to retrieve milestone performance information
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * @requires service:api-sdk/analytics
   */
  analyticsService: Ember.inject.service('api-sdk/analytics'),

  /**
   * @property {NavigateMapService}
   */
  navigateMapService: Ember.inject.service('api-sdk/navigate-map'),

  /**
   * route0 Service to perform route0 data operations
   */
  route0Service: Ember.inject.service('api-sdk/route0'),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Maintains the state of data loading
   * @type {Boolean}
   */
  isLoading: false,

  /**
   * Class Id extract from class object
   * @type {String}
   */
  classId: Ember.computed.alias('class.id'),

  /**
   * Course Id which is mapped to this class.
   * @type {String}
   */
  courseId: Ember.computed.alias('class.courseId'),

  /**
   * This property have details of milestone object
   * @type {Object}
   */
  milestone: null,

  /**
   * Maintains the state of performance data to show or now
   * @type {Boolean}
   */
  showPerformance: true,

  /**
   * Maintains the state of whether to locate last played item or not
   * @type {Boolean}
   */
  locateLastPlayedItem: true,

  /**
   * Maintains the student Id, by default this will be NULL
   * @type {String}
   */
  studentId: null,

  /**
   * @property {Boolean} isShowRoute0CollectionReport
   */
  isShowRoute0CollectionReport: false,

  /**
   * @property {Boolean} isShowRoute0ExternalAssessmentReport
   */
  isShowRoute0ExternalAssessmentReport: false,

  /**
   * Property will decided to show the play button or not
   * @type {Boolean}
   */
  allowToPlay: true,

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Handle toggle functionality of hide/show milestone items
     * @return {Object}
     */
    toggleMilestoneItems(selectedMilestone) {
      this.handleMilestoneToggle(selectedMilestone);
    },

    /**
     * Handle toggle functionality of hide/show lesson items
     * @return {Object}
     */
    toggleLessonItems(selectedLesson, lessonIndex) {
      this.handleMilestoneLessonToggle(selectedLesson, lessonIndex);
    },

    /**
     * Open the player with the specific collection/assessment
     *
     * @function actions:studyPlayer
     * @param {string} unitId - Identifier for a unit
     * @param {string} lessonId - Identifier for lesson
     * @param {string} item - collection, assessment, lesson or resource
     */
    studyPlayer: function(type, unitId, lessonId, item) {
      const component = this;
      const classId = component.get('classId');
      const minScore = component.get('class.minScore');
      const courseId = component.get('courseId');
      item.set('minScore', minScore);
      component.startCollectionStudyPlayer(
        classId,
        courseId,
        unitId,
        lessonId,
        item
      );
    },

    //Action triggered when click on collection performance
    onOpenRoute0CollectionReport(unitId, lesson, collection) {
      const component = this;
      let studentCollectionReportContext = {
        userId: component.get('session.userId'),
        classId: component.get('classId'),
        courseId: component.get('courseId'),
        unitId,
        lessonId: lesson.get('lessonId'),
        collectionId: collection.get('collectionId'),
        type: collection.get('collectionType'),
        lesson,
        isStudent: true,
        isTeacher: false,
        collection
      };
      let reportType = collection.get('collectionType');
      if (reportType === 'assessment-external') {
        component.set('isShowRoute0ExternalAssessmentReport', true);
      } else {
        component.set('isShowRoute0CollectionReport', true);
      }
      component.set(
        'studentCollectionReportContext',
        studentCollectionReportContext
      );
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * Function to triggered once when the component element is first rendered.
   */
  didInsertElement() {
    this.loadData();
  },

  didRender() {
    let component = this;
    component.$('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
  },

  //--------------------------------------------------------------------------
  // Methods

  loadData() {
    let component = this;
    let courseId = component.get('courseId');
    let classId = component.get('classId');
    component.set('isLoading', true);
    let locateLastPlayedItem = component.get('locateLastPlayedItem');
    let userId = component.get('studentId');
    let route0Promise;
    if (userId) {
      route0Promise = component.get('route0Service').fetchInClassByTeacher({
        courseId,
        classId,
        userId
      });
    } else {
      route0Promise = component.get('route0Service').fetchInClass({
        courseId,
        classId
      });
    }

    route0Promise.then(route0 => {
      if (!component.isDestroyed) {
        component.set(
          'milestone',
          component.mergeUnitsToMilestone(route0.route0Content.units)
        );
        if (locateLastPlayedItem) {
          component.identifyUserLocationAndLocate();
        }
        component.set('isLoading', false);
      }
    });
  },

  fetchCollectionPerformance(lesson, collections) {
    let component = this;
    let studentId = component.get('studentId');
    let userUid = studentId ? studentId : component.get('session.userId');
    let classId = component.get('classId');
    let courseId = component.get('courseId');
    let unitId = lesson.get('unitId');
    let lessonId = lesson.get('lessonId');
    let performanceService = component.get('performanceService');

    Ember.RSVP.hash({
      performanceAssessment: performanceService.getCollectionsPerformanceByLessonId(
        classId,
        courseId,
        unitId,
        lessonId,
        CONTENT_TYPES.ASSESSMENT,
        userUid
      ),
      performanceCollection: performanceService.getCollectionsPerformanceByLessonId(
        classId,
        courseId,
        unitId,
        lessonId,
        CONTENT_TYPES.COLLECTION,
        userUid
      )
    }).then(({ performanceAssessment, performanceCollection }) => {
      component.setMilestoneCollectionPerformanceData(
        collections,
        performanceAssessment
      );
      component.setMilestoneCollectionPerformanceData(
        collections,
        performanceCollection
      );
    });
  },

  setMilestoneCollectionPerformanceData(
    collections,
    lessonCollectionsPerformance
  ) {
    lessonCollectionsPerformance.forEach(lessonCollectionPerformance => {
      let collectionId = lessonCollectionPerformance.get('collectionId');
      let collection = collections.findBy('collectionId', collectionId);
      if (collection) {
        collection.set(
          'performance',
          lessonCollectionPerformance.get('performance')
        );
        collection.set('has-activity', true);
      }
    });
  },

  handleMilestoneToggle(selectedMilestone) {
    let component = this;
    let milestoneId = selectedMilestone.get('milestoneId');
    let element = `#milestone-${milestoneId}`;
    let locateLastPlayedItem = component.get('locateLastPlayedItem');
    if (selectedMilestone.get('isActive')) {
      component.$(element).slideUp(400, function() {
        selectedMilestone.set('isActive', false);
      });
    } else {
      component.$(element).slideDown(400, function() {
        selectedMilestone.set('isActive', true);
      });
    }

    if (!component.get('hasLessonFetched')) {
      let lessons = selectedMilestone.get('lessons');
      let userCurrentLocation = component.get('userCurrentLocation');
      if (locateLastPlayedItem && userCurrentLocation) {
        let lessonId = userCurrentLocation.get('lessonId');
        let selectedLesson = lessons.findBy('lessonId', lessonId);
        let lessonIndex = lessons.indexOf(selectedLesson);
        if (selectedLesson) {
          Ember.run.later(function() {
            component.handleMilestoneLessonToggle(selectedLesson, lessonIndex);
          }, 500);
        }
      }
      selectedMilestone.set('hasLessonFetched', true);
    }
  },

  handleMilestoneLessonToggle(selectedLesson, lessonIndex) {
    let component = this;
    let lessonId = selectedLesson.get('lessonId');
    let unitId = selectedLesson.get('unitId');
    let element = `#milestone-lesson-${unitId}-${lessonId}-${lessonIndex}`;
    let showPerformance = component.get('showPerformance');
    let locateLastPlayedItem = component.get('locateLastPlayedItem');
    let componentEle = component.$(element);
    if (selectedLesson.get('isActive')) {
      if (componentEle) {
        componentEle.slideUp(400, function() {
          selectedLesson.set('isActive', false);
        });
      }
    } else {
      if (componentEle) {
        componentEle.slideDown(400, function() {
          selectedLesson.set('isActive', true);
        });
      }
    }
    let collections = selectedLesson.get('collections');
    if (!selectedLesson.get('hasCollectionFetched')) {
      selectedLesson.set('hasCollectionFetched', true);
      let userCurrentLocation = component.get('userCurrentLocation');
      if (locateLastPlayedItem && userCurrentLocation) {
        let collectionId = userCurrentLocation.get('collectionId');
        let selectedCollection = collections.findBy(
          'collectionId',
          collectionId
        );
        if (selectedCollection) {
          selectedCollection.set('last-played-collection', true);
        }
      }
      if (showPerformance) {
        component.fetchCollectionPerformance(selectedLesson, collections);
      }
    }
  },

  identifyUserLocationAndLocate() {
    let component = this;
    let classId = component.get('classId');
    let courseId = component.get('courseId');
    let userId = component.get('session.userId');

    let locationQueryParam = {
      courseId
    };
    component
      .get('analyticsService')
      .getUserCurrentLocation(classId, userId, locationQueryParam)
      .then(userCurrentLocation => {
        if (!component.isDestroyed) {
          component.set('userCurrentLocation', userCurrentLocation);
          if (userCurrentLocation) {
            let lessonId = userCurrentLocation.get('lessonId');
            let selectedLesson = component
              .get('milestone.lessons')
              .findBy('lessonId', lessonId);
            if (selectedLesson) {
              let selectedMilestone = component.get('milestone');
              component.handleMilestoneToggle(selectedMilestone);
            }
          }
        }
      });
  },

  mergeUnitsToMilestone(units) {
    let lessonData = Ember.A([]);
    let milestone = Ember.Object.create();
    units.forEach(unit => {
      let lessons = unit.get('lessons');
      lessons.forEach(lesson => {
        lesson.set('unitId', unit.get('unitId'));
        lesson.set('ulId', `${unit.get('unitId') - unit.get('lessonId')}`);
        lesson.set('unitTitle', unit.get('unitTitle'));
      });
      lessonData.pushObjects(lessons);
    });
    milestone.set('milestoneId', 0);
    milestone.set('lessons', lessonData);
    return milestone;
  },

  /**
   * Navigates to collection
   * @param {string} classId
   * @param {string} courseId
   * @param {string} unitId
   * @param {string} lessonId
   * @param {Collection} collection
   */
  startCollectionStudyPlayer: function(
    classId,
    courseId,
    unitId,
    lessonId,
    collection
  ) {
    let component = this;
    let role = ROLES.STUDENT;
    let source = PLAYER_EVENT_SOURCE.COURSE_MAP;
    let collectionId = collection.get('id');
    let collectionType = collection.get('collectionType');
    let collectionSubType = collection.get('collectionSubType');
    let minScore = collection.get('minScore');
    let pathId = collection.get('pathId') || 0;
    let pathType = collection.get('pathType') || '';
    let queryParams = {
      classId,
      unitId,
      lessonId,
      collectionId,
      role,
      source,
      type: collectionType,
      subtype: collectionSubType,
      pathId,
      minScore,
      collectionSource: collection.source || 'course_map',
      isStudyPlayer: true,
      pathType
    };

    let suggestionPromise = null;
    // Verifies if it is a suggested Collection/Assessment
    if (collectionSubType) {
      suggestionPromise = component
        .get('navigateMapService')
        .startSuggestion(
          courseId,
          unitId,
          lessonId,
          collectionId,
          collectionType,
          collectionSubType,
          pathId,
          classId,
          pathType
        );
    } else {
      suggestionPromise = component
        .get('navigateMapService')
        .startCollection(
          courseId,
          unitId,
          lessonId,
          collectionId,
          collectionType,
          classId,
          pathId,
          pathType
        );
    }
    suggestionPromise.then(() =>
      component.get('router').transitionTo('study-player', courseId, {
        queryParams
      })
    );
  }
});
