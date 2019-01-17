import Ember from 'ember';
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['card', 'student-activity'],

  classNameBindings: ['cardPos'],

  cardPos: Ember.computed(
    'activity.selected',
    'activity.position',
    'activity.positionSeq',
    function() {
      let activity = this.get('activity');
      if (activity.get('selected')) {
        return 'selected';
      } else {
        return `${activity.get('position')}-${activity.get('positionSeq')}`;
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
  type: Ember.computed('activity', function() {
    return this.get('activity.collectionType');
  }),

  /**
   * @property {activity}
   */
  activity: null,

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
    let activity = component.get('activity');
    let collectionPromise;
    if (activity.get('collectionType') === 'collection') {
      collectionPromise = component
        .get('collectionService')
        .readCollection(activity.get('collectionId'));
    } else if (activity.get('collectionType') === 'assessment') {
      collectionPromise = component
        .get('assessmentService')
        .readAssessment(activity.get('collectionId'));
    } else if (activity.get('collectionType') === 'assessment-external') {
      collectionPromise = component
        .get('assessmentService')
        .readExternalAssessment(activity.get('collectionId'));
    } else {
      collectionPromise = component
        .get('collectionService')
        .readExternalCollection(activity.get('collectionId'));
    }
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
    onSelectCard(activity) {
      this.sendAction('onSelectCard', activity);
    },

    onOpenCollectionReport() {
      let component = this;
      let activity = component.get('activity');
      let isActive = activity.get('selected');
      let collection = component.get('collection');
      collection.set(
        'performance',
        Ember.Object.create({
          score: activity.score
        })
      );
      if (isActive) {
        component.sendAction(
          'onOpenCollectionReport',
          activity,
          collection,
          component.get('type')
        );
      }
    }
  }
});
