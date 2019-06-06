import Ember from 'ember';

export default Ember.Component.extend({
  /**------------------------------------------------------------------------------------------------
   * list task, update parent for removal
   * ------------------------------------------------------------------------------------------------*/

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['content', 'gru-tasks-line-item'],
  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Updates parent for removal
     */
    removeLineItem() {
      const component = this;
      component.get('removeLineItem')(component.get('task'));
    }
  },
  // -------------------------------------------------------------------------
  // Events
  init() {
    this._super(...arguments);
  }
  // -------------------------------------------------------------------------
  // Properties
});
