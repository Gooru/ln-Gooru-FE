import Ember from 'ember';
import { CONTENT_TYPES } from 'gooru-web/config/config';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['add-data', 'add-student-performance-data'],

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    const component = this;
    const contentFormat = component.get('contentFormat');
    if (
      contentFormat === CONTENT_TYPES.ASSESSMENT ||
      contentFormat === CONTENT_TYPES.EXTERNAL_ASSESSMENT
    ) {
      component.set('isAssessmentPerformanceEntry', true);
    } else {
      component.set('isCollectionPerformanceEntry', true);
    }
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    onClosePullUp() {
      this.sendAction('onClosePullUp');
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  isAssessmentPerformanceEntry: false,

  isCollectionPerformanceEntry: false,

  contentFormat: Ember.computed.alias('collection.format')
});
