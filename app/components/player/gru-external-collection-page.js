import Ember from 'ember';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';
import {CONTENT_TYPES, PLAYER_EVENT_SOURCE} from 'gooru-web/config/config';
import {generateUUID, validateTime} from 'gooru-web/utils/utils';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['gru-external-collection-page'],

  // -------------------------------------------------------------------------
  // Dependencies
  analyticsService: Ember.inject.service('api-sdk/analytics'),

  session: Ember.inject.service('session'),

  // -------------------------------------------------------------------------
  // Events


  /**
   * Observe the assessment change
   */
  collectionObserver: Ember.observer('assessment', function() {
    let component = this;
    console.log("observer call");
    component.resetProperties();
  }),
  didRender() {
    let component = this;
    component.timeValidator();
  },
  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Action triggered when click start
     */
    onStart() {
      let component = this;
      component.set('startTime', new Date().getTime());
      component.set('isStarted', true);
      let externalUrl = component.get('assessment.url');
      component.set('isDisableScoreEditor', false);
      if (externalUrl) {
        window.open(externalUrl, CONTENT_TYPES.EXTERNAL_ASSESSMENT);
      }
    },

    /**
     * Action triggered when click submit
     */
    onSubmit() {
      let component = this;
      component.set('isTimeEntered', true);
      component.set('stopTime', new Date().getTime());
      component.updateSelfReport();
    },

    /**
     * Action triggered when change score type
     */


    /**
     * Action triggered when click cancel
     */
    onCancel() {
      let component = this;
      component.redirectTo();
    }
  },

  timeValidator() {
    let component = this;
    component.$('.time').keyup(function() {
    let hours = component.get('hours');
    let mins = component.get('mins');
    component.set('isValidtime', validateTime(hours,mins));
    component.set('isTyping', true);
    });
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Boolean} isDisableScoreEditor
   */
  isDisableScoreEditor: true,

  /**
   * @property {Boolean} isTimeEntered
   */
  isTimeEntered: false,

  /**
   * @property {Boolean} isValidScore
   */
  isValidScore: false,

  isValidtime: null,

  isValidmins: null,

  /**
   * @property {String} isStarted
   */
  isStarted: 'null',

  /**
   * @property {String} timeZone
   */

  /**
   * @property {Boolean} isTyping
   */
  isHourTyping: false,
  isMinTyping:false,

  /**
   * @property {Number} startTime
   */
  startTime: 0,

  /**
   * @property {Number} stopTime
   */
  stopTime: 0,

  /**
   * @property {String} score
   */
  score: '',


  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function timeValidator
   * Method to validate entered score
   */


  /**
   * @function getDataParams
   * Method to get structured data params which needs to be pass with post API
   */
  getDataParams() {
    let component = this;
    let mapLocation = component.get('mapLocation');
    let score = component.get('hours') || null;
    let max_score = component.get('mins') || null;
    let context = mapLocation.get('context');
    let userId = component.get('session.userId');
    let dataParams = {
      score,
      max_score,
      user_id: userId,
      class_id: context.get('classId') || null,
      course_id: context.get('courseId') || null,
      unit_id: context.get('unitId') || null,
      lesson_id: context.get('lessonId') || null,
      collection_type: context.get('itemType') || null,
      external_collection_id: context.get('collectionId'),
      collection_id: context.get('collectionId'),
      session_id: generateUUID(),
      time_zone: component.get('timeZone'),
      partner_id: component.get('session.partnerId') || null,
      tenant_id: component.get('session.tenantId') || null,
      content_source: component.get('source') || null,
      path_id: context.get('pathId') || 0,
      path_type: context.get('pathType') || null,
      time_spent: component.roundMilliseconds(component.get('stopTime') - component.get('startTime')),
      evidence: [{TBD: 'True'}]
    };
    return dataParams;
  },

  /**
   * @function updateSelfReport
   * Method to update score of an external assessment
   */
  updateSelfReport() {
    let component = this;
    let analyticsService = component.get('analyticsService');
    let dataParams = component.getDataParams();
    let selfReportedPromise = analyticsService.studentSelfReporting(dataParams);
    component.set('score', '');
    Ember.RSVP.hash({
      selfReport: selfReportedPromise
    })
      .then(function() {
        component.set('score', component.getEnteredScore(dataParams));
      })
      .catch(function() {
        component.set('score', null);
      });

  },



  /**
   * @function roundMilliseconds
   * Method to round milliseconds
   */
  roundMilliseconds(milliseconds) {
    return milliseconds - milliseconds % 1000;
  },

  /**
   * @function getEnteredScore
   * Method to get entered score after update
   */
  getEnteredScore(dataParams) {
    let component = this;
    let isStarted = component.get('isStarted');
    let score = null;
    if (isStarted) {
      score =  `${dataParams.score} h ${dataParams.max_score} m`;
    }
    return score;
  },

  /**
   * @function resetProperties
   * Method to reset component Properties
   */
  resetProperties() {
    let component = this;
    this._super(...arguments);
    component.set('score', '');
    component.set('isTimeEntered', false);
    component.set('isStarted', 'null');
    component.set('isDisableScoreEditor',true);
    component.set('isValidScore', false);
    component.set('isValidtime', false);
    component.set('isValidmins', false);
    component.set('startTime', 0);
    component.set('stopTime', 0);
    component.set('isHourTyping', false);
    component.set('isMinTyping', false);
  },

  /**
   * Redirect to right path
   */
  redirectTo() {
    let component = this;
    let context = component.get('mapLocation.context');
    let source = component.get('source');
    if (context.get('classId') && source === PLAYER_EVENT_SOURCE.COURSE_MAP) {
      component.get('router').transitionTo(
        'student.class.course-map',
        context.get('classId'),
        {
          queryParams: {
            refresh: true
          }
        }
      );
    } else if (context.get('classId') && source === PLAYER_EVENT_SOURCE.DAILY_CLASS) {
      component.get('router').transitionTo(
        'student.class.class-activities',
        context.get('classId')
      );
    } else {
      component.get('router').transitionTo(
        'student.independent.course-map',
        context.get('courseId'),
        {
          queryParams: {
            refresh: true
          }
        }
      );
    }
  }
});
