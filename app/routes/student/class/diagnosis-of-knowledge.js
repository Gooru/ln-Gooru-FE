import Ember from 'ember';
import { getSubjectIdFromSubjectBucket } from 'gooru-web/utils/utils';

export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Ember.Service} Service to retrieve an assessment
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

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
    const collectionId = 'bb589aab-9a97-43c8-ba50-bc06482d8f21';
    return Ember.RSVP.hash({
      course: course,
      subject: route.get('taxonomyService').fetchSubject(subjectCode),
      assessment: route.get('assessmentService').readAssessment(collectionId),
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
  }
});
