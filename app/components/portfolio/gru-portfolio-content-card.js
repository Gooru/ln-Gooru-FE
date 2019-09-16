import Ember from 'ember';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';
import { CONTENT_TYPES } from 'gooru-web/config/config';

export default Ember.Component.extend({
  classNames: ['portfolio', 'gru-portfolio-content-card'],

  isOfflineActivity: Ember.computed.equal(
    'content.type',
    CONTENT_TYPES.OFFLINE_ACTIVITY
  ),

  isAssessment: Ember.computed.equal('content.type', CONTENT_TYPES.ASSESSMENT),

  isExternalAssessment: Ember.computed.equal(
    'content.type',
    CONTENT_TYPES.EXTERNAL_ASSESSMENT
  ),

  isCollection: Ember.computed.equal('content.type', CONTENT_TYPES.COLLECTION),

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
  })
});
