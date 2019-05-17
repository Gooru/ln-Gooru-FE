import Ember from 'ember';

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
        completedCount === totalCount
          ? `${component.get('i18n').t('common.completed').string}!`
          : `${completedCount}/${totalCount} ${component
            .get('i18n')
            .t('common.lessonObj.zero').string}`;
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
  isSlideRightDisabled: Ember.computed('activeMilestoneIndex', function() {
    const component = this;
    return (
      component.get('activeMilestoneIndex') ===
      component.get('milestones.length') - 1
    );
  }),

  /**
   * @property {Array} rescopedCollectionIds
   */
  rescopedCollectionIds: Ember.A([]),

  /**
   * @property {Object} rescopedContents
   */
  rescopedContents: null,

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function loadMilestoneReportData
   */
  loadMilestoneReportData() {
    const component = this;
    let activeMilestone = component.get('activeMilestone');
    let rescopedContents = component.get('rescopedContents');
    return Ember.RSVP
      .hash({
        milestoneLessons:
          activeMilestone.get('lessons') || component.fetchMilestoneLessons(),
        rescopedContents: rescopedContents || component.fetchRescopedContents()
      })
      .then(hash => {
        if (!component.isDestroyed) {
          component.set('rescopedContents', hash.rescopedContents);
          component.set('activeMilestone.lessons', hash.milestoneLessons);
          component.loadMilestoneReportPerformanceData();
          component.parseRescopedContents();
        }
      });
  },

  /**
   * @function loadMilestoneReportPerformanceData
   */
  loadMilestoneReportPerformanceData() {
    const component = this;
    if (component.get('activeMilestone.performance')) {
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
    return component.get('rescopeService').getSkippedContents({
      classId,
      courseId
    });
  },

  /**
   * @function parseLessonsPerformanceScore
   */
  parseLessonsPerformanceScore(lessonsPerformance) {
    const component = this;
    let milestone = component.get('activeMilestone');
    let lessons = milestone.get('lessons');
    if (lessonsPerformance) {
      if (!component.isDestroyed) {
        lessonsPerformance.map(lessonPerformance => {
          let lessonData = lessons.findBy(
            'lesson_id',
            lessonPerformance.get('lessonId')
          );
          lessonData.set('performance', lessonPerformance.get('performance'));
        });
      }
    }
  },

  /**
   * @function parseLessonsPerformanceTimespent
   */
  parseLessonsPerformanceTimespent(lessonsPerformance) {
    const component = this;
    let milestone = component.get('activeMilestone');
    let lessons = milestone.get('lessons');
    let milestoneTimespent = 0;
    if (lessonsPerformance) {
      if (!component.isDestroyed) {
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
    }
    if (!component.isDestroyed) {
      milestone.set('performance.timeSpent', milestoneTimespent);
    }
  },

  /**
   * @function parseRescopedContents
   */
  parseRescopedContents() {
    const component = this;
    let rescopedContents = component.get('rescopedContents');
    if (rescopedContents) {
      let milestoneLessons = component.get('activeMilestone.lessons');
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
  }
});
