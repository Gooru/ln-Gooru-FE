import Ember from 'ember';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['gru-activity-feedback'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    onNext: function() {
      const component = this;
      let resourceList = component.get('resourceList');
      let nextIndex = component.get('currentIndex') + 1;
      component.set('currentIndex', nextIndex);
      let nextContent = resourceList.objectAt(nextIndex);
      if (nextContent) {
        component.set('resourceInfo', nextContent);
      } else {
        component.set('isPlayNextContent', true);
      }
    },

    onSkipFeedback: function() {
      const component = this;
      component.sendAction('onSkipFeedback');
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @type {Boolean}
   */
  isCollection: Ember.computed('collection', function() {
    let component = this;
    return component.get('collection.isCollection');
  }),

  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  tags: Ember.computed('collection', function() {
    let standards = this.get('collection.standards');
    if (standards) {
      standards = standards.filter(function(standard) {
        // Filter out learning targets (they're too long for the card)
        return !TaxonomyTagData.isMicroStandardId(standard.get('id'));
      });
      return TaxonomyTag.getTaxonomyTags(standards);
    }
  }),

  /**
   * @property {ResourceList[]} List of resource list
   */
  resourceList: Ember.computed('collection', function() {
    let component = this;
    let format = component.get('format');
    return format === 'offline-activity'
      ? component.get('collection.tasks')
      : component.get('collection.children');
  }),

  resourceInfo: Ember.computed('resourceList', 'collection', function() {
    let component = this;
    let resourceList = component.get('resourceList');
    return resourceList.length
      ? resourceList.get('firstObject')
      : component.get('collection');
  }),

  isPlayNextContent: false,

  currentIndex: 0
});
