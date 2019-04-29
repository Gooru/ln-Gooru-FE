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

  isAsessmentAddData: Ember.computed('contentType', function() {
    const component = this;
    const contentType = component.get('contentType');
    return (
      contentType === CONTENT_TYPES.ASSESSMENT ||
      contentType === CONTENT_TYPES.EXTERNAL_ASSESSMENT
    );
  })
});
