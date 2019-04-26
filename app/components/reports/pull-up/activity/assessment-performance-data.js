import Ember from 'ember';
import {
  generateUUID,
  validateTimespent,
  validatePercentage
} from 'gooru-web/utils/utils';
import { CONTENT_TYPES } from 'gooru-web/config/config';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['add-data', 'assessment-performance-data'],

  // -------------------------------------------------------------------------
  // Serevices
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  performanceService: Ember.inject.service('api-sdk/performance'),

  analyticsService: Ember.inject.service('api-sdk/analytics'),

  session: Ember.inject.service('session'),

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    const component = this;
    if (component.get('isAssessment')) {
      component.loadAssessmentData();
    } else {
      component.loadExternalAssessmentData();
    }
    component.resetStudentScores();
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    //Action triggered when select a student
    onSelectStudent(student) {
      const component = this;
      const activeStudent = component.get('activeStudent');
      if (component.get('isSessionStarted')) {
        if (activeStudent && activeStudent.get('id') !== student.get('id')) {
          if (
            !component.doCheckQuestionScoreSubmitted() &&
            component.get('isAssessment')
          ) {
            component.set('isShowWarningMessage', true);
          } else {
            component.set('isShowSaveInformation', true);
          }
        }
      } else {
        component.set('activeStudent', student);
        component.set('isSessionStarted', false);
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
      component.set('isSessionStarted', true);
      component.toggleQuestionVisibility(questionSeq);
    },

    //Action triggered when dimiss warning popup
    onDismissWarning() {
      const component = this;
      component.set('isShowWarningMessage', false);
    },

    //Action triggered when clear question scores
    onAcceptWarning() {
      const component = this;
      component.resetQuestionScores();
      component.toggleQuestionVisibility();
      component.scrollToFirstQuestion();
      component.set('activeStudent', component.get('activeStudentTemp'));
      component.set('isShowWarningMessage', false);
      component.set('isSessionStarted', false);
    },

    //Action triggered when submit question scores
    onAcceptSaveAndNext() {
      const component = this;
      if (component.get('isAssessment')) {
        component.submitQuestionDataSelectNextStudent();
      } else {
        component.submitExternalAssessmentDataSelectNextStudent();
      }
      component.set('isSessionStarted', false);
      component.set('isShowSaveInformation', false);
    },

    //Action triggered when dismiss infor popup
    onDismissInfoPopup() {
      const component = this;
      if (component.get('isAssessment')) {
        component.resetQuestionScores();
        component.toggleQuestionVisibility();
        component.scrollToFirstQuestion();
      } else {
        component.set('activeStudent.score', null);
      }
      component.set('activeStudent', component.get('activeStudentTemp'));
      component.set('isShowSaveInformation', false);
      component.set('isSessionStarted', false);
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

    //Action triggered when click cancel button
    onClearQuestionScores() {
      const component = this;
      component.resetQuestionScores();
      component.toggleQuestionVisibility();
      component.scrollToFirstQuestion();
    },

    //Action triggered when submit external assessment student's score
    onSubmitExternalAssessmentStudentScore() {
      const component = this;
      component.submitExternalAssessmentDataSelectNextStudent();
    },

    //Actio triggered when submit external assessment max score
    onSubmitExternalAssessmentMaxScore() {
      const component = this;
      component.set('isCaptureExternalAssessmentStudentScore', true);
    },

    //Action triggered when type external assessment student score
    onEnterExternalAssessmentStudentScore() {
      const component = this;
      const externalAssessmentMaxScore = parseFloat(
        component.get('externalAssessmentMaxScore')
      );
      const studentScore = parseFloat(component.get('activeStudent.score'));
      component.set('isSessionStarted', true);
      component.set(
        'isValidExternalAssessmentStudentScore',
        studentScore >= 0 && studentScore <= externalAssessmentMaxScore
      );
    },

    //Action triggered when enter external assessment max score
    onEnterExternalAssessmentMaxScore() {
      const component = this;
      const externalAssessmentMaxScore = component.get(
        'externalAssessmentMaxScore'
      );
      component.set(
        'isValidExternalAssessmentMaxScore',
        validatePercentage(externalAssessmentMaxScore)
      );
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  isAssessment: Ember.computed.equal(
    'assessment.format',
    CONTENT_TYPES.ASSESSMENT
  ),

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
   * @property {Object} assessment
   */
  assessment: null,

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

  /**
   * @property {Number} externalAssessmentMaxScore
   */
  externalAssessmentMaxScore: 0,

  /**
   * @property {Boolean} isCaptureExternalAssessmentStudentScore
   */
  isCaptureExternalAssessmentStudentScore: false,

  /**
   * @property {Boolean} isValidExternalAssessmentMaxScore
   */
  isValidExternalAssessmentMaxScore: false,

  /**
   * @property {Boolean} isValidExternalAssessmentStudentScore
   */
  isValidExternalAssessmentStudentScore: false,

  /**
   * @property {Boolean} isLastStudentActive
   */
  isLastStudentActive: Ember.computed('activeStudent', function() {
    const component = this;
    const activeStudent = component.get('activeStudent');
    const students = component.get('students');
    return students.indexOf(activeStudent) === students.length - 1;
  }),

  /**
   * @property {Boolean} isSessionStarted
   */
  isSessionStarted: false,

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
    component.submitAssessmentPerformanceData().then(function() {
      component.resetQuestionScores();
      component.toggleQuestionVisibility();
      let students = component.get('students');
      let activeStudentIndex = students.indexOf(component.get('activeStudent'));
      if (activeStudentIndex !== students.length - 1) {
        component.set(
          'activeStudent',
          students.objectAt(activeStudentIndex + 1)
        );
        component.scrollToFirstQuestion();
      } else {
        component.sendAction('onClosePullUp');
      }
    });
  },

  /**
   * @function submitExternalAssessmentDataSelectNextStudent
   * Method to submit external assessment score and select next student
   */
  submitExternalAssessmentDataSelectNextStudent() {
    const component = this;
    component.submitExternalAssessmentPerformanceData().then(function() {
      let students = component.get('students');
      let activeStudentIndex = students.indexOf(component.get('activeStudent'));
      if (activeStudentIndex !== students.length - 1) {
        component.set(
          'activeStudent',
          students.objectAt(activeStudentIndex + 1)
        );
      } else {
        component.sendAction('onClosePullUp');
      }
    });
  },

  /**
   * @function loadAssessmentData
   */
  loadAssessmentData() {
    let component = this;
    let assessment = component.get('assessment');
    return component
      .fetchAssessmentData(assessment.get('id'))
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
   * @function loadExternalAssessmentData
   * Method to load external assessment data
   */
  loadExternalAssessmentData() {
    let component = this;
    let assessment = component.get('assessment');
    return component
      .fetchExternalAssessmentData(assessment.get('id'))
      .then(function(assessmentData) {
        component.set('assessment', assessmentData);
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
   * @function fetchExternalAssessmentData
   */
  fetchExternalAssessmentData(assessmentId) {
    let component = this;
    let assessmentService = component.get('assessmentService');
    return assessmentService.readExternalAssessment(assessmentId);
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
   * @function submitAssessmentPerformanceData
   */
  submitExternalAssessmentPerformanceData() {
    const component = this;
    const performanceService = component.get('performanceService');
    return Ember.RSVP
      .hash({
        studentPerformanceUpdated: Ember.RSVP.resolve(
          performanceService.updateCollectionOfflinePerformance(
            component.getExternalAssessmentDataParams()
          )
        )
      })
      .then(() => {
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
    let assessment = component.get('assessment');
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
  },

  /**
   * @function getExternalAssessmentDataParams
   * Method to construct external assessment data params
   */
  getExternalAssessmentDataParams() {
    let component = this;
    let student = component.get('activeStudent');
    let conductedOn =
      new Date(component.get('activityData.activation_date')) || new Date();
    let maxScore = component.get('externalAssessmentMaxScore');
    let classId = component.get('classId');
    let activityId = component.get('activityData.id');
    let studentPerformanceData = {
      student_id: student.get('id'),
      tenant_id: component.get('session.tenantId') || null,
      collection_type: 'assessment-external',
      session_id: generateUUID(),
      time_zone: component.get('timeZone'),
      class_id: classId,
      collection_id: component.get('assessment.id'),
      partner_id: component.get('session.partnerId') || null,
      content_source: component.get('contentSource'),
      score: parseInt(student.get('score')) || 0,
      max_score: parseInt(maxScore) || 0,
      time_spent: 0,
      conducted_on: conductedOn.toISOString(),
      additionalContext: btoa(JSON.stringify({ dcaContentId: activityId }))
    };
    return studentPerformanceData;
  },

  /**
   * @function resetStudentScores
   * Method to reset student scores
   */
  resetStudentScores() {
    const component = this;
    const students = component.get('students');
    students.map(student => student.set('score', null));
  }
});
