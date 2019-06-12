import Ember from 'ember';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';
import { ROLES } from 'gooru-web/config/config';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['offline-activity-player', 'gru-offline-activity-start-page'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    //Action triggered when click on start player
    onStartPlayer() {
      const component = this;
      component.sendAction('onStartPlayer');
    },

    //Action triggered when click on close player
    onClosePlayer() {
      const component = this;
      component.sendAction('onClosePlayer');
    },

    //Aciton triggered when toggle teacher/student rubric categories container
    onToggleRubricContainer(containerSection) {
      const component = this;
      if (containerSection === ROLES.STUDENT) {
        component.toggleProperty('isStudentCategoriesExpanded');
      } else {
        component.toggleProperty('isTeacherCategoriesExpanded');
      }
      component.$(`.${containerSection}.categories-container`).slideToggle();
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Array} activityTasks
   * Property for list of tasks associated with the offline activity
   */
  activityTasks: Ember.computed.alias('offlineActivity.tasks'),

  /**
   * @property {Array} activityReferences
   * Property for list references associated with the offline activity
   */
  activityReferences: Ember.computed.alias('offlineActivity.references'),

  /**
   * @property {Array} oaTaxonomies
   * Property for list of taxonomies associated with the offline activity
   */
  oaTaxonomies: Ember.computed('offlineActivity.standards.[]', function() {
    var standards = this.get('offlineActivity.standards');
    if (standards) {
      standards = standards.filter(function(standard) {
        // Filter out learning targets (they're too long for the card)
        return !TaxonomyTagData.isMicroStandardId(standard.get('id'));
      });
    }
    return TaxonomyTag.getTaxonomyTags(standards);
  }),

  /**
   * @property {Array} activityTeacherRubrics
   * Property for list of teacher rubrics
   */
  activityTeacherRubrics: Ember.computed('offlineActivity.rubrics', function() {
    const component = this;
    const oaRubrics = component.get('offlineActivity.rubric');
    return oaRubrics.filterBy('gradeType', ROLES.TEACHER);
  }),

  /**
   * @property {Array} teacherRubricCategories
   * Property for list of teacher rubric categories
   */
  teacherRubricCategories: Ember.computed('activityTeacherRubrics', function() {
    const component = this;
    let activityTeacherRubrics = component.get('activityTeacherRubrics');
    let oaRubricTeacherCategories = Ember.A([]);
    activityTeacherRubrics.map(teacherRubric => {
      let categories = teacherRubric.get('categories') || Ember.A([]);
      oaRubricTeacherCategories = component.parseRubricCategories(
        oaRubricTeacherCategories,
        categories
      );
    });
    return oaRubricTeacherCategories;
  }),

  /**
   * @property {Array} activityStudentRubrics
   * Property for list of student rubrics
   */
  activityStudentRubrics: Ember.computed('offlineActivity.rubrics', function() {
    const component = this;
    const oaRubrics = component.get('offlineActivity.rubric');
    return oaRubrics.filterBy('gradeType', ROLES.STUDENT);
  }),

  /**
   * @property {Array} studentRubricCategories
   * Property for list of student rubric categories
   */
  studentRubricCategories: Ember.computed('activityStudentRubrics', function() {
    const component = this;
    let activityStudentRubrics = component.get('activityStudentRubrics');
    let oaRubricStudentCategories = Ember.A([]);
    activityStudentRubrics.map(studentRubric => {
      let categories = studentRubric.get('categories') || Ember.A([]);
      oaRubricStudentCategories = component.parseRubricCategories(
        oaRubricStudentCategories,
        categories
      );
    });
    return oaRubricStudentCategories;
  }),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function parseRubricCategories
   * Method to parse rubric categories
   */
  parseRubricCategories(oaRubricCategories, categories) {
    categories.map(category => {
      let levels = category.get('levels');
      if (levels) {
        if (category.get('allowsLevels') && category.get('allowsScoring')) {
          levels = levels.sortBy('score');
        }
        category.set('levels', levels);
      }
      oaRubricCategories.pushObject(category);
    });
    return oaRubricCategories;
  }
});
