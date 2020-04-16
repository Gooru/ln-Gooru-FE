import Ember from 'ember';
import { toLocal } from 'gooru-web/utils/utils';
import Context from 'gooru-web/models/result/context';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';
import { ASSESSMENT_SHOW_VALUES } from 'gooru-web/config/config';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: [
    'reports',
    'backdrop-pull-ups',
    'pull-up-dca-student-collection-report'
  ],

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
   * @requires {Ember.Service} session management
   */
  session: Ember.inject.service('session'),

  /**
   * @requires {AssessmentService} Service to retrieve an assessment
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  /**
   * @requires {CollectionService} Service to retrieve a collection
   */
  collectionService: Ember.inject.service('api-sdk/collection'),

  /**
   * @property {Ember.Service} Service to update analytics report.
   */
  analyticsService: Ember.inject.service('api-sdk/analytics'),

  // -------------------------------------------------------------------------
  // Properties

  useSession: false,

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
   * @property {boolean}showAttempts
   */
  showAttempts: false,

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

  /**
   * @property {[]}
   */
  attempts: Ember.computed('assessmentResult.totalAttempts', function() {
    return this.getAttemptList();
  }),

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
  // Actions

  actions: {
    closeAll: function() {
      this.sendAction('onClosePullUp');
    },
    /**
     * Action triggered when the user close the pull up.
     **/
    onPullUpClose(isCloseAll) {
      this.closePullUp(isCloseAll);
    },

    /**
     * Action triggered when update question score
     */
    onUpdateQuestionScore: function(data) {
      this.updateQuestionScore(data);
    },

    /**
     * Open the Open ended question summary report
     * @function actions:viewOEReport
     * @param questionId {String}
     */
    viewOEReport: function(questionId) {
      let component = this;
      const context = component.getContext(component.get('reportData'));
      const sessionId = component.get('assessmentResult.sessionId');
      const freeResponseContextParams = {
        collectionId: context.get('collectionId'),
        collectionType: context.get('collectionType'),
        studentId: context.get('userId'),
        classId: context.get('classId'),
        sessionId: sessionId,
        questionId,
        role: context.get('isTeacher') ? 'teacher' : 'student'
      };
      component.set('showOpenEndedPullup', true);
      component.set('freeResponseContextParams', freeResponseContextParams);
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
   * Functionto triggered once when the component element is first rendered.
   */
  didInsertElement() {
    this.openPullUp();
    this.showStudentReport();
  },

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

  closePullUp(isCloseAll) {
    let component = this;
    component.$().animate(
      {
        top: '100%'
      },
      400,
      function() {
        component.set('showPullUp', false);
        if (isCloseAll) {
          component.sendAction('onClosePullUp', isCloseAll);
        }
      }
    );
  },

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
    component.getDcaStudentCollectionReport(reportData);
  },

  /**
   * @function  get collection summary report by student
   */
  getDcaStudentCollectionReport(params) {
    let component = this;
    component.set('isReportLoading', true);
    const context = component.getContext(params);
    const userId = context.get('userId');
    const collectionId = context.get('collectionId');
    const collectionType = context.get('collectionType');
    const classId = context.get('classId');
    const activityDate = context.get('activityDate');
    const sessionId = context.get('studentPerformance.sessionId');
    const type = params.type || 'collection';
    const isCollection = type === 'collection';
    const isSuggestedCollection = component.get('isSuggestedCollection');
    let pathId;
    if (isSuggestedCollection) {
      pathId = params.collection.performance.pathId;
    }
    const collectionPromise = isCollection
      ? component.get('collectionService').readCollection(params.collectionId)
      : component.get('assessmentService').readAssessment(params.collectionId);
    return Ember.RSVP.hashSettled({
      collection: collectionPromise,
      profile:
        context.userId !== 'anonymous'
          ? component.get('profileService').readUserProfile(context.userId)
          : {}
    }).then(function(hash) {
      component.set(
        'profile',
        hash.profile.state === 'fulfilled' ? hash.profile.value : null
      );
      component.set(
        'collection',
        hash.collection.state === 'fulfilled' ? hash.collection.value : null
      );
      const analyticsService = component.get('analyticsService');
      const performanceSummaryPromise = component.get('useSession')
        ? analyticsService.getDCAPerformanceBySessionId(
          userId,
          classId,
          collectionId,
          collectionType,
          sessionId
        )
        : analyticsService.findResourcesByCollectionforDCA(
          sessionId,
          collectionId,
          classId,
          userId,
          collectionType,
          !isSuggestedCollection ? activityDate : null,
          isSuggestedCollection ? pathId : null
        );
      performanceSummaryPromise.then(function(assessmentResult) {
        component.setAssessmentResult(assessmentResult);
      });
    });
  },

  setAssessmentResult: function(assessmentResult, session) {
    const component = this;
    const collection = component.get('collection');
    const totalAttempts = component.get('completedSessions.length');
    assessmentResult.merge(collection);
    assessmentResult.set('totalAttempts', totalAttempts);
    let submittedAt =
      session && session.eventTime
        ? toLocal(session.eventTime)
        : component.get('reportData.activityDate') || null;
    assessmentResult.set('submittedAt', submittedAt);
    component.set('assessmentResult', assessmentResult);
    component.set('isReportLoading', false);
    component.set('isLoading', false);
  },

  /**
   * Get the attempts list
   * @param params
   * @returns {Context}
   */
  getAttemptList: function() {
    var attempts = [];
    var totalAttempts = this.get('assessmentResult.totalAttempts');

    for (; totalAttempts > 0; totalAttempts--) {
      attempts.push({
        label: totalAttempts,
        value: totalAttempts
      });
    }
    return attempts;
  },

  /**
   * Get the player context
   * @param params
   * @returns {Context}
   */
  getContext: function(params) {
    let userId = params.userId;
    const collectionId = params.collectionId;
    return Context.create({
      collectionType: params.type,
      userId: userId,
      collectionId: collectionId,
      classId: params.classId,
      activityDate: params.activityDate,
      studentPerformance: params.studentPerformance
    });
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
  },

  /**
   * @function buildQuestionScoreUpdatePayLoad
   * Method to build question score updated layout from current version
   */
  buildQuestionScoreUpdatePayLoad: function(questionScoreUpdateData) {
    let component = this;
    let context = component.getContext(component.get('reportData'));
    let updateData = Ember.Object.create({
      student_id: context.get('userId'),
      session_id: context.get('sessionId'),
      collection_id: context.get('collectionId'),
      class_id: context.get('classId'),
      collection_type: context.get('collectionType'),
      resources: questionScoreUpdateData,
      content_source: 'dca'
    });
    return updateData;
  }
});
