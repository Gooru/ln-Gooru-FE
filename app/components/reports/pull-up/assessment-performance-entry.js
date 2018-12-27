import Ember from 'ember';
import { generateUUID, validateTime } from 'gooru-web/utils/utils';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['performance-manual-entry', 'assessment-performance-entry'],

  // -------------------------------------------------------------------------
  // Serevices
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  questionService: Ember.inject.service('api-sdk/question'),

  performanceService: Ember.inject.service('api-sdk/performance'),

  session: Ember.inject.service('session'),

  // -------------------------------------------------------------------------
  // Events
  didRender() {
    let component = this;
    component.timeValidator();
  },

  didInsertElement() {
    let component = this;
    component.loadAssessmentData();
  },

  // Detect keyDown event
  keyDown(event) {
    //prevent triggering tab key event
    if (event.keyCode === 9) {
      event.preventDefault();
    }
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    //Action triggered when show/hide question description
    onToggleQuestion(question, questionSeq) {
      let component = this;
      component
        .$(`.question-${questionSeq} .question-description`)
        .toggleClass('hidden');
    },

    //Action triggered when select a question
    onSelectQuestion(question, questionSeq) {
      let component = this;
      component.set('activeQuestion', question);
      component.set('activeQuestionSeq', questionSeq + 1);
      component.fetchQuestionData(question.id);
      component
        .$(`.question-${questionSeq} .question-info-container`)
        .removeClass('selected-question');
      component
        .$(`.question-${questionSeq} .question-info-container`)
        .addClass('selected-question');
    },

    //Action triggered when edit score of a question
    onEditScore(questionSeq) {
      let component = this;
      component.updateScoredElement(questionSeq);
    },

    //Action triggered when move to prev/next student
    onMoveStudent(direction) {
      let component = this;
      component.loadStudentPerformanceData(direction);
    },

    //Action triggered when submit performance entry
    onSubmitPerformance() {
      let component = this;
      let assessmentPerformanceDataParams = component.getDataParams();
      let activeStudentSeq = component.get('activeStudentSeq');
      let studentsOfflineAssessmentData = component.get(
        'studentsOfflineAssessmentData'
      );
      studentsOfflineAssessmentData[
        activeStudentSeq - 1
      ] = assessmentPerformanceDataParams;
      component.set(
        'studentsOfflineAssessmentData',
        studentsOfflineAssessmentData
      );
      component.updateStudentAssessmentPerformance(
        assessmentPerformanceDataParams
      );
      component.sendAction('onClosePerformanceEntry');
    },

    //Action triggered when enter max timespent
    onEnterMaxTimespent() {
      let component = this;
      let maxHour = component.get('maxTimeHour');
      let maxMins = component.get('maxTimeMins');
      let maxTimeInMilliSec = (maxHour * 60 * 60 + maxMins * 60) * 1000;
      let questionTimespent =
        maxTimeInMilliSec / component.get('questions.length');
      component.set('questionTimespent', questionTimespent);
      component.set('isCaptureTimespent', false);
      component.set('isShowTimespent', true);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Number} questionTimespent
   */
  questionTimespent: 0,

  /**
   * @property {Boolean} isCaptureTimespent
   */

  isCaptureTimespent: true,
  /**
   * @property {Number} isvalidtime
   */

  isValidtime: false,
  /**
   * @property {Number} isvalidmins
   */

  isValidmins: false,

  /**
   * @property {Boolean} isTyping
   */
  isTyping: false,

  /**
   * @property {Boolean} isHourTyping
   */
  isHourTyping: false,

  /**
   * @property {Boolean} isMinTyping
   */

  isMinTyping: false,

  /**
   * @property {Number} isShowTimespent
   */

  isShowTimespent: false,

  /**
   * @property {Boolean} isValidTimeSpent
   */

  isValidTimeSpent: null,

  /**
   * @property {Array} students
   */
  students: Ember.A([]),

  /**
   * @property {Object} activeStudent
   */
  activeStudent: Ember.computed('students', function() {
    let component = this;
    let students = component.get('students');
    return students ? students.objectAt(0) : null;
  }),

  /**
   * @property {Number} activeStudentSeq
   */
  activeStudentSeq: 0,

  /**
   * @property {Boolean} isNoStudent
   */
  isNoStudent: Ember.computed('students', function() {
    let component = this;
    let students = component.get('students');
    return students.length <= 0;
  }),

  /**
   * @property {Array} questions
   */
  questions: Ember.A([]),

  /**
   * @property {Object} assessment
   */
  assessment: null,

  /**
   * @property {Array} assessmentResources
   */
  assessmentResources: Ember.A([]),

  /**
   * @property {Object} activeQuestion
   */
  activeQuestion: Ember.computed('questions', function() {
    let component = this;
    let questions = component.get('questions');
    return questions.objectAt(0);
  }),

  /**
   * @property {Number} activeQuestionSeq
   */
  activeQuestionSeq: Ember.computed('questions', function() {
    let component = this;
    let questions = component.get('questions');
    return questions ? 1 : 'NA';
  }),

  /**
   @property {Array} studentsOfflineAssessmentData
   */
  studentsOfflineAssessmentData: Ember.A([]),

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
   * @property {Boolean} isValid
   */
  isValid: true,

  /**
   * @property {Boolean} isDisablePrev
   */
  isDisablePrev: Ember.computed('activeStudentSeq', function() {
    let component = this;
    let activeStudentSeq = component.get('activeStudentSeq');
    return activeStudentSeq === 0;
  }),

  /**
   * @property {Boolean} isDisableNext
   */
  isDisableNext: Ember.computed('activeStudentSeq', function() {
    let component = this;
    let activeStudentSeq = component.get('activeStudentSeq');
    let numberOfStudents = component.get('students.length');
    return activeStudentSeq === numberOfStudents - 1;
  }),

  /**
   * @property {Boolean} isShowMaxScoreEntry
   */
  isShowMaxScoreEntry: true,

  /**
   * @property {Number} assessmentMaxScore
   */
  assessmentMaxScore: null,

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function timeValidator
   * Method to validate time in student performance entry
   */
  timeValidator() {
    let component = this;
    component.$('.time').keyup(function() {
      let maxHour = component.get('maxTimeHour');
      let maxMins = component.get('maxTimeMins');
      component.set('isValidtime', validateTime(maxHour, maxMins));
      component.set('isTyping', true);
    });
  },

  /**
   * @function loadStudentPerformanceData
   * Method to load student performance data
   */
  loadStudentPerformanceData(direction) {
    let component = this;
    let students = component.get('students');
    let activeStudent = component.get('activeStudent');
    let activeStudentSeq = component.get('activeStudentSeq');
    let studentsOfflineAssessmentData = component.get(
      'studentsOfflineAssessmentData'
    );
    activeStudentSeq =
      direction === 'next' ? activeStudentSeq + 1 : activeStudentSeq - 1;
    activeStudent = students.objectAt(activeStudentSeq);
    let isStudentDataEntered = studentsOfflineAssessmentData[activeStudentSeq]
      ? studentsOfflineAssessmentData[activeStudentSeq]
      : null;
    if (isStudentDataEntered) {
      component.loadEnteredStudentData(isStudentDataEntered, direction);
    } else {
      let assessmentPerformanceDataParams = component.getDataParams();
      studentsOfflineAssessmentData[
        activeStudentSeq - 1
      ] = assessmentPerformanceDataParams;
      component.set(
        'studentsOfflineAssessmentData',
        studentsOfflineAssessmentData
      );
      component.updateStudentAssessmentPerformance(
        assessmentPerformanceDataParams
      );
      component.resetElements();
    }
    component.set('activeStudent', activeStudent);
    component.set('activeStudentSeq', activeStudentSeq);
  },

  /**
   * @function resetElements
   */
  resetElements() {
    let component = this;
    let inputElements = component.$('.question-score-entry');
    component.$(inputElements).val(null);
    component.$('.question-thumbnail').css('background-color', '#d8d8d8');
    component.$('.question-container').removeClass('scored');
    component.$('.question-score').removeClass('disabled');
    component.$('.question-score-entry').removeClass('wrong-score');
  },

  /**
   * @function loadEnteredStudentData
   */
  loadEnteredStudentData(studentData) {
    let component = this;
    let resources = studentData ? studentData.resources : Ember.A([]);
    component.$('.question-score').addClass('disabled');
    component.$('.question-info-container').removeClass('selected-question');
    resources.forEach(function(question, index) {
      let inputElement = component.$(`.q-${index}-score`);
      component.$(inputElement).val(question.score);

      component.updateScoredElement(index);
    });
  },

  /**
   * @function updateScoredElement
   */
  updateScoredElement(questionSeq) {
    let component = this;
    let enteredScore = component.$(`.q-${questionSeq}-score`).val();
    if (component.validateQuestionScore(questionSeq, enteredScore)) {
      component
        .$(`.question-${questionSeq}`)
        .removeClass('scored')
        .addClass('scored');
      component
        .$(`.question-${questionSeq} .question-thumbnail`)
        .css('background-color', '#538a32');
    } else {
      component.$(`.question-${questionSeq}`).removeClass('scored');
      component
        .$(`.question-${questionSeq} .question-thumbnail`)
        .css('background-color', '#d8d8d8');
    }
  },

  /**
   * @function loadAssessmentData
   */
  loadAssessmentData() {
    let component = this;
    let assessment = component.get('assessment');
    component.fetchAssessmentData(assessment.id).then(function(assessmentData) {
      let questions = assessmentData
        ? assessmentData.get('children')
        : Ember.A([]);
      component.set('questions', questions);
    });
  },

  /**
   * @function getDataParams
   */
  getDataParams() {
    let component = this;
    let inputElements = component.$('.question-score-entry');
    let questions = component.get('questions');
    let assessmentResources = Ember.A([]);
    let activeStudent = component.get('activeStudent');
    let activityData = component.get('activityData');
    let conductedOn = new Date(activityData.activation_date) || new Date();
    let classId = component.get('classId');
    let assessment = component.get('assessment');
    inputElements.each(function(index, scoreElement) {
      let questionData = questions.objectAt(index);
      let score = component.$(scoreElement).val();
      let resourceData = {
        resource_id: questionData.id,
        resource_type: 'question',
        question_type: questionData.type,
        score: Number(score) || 0,
        max_score: questionData.maxScore,
        time_spent: component.get('questionTimespent')
      };
      assessmentResources.push(resourceData);
    });
    let studentPerformanceData = {
      tenant_id: component.get('session.tenantId') || null,
      student_id: activeStudent.get('id'),
      session_id: generateUUID(),
      class_id: classId,
      collection_id: assessment.id,
      collection_type: 'assessment',
      content_source: component.get('contentSource'),
      time_zone: component.get('timeZone'),
      conducted_on: conductedOn.toISOString(),
      path_id: 0,
      path_type: null,
      resources: assessmentResources
    };
    return studentPerformanceData;
  },

  /**
   * @function validateQuestionScore
   */
  validateQuestionScore(questionSeq, score) {
    let component = this;
    let maxScore = component.get('activeQuestion.maxScore');
    let isValid = !isNaN(score) && Number(score) <= maxScore;
    if (isValid) {
      component.$(`.q-${questionSeq}-score`).removeClass('wrong-score');
    } else {
      component
        .$(`.q-${questionSeq}-score`)
        .removeClass('wrong-score')
        .addClass('wrong-score');
    }
    component.set('isValid', isValid);
    component.validateScore();
    return isValid;
  },
  validateScore() {
    let component = this;
    let isValid = component.$('.wrong-score').length > 0;
    component.set('isValid', isValid);
  },
  /**
   * @function fetchAssessmentData
   */
  fetchAssessmentData(assessmentId) {
    let component = this;
    let assessmentService = component.get('assessmentService');
    return Ember.RSVP.hash({
      assessmentData: Ember.RSVP.resolve(
        assessmentService.readAssessment(assessmentId)
      )
    }).then(({ assessmentData }) => {
      return assessmentData;
    });
  },

  /**
   * @function fetchQuestionData
   */
  fetchQuestionData(questionId) {
    let component = this;
    let questionService = component.get('questionService');
    if (questionId) {
      return Ember.RSVP.hash({
        questionData: Ember.RSVP.resolve(
          questionService.readQuestion(questionId)
        )
      }).then(({ questionData }) => {
        component.set('question', questionData);
      });
    }
  },

  /**
   * @function updateStudentAssessmentPerformance
   */
  updateStudentAssessmentPerformance(dataParams) {
    let component = this;
    let performanceService = component.get('performanceService');
    return Ember.RSVP.hash({
      studentPerformanceUpdated: Ember.RSVP.resolve(
        performanceService.updateCollectionOfflinePerformance(dataParams)
      )
    });
  }
});
