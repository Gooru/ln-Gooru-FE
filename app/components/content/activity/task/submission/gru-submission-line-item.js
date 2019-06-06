import Ember from 'ember';

export default Ember.Component.extend({
  /**------------------------------------------------------------------------------------------------
   * list task, update parent for removal
   * ------------------------------------------------------------------------------------------------*/

  // -------------------------------------------------------------------------
  // Attributes
  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Updates parent for removal
     */
    removeLineItem() {
      const component = this;
      component.get('removeLineItem')(component.get('submission'));
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
