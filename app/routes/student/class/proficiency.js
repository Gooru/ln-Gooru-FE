import Ember from 'ember';
import { getSubjectIdFromSubjectBucket } from 'gooru-web/utils/utils';

export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyService: Ember.inject.service('api-sdk/taxonomy'),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Subject associated with the course
   * @type {String}
   */
  subject: Ember.computed.alias('course.subject'),

  /**
   * Extract subject code from subject
   * @return {String}
   */
  subjectCode: Ember.computed('subject', function() {
    if (this.get('subject')) {
      return getSubjectIdFromSubjectBucket(this.get('subject'));
    }
  }),

  // -------------------------------------------------------------------------
  // Methods

  model: function() {
    const route = this;
    const currentClass = route.modelFor('student.class').class;
    const course = route.modelFor('student.class').course;
    route.set('course', course);
    const subjectCode = route.get('subjectCode');

    const taxonomyService = route.get('taxonomyService');
    const filters = {
      subject: currentClass.get('preference.subject')
    };
    return Ember.RSVP.hash({
      course: course,
      taxonomyGrades: taxonomyService.fetchGradesBySubject(filters),
      subject: route.get('taxonomyService').fetchSubject(subjectCode),
      class: currentClass
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
    controller.set('subject', model.subject);
    let taxonomyGrades = model.taxonomyGrades;
    if (taxonomyGrades) {
      controller.set(
        'taxonomyGrades',
        taxonomyGrades.sortBy('sequence').reverse()
      );
    }
  }
});
