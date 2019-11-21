import Ember from 'ember';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['gru-activity-feedback'],

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    const component = this;
    let format = component.get('format');
    let resourceList;
    if (format === 'offline-activity') {
      resourceList = component.get('collection.tasks');
    } else {
      resourceList = component.get('collection.children');
    }
    if (resourceList.length) {
      resourceList.map((resource, index) => {
        resource.index = parseInt(index + 1);
      });
      component.set('resourceInfo', resourceList.get('firstObject'));
    } else {
      component.set('resourceInfo', component.get('collection'));
    }
  },

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    onNext: function(currentIndex) {
      const component = this;
      let resourceList;
      let format = component.get('format');
      if (format === 'offline-activity') {
        resourceList = component.get('collection.tasks');
      } else {
        resourceList = component.get('collection.children');
      }
      let nextIndex = currentIndex + 1;
      let nextContent = resourceList.findBy('index', nextIndex);
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

  isPlayNextContent: false
});
