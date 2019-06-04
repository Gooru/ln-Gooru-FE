import Ember from 'ember';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';

export default Ember.Component.extend({
  classNames: ['offline-activity-player', 'gru-offline-activity-start-page'],

  actions: {
    onStartPlayer() {
      const component = this;
      component.sendAction('onStartPlayer');
    },

    onClosePlayer() {
      const component = this;
      component.sendAction('onClosePlayer');
    }
  },

  activityTasks: Ember.computed.alias('offlineActivity.tasks'),

  activityReferences: Ember.computed.alias('offlineActivity.references'),

  /**
   */
  oaTaxonomies: Ember.computed('offlineActivity.standards.[]', function() {
    var standards = this.get('offlineActivity.standards');
    if (standards) {
      standards = standards.filter(function(standard) {
        // Filter out learning targets (they're too long for the card)
        return !TaxonomyTagData.isMicroStandardId(standard.get('id'));
      });
    }
    return TaxonomyTag.getTaxonomyTags(standards);
  })
});
