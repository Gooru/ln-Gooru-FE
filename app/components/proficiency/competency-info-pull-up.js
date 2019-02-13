import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['competency-info-pull-up'],

  classNameBindings: ['isInspectCompetency:open', 'isExpand:expand'],

  isExpand: false,

  actions: {
    /**
     * @function expandPullUp
     * Method to toggle expand view for mobile
     */
    expandPullUp() {
      let component = this;
      component.toggleProperty('isExpand');
    },

    closePullUp() {
      let component = this;
      component.toggleProperty('isInspectCompetency');
      component.set('isExpand', false);
      component.set('competency', null);
    }
  }
});
