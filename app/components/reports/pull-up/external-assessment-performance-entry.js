import Ember from 'ember';
import {getBarGradeColor, generateUUID, validatePercentage} from 'gooru-web/utils/utils';

export default Ember.Component.extend({

  classNames: ['performance-manual-entry', 'external-assessment-performance-entry'],

  performanceService: Ember.inject.service('api-sdk/performance'),

  session: Ember.inject.service('session'),

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

  updateScoredElement(studentSeq) {
    let component = this;
    let enteredScore = component.$(`.s-${studentSeq}-score`).val();
    if (enteredScore && !isNaN(enteredScore)) {
      component.$(`.student-${studentSeq}`).removeClass('scored').addClass('scored');
      component.$(`.student-${studentSeq} .student-thumbnail`).css('background-color', getBarGradeColor(enteredScore));
    } else {
      component.$(`.student-${studentSeq}`).removeClass('scored');
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

  updateStudentAssessmentScore(reqBodyParams) {
    let component = this;
    let performanceService = component.get('performanceService');
    return Ember.RSVP.hash({
      studentPerformanceUpdated: Ember.RSVP.resolve(performanceService.updateCollectionOfflinePerformance(reqBodyParams))
    });
  }
});
