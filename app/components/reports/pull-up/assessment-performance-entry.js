import Ember from 'ember';
import {generateUUID} from 'gooru-web/utils/utils';

export default Ember.Component.extend({

  classNames: ['performance-manual-entry', 'assessment-performance-entry'],

  assessmentService: Ember.inject.service('api-sdk/assessment'),

  questionService: Ember.inject.service('api-sdk/question'),

  performanceService: Ember.inject.service('api-sdk/performance'),

  session: Ember.inject.service('session'),

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


  actions: {
    onToggleQuestion(question, questionSeq) {
      let component = this;
      component.$(`.question-${questionSeq} .question-description`).toggleClass('hidden');
    },

    onSelectQuestion(question, questionSeq) {
      let component = this;
      component.set('activeQuestion', question);
      component.set('activeQuestionSeq', questionSeq + 1);
      component.fetchQuestionData(question.id);
      component.$(`.question-${questionSeq} .question-info-container`).removeClass('selected-question');
      component.$(`.question-${questionSeq} .question-info-container`).addClass('selected-question');
    },

    onEditScore(questionSeq) {
      let component = this;
      component.updateScoredElement(questionSeq);
    },

    onMoveStudent(direction) {
      let component = this;
      component.loadStudentPerformanceData(direction);
    }
  },

  loadStudentPerformanceData(direction) {
    let component = this;
    let students = component.get('students');
    let activeStudent = component.get('activeStudent');
    let activeStudentSeq = component.get('activeStudentSeq');
    let studentsOfflineAssessmentData = component.get('studentsOfflineAssessmentData');
    activeStudentSeq = direction === 'next' ? activeStudentSeq + 1 : activeStudentSeq - 1;
    activeStudent = students.objectAt(activeStudentSeq);
    let isStudentDataEntered = studentsOfflineAssessmentData[activeStudentSeq] ? studentsOfflineAssessmentData[activeStudentSeq] : null;
    if (isStudentDataEntered) {
      component.loadEnteredStudentData(isStudentDataEntered, direction);
    } else {
      let assessmentPerformanceDataParams = component.getDataParams();
      studentsOfflineAssessmentData[activeStudentSeq  - 1] = assessmentPerformanceDataParams;
      component.set('studentsOfflineAssessmentData', studentsOfflineAssessmentData);
      component.updateStudentAssessmentPerformance(assessmentPerformanceDataParams);
      component.resetElements();
    }
    if (activeStudentSeq === students.length) {
      component.sendAction('onClosePerformanceEntry');
    } else {
      component.set('activeStudent', activeStudent);
      component.set('activeStudentSeq', activeStudentSeq);
    }
  },

  students: Ember.A([]),

  activeStudent: Ember.computed('students', function() {
    let component = this;
    let students = component.get('students');
    return students ? students.objectAt(0) : null;
  }),

  activeStudentSeq: 0,

  isNoStudent: Ember.computed('students', function() {
    let component = this;
    let students = component.get('students');
    return students.length <= 0;
  }),

  questions: Ember.A([]),

  assessment: null,

  assessmentResources: Ember.A([]),

  activeQuestion: Ember.computed('questions', function() {
    let component = this;
    let questions = component.get('questions');
    return questions.objectAt(0);
  }),

  activeQuestionSeq: Ember.computed('questions', function() {
    let component = this;
    let questions = component.get('questions');
    return questions ? 1 : 'NA';
  }),

  studentsOfflineAssessmentData: Ember.A([]),

  /**
   * @property {String} timeZone
   */
  timeZone: Ember.computed(function() {
    return moment.tz.guess() || null;
  }),

  contentSource: 'dailyclassactivity',

  isValid: true,

  isDisablePrev: Ember.computed('activeStudentSeq', function() {
    let component = this;
    let activeStudentSeq = component.get('activeStudentSeq');
    return activeStudentSeq === 0;
  }),

  isDisableNext: Ember.computed('activeStudentSeq', function() {
    let component = this;
    let activeStudentSeq = component.get('activeStudentSeq');
    let numberOfStudents = component.get('students.length');
    return activeStudentSeq === numberOfStudents - 1;
  }),

  isShowMaxScoreEntry: true,

  assessmentMaxScore: null,

  resetElements() {
    let component = this;
    let inputElements = component.$('.question-score-entry');
    component.$(inputElements).val(null);
    component.$('.question-thumbnail').css('background-color', '#d8d8d8');
    component.$('.question-container').removeClass('scored');
    component.$('.question-score').removeClass('disabled');
    component.$('.question-score-entry').removeClass('wrong-score');
  },

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

  updateScoredElement(questionSeq) {
    let component = this;
    let enteredScore = component.$(`.q-${questionSeq}-score`).val();
    if (component.validateQuestionScore(questionSeq, enteredScore)) {
      if (enteredScore)
      {component.$(`.question-${questionSeq}`).removeClass('scored').addClass('scored');}
      component.$(`.question-${questionSeq} .question-thumbnail`).css('background-color', '#538a32');
    } else {
      component.$(`.question-${questionSeq}`).removeClass('scored');
      component.$(`.question-${questionSeq} .question-thumbnail`).css('background-color', '#d8d8d8');
    }
  },

  loadAssessmentData() {
    let component = this;
    let assessment = component.get('assessment');
    component.fetchAssessmentData(assessment.id).then(function(assessmentData) {
      let questions = assessmentData ? assessmentData.get('children') : Ember.A([]);
      component.set('questions', questions);
    });
  },

  getDataParams() {
    let component = this;
    let inputElements = component.$('.question-score-entry');
    let questions = component.get('questions');
    let assessmentResources = Ember.A([]);
    let activeStudent = component.get('activeStudent');
    let activityData = component.get('activityData');
    let conductedOn = new Date(component.get('activityData.activation_date')) || new Date();
    let classId = component.get('classId');
    let courseId = activityData.get('context.courseId') || null;
    let unitId = activityData.get('context.unitId') || null;
    let lessonId = activityData.get('context.lessonId') || null;
    let assessment = component.get('assessment');
    inputElements.each(function(index, scoreElement) {
      let questionData = questions.objectAt(index);
      let score = component.$(scoreElement).val();
      let resourceData = {
        'resource_id': questionData.id,
        'resource_type': 'question',
        'question_type': questionData.type,
        'score': Number(score) || 0,
        'max_score': questionData.maxScore,
        'time_spent': 0
      };
      assessmentResources.push(resourceData);
    });
    let studentPerformanceData = {
      'tenant_id' : component.get('session.tenantId') || null,
      'student_id': activeStudent.get('id'),
      'session_id': generateUUID(),
      'class_id': classId,
      'course_id': courseId,
      'unit_id': unitId,
      'lesson_id': lessonId,
      'collection_id': assessment.id,
      'collection_type': 'assessment',
      'content_source': component.get('contentSource'),
      'time_zone': component.get('timeZone'),
      'conducted_on': conductedOn.toISOString(),
      'path_id':0,
      'path_type':null,
      'resources': assessmentResources
    };
    return studentPerformanceData;
  },

  validateQuestionScore(questionSeq, score) {
    let component = this;
    let maxScore = component.get('activeQuestion.maxScore');
    let isValid = !isNaN(score) && Number(score) <= maxScore;
    if (isValid) {
      component.$(`.q-${questionSeq}-score`).removeClass('wrong-score');
    } else {
      component.$(`.q-${questionSeq}-score`).removeClass('wrong-score').addClass('wrong-score');
    }
    component.set('isValid', isValid);
    return isValid;
  },

  fetchAssessmentData(assessmentId) {
    let component = this;
    let assessmentService = component.get('assessmentService');
    return Ember.RSVP.hash({
      assessmentData: Ember.RSVP.resolve(assessmentService.readAssessment(assessmentId))
    })
      .then(({ assessmentData }) => {
        return assessmentData;
      });
  },

  fetchQuestionData(questionId) {
    let component = this;
    let questionService = component.get('questionService');
    if (questionId) {
      return Ember.RSVP.hash({
        questionData: Ember.RSVP.resolve(questionService.readQuestion(questionId))
      })
        .then(({questionData}) => {
          component.set('question', questionData);
        });
    }
  },

  updateStudentAssessmentPerformance(dataParams) {
    let component = this;
    let performanceService = component.get('performanceService');
    return Ember.RSVP.hash({
      studentPerformanceUpdated: Ember.RSVP.resolve(performanceService.updateCollectionOfflinePerformance(dataParams))
    });
  }
});
