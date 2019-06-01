import Ember from 'ember';

/**
 * Grade Items component
 *
 * Component responsible to show questions pending grading in the teacher class performance tab
 * This component can be reused across the entire application and can be styled as needed,
 * functionality should remain the same
 *
 * @module
 * @augments Ember/Component
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-grade-items'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Trigger to open free response question grade pull
     * @param  {Object} itemToGrade
     */
    openFRQuestionGrade(itemToGrade) {
      this.sendAction('openFRQuestionGrade', itemToGrade);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  /**
   * The Questions needs to grade
   * @property {GradeQuestionItem[]} items
   */
  questionItems: Ember.A(),

  /**
   * Maintains the state of question items to grade pull up
   * @type {Boolean}
   */
  showFRQuestionGrade: false

  // -------------------------------------------------------------------------
  // Observers

  // -------------------------------------------------------------------------
  // Methods
});
