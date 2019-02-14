import Ember from 'ember';
import {
  PLAYER_EVENT_SOURCE,
  GOORU_DEFAULT_FRAMEWORK,
  MICRO_COMPETENCY_CODE_TYPES
} from 'gooru-web/config/config';
import {
  getSubjectId,
  getDomainId,
  getCourseId
} from 'gooru-web/utils/taxonomy';
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['signature-content-container'],

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {service} searchService
   */
  searchService: Ember.inject.service('api-sdk/search'),
  /**
   * @property {service} taxonomyService
   */
  taxonomyService: Ember.inject.service('api-sdk/taxonomy'),
  /**
   * @property {service} assessmentService
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),
  /**
   * @property {service} collectionService
   */
  collectionService: Ember.inject.service('api-sdk/collection'),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Object} competency
   */
  competency: null,

  /**
   * @property {String} standardCode
   */
  standardCode: Ember.computed.alias('competency.competencyCode'),

  /**
   * @property {Object} signatureContent
   */
  signatureContent: null,

  /**
   * @property {boolean} showSignatureAssessment
   */
  showSignatureAssessment: false,

  /**
   * @property {Object} content
   */
  content: null,

  /**
   * @property {Array} prerequisites
   */
  prerequisites: null,

  /**
   * @property {Array} microCompetencies
   */
  microCompetencies: null,

  /**
   * @property {boolean} isLoading
   */
  isLoading: false,

  /**
   * @property {number} domainId
   */
  domainId: Ember.computed('standardCode', function() {
    let code = this.get('standardCode');
    return getDomainId(code);
  }),

  /**
   * @property {number} subjectId
   */
  subjectId: Ember.computed('standardCode', function() {
    let code = this.get('standardCode');
    return getSubjectId(code);
  }),

  /**
   * @property {number} courseId
   */
  courseId: Ember.computed('standardCode', function() {
    let code = this.get('standardCode');
    return getCourseId(code);
  }),

  /**
   * @property {boolean} flag for determining unlimited behaviour
   */
  unlimited: Ember.computed.equal('content.attempts', -1),

  /**
   * @property {String} collectionType
   */
  collectionType: Ember.computed('showSignatureAssessment', function() {
    let component = this;
    let showSignatureAssessment = component.get('showSignatureAssessment');
    return showSignatureAssessment ? 'assessment' : 'collection';
  }),

  /**
   * @property {String} source value when playing a collection/assessment
   */
  source: PLAYER_EVENT_SOURCE.MASTER_COMPETENCY,

  /**
   * competency  change will call the function
   */
  onChangeCompetency: Ember.observer('competency', function() {
    let component = this;
    component.loadData();
  }),

  init() {
    let component = this;
    component._super(...arguments);
    component.loadData();
  },

  loadData() {
    let component = this;
    component.fetchLearningMapsContent();
    component.fetchCodes();
  },

  /**
   * @function fetchCodes
   * Method to fetch all competency code for domain
   */
  fetchCodes() {
    let component = this;
    let courseId = component.get('courseId');
    let domainId = component.get('domainId');
    let subjectId = component.get('subjectId');
    let frameworkId = GOORU_DEFAULT_FRAMEWORK;
    return Ember.RSVP.hash({
      competencyCodes: component
        .get('taxonomyService')
        .fetchCodes(frameworkId, subjectId, courseId, domainId)
    }).then(({ competencyCodes }) => {
      let microCompetencies = this.filterMicroCompetency(competencyCodes);
      component.set('microCompetencies', microCompetencies);
    });
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
    component.set('isLoading', true);
    return Ember.RSVP.hash({
      learningMapData: searchService.fetchLearningMapsContent(
        competencyCode,
        filters
      )
    }).then(({ learningMapData }) => {
      component.set('learningMapData', learningMapData);
      component.checkPrerequisiteCompetencyStatus(
        learningMapData.prerequisites
      );
      let signatureContentList = learningMapData.signatureContents;
      let showSignatureAssessment =
        component.get('showSignatureAssessment') &&
        signatureContentList.assessments.length > 0;
      component.set('showSignatureAssessment', showSignatureAssessment);
      let signatureContent = showSignatureAssessment
        ? signatureContentList.assessments
        : signatureContentList.collections;
      let content = signatureContent.objectAt(0);
      component.set('isLoading', false);
      if (content) {
        component.set('signatureContent', content);
        component.fetchContentSettings(content.id);
      }
    });
  },

  /**
   * @function checkPrerequisiteCompetencyStatus
   * Method to check prerequisite competency status
   */
  checkPrerequisiteCompetencyStatus(prerequisites) {
    let component = this;
    let domainCompetencyList = component.get(
      'domainCompetencyList.competencies'
    );
    if (prerequisites && domainCompetencyList) {
      prerequisites.forEach(competency => {
        let filteredCompetency = domainCompetencyList.findBy(
          'competencyCode',
          competency.id
        );
        let status = filteredCompetency ? filteredCompetency.status : 0;
        competency.status = status;
      });
      component.set('prerequisites', prerequisites);
    }
  },

  /**
   * @function fetchContentSettings
   * Method to fetch content setting
   */
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

  /**
   * @function filterMicroCompetency
   * Method to filter micro competency
   */
  filterMicroCompetency(codes) {
    let regex = new RegExp(this.get('standardCode'));
    let microCompetencies = codes.filter(function(code) {
      return (
        regex.test(code.id) &&
        MICRO_COMPETENCY_CODE_TYPES.contains(code.codeType)
      );
    });
    return microCompetencies;
  }
});
