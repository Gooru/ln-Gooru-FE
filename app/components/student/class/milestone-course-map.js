import Ember from 'ember';
import {
  ROLES,
  PLAYER_EVENT_SOURCE,
  CONTENT_TYPES
} from 'gooru-web/config/config';
import CurrentLocationSerializer from 'gooru-web/serializers/analytics/current-location';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['student-class-milestone-course-map'],

  classNameBindings: ['competencySummary:student-competency-summary'],

  // -------------------------------------------------------------------------
  // Dependencies

  location: null,

  currentLocationSerializer: null,

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

  /**
   * Rescope Service to perform rescope data operations
   */
  rescopeService: Ember.inject.service('api-sdk/rescope'),

  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyService: Ember.inject.service('api-sdk/taxonomy'),

  competencyService: Ember.inject.service('api-sdk/competency'),

  /**
   * @property {Boolean} isTeacher
   */
  isTeacher: Ember.computed.equal('session.role', 'teacher'),

  /**
   * @property {Boolean} isStudent
   */
  isStudent: Ember.computed.not('isTeacher'),

  // -------------------------------------------------------------------------
  // Observer
  onShowRescope: Ember.observer('showAllRescopedContent', function() {
    this.handleLastLessonPath();
    this.handleMileStonePath();
  }),

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
   * Computed Property to extract framework code from settings
   * @return {String}
   */
  fwCode: Ember.computed('class', function() {
    let preference = this.get('class.preference');
    return preference != null ? preference.get('framework') : null;
  }),

  /**
   * @property {String} subjectCode
   * Property for class preference subject code
   */
  subjectCode: Ember.computed('class', function() {
    let preference = this.get('class.preference');
    return preference != null ? preference.get('subject') : null;
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
   * Maintains the state of show all rescope content or not.
   * @type {Boolean}
   */
  showAllRescopedContent: false,

  /**
   * Maintains the student Id, by default this will be NULL
   * @type {String}
   */
  studentId: null,

  /**
   * Property will decided to show the play button or not
   * @type {Boolean}
   */
  allowToPlay: true,

  /**
   * Maintains the value of show full course button toggle or not.
   * @type {Boolean}
   */
  showToggleButtonToViewFullCourse: false,

  /**
   * @property {Object} competencySummary
   * Property for student destination based competency summary data
   */
  competencySummary: null,

  /**
   * Maintains the userId of milestone display view
   * @type {String}
   */
  userId: null,

  // -------------------------------------------------------------------------
  // Actions

  init: function() {
    this._super(...arguments);

    this.set(
      'currentLocationSerializer',
      CurrentLocationSerializer.create(Ember.getOwner(this).ownerInjection())
    );
  },

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

    /**
     * Open the player with the specific collection/assessment
     *
     * @function actions:studyPlayer
     * @param {string} milestone - Identifier for a milestone
     * @param {string} unitId - Identifier for a unit
     * @param {string} lessonId - Identifier for lesson
     * @param {string} item - collection, assessment, lesson or resource
     */
    studyPlayer: function(type, milestoneId, unitId, lessonId, item) {
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
        item,
        milestoneId
      );
    },

    //Action triggered when click on milestone performance
    onShowMilestoneReport(milestone) {
      const component = this;
      component.set('selectedMilestone', milestone);
      component.set(
        'activeMilestoneIndex',
        component.get('milestones').indexOf(milestone)
      );
      component.set('isShowMilestoneReport', true);
    },

    //Action triggered when click on collection performance
    onShowStudentMilestoneCollectionReport(lesson, collection) {
      const component = this;
      let userUid = component.get('userId');
      let studentCollectionReportContext = {
        userId: userUid,
        classId: component.get('classId'),
        courseId: component.get('courseId'),
        unitId: lesson.get('unit_id'),
        lessonId: lesson.get('lesson_id'),
        collectionId: collection.get('id'),
        type: collection.get('format'),
        lesson,
        isStudent: component.get('isStudent'),
        isTeacher: component.get('isTeacher'),
        collection
      };
      let reportType = collection.get('format');
      if (reportType === CONTENT_TYPES.EXTERNAL_ASSESSMENT) {
        component.set('isShowStudentExternalAssessmentReport', true);
      } else if (reportType === CONTENT_TYPES.OFFLINE_ACTIVITY) {
        studentCollectionReportContext.performance = {
          score: collection.get('performance.scoreInPercentage'),
          timeSpent: collection.get('performance.timeSpent')
        };
        component.set('isShowStudentOfflineActivityReport', true);
      } else {
        component.set('isShowStudentCollectionReport', true);
      }
      component.set(
        'studentCollectionReportContext',
        studentCollectionReportContext
      );
    },

    /**
     * This action is responsible for toggle the property of @property showAllRescopedContent
     */
    onToggleRescope() {
      this.toggleProperty('showAllRescopedContent');
    },

    //Action triggered when click on the student competencies progress graph
    onClickProgressChart() {
      this.get('router').transitionTo(
        'student.class.student-learner-proficiency',
        {
          queryParams: {
            userId: this.get('session.userId'),
            classId: this.get('classId'),
            courseId: this.get('courseId'),
            role: ROLES.STUDENT
          }
        }
      );
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * Function to triggered once when the component element is first rendered.
   */
  didInsertElement() {
    const userId = this.get('studentId')
      ? this.get('studentId')
      : this.get('session.userId');
    this.set('userId', userId);
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
    component.set('isLoading', true);
    let showPerformance = component.get('showPerformance');
    let locateLastPlayedItem = component.get('locateLastPlayedItem');
    let taxonomyService = component.get('taxonomyService');
    let filters = {
      subject: component.get('class.preference.subject')
    };
    let fwkCode = component.get('class.preference.framework');
    if (fwkCode) {
      filters.fw_code = fwkCode;
    }

    Ember.RSVP.hash({
      rescopedContents: component.getRescopedContents(),
      grades: taxonomyService.fetchGradesBySubject(filters),
      competencySummary: component.get('isStudent')
        ? component.fetchStudentCompetencySummary()
        : null
    }).then(({ rescopedContents, grades, competencySummary }) => {
      if (!component.isDestroyed) {
        component.set('competencySummary', competencySummary);
        let milestones = component.get('milestones');
        let milestoneData = component.renderMilestonesBasedOnStudentGradeRange(
          grades,
          milestones
        );
        component.set('rescopedContents', rescopedContents);
        component.set('milestones', milestoneData);
        if (showPerformance) {
          component.fetchMilestonePerformance();
        }
        let customLocationPresent = component.get('location');
        if (customLocationPresent) {
          component.navigateLocation();
        } else if (locateLastPlayedItem) {
          component.identifyUserLocationAndLocate();
        }
        component.set('isLoading', false);
      }
    });
  },

  fetchMilestonePerformance() {
    let component = this;
    let performanceService = component.get('performanceService');
    let classId = component.get('classId');
    let courseId = component.get('courseId');
    let fwCode = component.get('fwCode');
    let userUid = component.get('userId');
    let milestones = component.get('milestones');
    performanceService
      .getPerformanceForMilestones(
        classId,
        courseId,
        'assessment',
        userUid,
        fwCode
      )
      .then(milestonesPerformance => {
        milestones.map(milestone => {
          let milestonePerformanceData = Ember.Object.create({
            hasStarted: false,
            completedCount: 0,
            totalCount: 0,
            completedInPrecentage: 0,
            scoreInPercentage: null,
            timeSpent: null
          });
          let milestonePerformance = milestonesPerformance.findBy(
            'milestoneId',
            milestone.get('milestone_id')
          );
          if (milestonePerformance) {
            milestonePerformance = milestonePerformance.get('performance');
            milestonePerformanceData.set(
              'scoreInPercentage',
              milestonePerformance.get('scoreInPercentage')
            );
            milestonePerformanceData.set(
              'timeSpent',
              milestonePerformance.get('timeSpent')
            );
            milestonePerformanceData.set(
              'completedInPrecentage',
              milestonePerformance.get('completedInPrecentage')
            );
            milestonePerformanceData.set(
              'completedCount',
              milestonePerformance.get('completedCount')
            );
            milestonePerformanceData.set(
              'totalCount',
              milestonePerformance.get('totalCount')
            );
            milestonePerformanceData.set(
              'hasStarted',
              milestonePerformance.get('scoreInPercentage') !== null &&
                milestonePerformance.get('scoreInPercentage') >= 0
            );
          }
          milestone.set('performance', milestonePerformanceData);
        });
      });
  },

  fetchMilestoneLessonsPerformance(milestoneId, lessons) {
    let component = this;
    let performanceService = component.get('performanceService');
    let classId = component.get('classId');
    let courseId = component.get('courseId');
    let fwCode = component.get('fwCode');
    let userUid = component.get('userId');

    Ember.RSVP.hash({
      milestoneAssessmentLessonsPerformance: performanceService.getLessonsPerformanceByMilestoneId(
        classId,
        courseId,
        milestoneId,
        CONTENT_TYPES.ASSESSMENT,
        userUid,
        fwCode
      ),
      milestoneCollectionLessonsPerformance: performanceService.getLessonsPerformanceByMilestoneId(
        classId,
        courseId,
        milestoneId,
        CONTENT_TYPES.COLLECTION,
        userUid,
        fwCode
      )
    }).then(
      ({
        milestoneAssessmentLessonsPerformance,
        milestoneCollectionLessonsPerformance
      }) => {
        if (!component.isDestroyed) {
          component.setMilestoneLessonPerformanceData(
            CONTENT_TYPES.COLLECTION,
            lessons,
            milestoneCollectionLessonsPerformance
          );
          component.setMilestoneLessonPerformanceData(
            CONTENT_TYPES.ASSESSMENT,
            lessons,
            milestoneAssessmentLessonsPerformance
          );
        }
      }
    );
  },

  /**
   * @function fetchStudentCompetencySummary
   * Method to fetch student competency summary
   */
  fetchStudentCompetencySummary() {
    const component = this;
    const userId = component.get('userId');
    const classId = component.get('classId');
    const courseId = component.get('courseId');
    const subjectCode = component.get('subjectCode');
    const requestBody = {
      userId,
      classId,
      courseId,
      subjectCode
    };
    return component
      .get('competencyService')
      .fetchStudentCompetencySummary(requestBody);
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
        if (type === 'assessment') {
          lesson.set(
            'performance',
            milestoneLessonPerformance.get('performance')
          );
        }
        lesson.set('has-activity', true);
      }
    });
  },

  fetchCollectionPerformance(lesson, collections) {
    let component = this;
    let userUid = component.get('userId');
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
    component.set('selectedMilestone', selectedMilestone);
    let element = `#milestone-${milestoneId}`;
    let courseId = component.get('courseId');
    let nextMilestone = component
      .get('milestones')
      .objectAt(selectedMilestone.get('milestoneIndex'));
    let showPerformance = component.get('showPerformance');
    let locateLastPlayedItem = component.get('locateLastPlayedItem');
    if (selectedMilestone.get('isActive')) {
      component.$(element).slideUp(400, function() {
        selectedMilestone.set('isActive', false);
        if (nextMilestone) {
          nextMilestone.set('prevMilestoneIsActive', false);
        }
      });
    } else {
      component.$(element).slideDown(400, function() {
        component.get('milestones').forEach(milestone => {
          milestone.set('prevMilestoneIsActive', false);
          if (milestone.get('isActive')) {
            let milestoneId = milestone.get('milestone_id');
            let element = `#milestone-${milestoneId}`;
            component.$(element).hide();
            milestone.set('isActive', false);
          }
        });
        selectedMilestone.set('isActive', true);
        if (nextMilestone) {
          nextMilestone.set('prevMilestoneIsActive', true);
        }
        let rescopedLessonContents = component.get('rescopedContents.lessons');
        if (!selectedMilestone.get('hasLessonFetched')) {
          component
            .get('courseService')
            .getCourseMilestoneLessons(courseId, milestoneId)
            .then(lessons => {
              if (!component.isDestroyed) {
                if (rescopedLessonContents) {
                  rescopedLessonContents.forEach(rescopedLessonId => {
                    let lesson = lessons.findBy('lesson_id', rescopedLessonId);
                    if (lesson) {
                      lesson.set('rescope', true);
                    }
                  });
                }
                let lessonsSize = lessons.length;
                let lessonsRescopeSize = lessons.filterBy('rescope', true)
                  .length;
                if (lessonsRescopeSize === lessonsSize) {
                  selectedMilestone.set('rescope', true);
                }

                selectedMilestone.set('lessons', lessons);
                if (showPerformance) {
                  component.fetchMilestoneLessonsPerformance(
                    milestoneId,
                    lessons
                  );
                }
                selectedMilestone.set('hasLessonFetched', true);
                component.handleMileStonePath();
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
      });
    }
  },

  handleMileStonePath() {
    const component = this;
    let selectedMilestone = component.get('selectedMilestone');
    if (selectedMilestone) {
      let milestones = component.get('milestones');
      let nextMilestone = milestones.objectAt(
        selectedMilestone.get('milestoneIndex')
      );
      let lessons = selectedMilestone.get('lessons');
      const nonRescopedLessons = lessons.filter(lesson => {
        if (!lesson.get('rescope')) {
          return lesson;
        }
      });
      let showMilestoneLessons =
        !nonRescopedLessons.length > 0 &&
        !component.get('showAllRescopedContent');
      if (nextMilestone) {
        nextMilestone.set('prevMileStoneShowLessons', showMilestoneLessons);
      }
      selectedMilestone.set('showLessons', showMilestoneLessons);
    }
  },

  handleLastLessonPath() {
    const component = this;
    let lessonIndex;
    let lessonSize;
    let lastLesson;
    let selectedLesson = component.get('selectedLesson');
    let milestone = component.get('selectedMilestone');
    if (milestone && selectedLesson) {
      let lessons = milestone.get('lessons');
      let collections = selectedLesson.get('collections');
      let nextMilestone = component
        .get('milestones')
        .objectAt(milestone.get('milestoneIndex'));
      const nonRescopedLessons = lessons.filter(lesson => {
        if (!lesson.get('rescope')) {
          return lesson;
        }
      });

      if (component.get('showAllRescopedContent')) {
        lessonIndex = lessons.indexOf(selectedLesson);
        lessonSize = lessons.length;
        lastLesson = lessons.objectAt(lessonIndex);
      } else {
        lessonIndex = nonRescopedLessons.indexOf(selectedLesson);
        lessonSize = nonRescopedLessons.length;
        lastLesson = nonRescopedLessons.objectAt(lessonIndex);
      }

      const isLastLesson = lessonIndex === lessonSize - 1;
      if (isLastLesson && lastLesson) {
        const isLastLessonActive = isLastLesson && lastLesson.get('isActive');
        if (nextMilestone) {
          nextMilestone.set(
            'prevMilestoneOfLastLessonIsActive',
            isLastLessonActive
          );
        }
        if (isLastLessonActive) {
          let lastCollection = collections.objectAt(collections.length - 1);
          if (nextMilestone) {
            nextMilestone.set(
              'prevMilestoneOfLastCollectionPath',
              lastCollection.get('pathType')
            );
          }
        }
      }
    }
  },

  handleMilestoneLessonToggle(milestone, lessons, selectedLesson, lessonIndex) {
    let component = this;
    let classId = component.get('classId');
    let unitId = selectedLesson.get('unit_id');
    let lessonId = selectedLesson.get('lesson_id');
    let milestoneId = milestone.get('milestone_id');
    let element = `#milestone-lesson-${milestoneId}-${lessonId}-${lessonIndex}`;
    let showPerformance = component.get('showPerformance');
    let locateLastPlayedItem = component.get('locateLastPlayedItem');
    let courseId = component.get('courseId');
    component.set('selectedLesson', selectedLesson);
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
    if (!selectedLesson.get('hasCollectionFetched')) {
      let userId = component.get('isTeacher')
        ? component.get('userId')
        : undefined;
      component
        .get('courseMapService')
        .getLessonInfo(classId, courseId, unitId, lessonId, true, userId)
        .then(lesson => {
          if (!component.isDestroyed) {
            let collections = lesson.get('children');
            let rescopeCollectionIds = component.getRescopeCollectionIds();
            rescopeCollectionIds.forEach(rescopeCollectionId => {
              let collection = collections.findBy('id', rescopeCollectionId);
              if (collection) {
                collection.set('rescope', true);
              }
            });
            component.updateSuggestionDetails(
              lessons,
              selectedLesson,
              collections
            );
            selectedLesson.set('collections', collections);
            selectedLesson.set('hasCollectionFetched', true);
            Ember.run.later(function() {
              component.handleLastLessonPath();
            }, 500);
            let userCurrentLocation = component.get('userCurrentLocation');
            if (locateLastPlayedItem && userCurrentLocation) {
              let collectionId = userCurrentLocation.get('collectionId');
              let selectedCollection = collections.findBy('id', collectionId);
              if (selectedCollection) {
                selectedCollection.set('last-played-collection', true);
              }
            }
            if (showPerformance) {
              component.fetchCollectionPerformance(selectedLesson, collections);
            }
          }
        });
    } else {
      Ember.run.later(function() {
        component.handleLastLessonPath();
      }, 500);
    }
  },

  updateSuggestionDetails(lessons, selectedLesson, collections) {
    let collectionSuggestions = collections.filter(collection => {
      let pathType = collection.get('pathType');
      return pathType === 'system' || pathType === 'teacher';
    });
    if (collectionSuggestions.length > 0) {
      collectionSuggestions.forEach(collectionSuggestion => {
        let indexOfCollection = collections.indexOf(collectionSuggestion);
        if (indexOfCollection === 0) {
          selectedLesson.set(
            'firstCollHasSuggsType',
            collectionSuggestion.get('pathType')
          );
        }
        if (collections.length === indexOfCollection + 1) {
          let selectedLessonIndex = lessons.indexOf(selectedLesson);
          let nextLesson = lessons.objectAt(selectedLessonIndex + 1);
          if (nextLesson) {
            nextLesson.set(
              'prevLeCollHasSuggsType',
              collectionSuggestion.get('pathType')
            );
          }
        }
        let prevCollection = collections.objectAt(indexOfCollection - 1);
        if (prevCollection) {
          if (prevCollection.get('pathId') > 0) {
            collectionSuggestion.set(
              'prevCollHasSuggsType',
              prevCollection.get('pathType')
            );
          }
          prevCollection.set(
            'nextCollHasSuggsType',
            collectionSuggestion.get('pathType')
          );
        }
        let nextCollection = collections.objectAt(indexOfCollection + 1);
        if (nextCollection) {
          if (nextCollection.get('pathId') > 0) {
            collectionSuggestion.set(
              'nextCollHasSuggsType',
              nextCollection.get('pathType')
            );
          }
          nextCollection.set(
            'prevCollHasSuggsType',
            collectionSuggestion.get('pathType')
          );
        }
      });
    }
  },

  identifyUserLocationAndLocate() {
    let component = this;
    let classId = component.get('classId');
    let courseId = component.get('courseId');
    let userId = component.get('userId');
    let fwCode = component.get('fwCode');
    let locationQueryParam = {
      courseId,
      fwCode
    };
    component
      .get('analyticsService')
      .getUserCurrentLocation(classId, userId, locationQueryParam)
      .then(userCurrentLocation => {
        if (!component.isDestroyed) {
          component.set('userCurrentLocation', userCurrentLocation);
          if (userCurrentLocation) {
            let milestoneId = userCurrentLocation.get('milestoneId');
            let selectedMilestone = component
              .get('milestones')
              .findBy('milestone_id', milestoneId);
            if (selectedMilestone) {
              component.handleMilestoneToggle(selectedMilestone);
            }
          }
        }
      });
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

      component.set('userCurrentLocation', userLocation);
      component.set('locateLastPlayedItem', userLocation);

      let selectedMilestone = component
        .get('milestones')
        .findBy('milestone_id', userLocation.milestoneId);

      //ToDo: Refactoring required to remove the Later based workaround, here as well as in other implementation
      Ember.run.later(function() {
        component.handleMilestoneToggle(selectedMilestone);

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
              'onShowStudentMilestoneCollectionReport',
              lessonO,
              collectionO
            );
          }, 8000);
        }, 500);
      });
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
   * This Method is responsible for milestone display based on students class grade.
   * @return {Array}
   */
  renderMilestonesBasedOnStudentGradeRange(grades, milestones) {
    let component = this;
    let gradeBounds = component.get('class.memberGradeBounds');
    let userUid = component.get('userId');
    let gradeBound = gradeBounds.findBy(userUid);
    let milestoneData = Ember.A([]);
    let studentGradeBound = Ember.Object.create(gradeBound.get(userUid));
    let classGradeId = component.get('class.gradeCurrent');
    component.set('studentGradeBound', studentGradeBound);
    component.set('grades', grades);
    let classGradeLowerBound = component.get('class.gradeLowerBound');
    let gradeUpperBound = studentGradeBound.get('grade_upper_bound');
    let startGrade = grades.findBy('id', classGradeLowerBound);
    let startGradeIndex = grades.indexOf(startGrade);
    let endGrade = grades.findBy('id', gradeUpperBound);
    let endGradeIndex = grades.indexOf(endGrade);
    let studentGrades = grades.slice(startGradeIndex, endGradeIndex + 1);

    milestones.forEach((milestone, index) => {
      let gradeId = milestone.get('grade_id');
      milestone.set('hasLessonFetched', false);
      milestone.set('prevMilestoneIsActive', false);
      milestone.set('isActive', false);
      let grade = studentGrades.findBy('id', gradeId);
      if (grade) {
        if (gradeId === classGradeId) {
          milestone.set('isClassGrade', true);
        }
        milestone.set('milestoneIndex', index + 1);
        milestoneData.pushObject(milestone);
      }
    });
    return milestoneData;
  },

  /**
   * Merge all  the collection content family, rescoped ids
   * @type {Array}
   */
  getRescopeCollectionIds() {
    let component = this;
    let collectionIds = Ember.A([]);
    let rescopedContents = component.get('rescopedContents');
    if (rescopedContents) {
      let rescopedCollectionContents = rescopedContents.get('collections');
      let rescopedCollectionsExternalContents = rescopedContents.get(
        'collectionsExternal'
      );
      let rescopedAssessmentsExternalContents = rescopedContents.get(
        'assessmentsExternal'
      );
      let rescopedAssessmentsContents = rescopedContents.get('assessments');
      let rescopedOfflineActivityContents = rescopedContents.get(
        'offlineActivities'
      );
      collectionIds.pushObjects(rescopedCollectionContents);
      collectionIds.pushObjects(rescopedAssessmentsContents);
      collectionIds.pushObjects(rescopedCollectionsExternalContents);
      collectionIds.pushObjects(rescopedAssessmentsExternalContents);
      collectionIds.pushObjects(rescopedOfflineActivityContents);
    }
    return collectionIds;
  },

  /**
   * @function getRescopedContents
   * Method to get rescoped contents
   */
  getRescopedContents() {
    let component = this;
    let rescopedContents = component.get('rescopedContents');
    if (rescopedContents) {
      return Ember.RSVP.resolve(rescopedContents);
    } else {
      let classId = component.get('classId');
      let courseId = component.get('courseId');
      let filter = {
        classId,
        courseId
      };
      let studentId = component.get('userId');
      let isTeacher = component.get('isTeacher');
      if (isTeacher) {
        filter.userId = studentId;
      }
      return Ember.RSVP.hash({
        rescopedContents: component
          .get('rescopeService')
          .getSkippedContents(filter)
      })
        .then(rescopedContents => {
          return rescopedContents.rescopedContents;
        })
        .catch(function() {
          return null;
        });
    }
  },

  /**
   * Navigates to collection
   * @param {string} classId
   * @param {string} courseId
   * @param {string} unitId
   * @param {string} lessonId
   * @param {Collection} collection
   * @param {string} milestoneId
   */
  startCollectionStudyPlayer: function(
    classId,
    courseId,
    unitId,
    lessonId,
    collection,
    milestoneId
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
      milestoneId,
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
          pathType,
          milestoneId
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
          pathType,
          milestoneId
        );
    }
    suggestionPromise.then(() =>
      component.get('router').transitionTo('study-player', courseId, {
        queryParams
      })
    );
  }
});
