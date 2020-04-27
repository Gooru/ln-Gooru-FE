import Ember from 'ember';
import { PLAYER_EVENT_SOURCE } from 'gooru-web/config/config';
import { getObjectsDeepCopy } from 'gooru-web/utils/utils';

export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @type {Service} session service
   */
  session: Ember.inject.service('session'),
  /**

  /**
   * @type {Service} performance service
   */
  performanceService: Ember.inject.service('api-sdk/performance'),
  /**

   * @type {Service} i18n
   */
  i18n: Ember.inject.service(),

  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyService: Ember.inject.service('api-sdk/taxonomy'),

  /**
   * @type {CourseService} Service to retrieve course information
   */
  courseService: Ember.inject.service('api-sdk/course'),

  // -------------------------------------------------------------------------
  // Attributes

  secondaryClass: null,

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Launch an assessment goLive
     *
     * @function actions:goLive
     */
    goLive: function(options) {
      const currentClass = this.modelFor('teacher.class').class;
      const classId = currentClass.get('id');
      const queryParams = {
        queryParams: {
          source: PLAYER_EVENT_SOURCE.COURSE_MAP,
          collectionType: options.collectionType
        }
      };
      this.transitionTo(
        'reports.collection',
        classId,
        options.collectionId,
        queryParams
      );
    },
    /**
     * Launch an assessment on-air
     *
     * @function actions:launchOnAir
     */
    launchOnAir: function(collectionId) {
      const currentClass = this.modelFor('teacher.class').class;
      const classId = currentClass.get('id');
      this.transitionTo('reports.collection', classId, collectionId);
    },

    /**
     * Open the player with the specific collection/assessment
     *
     * @function actions:playItem
     * @param {string} unitId - Identifier for a unit
     * @param {string} lessonId - Identifier for lesson
     * @param {string} collection - collection or assessment
     */
    playResource: function(unitId, lessonId, collection) {
      if (collection.get('isExternalAssessment')) {
        window.open(collection.get('url'));
      } else {
        const currentClass = this.modelFor('teacher.class').class;
        const classId = currentClass.get('id');
        const courseId = currentClass.get('courseId');
        const role = 'teacher';
        this.transitionTo(
          'context-player',
          classId,
          courseId,
          unitId,
          lessonId,
          collection.get('id'),
          {
            queryParams: {
              role: role,
              type: collection.get('collectionType')
            }
          }
        );
      }
    },

    /**
     * Edit content action, when clicking Edit content on Class Overview
     * @param {Content/Course}
     */
    editContent: function(id, classId) {
      let queryParams = {
        classId: classId
      };
      this.transitionTo('content.courses.edit', id, {
        queryParams
      });
    },

    onSelectedClass(secondaryClass) {
      this.set('secondaryClass', secondaryClass);
      this.refresh();
    },

    didTransition() {
      // Load Course performance summary only loading CM tab
      this.get('controller')
        .get('classController')
        .loadCoursePerformanceSummary();
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function() {
    if (!this.get('secondaryClass')) {
      const currentClass = this.modelFor('teacher.class').class;
      const userId = this.get('session.userId');
      if (currentClass.isTeacher(userId) && !currentClass.get('courseId')) {
        this.transitionTo('teacher.class.add-course');
      }
    }
  },

  model: function() {
    const route = this;
    const secondaryClass = route.get('secondaryClass');
    if (secondaryClass) {
      secondaryClass.class.set('isSecondaryClass', true);
    }
    const currentClass = secondaryClass
      ? secondaryClass.class
      : route.modelFor('teacher.class').class;
    const course = secondaryClass
      ? secondaryClass.course
      : route.modelFor('teacher.class').course;
    const units = course.get('children') || [];
    const classMembers = currentClass.get('members');
    const subject = currentClass.get('preference.subject');
    let taxonomyService = route.get('taxonomyService');
    const courseId = currentClass.get('courseId');
    const fwCode = currentClass.get('preference.framework') || 'GUT';
    const milestonePromise = currentClass.get('milestoneViewApplicable')
      ? route.get('courseService').getCourseMilestones(courseId, fwCode)
      : Ember.RSVP.resolve([]);
    return Ember.RSVP.hash({
      course: course,
      units: units,
      currentClass: currentClass,
      classMembers: classMembers,
      gradeSubject: subject ? taxonomyService.fetchSubject(subject) : {},
      milestones: milestonePromise
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.set('units', model.units);
    controller.set('course', model.course);
    controller.set('classMembers', model.classMembers);
    controller.set('currentClass', model.currentClass);
    controller.get('classController').selectMenuItem('course-map');
    controller.set('isStudentCourseMap', false);
    controller.set('gradeSubject', model.gradeSubject);
    controller.set('classController.gradeSubject', model.gradeSubject);
    controller.set('teacherMilestones', getObjectsDeepCopy(model.milestones));
    controller.set('studentMilestones', getObjectsDeepCopy(model.milestones));
    controller.set('milestones', model.milestones);
    controller.loadItemsToGrade();
    controller.init();
    if (!model.milestones.length) {
      // Load CUL performance only if default view is not Milestone
      controller.getUnitLevelPerformance();
      // Load course content visibility on loading CM tab
      this.get('controller')
        .get('classController')
        .loadCourseContentVisibility();
    }
  },

  resetController(controller) {
    controller.set('tab', null);
    controller.set('studentId', null);
    controller.set('questionItems', null);
    controller.set('isAccepted', false);
    controller.set('itemsToGradeList', Ember.A([]));
    this.set('secondaryClass', null);
  }
});
