import Ember from 'ember';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['preview', 'gru-collection-preview'],

  // -------------------------------------------------------------------------
  // Dependencies
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  collectionService: Ember.inject.service('api-sdk/collection'),

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    const component = this;
    component.openPullUp();
    if (component.get('previewContentType') === 'assessment') {
      component.fetchAssessment();
    } else {
      component.fetchCollection();
    }
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    //Action triggered when click toggle answer
    onToggleAnswer() {
      const component = this;
      component.toggleProperty('isShowCorrectAnswer');
    },

    //Action triggered when close preview pullup
    onClosePullUp() {
      const component = this;
      component.closePullUp();
    },

    //Action triggered when play  content
    onPlayContent() {
      const component = this;
      let contentId = component.get('previewContentId');
      let contentType = component.get('previewContentType');
      component.get('router').transitionTo('player', contentId, {
        queryParams: {
          role: 'teacher',
          type: contentType
        }
      });
    }
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Boolean} showPullUp
   */
  showPullUp: false,

  /**
   * @property {UUID} previewContentId
   */
  previewContentId: null,

  /**
   * @property {String} previewContentType
   */
  previewContentType: null,

  /**
   * @property {Boolean} isShowCorrectAnswer
   */
  isShowCorrectAnswer: true,

  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  taxonomyTags: Ember.computed('previewContent.standards.[]', function() {
    var standards = this.get('previewContent.standards');
    if (standards) {
      standards = standards.filter(function(standard) {
        // Filter out learning targets (they're too long for the card)
        return !TaxonomyTagData.isMicroStandardId(standard.get('id'));
      });
    }
    return TaxonomyTag.getTaxonomyTags(standards);
  }),

  //--------------------------------------------------------------------------
  // Methods

  /**
   * Function to animate the  pullup from bottom to top
   */
  openPullUp() {
    let component = this;
    component.$().animate(
      {
        top: '10%'
      },
      400
    );
  },

  /**
   * Method to close pullup
   */
  closePullUp() {
    let component = this;
    component.$().animate(
      {
        top: '100%'
      },
      400,
      function() {
        component.set('showPullUp', false);
      }
    );
  },

  /**
   * @function fetchAssessment
   * Method to fetch assessment
   */
  fetchAssessment() {
    const component = this;
    const assessmentId = component.get('previewContentId');
    const assessmentService = component.get('assessmentService');
    return Ember.RSVP.hash({
      assessment: assessmentService.readAssessment(assessmentId)
    })
      .then(({assessment}) => {
        component.set('previewContent', assessment);
      });
  },

  /**
   * @function fetchCollection
   * Method to fetch collection
   */
  fetchCollection() {
    const component = this;
    const collectionId = component.get('previewContentId');
    const collectionService = component.get('collectionService');
    return Ember.RSVP.hash({
      collection: collectionService.readCollection(collectionId)
    })
      .then(({collection}) => {
        component.set('previewContent', collection);
      });
  }
});
