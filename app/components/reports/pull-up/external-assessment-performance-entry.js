import Ember from 'ember';
import {getBarGradeColor, generateUUID, validatePercentage} from 'gooru-web/utils/utils';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['performance-manual-entry', 'external-assessment-performance-entry'],

  // -------------------------------------------------------------------------
  // Services
  performanceService: Ember.inject.service('api-sdk/performance'),

  session: Ember.inject.service('session'),

  // -------------------------------------------------------------------------
  // Events

  keyDownEventHandler(event) {
    let component = this;
    let activeStudentSeq = component.get('activeStudentSeq');
    //recognize enter key
    if (event.keyCode === 13) {
      component.$(`.s-${activeStudentSeq + 1}-score`).focus();
    }
  },

  didRender() {
    let component = this;
    component.$('.student-score-entry').keyup(function(event) {
      component.keyDownEventHandler(event);
    });
  },

  didInsertElement() {
    let component = this;
    let numberOfStudents = component.get('students');
    if (numberOfStudents.length > 0) {
      component.$('.s-0-score').focus();
    }
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    // Action triggered when select a student
    onSelectStudent(student) {
      let component = this;
      component.set('activeStudent', student);
    },

    //Action triggered when edit score
    onEditScore(student, studentSeq) {
      let component = this;
      component.toggleScoredElement(student, studentSeq);
      component.set('isEnableSubmit', !component.doEnableSubmit());
    },

    //Action triggered when move to next student
    onSubmitScore() {
      let component = this;
      component.submitStudentAssessmentScore();
      component.sendAction('onClosePerformanceEntry');
    },

    //Action triggered when type assessment max score
    onTypeMaxAssessmentScore() {
      let component = this;
      component.set('isTypingMaxScore', true);
      let assessmentMaxScore = component.get('assessmentMaxScore');
      let isValidMaxScore = validatePercentage(assessmentMaxScore);
      component.set('isValidMaxScore', isValidMaxScore);
    },

    //Action triggered when enter max score
    onEnterMaxScore() {
      let component = this;
      component.set('isShowMaxScoreEntry', false);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Number} activeStudentSeq
   */
  activeStudentSeq: 0,

  /**
   * @property {Object} activeStudent
   */
  activeStudent: Ember.computed('students', function() {
    let component = this;
    let students = component.get('students');
    return students ? students.objectAt(0) : null;
  }),

  /**
   * @property {Array} studentsAssessmentPerformace
   */
  studentsAssessmentPerformace: Ember.A([]),

  /**
   * @property {String} timeZone
   */
  timeZone: Ember.computed(function() {
    return moment.tz.guess() || null;
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
   * @property {Boolean} isValidMaxScore
   */
  isValidMaxScore: false,

  /**
   * @property {Boolean} isTypingMaxScore
   */
  isTypingMaxScore: false,

  isEnableSubmit: false,

  // -------------------------------------------------------------------------
  // Methods

  doEnableSubmit() {
    let component = this;
    return component.$('.wrong-score').length > 0;
  },

  /**
   * @function submitStudentAssessmentScore
   * Method to submit student's external assessment score
   */
  submitStudentAssessmentScore() {
    let component = this;
    let students = component.get('students');
    students.map( student =>  {
      component.updateStudentAssessmentScore(component.getDataParams(student));
    });
  },


  /**
   * @function toggleScoredElement
   * Method to toggle scored element
   */
  toggleScoredElement(student, studentSeq) {
    let component = this;
    let assessmentScore = student.score;
    const STUDENT_INFO_CONTAINER = component.$(`.student-${studentSeq}`);
    component.$(STUDENT_INFO_CONTAINER).removeClass('scored wrong-score');
    if (assessmentScore !== null && assessmentScore !== '') {
      if (component.validateAssessmentScore(assessmentScore)) {
        component.$(STUDENT_INFO_CONTAINER).addClass('scored');
        component.$(`.student-${studentSeq} .student-thumbnail`).css('background-color', getBarGradeColor(assessmentScore));
      } else {
        component.$(STUDENT_INFO_CONTAINER).addClass('wrong-score');
      }
    }
  },

  /**
   * @function getDataParams
   * Method to construct request body params
   */
  getDataParams(student) {
    let component = this;
    let conductedOn = new Date(component.get('activityData.activation_date'));
    let maxScore = component.get('assessmentMaxScore');
    let classId = component.get('classId');
    let reqBodyParams = {
      'student_id': student.id,
      'tenant_id': component.get('session.tenantId') || null,
      'collection_type': 'assessment-external',
      'session_id': generateUUID(),
      'time_zone': component.get('timeZone'),
      'class_id': classId,
      'collection_id': component.get('assessment.id'),
      'partner_id': component.get('session.partnerId') || null,
      'content_source': 'dailyclassactivity',
      'score': Number(student.score) || 0,
      'max_score': Number(maxScore) || 0,
      'time_spent': 0,
      'conducted_on': conductedOn.toISOString()
    };
    return reqBodyParams;
  },

  /**
   * @function validateAssessmentScore
   * Method to validate entered assessment score of a student
   */
  validateAssessmentScore(score) {
    let component = this;
    let maxScore = parseFloat(component.get('assessmentMaxScore'));
    score = parseFloat(score);
    return score >= 0 && score <= maxScore;
  },

  /**
   * @function updateStudentAssessmentScore
   * Method to update student's assessment score
   */
  updateStudentAssessmentScore(reqBodyParams) {
    let component = this;
    let performanceService = component.get('performanceService');
    return Ember.RSVP.hash({
      studentPerformanceUpdated: Ember.RSVP.resolve(performanceService.updateCollectionOfflinePerformance(reqBodyParams))
    });
  }
});
