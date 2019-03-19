import Ember from 'ember';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';
import { PLAYER_WINDOW_NAME, PLAYER_EVENT_SOURCE, ROLES } from 'gooru-web/config/config';
import { getEndpointUrl } from 'gooru-web/utils/endpoint-config';
import ModalMixin from 'gooru-web/mixins/modal';

export default Ember.Component.extend(ModalMixin, {

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
    if (component.get('previewContentType') === 'assessment') {
      component.fetchAssessment();
    } else {
      component.fetchCollection();
    }
    component.$('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    //Action triggered when click toggle answer
    onToggleAnswer() {
      const component = this;
      component.toggleProperty('isShowCorrectAnswer');
    },

    //Action triggered when close preview pullup
    onClosePullUp() {
      const component = this;
      component.closePullUp();
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
        playerURL += `/${contentId}?source=${
          PLAYER_EVENT_SOURCE.RGO
        }`;
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
   * @property {Boolean} isShowCorrectAnswer
   */
  isShowCorrectAnswer: true,

  /**
   * @property {Boolean} isQuestionAvailable
   */
  isQuestionAvailable: Ember.computed.alias('previewContent.questionCount'),

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

  //--------------------------------------------------------------------------
  // Methods

  /**
   * Function to animate the  pullup from bottom to top
   */
  openPullUp() {
    let component = this;
    component.$().animate(
      {
        top: '10%'
      },
      400
    );
  },

  /**
   * Method to close pullup
   */
  closePullUp() {
    let component = this;
    component.$().animate(
      {
        top: '100%'
      },
      400,
      function() {
        component.set('showPullUp', false);
      }
    );
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
    })
      .then(({assessment}) => {
        if (!component.isDestroyed) {
          component.set('previewContent', assessment);
        }
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
    })
      .then(({collection}) => {
        if (!component.isDestroyed) {
          component.set('previewContent', collection);
        }
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
  }
});
