import Ember from 'ember';
import { CONTENT_TYPES } from 'gooru-web/config/config';

/**
 * Teacher Performance Controller
 *
 * Controller responsible of the logic for the teacher performance
 *
 * @module
 * @augments ember/Controller
 */
export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  queryParams: ['collectionType', 'unitId', 'lessonId', 'courseId'],

  applicationController: Ember.inject.controller('application'),

  /**
   * @type {PerformanceService}
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * @type {CourseService}
   */
  courseService: Ember.inject.service('api-sdk/course'),


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Profile}
   */
  profile: Ember.computed.alias('applicationController.profile'),

  /**
   * Selected course
   * @property {Course}
   */
  course: null,

  /**
   * Selected unit
   * @property {Unit}
   */
  unit: Ember.computed('course.children.[]', 'unitId', function() {
    const units = this.get('course.children') || [];
    return units.findBy('id', this.get('unitId'));
  }),

  /**
   * Selected lesson
   * @property {Lesson}
   */
  lesson: Ember.computed('unit.children.[]', 'lessonId', function() {
    const lessons = this.get('unit.children') || [];
    return lessons.findBy('id', this.get('lessonId'));
  }),

  /**
   * @property {CollectionPerformanceSummary[]}
   */
  collectionPerformanceSummaryItems: [],

  /**
   * @property {string}
   */
  collectionType: CONTENT_TYPES.ASSESSMENT,

  /**
   * @property {string}
   */
  courseId: null,

  /**
   * @property {string}
   */
  unitId: null,

  /**
   * @property {string}
   */
  lessonId: null,

  /**
   * @property {Boolean} isCourseFiltersExpanded
   */
  isCourseFiltersExpanded: true,

  /**
   * @property {Boolean} isCourseFiltersExpanded
   */
  isUnitFiltersExpanded: false,
  /**
   * @property {Boolean} isCourseFiltersExpanded
   */
  isLessonFiltersExpanded: false,

  /**
   * @property {Collection[]|Assessment[]}
   */
  collections: [],

  /**
   * Class courses
   * @property {Course[]}
   */
  courses: Ember.computed('applicationController.myClasses.classes.[]', 'courseId', function() {
    const activeClasses = this.get("applicationController.myClasses").getStudentActiveClasses(this.get("profile.id"));
    return activeClasses.filterBy('hasCourse').map(function(aClass){
      return {
        id: aClass.get('courseId'),
        title: aClass.get('courseTitle')
      };
    });
  }),

  /**
   * @property {Unit[]}
   */
  units: Ember.computed('course.children.[]', 'unitId', function() {
    return this.get('course.children');
  }),

  /**
   * @property {Lesson[]}
   */
  lessons: Ember.computed('unit.children.[]', 'lessonId', function() {
    return this.get('unit.children');
  }),

  /**
   * Last selected content title
   * @property {string}
   */
  contentTitle: null,

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * Selects the content type
     * @param collectionType
     */
    selectContentType: function (collectionType) {
      this.set('collectionType', collectionType);
      this.loadData();
    },

    /**
     * Selects the course
     * @param courseId
     */
    selectCourse: function (courseId) {
      this.set('courseId', courseId);
      this.set('unitId', null);
      this.set('lessonId', null);
      this.loadCourse();
    },

    /**
     * Selects the unit
     * @param unitId
     */
    selectUnit: function (unitId) {
      this.set('unitId', unitId);
      this.set('lessonId', null);
    },

    /**
     * Selects the lesson
     * @param lessonId
     */
    selectLesson: function (lessonId) {
      this.set('lessonId', lessonId);
    },

    /**
     * Loads report data
     */
    updateReport: function () {
      this.loadData();
    },

    /**
     * Expand filter panel
     */
    expandPanel: function (filterType) {
      if (filterType === 'course') {
        this.toggleProperty('isCourseFiltersExpanded');
      }
      if (filterType === 'unit') {
        this.toggleProperty('isUnitFiltersExpanded');
      }
      if (filterType === 'lesson') {
        this.toggleProperty('isLessonFiltersExpanded');
      }
    }
  },

  // -------------------------------------------------------------------------
  // Methods
  /**
   * Loads report data
   */
  loadData: function() {
    const controller = this;
    const courseId = controller.get('courseId');
    if (courseId) {
      const userId = controller.get('profile.id');
      const collectionType = controller.get('collectionType');
      const unitId = controller.get('unitId');
      const lessonId = controller.get('lessonId');
      const criteria = {
        courseId: controller.get('courseId'),
        unitId: unitId,
        lessonId: lessonId,
        collectionType: collectionType
      };
      Ember.RSVP.hash({
        course: controller.get('courseService').getCourseStructure(courseId, collectionType),
        items: controller.get('performanceService').searchStudentCollectionPerformanceSummary(userId, criteria)
      }).then(function(hash){
        const course = hash.course;
        const items = hash.items;
        controller.setProperties({
          course: course,
          collectionPerformanceSummaryItems: items,
          collections: course.getCollectionsByType(collectionType, unitId, lessonId),
          contentTitle: controller.getContentTitle()
        });
      });
    }
  },

  /**
   * Loads report data
   */
  loadCourse: function() {
    const controller = this;
    const courseId = controller.get('courseId');
    const collectionType = controller.get('collectionType');
    controller.get('courseService').getCourseStructure(courseId, collectionType).then(function(course){
      controller.set('course', course);
    });
  },

  /**
   * Gets the last selected content title
   * @returns {string}
   */
  getContentTitle: function() {
    let title = this.get('course') ? this.get('course.title'): null;
    title = this.get('unit') ? this.get('unit.title'): title;
    return this.get('lesson') ? this.get('lesson.title'): title;
  },

  /**
   * Resets values
   */
  resetValues: function () {
    this.setProperties({
      course: null,
      unit: null,
      courseId: null,
      unitId: null,
      lessonId: null,
      collections: [],
      collectionPerformanceSummaryItems: []
    });
  }

});
