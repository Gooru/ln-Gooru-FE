import Ember from 'ember';
import PullUpMixin from 'gooru-web/mixins/reports/pull-up/pull-up-mixin';
import { isCompatibleVW } from 'gooru-web/utils/utils';
import { SCREEN_SIZES } from 'gooru-web/config/config';

export default Ember.Component.extend(PullUpMixin, {
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['milestone-report', 'student-milestone-report'],

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    this.openPullUp();
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {String} populatedTopPos
   */
  populatedTopPos: Ember.computed(function() {
    return isCompatibleVW(SCREEN_SIZES.EXTRA_SMALL) ? '0' : '10%';
  })
});
