import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['proficiency', 'taxonomy-grades'],

  actions: {
    onSelectGrade(gradeData) {
      let component = this;
      component.sendAction('onSelectGrade', gradeData);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {String} subjectCode
   */
  subjectCode: ''
});
