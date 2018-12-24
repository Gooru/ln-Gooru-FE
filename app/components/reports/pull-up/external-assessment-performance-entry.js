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
  keyDown(event) {
    //prevent triggering tab key event
    if (event.keyCode === 9) {
      event.preventDefault();
    }
  },

  didRender() {
    let component = this;
    component.scoreValidator();
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
    onEditScore(studentSeq) {
      let component = this;
      component.toggleScoredElement(studentSeq);
    },

    //Action triggered when move to next student
    onMoveNext() {
      let component = this;
      let activeStudentSeq = component.get('activeStudentSeq');
      let students = component.get('students');
      let numberOfStudents = students.length;
      if (activeStudentSeq >= numberOfStudents) {
        component.set('isDisableNext', true);
      } else {
        component.updateStudentAssessmentScore(component.getDataParams(activeStudentSeq));
        activeStudentSeq++;
        component.set('activeStudentSeq', activeStudentSeq);
        component.set('activeStudent', students.objectAt(activeStudentSeq));
      }
    },

    //Action triggered when enter max score
    onEnterMaxScore() {
      let component = this;
      let maxScore = component.get('assessmentMaxScore');
      let isValidMaxScore = validatePercentage(maxScore);
      component.set('isShowMaxScoreEntry', !isValidMaxScore);
      component.set('isValidMaxScore', isValidMaxScore);
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
   * @property {Boolean} isValidScore
   */
  isValidScore: false,

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function scoreValidator
   * Method to validate entered score
   */
  scoreValidator() {
    let component = this;
    component.$('.score-entry').keyup(function() {
      let percentageScore = component.$('.max-score-entry').val();
      if ( percentageScore  !== 0 ) {
        component.set('isValidScore', validatePercentage(percentageScore));
      } else {
        component.set('isValidScore', false);
      }
      component.set('isTyping', true);
    });
  },

  /**
   * @function toggleScoredElement
   * Method to toggle scored element
   */
  toggleScoredElement(studentSeq) {
    let component = this;
    let assessmentScore = component.$(`.s-${studentSeq}-score`).val();
    component.$(`.student-${studentSeq}`).removeClass('scored wrong-score');
    if (component.validateAssessmentScore(studentSeq, assessmentScore)) {
      component.$(`.student-${studentSeq}`).addClass('scored');
      component.$(`.student-${studentSeq} .student-thumbnail`).css('background-color', getBarGradeColor(assessmentScore));
    } else {
      component.$(`.student-${studentSeq}`).addClass('wrong-score');
      component.$(`.student-${studentSeq} .student-thumbnail`).css('background-color', '#d8d8d8');
    }
  },

  /**
   * @function getDataParams
   * Method to construct request body params
   */
  getDataParams(activeStudentSeq) {
    let component = this;
    let activityData = component.get('activityData');
    let conductedOn = new Date(component.get('activityData.activation_date'));
    let maxScore = component.get('assessmentMaxScore');
    let classId = component.get('classId');
    let courseId = activityData.get('context.courseId') || null;
    let unitId = activityData.get('context.unitId') || null;
    let lessonId = activityData.get('context.lessonId') || null;
    let studentAssessmentScore = component.$(`.s-${activeStudentSeq}-score`).val();
    let reqBodyParams = {
      'student_id': component.get('activeStudent.id'),
      'tenant_id': component.get('session.tenantId') || null,
      'collection_type': 'assessment-external',
      'session_id': generateUUID(),
      'time_zone': component.get('timeZone'),
      'class_id': classId,
      'course_id': courseId,
      'unit_id': unitId,
      'lesson_id': lessonId,
      'collection_id': component.get('assessment.id'),
      'partner_id': component.get('session.partnerId') || null,
      'content_source': 'dailyclassactivity',
      'score': Number(studentAssessmentScore) || 0,
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
  validateAssessmentScore(studentSeq, score) {
    let component = this;
    let maxScore = component.get('assessmentMaxScore');
    let isValid = score === null || (Number(score) >= 0 && (Number(score) <= maxScore));
    return isValid;
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
