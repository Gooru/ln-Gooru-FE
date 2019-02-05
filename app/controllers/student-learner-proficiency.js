import Ember from 'ember';
import { DEFAULT_K12_SUBJECT } from 'gooru-web/config/config';
import { getSubjectIdFromSubjectBucket } from 'gooru-web/utils/utils';
import { getCategoryCodeFromSubjectId } from 'gooru-web/utils/taxonomy';
export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies
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
  classGrade: Ember.computed('class', function() {
    let controller = this;
    let classData = controller.get('class');
    let classGrade = classData.get('grade');
    return classGrade ? parseInt(classGrade) : null;
  }),

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

  selectedCompetency: null,

  domainCompetencyList: null,

  actions: {
    onSelectGrade(grade) {
      let component = this;
      component.toggleProperty('isSelectGrade');
      component.set('selectedGrade', grade);
    },

    onToggleBaseline() {
      let component = this;
      component.toggleProperty('isSelectBaseLine');
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
      component.fetchTaxonomyGrades();
      component.loadDataBySubject();
    },

    /**
     * Action triggered when select a competency
     */
    onSelectCompetency(competency, domainCompetencyList) {
      let component = this;
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
      component.set('showDomainInfo', true);
      component.set('showCompetencyInfo', false);
    }
  },
  /**
   * This method will load the initial set  of data
   */
  loadData() {
    let component = this;
    let categories = component.get('taxonomyCategories');
    let categoryCode = component.get('categoryCode');
    let defaultCategory = categories.findBy('code', categoryCode);
    if (defaultCategory) {
      component.fetchSubjectsByCategory(defaultCategory);
    }
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
        let subject = component.getActiveSubject(subjects);
        component.set('taxonomySubjects', subjects);
        component.set('activeSubject', subject);
        component.checkTaxonomySubject();
        component.fetchTaxonomyGrades();
        component.loadDataBySubject();
      });
  },

  /**
   * @function getActiveSubject
   * Method to get active subject by using subject bucket
   */
  getActiveSubject(subjects) {
    let component = this;
    let defaultSubject = subjects.findBy('id', DEFAULT_K12_SUBJECT);
    let activeSubject = defaultSubject ? defaultSubject : subjects.objectAt(0);
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
   * @function checkTaxonomySubject
   * Method to check subject bucket is assigned to the course or not
   */
  checkTaxonomySubject() {
    let component = this;
    let course = component.get('course');
    if (course.get('id')) {
      let taxonomySubjects = component.get('taxonomySubjects');
      let subjectBucket = component.get('subjectBucket');
      let subjectCode = subjectBucket
        ? getSubjectIdFromSubjectBucket(subjectBucket)
        : null;
      let isSupportedTaxonomySubject = taxonomySubjects.findBy(
        'code',
        subjectCode
      );
      let isShowMatrixChart = !!isSupportedTaxonomySubject;
      component.set('isShowMatrixChart', isShowMatrixChart);
    }
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
    return Ember.RSVP.hash({
      competencyMatrixs: component
        .get('competencyService')
        .getCompetencyMatrixDomain(userId, subjectId, timeLine),
      competencyMatrixCoordinates: component
        .get('competencyService')
        .getCompetencyMatrixCoordinates(subjectId),
      userProficiencyBaseLine: component.fetchBaselineCompetencies()
    }).then(({ competencyMatrixs, competencyMatrixCoordinates }) => {
      if (!(component.get('isDestroyed') || component.get('isDestroying'))) {
        component.set('competencyMatrixDomains', competencyMatrixs.domains);
        component.set(
          'competencyMatrixCoordinates',
          competencyMatrixCoordinates
        );
      } else {
        Ember.Logger.warn('comp is destroyed...');
      }
    }, this);
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
    return Ember.RSVP.hash({
      taxonomyGrades: Ember.RSVP.resolve(
        taxonomyService.fetchGradesBySubject(filters)
      )
    }).then(({ taxonomyGrades }) => {
      component.set(
        'taxonomyGrades',
        taxonomyGrades.sortBy('sequence').reverse()
      );
    });
  }
});