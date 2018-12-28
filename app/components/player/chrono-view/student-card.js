import Ember from 'ember';
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['card', 'student-activity'],

  classNameBindings: ['cardPos'],

  cardPos: Ember.computed(
    'activitiy.selected',
    'activitiy.position',
    'activitiy.positionSeq',
    function() {
      let activitiy = this.get('activitiy');
      if (activitiy.get('selected')) {
        return 'selected';
      } else {
        return `${activitiy.get('position')}-${activitiy.get('positionSeq')}`;
      }
    }
  ),

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
  defaultBarColor: '#E3E5EA',

  /**
   * @property {collection}
   */
  collection: null,

  /**
   * @property {type}
   */
  type: Ember.computed('activitiy', function() {
    return this.get('activitiy.collectionType');
  }),

  /**
   * @property {activitiy}
   */
  activitiy: null,

  /**
   * @property {loading}
   */
  loading: true,

  init() {
    this._super(...arguments);
    this.getStundentCollectionReport();
  },

  /**
   * @function  getCollection summary report by student
   */
  getStundentCollectionReport() {
    let component = this;
    let activitiy = component.get('activitiy');
    const isCollection = activitiy.get('collectionType') === 'collection';
    const collectionPromise = isCollection
      ? component
        .get('collectionService')
        .readCollection(activitiy.get('collectionId'))
      : component
        .get('assessmentService')
        .readAssessment(activitiy.get('collectionId'));
    return Ember.RSVP.hashSettled({
      collection: collectionPromise
    }).then(hash => {
      component.set(
        'collection',
        hash.collection.state === 'fulfilled' ? hash.collection.value : null
      );
      component.set('loading', false);
    });
  },

  actions: {
    onSelectCard(activitiy) {
      this.sendAction('onSelectCard', activitiy);
    },

    onOpenCollectionReport() {
      let component = this;
      let isActive = this.get('activitiy.selected');
      if (isActive) {
        component.sendAction(
          'onOpenCollectionReport',
          component.get('collection'),
          component.get('type')
        );
      }
    }
  }
});
