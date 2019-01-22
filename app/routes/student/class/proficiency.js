import Ember from 'ember';

export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyService: Ember.inject.service('api-sdk/taxonomy'),

  // -------------------------------------------------------------------------
  // Methods

  model: function() {
    const route = this;
    const currentClass = route.modelFor('student.class').class;
    const course = route.modelFor('student.class').course;
    const taxonomyService = route.get('taxonomyService');
    const filters = {
      subject: currentClass.get('preference.subject')
    };
    return Ember.RSVP.hash({
      course: course,
      taxonomyGrades: taxonomyService.fetchGradesBySubject(filters),
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
    let taxonomyGrades = model.taxonomyGrades;
    if (taxonomyGrades) {
      controller.set(
        'taxonomyGrades',
        taxonomyGrades.sortBy('sequence').reverse()
      );
    }
  }
});
