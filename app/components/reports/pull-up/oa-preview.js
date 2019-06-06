import Ember from 'ember';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';
import PullUpMixin from 'gooru-web/mixins/reports/pull-up/pull-up-mixin';
import ModalMixin from 'gooru-web/mixins/modal';
import { isCompatibleVW } from 'gooru-web/utils/utils';
import { SCREEN_SIZES, ROLES } from 'gooru-web/config/config';

export default Ember.Component.extend(ModalMixin, PullUpMixin, {
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['preview', 'oa-preview'],

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * Service injection of offline activities
   */
  oaService: Ember.inject.service('api-sdk/offline-activity/offline-activity'),

  /**
   * @requires service:api-sdk/offline-activity-analytics
   */
  oaAnaltyicsService: Ember.inject.service(
    'api-sdk/offline-activity/oa-analytics'
  ),

  /**
   * Maintains the session object.
   */
  session: Ember.inject.service('session'),

  // -------------------------------------------------------------------------
  // Events

  /**
   * Intialize the necessary methods which need to be trigger to show the offline activity preivew.
   */
  didInsertElement() {
    const component = this;
    component._super(...arguments);
    component.openPullUp();
    component.loadData();
  },

  /**
   * Rebind the events or load data based any change happen in the component rendering.
   */
  didRender() {
    const component = this;
    component.$('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
  },

  // -------------------------------------------------------------------------
  // Actions

  actions: {},

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {String} populatedTopPos
   */
  populatedTopPos: Ember.computed(function() {
    return isCompatibleVW(SCREEN_SIZES.EXTRA_SMALL) ? '0' : '10%';
  }),

  /**
   * @property {UUID} oaId
   */
  oaId: null,

  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  taxonomyTags: Ember.computed('previewContent.standards.[]', function() {
    var standards = this.get('previewContent.standards');
    if (standards) {
      standards = standards.filter(function(standard) {
        // Filter out learning targets (they're too long for the card)
        return !TaxonomyTagData.isMicroStandardId(standard.get('id'));
      });
    }
    return TaxonomyTag.getTaxonomyTags(standards);
  }),

  /**
   * @property {Boolean} isTeacher
   */
  isTeacher: Ember.computed.equal('session.role', ROLES.TEACHER),

  /**
   * @property {Boolean} isStudent
   */
  isStudent: Ember.computed.equal('session.role', ROLES.STUDENT),

  /**
   * @property {Boolean} isAnonymous
   */
  isAnonymous: Ember.computed.alias('session.isAnonymous'),

  /**
   * Maintains the value of allow the offline activity to play or not.
   * @type {Boolean}
   */
  allowPlay: false,

  /**
   * Maintains the value of show  the remix button or not.
   * @type {Boolean}
   */
  showRemix: false,

  /**
   * Maintains the value of show the print button or not.
   * @type {Boolean}
   */
  showPrint: false,

  /**
   * Maintains the value of data is loading or not.
   * @type {Boolean}
   */
  isLoading: false,

  /**
   * Maintains the object teacher rubric data from  rubric array
   * @return {Object}
   */
  teacherRubric: Ember.computed(
    'offlineActivity.rubric.[]',
    'oaRubrics',
    function() {
      let offlineActivity = this.get('offlineActivity');
      let rubric = {};
      if (offlineActivity) {
        rubric = this.get('offlineActivity.rubric').findBy(
          'gradeType',
          'teacher'
        );
        let teacherGrade = this.get('oaRubrics.teacherGrades');
        this.parseRubricGradedData(rubric, teacherGrade);
      }
      return rubric;
    }
  ),

  /**
   * Maintains the object of  student rubric data from  rubric array
   * @return {Object}
   */
  studentRubric: Ember.computed('offlineActivity.rubric.[]', function() {
    let offlineActivity = this.get('offlineActivity');
    let rubric = {};
    if (offlineActivity) {
      rubric = this.get('offlineActivity.rubric').findBy(
        'gradeType',
        'student'
      );
      let studentGrade = this.get('oaRubrics.teacherGrades');
      this.parseRubricGradedData(rubric, studentGrade);
    }
    return rubric;
  }),

  /**
   * Maintains the state of report view or not,  by default report view is false.
   * @type {Boolean}
   */
  isReportView: false,

  //--------------------------------------------------------------------------
  // Methods

  loadData() {
    const component = this;
    const oaId = component.get('oaId');
    const oaService = component.get('oaService');
    const classId = component.get('classId');
    const caContentId = component.get('caContentId');
    const studentId = component.get('studentId');
    const isReportView = component.get('isReportView');
    component.set('isLoading', true);
    let submissionPromise = isReportView
      ? component
        .get('oaAnaltyicsService')
        .getSubmissionsToGrade(classId, caContentId, studentId)
      : Ember.RSVP.resolve(null);
    return Ember.RSVP.hash({
      offlineActivity: oaService.readActivity(oaId),
      submissions: submissionPromise
    }).then(({ offlineActivity, submissions }) => {
      if (!component.isDestroyed) {
        component.set('offlineActivity', offlineActivity);
        component.parseSubmissionsData(submissions);
        component.set('isLoading', false);
      }
    });
  },

  parseSubmissionsData(submissions) {
    if (submissions) {
      const component = this;
      component.set('oaRubrics', submissions.get('oaRubrics'));
      const tasks = component.get('offlineActivity.tasks');
      const taskSubmissons = submissions.get('tasks');
      taskSubmissons.forEach(taskSubmission => {
        const taskId = taskSubmission.get('taskId');
        const task = tasks.findBy('id', taskId);
        if (task) {
          task.set('studentTaskSubmissions', taskSubmission.get('submissions'));
        }
      });
    }
  },

  parseRubricGradedData(rubric, gradedRubric) {
    if (rubric && gradedRubric) {
      let gradedCategories = gradedRubric.get('categoryGrade')
        ? gradedRubric.get('categoryGrade')
        : Ember.A([]);
      let categories = rubric.get('categories');

      rubric.set('studentScore', gradedRubric.get('score'));
      rubric.set('comment', gradedRubric.get('overallComment'));
      categories.map((category, index) => {
        let gradedCategory = gradedCategories.objectAt(index);
        let levels = category.get('levels');
        if (levels) {
          if (category.get('allowsLevels') && category.get('allowsScoring')) {
            levels = levels.sortBy('score');
            if (gradedCategory) {
              let totalPoints = gradedCategory.get('levelMaxScore');
              let scoreInPrecentage = Math.floor(
                (gradedCategory.get('levelScore') / totalPoints) * 100
              );
              category.set('scoreInPrecentage', scoreInPrecentage);
            }
          }
          if (gradedCategory) {
            let levelObtained = levels.findBy(
              'name',
              gradedCategory.get('levelObtained')
            );
            if (levelObtained) {
              levelObtained.set('selected', true);
            }
            category.set('comment', gradedCategory.get('levelComment'));
          }
          category.set('levels', levels);
        }
      });
    }
  }
});
