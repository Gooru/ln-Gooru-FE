import Ember from 'ember';
import {
  flattenGutToFwCompetency,
  flattenGutToFwDomain
} from 'gooru-web/utils/taxonomy';
export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  session: Ember.inject.service('session'),

  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service('api-sdk/class'),

  /**
   * @requires service:api-sdk/course
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @type {AnalyticsService} Service to retrieve class performance summary
   */
  analyticsService: Ember.inject.service('api-sdk/analytics'),

  /**
   * @type {PerformanceService} Service to retrieve class performance summary
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyService: Ember.inject.service('taxonomy'),

  /**
   * multiple class service dependency injection
   * @type {Object}
   */
  multipleClassService: Ember.inject.service('api-sdk/multiple-class'),

  /**
   * atc controller injection
   * @type {Object}
   */
  atcController: Ember.inject.controller('teacher.class.atc'),

  /**
   * course map controller injection
   * @type {Object}
   */
  coruseMapController: Ember.inject.controller('teacher.class.course-map'),

  /**
   *students proficiency controller injection
   * @type {Object}
   */
  studentsProficencyController: Ember.inject.controller(
    'teacher.class.students-proficiency'
  ),

  /**
   * @requires service:api-sdk/competency
   */
  competencyService: Ember.inject.service('api-sdk/competency'),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     *  Action to trigger the course level report
     */
    onOpenCourseReport() {
      this.openTeacherCourseReport();
    },

    onOpenCompetencyReport() {
      let controller = this;
      controller.set('isShowCompetencyReport', true);
    },

    /**
     * Collapses the header section
     * @param {boolean} state
     */
    toggleHeader: function(state) {
      var $panels = $('.header .panel');
      if (state) {
        $panels.slideUp();
      } else {
        $panels.slideDown();
      }
    },

    /**
     *  teacher class assessment report view  backbutton to pass  class report  page
     */
    backToClassReport: function() {
      this.get('router').transitionTo(this.get('backUrls'));
    },

    /**
     *  Triggered the lesson report from inside unit report
     */
    onOpenLessonReport(lesson) {
      this.openLessonReport(lesson);
    },

    onClosePullUp() {
      let controller = this;
      controller.set('isShowCourseReport', false);
      controller.set('isShowUnitReportPullUp', false);
      controller.set('isShowLessonReportPullUp', false);
      controller.set('isShowCollectionReportPullUp', false);
      controller.set('isShowOCASummaryReportPullUp', false);
      controller.set('isShowMilestoneReport', false);
    },

    /**
     *  Triggered the unit report from inside course report
     */
    onOpenUnitReport(unit) {
      let controller = this;
      controller.openUnitReport(unit);
    },

    /**
     *  Triggered the collection report from lesson report
     */
    teacherCollectionReport(params) {
      this.openTeacherCollectionReport(params);
    },

    /**
     * Action triggered when select a domain from pull up
     */
    onSelectDomain(domainSet) {
      let controller = this;
      controller.set('selectedDomain', domainSet);
      controller.set('isShowDomainCompetencyReport', true);
    },

    /**
     * Action triggered when close all competency report pull ups
     */
    onCloseCompetencyReportPullUp() {
      let controller = this;
      controller.set('isShowDomainCompetencyReport', false);
      controller.set('isShowCompetencyReport', false);
    },

    /**
     * Action triggered when select a competency from competency report
     */
    onSelectCompetency(competency, userId) {
      let controller = this;
      controller.set('selectedCompetency', competency);
      controller.set('selectedStudentUserId', userId);
      controller.set('isShowCompetencyContentReport', true);
    },

    onOpenOCAReport() {
      let controller = this;
      controller.openDCAReportForOfflineClass();
    },

    onSelectSecondaryClass(secondaryClass) {
      this.set('pullUpSecondaryClass', secondaryClass);
      this.set('secondaryClass', secondaryClass);
    },

    onChangeSecondaryClass(secondaryClass) {
      let menuItem = this.get('menuItem');
      let isPremiumClass = this.get('isPremiumClass');
      menuItem === 'atc' && isPremiumClass
        ? this.set('atcController.selectedSecondary', secondaryClass)
        : '';
      menuItem === 'course-map' && isPremiumClass
        ? this.set('coruseMapController.selectedClassList', secondaryClass)
        : '';
      // NOTE update selected class data at students proficiency
      if (menuItem === 'students' && isPremiumClass) {
        this.set(
          'studentsProficencyController.selectedClassList',
          secondaryClass
        );
        this.get('studentsProficencyController').loadClassData(
          secondaryClass.get('id')
        );
      }
    }
  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  isShowCourseReport: false,

  /**
   * The class presented to the user
   * @property {Class}
   */
  class: null,

  /**
   * The course presented to the user
   * @property {Course}
   */
  course: null,

  /**
   * The menuItem selected
   * @property {String}
   */
  menuItem: null,

  /**
   * The class is premium or not
   * @property {Boolean}
   */
  isPremiumClass: Ember.computed('class', function() {
    let controller = this;
    const currentClass = controller.get('class');
    let setting = currentClass.get('setting');
    return setting ? setting['course.premium'] : false;
  }),

  /**
   * @property {boolean} Indicates if course has 1 or more units
   */
  hasUnits: Ember.computed.gt('course.unitCount', 0),

  /**
   * @property {boolean} Indicates if class has 1 or more students
   */
  hasStudents: Ember.computed.gt('class.countMembers', 0),

  isShowUnitReportPullUp: false,

  isShowLessonReportPullUp: false,

  isShowStudentReport: false,

  isShowCollectionReportPullUp: false,

  /**
   * @property {boolean}
   * Indicates to show DCA summary report for offline class
   */
  isShowOCASummaryReportPullUp: false,

  isShowMilestoneReport: false,

  mappedSecondaryClasses: Ember.computed('class.setting', function() {
    const controller = this;
    const classSetting = controller.get('class.setting');
    let attachedSecondaryClassList =
      classSetting && classSetting['secondary.classes']
        ? classSetting['secondary.classes'].list
        : Ember.A([]);
    return attachedSecondaryClassList;
  }),

  /**
   * @property {Array} secondaryClasses
   * Property for list of secondary classess attached with the class
   */

  secondaryClasses: Ember.computed(
    'class.setting',
    'secondaryClassesData',
    function() {
      const controller = this;
      const classSetting = controller.get('class.setting');
      const secondaryClassList = controller.get('secondaryClassesData');
      let attachedSecondaryClassList =
        classSetting && classSetting['secondary.classes']
          ? classSetting['secondary.classes'].list
          : Ember.A([]);
      return controller.createSecondaryClassList(
        attachedSecondaryClassList,
        secondaryClassList
      );
    }
  ),

  isMultiClassEnabled: Ember.computed('secondaryClasses.[]', function() {
    const component = this;
    return component.get('secondaryClasses.length') > 0;
  }),

  secondaryClassList: Ember.A([]),

  selectedSecondaryClass: null,

  secondaryClass: null,

  pullUpSecondaryClass: null,

  multiGradeList: Ember.computed('secondaryClassesData', function() {
    let secondaryClassesData = this.get('secondaryClassesData');
    const multiGradeList = Ember.A([]);
    const primaryClass = this.get('class');
    primaryClass.set('isPrimaryClass', true);
    return secondaryClassesData && secondaryClassesData.length
      ? multiGradeList.concat([primaryClass], secondaryClassesData)
      : Ember.A([]);
  }),

  /**
   * @property {String} classActivitiesDefaultTabKey
   * Property to get default default tab for CA
   */
  classActivitiesDefaultTabKey: Ember.computed('class', function() {
    const controller = this;
    const classSetting = controller.get('class.setting');
    const caDefaultView = classSetting
      ? classSetting['ca.search.default.view']
      : null;
    return caDefaultView || 'gooru-catalog';
  }),

  classSetting: Ember.computed.alias('class.setting'),

  /**
   * @property {Array} secondaryClassesData
   * Property for list of class data that were attached as secondary claases
   */
  secondaryClassesData: Ember.A([]),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Selected the menu item
   * @param {string} item
   */
  selectMenuItem: function(item) {
    let controller = this;
    let isPremiumClass = controller.get('isPremiumClass');
    if (isPremiumClass && item === 'performance') {
      controller.set('isShowCompetencyReport', true);
    } else {
      controller.set('menuItem', item);
    }
  },

  /**
   * @function updateLastAccessedClass
   * Method to update last accessed data into the localStorage using key userId_recent_class
   */
  updateLastAccessedClass(classData) {
    let controller = this;
    let userId = controller.get('session.userId');
    let lastAccessedClassData = {};
    if (classData) {
      let courseSubjectCode = classData.course
        ? classData.course.subject || null
        : null;
      lastAccessedClassData = {
        id: classData.id,
        title: classData.title,
        courseId: classData.courseId,
        performance: controller.getClassPerformance(
          classData.performanceSummary
        ),
        setting: classData.setting,
        courseTitle: classData.courseTitle || null,
        courseSubjectCode: courseSubjectCode,
        isPremiumClass: classData.setting
          ? classData.setting['course.premium']
          : false
      };
    }
    localStorage.setItem(
      `${userId}_recent_class`,
      JSON.stringify(lastAccessedClassData)
    );
    return lastAccessedClassData;
  },

  /**
   * @function getClassPerformance
   * Method to get class performance from given class performance summary
   */
  getClassPerformance(performanceSummary) {
    let classPerformance = null;
    if (performanceSummary) {
      classPerformance = {
        score: performanceSummary.score,
        timeSpent: performanceSummary.timeSpent,
        total: performanceSummary.total,
        totalCompleted: performanceSummary.totalCompleted
      };
    }
    return classPerformance;
  },

  openUnitReport(params) {
    let controller = this;
    controller.set('isShowUnitReportPullUp', true);
    controller.set('unitReportData', params);
  },

  openLessonReport(params) {
    let controller = this;
    controller.set('isShowLessonReportPullUp', true);
    controller.set('lessonReportData', params);
  },

  openTeacherCollectionReport(params) {
    let controller = this;
    controller.set('isShowCollectionReportPullUp', true);
    controller.set('teacherCollectionReportData', params);
  },

  openTeacherCourseReport() {
    let controller = this;
    if (!controller.get('course.id')) {
      return false;
    }
    let params = {
      course: controller.get('course'),
      class: controller.get('class'),
      classId: controller.get('class.id'),
      courseId: controller.get('course.id'),
      classMembers: controller.get('class.members')
    };
    if (controller.get('class.milestoneViewApplicable')) {
      controller.set('isShowMilestoneReport', true);
    }
    this.set('isShowCourseReport', true);
    this.set('courseReportData', params);
  },

  openDCAReportForOfflineClass() {
    let controller = this;
    controller.set('isShowOCASummaryReportPullUp', true);
  },

  /**
   * @function fetchDcaSummaryPerformance
   * Method to fetch dca summary performance for offline class
   */
  fetchDcaSummaryPerformance() {
    let controller = this;
    let classId = controller.get('class.id');
    if (
      !(
        controller.get('performanceSummaryForDCA') &&
        controller.get('performanceSummaryForDCA.performance')
      )
    ) {
      return Ember.RSVP.hash({
        performanceSummaryForDCA: controller
          .get('analyticsService')
          .getDCASummaryPerformance(classId)
      }).then(function(hash) {
        const performanceSummaryForDCA = hash.performanceSummaryForDCA;
        controller.set('performanceSummaryForDCA', performanceSummaryForDCA);
      });
    }
  },

  /**
   * @function loadCoursePerformanceSummary
   * Method to load class/course performance for given courseId
   */
  loadCoursePerformanceSummary() {
    if (this.get('class.courseId') && !this.get('class.performanceSummary')) {
      const requestParam = {
        classId: this.get('class.id'),
        courseId: this.get('class.courseId')
      };
      this.get('performanceService')
        .findClassPerformanceSummaryByClassIds(Ember.A([requestParam]))
        .then(performanceSummary => {
          this.set(
            'class.performanceSummary',
            performanceSummary.findBy('classId', this.get('class.id'))
          );
        });
    }
  },

  createSecondaryClassList(attachedSecondaryClassList, secondaryClassList) {
    let secondaryClasses = Ember.A([]);
    if (secondaryClassList) {
      attachedSecondaryClassList.map(classId => {
        let attchedClass = secondaryClassList.findBy('id', classId);
        if (attchedClass) {
          secondaryClasses.pushObject(attchedClass);
        }
      });
    }
    return secondaryClasses;
  },

  fetchClassDetailsByIds(classIds) {
    return classIds && classIds.length
      ? this.get('classService').readBulkClassDetails(classIds)
      : Ember.RSVP.resolve(Ember.A([]));
  },

  /**
   * @function loadCrosswalkFramework
   * Method to load crosswalk framework data for given subject and framework
   */
  loadCrosswalkFramework() {
    const classData = this.get('class');
    if (
      classData.get('preference.subject') &&
      classData.get('preference.framework')
    ) {
      return Ember.RSVP.hash({
        crosswalkFramework: this.get('taxonomyService').fetchCrossWalkFWC(
          classData.get('preference.framework'),
          classData.get('preference.subject')
        )
      }).then(({ crosswalkFramework }) => {
        this.set(
          'fwCompetencies',
          flattenGutToFwCompetency(crosswalkFramework)
        );
        this.set('fwDomains', flattenGutToFwDomain(crosswalkFramework));
      });
    }
  },

  /**
   * @function loadCompetencyCompletionStat
   * Method to load competency completion statistics for given class
   */
  loadCompetencyCompletionStat() {
    const setting = this.get('class.setting');
    const isPremiumClass = setting != null && setting['course.premium'];
    return Ember.RSVP.hash({
      competencyCompletionStat: isPremiumClass
        ? this.get('competencyService').getCompetencyCompletionStats([
          this.get('class.id')
        ])
        : Ember.RSVP.resolve(Ember.A())
    }).then(({ competencyCompletionStat }) => {
      this.set(
        'class.competencyStats',
        competencyCompletionStat.findBy('classId', this.get('class.id'))
      );
    });
  },

  /**
   * @function loadCourseContentVisibility
   * Method to load course content visibility
   */
  loadCourseContentVisibility() {
    return Ember.RSVP.hash({
      contentVisibility: this.get('class.courseId')
        ? this.get('classService').readClassContentVisibility(
          this.get('class.id')
        )
        : Ember.RSVP.resolve([])
    }).then(({ contentVisibility }) => {
      this.set('contentVisibility', contentVisibility);
    });
  }
});
