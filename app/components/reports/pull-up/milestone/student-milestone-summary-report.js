import Ember from 'ember';
import { aggregateMilestonePerformanceScore } from 'gooru-web/utils/performance-data';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['milestone-report', 'student-milestone-summary-report'],

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:api-sdk/performance
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * @requires service:api-sdk/course
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @requires service:session
   */
  session: Ember.inject.service('session'),

  /**
   * @requires service:api-sdk/rescope
   */
  rescopeService: Ember.inject.service('api-sdk/rescope'),

  /**
   * @requires service:i18n
   */
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    const component = this;
    component.loadMilestoneReportData();
    if (component.get('isTeacher')) {
      component.fetchMilestones();
    }
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    //Action triggered when switch between next/previous milestone
    onSlideMilestone(direction) {
      const component = this;
      let activeMilestoneIndex = component.get('activeMilestoneIndex');
      activeMilestoneIndex =
        direction === 'left'
          ? activeMilestoneIndex - 1
          : activeMilestoneIndex + 1;
      component.set('activeMilestoneIndex', activeMilestoneIndex);
      component.set(
        'activeMilestone',
        component.get('milestones').objectAt(activeMilestoneIndex)
      );
      component.loadMilestoneReportData();
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {UUID} classId
   */
  classId: Ember.computed.alias('class.id'),

  /**
   * @property {UUID} courseId
   */
  courseId: Ember.computed.alias('class.courseId'),

  /**
   * @property {UUID} milestoneId
   */
  milestoneId: Ember.computed.alias('activeMilestone.milestone_id'),

  /**
   * @property {String} frameworkCode
   */
  frameworkCode: Ember.computed.alias('class.preference.framework'),

  /**
   * @property {Array} milestones
   */
  milestones: Ember.A([]),

  /**
   * @property {Object} activeMilestone
   */
  activeMilestone: {},

  /**
   * @property {Array} milestoneLessons
   */
  milestoneLessons: Ember.A([]),

  /**
   * @property {Boolean} isMilestoneNotStarted
   */
  isMilestoneNotStarted: Ember.computed(
    'activeMilestone.performance',
    function() {
      return !this.get('activeMilestone.performance');
    }
  ),

  /**
   * @property {Number} activeMilestoneIndex
   */
  activeMilestoneIndex: Ember.computed(function() {
    const component = this;
    const activeMilestone = component.get('activeMilestone');
    const milestones = component.get('milestones');
    return milestones.indexOf(activeMilestone);
  }),

  /**
   * @property {String} placeholderText
   */
  placeholderText: Ember.computed('activeMilestone.performance', function() {
    const component = this;
    const milestonePerformance = component.get('activeMilestone.performance');
    let placeholderText = component
      .get('i18n')
      .t('profile.proficiency.not-started').string;
    if (milestonePerformance) {
      const completedCount = milestonePerformance.get('completedCount');
      const totalCount = milestonePerformance.get('totalCount');
      placeholderText =
        completedCount || totalCount
          ? completedCount === totalCount
            ? `${component.get('i18n').t('common.completed').string}!`
            : `${completedCount}/${totalCount} ${component
              .get('i18n')
              .t('common.lessonObj.zero').string}`
          : null;
    }
    return placeholderText;
  }),

  /**
   * @property {Boolean} isSlideLeftDisabled
   */
  isSlideLeftDisabled: Ember.computed.equal('activeMilestoneIndex', 0),

  /**
   * @property {Boolean} isSlideRightDisabled
   */
  isSlideRightDisabled: Ember.computed(
    'activeMilestoneIndex',
    'milestones',
    function() {
      const component = this;
      return (
        component.get('activeMilestoneIndex') ===
        component.get('milestones.length') - 1
      );
    }
  ),

  /**
   * @property {Array} rescopedCollectionIds
   */
  rescopedCollectionIds: Ember.A([]),

  /**
   * @property {Object} rescopedContents
   */
  rescopedContents: null,

  /**
   * @property {Boolean} isDisableMilestoneSlider
   */
  isDisableMilestoneSlider: Ember.computed.equal('milestones.length', 0),

  /**
   * @property {Boolean} isTeacher
   */
  isTeacher: false,

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function loadMilestoneReportData
   */
  loadMilestoneReportData() {
    const component = this;
    component.set('isLoading', true);
    let rescopedContents = component.get('rescopedContents');
    return Ember.RSVP
      .hash({
        milestoneLessons: component.fetchMilestoneLessons(),
        rescopedContents: rescopedContents || component.fetchRescopedContents()
      })
      .then(hash => {
        if (!component.isDestroyed) {
          component.set('rescopedContents', hash.rescopedContents);
          component.set('milestoneLessons', hash.milestoneLessons);
          component.loadMilestoneReportPerformanceData();
          component.parseRescopedContents();
          component.set('isLoading', false);
        }
      });
  },

  /**
   * @function loadMilestoneReportPerformanceData
   */
  loadMilestoneReportPerformanceData() {
    const component = this;
    if (
      component.get('activeMilestone.performance') ||
      component.get('isTeacher')
    ) {
      component.loadMilestonePerformanceScore();
      component.loadMilestonePerformanceTimespent();
    }
  },

  /**
   * @function loadMilestonePerformanceScore
   */
  loadMilestonePerformanceScore() {
    const component = this;
    const collectionType = 'assessment';
    component
      .fetchMilestonePerformance(collectionType)
      .then(function(milestoneLessonsPerformance) {
        component.parseLessonsPerformanceScore(milestoneLessonsPerformance);
      });
  },

  /**
   * @function loadMilestonePerformanceTimespent
   */
  loadMilestonePerformanceTimespent() {
    const component = this;
    const collectionType = 'collection';
    component
      .fetchMilestonePerformance(collectionType)
      .then(function(milestoneLessonsPerformance) {
        component.parseLessonsPerformanceTimespent(milestoneLessonsPerformance);
      });
  },

  /**
   * @function fetchMilestones
   */
  fetchMilestones() {
    const component = this;
    const frameworkCode = component.get('frameworkCode');
    const courseId = component.get('courseId');
    return Ember.RSVP
      .hash({
        milestones: component
          .get('courseService')
          .getCourseMilestones(courseId, frameworkCode)
      })
      .then(({ milestones }) => {
        if (!component.isDestroyed) {
          component.set(
            'milestones',
            component.renderMilestonesBasedOnStudentGradeRange(milestones)
          );
        }
      });
  },

  /**
   * @function fetchMilestonePerformance
   */
  fetchMilestonePerformance(collectionType) {
    const component = this;
    const performanceService = component.get('performanceService');
    const classId = component.get('classId');
    const courseId = component.get('courseId');
    const milestoneId = component.get('milestoneId');
    const userId = component.get('userId');
    const frameworkCode = component.get('frameworkCode');
    return performanceService.getLessonsPerformanceByMilestoneId(
      classId,
      courseId,
      milestoneId,
      collectionType,
      userId,
      frameworkCode
    );
  },

  /**
   * @function fetchMilestoneLessons
   */
  fetchMilestoneLessons() {
    const component = this;
    const courseService = component.get('courseService');
    const courseId = component.get('courseId');
    const milestoneId = component.get('milestoneId');
    return courseService.getCourseMilestoneLessons(courseId, milestoneId);
  },

  /**
   * @function fetchRescopedContents
   * Method to get rescoped contents
   */
  fetchRescopedContents() {
    let component = this;
    let classId = component.get('classId');
    let courseId = component.get('courseId');
    return Ember.RSVP
      .hash({
        rescopedContents: component.get('rescopeService').getSkippedContents({
          classId,
          courseId
        })
      })
      .then(({ rescopedContents }) => {
        return rescopedContents;
      })
      .catch(function() {
        return null;
      });
  },

  /**
   * @function parseLessonsPerformanceScore
   */
  parseLessonsPerformanceScore(lessonsPerformance) {
    const component = this;
    let lessons = component.get('milestoneLessons');
    if (
      lessonsPerformance &&
      lessonsPerformance.length &&
      !component.isDestroyed
    ) {
      lessonsPerformance.map(lessonPerformance => {
        let lessonData = lessons.findBy(
          'lesson_id',
          lessonPerformance.get('lessonId')
        );
        lessonData.set('performance', lessonPerformance.get('performance'));
      });
      if (component.get('isTeacher')) {
        let activeMilestone = component.get('activeMilestone');
        let milestonePerformanceScore = aggregateMilestonePerformanceScore(
          lessonsPerformance
        );
        if (activeMilestone.get('performance')) {
          activeMilestone.set('performance.score', milestonePerformanceScore);
          activeMilestone.set(
            'performance.scoreInPercentage',
            milestonePerformanceScore
          );
        } else {
          activeMilestone.set(
            'performance',
            Ember.Object.create({
              score: milestonePerformanceScore,
              scoreInPercentage: milestonePerformanceScore
            })
          );
        }
      }
    }
  },

  /**
   * @function parseLessonsPerformanceTimespent
   */
  parseLessonsPerformanceTimespent(lessonsPerformance) {
    const component = this;
    let lessons = component.get('milestoneLessons');
    let milestoneTimespent = 0;
    if (
      lessonsPerformance &&
      lessonsPerformance.length &&
      !component.isDestroyed
    ) {
      lessonsPerformance.map(lessonPerformance => {
        let lessonTimespent = lessonPerformance.get('performance.timeSpent');
        let lessonData = lessons.findBy(
          'lesson_id',
          lessonPerformance.get('lessonId')
        );
        if (lessonData.get('performance')) {
          lessonData.set('performance.timeSpent', lessonTimespent);
        } else {
          lessonData.set(
            'performance',
            Ember.Object.create({ timeSpent: lessonTimespent })
          );
        }
        milestoneTimespent += lessonTimespent;
      });
    }
    if (!component.isDestroyed) {
      let activeMilestone = component.get('activeMilestone');
      if (activeMilestone.get('performance')) {
        activeMilestone.set('performance.timeSpent', milestoneTimespent);
      } else {
        activeMilestone.set(
          'performance',
          Ember.Object.create({
            timeSpent: milestoneTimespent
          })
        );
      }
    }
  },

  /**
   * @function parseRescopedContents
   */
  parseRescopedContents() {
    const component = this;
    let rescopedContents = component.get('rescopedContents');
    if (rescopedContents) {
      let milestoneLessons = component.get('milestoneLessons');
      let rescopedLessons = rescopedContents.lessons;
      if (!component.isDestroyed && rescopedLessons) {
        rescopedLessons.map(rescopedLesson => {
          let milestoneLesson = milestoneLessons.findBy(
            'lesson_id',
            rescopedLesson
          );
          if (milestoneLesson) {
            milestoneLesson.set('isRescopedLesson', true);
          }
        });
        component.extractRescopedCollections();
      }
    }
  },

  /**
   * @function extractRescopedCollections
   * Method to extract all content type ids which is rescoped
   */
  extractRescopedCollections() {
    const component = this;
    let rescopedContents = component.get('rescopedContents');
    let rescopedCollectionIds = Ember.A([]);
    rescopedCollectionIds.pushObjects(rescopedContents.assessments);
    rescopedCollectionIds.pushObjects(rescopedContents.collections);
    rescopedCollectionIds.pushObjects(rescopedContents.assessmentsExternal);
    rescopedCollectionIds.pushObjects(rescopedContents.collectionsExternal);
    if (!component.isDestroyed) {
      component.set('rescopedCollectionIds', rescopedCollectionIds);
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
  }
});
