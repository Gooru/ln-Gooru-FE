import Ember from 'ember';
import { CONTENT_TYPES } from 'gooru-web/config/config';
import {
  aggregateMilestonePerformanceScore,
  aggregateMilestonePerformanceTimeSpent
} from 'gooru-web/utils/performance-data';
import { roundFloat } from 'gooru-web/utils/math';

export default Ember.Component.extend({
  classNames: ['milestone-report', 'teacher-milestone-performance-report'],

  performanceService: Ember.inject.service('api-sdk/performance'),

  courseService: Ember.inject.service('api-sdk/course'),

  didInsertElement() {
    const component = this;
    component.loadMilestoneLessonsPerformanceData();
  },

  actions: {
    onOpenStudentMilestoneReport(studentId) {
      const component = this;
      component.set('selectedStudentId', studentId);
      // component.set('isShowStudentMilestoneReport', true);
    }
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {UUID} classId
   */
  classId: Ember.computed.alias('class.id'),

  /**
   * @property {UUID} courseId
   */
  courseId: Ember.computed.alias('class.courseId'),

  /**
   * @property {UUID} userId
   */
  userId: Ember.computed.alias('session.userId'),

  /**
   * @property {UUID} milestoneId
   */
  milestoneId: Ember.computed.alias('activeMilestone.milestone_id'),

  /**
   * @property {String} frameworkCode
   */
  frameworkCode: Ember.computed.alias('class.preference.framework'),

  /**
   * @property {Array} milestones
   */
  milestones: Ember.A([]),

  students: Ember.A([]),

  studentsLessonsPerformanceData: Ember.A([]),

  loadMilestoneLessonsPerformanceData() {
    const component = this;
    let milestoneLessons = component.get('activeMilestone.lessons');
    return Ember.RSVP
      .hash({
        milestoneLessonsPerformanceData: component.fetchMilestoneLessonsPerformance(
          CONTENT_TYPES.ASSESSMENT
        ),
        milestoneLessons: milestoneLessons || component.fetchMilestoneLessons()
      })
      .then(({ milestoneLessons, milestoneLessonsPerformanceData }) => {
        component.set('activeMilestone.lessons', milestoneLessons);
        component.getAggregatedLessonsPerformance(
          milestoneLessonsPerformanceData
        );
        component.parseStudentsLessonsPerformanceData(
          milestoneLessonsPerformanceData
        );
      });
  },

  fetchMilestoneLessons() {
    const component = this;
    const courseId = component.get('courseId');
    const milestoneId = component.get('milestoneId');
    return component
      .get('courseService')
      .getCourseMilestoneLessons(courseId, milestoneId);
  },

  fetchMilestoneLessonsPerformance(contentType) {
    const component = this;
    const performanceService = component.get('performanceService');
    const classId = component.get('classId');
    const courseId = component.get('courseId');
    const milestoneId = component.get('milestoneId');
    const frameworkCode = component.get('frameworkCode');
    return performanceService.getLessonsPerformanceByMilestoneId(
      classId,
      courseId,
      milestoneId,
      contentType,
      undefined,
      frameworkCode
    );
  },

  getAggregatedLessonsPerformance(lessonsPerformance) {
    const component = this;
    let lessons = component.get('activeMilestone.lessons');
    if (lessons.length) {
      lessons.map(lesson => {
        let lessonPerformanceData = Ember.Object.create({
          score: null,
          timeSpent: null,
          hasStarted: false,
          isCompleted: false
        });
        let lessonPerformance = lessonsPerformance.filterBy(
          'lessonId',
          lesson.get('lesson_id')
        );
        if (lessonPerformance.length) {
          let aggregatedScore = aggregateMilestonePerformanceScore(
            lessonPerformance
          );
          let aggregatedTimeSpent = aggregateMilestonePerformanceTimeSpent(
            lessonPerformance
          );
          lessonPerformanceData.set('score', aggregatedScore);
          lessonPerformanceData.set('timeSpent', aggregatedTimeSpent);
          lessonPerformanceData.set(
            'hasStarted',
            aggregatedScore > 0 || aggregatedTimeSpent > 0
          );
        }
        lesson.set('performance', lessonPerformanceData);
      });
    }
  },

  parseStudentsLessonsPerformanceData(milestoneLessonsPerformanceData) {
    const component = this;
    let studentsLessonsPerformanceData = Ember.A([]);
    let students = component.get('students');
    let lessons = component.get('activeMilestone.lessons');
    students.map(student => {
      let studentLessonsPerformanceContext = Ember.Object.create({
        hasStarted: false,
        score: null,
        id: student.get('id'),
        firstName: student.get('firstName'),
        lastName: student.get('lastName'),
        avatarUrl: student.get('avatarUrl')
      });
      let userPerformanceData = Ember.A([]);
      let userLessonsPerformance = milestoneLessonsPerformanceData.filterBy(
        'userUid',
        student.get('id')
      );
      let studentPerformanceScore = 0;
      let lessonSeq = 1;
      let totalStudentPlayedLessons = userLessonsPerformance.length;
      let isStudentHasStarted = false;
      // let studentLessonsPerformanceDataContext = studentLessonsPerformanceContext.get('userPerformanceData');
      lessons.map(lesson => {
        let lessonPerformanceContext = Ember.Object.create({
          id: lesson.get('lesson_id'),
          hasStarted: false,
          sequence: lessonSeq
        });
        let lessonPerformance = userLessonsPerformance.findBy(
          'lessonId',
          lesson.get('lesson_id')
        );
        if (lessonPerformance) {
          lessonPerformanceContext.set(
            'score',
            lessonPerformance.get('performance.scoreInPercentage')
          );
          lessonPerformanceContext.set(
            'timeSpent',
            lessonPerformance.get('performance.timeSpent')
          );
          lessonPerformanceContext.set('hasStarted', true);
          studentPerformanceScore += lessonPerformance.get(
            'performance.scoreInPercentage'
          );
          isStudentHasStarted = true;
        }
        userPerformanceData.pushObject(
          Object.assign(lessonPerformanceContext, lesson)
        );
        lessonSeq++;
      });
      let studentMilestoneScoreInPercentage = totalStudentPlayedLessons
        ? roundFloat(studentPerformanceScore / totalStudentPlayedLessons)
        : 0;
      studentLessonsPerformanceContext.set(
        'score',
        studentMilestoneScoreInPercentage
      );
      studentLessonsPerformanceContext.set('hasStarted', isStudentHasStarted);
      studentLessonsPerformanceContext.set(
        'userPerformanceData',
        userPerformanceData
      );
      studentsLessonsPerformanceData.pushObject(
        studentLessonsPerformanceContext
      );
    });
    component.set(
      'studentsLessonsPerformanceData',
      studentsLessonsPerformanceData
    );
  }
});
