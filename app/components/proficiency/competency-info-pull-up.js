import Ember from 'ember';
import {
  COMPETENCY_STATUS
} from 'gooru-web/config/config';

export default Ember.Component.extend({
  classNames: ['competency-info-pull-up'],

  classNameBindings: ['isInspectCompetency:open', 'isExpand:expand'],

  isExpand: false,

  /**
   * @property {String} competencyStatus
   */
  competencyStatus: Ember.computed('competency', function() {
    let component = this;
    let competency = component.get('competency');
    return competency && COMPETENCY_STATUS[competency.status];
  }),

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
      component.sendAction("onClosePullUp")
    }
  }
});
