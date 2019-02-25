import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    userId: {
      refreshModel: true
    },
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
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyService: Ember.inject.service('taxonomy'),

  /**
   * Competency service dependency injection
   * @type {Object}
   */
  competencyService: Ember.inject.service('api-sdk/competency'),

  model: function(params) {
    let route = this;
    route._super(...arguments);

    let studentId = params.userId;
    const classId = params.classId;
    const courseId = params.courseId;
    if (classId && courseId) {
      const isTeacher = params.role === 'teacher';
      return Ember.RSVP.hash({
        profilePromise: route.get('profileService').readUserProfile(studentId),
        classPromise: route.get('classService').readClassInfo(classId),
        coursePromise: route.get('courseService').fetchById(courseId),
        taxonomyCategories: route.get('taxonomyService').getCategories()
      }).then(function(hash) {
        const studentProfile = hash.profilePromise;
        const taxonomyCategories = hash.taxonomyCategories;
        const aClass = hash.classPromise;
        const course = hash.coursePromise;
        return Ember.Object.create({
          profile: studentProfile,
          categories: taxonomyCategories,
          class: aClass,
          course: course,
          isTeacher: isTeacher
        });
      });
    }
  },

  setupController(controller, model) {
    if (model) {
      controller.set('studentProfile', model.get('profile'));
      controller.set('class', model.get('class'));
      controller.set('isTeacher', model.get('isTeacher'));
      controller.set('course', model.get('course'));
      controller.set('taxonomyCategories', model.get('categories'));
      controller.loadData();
    }
  },

  resetController(controller) {
    controller.set('class', null);
    controller.set('showDomainInfo', false);
    controller.set('showCompetencyInfo', false);
    controller.set('selectedCompetency', null);
  }
});
