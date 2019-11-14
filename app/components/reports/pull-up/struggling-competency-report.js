import Ember from 'ember';

export default Ember.Component.extend({
  //--------------------------------------------------------
  //Attributes
  classNames: ['pull-up', 'struggling-competency-report'],

  //--------------------------------------------------------
  // Properties

  selectedCompetency: null,

  studentsPerfomanceList: null,

  collectionContents: null,

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
    },

    /**
     * Action triggered when the user play collection
     * It'll open the player in new tab
     */
    onPlayCollection(collection) {
      const component = this;
      component.sendAction('onPreviewContent', collection);
    },

    /**
     * Action triggered when add collection to dca.
     * @param  {Object} collection
     */
    onAddContentToDCA(collection) {
      const component = this;
      component.sendAction('onAddContentToDCA', collection);
    },

    /**
     * Action get triggered when schedule content to CA got clicked
     */
    onScheduleContentToDCA(content, event) {
      this.sendAction('onScheduleContentToDCA', content, event);
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
