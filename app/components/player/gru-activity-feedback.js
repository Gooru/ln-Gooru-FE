import Ember from 'ember';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Service

  /**
   * @requires service:session
   */
  session: Ember.inject.service('session'),

  /**
   * @property {activityFeedbackService}
   */
  activityFeedbackService: Ember.inject.service('api-sdk/activity-feedback'),

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['gru-activity-feedback'],

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    var component = this;
    component.$('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
  },

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    onNext: function() {
      const component = this;
      let resourceList = component.get('resourceList');
      let currentIndex = component.get('currentIndex');
      let nextContent = resourceList.objectAt(currentIndex);
      if (nextContent) {
        let content_format = nextContent.get('content_format')
          ? nextContent.get('content_format')
          : 'question';
        component.set('isSkipped', nextContent.get('skipped'));
        component.set('contentScore', nextContent.get('score'));
        component.set('timeSpent', nextContent.get('savedTime'));
        component.set(
          'feedbackCategoryLists',
          nextContent.get('feedbackCategory')
        );
        component.set('contentFormat', content_format);
        component.set('resourceInfo', nextContent);
      } else {
        component.set('isPlayNextContent', true);
      }
      component.incrementProperty('currentIndex');
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
    return this.get('collection.isCollection');
  }),

  isPlayNextContent: false,

  currentIndex: 0,

  /**
   * @property {resourceInfo{}} object
   */
  resourceInfo: Ember.computed('collection', function() {
    return this.get('collection');
  }),

  /**
   * @property {ResourceList[]} List of resource list
   */
  resourceList: Ember.computed('collection', function() {
    let resourcesResult = this.get('collection.children');
    return resourcesResult || [];
  }),

  /**
   * @property {feedbackCategoryLists[]} List of feedback category list
   */
  feedbackCategoryLists: Ember.computed('collection', function() {
    let feedbackCategory = this.get('collection.feedbackCategory');
    return feedbackCategory || [];
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
   * @property {description} String
   */
  description: Ember.computed('resourceInfo', function() {
    let resourceInfo = this.get('resourceInfo');
    return resourceInfo
      ? resourceInfo.description || resourceInfo.learningObjectives || null
      : null;
  }),

  /**
   * @property {contentFormat} String
   */
  contentFormat: Ember.computed('collection', function() {
    let format = this.get('format');
    return format
      ? format
      : this.get('isCollection')
        ? 'collection'
        : 'assessment';
  })
});
