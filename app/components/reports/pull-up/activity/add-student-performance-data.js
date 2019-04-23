import Ember from 'ember';
import { generateUUID, validateTimespent } from 'gooru-web/utils/utils';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['add-data', 'add-student-performance-data'],

  // -------------------------------------------------------------------------
  // Serevices
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  questionService: Ember.inject.service('api-sdk/question'),

  performanceService: Ember.inject.service('api-sdk/performance'),

  analyticsService: Ember.inject.service('api-sdk/analytics'),

  session: Ember.inject.service('session'),

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    const component = this;
    component.loadAssessmentData();
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    //Action triggered when select a student
    onSelectStudent(student) {
      const component = this;
      const activeStudent = component.get('activeStudent');
      if (activeStudent && activeStudent.get('id') !== student.get('id')) {
        if (!component.doCheckQuestionScoreSubmitted()) {
          component.set('isShowWarningMessage', true);
        } else {
          component.set('isShowSaveInformation', true);
        }
      }
      component.set('activeStudentTemp', student);
    },

    //Action triggered when search student list
    onSearchStudent() {
      const component = this;
      let searchPattern = component.get('studentSearchPattern').toLowerCase();
      let students = component.get('students');
      let filteredStudents = students.filter(student =>
        student
          .get('fullName')
          .toLowerCase()
          .includes(searchPattern)
      );
      component.set('studentsList', filteredStudents);
    },

    //Action triggered when toggle question
    onToggleQuestion(questionSeq) {
      const component = this;
      component.toggleQuestionVisibility(questionSeq);
    },

    //Action triggered when dimiss warning popup
    onDismissWarning() {
      const component = this;
      component.set('isShowWarningMessage', false);
    },

    //Action triggered when submit question scores
    onAcceptSaveAndNext() {
      const component = this;
      component.submitQuestionDataSelectNextStudent();
      component.set('isShowSaveInformation', false);
    },

    //Action triggered when click save and next
    onClickSaveAndNext() {
      const component = this;
      if (component.doCheckQuestionScoreSubmitted()) {
        component.submitQuestionDataSelectNextStudent();
      } else {
        component.set('isShowWarningMessage', true);
      }
    },

    //Action triggered when clear question scores
    onAcceptWarning() {
      const component = this;
      component.resetQuestionScores();
      component.toggleQuestionVisibility();
      component.scrollToFirstQuestion();
      component.set('activeStudent', component.get('activeStudentTemp'));
      component.set('isShowWarningMessage', false);
    },

    //Action triggered when enter timespent
    onChangeTime() {
      const component = this;
      let maxHour = component.get('maxHour');
      let maxMinute = component.get('maxMinute');
      component.set(
        'isValidMaxTimespent',
        validateTimespent(maxHour, maxMinute)
      );
    },

    //Action triggered when submit max timespent
    onSubmitMaxTimespent() {
      const component = this;
      const maxHour = component.get('maxHour');
      const maxMinute = component.get('maxMinute');
      let maxTimeInMilliSec = (maxHour * 60 * 60 + maxMinute * 60) * 1000;
      let questionTimespent =
        maxTimeInMilliSec / component.get('questions.length');
      component.set('questionTimespent', questionTimespent);
      component.set('isCaptureQuestionScore', true);
    },

    //Action triggered when clear search student list
    onClearSearchStudent() {
      const component = this;
      component.set('studentSearchPattern', '');
      component.set('studentsList', component.get('students'));
    },

    //Action triggered when dismiss infor popup
    onDismissInfoPopup() {
      const component = this;
      component.set('activeStudent', component.get('activeStudentTemp'));
      component.resetQuestionScores();
      component.toggleQuestionVisibility();
      component.scrollToFirstQuestion();
      component.set('isShowSaveInformation', false);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Boolean} isEnableSaveNext
   */
  isEnableSaveNext: false,

  /**
   * @property {Boolean} isShowSaveInformation
   */
  isShowSaveInformation: false,

  /**
   * @property {Object} activeStudent
   */
  activeStudent: Ember.computed(function() {
    const component = this;
    return component.get('students').objectAt(0);
  }),

  /**
   * @property {Object} activeStudentTemp
   */
  activeStudentTemp: Ember.computed('activeStudent', function() {
    return this.get('activeStudent');
  }),

  /**
   * @property {Number} activeQuestionSeq
   */
  activeQuestionSeq: 0,

  /**
   * @property {Array} studentsList
   */
  studentsList: Ember.computed('students', function() {
    return this.get('students');
  }),

  /**
   * @property {Array} students
   */
  students: Ember.A([]),

  /**
   * @property {Object} collection
   */
  collection: null,

  /**
   * @property {Number} questionTimespent
   */
  questionTimespent: 0,

  /**
   * @property {String} studentSearchPattern
   */
  studentSearchPattern: '',

  /**
   * @property {Array} questions
   */
  questions: Ember.A([]),

  /**
   * @property {Number} maxHour
   */
  maxHour: 0,

  /**
   * @property {Number} maxMinute
   */
  maxMinute: 0,

  /**
   * @property {Boolean} isValidMaxTimespent
   */
  isValidMaxTimespent: false,

  /**
   * @property {Boolean} isCaptureQuestionScore
   */
  isCaptureQuestionScore: false,

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
   * @property {Boolean} isShowClearStudentSearch
   */
  isShowClearStudentSearch: Ember.computed('studentSearchPattern', function() {
    const component = this;
    return component.get('studentSearchPattern.length');
  }),

  /**
   * @property {Number} unAnsweredQuestionCount
   */
  unAnsweredQuestionCount: 0,

  // -------------------------------------------------------------------------
  // Functions

  /**
   * @function scrollToFirstQuestion
   * Method to scroll to top of the questions list container
   */
  scrollToFirstQuestion() {
    const component = this;
    component.$('.question-list-container').scrollTop(0);
  },

  /**
   * @function submitQuestionDataSelectNextStudent
   * Method to submit question scores and select next student
   */
  submitQuestionDataSelectNextStudent() {
    const component = this;
    component.submitAssessmentPerformanceData();
    component.resetQuestionScores();
    component.toggleQuestionVisibility();
    let students = component.get('students');
    let activeStudentIndex = students.indexOf(component.get('activeStudent'));
    if (activeStudentIndex !== students.length - 1) {
      component.set('activeStudent', students.objectAt(activeStudentIndex + 1));
      component.scrollToFirstQuestion();
      component.set('activeStudentIndex', activeStudentIndex + 1);
    }
  },

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

  /**
   * @function submitAssessmentPerformanceData
   */
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

  /**
   * @function resetQuestionScores
   */
  resetQuestionScores() {
    const component = this;
    let questions = component.get('questions');
    questions.map(question => question.set('score', null));
  },

  /**
   * @function toggleQuestionVisibility
   */
  toggleQuestionVisibility(activePos = 0) {
    const component = this;
    let questions = component.get('questions');
    if (questions.length !== activePos) {
      let activeQuestion = questions.objectAt(activePos);
      questions.map(question => question.set('active', false));
      activeQuestion.set('active', !activeQuestion.get('active'));
      component.set('activeQuestionSeq', activePos);
    } else {
      component.set('isEnableSaveNext', true);
    }
  },

  /**
   * @function doCheckQuestionScoreSubmitted
   */
  doCheckQuestionScoreSubmitted() {
    const component = this;
    let questions = component.get('questions');
    let unAnsweredQuestions = questions.filterBy('score', null);
    let numberOfQuestionsNotSubmitted = unAnsweredQuestions.length;
    component.set('unAnsweredQuestionCount', numberOfQuestionsNotSubmitted);
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
