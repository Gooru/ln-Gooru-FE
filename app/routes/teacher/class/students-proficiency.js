import Ember from 'ember';
import {
  flattenGutToFwCompetency,
  flattenGutToFwDomain
} from 'gooru-web/utils/taxonomy';

export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service('api-sdk/class'),

  /**
   * @type {PerformanceService} Service to retrieve class performance summary
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * @type {CourseService} Service to retrieve course information
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @type {UnitService} Service to retrieve unit information
   */
  unitService: Ember.inject.service('api-sdk/unit'),

  /**
   * @type {i18nService} Service to retrieve translations information
   */
  i18n: Ember.inject.service(),

  /**
   * @requires service:api-sdk/competency
   */
  competencyService: Ember.inject.service('api-sdk/competency'),

  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyService: Ember.inject.service('taxonomy'),

  // --------------------------------------------------------------
  // Actions
  actions: {
    onSelectSecondaryClass(classId) {
      this.set('secondaryClassId', classId);
      this.refresh();
    }
  },

  // ---------------------------------------------------------------
  // Properties
  secondaryClassId: null,

  // ---------------------------------------------------------------
  // Method

  model() {
    const route = this;
    const learnerProficicency = route
      .modelFor('teacher.class')
      .class.get('isStudentLearner');
    let secondaryClassId = route.get('secondaryClassId') || null;
    if (learnerProficicency) {
      secondaryClassId = route
        .modelFor('teacher.class')
        .class.get('secondaryClassId');
    }
    const primaryClass = route.modelFor('teacher.class').class;
    const classId = secondaryClassId
      ? secondaryClassId
      : primaryClass.get('id');
    const classPromise = route.get('classService').readClassInfo(classId);
    const membersPromise = route.get('classService').readClassMembers(classId);
    return classPromise.then(function(classData) {
      let classCourseId = null;
      if (classData.courseId) {
        classCourseId = Ember.A([
          {
            classId: classId,
            courseId: classData.courseId
          }
        ]);
      }
      const performanceSummaryPromise = classCourseId
        ? route
          .get('performanceService')
          .findClassPerformanceSummaryByClassIds(classCourseId)
        : null;
      return Ember.RSVP.hash({
        class: classPromise,
        members: membersPromise,
        classPerformanceSummaryItems: performanceSummaryPromise
      }).then(function(hash) {
        const aClass = hash.class;
        const members = hash.members;
        const classPerformanceSummaryItems = hash.classPerformanceSummaryItems;
        let classPerformanceSummary = classPerformanceSummaryItems
          ? classPerformanceSummaryItems.findBy('classId', classId)
          : null;
        aClass.set('performanceSummary', classPerformanceSummary);
        const setting = aClass.get('setting');
        const isPremiumClass = setting != null && setting['course.premium'];
        const courseId = aClass.get('courseId');
        let visibilityPromise = Ember.RSVP.resolve([]);
        let coursePromise = Ember.RSVP.resolve(Ember.Object.create({}));
        const competencyCompletionStats = isPremiumClass
          ? route
            .get('competencyService')
            .getCompetencyCompletionStats([classId])
          : Ember.RSVP.resolve(Ember.A());

        if (courseId) {
          visibilityPromise = route
            .get('classService')
            .readClassContentVisibility(classId);
          coursePromise = route.get('courseService').fetchById(courseId);
        }
        const frameworkId = aClass.get('preference.framework');
        const subjectId = aClass.get('preference.subject');

        let crossWalkFWCPromise = null;
        if (frameworkId && subjectId) {
          crossWalkFWCPromise = route
            .get('taxonomyService')
            .fetchCrossWalkFWC(frameworkId, subjectId);
        }
        return Ember.RSVP.hash({
          contentVisibility: visibilityPromise,
          course: coursePromise,
          crossWalkFWC: crossWalkFWCPromise,
          competencyStats: competencyCompletionStats
        }).then(function(hash) {
          const contentVisibility = hash.contentVisibility;
          const course = hash.course;
          const crossWalkFWC = hash.crossWalkFWC || [];
          aClass.set('owner', members.get('owner'));
          aClass.set('collaborators', members.get('collaborators'));
          aClass.set('memberGradeBounds', members.get('memberGradeBounds'));
          aClass.set('members', members.get('members'));
          aClass.set(
            'competencyStats',
            hash.competencyStats.findBy('classId', classId)
          );
          if (secondaryClassId) {
            aClass.set('isSecondaryClass', true);
          }
          return {
            class: aClass,
            course,
            members,
            contentVisibility,
            crossWalkFWC
          };
        });
      });
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.set('class', model.class);
    controller.set('course', model.course);
    controller.set('members', model.members);
    if (model.crossWalkFWC) {
      controller.set(
        'fwCompetencies',
        flattenGutToFwCompetency(model.crossWalkFWC)
      );
      controller.set('fwDomains', flattenGutToFwDomain(model.crossWalkFWC));
    }
    controller.get('classController').selectMenuItem('students');
    controller.loadStudentsProficiencyData();
    controller.set('classController.class.secondaryClassId', null);
    controller.set('classController.class.isStudentLearner', false);
    if (model.class.get('isSecondaryClass')) {
      controller
        .get('classController.class')
        .set('secondaryClassId', model.class.get('id'));
      controller
        .get('classController')
        .send('onSelectSecondaryClass', model.class);
    }
  },

  resetController(controller) {
    this.set('secondaryClassId', null);
    controller.resetProperties();
  }
});
