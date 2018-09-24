import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['proficiency', 'taxonomy-grades'],

  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyService: Ember.inject.service('api-sdk/taxonomy'),

  didInsertElement() {
    let component = this;
    component.getTaxonomyGrades();
  },


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
        let classGradeLevel = taxonomyGrades.findBy('id', component.get('classGrade'));
        component.sendAction('onSelectGrade', classGradeLevel);
        component.set('taxonomyGrades', taxonomyGrades.reverse());
      });
  }
});
