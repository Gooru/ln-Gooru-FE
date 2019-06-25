import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['competency-info-content'],

  /**
   * @property {String} selectedItem
   * Property to store selected item
   */
  selectedItem: 'learning',

  actions: {
    selectItem(item) {
      let component = this;
      component.set('selectedItem', item);
    }
  }
});
