import Ember from 'ember';
import { STUDY_PLAYER_BAR_COLOR } from 'gooru-web/config/config';
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
  defaultBarColor: STUDY_PLAYER_BAR_COLOR,

  collection: null,

  type: Ember.computed('activitiy', function() {
    return this.get('activitiy.collectionType');
  }),

  activitiy: null,

  loading: true,

  init() {
    this._super(...arguments);
    this.getStundentCollectionReport();
  },

  /**
   * @function  getcollection summary report by student
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
