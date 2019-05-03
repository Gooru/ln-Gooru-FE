import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['student-class-milestone-course-map'],

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
    toggleLessonItems(selectedLesson) {
      this.handleMilestoneLessonToggle(selectedLesson);
    },

    /**
     * Open the player with the specific collection/assessment
     *
     * @function actions:playContent
     * @param {string} unitId - Identifier for a unit
     * @param {string} lessonId - Identifier for lesson
     * @param {string} collection - collection or assessment
     */
    playContent: function(unitId, lessonId, collection) {
      let component = this;
      let classId = component.get('classId');
      let courseId = component.get('courseId');
      let collectionId = collection.get('id');
      let collectionType = collection.get('collectionType');
      let url = `${
        window.location.origin
      }/player/class/${classId}/course/${courseId}/unit/${unitId}/lesson/${lessonId}/collection/${collectionId}?role=teacher&type=${collectionType}`;
      if (collection.get('isExternalAssessment')) {
        url = collection.get('url');
      }
      window.open(url);
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
    component.set('isLoading', true);
    let fwCode = component.get('fwCode');
    component
      .get('courseService')
      .getCourseMilestones(courseId, fwCode)
      .then(milestones => {
        if (!component.isDestroyed) {
          component.set('milestones', milestones);
          component.fetchMilestonePerformance();
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
    let userUid = component.get('session.userId');
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
        milestonesPerformance.forEach(milestonePerformance => {
          let milestoneId = milestonePerformance.get('milestoneId');
          let milestone = milestones.findBy('milestone_id', milestoneId);
          if (milestone) {
            milestone.set(
              'performance',
              milestonePerformance.get('performance')
            );
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
    let userUid = component.get('session.userId');
    performanceService
      .getPerformanceByMilestoneId(
        classId,
        courseId,
        milestoneId,
        'assessment',
        userUid,
        fwCode
      )
      .then(milestoneLessonsPerformance => {
        milestoneLessonsPerformance.forEach(milestoneLessonPerformance => {
          let lessonId = milestoneLessonPerformance.get('lessonId');
          let lesson = lessons.findBy('lesson_id', lessonId);
          if (lesson) {
            lesson.set(
              'performance',
              milestoneLessonPerformance.get('performance')
            );
          }
        });
      });
  },

  handleMilestoneToggle(selectedMilestone) {
    let component = this;
    let milestoneId = selectedMilestone.get('milestone_id');
    let element = `#milestone-${milestoneId}`;
    let courseId = component.get('courseId');
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
      component
        .get('courseService')
        .getCourseMilestoneLessons(courseId, milestoneId)
        .then(lessons => {
          if (!component.isDestroyed) {
            selectedMilestone.set('lessons', lessons);
            component.fetchMilestoneLessonsPerformance(milestoneId, lessons);
            selectedMilestone.set('hasLessonFetched', true);
          }
        });
    }
  },

  handleMilestoneLessonToggle(selectedLesson) {
    let component = this;
    let classId = component.get('classId');
    let unitId = selectedLesson.get('unit_id');
    let lessonId = selectedLesson.get('lesson_id');
    let element = `#milestone-lesson-${lessonId}`;
    let courseId = component.get('courseId');
    if (selectedLesson.get('isActive')) {
      component.$(element).slideUp(400, function() {
        selectedLesson.set('isActive', false);
      });
    } else {
      component.$(element).slideDown(400, function() {
        selectedLesson.set('isActive', true);
      });
    }
    component
      .get('courseMapService')
      .getLessonInfo(classId, courseId, unitId, lessonId, true)
      .then(lesson => {
        if (!component.isDestroyed) {
          let collections = lesson.get('children');
          selectedLesson.set('collections', collections);
          selectedLesson.set('hasCollectionFetched', true);
        }
      });
  }
});
