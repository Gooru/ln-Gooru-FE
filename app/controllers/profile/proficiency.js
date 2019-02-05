import Ember from 'ember';
import { DEFAULT_K12_SUBJECT } from 'gooru-web/config/config';

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyService: Ember.inject.service('taxonomy'),

  parentController: Ember.inject.controller('profile'),

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

  init() {
    let controller = this;
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
      controller.fetchSubjectsByCategory(category);
    },

    //Action triggered when the user click a subject from the right panel
    onSelectItem(item) {
      let controller = this;
      controller.set('selectedSubject', item);
    },

    /**
     * Action triggered when the use toggle matrix view
     */
    onToggleView(item) {
      let controller = this;
      controller.set('selectedMatrixView', item);
    },

    onToggleChart(isChecked) {
      let controller = this;
      controller.set('isExpandChartEnabled', isChecked);
    },

    /**
     *
     * Triggered when an cell is selected
     * @param item
     */
    onCompetencyPullOut(data, competencyMatrixs) {
      let controller = this;
      controller.set('isLoading', true);
      controller.set('showMore', false);
      let userId = controller.get('userId');
      controller.set('userId', userId);
      controller.set('competencyData', data);
      controller.set('competencyMatrixs', competencyMatrixs);
    },

    /**
     * Action triggered once the last updated date returned from the API
     */
    onGetLastUpdated(lastUpdated) {
      this.set('lastUpdated', lastUpdated);
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
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function fetchCategories
   * Method  fetch list of taxonomy categories
   */
  fetchCategories() {
    let component = this;
    return new Ember.RSVP.Promise(reslove => {
      component
        .get('taxonomyService')
        .getCategories()
        .then(categories => {
          let category = categories.objectAt(0);
          component.set('selectedCategory', category);
          component.set('categories', categories);
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
      });
  },

  // -------------------------------------------------------------------------
  // Properties

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
  })
});
