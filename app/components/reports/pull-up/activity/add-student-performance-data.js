import Ember from 'ember';
import { generateUUID } from 'gooru-web/utils/utils';

export default Ember.Component.extend({
  classNames: ['add-data', 'add-student-performance-data'],

  // -------------------------------------------------------------------------
  // Serevices
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  questionService: Ember.inject.service('api-sdk/question'),

  performanceService: Ember.inject.service('api-sdk/performance'),

  analyticsService: Ember.inject.service('api-sdk/analytics'),

  session: Ember.inject.service('session'),

  didInsertElement() {
    const component = this;
    component.loadAssessmentData();
  },

  actions: {
    onSelectStudent(student) {
      const component = this;
      if (component.doCheckQuestionScoreSubmitted()) {
        component.submitAssessmentPerformanceData();
      } else {
        component.set('isShowWarningMessage', true);
      }
      component.set('activeStudentTemp', student);
    },

    onSearchStudent() {
      const component = this;
      if (component.doCheckQuestionScoreSubmitted()) {
        let searchPattern = component.get('studentSearchPattern').toLowerCase();
        let students = component.get('students');
        let filteredStudents = students.filter(student =>
          student
            .get('fullName')
            .toLowerCase()
            .includes(searchPattern)
        );
        component.set('studentsList', filteredStudents);
      } else {
        component.set('isShowWarningMessage', true);
      }
    },

    onToggleQuestion(questionSeq) {
      const component = this;
      component.toggleQuestionVisibility(questionSeq);
    },

    onDismissWarning() {
      const component = this;
      component.set('isShowWarningMessage', false);
    },

    onAcceptWarning() {
      const component = this;
      component.submitAssessmentPerformanceData();
    }
  },

  activeStudent: Ember.computed(function() {
    const component = this;
    return component.get('students').objectAt(0);
  }),

  activeStudentTemp: Ember.computed('activeStudent', function() {
    return this.get('activeStudent');
  }),

  activeQuestionSeq: 0,

  studentsList: Ember.computed.alias('students'),

  students: Ember.A([]),

  collection: null,

  /**
   * @property {Number} questionTimespent
   */
  questionTimespent: 0,

  studentSearchPattern: '',

  questions: Ember.A([]),

  /**
   * @property {String} timeZone
   */
  timeZone: Ember.computed(function() {
    return moment.tz.guess() || null;
  }),

  /**
   * @property {String} contentSource
   */
  contentSource: 'dailyclassactivity',

  /**
   * @function loadAssessmentData
   */
  loadAssessmentData() {
    let component = this;
    let assessment = component.get('collection');
    return component
      .fetchAssessmentData(assessment.id)
      .then(function(assessmentData) {
        let questions = assessmentData
          ? assessmentData.get('children')
          : Ember.A([]);
        component.set('questions', questions);
        component.resetQuestionScores();
        component.toggleQuestionVisibility();
      });
  },

  /**
   * @function fetchAssessmentData
   */
  fetchAssessmentData(assessmentId) {
    let component = this;
    let assessmentService = component.get('assessmentService');
    return assessmentService.readAssessment(assessmentId);
  },

  submitAssessmentPerformanceData() {
    const component = this;
    const performanceService = component.get('performanceService');
    return Ember.RSVP
      .hash({
        studentPerformanceUpdated: Ember.RSVP.resolve(
          performanceService.updateCollectionOfflinePerformance(
            component.getAssessmentDataParams()
          )
        )
      })
      .then(() => {
        component.resetQuestionScores();
        component.set('activeStudent', component.get('activeStudentTemp'));
        component.set('activeStudent.isSubmitted', true);
      });
  },

  resetQuestionScores() {
    const component = this;
    let questions = component.get('questions');
    questions.map(question => question.set('score', null));
  },

  toggleQuestionVisibility(activePos = 0) {
    const component = this;
    let questions = component.get('questions');
    let activeQuestion = questions.objectAt(activePos);
    if (component.get('activeQuestionSeq') !== activePos) {
      questions.map(question => question.set('active', false));
    }
    activeQuestion.set('active', !activeQuestion.get('active'));
    component.set('activeQuestionSeq', activePos);
  },

  doCheckQuestionScoreSubmitted() {
    const component = this;
    let questions = component.get('questions');
    let numberOfQuestionsNotSubmitted = questions.findBy('score', null);
    return !numberOfQuestionsNotSubmitted;
  },

  /**
   * @function getAssessmentDataParams
   */
  getAssessmentDataParams() {
    let component = this;
    let questions = component.get('questions');
    let assessmentResources = Ember.A([]);
    let activeStudent = component.get('activeStudent');
    let activityData = component.get('activityData');
    let activityId = activityData.get('id');
    let conductedOn = new Date(activityData.activation_date) || new Date();
    let classId = component.get('classId');
    let assessment = component.get('collection');
    let courseId = component.get('course') ? component.get('course').id : null;
    questions.map(question => {
      let resourceData = {
        resource_id: question.get('id'),
        resource_type: 'question',
        question_type: question.get('type'),
        score: Number(question.get('score')) || 0,
        max_score: question.get('maxScore'),
        time_spent: component.get('questionTimespent')
      };
      assessmentResources.push(resourceData);
    });
    let studentPerformanceData = {
      tenant_id: component.get('session.tenantId') || null,
      student_id: activeStudent.get('id'),
      session_id: generateUUID(),
      class_id: classId,
      collection_id: assessment.get('id'),
      collection_type: 'assessment',
      content_source: component.get('contentSource'),
      time_zone: component.get('timeZone'),
      conducted_on: conductedOn.toISOString(),
      path_id: 0,
      path_type: null,
      resources: assessmentResources,
      course_id: courseId,
      additionalContext: btoa(JSON.stringify({ dcaContentId: activityId }))
    };
    return studentPerformanceData;
  }
});
