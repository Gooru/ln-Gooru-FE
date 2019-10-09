import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['competency-info-content'],

  /**
   * @property {String} selectedItem
   * Property to store selected item
   */
  selectedItem: 'journey',

  actions: {
    selectItem(item) {
      const component = this;
      component.set('selectedItem', item);
    },

    onSuggestContent(collection, collectionType) {
      const component = this;
      component.sendAction('onSuggestContent', collection, collectionType);
    }
  }
});
