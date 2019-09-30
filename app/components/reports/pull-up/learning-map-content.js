import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {service} searchService
   */
  searchService: Ember.inject.service('api-sdk/search'),

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['learning-map-content'],

  /**
   * @property {Array} activityContents
   */
  activityContents: Ember.A([]),

  /**
   * @property {String} activityContentType
   */
  activityContentType: '',

  /**
   * @property {Number} startAt
   */
  startAt: 0,

  /**
   * @property {Number} length
   */
  length: 5,

  actions: {
    onSelectActivityContent(contentType) {
      let component = this;
      component.set('activityContentType', contentType);
      component.loadActivityContentData(contentType);
      component.set('isShowActivityPullup', true);
    },

    onClickShowMoreActivity() {
      let component = this;
      component.loadActivityContentData();
    },

    onResetPullUpData() {
      let component = this;
      component.resetActivityContentData();
    }
  },
  loadActivityContentData(contentType) {
    let component = this;
    component.set('isLoading', true);
    let searchService = component.get('searchService');
    let competencyCode = component.get('learningMapData.gutCode');
    let activityContentType =
      contentType || component.get('activityContentType');
    let activityContents = component.get('activityContents');
    let startAt = component.get('startAt');
    let length = component.get('length');
    let learningMapData = component.get('learningMapData');
    let activityTotalHitCount = learningMapData
      ? learningMapData.contents[`${activityContentType}`].totalHitCount
      : 0;
    let activityContentData = learningMapData
      ? learningMapData.learningMapsContent[`${activityContentType}`]
      : Ember.A([]);
    if (startAt) {
      let filters = {
        startAt: component.get('startAt'),
        length: 5,
        isCrosswalk: false
      };
      Ember.RSVP.hash({
        loadMoreLearningMapData: searchService.fetchLearningMapsCompetencyContent(
          competencyCode,
          filters
        )
      }).then(({ loadMoreLearningMapData }) => {
        component.set(
          'activityContents',
          activityContents.concat(
            loadMoreLearningMapData.learningMapsContent[
              `${activityContentType}`
            ]
          )
        );
      });
    } else {
      component.set(
        'activityContents',
        activityContents.concat(activityContentData)
      );
    }
    component.set('activityTotalHitCount', activityTotalHitCount);
    component.set('startAt', startAt + length);
    component.set('isLoading', false);
  },

  /**
   * @function resetActivityContentData
   * Method to reset activity content data to default
   */
  resetActivityContentData() {
    let component = this;
    component.set('activityContents', Ember.A([]));
    component.set('startAt', 0);
    component.set('isShowActivityPullup', false);
    component.set('activityContentType', '');
    component.set('activityTotalHitCount', 0);
  }
});
