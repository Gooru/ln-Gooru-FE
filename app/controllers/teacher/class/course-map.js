import Ember from 'ember';
import { isCompatibleVW } from 'gooru-web/utils/utils';
import { SCREEN_SIZES, CONTENT_TYPES } from 'gooru-web/config/config';
import ConfigurationMixin from 'gooru-web/mixins/configuration';
/**
 * Class Overview controller
 *
 * Controller responsible of the logic for the class overview page
 */

export default Ember.Controller.extend(ConfigurationMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  classController: Ember.inject.controller('teacher.class'),

  session: Ember.inject.service('session'),

  /**
   * @type {Service} performance service
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * @requires service:api-sdk/course-map
   */
  courseMapService: Ember.inject.service('api-sdk/course-map'),

  /**
   * Rescope Service to perform rescope data operations
   */
  rescopeService: Ember.inject.service('api-sdk/rescope'),

  /**
   * Route0 service to fetch route0 suggestion of a class and course
   */
  route0Service: Ember.inject.service('api-sdk/route0'),

  /**
   * @type RubricService
   */
  rubricService: Ember.inject.service('api-sdk/rubric'),

  /**
   * @type {CourseService}
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @type CollectionService
   */
  collectionService: Ember.inject.service('api-sdk/collection'),

  /**
   * @type AssessmentService
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  /**
   * @property {Service} Notifications service
   */
  notifications: Ember.inject.service(),

  offlineActivityService: Ember.inject.service(
    'api-sdk/offline-activity/offline-activity'
  ),

  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service('api-sdk/class'),

  /**
   * @type {UnitService} Service to retrieve unit information
   */
  unitService: Ember.inject.service('api-sdk/unit'),

  /**
   * @type {i18nService} Service to retrieve translations information
   */
  i18n: Ember.inject.service(),

  /**
   * @requires service:api-sdk/competency
   */
  competencyService: Ember.inject.service('api-sdk/competency'),

  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyService: Ember.inject.service('taxonomy'),

  // -------------------------------------------------------------------------
  // Attributes

  queryParams: ['location', 'tab', 'studentId'],

  /**
   * Combination of unit, lesson and resource (collection or assessment)
   * separated by a plus sign
   * @example
   * location='uId001+lId002+cId003'
   */
  location: '',

  tab: null,

  studentId: null,

  isFirstLoad: true,

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Propery to show class id.
   * @property {classId}
   */
  classId: '',

  /**
   * Propery to show course id.
   * @property {courseId}
   */
  courseId: '',

  /**
   * Propery to show unit id.
   * @property {unitId}
   */
  unitId: '',

  /**
   * Propery to show lesson id.
   * @property {lessonId}
   */
  lessonId: '',

  /**
   * A link to the parent class controller
   * @see controllers/class.js
   * @property {Class}
   */
  class: Ember.computed('classController.class', 'currentClass', function() {
    return this.get('currentClass');
  }),

  /**
   * @property {Course} the selected course
   */
  course: null,

  /**
   * A link to the content visibility from class controller
   * @see controllers/class.js
   * @property {Class}
   */
  contentVisibility: Ember.computed.alias('classController.contentVisibility'),

  /**
   * @property {boolean} showWelcome - indicates the toggle welcome panel state, true means open, false means closed
   */
  showWelcome: false,

  /**
   * @property {boolean}
   * Property to find out is owner of the course or not
   */
  isOwner: Ember.computed('course', function() {
    let controller = this;
    let loggedInUserId = controller.get('session.userId');
    let courseOwnerId = controller.get('course.owner.id');
    return loggedInUserId === courseOwnerId;
  }),

  /**
   * @property {Boolean}
   * Property to enable edit course if it is not a premium course
   */
  isEditableCourse: Ember.computed('course', function() {
    let controller = this;
    let courseData = controller.get('course');
    return courseData.version !== 'premium';
  }),

  /**
   * @type {Boolean}
   * Property to check whether a class is premium
   */
  isPremiumClass: Ember.computed('class', function() {
    let controller = this;
    const currentClass = controller.get('class');
    let setting = currentClass.get('setting');
    return setting ? setting['course.premium'] : false;
  }),

  isShowCoursePullup: false,

  /**
   * @property {Array} sortedStudents
   * Students list sorted by last name
   */
  sortedStudents: Ember.computed('classMembers', function() {
    let controller = this;
    let students = controller.get('classMembers');
    return students.sortBy('lastName');
  }),

  isStudentCourseMap: false,

  itemsToGradeList: Ember.A([]),

  studentClassScore: null,

  isGradeLoading: null,

  /**
   * @property {Object} previewContent
   */
  previewContent: null,

  /**
   * @property {Object} previewPlayerContext
   */
  previewPlayerContext: null,

  /**
   * @property {String} previewContentType
   */
  previewContentType: '',

  /**
   * @property {Boolean} isShowContentPreview
   */
  isShowContentPreview: false,

  /**
   * @property {Boolean} isShowOfflineActivityPreview
   */
  isShowOfflineActivityPreview: false,

  /**
   * @property {Boolean} isShowStudentOfflineActivityReport
   */
  isShowStudentOfflineActivityReport: false,

  /**
   * Maintains the value of  milestone view or not, default view will be course map.
   * @type {Boolean}
   */
  isMilestoneView: Ember.computed(
    'isClassDestinationSetup',
    'milestones',
    function() {
      let isClassDestinationSetup = this.get('isClassDestinationSetup');
      let milestones = this.get('milestones');
      let milestoneView = this.get('class.milestoneViewApplicable');
      if (
        isClassDestinationSetup &&
        milestones &&
        milestones.length > 0 &&
        milestoneView
      ) {
        return true;
      }
      return false;
    }
  ),

  /**
   * Identify class origin setup or not.
   * @type {Boolean}
   */
  isClassDestinationSetup: Ember.computed('class.gradeCurrent', function() {
    let gradeClassLevel = this.get('class.gradeCurrent');
    return gradeClassLevel != null;
  }),

  /**
   * Maintains  the state of milestone view is ready to show or not.
   * @type {Boolean}
   */
  hasMilestoneViewReady: Ember.computed(
    'isClassDestinationSetup',
    'milestones',
    function() {
      let isClassDestinationSetup = this.get('isClassDestinationSetup');
      let milestones = this.get('milestones');
      let milestoneView = this.get('class.milestoneViewApplicable');
      if (
        isClassDestinationSetup &&
        milestones &&
        milestones.length > 0 &&
        milestoneView
      ) {
        return true;
      }
      return false;
    }
  ),

  /**
   * @property {Boolean} isShowStudentMilestoneReport
   */
  isShowStudentMilestoneReport: false,

  userId: Ember.computed.alias('session.userId'),

  isLessonPlanView: false,

  /**
   * List of options to show in the switch
   *
   * @property {Array}
   */
  switchOptions: Ember.A([
    Ember.Object.create({
      label: 'On',
      value: true
    }),
    Ember.Object.create({
      label: 'Off',
      value: false
    })
  ]),

  /**
   * @property {Boolean} isMobileView
   * Property to handle is mobile view
   */
  isMobileView: isCompatibleVW(SCREEN_SIZES.SMALL),

  /**
   * Maintain secondary class list
   */
  selectedClassList: null,

  /**
   * checking class is Primary or secondary class
   */

  isLessonPlanShow: Ember.computed.alias(
    'configuration.GRU_FEATURE_FLAG.isLessonPlanShow'
  ),

  watchSecondaryClass: Ember.observer('selectedClassList', function() {
    let secondaryClass = this.get('selectedClassList');
    this.loadSecondaryClassInfo(secondaryClass.get('id'));
  }),
  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * This action is responsible for toggle the property of @property showAllRescopedContent
     */
    onToggleRescope() {
      this.toggleProperty('showAllRescopedContent');
    },

    getGradeListItem() {
      this.loadItemsToGrade();
    },
    /**
     * Trigger when user click on student list (mobile view)
     */
    toggleStudentList() {
      let studentListEle = Ember.$(
        '.teacher .class .course-map .course-map-body .students'
      );
      if (!studentListEle.hasClass('active')) {
        let height = Ember.$('.gru-class-navbar').height();
        studentListEle.animate(
          {
            top: height
          },
          400
        );
        studentListEle.addClass('active');
      } else {
        //To calc position based on whether student course map is selected or not
        let height = this.get('isStudentCourseMap') ? 50 : 100;
        let topPosition = studentListEle.height() - height;
        studentListEle.removeClass('active');
        studentListEle.animate(
          {
            top: topPosition
          },
          400
        );
      }
    },
    /**
     * Trigger when user click on item to grade (mobile view)
     */
    toggleItemsToGrade() {
      let itemToGradeEle = Ember.$(
        '.teacher .class .course-map .course-map-body .items-to-grade'
      );
      if (!itemToGradeEle.hasClass('active')) {
        let height = Ember.$('.gru-class-navbar').height();
        itemToGradeEle.animate(
          {
            top: height
          },
          400
        );
        itemToGradeEle.addClass('active');
      } else {
        let height = itemToGradeEle.height() - 50;
        itemToGradeEle.removeClass('active');
        itemToGradeEle.animate(
          {
            top: height
          },
          400
        );
      }
    },
    /**
     * Trigger when rubric item level  report clicked
     */
    onOpenReportGrade(itemToGrade) {
      let controller = this;
      if (itemToGrade.get('contentType') === CONTENT_TYPES.OFFLINE_ACTIVITY) {
        controller.set('isShowOaGrading', true);
      } else {
        controller.set('showFRQuestionGrade', true);
      }
      controller.set('itemToGradeContextData', itemToGrade);
    },

    /**
     * Trigger when unit level  report clicked
     */
    onOpenUnitLevelReport(unit) {
      const controller = this;
      const classController = controller.get('classController');
      classController.openUnitReport(unit);
    },
    /**
     * Trigger when lesson level  report clicked
     */
    onOpenLessonReport(params) {
      const controller = this;
      const classController = controller.get('classController');
      classController.openLessonReport(params);
    },

    /**
     * Trigger when collection level teacher report clicked
     */
    teacherCollectionReport(params) {
      const controller = this;
      const classController = controller.get('classController');
      classController.openTeacherCollectionReport(params);
    },

    /**
     * Update 'location' (bound query param)
     *
     * @function
     * @param {String} newLocation - String of the form 'unitId[+lessonId[+resourceId]]'
     * @returns {undefined}
     */
    updateLocation: function(newLocation) {
      this.set('location', newLocation ? newLocation : null);
    },
    /**
     * Trigger action to update content visibility list
     */
    updateContentVisibility: function(contentId, visible) {
      this.send('updateContentVisible', contentId, visible);
    },

    /**
     * Triggered when a close welcome panel button is selected.
     */
    toggleHeader: function() {
      this.set('showWelcome', false);
    },

    /**
     * Action triggered when select entire class
     */
    onSelectAll() {
      let controller = this;
      controller.set('isLoading', true);
      controller.set('activeStudent', {});
      controller.getUnitLevelPerformance();
      controller.set('isStudentCourseMap', false);
      controller.set('isLoading', false);
      Ember.$('.list').removeClass('active');
      Ember.$('.teacher.list').addClass('active');
      let studentListEle = Ember.$(
        '.teacher .class .course-map .course-map-body .students'
      );
      if (studentListEle) {
        let topPosition = studentListEle.height() - 100;
        studentListEle.css({
          top: topPosition
        });
      }
    },

    /**
     * Action triggered when select single student
     */
    onSelectStudent(student, index) {
      let controller = this;
      if (!controller.isDestroyed) {
        controller.set('isStudentCourseMap', true);
        controller.set('isLoading', true);
        controller.set('units', Ember.A([]));
        controller.set('activeStudent', student);
        controller.getStudentCourseMap(student.id);
        controller.getStudentClassPerformance(student.id);
        controller.set('skippedContents', null);
        if (controller.get('isPremiumClass')) {
          controller.getRescopedData();
          controller.loadRoute0Data();
        }
        Ember.$('.list').removeClass('active');
        Ember.$(`.student-${index}`).addClass('active');
        controller.actions.onToggleStudentList(controller);
        let studentListEle = Ember.$(
          '.teacher .class .course-map .course-map-body .students'
        );
        if (studentListEle.hasClass('active')) {
          controller.send('toggleStudentList');
        }
      }
    },

    /**
     * Action triggered when the user click an accordion item
     */
    onSelectItem() {
      let controller = this;
      if (controller.get('isPremiumClass')) {
        let skippedContents = controller.get('skippedContents');
        let isContentAvailable = controller.get('isContentAvailable');
        if (skippedContents && isContentAvailable) {
          controller.toggleSkippedContents(skippedContents);
        }
      }
    },

    /**
     * Action triggered when open collection report
     */
    collectionReport(params) {
      let controller = this;
      let reportType = params.type;
      if (reportType === CONTENT_TYPES.EXTERNAL_ASSESSMENT) {
        controller.set('isShowStudentExternalAssessmentReport', true);
        controller.set('isShowStudentReport', false);
      } else if (reportType === CONTENT_TYPES.OFFLINE_ACTIVITY) {
        params.performance = params.collection.performance;
        controller.set('isShowStudentOfflineActivityReport', true);
      } else {
        controller.set('isShowStudentExternalAssessmentReport', false);
        controller.set('isShowStudentReport', true);
      }
      controller.set('studentReportContextData', params);
    },

    /**
     * Action triggered when close collection report pull up
     */
    onClosePullUp() {
      let controller = this;
      controller.set('isShowCourseReport', false);
      controller.set('isShowUnitReportPullUp', false);
      controller.set('isShowLessonReportPullUp', false);
      controller.set('isShowStudentReport', false);
      controller.set('isShowStudentExternalAssessmentReport', false);
      controller.set('isShowStudentMilestoneReport', false);
    },

    /**
     * Trigger when student unit level  report clicked
     */
    onOpenStudentUnitLevelReport(params) {
      this.set('showStudentUnitReport', true);
      params.isStudent = false;
      params.isTeacher = true;
      this.set('studentUnitReportContext', params);
    },

    /**
     * Trigger when student lesson   report clicked
     */
    onOpenStudentLessonReport(params) {
      this.set('showStudentLessonReport', true);
      params.isStudent = false;
      params.isTeacher = true;
      this.set('studentLessonReportContext', params);
    },

    /**
     * Action triggered when open a student's course report
     */
    onOpenStudentCourseReport(student) {
      const controller = this;
      if (controller.get('class.milestoneViewApplicable')) {
        controller.openStudentMilestoneReport(student);
      } else {
        controller.openStudentCourseReport(student.get('id'));
      }
    },

    //Action triggered when click collection/assessment title
    onPreviewContent(unitId, lessonId, content) {
      const controller = this;
      let previewPlayerContext = Ember.Object.create({
        classId: controller.get('class.id'),
        courseId: controller.get('course.id'),
        unitId,
        lessonId
      });
      controller.set('previewPlayerContext', previewPlayerContext);
      controller.set('previewContent', content);
      controller.set('previewContentType', content.get('format'));
      if (content.get('format') === CONTENT_TYPES.OFFLINE_ACTIVITY) {
        controller.set('isShowOfflineActivityPreview', true);
      } else {
        controller.set('isShowContentPreview', true);
      }
    },

    onOpenTeacherMilestoneReport(teacherMilestoneReportContext) {
      const controller = this;
      const classController = controller.get('classController');
      classController.set('isShowMilestoneReport', true);
      classController.openUnitReport(teacherMilestoneReportContext);
    },

    onOpenTeacherMilestoneLessonReport(teacherMilestoneLessonReportContext) {
      const controller = this;
      const classController = controller.get('classController');
      classController.set('isShowMilestoneReport', true);
      classController.openLessonReport(teacherMilestoneLessonReportContext);
    },

    onOpenTeacherMilestoneCollectionReport(
      teacherMilestoneCollectionReportContext
    ) {
      const controller = this;
      const classController = controller.get('classController');
      classController.set('isShowMilestoneReport', true);
      classController.openTeacherCollectionReport(
        teacherMilestoneCollectionReportContext
      );
    },
    /**
     * This Action is responsible for switch between milestone  and course map.
     */
    viewSwitcher(switchOptions) {
      if (switchOptions === 'milestone-course') {
        this.toggleProperty('isMilestoneView');
      } else {
        this.toggleProperty('isLessonPlanView');
      }
      if (!this.get('isMilestoneView')) {
        this.set('classController.isShowMilestoneReport', false);
      }
    },

    // onToggleClassListContainer() {
    //   Ember.$('.class-selector .class-list-container').slideToggle(500);
    // },

    //Action triggered when click on student toggle list container
    onToggleStudentList(controller = this) {
      controller.toggleProperty('isStudentListExpanded');
      Ember.$(
        '.students-dropdown-list-container .student-list-container'
      ).slideToggle(1000);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  init() {
    const controller = this;
    controller._super(...arguments);
    let milestoneViewApplicable = controller.get(
      'currentClass.milestoneViewApplicable'
    );
    if (milestoneViewApplicable && controller.get('isPremiumClass')) {
      controller.get('notifications').setOptions({
        positionClass: 'toast-top-full-width',
        timeOut: 200000
      });
      let message;
      let isClassDestinationSetup = controller.get('isClassDestinationSetup');
      let hasMilestoneViewReady = controller.get('hasMilestoneViewReady');
      if (!isClassDestinationSetup) {
        message = controller.get('i18n').t('warn.class-destination-not-setup')
          .string;
      } else if (!hasMilestoneViewReady) {
        message = controller.get('i18n').t('warn.teacher-milestone-not-ready')
          .string;
      }
      if (message) {
        controller.get('notifications').warning(message);
      }
    }
    let tab = controller.get('tab');
    let studentId = controller.get('studentId');
    if (tab && tab === 'report') {
      const classController = controller.get('classController');
      classController.openTeacherCourseReport();
    } else if (tab === 'student-report' && studentId) {
      controller.openStudentCourseReport(studentId);
    }
    Ember.run.scheduleOnce('afterRender', function() {
      controller.handleScrollToFixHeader();
    });
  },

  // -------------------------------------------------------------------------
  // Observers

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function to handle scroll to fix on the header
   */
  handleScrollToFixHeader() {
    Ember.$(document).scroll(function() {
      let scrollTop = Ember.$(document).scrollTop();
      let activeContainerEle = Ember.$(
        '.teacher-class-milestone-course-map .milestone-course-map-container .milestone-course-map.active'
      );
      let activePanelEle = Ember.$(
        '.teacher-class-milestone-course-map .milestone-course-map-container .milestone-course-map.active .milestone-course-map-panel.active'
      );
      Ember.$(activePanelEle).width(activePanelEle.parent().width());
      let offset = activeContainerEle.offset();
      if (offset) {
        if (scrollTop >= offset.top - activePanelEle.height()) {
          activePanelEle.addClass('sticky');
        } else {
          activePanelEle.removeClass('sticky');
        }
      }
    });
  },

  /**
   * @function  get class course map performance by student
   * @param {objects} class & course  - class and courseId..
   */
  getStudentCourseMap(studentId) {
    let controller = this;
    let classId = controller.get('currentClass.id');
    let course = controller.get('course');
    let courseId = controller.get('course.id');
    const collectionType = {
      collectionType: 'assessment'
    };

    const studentUnitPerformance = controller
      .get('courseMapService')
      .findClassPerformanceByStudentIdUnitLevel(
        classId,
        courseId,
        studentId,
        collectionType
      );

    return Ember.RSVP.hash({
      studentUnitPerformance: studentUnitPerformance
    }).then(function(hash) {
      let unitsPerformance = hash.studentUnitPerformance[0];
      let unitUsageData = unitsPerformance.usageData;
      let units = course.get('children');
      let unPerformedUnit = {
        completionDone: 0,
        completionTotal: 0,
        score: -1,
        timeSpent: -1
      };
      units.map(unit => {
        let id = unit.get('id');
        let data = unitUsageData.findBy('unitId', id);
        if (data) {
          unit.set('performance', data);
        } else {
          unit.set('performance', unPerformedUnit);
        }
      });
      controller.set('units', units);
      controller.set('isLoading', false);
    });
  },

  getStudentClassPerformance(studentId) {
    let controller = this;
    let classId = controller.get('currentClass.id');
    let courseId = controller.get('course.id');
    let classCourseId = Ember.A([
      {
        classId,
        courseId
      }
    ]);
    return Ember.RSVP.hash({
      studentClassPerformance: controller
        .get('performanceService')
        .findClassPerformanceSummaryByStudentAndClassIds(
          studentId,
          classCourseId
        )
    }).then(({ studentClassPerformance }) => {
      if (studentClassPerformance && studentClassPerformance.length) {
        controller.setStudentClassScore(studentClassPerformance[0]);
        controller.set('activeStudent.performance', studentClassPerformance[0]);
      }
    });
  },

  setStudentClassScore(studentClassPerformance) {
    let controller = this;
    let scorePercentage = studentClassPerformance
      ? studentClassPerformance.score
      : null;
    let score =
      scorePercentage >= 0 && scorePercentage !== null
        ? `${scorePercentage}`
        : '--';
    controller.set('studentClassScore', score);
  },

  /**
   * @function getRescopedData
   * Method to get rescoped data
   */
  getRescopedData() {
    let controller = this;
    let isPremiumClass = controller.get('isPremiumClass');
    //Initially load rescope data
    if (isPremiumClass) {
      controller.getSkippedContents().then(function(skippedContents) {
        let isContentAvailable;
        if (skippedContents) {
          isContentAvailable = controller.isSkippedContentsEmpty(
            skippedContents
          );
          controller.set('isContentAvailable', isContentAvailable);
        }

        if (skippedContents && isContentAvailable) {
          controller.toggleSkippedContents(skippedContents);
        }
      });
    }
  },

  /**
   * @function getSkippedContents
   * Method to get skipped contents
   */
  getSkippedContents() {
    let controller = this;
    let currentClass = controller.get('currentClass');
    let student = controller.get('activeStudent');
    let filter = {
      classId: currentClass.get('id'),
      courseId: currentClass.get('courseId'),
      userId: student.get('id')
    };
    let skippedContentsPromise = Ember.RSVP.resolve(
      controller.get('rescopeService').getSkippedContents(filter)
    );
    return Ember.RSVP.hash({
      skippedContents: skippedContentsPromise
    })
      .then(function(hash) {
        controller.set('skippedContents', hash.skippedContents);
        return hash.skippedContents;
      })
      .catch(function() {
        controller.set('skippedContents', null);
      });
  },

  /**
   * @function getFormattedContentsByType
   * Method to get formatted content type
   */
  getFormattedContentsByType(contents, types) {
    let controller = this;
    let formattedContents = Ember.A([]);
    types.map(type => {
      let flag = type.charAt(0);
      formattedContents = formattedContents.concat(
        controller.parseSkippedContents(contents[`${type}`], flag)
      );
    });
    return formattedContents;
  },

  /**
   * @function parseSkippedContents
   * Method to parse fetched rescoped contents
   */
  parseSkippedContents(contentIds, flag) {
    let parsedContentIds = Ember.A([]);
    contentIds.map(id => {
      parsedContentIds.push(`.${flag}-${id}`);
    });
    return parsedContentIds;
  },

  /**
   * @function toggleSkippedContents
   * Method to toggle skippedContents
   */
  toggleSkippedContents(skippedContents) {
    let controller = this;
    let contentTypes = Object.keys(skippedContents);
    let formattedContents = controller.getFormattedContentsByType(
      skippedContents,
      contentTypes
    );
    controller.toggleContentVisibility(formattedContents);
  },

  /**
   * @function toggleContentVisibility
   * Method to toggle content visibility
   */
  toggleContentVisibility(contentClassnames) {
    const $contentcontroller = Ember.$(contentClassnames.join());
    $contentcontroller.hide();
  },

  /**
   * @function isSkippedContentsEmpty
   * Method to toggle rescoped content visibility
   */
  isSkippedContentsEmpty(skippedContents) {
    let keys = Object.keys(skippedContents);
    let isContentAvailable = false;
    keys.some(key => {
      isContentAvailable = skippedContents[`${key}`].length > 0;
      return isContentAvailable;
    });
    return isContentAvailable;
  },

  /**
   **   Method to get unit level performance
   **/
  getUnitLevelPerformance() {
    let controller = this;
    let currentClass = controller.get('currentClass');
    let currentCourse = controller.get('course');
    let classId = currentClass.id;
    let courseId = currentCourse.id;
    let units = currentCourse.get('children') || [];
    let classMembers = controller.get('classMembers');
    let unitPerformancePromise = new Ember.RSVP.resolve(
      this.get('performanceService').findClassPerformance(
        classId,
        courseId,
        classMembers
      )
    );
    return Ember.RSVP.hash({
      unitPerformances: unitPerformancePromise
    }).then(function(hash) {
      let classPerformance = hash.unitPerformances;
      units.map(unit => {
        let unitId = unit.id;
        let score = classPerformance.calculateAverageScoreByItem(unitId);
        let timeSpent = classPerformance.calculateAverageTimeSpentByItem(
          unitId
        );
        let completionDone = classPerformance.calculateSumCompletionDoneByItem(
          unitId
        );
        let completionTotal = classPerformance.calculateSumCompletionTotalByItem(
          unitId
        );

        let numberOfStudents = classPerformance.findNumberOfStudentsByItem(
          unitId
        );

        let performance = {
          score,
          timeSpent,
          completionDone,
          completionTotal,
          numberOfStudents
        };
        unit.set('performance', performance);
      });
      controller.set('units', units);
    });
  },

  /**
   * @function loadRoute0Data
   * Method to load route0 data for a student
   */
  loadRoute0Data() {
    let controller = this;
    let isPremiumClass = controller.get('isPremiumClass'),
      isRoute0Applicable = controller.get('class.route0Applicable');
    if (isPremiumClass && isRoute0Applicable) {
      let route0Promise = controller.fetchRoute0Contents();
      return route0Promise.then(function(route0Contents) {
        let isAccepted = route0Contents.status === 'accepted';
        controller.set('isAccepted', isAccepted);
        controller.set('route0Contents', route0Contents);
      });
    } else {
      controller.set('route0Contents', null);
    }
  },

  /**
   * @function fetchRoute0Contents
   * Method to fetch route0 cotents for a student
   */
  fetchRoute0Contents() {
    let controller = this;
    let currentClass = controller.get('currentClass');
    let classId = currentClass.get('id');
    let courseId = currentClass.get('courseId');
    let userId = controller.get('activeStudent.id');
    let route0Service = controller.get('route0Service');
    let route0Promise = Ember.RSVP.resolve(
      route0Service.fetchInClassByTeacher({
        courseId,
        classId,
        userId
      })
    );
    return Ember.RSVP.hash({
      route0Contents: route0Promise
    }).then(({ route0Contents }) => {
      let status = route0Contents ? route0Contents.status : null;
      return status === 'accepted' ? route0Contents : Ember.RSVP.resolve({});
    });
  },

  loadItemsToGrade() {
    let controller = this;
    controller.set('isGradeLoading', true);
    let currentClass = controller.get('currentClass');
    let classId = currentClass.get('id');
    let courseId = currentClass.get('courseId');
    if (classId && courseId) {
      return Ember.RSVP.hash({
        pendingGradingItems: controller
          .get('rubricService')
          .getQuestionsToGrade(classId, courseId),
        pendingOaGradingItems: controller.fetchOaItemsToGrade()
      }).then(({ pendingGradingItems, pendingOaGradingItems }) => {
        let gradeItems = pendingGradingItems.gradeItems || Ember.A([]);
        let oaGradeItems = pendingOaGradingItems.gradeItems || Ember.A([]);
        if (oaGradeItems.length) {
          controller.loadOaItemsToGrade(oaGradeItems);
        }
        this.set('itemsToGradeList', Ember.A([]));
        if (gradeItems.length) {
          let itemsToGradeList = controller.get('itemsToGradeList');
          controller.getCourseStructure().then(function() {
            let itemsToGrade = Ember.A([]);
            gradeItems.map(function(item) {
              let gradeItem = controller.createGradeItemObject(item);
              if (gradeItem) {
                itemsToGrade.push(gradeItem);
              }
            });
            Ember.RSVP.all(itemsToGrade).then(function(questionItems) {
              controller.set(
                'itemsToGradeList',
                itemsToGradeList.concat(questionItems)
              );
            });
          });
        }
        controller.set('isGradeLoading', false);
      });
    } else {
      controller.set('isGradeLoading', false);
    }
  },

  /**
   * @function loadOaItemsToGrade
   * Method to load OA items to be graded
   * @param {Array} oaItemsToGrade
   */
  loadOaItemsToGrade(oaItemsToGrade = Ember.A([])) {
    const controller = this;
    oaItemsToGrade.map(oaItem => {
      controller
        .createOaGradeItemObject(oaItem)
        .then(function(oaGradeItemObject) {
          controller.get('itemsToGradeList').pushObject(oaGradeItemObject);
        });
    });
  },

  getCourseStructure() {
    let controller = this;
    let course = controller.get('course');
    const courseService = controller.get('courseService');
    return courseService
      .getCourseStructure(course.get('id'), CONTENT_TYPES.ASSESSMENT)
      .then(function(courseStructure) {
        controller.set('courseStructure', courseStructure);
      });
  },

  /**
   * Creates the grade item information
   * @param {[]} grade item
   * @param {item} item
   */
  createGradeItemObject: function(item) {
    const controller = this;
    const itemObject = Ember.Object.create();
    const courseStructure = controller.get('courseStructure');
    if (courseStructure) {
      const unitId = item.get('unitId');
      const lessonId = item.get('lessonId');
      const collectionId = item.get('collectionId');
      const collectionType = item.get('collectionType');
      const isAssessment = !collectionType || collectionType === 'assessment';
      const resourceId = item.get('resourceId');
      const studentCount = item.get('studentCount');
      const unit = courseStructure.get('children').findBy('id', unitId);
      if (unit) {
        const lesson = unit.get('children').findBy('id', lessonId);
        if (lesson) {
          const unitIndex = courseStructure.getChildUnitIndex(unit) + 1;
          const lessonIndex = unit.getChildLessonIndex(lesson) + 1;
          return new Ember.RSVP.Promise(function(resolve, reject) {
            return Ember.RSVP.hash({
              collection: collectionId
                ? isAssessment
                  ? controller
                    .get('assessmentService')
                    .readAssessment(collectionId)
                  : controller
                    .get('collectionService')
                    .readCollection(collectionId)
                : undefined
            }).then(function(hash) {
              const collection = hash.collection;
              const content = collection
                .get('children')
                .findBy('id', resourceId);
              itemObject.setProperties({
                unitIndex: unitIndex,
                lessonIndex: lessonIndex,
                unit: unit,
                lesson: lesson,
                classId: controller.get('class.id'),
                courseId: controller.get('course.id'),
                unitId: unit.get('id'),
                lessonId: lesson.get('id'),
                contentType: collectionType,
                collection,
                content,
                studentCount
              });
              resolve(itemObject);
            }, reject);
          });
        }
      }
    }
  },

  /**
   * @function openStudentMilestoneReport
   * Method to bring student milestone course report
   */
  openStudentMilestoneReport(student) {
    const controller = this;
    let classData = controller.get('class');
    let studentClassData = classData.copy(true);
    studentClassData.set('preference', classData.get('preference'));
    studentClassData.set(
      'memberGradeBounds',
      classData.get('memberGradeBounds')
    );
    studentClassData.set('performanceSummary', student.get('performance'));
    controller.set('studentClassData', studentClassData);
    controller.set('isShowStudentMilestoneReport', true);
  },

  openStudentCourseReport(studentId) {
    const controller = this;
    let params = Ember.Object.create({
      userId: studentId,
      classId: controller.get('class.id'),
      class: controller.get('class'),
      courseId: controller.get('course.id'),
      course: controller.get('course'),
      isTeacher: true,
      isStudent: false,
      loadUnitsPerformance: true
    });
    controller.set('studentCourseReportContext', params);
    controller.set('showCourseReport', true);
  },

  /**
   * @function fetchOaItemsToGrade
   * Method to fetch OA items to be graded by teacher
   * @return {Promise}
   */
  fetchOaItemsToGrade() {
    const controller = this;
    const requestParam = {
      classId: controller.get('class.id'),
      type: 'oa',
      source: 'coursemap',
      courseId: controller.get('course.id')
    };
    return controller.get('rubricService').getOaItemsToGrade(requestParam);
  },

  /**
   * Creates the grade item information for activity level
   * @param {[]} grade item
   * @param {item} item
   */
  createOaGradeItemObject: function(item) {
    const controller = this;
    const activityId = item.get('collectionId');
    const contentType = item.get('collectionType');
    const dcaContentId = item.get('dcaContentId');
    const itemObject = Ember.Object.create();
    const studentCount = item.get('studentCount');
    return new Ember.RSVP.Promise(function(resolve, reject) {
      controller
        .get('offlineActivityService')
        .readActivity(activityId)
        .then(function(content) {
          itemObject.setProperties({
            classId: controller.get('class.id'),
            dcaContentId,
            content,
            contentType,
            studentCount
          });
          resolve(itemObject);
        }, reject);
    });
  },

  loadSecondaryClassInfo(classId) {
    const controller = this;
    const classPromise = controller.get('classService').readClassInfo(classId);
    const membersPromise = controller
      .get('classService')
      .readClassMembers(classId);
    return classPromise.then(function(classData) {
      let classCourseId = null;
      if (classData.courseId) {
        classCourseId = Ember.A([
          {
            classId: classId,
            courseId: classData.courseId
          }
        ]);
      }
      const performanceSummaryPromise = classCourseId
        ? controller
          .get('performanceService')
          .findClassPerformanceSummaryByClassIds(classCourseId)
        : null;
      return Ember.RSVP.hash({
        class: classPromise,
        members: membersPromise,
        classPerformanceSummaryItems: performanceSummaryPromise
      }).then(function(hash) {
        const aClass = hash.class;
        const members = hash.members;
        const classPerformanceSummaryItems = hash.classPerformanceSummaryItems;
        let classPerformanceSummary = classPerformanceSummaryItems
          ? classPerformanceSummaryItems.findBy('classId', classId)
          : null;
        aClass.set('performanceSummary', classPerformanceSummary);
        const setting = aClass.get('setting');
        const isPremiumClass = setting != null && setting['course.premium'];
        const courseId = aClass.get('courseId');
        let visibilityPromise = Ember.RSVP.resolve([]);
        let coursePromise = Ember.RSVP.resolve(Ember.Object.create({}));
        const competencyCompletionStats = isPremiumClass
          ? controller
            .get('competencyService')
            .getCompetencyCompletionStats([classId])
          : Ember.RSVP.resolve(Ember.A());

        if (courseId) {
          visibilityPromise = controller
            .get('classService')
            .readClassContentVisibility(classId);
          coursePromise = controller.get('courseService').fetchById(courseId);
        }
        const frameworkId = aClass.get('preference.framework');
        const subjectId = aClass.get('preference.subject');

        let crossWalkFWCPromise = null;
        if (frameworkId && subjectId) {
          crossWalkFWCPromise = controller
            .get('taxonomyService')
            .fetchCrossWalkFWC(frameworkId, subjectId);
        }
        return Ember.RSVP.hash({
          contentVisibility: visibilityPromise,
          course: coursePromise,
          crossWalkFWC: crossWalkFWCPromise,
          competencyStats: competencyCompletionStats
        }).then(function(hash) {
          const contentVisibility = hash.contentVisibility;
          const course = hash.course;
          const crossWalkFWC = hash.crossWalkFWC || [];
          const secondaryClassList = hash.secondaryClassList;
          aClass.set('owner', members.get('owner'));
          aClass.set('collaborators', members.get('collaborators'));
          aClass.set('memberGradeBounds', members.get('memberGradeBounds'));
          aClass.set('members', members.get('members'));
          aClass.set(
            'competencyStats',
            hash.competencyStats.findBy('classId', classId)
          );
          if (!controller.isDestroyed) {
            controller
              .get('classController')
              .send('onSelectSecondaryClass', aClass);
            controller.send('onSelectedClass', {
              class: aClass,
              course,
              members,
              contentVisibility,
              crossWalkFWC,
              secondaryClassList
            });
          }
        });
      });
    });
  }
});
