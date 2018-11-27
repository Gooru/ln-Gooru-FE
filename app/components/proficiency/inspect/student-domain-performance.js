import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['inspect-competency', 'student-domain-performance'],

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    let component = this;
    component.set('isLoading', true);
    component.parseStudentsDomainProficiencyData();
  },

  // -------------------------------------------------------------------------
  // Actions
  actions : {
    // Action triggered when click left/right arrow
    onClickArrow(direction) {
      let component = this;
      let scrollableContainer = component.$('.scrollable-container');
      let curPos = scrollableContainer.scrollLeft();
      let nextPos = direction === 'left' ? curPos - 120 : curPos + 120;
      scrollableContainer.animate({
        scrollLeft: nextPos
      }, 400);
    },

    //Action triggered when select a domain
    onSelectDomain(domain) {
      let component = this;
      component.sendAction('onSelectDomain', domain);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {JSON} courseCoverageCount
   */
  courseCoverageCount: Ember.Object.create({
    'mastered': 0,
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
   * @property {String} subjectFramework
   */
  subjectFramework: Ember.computed('subjectBucket', function() {
    let component = this;
    let subjectBucket = component.get('subjectBucket');
    return subjectBucket ? subjectBucket.replace(/\./g, ' | ') : '';
  }),

  // -------------------------------------------------------------------------
  // Methods
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
    if (domainLevelSummary) {
      let studentsCompetencyMatrix = domainLevelSummary.students;
      let domainCompetencies = domainLevelSummary.domainCompetencies;
      let notStartedCourseCompetencyCoverage = 0;
      let inProgressCourseCompetencyCoverage = 0;
      let masteredCourseCompetencyCoverage = 0;
      let studentsDomainCompetencyCoverage = Ember.A([]);
      classMembers.map( member => {
        let studentDomainPerformance = component.generateStudentData(member);
        let studentCompetencyMatrix = studentsCompetencyMatrix.findBy('id', member.id);
        let userCompetencyMatrix = studentCompetencyMatrix ? studentCompetencyMatrix.userCompetencyMatrix : null;
        let studentDomainCompetencies = Ember.A([]);
        domainCompetencies.map( domain => {
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
          let userDomainCompetencyMatrix = userCompetencyMatrix.findBy('domainCode', domain.domainCode);
          let userDomainMatrixCompetencies = userDomainCompetencyMatrix.competencies;
          competencies.map( competency => {
            totalCompetencies++;
            let studentCompetencyPerformanceData = Ember.Object.create({
              competencyCode: competency.competencyCode,
              competencyName: competency.competencyName,
              competencyDesc: competency.competencyDesc,
              competencySeq: competency.competencySeq,
              competencyStudentDesc: competency.competencyStudentDesc,
              competencyStatus: 0
            });
            let competencyStatus = userDomainMatrixCompetencies[`${competency.competencyCode}`];
            studentCompetencyPerformanceData.set('competencyStatus', competencyStatus);
            studentDomainCompetenciesInfo.push(studentCompetencyPerformanceData);
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

          let curDomainObject = studentsDomainCompetencyCoverage[domain.domainSeq - 1];
          let curDomainInProgressCount = curDomainObject ? curDomainObject.get('in-progress') : 0;
          let curDomainNotStartedCount = curDomainObject ? curDomainObject.get('not-started') : 0;
          let curDomainMasteredCount = curDomainObject ? curDomainObject.get('mastered') : 0;
          studentsDomainCompetencyCoverage[domain.domainSeq - 1] = Ember.Object.create({
            domainCode: domain.domainCode,
            domainName: domain.domainName,
            domainSeq: domain.domainSeq,
            'in-progress':  curDomainInProgressCount + inProgressDomainCompetencyCoverage,
            'not-started': curDomainNotStartedCount + notStartedDomainCompetencyCoverage,
            'mastered': curDomainMasteredCount + masteredDomainCompetencyCoverage
          });
          studentCompetencies.set('competencies', studentDomainCompetenciesInfo.sortBy('competencyStatus').reverse());
          studentDomainCompetencies.push(studentCompetencies);
        });
        studentDomainPerformance.set('domainCompetencies', studentDomainCompetencies);
        studentsDomainPerformance.push(studentDomainPerformance);

      });
      component.set('domainCoverageCount', studentsDomainCompetencyCoverage);
      let courseCoverageCount = Ember.Object.create({
        'not-started': notStartedCourseCompetencyCoverage,
        'in-progress': inProgressCourseCompetencyCoverage,
        'mastered': masteredCourseCompetencyCoverage
      });
      component.set('courseCoverageCount', courseCoverageCount);
    }
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
      fullName: `${student.get('lastName')  } ${  student.get('firstName')}`,
      id: student.get('id'),
      email: student.get('email'),
      thumbnail: student.get('avatarUrl'),
      username: student.get('username'),
      domainCompetencies: Ember.A([])
    });
  }
});
