import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['gru-i2d-template'],

  // -------------------------------------------------------------------------
  // Properties

  /**
   * It maintains the property of student list
   * @property {Ember.Array}
   */
  activeStudents: Ember.computed('students', function() {
    let activeStudents = this.get('students').filterBy('isActive', true);
    let studentHeader = Ember.A([
      {
        fullName: 'student'
      }
    ]);
    return studentHeader.concat(activeStudents);
  }),

  /**
   * It maintains the property of question column list
   * @property {Ember.Array}
   */
  questionColumns: Ember.computed(function() {
    return Array.from(
      {
        length: 15
      },
      i => i
    );
  }),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Action triggered when we click on print
     */
    printTemplate() {
      window.print();
    }
  }
});
