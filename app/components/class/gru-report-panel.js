import Ember from 'ember';
import { getBarGradeColor, toLocal } from 'gooru-web/utils/utils';
import Context from 'gooru-web/models/result/context';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';
import { CONTENT_TYPES, ASSESSMENT_SHOW_VALUES } from 'gooru-web/config/config';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['class', 'backdrop-pull-ups', 'gru-report-panel'],

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
   * @type {PerformanceService} Service to retrieve class performance summary
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * @type {CourseService} Service to retrieve course information
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @requires service:api-sdk/course-map
   */
  courseMapService: Ember.inject.service('api-sdk/course-map'),

  /**
   * @requires {Ember.Service} session management
   */
  session: Ember.inject.service('session'),

  /**
   * @requires {Ember.Service} Service to retrieve an assessment result
   */
  userSessionService: Ember.inject.service('api-sdk/user-session'),

  /**
   * @requires {AssessmentService} Service to retrieve an assessment
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  /**
   * @requires {CollectionService} Service to retrieve a collection
   */
  collectionService: Ember.inject.service('api-sdk/collection'),

  /**
   * @requires {LessonService} Service to retrieve a lesson
   */
  lessonService: Ember.inject.service('api-sdk/lesson'),

  /**
   * @property {Ember.Service} Service to update analytics report.
   */
  analyticsService: Ember.inject.service('api-sdk/analytics'),

  /**
   * @requires service:api-sdk/search
   */
  searchService: Ember.inject.service('api-sdk/search'),

  /**
   * @requires service:api-sdk/learner
   */
  learnerService: Ember.inject.service('api-sdk/learner'),

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
   * Indicates the status of suggestion  loading  is completed or not
   * @property {Boolean}
   */
  isSuggestionLoading: false,

  /**
   * switch between the course  and report page
   * @property {Boolean}
   */
  courseView: true,

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
   * @property {boolean} isShowAttempts
   */
  isShowAttempts: Ember.computed(
    'collections.isAssessment',
    'attempts',
    function() {
      const component = this;
      const attempts = component.get('attempts');
      const isAssessment = component.get('collections.isAssessment');
      return attempts.length > 1 && isAssessment;
    }
  ),

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
  attempts: Ember.computed.alias('completedSessions'),

  /**
   * calculate  the class average by student performance score as a width
   * @property {string}
   */
  studentAverage: Ember.computed('studentPerformance', function() {
    let component = this;
    let score = component.get('studentPerformance.score');
    return Ember.String.htmlSafe(`width: ${score}%;`);
  }),

  /**
   * @property {String} barColor
   * Computed property to know the color of the small bar
   */
  studentColorStyle: Ember.computed('studentPerformance', function() {
    let score = this.get('studentPerformance.score');
    this.set('studentColor', getBarGradeColor(score));
    return Ember.String.htmlSafe(
      `background-color: ${getBarGradeColor(score)};`
    );
  }),

  /**
   * calculate  the class average score as a width
   * @property {string}
   */
  collectionAverage: Ember.computed('assessmentResult', function() {
    let component = this;
    let score = component.get('assessmentResult.score');
    return Ember.String.htmlSafe(`width: ${score}%;`);
  }),

  /**
   * @property {String} barColor
   * Computed property to know the color of the small bar
   */
  collectionColorStyle: Ember.computed('assessmentResult', function() {
    let score = this.get('assessmentResult.score');
    this.set('classColor', getBarGradeColor(score));
    return Ember.String.htmlSafe(
      `background-color: ${getBarGradeColor(score)};`
    );
  }),

  showPullUp: false,

  /**
   * @property {Boolean}
   * Property to show/hide change score button
   */

  showChangeScore: Ember.computed.not('isArchivedClass'),

  /**
   * Indicates the visibility of change score button
   * @property {Boolean}
   */
  isChangeScoreEnabled: false,

  /**
   * @property {Boolean}
   * Is teacher accessing the report or not
   */
  isTeacher: Ember.computed('isStudent', function() {
    return !this.get('isStudent');
  }),

  /**
   * suggest count
   * @type {Number}
   */
  suggestResultCount: 0,

  /**
   * Maintains maximum number of search results
   * @type {Number}
   */
  maxSearchResult: 6,

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
   * defaultSuggestContentType
   * @type {String}
   */
  defaultSuggestContentType: 'collection',

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
   * @property {Boolean} isArchivedClass
   */
  isArchivedClass: Ember.computed.alias('class.isArchived'),

  /**
   * @property {Object} class
   */
  class: {},

  /**
   * @property {Object} visibleAttempt
   * Property to hold data of currently rendered report session
   */

  visibleAttempt: Ember.computed('assessmentResult', function() {
    const component = this;
    let completedSessions = component.get('completedSessions');
    let visibleAttempt = null;
    let assessmentResult = component.get('assessmentResult');
    if (completedSessions && assessmentResult.get('sessionId')) {
      visibleAttempt = completedSessions.findBy(
        'sessionId',
        assessmentResult.get('sessionId')
      );
    }
    return visibleAttempt;
  }),

  /**
   * Return ordered non open ended questions array
   * @return {Ember.Array}
   */
  orderedQuestions: Ember.computed('assessmentResult', function() {
    if (this.get('assessmentResult')) {
      let resourceResultsOrdered = this.get(
        'assessmentResult.nonOpenEndedQuestionResults'
      );
      resourceResultsOrdered.sort(function(a, b) {
        return Ember.get(a, 'question.order') - Ember.get(b, 'question.order');
      });

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
        courseId: context.get('courseId'),
        unitId: context.get('unitId'),
        lessonId: context.get('lessonId'),
        questionId,
        role: context.get('isTeacher') ? 'teacher' : 'student'
      };
      component.set('showOpenEndedPullup', true);
      component.set('freeResponseContextParams', freeResponseContextParams);
    },

    /**
     * Trigger when suggestion button got clicked
     */
    onOpenSuggestionPullup() {
      let component = this;
      let studentsSelectedForSuggest = Ember.A([]);
      let context = component.getContext(component.get('reportData'));
      let suggestContextParams = Ember.Object.create({
        classId: context.get('classId'),
        courseId: context.get('courseId'),
        unitId: context.get('unitId'),
        lessonId: context.get('lessonId'),
        collectionId: context.get('collectionId')
      });
      studentsSelectedForSuggest.pushObject(component.get('profile'));
      component.set('suggestContextParams', suggestContextParams);
      component.set('studentsSelectedForSuggest', studentsSelectedForSuggest);
      component.set('showSuggestionPullup', true);
    },

    onCloseSuggest() {
      // on close suggest callback
      return true;
    },

    onClosePullUp() {
      let component = this;
      component.set('showSuggestionPullup', false);
      component.set('showOpenEndedPullup', false);
      component.closePullUp(true);
    },

    //Action triggered when select a different session to bring up report
    onSelectAttempt(attemptData) {
      const component = this;
      if (!Ember.isEqual(attemptData, component.get('visibleAttempt'))) {
        component.loadSession(attemptData);
      }
    },

    /**
     * Selects Performance Option or not
     * @function actions:selectPerformanceOption
     */
    selectPerformanceOption: function(showPerformance) {
      if (this.get('isTeacher') || !this.get('isAnswerKeyHidden')) {
        this.set('showPerformance', showPerformance);
      }
    },

    /**
     * Action get triggered when change score button  clicked
     */
    onChangeScore: function() {
      this.get('listOfQuestions').clear();
      this.set('isChangeScoreEnabled', true);
    },

    /**
     * Action get triggered when change score was cancelled
     */
    onChangeScoreNotConfirm: function() {
      this.get('listOfQuestions').clear();
      this.set('isChangeScoreEnabled', false);
    },

    /**
     * Action get triggered when change score confirm button clicked
     */
    onChangeScoreConfirm: function() {
      let questionScoreUpdateData = this.get('listOfQuestions');
      if (questionScoreUpdateData.length > 0) {
        this.send('onUpdateQuestionScore', questionScoreUpdateData);
      } else {
        this.set('isChangeScoreEnabled', false);
      }
    }
  },

  // -------------------------------------------------------------------------
  // Events

  didRender() {
    this.handleAppContainerScroll();
  },
  didDestroyElement() {
    this.handleAppContainerScroll();
  },

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

  closePullUp(closeAll) {
    let component = this;
    component.$().animate(
      {
        top: '100%'
      },
      400,
      function() {
        component.set('showPullUp', false);
        if (closeAll) {
          component.sendAction('onClosePullUp');
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
    this.getStundentCollectionReport(reportData);
  },

  handleAppContainerScroll() {
    let activePullUpCount = Ember.$(document.body).find('.backdrop-pull-ups')
      .length;
    if (activePullUpCount > 0) {
      Ember.$(document.body).addClass('no-vertical-scroll');
    } else if (activePullUpCount === 0) {
      Ember.$(document.body).removeClass('no-vertical-scroll');
    }
  },
  /**
   * @function  get collection summary report by student
   */
  getStundentCollectionReport(params) {
    let component = this;
    component.set('currentClass', component.get('model'));
    component.set('courseView', false);
    component.set('isReportLoading', true);
    const context = component.getContext(params);
    const type = params.type || 'collection';
    const lessonPromise = context.get('courseId')
      ? component
        .get('lessonService')
        .fetchById(
          context.get('courseId'),
          context.get('unitId'),
          context.get('lessonId')
        )
      : null;
    const isCollection = type === 'collection';
    const collectionPromise = isCollection
      ? component.get('collectionService').readCollection(params.collectionId)
      : component.get('assessmentService').readAssessment(params.collectionId);
    let completedSessionsPromise = [];
    if (!params.sessionId) {
      completedSessionsPromise = isCollection
        ? []
        : context.get('classId')
          ? component.get('userSessionService').getCompletedSessions(context)
          : component.get('learnerService').fetchLearnerSessions(context);
    }
    return Ember.RSVP.hashSettled({
      collection: collectionPromise,
      completedSessions: completedSessionsPromise,
      lesson: lessonPromise,
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
      component.set(
        'completedSessions',
        hash.completedSessions.state === 'fulfilled'
          ? hash.completedSessions.value
          : null
      );
      if (!params.sessionId) {
        var completedSessions =
          hash.completedSessions.state === 'fulfilled'
            ? hash.completedSessions.value
            : null;
        const totalSessions = completedSessions.length;
        const session = totalSessions
          ? completedSessions[totalSessions - 1]
          : null;
        if (session) {
          //collections has no session
          context.set('sessionId', session.sessionId);
        }
      }
      if (context.get('classId')) {
        const performanceService = component.get('performanceService');
        return performanceService
          .findAssessmentResultByCollectionAndStudent(context)
          .then(function(assessmentResult) {
            component.setAssessmentResult(assessmentResult);
            if (!component.get('isStudent')) {
              component
                .get('courseMapService')
                .getLessonInfo(
                  context.get('classId'),
                  context.get('courseId'),
                  context.get('unitId'),
                  context.get('lessonId'),
                  true,
                  context.get('userId')
                )
                .then(lesson => {
                  let collections = lesson.get('children');
                  let collection = collections.findBy(
                    'id',
                    context.get('collectionId')
                  );
                  // TODO: BE doesn't support suggestion for collection content type
                  if (
                    !collection.get('isSuggestedContent') &&
                    collection.get('format') !== CONTENT_TYPES.COLLECTION
                  ) {
                    component.set('showSuggestion', true);
                    component
                      .get('classService')
                      .readClassInfo(context.get('classId'))
                      .then(classData => {
                        component.set('class', classData);
                        component.loadSuggestion();
                      });
                  }
                });
            }
          });
      } else {
        const learnerService = component.get('learnerService');
        return learnerService
          .fetchCollectionPerformance(context)
          .then(function(assessmentResult) {
            component.setAssessmentResult(assessmentResult);
          });
      }
    });
  },

  setAssessmentResult: function(assessmentResult, session) {
    const component = this;
    const collection = component.get('collection');
    const totalAttempts = component.get('completedSessions.length');
    assessmentResult.merge(collection);
    assessmentResult.set('totalAttempts', totalAttempts);
    if (session && session.eventTime) {
      assessmentResult.set('submittedAt', toLocal(session.eventTime));
    }
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
    const component = this;
    let attempts = Ember.A([]);
    let completedSessions = component.get('completedSessions');
    if (completedSessions) {
      completedSessions.map(completedSession => {
        attempts.pushObject(completedSession);
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
    const courseId = params.courseId;
    const unitId = params.unitId;
    const lessonId = params.lessonId;
    const sessionId = params.sessionId;

    return Context.create({
      collectionType: params.type,
      userId: userId,
      collectionId: collectionId,
      courseId: courseId,
      classId: params.classId,
      unitId: unitId,
      lessonId: lessonId,
      sessionId: sessionId
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
      unit_id: context.get('unitId'),
      collection_id: context.get('collectionId'),
      class_id: context.get('classId'),
      collection_type: context.get('collectionType'),
      lesson_id: context.get('lessonId'),
      course_id: context.get('courseId'),
      resources: questionScoreUpdateData,
      content_source: 'coursemap' // TO-DO Have to replace actual content source, right now default set as coursemap
    });
    return updateData;
  },

  loadSuggestion: function() {
    let component = this;
    component.set('isSuggestionLoading', true);
    let primaryLanguage = component.get('class.primaryLanguage');
    let collection = this.get('collections');
    let taxonomies = null;
    let tags = component.get('tags');
    if (tags) {
      taxonomies = tags.map(tag => {
        return tag.data.id;
      });
    }
    let maxSearchResult = component.get('maxSearchResult');
    let params = {
      pageSize: maxSearchResult,
      taxonomies: taxonomies,
      filters: {}
    };
    if (primaryLanguage) {
      params.filters['flt.languageId'] = primaryLanguage;
    }

    let term =
      taxonomies != null && taxonomies.length > 0
        ? '*'
        : collection.get('title');
    component
      .get('searchService')
      .searchCollections(term, params)
      .then(collectionSuggestResults => {
        if (!component.isDestroyed) {
          // To show appropriate suggest count, check is their any suggest found in assessment type if count is less than.
          let collectionSuggestCount = collectionSuggestResults.length;
          if (collectionSuggestCount >= maxSearchResult) {
            component.set('isSuggestionLoading', false);
            component.set('suggestResultCount', maxSearchResult);
          } else {
            component
              .get('searchService')
              .searchAssessments(term, params)
              .then(assessmentSuggestResult => {
                if (!component.isDestroyed) {
                  let assessmentSuggestCount = assessmentSuggestResult.length;
                  let suggestCount =
                    assessmentSuggestCount + collectionSuggestCount;
                  if (
                    collectionSuggestCount === 0 &&
                    assessmentSuggestCount > 0
                  ) {
                    component.set('defaultSuggestContentType', 'assessment');
                  }
                  component.set('isSuggestionLoading', false);
                  component.set(
                    'suggestResultCount',
                    suggestCount >= maxSearchResult
                      ? maxSearchResult
                      : suggestCount
                  );
                }
              });
          }
        }
      });
  }
});
