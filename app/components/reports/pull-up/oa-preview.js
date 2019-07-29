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

  /**
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service('api-sdk/class-activity'),

  /**
   * @requires service:api-sdk/performance
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * @type {ProfileService} Service to retrieve profile information
   */
  profileService: Ember.inject.service('api-sdk/profile'),

  // -------------------------------------------------------------------------
  // Events

  /**
   * Intialize the necessary methods which need to be trigger to show the offline activity preivew.
   */
  didInsertElement() {
    const component = this;
    component._super(...arguments);
    component.openPullUp();
    if (component.get('isCmReport')) {
      component.loadStudentCmReportData();
    } else {
      component.loadData();
    }
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

  actions: {
    toggleListOfStudents() {
      const component = this;
      let element = '.oa-list-of-users';
      if (component.get('showUserList')) {
        component.$(element).slideUp(400, function() {
          component.set('showUserList', false);
        });
      } else {
        component.$(element).slideDown(400, function() {
          component.set('showUserList', true);
        });
      }
    },

    previewStudentReport(user) {
      const component = this;
      component.set('selectedUser', user);
      component.fetchSubmissions(user);
      component.send('toggleListOfStudents');
    },

    //Action triggered when click on play
    onPlayContent() {
      const component = this;
      const offlineActivityId = component.get('oaId');
      const queryParams = {
        role: component.get('isTeacher') ? ROLES.TEACHER : ROLES.STUDENT,
        isPreview: true
      };
      component
        .get('router')
        .transitionTo('player-offline-activity', offlineActivityId, {
          queryParams
        });
    }
  },

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
  taxonomyTags: Ember.computed('offlineActivity.standards.[]', function() {
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
  allowPlay: Ember.computed.equal('isTeacher', true),

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
    'oaRubrics.teacherGrades',
    function() {
      let offlineActivity = this.get('offlineActivity');
      let rubric;
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
   * Maintains the object of student rubric data from  rubric array
   * @return {Object}
   */
  studentRubric: Ember.computed(
    'offlineActivity.rubric.[]',
    'oaRubrics.studentGrades',
    function() {
      let offlineActivity = this.get('offlineActivity');
      let rubric;
      if (offlineActivity) {
        rubric = this.get('offlineActivity.rubric').findBy(
          'gradeType',
          'student'
        );
        let studentGrade = this.get('oaRubrics.studentGrades');
        this.parseRubricGradedData(rubric, studentGrade);
      }
      return rubric;
    }
  ),

  /**
   * Maintains the state of report view or not,  by default report view is false.
   * @type {Boolean}
   */
  isReportView: false,

  /**
   * Maintains the state to show the users list or not
   * @type {Boolean}
   */
  showUserList: false,

  /**
   * Compute  student grade score in precentage
   * @return {Number}
   */
  studentGradeScore: Ember.computed('studentRubric', function() {
    const studentRubric = this.get('studentRubric');
    return this.computedRubricScoreInPrecentage(studentRubric);
  }),

  /**
   * Compute  teacher grade score in precentage
   * @return {Number}
   */
  teacherGradeScore: Ember.computed('teacherRubric', function() {
    const teacherRubric = this.get('teacherRubric');
    return this.computedRubricScoreInPrecentage(teacherRubric);
  }),

  /**
   * @property {Boolean} isCmReport
   * Property for CM Report
   */
  isCmReport: false,

  /**
   * @property {Object} reportContext
   * Property for CM report context
   */
  reportContext: {},

  //--------------------------------------------------------------------------
  // Methods

  loadData() {
    const component = this;
    const oaId = component.get('oaId');
    const oaService = component.get('oaService');
    const classId = component.get('classId');
    const caContentId = component.get('classActivity.id');
    const isReportView = component.get('isReportView');
    const isTeacher = component.get('isTeacher');
    const isStudent = component.get('isStudent');
    component.set('isLoading', true);
    const users = component.get('users') ? component.get('users') : Ember.A([]);
    let studentListPromise =
      isReportView && isTeacher
        ? component
          .get('classActivityService')
          .fetchUsersForClassActivity(classId, caContentId)
        : Ember.RSVP.resolve(users);
    let userId = isStudent ? this.get('session.userId') : undefined;
    let performancePromise =
      isReportView && !component.get('isCmReport')
        ? component
          .get('performanceService')
          .findOfflineClassActivityPerformanceSummaryByIds(
            classId,
            [caContentId],
            userId,
            false
          )
        : Ember.RSVP.resolve([]);
    return Ember.RSVP
      .hash({
        offlineActivity: oaService.readActivity(oaId),
        users: studentListPromise,
        performances: performancePromise
      })
      .then(({ offlineActivity, users, performances }) => {
        if (!component.isDestroyed) {
          component.set('offlineActivity', offlineActivity);
          if (isReportView) {
            users = users.filterBy('isActive', true);
            component.set('users', users);
            let user = users.objectAt(0);
            component.set('selectedUser', user);
            component.fetchSubmissions(user);
            component.parsePerformanceData(users, performances);
          }
          component.set('isLoading', false);
        }
      });
  },

  /**
   * @function loadStudentCmReportData
   * Method to load student CM report data
   */
  loadStudentCmReportData() {
    const component = this;
    const reportContext = component.get('reportContext');
    return Ember.RSVP
      .hash({
        userProfile: component.fetchUserProfile(reportContext.userId),
        offlineActivity: component
          .get('oaService')
          .readActivity(component.get('oaId'))
      })
      .then(({ userProfile, offlineActivity }) => {
        component.fetchSubmissions(userProfile);
        component.set('selectedUser', userProfile);
        component.set(
          'selectedUser.performance',
          component.get('reportContext.performance')
        );
        component.set('offlineActivity', offlineActivity);
      });
  },

  resetValues() {
    const component = this;
    let teacherRubric = component.get('teacherRubric');
    let studentRubric = component.get('studentRubric');
    if (teacherRubric) {
      teacherRubric.set('score', null);
      teacherRubric.set('comment', null);
    }
    if (studentRubric) {
      studentRubric.set('score', null);
      studentRubric.set('comment', null);
    }
  },

  fetchSubmissions(user) {
    const component = this;
    const classId = component.get('classId');
    const oaId = component.get('classActivity.id') || component.get('oaId');
    const isReportView = component.get('isReportView');
    const userId = user.get('id');
    let dataParam = undefined;
    if (component.get('isCmReport')) {
      dataParam = {
        courseId: component.get('reportContext.courseId'),
        unitId: component.get('reportContext.unitId'),
        lessonId: component.get('reportContext.lessonId')
      };
    }
    let submissionPromise = isReportView
      ? component
        .get('oaAnaltyicsService')
        .getSubmissionsToGrade(classId, oaId, userId, dataParam)
      : Ember.RSVP.resolve(null);
    return Ember.RSVP
      .hash({
        submissions: submissionPromise
      })
      .then(({ submissions }) => {
        if (!component.isDestroyed) {
          component.resetValues();
          component.parseSubmissionsData(submissions);
        }
      });
  },

  parseSubmissionsData(submissions) {
    const component = this;
    const tasks = component.get('offlineActivity.tasks');
    const oaRubrics = submissions ? submissions.get('oaRubrics') : null;
    component.set('oaRubrics', oaRubrics);
    const taskSubmissons = submissions ? submissions.get('tasks') : Ember.A([]);
    tasks.forEach(task => {
      const taskId = task.get('id');
      const taskSubmission = taskSubmissons.findBy('taskId', taskId);
      if (taskSubmission) {
        let activityTaskSubmissions = taskSubmission.get('submissions');
        task.set('studentTaskSubmissions', activityTaskSubmissions);
        let taskSubmissionText = activityTaskSubmissions.findBy(
          'submissionType',
          'free-form-text'
        );
        task.set(
          'submissionText',
          taskSubmissionText ? taskSubmissionText.get('submissionInfo') : null
        );
      } else {
        task.set('studentTaskSubmissions', null);
      }
    });
  },

  parseRubricGradedData(rubric, gradedRubric) {
    if (rubric && gradedRubric) {
      let gradedCategories = gradedRubric.get('categoryGrade')
        ? gradedRubric.get('categoryGrade')
        : Ember.A([]);
      let categories = rubric.get('categories');
      rubric.set('score', gradedRubric.get('score'));
      rubric.set('comment', gradedRubric.get('overallComment'));
      categories.map((category, index) => {
        let gradedCategory = gradedCategories.objectAt(index);
        let levels = category.get('levels');
        if (levels) {
          if (category.get('allowsLevels') && category.get('allowsScoring')) {
            levels = levels.sortBy('score');
            if (gradedCategory) {
              levels.map((level, index) => {
                let score =
                  index > 0
                    ? index * Math.floor(100 / (levels.length - 1))
                    : 10;
                level.set('scoreInPrecentage', score);
                if (
                  level.get('score') === gradedCategory.get('levelScore') &&
                  level.get('name') === gradedCategory.get('levelObtained')
                ) {
                  category.set('scoreInPrecentage', score);
                }
              });
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
    } else if (rubric) {
      let categories = rubric.get('categories');
      categories.map(category => {
        category.set('scoreInPrecentage', null);
        category.set('comment', null);
        let levels = category.get('levels');
        if (levels) {
          levels.map(level => {
            level.set('selected', false);
          });
        }
      });
    }
  },

  parsePerformanceData(users, performances) {
    users.forEach(user => {
      const userId = user.get('id');
      let userPerformance = performances.findBy('userId', userId);
      if (userPerformance) {
        user.set(
          'performance',
          userPerformance.get('collectionPerformanceSummary')
        );
      }
    });
  },

  computedRubricScoreInPrecentage(rubric) {
    let score = 0;
    if (rubric) {
      score = rubric.get('score');
      if (score && score > 0) {
        let gradeMaxScore = rubric.get('maxScore');
        score = Math.floor(score / gradeMaxScore * 100);
      }
    }
    return score;
  },

  /**
   * @function fetchUserProfile
   * @param {UUID} userId
   * @return {Promise} userDetails
   * Method to fetch user details by using given user ID
   */
  fetchUserProfile(userId) {
    const component = this;
    return component.get('profileService').readUserProfile(userId);
  }
});
