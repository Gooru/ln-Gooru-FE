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
    let params = {
      page: startAt / length,
      pageSize: length,
      gutCode: competencyCode
    };
    component
      .loadingMoreLearnMapData(activityContentType, params)
      .then(loadMoreLearningMapData => {
        component.set(
          'activityContents',
          activityContents.concat(loadMoreLearningMapData.get('results'))
        );
        let activityTotalHitCount =
          loadMoreLearningMapData.get('totalHitCount') || 0;
        component.set('activityTotalHitCount', activityTotalHitCount);
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

  loadingMoreLearnMapData(contentType, params) {
    let component = this;
    let searchService = component.get('searchService');
    switch (contentType) {
    case 'course':
      return searchService.searchCoursesWithCounts('*', params);
    case 'unit':
      return searchService.searchUnitsWithCounts('*', params);
    case 'lesson':
      return searchService.searchLessonsWithCounts('*', params);
    case 'collection':
      return searchService.searchCollectionsWithCounts('*', params);
    case 'assessment':
      return searchService.searchAssessmentsWithCounts('*', params);
    case 'resource':
      return searchService.searchResourcesWithCounts('*', params);
    case 'question':
      return searchService.searchQuestionsWithCounts('*', params);
    case 'rubric':
      return searchService.searchRubricsWithCounts('*', params);
    default:
      break;
    }
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
