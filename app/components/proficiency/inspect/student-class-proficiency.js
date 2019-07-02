import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['inspect', 'student-class-proficiency'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    //Action triggered when select a student card
    onSelectStudentCard(student) {
      let component = this;
      component.sendAction('onSelectStudent', student);
    }
  },

  // -------------------------------------------------------------------------
  // Propeties

  /**
   * @property {Number} totalCompetencies
   */
  totalCompetencies: 0
});
