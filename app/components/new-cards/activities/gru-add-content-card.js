import Ember from 'ember';
import { CONTENT_TYPES } from 'gooru-web/config/config';

export default Ember.Component.extend({
  classNames: ['new-cards', 'gru-add-content-card'],

  actions: {
    onAddActivity() {
      const component = this;
      const content = component.get('content');
      component.sendAction('onAddActivity', content);
    },

    onShowDaterangePicker() {
      const component = this;
      component.set('isShowDaterangePicker', true);
    },

    onCloseDaterangePicker() {
      const component = this;
      component.set('isShowDaterangePicker', false);
    },

    onScheduleByDate(startDate, endDate) {
      const component = this;
      const content = component.get('content');
      component.sendAction('onAddActivity', content, startDate, endDate);
    },

    onScheduleByMonth(month, year) {
      const component = this;
      const content = component.get('content');
      const isScheduleByMonth = true;
      component.sendAction(
        'onAddActivity',
        content,
        null,
        null,
        month,
        year,
        isScheduleByMonth
      );
    }
  },

  contentType: Ember.computed.alias('content.format'),

  isAssessment: Ember.computed.equal('contentType', CONTENT_TYPES.ASSESSMENT),

  isCollection: Ember.computed.equal('contentType', CONTENT_TYPES.COLLECTION),

  isOfflineActivity: Ember.computed.equal(
    'contentType',
    CONTENT_TYPES.OFFLINE_ACTIVITY
  )
});
