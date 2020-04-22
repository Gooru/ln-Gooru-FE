import Ember from 'ember';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';
import { ASSESSMENT_SHOW_VALUES } from 'gooru-web/config/config';

export default Ember.Mixin.create({
  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service('api-sdk/class'),

  /**
   * @type {ProfileService} Service to retrieve profile information
   */
  profileService: Ember.inject.service('api-sdk/profile'),

  /**
   * @requires {AssessmentService} Service to retrieve an assessment
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  /**
   * @requires {CollectionService} Service to retrieve a collection
   */
  collectionService: Ember.inject.service('api-sdk/collection'),

  /**
   * @requires {Ember.Service} session management
   */
  session: Ember.inject.service('session'),

  /**
   * @property {Ember.Service} Service to update analytics report.
   */
  analyticsService: Ember.inject.service('api-sdk/analytics'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered when the user close the pull up.
     **/
    onPullUpClose(closeAll) {
      this.closePullUp(closeAll);
    },

    /**
     * Action triggered when update question score
     */
    onUpdateQuestionScore: function(data) {
      this.updateQuestionScore(data);
    },

    /**
     * Selects Performance Option or not
     * @function actions:selectPerformanceOption
     */
    selectPerformanceOption: function(showPerformance) {
      if (this.get('isTeacher') || !this.get('isAnswerKeyHidden')) {
        this.set('showPerformance', showPerformance);
      }
    }
  },

  // -------------------------------------------------------------------------
  // Events

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

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Indicates the status of the spinner
   * @property {Boolean}
   */
  isLoading: false,

  /**
   * Indicates the status of the spinner for until report API is Load
   * @property {Boolean}
   */
  isReportLoading: false,

  /**
   * own report or  teacher report page  diffrentiate
   * @property {Boolean}
   */
  ownReport: false,

  /**
   * @property {AssessmentResult}
   */
  assessmentResult: null,

  /**
   * @property {UserSession[]}
   */
  completedSessions: [],

  /**
   * @property {collections[]}
   */
  collections: Ember.computed('assessmentResult', function() {
    let component = this;
    if (component.get('assessmentResult')) {
      return component.get('assessmentResult.collection');
    }
  }),

  /**
   * @type {JSON}
   * Property to store list of skipped rescope content
   */
  skippedContents: null,

  /**
   * @type {Boolean}
   * Property to toggle checkbox visibility
   */
  isChecked: false,

  showPullUp: false,

  /**
   * @property {Boolean}
   * Is teacher accessing the report or not
   */
  isTeacher: Ember.computed('isStudent', function() {
    return !this.get('isStudent');
  }),

  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  tags: Ember.computed('collections.standards.[]', function() {
    let standards = this.get('collections.standards');
    if (standards) {
      standards = standards.filter(function(standard) {
        // Filter out learning targets (they're too long for the card)
        return !TaxonomyTagData.isMicroStandardId(standard.get('id'));
      });
      return TaxonomyTag.getTaxonomyTags(standards);
    }
  }),
  /**
   * This attribute will decide to show suggestion or not
   * @type {Boolean}
   */
  showSuggestion: false,

  /**
   * Maintains the state of show Suggestion pullup
   * @type {Boolean}
   */
  showSuggestionPullup: false,
  /**
   * Maintains the state of show OE Report pullup
   * @type {Boolean}
   */
  showOpenEndedPullup: false,

  /**
   * @property {JSON}
   */
  freeResponseContextParams: null,

  /**
   * @property {boolean} areAnswersHidden - Should answer results be hidden?
   */
  areAnswersHidden: Ember.computed(
    'collection.isAssessment',
    'collection.showFeedback',
    function() {
      return (
        this.get('collection.isAssessment') &&
        this.get('collection.showFeedback') === ASSESSMENT_SHOW_VALUES.NEVER
      );
    }
  ),

  /**
   * @property {boolean} isAnswerKeyHidden - Should the answer key be hidden?
   */
  isAnswerKeyHidden: Ember.computed(
    'collection.isAssessment',
    'collection.showKey',
    function() {
      return (
        this.get('collection.isAssessment') && !this.get('collection.showKey')
      );
    }
  ),

  /**
   * Return ordered non open ended questions array
   * @return {Ember.Array}
   */
  orderedQuestions: Ember.computed('assessmentResult', function() {
    if (this.get('assessmentResult')) {
      let resourceResultsOrdered = this.get(
        'assessmentResult.nonOpenEndedQuestionResults'
      );
      resourceResultsOrdered.sortBy('resource.order');
      return resourceResultsOrdered;
    }
  }),

  /**
   * check question list  has answered items
   * @type {Boolean}
   */
  hasAnsweredQuestions: Ember.computed('orderedQuestions', function() {
    if (this.get('orderedQuestions')) {
      let resourceResultsOrdered = this.get('orderedQuestions');
      let correctAnswers = resourceResultsOrdered.findBy('correct', true);
      let inCorrectAnswers = resourceResultsOrdered.findBy('correct', false);
      return !!(correctAnswers || inCorrectAnswers);
    } else {
      return false;
    }
  }),

  /**
   * Indicate if the table show the performance columns
   *
   * @property {Boolean}
   */
  showPerformance: true,

  /**
   * Update question score list
   * @return {Array} list of question scores need to be update.
   */
  listOfQuestions: Ember.A(),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Function to show the student report
   */
  showStudentReport() {
    let component = this;
    let reportData = component.get('reportData');
    component.set('isAssessment', reportData.type === 'assessment');
    component.set('isCollection', reportData.type === 'collection');
    component.set('isLoading', true);
    this.getStundentCollectionReport(reportData);
  },

  /**
   * @function updateQuestionScore
   * Method to update the question score
   */

  updateQuestionScore: function(questionScoreUpdateData) {
    let component = this;
    const context = component.getContext(component.get('reportData'));
    let data = component.buildQuestionScoreUpdatePayLoad(
      questionScoreUpdateData
    );
    let completedSessions = component.get('completedSessions');
    const totalSessions = completedSessions.length;
    const session = totalSessions ? completedSessions[totalSessions - 1] : null;
    if (session) {
      //collections has no session
      context.set('sessionId', session.sessionId);
      data.session_id = session.sessionId;
    }
    component
      .get('analyticsService')
      .updateQuestionScore(data)
      .then(() => {
        component
          .loadSession(session)
          .then(() => component.set('isChangeScoreEnabled', false));
      });
  },

  /**
   * @function loadSession
   * Method to load session from the reportData
   */
  loadSession: function(session) {
    const component = this;
    component.set('isLoading', true);
    const context = component.getContext(component.get('reportData'));
    if (session) {
      //collections has no session
      context.set('sessionId', session.sessionId);
    }
    const performanceService = component.get('performanceService');
    return performanceService
      .findAssessmentResultByCollectionAndStudent(context)
      .then(function(assessmentResult) {
        component.setAssessmentResult(assessmentResult, session);
      });
  }
});
