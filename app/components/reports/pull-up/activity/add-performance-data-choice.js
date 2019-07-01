import Ember from 'ember';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['add-performance-data-by-choice'],

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  taxonomyTags: Ember.computed('assessment.standards.[]', function() {
    var standards = this.get('assessment.standards');
    if (standards) {
      standards = standards.filter(function(standard) {
        // Filter out learning targets (they're too long for the card)
        return !TaxonomyTagData.isMicroStandardId(standard.get('id'));
      });
    }
    return TaxonomyTag.getTaxonomyTags(standards);
  }),

  choiceList: Ember.A(
    [{
      'name': 'question',
      'icon': 'help_outline'
    }, {
      'name': 'take-photo',
      'icon': 'camera'
    }, {
      'name': 'upload-image',
      'icon': 'photo'
    }]
  ),

  actions: {
    selectChoiceOption(option) {
      const component = this;
      component.sendAction('onSelectOption', option);
    }
  }
});
