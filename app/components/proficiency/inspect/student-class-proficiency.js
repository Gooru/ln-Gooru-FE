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
      let activeStudentData = Ember.Object.create({
        firstName: student.firstName,
        lastName: student.lastName,
        avatarUrl: student.thumbnail,
        fullName: student.fullName,
        id: student.id
      });
      component.set('activeStudent', activeStudentData);
      component.set('isShowProficiencyPullup', true);
    },

    // Action triggered when click class view

    onClickClassView() {
      let component = this;
      component.sendAction('onClickCourseCompetencyView');
    },

    /**
     * Action triggered when select a competency
     */
    onSelectCompetency(competency) {
      let controller = this;
      controller.set('selectedCompetency', competency);
      controller.set('isShowCompetencyContentReport', true);
    },

    /**
     * Action triggered when the user click outside of pullup.
     **/
    onClosePullUp() {
      this.set('isShowProficiencyPullup', false);
    },

    // Action triggered when close competency report pullup
    onCloseCompetencyReportPullUp() {
      this.set('isShowCompetencyContentReport', false);
    }
  },

  // -------------------------------------------------------------------------
  // Propeties
  /**
   * @property {Boolean} isShowProficiencyPullup
   */
  isShowProficiencyPullup: false,

  /**
   * @property {Number} totalCompetencies
   */
  totalCompetencies: 0
});
