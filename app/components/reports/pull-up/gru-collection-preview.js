import Ember from 'ember';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';
import {
  PLAYER_WINDOW_NAME,
  PLAYER_EVENT_SOURCE,
  ROLES,
  CONTENT_TYPES,
  ASSESSMENT_SHOW_VALUES
} from 'gooru-web/config/config';
import { getEndpointUrl } from 'gooru-web/utils/endpoint-config';
import ModalMixin from 'gooru-web/mixins/modal';
import PullUpMixin from 'gooru-web/mixins/reports/pull-up/pull-up-mixin';
import PortfolioMixin from 'gooru-web/mixins/reports/portfolio/portfolio-mixin';

export default Ember.Component.extend(ModalMixin, PullUpMixin, PortfolioMixin, {
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['preview', 'gru-collection-preview'],

  // -------------------------------------------------------------------------
  // Dependencies
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  collectionService: Ember.inject.service('api-sdk/collection'),

  session: Ember.inject.service('session'),

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    const component = this;
    component.openPullUp();
    component.loadPreviewContent();
    component.$('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    //Action triggered when click toggle answer
    onToggleAnswer() {
      const component = this;
      component.toggleProperty('isShowCorrectAnswer');
    },

    //Action triggered when play  content
    onPlayContent() {
      const component = this;
      let contentId = component.get('previewContentId');
      let playerContext = component.get('playerContext');
      let playerURL = `${getEndpointUrl()}/player`;
      if (playerContext) {
        let classId = playerContext.get('classId');
        let courseId = playerContext.get('courseId');
        let unitId = playerContext.get('unitId');
        let lessonId = playerContext.get('lessonId');
        let contentType = component.get('previewContentType');
        playerURL += `/class/${classId}/course/${courseId}/unit/${unitId}/lesson/${lessonId}/collection/${contentId}?role=teacher&type=${contentType}&source=${PLAYER_EVENT_SOURCE.RGO}`;
      } else {
        playerURL += `/${contentId}?source=${PLAYER_EVENT_SOURCE.RGO}`;
      }
      window.open(playerURL, PLAYER_WINDOW_NAME);
    },

    //Action triggered when click print preview
    onPrintPreview() {
      window.print();
    },

    //Action triggered when click remix
    onRemixContent() {
      const component = this;
      component.remixContent();
    },

    onToggleAttemptsList() {
      this.$('.activity-attempts-container .all-attempts').slideToggle();
    }
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Boolean} showPullUp
   */
  showPullUp: false,

  /**
   * @property {UUID} previewContentId
   */
  previewContentId: null,

  /**
   * @property {String} previewContentType
   */
  previewContentType: null,

  /**
   * @property {Boolean} playContent
   */
  playContent: true,

  /**
   * @property {Boolean} isShowCorrectAnswer
   */
  isShowCorrectAnswer: Ember.computed('isTeacher', function() {
    const component = this;
    return component.get('isTeacher') || true;
  }),

  showPrintPreview: true,
  /**
   * @property {Boolean} isEnableToggleAnswer
   */
  isEnableToggleAnswer: Ember.computed(
    'previewContent.questionCount',
    'isTeacher',
    function() {
      const component = this;
      let isTeacher = component.get('isTeacher');
      let questionCount = component.get('previewContent.questionCount');
      return questionCount && isTeacher;
    }
  ),

  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  taxonomyTags: Ember.computed('previewContent.standards.[]', function() {
    var standards = this.get('previewContent.standards');
    if (standards) {
      standards = standards.filter(function(standard) {
        // Filter out learning targets (they're too long for the card)
        return !TaxonomyTagData.isMicroStandardId(standard.get('id'));
      });
    }
    return TaxonomyTag.getTaxonomyTags(standards);
  }),

  /**
   * @property {Object} playerContext
   */
  playerContext: null,

  /**
   * @property {Boolean} isTeacher
   */
  isTeacher: Ember.computed.equal('session.role', ROLES.TEACHER),

  /**
   * @property {Boolean} isStudent
   */
  isStudent: Ember.computed.equal('session.role', ROLES.STUDENT),

  /**
   * @property {Boolean} isAnonymous
   */
  isAnonymous: Ember.computed.alias('session.isAnonymous'),

  /**
   * @property {Boolean} isRemixableContent
   */
  isRemixableContent: false,

  /**
   * @property {Boolean} isExternalContent
   */
  isExternalContent: Ember.computed('previewContentType', function() {
    const component = this;
    let previewContentType = component.get('previewContentType');
    return previewContentType.includes('external');
  }),

  userId: Ember.computed(function() {
    return this.get('session.userId');
  }),

  contentId: Ember.computed.alias('previewContentId'),

  isReportView: false,

  isAssessment: Ember.computed('previewContentType', function() {
    const component = this;
    return component
      .get('previewContentType')
      .includes(CONTENT_TYPES.ASSESSMENT);
  }),

  isCollection: Ember.computed('previewContentType', function() {
    const component = this;
    return component
      .get('previewContentType')
      .includes(CONTENT_TYPES.COLLECTION);
  }),

  isShowReportCorrectAnswer: Ember.computed(
    'previewContentType',
    'previewContent',
    function() {
      const component = this;
      const previewContent = component.get('previewContent');
      return (
        previewContent.get('showFeedback') !== ASSESSMENT_SHOW_VALUES.NEVER
      );
    }
  ),

  //--------------------------------------------------------------------------
  // Methods

  loadPreviewContent() {
    const component = this;
    let previewContentType = component.get('previewContentType');
    let previewContentPromise = null;
    if (previewContentType === 'assessment') {
      previewContentPromise = component.fetchAssessment();
    } else if (previewContentType === 'collection') {
      previewContentPromise = component.fetchCollection();
    } else if (previewContentType === 'assessment-external') {
      previewContentPromise = component.fetchExternalAssessment();
    } else if (previewContentType === 'collection-external') {
      previewContentPromise = component.fetchExternalCollection();
    }
    if (component.get('isReportView')) {
      previewContentPromise.then(function() {
        //Method implemented in mixin
        component.loadActivityAttempts().then(function(activityAttempts) {
          if (activityAttempts.length) {
            component.loadActivityPerformance(activityAttempts.objectAt(0));
          }
        });
      });
    }
  },

  /**
   * @function fetchAssessment
   * Method to fetch assessment
   */
  fetchAssessment() {
    const component = this;
    const assessmentId = component.get('previewContentId');
    const assessmentService = component.get('assessmentService');
    return Ember.RSVP.hash({
      assessment: assessmentService.readAssessment(assessmentId)
    }).then(({ assessment }) => {
      if (!component.isDestroyed) {
        component.set('previewContent', assessment);
      }
      return assessment;
    });
  },

  /**
   * @function fetchCollection
   * Method to fetch collection
   */
  fetchCollection() {
    const component = this;
    const collectionId = component.get('previewContentId');
    const collectionService = component.get('collectionService');
    return Ember.RSVP.hash({
      collection: collectionService.readCollection(collectionId)
    }).then(({ collection }) => {
      if (!component.isDestroyed) {
        component.set('previewContent', collection);
      }
      return collection;
    });
  },

  /**
   * @function fetchExternalAssessment
   * Method to fetch an external assessment
   */
  fetchExternalAssessment() {
    const component = this;
    const externalAssessmentId = component.get('previewContentId');
    const assessmentService = component.get('assessmentService');
    return Ember.RSVP.hash({
      externalAssessment: assessmentService.readExternalAssessment(
        externalAssessmentId
      )
    }).then(({ externalAssessment }) => {
      if (!component.isDestroyed) {
        component.set('previewContent', externalAssessment);
      }
      return externalAssessment;
    });
  },

  /**
   * @function fetchExternalCollection
   * Method to fetch an external collection
   */
  fetchExternalCollection() {
    const component = this;
    const externalCollectionId = component.get('previewContentId');
    const collectionService = component.get('collectionService');
    return Ember.RSVP.hash({
      externalCollection: collectionService.readExternalCollection(
        externalCollectionId
      )
    }).then(({ externalCollection }) => {
      if (!component.isDestroyed) {
        component.set('previewContent', externalCollection);
      }
      return externalCollection;
    });
  },

  /**
   * @function remixContent
   * Method to remix a collection/assessment
   */
  remixContent() {
    const component = this;
    if (component.get('isAnonymous')) {
      component.send('showModal', 'content.modals.gru-login-prompt');
    } else {
      let previewContent = component.get('previewContent');
      let previewContentType = component.get('previewContentType');
      let remixModel = Ember.Object.create({
        content: previewContent
      });
      component.send(
        'showModal',
        `content.modals.gru-${previewContentType}-remix`,
        remixModel
      );
    }
  },

  parseActivityPerformance() {
    const component = this;
    let activityResources = component.get('previewContent.children');
    let activityResourcesPerformance = component.get(
      'activityPerformance.resourceResults'
    );
    activityResourcesPerformance.map(resourcePerformance => {
      if (!component.isDestroyed) {
        let resource = activityResources.findBy(
          'id',
          resourcePerformance.get('resourceId')
        );
        resource.set('userAnswer', resourcePerformance.get('userAnswer'));
        resource.set('answerObject', resourcePerformance.get('answerObject'));
        resource.set('reaction', resourcePerformance.get('reaction'));
        resource.set('timespent', resourcePerformance.get('timespent'));
        resource.set('score', resourcePerformance.get('score'));
        resource.set('answerStatus', resourcePerformance.get('answerStatus'));
      }
    });
  }
});
