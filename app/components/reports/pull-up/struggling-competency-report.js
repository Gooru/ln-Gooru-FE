import Ember from 'ember';

export default Ember.Component.extend({
  //--------------------------------------------------------
  //Attributes
  classNames: ['pull-up', 'struggling-competency-report'],

  //--------------------------------------------------------
  // Properties

  studentList: [2, 3, 5, 5, 4],

  //-------------------------------------------------------
  //Actions
  actions: {
    showStudentList() {
      let component = this;
      component.$('.sc-student-dropdown-list-container').slideToggle(500);
    },

    onClosePullUp(isCloseAll = false) {
      let component = this;
      component.$().slideUp({
        complete: function() {
          component.sendAction('closePullUp', isCloseAll);
        }
      });
    }
  },

  //---------------------------------------------------------------------
  // Hooks

  didInsertElement() {
    this.openPullUp();
  },

  //---------------------------------------------------------------------
  // Method

  openPullUp() {
    let component = this;
    component.$().slideDown();
  }
});
