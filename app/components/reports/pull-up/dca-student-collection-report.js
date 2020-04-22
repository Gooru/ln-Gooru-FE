import Ember from 'ember';
import { toLocal } from 'gooru-web/utils/utils';
import Context from 'gooru-web/models/result/context';
import PlayerReport from 'gooru-web/mixins/reports/player-report-mixin';

export default Ember.Component.extend(PlayerReport, {
  // -------------------------------------------------------------------------
  // Attributes

  classNames: [
    'reports',
    'backdrop-pull-ups',
    'pull-up-dca-student-collection-report'
  ],

  // -------------------------------------------------------------------------
  // Properties

  useSession: false,

  /**
   * @property {boolean}showAttempts
   */
  showAttempts: false,

  /**
   * @property {[]}
   */
  attempts: Ember.computed('assessmentResult.totalAttempts', function() {
    return this.getAttemptList();
  }),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    closeAll: function() {
      this.sendAction('onClosePullUp');
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
