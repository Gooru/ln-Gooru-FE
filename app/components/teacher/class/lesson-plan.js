import Ember from 'ember';
import { CONTENT_TYPES } from 'gooru-web/config/config';
import {
  aggregateMilestonePerformanceScore,
  aggregateMilestonePerformanceTimeSpent
} from 'gooru-web/utils/performance-data';
import CurrentLocationSerializer from 'gooru-web/serializers/analytics/current-location';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['teacher-class-milestone-course-map-lesson-plan'],

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:session
   */
  session: Ember.inject.service(),

  /**
   * @requires service:api-sdk/course-map
   */
  courseMapService: Ember.inject.service('api-sdk/course-map'),

  /**
   * @type {CourseService} Service to retrieve course information
   */
  courseService: Ember.inject.service('api-sdk/course'),

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

  // -------------------------------------------------------------------------
  // Properties

  location: null,

  currentLocationSerializer: null,
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
   * Computed Property to extract framework code from settings
   * @return {String}
   */
  fwCode: Ember.computed('class', function() {
    let preference = this.get('class.preference');
    return preference != null && preference.get('framework')
      ? preference.get('framework')
      : 'GUT';
  }),

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
   * @property {Boolean} isShowMilestoneReport
   */
  isShowMilestoneReport: false,

  /**
   * @property {Number} activeMilestoneIndex
   */
  activeMilestoneIndex: 1,

  /**
   * @property {Object} rescopedContents
   */
  rescopedContents: null,

  /**
   * @property {UUID} userId
   */
  userId: Ember.computed.alias('session.userId'),

  /**
   * Maintains the state of show all rescope content or not.
   * @type {Boolean}
   */
  showAllRescopedContent: false,

  /**
   * Maintains the state of class grade.
   * @type {Number}
   */
  classGrade: Ember.computed.alias('class.gradeCurrent'),

  /**
   * Maintains the state of active milestone.
   * @type {Object}
   */
  activeMilestone: Ember.computed('milestones', 'classGrade', function() {
    return this.get('milestones').findBy('grade_id', this.get('classGrade'));
  }),

  classMembers: Ember.A([]),

  init: function() {
    this._super(...arguments);
    this.set(
      'currentLocationSerializer',
      CurrentLocationSerializer.create(Ember.getOwner(this).ownerInjection())
    );
  },

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
    toggleLessonItems(milestone, lessons, selectedLesson, lessonIndex) {
      this.handleMilestoneLessonToggle(
        milestone,
        lessons,
        selectedLesson,
        lessonIndex
      );
    },

    /**sessionIndexsessionIndex
     * Toggle lesson plan accordion
     */
    toggleLessonPlanItems(milestoneId, lessonId, lesson) {
      let component = this;
      let selectedElement = `#lesson-plan-${milestoneId}-${lessonId}-${lesson.id}`;
      if (lesson.isActive) {
        component.$(selectedElement).slideUp(400, function() {
          lesson.isActive = false;
        });
      } else {
        component.$(selectedElement).slideDown(400, function() {
          lesson.isActive = true;
        });
      }
    },

    toggleLessonPlanType(milestoneId, lessonId, titleName) {
      let component = this;
      let selectedElement = `#lesson-plan-${milestoneId}-${lessonId}-${titleName}`;
      let isActive = $(selectedElement).hasClass('active');
      if (!isActive) {
        component
          .$(selectedElement)
          .addClass('active')
          .slideDown(400);
      } else {
        component
          .$(selectedElement)
          .removeClass('active')
          .slideUp(400);
      }
    },
    toggleSessionCollection(milestoneId, lessonId, lesson, sessionIndex) {
      let component = this;
      let selectedElement = `#session-collection-${milestoneId}-${lessonId}-${lesson.id}-session-${sessionIndex}`;
      if (lesson.isSessionActive) {
        component.$(selectedElement).slideUp(400, function() {
          lesson.isSessionActive = false;
        });
      } else {
        component.$(selectedElement).slideDown(400, function() {
          lesson.isSessionActive = true;
        });
      }
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * Function to triggered once when the component element is first rendered.
   */
  didInsertElement() {
    const component = this;
    component.loadData();
    let activeMilestone = component.get('activeMilestone');
    if (activeMilestone) {
      component.send('toggleMilestoneItems', activeMilestone);
    }
  },

  didDestroyElement() {
    let component = this;
    component.get('milestones').map(milestone => {
      milestone.set('isActive', false);
    });
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
    component.set('isLoading', true);
    let showPerformance = component.get('showPerformance');
    let filters = {
      subject: component.get('class.preference.subject')
    };
    let fwkCode = component.get('fwCode');
    if (fwkCode) {
      filters.fw_code = fwkCode;
    }

    let milestones = component.get('milestones');
    let milestoneData = component.renderMilestonesBasedOnStudentGradeRange(
      milestones
    );
    component.set('milestones', milestoneData);
    if (showPerformance) {
      component.fetchMilestonePerformance();
    }
    component.set('isLoading', false);
  },

  fetchMilestonePerformance() {
    let component = this;
    let performanceService = component.get('performanceService');
    let classId = component.get('classId');
    let courseId = component.get('courseId');
    let fwCode = component.get('fwCode');
    let milestones = component.get('milestones');
    performanceService
      .getPerformanceForMilestones(
        classId,
        courseId,
        'assessment',
        undefined,
        fwCode
      )
      .then(milestonesPerformance => {
        milestones.forEach((milestone, index) => {
          let milestonePerformanceItems = milestonesPerformance.filterBy(
            'milestoneId',
            milestone.get('milestone_id')
          );
          milestone.set(
            'performance',
            Ember.Object.create({
              scoreInPercentage: null,
              timeSpent: null,
              hasStarted: false,
              score: null
            })
          );
          milestone.set('sequence', index + 1);
          if (milestonePerformanceItems.length) {
            let numberOfSubmissions = component.findNumberOfStudentsByItem(
              milestonePerformanceItems,
              'milestoneId',
              milestone.get('milestone_id'),
              'userUid'
            );
            milestone.set('numberOfSubmissions', numberOfSubmissions);
            let milestonePerformanceScore = aggregateMilestonePerformanceScore(
              milestonePerformanceItems
            );
            let milestonePerformanceTimeSpent = aggregateMilestonePerformanceTimeSpent(
              milestonePerformanceItems
            );
            if (milestonePerformanceScore || milestonePerformanceTimeSpent) {
              milestone.set(
                'performance.scoreInPercentage',
                milestonePerformanceScore
              );
              milestone.set(
                'performance.timeSpent',
                milestonePerformanceTimeSpent
              );
              milestone.set(
                'performance.hasStarted',
                milestonePerformanceScore >= 0
              );
              milestone.set('performance.score', milestonePerformanceScore);
            }
          }
        });
      });
  },

  fetchMilestoneLessonsPerformance(milestoneId, lessons) {
    let component = this;
    let performanceService = component.get('performanceService');
    let classId = component.get('classId');
    let courseId = component.get('courseId');
    let fwCode = component.get('fwCode');

    Ember.RSVP.hash({
      milestoneLessonsPerformance: performanceService.getLessonsPerformanceByMilestoneId(
        classId,
        courseId,
        milestoneId,
        CONTENT_TYPES.ASSESSMENT,
        undefined,
        fwCode
      )
    }).then(({ milestoneLessonsPerformance }) => {
      if (!component.isDestroyed) {
        lessons.forEach((lesson, index) => {
          let lessonPerformance = milestoneLessonsPerformance.filterBy(
            'lessonId',
            lesson.get('lesson_id')
          );
          lesson.set('sequence', index + 1);
          lesson.set(
            'performance',
            Ember.Object.create({
              scoreInPercentage: null,
              score: null,
              timeSpent: null,
              hasStarted: false
            })
          );
          lesson.set('sequence', index + 1);

          if (lessonPerformance.length) {
            let numberOfSubmissions = component.findNumberOfStudentsByItem(
              lessonPerformance,
              'lessonId',
              lesson.get('lesson_id'),
              'userUid'
            );
            lesson.set('numberOfSubmissions', numberOfSubmissions);
            let lessonAggregatedScore = aggregateMilestonePerformanceScore(
              lessonPerformance
            );
            let lessonAggregatedTimeSpent = aggregateMilestonePerformanceTimeSpent(
              lessonPerformance
            );
            lesson.set('performance.scoreInPercentage', lessonAggregatedScore);
            lesson.set('performance.score', lessonAggregatedScore);
            lesson.set('performance.timeSpent', lessonAggregatedTimeSpent);
            lesson.set('performance.hasStarted', lessonAggregatedScore >= 0);
          }
        });
      }
    });
  },

  setMilestoneLessonPerformanceData(
    type,
    lessons,
    milestoneLessonsPerformance
  ) {
    milestoneLessonsPerformance.forEach(milestoneLessonPerformance => {
      let lessonId = milestoneLessonPerformance.get('lessonId');
      let lesson = lessons.findBy('lesson_id', lessonId);
      if (lesson) {
        if (
          type === CONTENT_TYPES.ASSESSMENT ||
          type === CONTENT_TYPES.OFFLINE_ACTIVITY
        ) {
          lesson.set(
            'performance',
            milestoneLessonPerformance.get('performance')
          );
        }
        lesson.set('has-activity', true);
      }
    });
  },

  setMilestoneCollectionPerformanceData(
    collections,
    lessonCollectionsPerformance
  ) {
    lessonCollectionsPerformance.forEach(lessonCollectionPerformance => {
      let collectionId = lessonCollectionPerformance.get('collectionId');
      let collection = collections.findBy('id', collectionId);
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
    let milestoneId = selectedMilestone.get('milestone_id');
    let element = `#milestone-${milestoneId}`;
    let courseId = component.get('courseId');
    let showPerformance = component.get('showPerformance');
    let locateLastPlayedItem = component.get('locateLastPlayedItem');
    if (selectedMilestone.get('isActive')) {
      component.$(element).slideUp(400, function() {
        selectedMilestone.set('isActive', false);
      });
    } else {
      component.$(element).slideDown(400, function() {
        component.get('milestones').forEach(milestone => {
          if (milestone.get('isActive')) {
            let milestoneId = milestone.get('milestone_id');
            let element = `#milestone-${milestoneId}`;
            component.$(element).hide();
            milestone.set('isActive', false);
          }
        });
        selectedMilestone.set('isActive', true);
      });
    }

    if (!selectedMilestone.get('hasLessonFetched')) {
      component
        .get('courseService')
        .getCourseMilestoneLessons(courseId, milestoneId)
        .then(lessons => {
          if (!component.isDestroyed) {
            selectedMilestone.set('lessons', lessons);
            if (showPerformance) {
              component.fetchMilestoneLessonsPerformance(milestoneId, lessons);
            }
            selectedMilestone.set('hasLessonFetched', true);
            let userCurrentLocation = component.get('userCurrentLocation');
            if (locateLastPlayedItem && userCurrentLocation) {
              let lessonId = userCurrentLocation.get('lessonId');
              let selectedLesson = lessons.findBy('lesson_id', lessonId);
              let lessonIndex = lessons.indexOf(selectedLesson);
              if (selectedLesson) {
                Ember.run.later(function() {
                  component.handleMilestoneLessonToggle(
                    selectedMilestone,
                    lessons,
                    selectedLesson,
                    lessonIndex
                  );
                }, 500);
              }
            }
          }
        });
    }
  },

  /**
   * Study material collection performance
   */

  fetchCollectionPerformance(lesson, collections) {
    let component = this;
    let classId = component.get('classId');
    let courseId = component.get('courseId');
    let unitId = lesson.get('unit_id');
    let lessonId = lesson.get('lesson_id');
    let performanceService = component.get('performanceService');

    Ember.RSVP.hash({
      performanceAssessment: performanceService.getCollectionsPerformanceByLessonId(
        classId,
        courseId,
        unitId,
        lessonId,
        CONTENT_TYPES.ASSESSMENT,
        undefined
      ),
      performanceCollection: performanceService.getCollectionsPerformanceByLessonId(
        classId,
        courseId,
        unitId,
        lessonId,
        CONTENT_TYPES.COLLECTION,
        undefined
      )
    }).then(({ performanceAssessment, performanceCollection }) => {
      let collectionsPerformance = performanceAssessment.concat(
        performanceCollection
      );
      collections.forEach((collection, index) => {
        let collectionPerformances = collectionsPerformance.filterBy(
          'collectionId',
          collection.content_id
        );
        collection.performance = Ember.Object.create({
          scoreInPercentage: null,
          score: null,
          timeSpent: null,
          hasStarted: false
        });
        let isAssessment =
          collection.content_format === CONTENT_TYPES.ASSESSMENT ||
          collection.content_format === CONTENT_TYPES.EXTERNAL_ASSESSMENT;
        let isOfflineActivity =
          collection.content_format === CONTENT_TYPES.OFFLINE_ACTIVITY;
        collection.isAssessment = isAssessment;
        collection.isOfflineActivity = isOfflineActivity;
        collection.sequence = index + 1;
        if (collectionPerformances.length) {
          let numberOfSubmissions = component.findNumberOfStudentsByItem(
            collectionPerformances,
            'collectionId',
            collection.content_id,
            'userUid'
          );
          collection.numberOfSubmissions = numberOfSubmissions;
          let collectionAggregatedScore =
            isAssessment || isOfflineActivity
              ? aggregateMilestonePerformanceScore(collectionPerformances)
              : null;
          let collectionAggregatedTimeSpent = aggregateMilestonePerformanceTimeSpent(
            collectionPerformances
          );
          collection.performance.scoreInPercentage = collectionAggregatedScore;

          collection.performance.score = collectionAggregatedScore;
          collection.performance.timeSpent = collectionAggregatedTimeSpent;
          collection.performance.hasStarted = true;
        }
      });
    });
  },

  handleMilestoneLessonToggle(milestone, lessons, selectedLesson, lessonIndex) {
    let component = this;
    let classId = component.get('classId');
    let unitId = selectedLesson.get('unit_id');
    let lessonId = selectedLesson.get('lesson_id');
    let milestoneId = milestone.get('milestone_id');
    let showPerformance = component.get('showPerformance');
    let element = `#milestone-lesson-${milestoneId}-${lessonId}-${lessonIndex}`;
    let courseId = component.get('courseId');
    let selectedLessonIndex = lessons.indexOf(selectedLesson);
    let prevLesson = lessons.objectAt(selectedLessonIndex + 1);
    let nextLesson = lessons.objectAt(selectedLessonIndex - 1);
    let componentEle = component.$(element);
    if (selectedLesson.get('isActive')) {
      if (componentEle) {
        componentEle.slideUp(400, function() {
          selectedLesson.set('isActive', false);
          if (nextLesson) {
            nextLesson.set('isNextActive', false);
          }
          if (prevLesson) {
            prevLesson.set('isPrevActive', false);
          }
        });
      }
    } else {
      if (componentEle) {
        componentEle.slideDown(400, function() {
          selectedLesson.set('isActive', true);
          if (nextLesson) {
            nextLesson.set('isNextActive', true);
          }
          if (prevLesson) {
            prevLesson.set('isPrevActive', true);
          }
        });
      }
    }
    if (!selectedLesson.get('hasLessonPlanFetched')) {
      component
        .get('courseMapService')
        .getLessonInfo(classId, courseId, unitId, lessonId, true)
        .then(lesson => {
          if (!component.isDestroyed) {
            let lessonPlan = lesson.get('lessonPlan');
            if (lessonPlan.sessions) {
              lessonPlan.sessions.forEach(session => {
                if (session.student_contents) {
                  if (showPerformance) {
                    component.fetchCollectionPerformance(
                      selectedLesson,
                      session.student_contents
                    );
                  }
                }
              });
            }
            selectedLesson.set('lessonPlans', lessonPlan);
            selectedLesson.set('hasLessonPlanFetched', true);
          }
        });
    }
  },

  /**
   * This Method is responsible for milestone display based on students class grade.
   * @return {Array}
   */
  renderMilestonesBasedOnStudentGradeRange(milestones) {
    let component = this;
    let milestoneData = Ember.A([]);
    let classGradeId = component.get('class.gradeCurrent');
    milestones.forEach(milestone => {
      let gradeId = milestone.get('grade_id');
      if (classGradeId === gradeId) {
        milestone.set('isClassGrade', true);
      }
      milestoneData.pushObject(milestone);
    });
    return milestoneData;
  },
  /**
   * Enables jumping to a specific milestone driven location
   * Location is provided with queryString paramter Location
   */
  navigateLocation() {
    const component = this;
    let rawCustomLocation = this.get('location');
    if (rawCustomLocation) {
      let customLocation = component.parserLocation(rawCustomLocation),
        userLocation = component.formatCustomLocationToUserLocation(
          customLocation
        );
      //Navigation basis is milestoneId if not present don't navigate
      if (userLocation && userLocation.milestoneId) {
        component.set('userCurrentLocation', userLocation);
        component.set('locateLastPlayedItem', userLocation);

        let selectedMilestone = component
          .get('milestones')
          .findBy('milestone_id', userLocation.milestoneId);

        //ToDo: Refactoring required to remove the Later based workaround, here as well as in other implementation
        Ember.run.later(function() {
          component.handleMilestoneToggle(selectedMilestone);

          if (component.get('showLocationReport') === 'assesmentreport') {
            Ember.run.later(function() {
              Ember.run.later(function() {
                let lessonO = selectedMilestone.lessons.findBy(
                    'lesson_id',
                    userLocation.lessonId
                  ),
                  collectionO = lessonO.collections.findBy(
                    'id',
                    userLocation.collectionId
                  );
                component.send(
                  'onOpenCollectionReport',
                  selectedMilestone,
                  lessonO,
                  collectionO
                );
                component.set('showLocationReport', null);
                window.history.pushState(
                  null,
                  null,
                  window.location.origin + window.location.pathname
                ); // reset to avoid refresh issues
              }, 8000);
            }, 500);
          }
        });
      }
    }
  },

  /**
   *
   * @param {object} customLocation
   */
  formatCustomLocationToUserLocation(customLocation) {
    //ToDo: Check if this is needed and reformat
    let serializedLocation = this.currentLocationSerializer.normalizeCurrentLocation(
      customLocation
    );
    serializedLocation.milestone_id = serializedLocation.milestoneId;
    return serializedLocation;
  },

  /**
   *
   * @param {string} customLocation : format 'unitId+lessonId+collectionId+milestoneId+currentItemType',
   */
  parserLocation(customLocation) {
    let locationArr = customLocation.split('+');
    return {
      unitId: locationArr[0],
      lessonId: locationArr[1],
      collectionId: locationArr[2],
      milestoneId: locationArr[3],
      type: locationArr[4]
    };
  },

  /**
   * Find number of unique  submissions
   * @return {Number}
   */
  findNumberOfStudentsByItem(source, sourceKey, sourceId, targetId) {
    let count = 0;
    let items = Ember.A([]);
    if (source) {
      items = source.filterBy(sourceKey, sourceId);
      if (items) {
        let ids = items.map(item => {
          return item.get(targetId);
        });
        ids = Array.from(new Set(ids));
        count = ids.length;
      }
    }
    return count;
  }
});
