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
  // Actions
  actions: {
    //Action triggered when select a domain
    onSelectDomain(domain) {
      let controller = this;
      controller.set('isShowCourseCompetencyReport', false);
      controller.set('isShowDomainCompetencyReport', true);
      controller.set('activeDomain', domain);
    },

    //Action triggered when click back arrow
    onClickBack() {
      let controller = this;
      controller.set('isShowDomainCompetencyReport', false);
      controller.set('isShowCourseCompetencyReport', true);
    },

    //Action triggered when click class view
    onClickClassView() {
      let controller = this;
      controller.set('isShowCourseCompetencyReport', false);
      controller.set('isShowClassProficiencyReport', true);
    },

    //Action triggered when click course competency report view
    onClickCourseCompetencyView() {
      let controller = this;
      controller.set('isShowClassProficiencyReport', false);
      controller.set('isShowCourseCompetencyReport', true);
    },

    //Action triggered when select a student
    onSelectStudent(student) {
      let controller = this;
      let activeStudentData = Ember.Object.create({
        firstName: student.firstName,
        lastName: student.lastName,
        avatarUrl: student.thumbnail,
        fullName: student.fullName,
        id: student.id
      });
      controller.set('activeStudent', activeStudentData);
      controller.set('isShowProficiencyPullup', true);
    },

    /**
     * Action triggered when select a competency
     */
    onSelectCompetency(competency) {
      let controller = this;
      controller.set('selectedCompetency', competency);
      controller.set('isShowCompetencyContentReport', true);
    },

    // Action triggered when close competency report pullup
    onCloseCompetencyReportPullUp() {
      this.set('isShowCompetencyContentReport', false);
    },

    /**
     * Action triggered when the user click outside of pullup.
     **/
    onClosePullUp() {
      this.set('isShowProficiencyPullup', false);
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function loadStudentsProficiencyData
   * Method to load students proficiency data
   */
  loadStudentsProficiencyData() {
    let controller = this;
    return Ember.RSVP.hash({
      domainLevelSummary: controller.fetchDomainLevelSummary()
    }).then(({ domainLevelSummary }) => {
      controller.set('domainLevelSummary', domainLevelSummary);
      controller.parseStudentsDomainProficiencyData();
    });
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
    let domainLevelSummaryPromise = Ember.RSVP.resolve(
      competencyService.getDomainLevelSummary(filters)
    );
    return Ember.RSVP.hash({
      domainLevelSummary: domainLevelSummaryPromise
    })
      .then(({ domainLevelSummary }) => {
        controller.set('isDataNotAvailable', false);
        return domainLevelSummary;
      })
      .catch(function() {
        controller.set('isDataNotAvailable', true);
      });
  },

  /**
   * @function parseStudentsDomainProficiencyData
   * Method to parse students domain proficiency data
   */
  parseStudentsDomainProficiencyData() {
    let component = this;
    let studentsDomainPerformance = Ember.A([]);
    let domainLevelSummary = component.get('domainLevelSummary');
    let classMembers = component.get('classMembers');
    let totalCompetencies = 0;
    let maxNumberOfCompetencies = 0;
    if (domainLevelSummary) {
      let studentsCompetencyMatrix = domainLevelSummary.students;
      let domainCompetencies = domainLevelSummary.domainCompetencies;
      let notStartedCourseCompetencyCoverage = 0;
      let inProgressCourseCompetencyCoverage = 0;
      let masteredCourseCompetencyCoverage = 0;
      let studentsDomainCompetencyCoverage = Ember.A([]);
      classMembers.map(member => {
        let studentDomainPerformance = component.generateStudentData(member);
        let studentCompetencyMatrix = studentsCompetencyMatrix.findBy(
          'id',
          member.id
        );
        let userCompetencyMatrix = studentCompetencyMatrix
          ? studentCompetencyMatrix.userCompetencyMatrix
          : null;
        let studentDomainCompetencies = Ember.A([]);
        domainCompetencies.map(domain => {
          let studentCompetencies = Ember.Object.create({
            domainCode: domain.domainCode,
            domainName: domain.domainName,
            domainSeq: domain.domainSeq,
            competencies: Ember.A([])
          });
          let notStartedDomainCompetencyCoverage = 0;
          let inProgressDomainCompetencyCoverage = 0;
          let masteredDomainCompetencyCoverage = 0;
          let studentDomainCompetenciesInfo = Ember.A([]);
          let competencies = domain.competencies;
          let userDomainCompetencyMatrix = userCompetencyMatrix.findBy(
            'domainCode',
            domain.domainCode
          );
          let userDomainMatrixCompetencies =
            userDomainCompetencyMatrix.competencies;
          maxNumberOfCompetencies =
            maxNumberOfCompetencies < competencies.length
              ? competencies.length
              : maxNumberOfCompetencies;
          competencies.map(competency => {
            totalCompetencies++;
            let studentCompetencyPerformanceData = Ember.Object.create({
              competencyCode: competency.competencyCode,
              competencyName: competency.competencyName,
              competencyDesc: competency.competencyDesc,
              competencySeq: competency.competencySeq,
              competencyStudentDesc: competency.competencyStudentDesc,
              competencyStatus: 0
            });
            let competencyStatus =
              userDomainMatrixCompetencies[`${competency.competencyCode}`];
            studentCompetencyPerformanceData.set(
              'competencyStatus',
              competencyStatus
            );
            studentDomainCompetenciesInfo.push(
              studentCompetencyPerformanceData
            );
            if (competencyStatus === 0) {
              notStartedCourseCompetencyCoverage++;
              notStartedDomainCompetencyCoverage++;
            } else if (competencyStatus === 1) {
              inProgressCourseCompetencyCoverage++;
              inProgressDomainCompetencyCoverage++;
            } else {
              masteredCourseCompetencyCoverage++;
              masteredDomainCompetencyCoverage++;
            }
          });

          let curDomainObject =
            studentsDomainCompetencyCoverage[domain.domainSeq - 1];
          let curDomainInProgressCount = curDomainObject
            ? curDomainObject.get('in-progress')
            : 0;
          let curDomainNotStartedCount = curDomainObject
            ? curDomainObject.get('not-started')
            : 0;
          let curDomainMasteredCount = curDomainObject
            ? curDomainObject.get('mastered')
            : 0;
          studentsDomainCompetencyCoverage[
            domain.domainSeq - 1
          ] = Ember.Object.create({
            domainCode: domain.domainCode,
            domainName: domain.domainName,
            domainSeq: domain.domainSeq,
            'in-progress':
              curDomainInProgressCount + inProgressDomainCompetencyCoverage,
            'not-started':
              curDomainNotStartedCount + notStartedDomainCompetencyCoverage,
            mastered: curDomainMasteredCount + masteredDomainCompetencyCoverage,
            'total-coverage':
              curDomainInProgressCount +
              inProgressDomainCompetencyCoverage +
              notStartedDomainCompetencyCoverage +
              masteredDomainCompetencyCoverage
          });
          studentCompetencies.set(
            'competencies',
            studentDomainCompetenciesInfo.sortBy('competencyStatus').reverse()
          );
          studentCompetencies.set(
            'in-progress',
            inProgressDomainCompetencyCoverage
          );
          studentCompetencies.set('mastered', masteredDomainCompetencyCoverage);
          studentCompetencies.set(
            'not-started',
            notStartedDomainCompetencyCoverage
          );
          studentDomainCompetencies.push(studentCompetencies);
        });
        studentDomainPerformance.set(
          'domainCompetencies',
          studentDomainCompetencies
        );
        studentsDomainPerformance.push(studentDomainPerformance);
      });
      component.set('domainCoverageCount', studentsDomainCompetencyCoverage);
      let courseCoverageCount = Ember.Object.create({
        'not-started': notStartedCourseCompetencyCoverage,
        'in-progress': inProgressCourseCompetencyCoverage,
        mastered: masteredCourseCompetencyCoverage
      });
      component.set('courseCoverageCount', courseCoverageCount);
    }
    component.set('maxNumberOfCompetencies', maxNumberOfCompetencies);
    component.set('studentsDomainPerformance', studentsDomainPerformance);
    component.set('totalCompetencies', totalCompetencies / classMembers.length);
    component.set('isLoading', false);
    return studentsDomainPerformance;
  },

  /**
   * @function generateStudentData
   * Method to generate student data structure
   */
  generateStudentData(student) {
    return Ember.Object.create({
      firstName: student.get('firstName'),
      lastName: student.get('lastName'),
      fullName: `${student.get('lastName')} ${student.get('firstName')}`,
      id: student.get('id'),
      email: student.get('email'),
      thumbnail: student.get('avatarUrl'),
      username: student.get('username'),
      domainCompetencies: Ember.A([])
    });
  },

  /**
   * @function resetProperties
   * Method to reset to default values
   */
  resetProperties() {
    let controller = this;
    controller.set('domainLevelSummary', null);
    controller.set('isShowCourseCompetencyReport', true);
    controller.set('isShowDomainCompetencyReport', false);
    controller.set('isShowClassProficiencyReport', false);
    controller.set('studentDomainPerformance', Ember.A([]));
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
   * @property {Boolean} isShowProficiencyPullup
   */
  isShowProficiencyPullup: false,

  /**
   * @property {Array} domainLevelSummary
   */
  domainLevelSummary: null,

  /**
   * @property {Number} maxCompetencyLength
   */
  maxCompetencyLength: 0,

  /**
   * @property {Boolean} isShowCourseCompetencyReport
   */
  isShowCourseCompetencyReport: true,

  /**
   * @property {Boolean} isShowDomainCompetencyReport
   */
  isShowDomainCompetencyReport: false,

  /**
   * @property {Boolean} isShowCompetencyReport
   */
  isShowCompetencyReport: Ember.computed('course', function() {
    let controller = this;
    let course = controller.get('course');
    let subjectCode = controller.get('subjectCode');
    let classMembers = controller.get('classMembers');
    return course && subjectCode && classMembers.length;
  }),

  /**
   * @property {Boolean} isShowClassProficiencyReport
   */
  isShowClassProficiencyReport: false,

  /**
   * @property {Array} studentsDomainPerformance
   */
  studentsDomainPerformance: Ember.A([]),

  /**
   * @property {JSON} courseCoverageCount
   */
  courseCoverageCount: Ember.Object.create({
    mastered: 0,
    'in-progress': 0,
    'not-started': 0
  }),

  /**
   * @property {Array} domainCoverageCount
   */
  domainCoverageCount: null,

  /**
   * @property {Number} totalCompetencies
   */
  totalCompetencies: 0,

  /**
   * @property {Number} numberOfStudents
   */
  numberOfStudents: Ember.computed('classMembers', function() {
    let controller = this;
    return controller.get('classMembers.length');
  }),
  /**
   * @property {String} subjectFramework
   */
  subjectFramework: Ember.computed('subjectBucket', function() {
    let component = this;
    let subjectBucket = component.get('subjectBucket');
    return subjectBucket ? subjectBucket.replace(/\./g, ' | ') : '';
  })
});
