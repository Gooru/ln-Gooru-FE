import Ember from 'ember';
import { CONTENT_TYPES } from 'gooru-web/config/config';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['add-data', 'add-student-performance-data'],

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    onClosePullUp() {
      this.sendAction('onClosePullUp');
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  isAsessmentAddData: Ember.computed('collection.format', function() {
    const component = this;
    const contentFormat = component.get('collection.format');
    return (
      contentFormat === CONTENT_TYPES.ASSESSMENT ||
      contentFormat === CONTENT_TYPES.EXTERNAL_ASSESSMENT
    );
  })
});
