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
      let currentIndex = component.get('currentIndex');
      let nextContent = resourceList.objectAt(currentIndex);
      if (nextContent) {
        let resource = nextContent.get('resource');
        let content_format = resource.isResource ? 'resource' : 'question';
        component.set('isSkipped', nextContent.get('skipped'));
        component.set('contentScore', nextContent.get('score'));
        component.set('timeSpent', nextContent.get('savedTime'));
        component.set('contentFormat', content_format);
        component.set('resourceInfo', resource);
      } else {
        component.set('isPlayNextContent', true);
      }
      let nextIndex = component.get('currentIndex') + 1;
      component.set('currentIndex', nextIndex);
    },

    onSkipFeedback: function() {
      const component = this;
      component.sendAction('onSkipFeedback');
    },

    onExit: function() {
      const component = this;
      component.sendAction('onExit');
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
   * @property {ResourceList[]} List of resource list
   */
  resourceList: Ember.computed('collection', function() {
    let component = this;
    let resourcesResult = component.get('collection.resourcesResult');
    return resourcesResult ? component.get('collection.resourcesResult') : [];
  }),

  /**
   * @property {resourceInfo{}} object
   */
  resourceInfo: Ember.computed('collection', function() {
    let component = this;
    return component.get('collection');
  }),

  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  tags: Ember.computed('resourceInfo', function() {
    let standards = this.get('resourceInfo.standards');
    if (standards) {
      standards = standards.filter(function(standard) {
        // Filter out learning targets (they're too long for the card)
        return !TaxonomyTagData.isMicroStandardId(standard.get('id'));
      });
      return TaxonomyTag.getTaxonomyTags(standards);
    }
  }),

  /**
   * @property {contentFormat} String
   */
  contentFormat: Ember.computed('collection', function() {
    let component = this;
    let format = component.get('format');
    return format
      ? format
      : component.get('isCollection')
        ? 'collection'
        : 'assessment';
  }),

  isPlayNextContent: false,

  currentIndex: 0
});
