import Ember from 'ember';
import { getSubjectIdFromSubjectBucket } from 'gooru-web/utils/utils';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  classController: Ember.inject.controller('teacher.class'),

  /**
   * @requires competencyService
   */
  competencyService: Ember.inject.service('api-sdk/competency'),

  /**
   * @requires classService
   */
  classService: Ember.inject.service('api-sdk/class'),

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @function loadStudentsProficiencyData
   * Method to load students proficiency data
   */
  loadStudentsProficiencyData() {
    let controller = this;
    if (!controller.get('courseId')) {
      controller.set('isDataNotAvailable', true);
    } else {
      return Ember.RSVP.hash({
        domainLevelSummary: controller.fetchDomainLevelSummary()
      })
        .then(({ domainLevelSummary}) => {
          controller.set('domainLevelSummary', domainLevelSummary);
        });
    }
  },

  /**
   * @function parseStudentsProficiencyData
   * Method to parse student proficiency data
   */
  parseStudentsProficiencyData(classStudents, domainLevelSummary) {
    let component = this;
    let domainLevelStudentSummaryData = Ember.A([]);
    let maxCompetencyLength = 0;
    if (domainLevelSummary && classStudents.length) {
      let domainCompetencies = domainLevelSummary.domainCompetencies;
      let studentsDomainCompetencies = domainLevelSummary.students;
      domainCompetencies.map( domainData => {
        let numberOfCompetencies = domainData.competencies.length;
        maxCompetencyLength = numberOfCompetencies > maxCompetencyLength ? numberOfCompetencies : maxCompetencyLength;
        domainData.competencyLength = numberOfCompetencies;
        let studentLevelDomainCompetencyData = {
          domainData
        };
        let domainCode = domainData.domainCode;
        let parsedStudentCompetenctData = Ember.A([]);
        classStudents.map( student => {
          let studentDomainCompetencies = studentsDomainCompetencies.findBy('id', student.id);
          let userCompetencyMatrix = studentDomainCompetencies ? studentDomainCompetencies.userCompetencyMatrix : {};
          let currentStudentDomainCompetencies = userCompetencyMatrix.findBy('domainCode', domainCode);
          let parsedData = component.parseStudentCompetencyData(student, domainData, currentStudentDomainCompetencies.competencies);
          parsedStudentCompetenctData.push(parsedData);
        });
        studentLevelDomainCompetencyData.studentCompetencies = parsedStudentCompetenctData;
        domainLevelStudentSummaryData.push(studentLevelDomainCompetencyData);
      });
    }
    component.set('domainStudentSummary', domainLevelStudentSummaryData);
    component.set('maxCompetencyLength', maxCompetencyLength);
    component.set('isLoading', false);
  },

  /**
   * @function parseStudentCompetencyData
   * Method to parse student, domain and user competencies data
   */
  parseStudentCompetencyData(student, domainData, studentDomainCompetencies) {
    let studentDomainCompetencyData = {
      firstName: student.firstName,
      lastName: student.lastName,
      userId: student.id,
      thumbnail: student.avatarUrl,
      fullName: `${student.lastName  } ${  student.firstName}`,
      competencies: Ember.A([])
    };
    if (studentDomainCompetencies) {
      let competencies = Ember.A([]);
      domainData.competencies.map( competency => {
        let competencyData = {
          competencyCode: competency.competencyCode,
          competencySeq: competency.competencySeq,
          competencyName: competency.competencyName,
          competencyDesc: competency.competencyDesc,
          competencyStudentDesc: competency.competencyStudentDesc,
          status: studentDomainCompetencies[`${competency.competencyCode}`]
        };
        competencies.push(competencyData);
      });
      studentDomainCompetencyData.competencies = competencies;
    }
    return studentDomainCompetencyData;
  },


  /**
   * @function fetchDomainLevelSummary
   * Method to fetch domain level summary data
   */
  fetchDomainLevelSummary() {
    let controller = this;
    let competencyService = controller.get('competencyService');
    let filters = {
      classId: controller.get('classId'),
      courseId: controller.get('courseId')
    };
    let domainLevelSummaryPromise = Ember.RSVP.resolve(competencyService.getDomainLevelSummary(filters));
    return Ember.RSVP.hash({
      domainLevelSummary: domainLevelSummaryPromise
    })
      .then(({domainLevelSummary}) => {
        controller.set('isDataNotAvailable', false);
        return domainLevelSummary;
      })
      .catch(function() {
        controller.set('isDataNotAvailable', true);
      });
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Class}
   */
  class: Ember.computed.alias('classController.class'),

  /**
   * @property {Course}
   */
  course: Ember.computed.alias('classController.course'),

  /**
   * @property {classMembers}
   */
  classMembers: Ember.computed.alias('classController.members.members'),

  /**
   * @property {classId}
   */
  classId: Ember.computed('class', function() {
    let controller = this;
    return controller.get('class.id');
  }),

  /**
   * @property {courseId}
   */
  courseId: Ember.computed('course', function() {
    let controller = this;
    return controller.get('course.id');
  }),

  /**
   * @property {subjectCode}
   */
  subjectCode: Ember.computed('course', function() {
    let controller = this;
    let course = controller.get('course');
    let subjectBucket = course.get('subject');
    return subjectBucket ? getSubjectIdFromSubjectBucket(subjectBucket) : null;
  }),

  /**
   * @property {String}
   * Property to store course subject bucket or K12.MA will be default
   */
  subjectBucket: Ember.computed('course', function() {
    let controller = this;
    return controller.get('course.subject') || 'K12.MA';
  }),

  /**
   * @property {Array} domainLevelSummary
   */
  domainLevelSummary: null,

  /**
   * @property {Number} maxCompetencyLength
   */
  maxCompetencyLength: 0
});
