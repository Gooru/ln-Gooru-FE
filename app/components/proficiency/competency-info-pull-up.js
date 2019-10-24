import Ember from 'ember';
import { COMPETENCY_STATUS } from 'gooru-web/config/config';

export default Ember.Component.extend({
  classNames: ['competency-info-pull-up'],

  classNameBindings: ['isInspectCompetency:open', 'isExpand:expand'],

  /**
   * @property {Boolean} isExpand
   */
  isExpand: false,

  /**
   * @property {String} studentId
   */
  studentId: Ember.computed.alias('studentProfile.id'),

  /**
   * @property {String} competencyStatus
   */
  competencyStatus: Ember.computed('competency', function() {
    let component = this;
    let competency = component.get('competency');
    return competency && COMPETENCY_STATUS[competency.status];
  }),

  /**
   * @property {String} competencyCode
   */
  competencyCode: null,

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
      component.sendAction('onClosePullUp');
    },

    playContent(queryParams, contentId, content) {
      const component = this;
      component.sendAction('playContent', queryParams, contentId, content);
    }
  }
});
