import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['competency-content-report'],

  // -------------------------------------------------------------------------
  // Dependencies
  competencyService: Ember.inject.service('api-sdk/competency'),

  searchService: Ember.inject.service('api-sdk/search'),

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    let component = this;
    component.set('learningMapData', null);
    component.loadCompetencyPerformanceData();
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Action triggered when click global view
     */
    onToggleCompetencyInfoView() {
      let component = this;
      if (!component.get('isShowGlobalInfo')) {
        component.loadLearningMapsCompetencyContent();
      }
      component.toggleProperty('isShowGlobalInfo');
    },

    /**
     * Action triggered when click on a content type
     */
    onSelectActivityContent(contentType) {
      let component = this;
      component.set('activityContentType', contentType);
      component.loadActivityContentData(contentType);
      component.set('isShowActivityPullup', true);
    },

    /**
     * Action triggered when click show more activity
     */
    onClickShowMoreActivity() {
      let component = this;
      component.loadActivityContentData();
    },

    onResetPullUpData() {
      let component = this;
      component.resetActivityContentData();
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function loadCompetencyPerformanceData
   * Method to load individual competency performance of the user
   */
  loadCompetencyPerformanceData() {
    let component = this;
    return Ember.RSVP.hash({
      collectionPerformances: component.fetchUserCompetencyPerformance()
    }).then(({ collectionPerformances }) => {
      component.set('collectionPerformances', collectionPerformances);
    });
  },

  /**
   * @function loadLearningMapsCompetencyContent
   * Method to load competency content from learning maps table
   */
  loadLearningMapsCompetencyContent() {
    let component = this;
    return Ember.RSVP.hash({
      learningMapData: component.fetchLearningMapsCompetencyContent()
    }).then(({ learningMapData }) => {
      return component.set('learningMapData', learningMapData);
    });
  },

  /**
   * @function fetchUserCompetencyPerformance
   * Method to fetch competency performance of an user
   */
  fetchUserCompetencyPerformance() {
    let component = this;
    let competencyService = component.get('competencyService');
    let userId = component.get('userId');
    let competencyCode = component.get('competency.competencyCode');
    return new Ember.RSVP.resolve(
      competencyService.getUserPerformanceCompetencyCollections(
        userId,
        competencyCode
      )
    );
  },

  /**
   * @function fetchLearningMapsCompetencyContent
   * Method to fetch learning maps competency content from learning maps table
   */
  fetchLearningMapsCompetencyContent() {
    let component = this;
    let competencyCode = component.get('competency.competencyCode');
    let startAt = component.get('startAt');
    let length = component.get('length');
    let searchService = component.get('searchService');
    let filters = {
      startAt,
      length,
      isCrosswalk: false
    };
    return new Ember.RSVP.resolve(
      searchService.fetchLearningMapsCompetencyContent(competencyCode, filters)
    );
  },

  /**
   * @function loadActivityContentData
   * Method to load activity content data
   */
  loadActivityContentData(contentType) {
    let component = this;
    component.set('isLoading', true);
    let activityContentType =
      contentType || component.get('activityContentType');
    let activityContents = component.get('activityContents');
    let startAt = component.get('startAt');
    let length = component.get('length');
    component.loadLearningMapsCompetencyContent().then(() => {
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
    });
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
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Array} collectionPerformances
   */
  collectionPerformances: Ember.A([]),

  /**
   * @property {Boolean} isShowGlobalInfo
   */
  isShowGlobalInfo: false,

  /**
   * @property {Boolean} isShowActivityPullup
   */
  isShowActivityPullup: false,

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

  /**
   * @property {Number} activityTotalHitCount
   */
  activityTotalHitCount: 0,

  /**
   * @property {Boolean} isLoading
   */
  isLoading: false,

  /**
   * @property {Boolean} isStudent
   */
  isStudent: false,

  showSignatureAssessment: Ember.computed('competency', function() {
    let component = this;
    return component.get('competency.showSignatureAssessment');
  }),

  onCompetencyChange: Ember.observer('competency', function() {
    let component = this;
    component.set('learningMapData', null);
    let showSignatureAssessment = component.get(
      'competency.showSignatureAssessment'
    );
    component.set('showSignatureAssessment', showSignatureAssessment);
    component.loadCompetencyPerformanceData();
  })
});
