import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['proficiency', 'taxonomy-grades'],

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyService: Ember.inject.service('api-sdk/taxonomy'),

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    let component = this;
    component.getTaxonomyGrades();
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
  * @property {String} subjectCode
  */
  subjectCode: '',

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function getTaxonomyGrades
   * Method to fetch taxonomy grades
   */
  getTaxonomyGrades() {
    let component = this;
    let taxonomyService = component.get('taxonomyService');
    let filters = {
      subject: component.get('subjectCode')
    };
    return Ember.RSVP.hash({
      taxonomyGrades: Ember.RSVP.resolve(taxonomyService.fetchGradesBySubject(filters))
    })
      .then(({taxonomyGrades}) => {
        let activeGrade = taxonomyGrades.findBy('id', component.get('classGrade'));
        component.sendAction('onSelectGrade', activeGrade);
        component.set('activeGrade', activeGrade)
        component.set('taxonomyGrades', taxonomyGrades.reverse());
      });
  }
});
