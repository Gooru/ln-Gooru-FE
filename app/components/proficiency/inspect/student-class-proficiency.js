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
    },

    // Action triggered when click class view

    onClickClassView() {
      let component = this;
      component.sendAction('onClickCourseCompetencyView');
    }
  },

  // -------------------------------------------------------------------------
  // Propeties

  /**
   * @property {Number} totalCompetencies
   */
  totalCompetencies: 0
});
