import Ember from 'ember';

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  session: Ember.inject.service('session'),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Collapses the header section
     * @param {boolean} state
     */
    toggleHeader: function(state) {
      var $panels = $('.header .panel');
      if (state) {
        $panels.slideUp();
      } else {
        $panels.slideDown();
      }
    },

    /**
     *  teacher class assessment report view  backbutton to pass  class report  page
     */
    backToClassReport: function() {
      this.get('router').transitionTo(this.get('backUrls'));
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * DidInsertElement ember event
   */
  didInsertElement: function() {
    var item = this.get('menuItem');
    this.selectItem(item);
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * The class presented to the user
   * @property {Class}
   */
  class: null,

  /**
   * The course presented to the user
   * @property {Course}
   */
  course: null,

  /**
   * The menuItem selected
   * @property {String}
   */
  menuItem: null,

  /**
   * @property {boolean} Indicates if course has 1 or more units
   */
  hasUnits: Ember.computed.gt('course.unitCount', 0),

  /**
   * @property {boolean} Indicates if class has 1 or more students
   */
  hasStudents: Ember.computed.gt('class.countMembers', 0),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Selected the menu item
   * @param {string} item
   */
  selectMenuItem: function(item) {
    this.set('menuItem', item);
  }
});
