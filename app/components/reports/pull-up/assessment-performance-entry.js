import Ember from 'ember';
import { generateUUID, validateTimespent } from 'gooru-web/utils/utils';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['performance-manual-entry', 'assessment-performance-entry'],

  // -------------------------------------------------------------------------
  // Serevices
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  questionService: Ember.inject.service('api-sdk/question'),

  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * @requires service:api-sdk/analytics
   */
  analyticsService: Ember.inject.service('api-sdk/analytics'),

  session: Ember.inject.service('session'),

  // -------------------------------------------------------------------------
  // Events

  didInsertElement() {
    let component = this;
    component.set('isLoading', true);
    component.set('studentsOfflineAssessmentData', Ember.A([]));
    component.set('maxTimespent', {
      hour: null,
      min: null
    });
    component.loadAssessmentData().then(function() {
      if (component.get('isRepeatEntry')) {
        component.populateStudentAssessmentSummary();
      } else {
        component.set('isLoading', false);
      }
    });
  },

  // Detect keyDown event
  keyDown(event) {
    //prevent triggering tab key event
    let component = this;
    if (event.keyCode === 9) {
      let question=component.get('activeQuestion');
      let questionSeq=component.get('activeQuestionSeq');
      component.onSelectTab(question,questionSeq);
    }
  },

  onSelectTab(question, questionSeq) {
    let component = this;
    component.set('activeQuestion', question);
    component.set('activeQuestionSeq', questionSeq + 1);
    component.fetchQuestionData(question.id);
    component
      .$(`.question-${questionSeq - 1} .question-info-container`)
      .removeClass('selected-question');
    component
      .$(`.question-${questionSeq} .question-info-container`)
      .removeClass('selected-question')
      .addClass('selected-question');
    component
      .$(`.question-${questionSeq + 1} .question-info-container`)
      .removeClass('selected-question');
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
        .removeClass('selected-question')
        .addClass('selected-question');
      if (!component.$(`.q-${questionSeq}-score`).hasClass('disabled')) {
        component.$(`.q-${questionSeq}-score`).focus();
      }
      component.onSelectTab(question, questionSeq);
    },


    //Action triggered when edit score of a question
    onEditScore(question, sequence) {
      let component = this;
      component.toggleScoredElement(question, sequence);
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
      let maxHour = component.get('maxTimespent.hour');
      let maxMins = component.get('maxTimespent.min');
      let maxTimeInMilliSec = (maxHour * 60 * 60 + maxMins * 60) * 1000;
      let questionTimespent =
        maxTimeInMilliSec / component.get('questions.length');
      component.set('questionTimespent', questionTimespent);
      component.set('isCaptureTimespent', false);
      component.set('isShowTimespent', true);
    },

    // Action triggered when enter timespent for an assessment
    onEnterTimespent() {
      let component = this;
      let maxTimespent = component.get('maxTimespent');
      let hour = maxTimespent.hour || null;
      let min = maxTimespent.min || null;
      component.set('isTyping', true);
      component.set('isValidTimespent', validateTimespent(hour, min));
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
  isEnableNext: true,

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

  /**
   * @property {Object} prevStudent
   */
  prevStudent: Ember.computed('activeStudentSeq', function() {
    let component = this;
    let activeStudentSeq = component.get('activeStudentSeq');
    let students = component.get('students');
    return students.objectAt(activeStudentSeq - 1) || null;
  }),

  /**
   * @property {Object} nextStudent
   */
  nextStudent: Ember.computed('activeStudentSeq', function() {
    let component = this;
    let activeStudentSeq = component.get('activeStudentSeq');
    let students = component.get('students');
    return students.objectAt(activeStudentSeq + 1) || null;
  }),

  /**
   * @property {JSON} maxTimespent
   */

  maxTimespent: {
    hour: null,
    min: null
  },

  /**
   * @property {Date} activityDate
   */
  activityDate: Ember.computed('activityData', function() {
    let component = this;
    let activityData = component.get('activityData');
    return activityData.activation_date;
  }),

  // -------------------------------------------------------------------------
  // Methods

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
      component.prePopulateStudentData(isStudentDataEntered);
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
    component.$('.question-container').removeClass('scored');
    component.$('.question-score input').removeAttr('disabled');
    component.$('.question-score-entry').removeClass('wrong-score');
  },

  /**
   * @function prePopulateStudentData
   */
  prePopulateStudentData(studentData) {
    let component = this;
    let resources = studentData ? studentData.resources : Ember.A([]);
    component.$('.question-info-container').removeClass('selected-question');
    component.$('.question-score input').attr('disabled', 'true');
    resources.forEach(function(question, index) {
      let inputElement = component.$(`.q-${index}-score`);
      component.$(inputElement).val(question.score);
      component.toggleScoredElement(question, index);
    });
  },

  /**
   * @function updateScoredElement
   */
  toggleScoredElement(question, sequence) {
    let component = this;
    let enteredScore = question.score;
    component
      .$(`.question-${sequence} .question-thumbnail`)
      .removeClass('scored-background default-background');
    component
      .$(`.question-${sequence}`)
      .removeClass('scored')
      .removeClass('wrong-score');
    if (enteredScore) {
      if (component.validateQuestionScore(enteredScore)) {
        component.$(`.question-${sequence}`).addClass('scored');
        component
          .$(`.question-${sequence} .question-thumbnail`)
          .addClass('scored-background');
      } else {
        component.$(`.question-${sequence}`).addClass('wrong-score');
      }
    }
    component.set('isEnableNext', component.doEnableNext());
  },

  /**
   * @function loadAssessmentData
   */
  loadAssessmentData() {
    let component = this;
    let assessment = component.get('assessment');
    return component.fetchAssessmentData(assessment.id).then(function(assessmentData) {
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
  validateQuestionScore(score) {
    let component = this;
    let isNumber = !isNaN(score);
    let maxScore = component.get('activeQuestion.maxScore');
    return isNumber ? score <= maxScore && score >= 0 : false;
  },

  /**
   * @function doEnableNext
   */
  doEnableNext() {
    let component = this;
    return !component.$('.question-container.wrong-score').length > 0;
  },

  /**
   * @function populateStudentAssessmentSummary
   */
  populateStudentAssessmentSummary() {
    let component = this;
    let assessment = component.get('assessment');
    let questions = component.get('questions');
    let students = component.get('students');
    let classId = component.get('classId');
    let activityDate = new Date(component.get('activityDate'));
    let studentsOfflineAssessmentData = Ember.A([]);
    let questionTimespent = 0;
    component.fetchStudentsAssessmentPerformance().then(function(studentsPerformance) {
      if (studentsPerformance.length !== students.length) {
        component.set('isCaptureTimespent', false);
        students.map( student => {
          let studentAssessmentPerformance = studentsPerformance.findBy('user', student.id);
          if (studentAssessmentPerformance) {
            let studentQuestionsPerformance = studentAssessmentPerformance.resourceResults;
            questionTimespent = studentAssessmentPerformance.assessment.timespent / questions.length || 0;
            let assessmentResources = Ember.A([]);
            questions.map( question => {
              let questionPerformance = studentQuestionsPerformance.findBy('resourceId', question.id);
              let questionPerfData = {
                resource_id: question.id,
                resource_type: 'question',
                question_type: question.type,
                score: Number(questionPerformance.score/100),
                max_score: question.maxScore,
                time_spent: questionTimespent
              };
              assessmentResources.push(questionPerfData);
            });
            let studentPerformanceData = {
              tenant_id: component.get('session.tenantId') || null,
              student_id: student.get('id'),
              session_id: studentAssessmentPerformance.get('sessionId'),
              class_id: classId,
              collection_id: assessment.id,
              collection_type: 'assessment',
              content_source: component.get('contentSource'),
              time_zone: component.get('timeZone'),
              conducted_on: activityDate.toISOString(),
              path_id: 0,
              path_type: null,
              resources: assessmentResources
            };
            studentsOfflineAssessmentData.push(studentPerformanceData);
          }
        });
        component.set('studentsOfflineAssessmentData', studentsOfflineAssessmentData);
        component.prePopulateStudentData(studentsOfflineAssessmentData.objectAt(0));
        component.set('questionTimespent', questionTimespent);
      } else {
        component.set('isCaptureTimespent', true);
      }
      component.set('isLoading', false);
    });
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
  },

  /**
   * @function fetchStudentsAssessmentPerformance
   */
  fetchStudentsAssessmentPerformance() {
    let component = this;
    let classId = component.get('classId');
    let assessment = component.get('assessment');
    let assessmentId = assessment.id;
    let activityDate = component.get('activityDate');
    return Ember.RSVP.hash({
      performance: component
        .get('analyticsService')
        .getDCAPerformance(classId, assessmentId, 'assessment', activityDate)
    })
      .then(({performance}) => {
        return performance;
      });
  }
});
