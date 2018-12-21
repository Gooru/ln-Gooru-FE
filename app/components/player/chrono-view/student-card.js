import Ember from 'ember';
import { STUDY_PLAYER_BAR_COLOR } from 'gooru-web/config/config';
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['card', 'student-activity'],

  classNameBindings: ['cardPos'],

  cardPos: Ember.computed(function() {
    return `card-${this.get('cardIndex') + 1}`;
  }),

  /**
   * @requires {AssessmentService} Service to retrieve an assessment
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  /**
   * @requires {CollectionService} Service to retrieve a collection
   */
  collectionService: Ember.inject.service('api-sdk/collection'),

  /**
   * @property {String} color - Hex color value for the default bgd color of the bar chart
   */
  defaultBarColor: STUDY_PLAYER_BAR_COLOR,

  collection: null,

  type: Ember.computed('context', function() {
    return this.get('context').collectionType;
  }),

  context: null,

  index: null,

  didInsertElement() {
    let component = this;
    component.$().addClass(`student-card-${component.get('index')}`);
  },

  init() {
    this._super(...arguments);
    this.getStundentCollectionReport();
  },

  /**
   * @function  get collection summary report by student
   */
  getStundentCollectionReport() {
    let component = this;
    let context = component.get('context');
    // console.log(context);
    const isCollection = context.collectionType === 'collection';
    const collectionPromise = isCollection
      ? component.get('collectionService').readCollection(context.collectionId)
      : component.get('assessmentService').readAssessment(context.collectionId);
    return Ember.RSVP.hashSettled({
      collection: collectionPromise
    }).then(hash => {
      // console.log(hash);
      component.set(
        'collection',
        hash.collection.state === 'fulfilled' ? hash.collection.value : null
      );
    });
  },

  actions: {
    onSelectCard() {
      this.sendAction('onSelectCard', this.get('cardPos'));
    }
  }
});
