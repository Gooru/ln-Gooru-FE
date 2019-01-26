import Ember from 'ember';
import { PLAYER_EVENT_SOURCE } from 'gooru-web/config/config';
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['signature-content-container'],

  // -------------------------------------------------------------------------
  // Dependencies
  searchService: Ember.inject.service('api-sdk/search'),

  taxonomyService: Ember.inject.service('api-sdk/taxonomy'),

  assessmentService: Ember.inject.service('api-sdk/assessment'),

  collectionService: Ember.inject.service('api-sdk/collection'),

  // -------------------------------------------------------------------------
  // Properties
  competency: null,

  standardCode: Ember.computed.alias('competency.competencyCode'),

  signatureContent: Ember.Object.create({}),

  showSignatureAssessment: false,

  content: null,

  frameworkCode: Ember.computed('standardCode', function() {
    let component = this;
    let code = component.parseCode();
    let frameWorkCode = code.objectAt(0).split(/[ .]+/);
    return frameWorkCode.objectAt(0);
  }),

  courseId: Ember.computed('standardCode', function() {
    let component = this;
    let code = component.parseCode();
    return code.objectAt(1);
  }),

  subjectId: Ember.computed('standardCode', function() {
    let component = this;
    let code = component.parseCode();
    return code.objectAt(0);
  }),

  /**
   * @property {boolean} flag for determining unlimited behaviour
   */
  unlimited: Ember.computed.equal('content.attempts', -1),

  collectionType: Ember.computed('showSignatureAssessment', function() {
    let component = this;
    let showSignatureAssessment = component.get('showSignatureAssessment');
    return showSignatureAssessment ? 'assessment' : 'collection';
  }),

  /**
   * @property {String} source value when playing a collection/assessment
   */
  source: PLAYER_EVENT_SOURCE.MASTER_COMPETENCY,

  init() {
    let component = this;
    component._super(...arguments);
    component.fetchLearningMapsContent();
    component.fetchCodes();
  },

  fetchCodes() {
    // let component = this;
    // let frameworkId = component.get('frameworkCode');
    // let courseId = component.get('courseId');
    // let domainId = component.get('competency.domainCode');
    // let subjectId = component.get('subjectId');
    // return Ember.RSVP.hash({
    //   competencyCodes: component
    //     .get('taxonomyService')
    //     .fetchCodes(frameworkId, subjectId, courseId, domainId)
    // }).then(({ competencyCodes }) => {
    //
    // });
  },

  /**
   * @function fetchLearningMapsContent
   * Method to fetch learning maps content
   */
  fetchLearningMapsContent() {
    let component = this;
    let searchService = component.get('searchService');
    let competencyCode = component.get('standardCode');
    let filters = {
      isDisplayCode: true
    };
    return Ember.RSVP.hash({
      learningMapData: searchService.fetchLearningMapsContent(
        competencyCode,
        filters
      )
    }).then(({ learningMapData }) => {
      let signatureContentList = learningMapData.signatureContents;
      let showSignatureAssessment =
        component.get('showSignatureAssessment') &&
        signatureContentList.assessments.length > 0;
      component.set('showSignatureAssessment', showSignatureAssessment);
      let signatureContent = showSignatureAssessment
        ? signatureContentList.assessments
        : signatureContentList.collections;
      let content = signatureContent.objectAt(0);
      if (content) {
        component.set('signatureContent', content);
        component.fetchContentSettings(content.id);
      }
    });
  },

  fetchContentSettings(contentId) {
    let component = this;
    let collectionType = component.get('collectionType');
    let contentPromise = null;
    if (collectionType === 'assessment') {
      contentPromise = component
        .get('assessmentService')
        .readAssessment(contentId);
    } else {
      contentPromise = component
        .get('collectionService')
        .readCollection(contentId);
    }
    return Ember.RSVP.hash({
      content: contentPromise
    }).then(({ content }) => {
      component.set('content', content);
    });
  },

  parseCode() {
    let competencyCode = this.get('standardCode');
    return competencyCode.split(/[ -]+/);
  }
});
