import Ember from 'ember';
import { toLocal } from 'gooru-web/utils/utils';
import Context from 'gooru-web/models/result/context';
import { CONTENT_TYPES } from 'gooru-web/config/config';
import PlayerReport from 'gooru-web/mixins/reports/player-report-mixin';

export default Ember.Component.extend(PlayerReport, {
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['class', 'backdrop-pull-ups', 'gru-report-panel'],

  // -------------------------------------------------------------------------
  // Dependencies

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
   * @requires {Ember.Service} Service to retrieve an assessment result
   */
  userSessionService: Ember.inject.service('api-sdk/user-session'),

  /**
   * @requires {LessonService} Service to retrieve a lesson
   */
  lessonService: Ember.inject.service('api-sdk/lesson'),

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
   * @property {[]}
   */
  attempts: Ember.computed.alias('completedSessions'),

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
   * defaultSuggestContentType
   * @type {String}
   */
  defaultSuggestContentType: 'collection',

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

  // -------------------------------------------------------------------------
  // Actions

  actions: {
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
     * Action get triggered when change score button clicked and change score was cancelled
     */
    onChangeScore: function(flag) {
      this.get('listOfQuestions').clear();
      this.set('isChangeScoreEnabled', !flag);
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
