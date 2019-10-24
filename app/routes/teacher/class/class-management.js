import Ember from 'ember';

export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Ember.Service} Service to do retrieve language
   */
  lookupService: Ember.inject.service('api-sdk/lookup'),

  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyService: Ember.inject.service('api-sdk/taxonomy'),

  /**
   * taxonomy service dependency injection
   * @property {Object}
   */
  multipleClassService: Ember.inject.service('api-sdk/multiple-class'),

  // -------------------------------------------------------------------------
  // Events
  didRender() {
    var component = this;
    component.$('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
  },

  // -------------------------------------------------------------------------
  // Methods

  model() {
    const route = this;
    const currentClass = route.modelFor('teacher.class').class;
    const subject = currentClass.get('preference.subject');
    let filters = {
      subject: subject
    };
    let fwkCode = currentClass.get('preference.framework');
    if (fwkCode) {
      filters.fw_code = fwkCode;
    }
    let taxonomyService = route.get('taxonomyService');
    return Ember.RSVP.hash({
      languages: route.get('lookupService').getLanguages(),
      subjectTaxonomyGrades: subject
        ? route.get('taxonomyService').fetchGradesBySubject(filters)
        : [],
      class: currentClass,
      gradeSubjectFWK: subject ? taxonomyService.fetchSubject(subject) : [],
      frameworks: subject ? taxonomyService.fetchSubjectFWKs(subject) : [],
      multipleClasses: route
        .get('multipleClassService')
        .fetchMultipleClassList(currentClass.get('id'))
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   */
  setupController: function(controller, model) {
    controller.resetValues();
    controller.set('languages', model.languages);
    controller.set('subjectTaxonomyGrades', model.subjectTaxonomyGrades);
    controller.set('class', model.class);
    controller.set('gradeSubjectFWK', model.gradeSubjectFWK);
    controller.set('frameworks', model.frameworks);
    controller.set('tempClass', model.class.copy());
    controller.set('tempClass.preference', controller.get('class.preference'));
    controller.get('classController').selectMenuItem('class-management');
    controller.set('multipleClasses', model.multipleClasses || Ember.A([]));
    controller.setupDisplayProperties();
  }
});
