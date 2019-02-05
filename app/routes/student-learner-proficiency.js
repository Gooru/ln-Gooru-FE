import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    classId: {
      refreshModel: true
    },
    courseId: {
      refreshModel: true
    },
    role: {
      refreshModel: true
    }
  },
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {ProfileService} Service to retrieve profile information
   */
  profileService: Ember.inject.service('api-sdk/profile'),

  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service('api-sdk/class'),

  /**
   * @type {CourseService} Service to retrieve course information
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @type {PerformanceService} Service to retrieve class performance summary
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyService: Ember.inject.service('taxonomy'),

  /**
   * Competency service dependency injection
   * @type {Object}
   */
  competencyService: Ember.inject.service('api-sdk/competency'),

  actions: {
    /**
     * Triggered when a class menu item is selected
     * @param {string} item
     */
    selectMenuItem: function(item) {
      const route = this;
      const controller = route.get('controller');
      const currentItem = controller.get('menuItem');
      const isPremiumClass = controller.get('isPremiumClass');
      if (item !== currentItem) {
        controller.selectMenuItem(item);
        if (item === 'class-management') {
          route.transitionTo('teacher.class.class-management');
        } else if (item === 'students') {
          route.transitionTo('teacher.class.students-proficiency');
        } else if (item === 'course-map') {
          route.transitionTo('teacher.class.course-map');
        } else if (item === 'performance' && !isPremiumClass) {
          route.transitionTo('teacher.class.performance');
        } else if (item === 'class-activities') {
          route.transitionTo('teacher.class.class-activities');
        } else if (item === 'atc') {
          route.transitionTo('teacher.class.atc');
        } else if (item === 'close') {
          let backurl = this.get('backUrls');
          backurl = backurl || controller.get('backUrls');
          if (backurl) {
            route.transitionTo(backurl);
          } else {
            if (controller.class.isArchived) {
              route.transitionTo('teacher-home'); //, (query - params showArchivedClasses = "true" showActiveClasses = "false") class="back-to" } }
            } else {
              route.transitionTo('teacher-home');
            }
          }
        }
      }
    }
  },

  model: function(params) {
    let route = this;
    route._super(...arguments);
    let studentId = params.userId;
    const classId = params.classId;
    const courseId = params.courseId;
    const isTeacher = params.role === 'teacher';
    const classPromise = route.get('classService').readClassInfo(classId);
    return classPromise.then(function(classData) {
      let classCourseId = null;
      if (classData.courseId) {
        classCourseId = Ember.A([
          {
            classId: params.classId,
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
        classPerformanceSummaryItems: performanceSummaryPromise,
        profilePromise: route.get('profileService').readUserProfile(studentId),
        coursePromise: route.get('courseService').fetchById(courseId),
        taxonomyCategories: route.get('taxonomyService').getCategories()
      }).then(function(hash) {
        const aClass = hash.class;
        const classPerformanceSummaryItems = hash.classPerformanceSummaryItems;
        let classPerformanceSummary = classPerformanceSummaryItems
          ? classPerformanceSummaryItems.findBy('classId', classId)
          : null;
        aClass.set('performanceSummary', classPerformanceSummary);
        const studentProfile = hash.profilePromise;
        const taxonomyCategories = hash.taxonomyCategories;
        const course = hash.coursePromise;
        return Ember.Object.create({
          profile: studentProfile,
          categories: taxonomyCategories,
          class: aClass,
          course: course,
          isTeacher: isTeacher
        });
      });
    });
  },

  setupController(controller, model) {
    controller.set('studentProfile', model.get('profile'));
    controller.set('class', model.get('class'));
    controller.set('isTeacher', model.get('isTeacher'));
    controller.set('course', model.get('course'));
    controller.set('taxonomyCategories', model.get('categories'));
    controller.loadData();
  },
  resetController(controller) {
    controller.set('showDomainInfo', false);
    controller.set('showCompetencyInfo', false);
  }
});
