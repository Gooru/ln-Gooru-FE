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
    onSuggestContent(collection) {
      const component = this;
      const activityContentType = component.get('activityContentType');
      component.sendAction('onSuggestContent', collection, activityContentType);
    },

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
    let competencyCode = component.get('learningMapData.gutCode');
    let activityContents = component.get('activityContents');
    let activityContentType =
      contentType || component.get('activityContentType');
    let startAt = component.get('startAt');
    let length = component.get('length');
    let filter = {
      'flt.gutCode': competencyCode
    };
    if (
      activityContentType === 'course' ||
      activityContentType === 'unit' ||
      activityContentType === 'lesson'
    ) {
      filter = {
        'flt.relatedGutCode': competencyCode
      };
    }
    let params = {
      page: startAt / length,
      pageSize: length,
      filters: filter
    };
    component
      .loadingMoreLearnMapData(activityContentType, params)
      .then(loadMoreLearningMapData => {
        component.set(
          'activityContents',
          activityContents.concat(loadMoreLearningMapData)
        );
        component.set('offsetCount', component.get('startAt'));
      });

    component.set('startAt', startAt + length);
    component.set('isLoading', false);
  },

  loadingMoreLearnMapData(contentType, params) {
    let component = this;
    let searchService = component.get('searchService');
    switch (contentType) {
    case 'course':
      return searchService.searchCourses('*', params);
    case 'unit':
      return searchService.searchUnits('*', params);
    case 'lesson':
      return searchService.searchLessons('*', params);
    case 'collection':
      return searchService.searchCollections('*', params);
    case 'assessment':
      return searchService.searchAssessments('*', params);
    case 'resource':
      return searchService.searchResources('*', params);
    case 'question':
      return searchService.searchQuestions('*', params);
    case 'rubric':
      return searchService.searchRubrics('*', params);
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
    component.set('offsetCount', 0);
  }
});
