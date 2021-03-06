import Ember from 'ember';
import { ROLES, SCREEN_SIZES } from 'gooru-web/config/config';
import { isCompatibleVW } from 'gooru-web/utils/utils';
import {
  flattenGutToFwCompetency,
  flattenGutToFwDomain,
  getCategoryCodeFromSubjectId
} from 'gooru-web/utils/taxonomy';
export default Ember.Mixin.create({
  // -------------------------------------------------------------------------
  // Dependencies

  session: Ember.inject.service('session'),

  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyProvider: Ember.inject.service('api-sdk/taxonomy'),

  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyService: Ember.inject.service('taxonomy'),

  /**
   * competency service dependency injection
   * @type {Object}
   */
  competencyService: Ember.inject.service('api-sdk/competency'),

  /**
   * @property {Object}
   * Property to store active subject which is selected
   */
  activeSubject: null,

  /**
   * @property {String}
   * Property to store course subject bucket or K12.MA will be default
   */
  subjectBucket: Ember.computed('course', function() {
    let component = this;
    return component.get('course.subject') || null;
  }),

  /**
   * Parse  category from subject id
   */
  categoryCode: Ember.computed('course', function() {
    let course = this.get('course');
    let subject = this.get('subjectBucket');
    if (course && course.get('id') && subject) {
      return getCategoryCodeFromSubjectId(subject);
    }
  }),
  /**
   * @property {Array} taxonomyGrades
   */
  taxonomyGrades: Ember.A([]),

  /**
   * @property {Number} classGrade
   */
  classGrade: Ember.computed.alias('class.gradeCurrent'),

  /**
   * @property {String} subjectCode
   */
  subjectCode: Ember.computed('activeSubject', function() {
    let component = this;
    let subject = component.get('activeSubject');
    return subject ? subject.id : '';
  }),

  /**
   * @property {JSON}
   * Property to store currently selected month and year
   */
  timeLine: Ember.computed(function() {
    let curDate = new Date();
    return {
      month: curDate.getMonth() + 1,
      year: curDate.getFullYear()
    };
  }),

  /**
   * @property {Boolean} showGutCompetency
   */
  showGutCompetency: false,

  /**
   * @property {Object} userStandardPreference
   */
  userStandardPreference: null,

  /**
   * @property {Boolean} isShowMatrixChart
   */
  isShowMatrixChart: true,

  /**
   * @property {Boolean}
   * Property to store given screen value is compatible
   */
  isMobile: isCompatibleVW(SCREEN_SIZES.LARGE),

  /**
   * @property {Object}
   * Property to store selected competency
   */
  selectedCompetency: null,

  /**
   * Property to store selected category
   * @type {Object}
   */
  selectedCategory: null,

  /**
   * Property to store domain competency list
   * @type {Object}
   */
  domainCompetencyList: null,

  /**
   * It will have singature content competencty list for current active subject
   * @type {Object}
   */
  signatureCompetencyList: null,

  /**
   * @property {Boolean}
   * Property to store is student or not
   */
  isStudent: Ember.computed.equal('session.role', ROLES.STUDENT),

  /**
   * @property {String}
   * Property to store is class framework
   */
  framework: null,

  actions: {
    onSelectCategory(category) {
      let component = this;
      component.set('selectedCategory', category);
      component.set('showDomainInfo', false);
      component.set('showCompetencyInfo', false);
      component.set('selectedCompetency', null);
      component.set('selectedDomain', null);
      component.fetchSubjectsByCategory(category);
    },
    /**
     * Action triggered when select a month from chart
     */
    onSelectMonth(date) {
      let timeLine = {
        month: date.getMonth() + 1,
        year: date.getFullYear()
      };
      this.set('timeLine', timeLine);
      this.loadDataBySubject();
    },

    onSubjectChange(subject) {
      let component = this;
      component.set('activeSubject', subject);
      component.set('showDomainInfo', false);
      component.set('showCompetencyInfo', false);
      component.set('selectedCompetency', null);
      component.set('selectedDomain', null);
      component.fetchTaxonomyGrades();
      component.loadDataBySubject();
      component.fetchSignatureCompetencyList();
    },

    /**
     * Action triggered when select a competency
     */
    onSelectCompetency(competency, domainCompetencyList) {
      let component = this;
      component.setSignatureContent(competency);
      component.set('selectedCompetency', competency);
      component.set('domainCompetencyList', domainCompetencyList);
      component.set('showCompetencyInfo', true);
    },

    onDomainSelect(domain) {
      let component = this;
      component.set('selectedDomain', domain);
      let domainCompetencies = component.get('competencyMatrixDomains');
      let selectedDomainCompetencies = domainCompetencies.findBy(
        'domainCode',
        domain.get('domainCode')
      );
      component.set(
        'selectedDomainCompetencies',
        selectedDomainCompetencies.get('competencies')
      );
      component.set('selectedCompetency', null);
      component.set('showDomainInfo', true);
      component.set('showCompetencyInfo', false);
    },

    onClosePullUp() {
      let component = this;
      component.set('selectedCompetency', null);
    }
  },

  setSignatureContent(competency) {
    let component = this;
    const signatureCompetencyList = component.get('signatureCompetencyList');
    const domainCode = competency.get('domainCode');
    const competencyStatus = competency.get('status');
    let showSignatureAssessment =
      signatureCompetencyList[domainCode] ===
        competency.get('competencyCode') ||
      competencyStatus === 2 ||
      competencyStatus === 4;
    competency.set('showSignatureAssessment', showSignatureAssessment);
  },
  /**
   * This method will load the initial set  of data
   */
  loadData() {
    let component = this;
    let categories = component.get('taxonomyCategories');
    let categoryCode = component.get('categoryCode');
    let defaultCategory = categoryCode
      ? categories.findBy('code', categoryCode)
      : categories.get('firstObject');
    if (defaultCategory) {
      component.set('selectedCategory', defaultCategory);
      component.fetchSubjectsByCategory(defaultCategory);
    }
  },

  fetchSignatureCompetencyList() {
    let component = this;
    let subject = component.get('subjectCode');
    let userId = component.get('studentProfile.id');
    return Ember.RSVP.hash({
      competencyList: component
        .get('competencyService')
        .getUserSignatureCompetencies(userId, subject)
    }).then(({ competencyList }) => {
      component.set('signatureCompetencyList', competencyList);
    });
  },

  /**
   * @function fetchSubjectsByCategory
   * @param subjectCategory
   * Method to fetch list of subjects using given category level
   */
  fetchSubjectsByCategory(category) {
    let component = this;
    component
      .get('taxonomyService')
      .getTaxonomySubjects(category.get('id'))
      .then(subjects => {
        component.set('taxonomySubjects', subjects);
        if (subjects.length) {
          let subject = component.getActiveSubject(subjects);
          component.set('activeSubject', subject);
          component.set('isShowMatrixChart', true);
          component.fetchTaxonomyGrades();
          component.loadDataBySubject();
          component.fetchSignatureCompetencyList();
        } else {
          component.set('isShowMatrixChart', false);
          component.set('activeSubject', null);
        }
      });
  },

  /**
   * @function getActiveSubject
   * Method to get active subject by using subject bucket
   */
  getActiveSubject(subjects) {
    let component = this;
    let activeSubject = subjects.objectAt(0);
    let subjectBucket = component.get('subjectBucket');
    subjects.map(subject => {
      if (subjectBucket) {
        if (subjectBucket && subjectBucket.split(subject.id).length > 1) {
          activeSubject = subject;
        }
      }
    });
    return activeSubject;
  },

  /**
   * @function loadDataBySubject
   * Method to fetch domain and co-ordinate data using subject id
   */
  loadDataBySubject() {
    let component = this;
    let subjectId = component.get('activeSubject.id');
    let userId = component.get('studentProfile.id');
    let timeLine = component.get('timeLine');
    const subjectCode = component.get('activeSubject.code');
    const classFrameworkCode = component.get('class.preference.framework');
    const classSubjectCode = component.get('class.preference.subject');
    if (classSubjectCode !== subjectCode || !classFrameworkCode) {
      const userStandardPreference = component.get('userStandardPreference');
      const frameworkCode = userStandardPreference[subjectCode];
      component.set('framework', frameworkCode);
    } else {
      component.set('framework', classFrameworkCode);
    }
    let frameworkId = component.get('framework');
    if (subjectId) {
      return Ember.RSVP.hash({
        competencyMatrixs: component
          .get('competencyService')
          .getCompetencyMatrixDomain(userId, subjectId, timeLine),
        competencyMatrixCoordinates: component
          .get('competencyService')
          .getCompetencyMatrixCoordinates(subjectId),
        crossWalkFWC: frameworkId
          ? component
            .get('taxonomyService')
            .fetchCrossWalkFWC(frameworkId, subjectId)
          : null,
        userProficiencyBaseLine: component.fetchBaselineCompetencies()
      }).then(
        ({ competencyMatrixs, competencyMatrixCoordinates, crossWalkFWC }) => {
          if (
            !(component.get('isDestroyed') || component.get('isDestroying'))
          ) {
            component.set('competencyMatrixDomains', competencyMatrixs.domains);
            component.set(
              'competencyMatrixCoordinates',
              competencyMatrixCoordinates
            );
            if (crossWalkFWC) {
              component.set(
                'fwCompetencies',
                flattenGutToFwCompetency(crossWalkFWC)
              );
              component.set('fwDomains', flattenGutToFwDomain(crossWalkFWC));
            }
            component.set('showGutCompetency', !frameworkId);
            component.set('hideGutCompetencyButton', !frameworkId);
            component.parseCompetencyData();
          } else {
            Ember.Logger.warn('comp is destroyed...');
          }
        },
        this
      );
    }
  },

  /**
   * @function fetchBaselineCompetencies
   * Method to fetch baseline competenceis list
   */
  fetchBaselineCompetencies() {
    let component = this;
    let classId = component.get('class.id');
    let courseId = component.get('class.courseId');
    let userId = component.get('studentProfile.id');
    return Ember.RSVP.hash({
      userProficiencyBaseLine: component
        .get('competencyService')
        .getUserProficiencyBaseLine(classId, courseId, userId)
    }).then(({ userProficiencyBaseLine }) => {
      component.set('userProficiencyBaseLine', userProficiencyBaseLine);
      return userProficiencyBaseLine;
    });
  },

  parseCompetencyData() {
    let controller = this;
    let domainMatrixs = controller.get('competencyMatrixDomains');
    let competencyMatrixCoordinates = controller.get(
      'competencyMatrixCoordinates'
    );
    competencyMatrixCoordinates.domains.map(domain => {
      let domainCompetency = domainMatrixs.findBy(
        'domainCode',
        domain.get('domainCode')
      );
      let notStartedCompetencies = domainCompetency.competencies.filterBy(
        'status',
        0
      );
      let inProgressCompetencies = domainCompetency.competencies.filterBy(
        'status',
        1
      );
      let masteredCompetencies = domainCompetency.competencies.filter(
        competency => {
          return competency.get('status') >= 2;
        }
      );
      domain.set('notStartedCompetenciesCount', notStartedCompetencies.length);
      domain.set('inProgressCompetenciesCount', inProgressCompetencies.length);
      domain.set('masteredCompetenciesCount', masteredCompetencies.length);
      domain.set('competencyCount', domainCompetency.competencies.length);
    });
  },
  /**
   * @function fetchTaxonomyGrades
   * Method to fetch taxonomy grades
   */
  fetchTaxonomyGrades() {
    let component = this;
    let taxonomyService = component.get('taxonomyProvider');
    let filters = {
      subject: component.get('subjectCode')
    };
    let fwCode = component.get('class.preference.framework');
    if (fwCode) {
      filters.fw_code = fwCode;
    }
    if (component.get('subjectCode')) {
      return Ember.RSVP.hash({
        taxonomyGrades: taxonomyService.fetchGradesBySubject(filters)
      }).then(({ taxonomyGrades }) => {
        if (!(component.get('isDestroyed') || component.get('isDestroying'))) {
          component.set(
            'taxonomyGrades',
            taxonomyGrades.sortBy('sequence').reverse()
          );
        }
      });
    }
  }
});
