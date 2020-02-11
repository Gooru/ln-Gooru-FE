import Ember from 'ember';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';
import { FEEDBACK_USER_CATEGORY, CONTENT_TYPES } from 'gooru-web/config/config';

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
    component.fetchActivityFeedbackCateory();
  },

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    onNext: function() {
      const component = this;
      let resourceList = component.get('resourceList');
      let currentIndex = component.get('currentIndex');
      let categoryLists = component.get('categoryLists');
      let nextContent = resourceList.objectAt(currentIndex);
      if (nextContent) {
        let content_format = nextContent.get('content_format')
          ? nextContent.get('content_format')
          : 'question';
        let contentCategory = categoryLists.get(`${content_format}s`);
        component.set('isSkipped', nextContent.get('skipped'));
        component.set('contentScore', nextContent.get('score'));
        component.set('timeSpent', nextContent.get('savedTime'));
        component.set('feedbackCategoryLists', contentCategory);
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
    let component = this;
    return component.get('collection.isCollection');
  }),

  isPlayNextContent: false,

  currentIndex: 0,

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
  contentType: Ember.computed('collection', function() {
    let component = this;
    let format = component.get('format');
    return format
      ? format
      : component.get('isCollection')
        ? 'collection'
        : 'assessment';
  }),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function fetchActivityFeedbackCateory
   * Method to fetch learning activity feedback
   */

  fetchActivityFeedbackCateory() {
    const component = this;
    let role = component.get('session.role');
    let userCategoryId =
      FEEDBACK_USER_CATEGORY[`${role}`] || FEEDBACK_USER_CATEGORY.other;
    component
      .get('activityFeedbackService')
      .getFeedbackCategory(userCategoryId)
      .then(categoryLists => {
        component.set('categoryLists', categoryLists);
        let contentType = component.get('contentType');
        let contentCategory;
        if (contentType === CONTENT_TYPES.EXTERNAL_ASSESSMENT) {
          contentCategory = categoryLists.get('externalAssessments');
        } else if (contentType === CONTENT_TYPES.EXTERNAL_COLLECTION) {
          contentCategory = categoryLists.get('externalCollections');
        } else if (contentType === CONTENT_TYPES.OFFLINE_ACTIVITY) {
          contentCategory = categoryLists.get('offlineActivities');
        } else {
          contentCategory = categoryLists.get(`${contentType}s`);
        }
        let resources = component.get('collection.children');
        let listOfResources = [];
        resources.map(resource => {
          let type = resource.get('content_format')
            ? resource.get('content_format')
            : 'question';
          let resourceCategory = categoryLists.get(`${type}s`);
          if (resourceCategory.length) {
            listOfResources.push(resource);
          }
        });
        component.set('resourceList', listOfResources);
        if (contentCategory.length) {
          component.set('resourceInfo', component.get('collection'));
          component.set('feedbackCategoryLists', contentCategory);
          component.set('contentFormat', contentType);
        } else {
          component.send('onNext');
        }
      });
  }
});
