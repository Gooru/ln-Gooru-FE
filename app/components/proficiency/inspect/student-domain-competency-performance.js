import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['inspect', 'student-domain-competency-performance'],

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    let component = this;
    component.parseStudentsDomainCompetencyPerformance();
  },

  didRender() {
    var component = this;
    component.$('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    //Action triggered when click back arrow
    onClickBack() {
      let component = this;
      component.sendAction('onClickBack');
    },

    //Action triggered when carousel through domain sequence
    onChangeDomainSeq(direction) {
      let component = this;
      let curDomainSeq = component.get('activeDomainSeq');
      let updatedDomainSeq =
        direction === 'left' ? curDomainSeq - 1 : curDomainSeq + 1;
      let domainsCompetencyPerformance = component.get(
        'domainsCompetencyPerformance'
      );
      let activeDomain = domainsCompetencyPerformance.objectAt(
        updatedDomainSeq - 1
      );
      component.set('activeDomainSeq', updatedDomainSeq);
      component.set('activeDomainCompetencyPerformance', activeDomain);
      component.set('activeDomain', activeDomain.domainData);
    },

    //Action triggered when select a competency
    onSelectCompetency(competency, studentId) {
      let component = this;
      component.set('selectedCompetency', competency);
      component.set('selectedStudentUserId', studentId);
      component.set('isShowCompetencyContentReport', true);
    },

    /**
     * Action triggered when click global view
     */
    onToggleGlobalCompetencyView(gutCode) {
      let component = this;
      component.fetchLearningMapsContent(gutCode);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Array} domainsCompetencyPerformance
   */
  domainsCompetencyPerformance: Ember.A([]),

  /**
   * @property {JSON} activeDomain
   */
  activeDomain: null,

  /**
   * @property {Number} activeDomainSeq
   */
  activeDomainSeq: Ember.computed('activeDomain', function() {
    let component = this;
    let activeDomain = component.get('activeDomain');
    return activeDomain ? activeDomain.domainSeq : 1;
  }),

  /**
   * @property {JSON} activeDomainCompetencyPerformance
   */
  activeDomainCompetencyPerformance: Ember.computed(
    'domainsCompetencyPerformance',
    function() {
      let component = this;
      let domainsCompetencyPerformance = component.get(
        'domainsCompetencyPerformance'
      );
      let activeDomainSeq = component.get('activeDomainSeq');
      return domainsCompetencyPerformance.objectAt(`${activeDomainSeq - 1}`);
    }
  ),

  /**
   * @property {Number} numberOfDomains
   */
  numberOfDomains: Ember.computed('domainsCompetencyPerformance', function() {
    let component = this;
    let domainsCompetencyPerformance = component.get(
      'domainsCompetencyPerformance'
    );
    return domainsCompetencyPerformance
      ? domainsCompetencyPerformance.length
      : 0;
  }),

  /**
   * @property {Object} domainCompetencyList
   */
  domainCompetencyList: Ember.computed(
    'selectedStudentUserId',
    'activeDomain',
    function() {
      let competencies = this.get(
        'activeDomainCompetencyPerformance.studentCompetencies'
      );
      let studentId = this.get('selectedStudentUserId');
      let doaminCompetencies = competencies.findBy('userId', studentId);
      let activeDomain = this.get('activeDomain');
      return Ember.Object.create({
        domainCode: activeDomain.domainCode,
        competencies: doaminCompetencies.competencies
      });
    }
  ),

  /**
   * @property {String} sortCriteria
   */
  sortCriteria: 'lastName',

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function parseStudentsDomainCompetencyPerformance
   * Method to parse student proficiency data
   */
  parseStudentsDomainCompetencyPerformance() {
    let component = this;
    let domainLevelSummary = component.get('domainLevelSummary');
    let classMembers = component.get('classMembers');
    let domainLevelStudentSummaryData = Ember.A([]);
    let maxCompetencyLength = 0;
    if (domainLevelSummary && classMembers.length) {
      let domainCompetencies = domainLevelSummary.domainCompetencies;
      let studentsDomainCompetencies = domainLevelSummary.students;
      domainCompetencies.map(domainData => {
        let numberOfCompetencies = domainData.competencies.length;
        maxCompetencyLength =
          numberOfCompetencies > maxCompetencyLength
            ? numberOfCompetencies
            : maxCompetencyLength;
        domainData.competencyLength = numberOfCompetencies;
        let studentLevelDomainCompetencyData = {
          domainData
        };
        let domainCode = domainData.domainCode;
        let parsedStudentCompetenctData = Ember.A([]);
        classMembers.map(student => {
          let studentDomainCompetencies = studentsDomainCompetencies.findBy(
            'id',
            student.id
          );
          let userCompetencyMatrix = studentDomainCompetencies
            ? studentDomainCompetencies.userCompetencyMatrix
            : {};
          let currentStudentDomainCompetencies = userCompetencyMatrix.findBy(
            'domainCode',
            domainCode
          );
          let parsedData = component.parseStudentCompetencyData(
            student,
            domainData,
            currentStudentDomainCompetencies.competencies
          );
          parsedStudentCompetenctData.push(parsedData);
        });
        studentLevelDomainCompetencyData.studentCompetencies = parsedStudentCompetenctData.sortBy(
          component.get('sortCriteria')
        );
        domainLevelStudentSummaryData.push(studentLevelDomainCompetencyData);
      });
    }
    component.set(
      'domainsCompetencyPerformance',
      domainLevelStudentSummaryData
    );
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
      fullName: `${student.lastName} ${student.firstName}`,
      competencies: Ember.A([])
    };
    if (studentDomainCompetencies) {
      let competencies = Ember.A([]);
      domainData.competencies.map(competency => {
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
   * @function fetchLearningMapsContent
   * Method to fetch learning maps content
   */
  fetchLearningMapsContent(competencyCode) {
    let component = this;
    let searchService = component.get('searchService');
    let filters = {
      startAt: 0,
      length: 5,
      isCrosswalk: false
    };
    return Ember.RSVP
      .hash({
        learningMapData: searchService.fetchLearningMapsContent(
          competencyCode,
          filters
        )
      })
      .then(({ learningMapData }) => {
        if (!component.isDestroyed) {
          component.set('learningMapData', learningMapData);
        }
      });
  }
});
