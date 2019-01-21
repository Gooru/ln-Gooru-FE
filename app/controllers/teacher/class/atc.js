import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * Analytics Service
   */
  analyticsService: Ember.inject.service('api-sdk/analytics'),

  /**
   * Class Service
   */
  classService: Ember.inject.service('api-sdk/class'),

  session: Ember.inject.service('session'),

  classController: Ember.inject.controller('teacher.class'),

  // -------------------------------------------------------------------------
  // Properties
  /**
   * A link to the parent class controller
   * @see controllers/class.js
   * @property {Class}
   */
  class: Ember.computed.alias('classController.class'),

  course: Ember.computed.alias('class.course'),

  classId: Ember.computed.alias('class.id'),

  courseId: Ember.computed.alias('course.id'),

  students: Ember.computed.alias('class.members'),

  subjectCode: Ember.computed.alias('course.subject'),

  init() {
    const controller = this;
    controller.loadClassAtcData();
  },

  loadClassAtcData() {
    const controller = this;
    controller.fetchClassAtcPerforamnceSummary().then(function(atcPerformance) {
      let students = controller.get('students');
      controller.set('classAtcPerformanceSummary', controller.parseClassAtcPerformanceSummary(students, atcPerformance));
    });
  },

  fetchClassAtcPerforamnceSummary() {
    const component = this;
    const analyticsService = component.get('analyticsService');
    let classId = component.get('classId');
    let courseId = component.get('courseId');
    let subjectCode = component.get('subjectCode');
    return Ember.RSVP.resolve(
      analyticsService.getAtcPerformanceSummaryPremiumClass(
        classId,
        courseId,
        subjectCode
      )
    );
  },

  parseClassAtcPerformanceSummary(students, performanceSummary) {
    let parsedPerformanceSummary = Ember.A([]);
    if (students && students.length) {
      students.map(student => {
        let studentPerformanceData = Ember.Object.create({
          id: student.id,
          thumbnail: student.avatarUrl,
          fullName: `${student.lastName} ${student.firstName}`,
          percentScore: 0,
          completedCompetencies: 0
        });
        let studentPerformanceSummary = performanceSummary.findBy('userId', student.id);
        if (studentPerformanceSummary) {
          studentPerformanceData.set('totalCompetencies', studentPerformanceSummary.totalCompetencies);
          studentPerformanceData.set('completedCompetencies', studentPerformanceSummary.completedCompetencies);
          studentPerformanceData.set('inprogressCompetencies', studentPerformanceSummary.inprogressCompetencies);
          studentPerformanceData.set('percentCompletion', studentPerformanceSummary.percentCompletion);
          studentPerformanceData.set('percentScore', studentPerformanceSummary.percentScore);
          studentPerformanceData.set('gradeId', studentPerformanceSummary.gradeId);
          parsedPerformanceSummary.push(studentPerformanceData);
        }
      });
    }
    return parsedPerformanceSummary;
  },

  /**
   * @function getStudentIdentity
   * Method to find out student identity to show in the ATC view chart
   */
  getStudentIdentity(student) {
    let identity = 'NA';
    if (student) {
      if (student.firstName || student.lastName) {
        let firstName = student.firstName;
        let lastName = student.lastName;
        identity = `${lastName ? lastName.charAt(0) : ''} ${
          firstName ? firstName.charAt(0) : ''
        }`;
      } else if (student.email) {
        let validEmailChars = student.email.split('@')[0];
        identity = validEmailChars.substring(0, 2);
      } else if (student.username) {
        identity = student.username.substring(0, 2);
      }
    }
    return identity;
  }

});
