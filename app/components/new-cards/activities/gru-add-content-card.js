import Ember from 'ember';
import { CONTENT_TYPES } from 'gooru-web/config/config';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';

export default Ember.Component.extend({
  classNames: ['new-cards', 'gru-add-content-card'],

  didRender() {
    var component = this;
    component.$('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
  },

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
  ),

  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  taxonomyTags: Ember.computed('content.standards.[]', function() {
    var standards = this.get('content.standards');
    if (standards) {
      standards = standards.filter(function(standard) {
        // Filter out learning targets (they're too long for the card)
        return !TaxonomyTagData.isMicroStandardId(standard.get('id'));
      });
    }
    return TaxonomyTag.getTaxonomyTags(standards);
  })
});
