import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['competency-meta-info'],

  selectedItem: 'metadata',

  prequisiteCompetencies: null,

  actions: {
    selectItem(item) {
      let component = this;
      component.set('selectedItem', item);
    }
  }
});
