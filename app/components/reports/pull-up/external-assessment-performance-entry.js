import Ember from 'ember';
import {getBarGradeColor, generateUUID, validatePercentage} from 'gooru-web/utils/utils';

export default Ember.Component.extend({

  classNames: ['performance-manual-entry', 'external-assessment-performance-entry'],

  performanceService: Ember.inject.service('api-sdk/performance'),

  session: Ember.inject.service('session'),

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
  actions: {
    onSelectStudent(student) {
      let component = this;
      component.set('activeStudent', student);
    },

    onEditScore(studentSeq) {
      let component = this;
      component.updateScoredElement(studentSeq);
    },

    onMoveNext() {
      let component = this;
      let activeStudentSeq = component.get('activeStudentSeq');
      let students = component.get('students');
      let numberOfStudents = students.length;
      if (activeStudentSeq >= numberOfStudents) {
        component.set('isDisableNext', true);
      } else {
        component.updateStudentAssessmentScore(component.getDataParams());
        activeStudentSeq++;
        component.set('activeStudentSeq', activeStudentSeq);
        component.set('activeStudent', students.objectAt(activeStudentSeq));
      }
    },

    onEnterMaxScore() {
      let component = this;
      let maxScore = component.get('assessmentMaxScore');
      let isValidMaxScore = validatePercentage(maxScore);
      component.set('isShowMaxScoreEntry', !isValidMaxScore);
      component.set('isValidMaxScore', isValidMaxScore);
    }
  },
  scoreValidator() {
    let component = this;
    component.$('.score-entry').keyup(function() {
      let percentageScore = component.$('.max-score-entry').val();
      if ( percentageScore  != 0 ) {

        component.set('isValidScore', validatePercentage(percentageScore));
      } else {
        component.set('isValidScore', false);
      }
      component.set('isTyping', true);
    });
  },

  activeStudentSeq: 0,

  activeStudent: Ember.computed('students', function() {
    let component = this;
    let students = component.get('students');
    return students ? students.objectAt(0) : null;
  }),

  studentsAssessmentPerformace: Ember.A([]),

  /**
   * @property {String} timeZone
   */
  timeZone: Ember.computed(function() {
    return moment.tz.guess() || null;
  }),

  isShowMaxScoreEntry: true,

  assessmentMaxScore: null,
  isValidScore: false,

  updateScoredElement(studentSeq) {
    let component = this;
    let enteredScore = component.$(`.s-${studentSeq}-score`).val();
    console.log("working is ", enteredScore);
    if (component.validateQuestionScore(studentSeq, enteredScore)) {
      component.$(`.student-${studentSeq}`).removeClass('scored').addClass('scored');
      component.$(`.student-${studentSeq} .student-thumbnail`).css('background-color', '#538a32');
    } else {
      component.$(`.student-${studentSeq}`).removeClass('scored');
      component.$(`.student-${studentSeq} .student-thumbnail`).css('background-color', '#d8d8d8');
    }
  },

  getDataParams() {
    let component = this;
    let activityData = component.get('activityData');
    let conductedOn = new Date(component.get('activityData.activation_date'));
    let maxScore = component.get('assessmentMaxScore');
    let classId = component.get('classId');
    let courseId = activityData.get('context.courseId') || null;
    let unitId = activityData.get('context.unitId') || null;
    let lessonId = activityData.get('context.lessonId') || null;
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
      'score': 0,
      'max_score': maxScore,
      'percent_score': 25,
      'time_spent': 0,
      'conducted_on': conductedOn.toISOString()
    };
    return reqBodyParams;
  },

  validateQuestionScore(studentSeq, score) {
    let component = this;
    let maxScore = component.get('assessmentMaxScore');
    console.log("maxscore is", maxScore);
    let isValid = !isNaN(score) && Number(score) <= maxScore;
    if (isValid) {
      component.$(`.s-${studentSeq}-score`).removeClass('wrong-score');
    } else {
      component.$(`.s-${studentSeq}-score`).removeClass('wrong-score').addClass('wrong-score');
    }
    component.set('isValid', isValid);
    return isValid;
  },

  updateStudentAssessmentScore(reqBodyParams) {
    let component = this;
    let performanceService = component.get('performanceService');
    return Ember.RSVP.hash({
      studentPerformanceUpdated: Ember.RSVP.resolve(performanceService.updateCollectionOfflinePerformance(reqBodyParams))
    });
  }
});
