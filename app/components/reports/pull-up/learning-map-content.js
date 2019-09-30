import Ember from 'ember';

export default Ember.Component.extend({
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
    }
  },
  loadActivityContentData(contentType) {
    let component = this;
    component.set('isLoading', true);
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
    component.set(
      'activityContents',
      activityContents.concat(activityContentData)
    );
    component.set('activityTotalHitCount', activityTotalHitCount);
    component.set('startAt', startAt + length);
    component.set('isLoading', false);
  }
});
