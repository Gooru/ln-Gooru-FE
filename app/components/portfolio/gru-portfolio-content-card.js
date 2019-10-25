import Ember from 'ember';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';
import { CONTENT_TYPES } from 'gooru-web/config/config';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['portfolio', 'gru-portfolio-content-card'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    //Action triggered when click on performance of the activity
    onShowReport() {
      const component = this;
      component.sendAction('onShowActivityReport', component.get('content'));
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Boolean} isOfflineActivity
   * Property to check whether it's a offlince activity or not
   */
  isOfflineActivity: Ember.computed.equal(
    'content.type',
    CONTENT_TYPES.OFFLINE_ACTIVITY
  ),

  /**
   * @property {Boolean} isAssessment
   * Property to check whether it's a assessment or not
   */
  isAssessment: Ember.computed.equal('content.type', CONTENT_TYPES.ASSESSMENT),

  /**
   * @property {Boolean} isExternalAssessment
   * Property to check whether it's a external assessment or not
   */
  isExternalAssessment: Ember.computed.equal(
    'content.type',
    CONTENT_TYPES.EXTERNAL_ASSESSMENT
  ),

  /**
   * @property {Boolean} isCollection
   * Property to check whether it's a collection or not
   */
  isCollection: Ember.computed.equal('content.type', CONTENT_TYPES.COLLECTION),

  /**
   * @property {Boolean} isExternalCollection
   * Property to check whether it's a external collection or not
   */
  isExternalCollection: Ember.computed.equal(
    'content.type',
    CONTENT_TYPES.EXTERNAL_COLLECTION
  ),

  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  tags: Ember.computed('content.taxonomy.[]', function() {
    var standards = this.get('content.taxonomy');
    if (standards) {
      standards = standards.filter(function(standard) {
        // Filter out learning targets (they're too long for the card)
        return !TaxonomyTagData.isMicroStandardId(standard.get('id'));
      });
    }
    return TaxonomyTag.getTaxonomyTags(standards);
  }),

  /**
   * @property {String} contentDescription
   * Property for current item's description or first taxonomies description
   */
  contentDescription: Ember.computed(
    'content.learningObjective',
    'tags',
    function() {
      const component = this;
      const learningObjective = component.get('content.learningObjective');
      const tags = component.get('tags');
      const contentDescription =
        learningObjective ||
        (tags.length ? tags.objectAt(0).get('data.title') : '');
      return contentDescription;
    }
  )
});
