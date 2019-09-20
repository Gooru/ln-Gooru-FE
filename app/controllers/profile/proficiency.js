import Ember from 'ember';
import { SCREEN_SIZES, DEFAULT_K12_SUBJECT } from 'gooru-web/config/config';
import {
  flattenGutToFwCompetency,
  flattenGutToFwDomain
} from 'gooru-web/utils/taxonomy';
import { isCompatibleVW } from 'gooru-web/utils/utils';
export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies
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

  parentController: Ember.inject.controller('profile'),

  /**
   * it maintains profile data
   * @type {Object}
   */
  userPreference: Ember.computed.alias('parentController.userPreference'),

  /**
   * show pull out .
   * @type {boolean}
   */
  showPullOut: false,

  showSignatureAssessment: false,

  /**
   * Show loading spinner
   */
  competencyStatus: [
    'Not Started',
    'In progress',
    'Inferred',
    'Asserted',
    'Earned',
    'Demonstrated'
  ],

  // -------------------------------------------------------------------------
  // Events

  initialize() {
    let controller = this;
    this.set('showProficiencyChart', true);
    controller.fetchCategories().then(() => {
      let selectedCategory = controller.get('selectedCategory');
      controller.fetchSubjectsByCategory(selectedCategory);
    });
  },

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Select category based on user selection.
     * @param  {Object} item
     */
    onSelectCategory(category) {
      let controller = this;
      controller.set('selectedCategory', category);
      controller.set('showDomainInfo', false);
      controller.set('showCompetencyInfo', false);
      controller.set('selectedCompetency', null);
      controller.set('selectedDomain', null);
      controller.fetchSubjectsByCategory(category);
    },

    //Action triggered when the user click a subject from the right panel
    onSelectItem(item) {
      let controller = this;
      controller.set('selectedSubject', item);
      controller.set('showDomainInfo', false);
      controller.set('showCompetencyInfo', false);
      controller.set('selectedCompetency', null);
      controller.set('selectedDomain', null);
      controller.loadDataBySubject(item.get('id'));
    },

    onClosePullOut() {
      this.set('selectedCompetency', null);
      this.set('showPullOut', false);
    },

    /**
     * Action triggered when select a month/year from the filter
     */
    onSelectMonth(date) {
      let timeLine = {
        month: date.getMonth() + 1,
        year: date.getFullYear()
      };
      this.set('timeLine', timeLine);
      this.loadDataBySubject(this.get('selectedSubject.id'));
    },

    /**
     * Action triggered when select a competency
     */
    onSelectCompetency(competency, domainCompetencyList) {
      let controller = this;
      controller.setSignatureContent(competency);
      controller.set('selectedCompetency', competency);
      controller.set('domainCompetencyList', domainCompetencyList);
      controller.set('showCompetencyInfo', true);
    },

    onDomainSelect(domain) {
      let controller = this;
      controller.set('selectedDomain', domain);
      let domainCompetencies = controller.get('competencyMatrixDomains');
      let selectedDomainCompetencies = domainCompetencies.findBy(
        'domainCode',
        domain.get('domainCode')
      );
      controller.set(
        'selectedDomainCompetencies',
        selectedDomainCompetencies.get('competencies')
      );
      controller.set('selectedCompetency', null);
      controller.set('showDomainInfo', true);
      controller.set('showCompetencyInfo', false);
    },

    onClosePullUp() {
      let controller = this;
      controller.set('selectedCompetency', null);
    }
  },

  // -------------------------------------------------------------------------
  // Methods

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

  setSignatureContent(competency) {
    let controller = this;
    const signatureCompetencyList = controller.get('signatureCompetencyList');
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
   * @function fetchCategories
   * Method  fetch list of taxonomy categories
   */
  fetchCategories() {
    let controller = this;
    return new Ember.RSVP.Promise(reslove => {
      controller
        .get('taxonomyService')
        .getCategories()
        .then(categories => {
          let category = categories.objectAt(0);
          controller.set('selectedCategory', category);
          controller.set('categories', categories);
          reslove();
        });
    });
  },

  /**
   * @function fetchSubjectsByCategory
   * @param subjectCategory
   * Method to fetch list of subjects using given category level
   */
  fetchSubjectsByCategory(subjectCategory) {
    let controller = this;
    let selectedCategoryId = subjectCategory.get('id');
    controller
      .get('taxonomyService')
      .getTaxonomySubjects(selectedCategoryId)
      .then(subjects => {
        let defaultSubject = subjects.findBy('id', DEFAULT_K12_SUBJECT);
        let selectedSubject = defaultSubject
          ? defaultSubject
          : subjects.objectAt(0);
        controller.set('taxonomySubjects', subjects);
        controller.set('selectedSubject', selectedSubject);
        if (selectedSubject) {
          controller.loadDataBySubject(selectedSubject.get('id'));
        }
      });
  },

  loadDataBySubject(subjectId) {
    let controller = this;
    let userId = controller.get('userId');
    let timeLine = controller.get('timeLine');
    const subjectCode = controller.get('selectedSubject.code');
    const userPreference = controller.get('userPreference.standard_preference');
    const frameworkCode = userPreference[subjectCode];
    controller.set('framework', frameworkCode);
    if (!frameworkCode) {
      controller.set('showGutCompetency', true);
    }
    controller.set('isLoading', true);
    return Ember.RSVP.hash({
      competencyMatrixs: controller
        .get('competencyService')
        .getCompetencyMatrixDomain(userId, subjectId, timeLine),
      competencyMatrixCoordinates: controller
        .get('competencyService')
        .getCompetencyMatrixCoordinates(subjectId),
      signatureList: controller
        .get('competencyService')
        .getUserSignatureCompetencies(userId, subjectCode),
      crossWalkFWC: frameworkCode
        ? controller
          .get('taxonomyService')
          .fetchCrossWalkFWC(frameworkCode, subjectId)
        : null
    }).then(
      ({
        competencyMatrixs,
        competencyMatrixCoordinates,
        signatureList,
        crossWalkFWC
      }) => {
        if (
          !(controller.get('isDestroyed') || controller.get('isDestroying'))
        ) {
          controller.set('isLoading', false);
          controller.set('competencyMatrixDomains', competencyMatrixs.domains);
          controller.set('signatureCompetencyList', signatureList);
          controller.set(
            'competencyMatrixCoordinates',
            competencyMatrixCoordinates
          );
          controller.parseCompetencyData();
          if (crossWalkFWC) {
            controller.set(
              'fwCompetencies',
              flattenGutToFwCompetency(crossWalkFWC)
            );
            controller.set('fwDomains', flattenGutToFwDomain(crossWalkFWC));
          }
        } else {
          Ember.Logger.warn('comp is destroyed...');
        }
      },
      this
    );
  },

  // -------------------------------------------------------------------------
  // Properties

  showProficiencyChart: true,

  /**
   * @property {Boolean}
   * Property to store show gut competency
   */
  showGutCompetency: false,
  /**
   * @property {JSON}
   * Property to store active category
   */
  selectedCategory: null,

  /**
   * @property {Array}
   * Property to store list of taxonomy subjects
   */
  taxonomySubjects: null,

  /**
   * @property {Object}
   * Property to store user selected subject info
   */
  selectedSubject: null,

  /**
   * @property {String}
   * Property to store userId of the student
   */
  userId: null,

  /**
   * @type {String}
   * Property to store user selected matrix view
   */
  selectedMatrixView: 'domain',

  /**
   * Property to show/hide expanded chart
   */
  isExpandChartEnabled: false,

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
   * @property {String} subjectCode
   */
  subjectCode: Ember.computed('selectedSubject', function() {
    let controller = this;
    let subject = controller.get('selectedSubject');
    return subject ? subject.id : '';
  }),

  /**
   * @property {Boolean}
   * Property to store given screen value is compatible
   */
  isMobile: isCompatibleVW(SCREEN_SIZES.LARGE)
});
