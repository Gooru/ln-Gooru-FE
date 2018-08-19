import Ember from 'ember';

/**
 * Class Overview controller
 *
 * Controller responsible of the logic for the class overview page
 */

export default Ember.Controller.extend({
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

  // -------------------------------------------------------------------------
  // Attributes

  queryParams: ['location'],

  /**
   * Combination of unit, lesson and resource (collection or assessment)
   * separated by a plus sign
   * @example
   * location='uId001+lId002+cId003'
   */
  location: '',

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
  class: Ember.computed.alias('classController.class'),

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
  showWelcome: true,

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

  // -------------------------------------------------------------------------
  // Actions

  actions: {
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
      controller.getUnitLevelPerformance();
      controller.set('isStudentCourseMap', false);
      controller.set('isLoading', false);
      Ember.$('.list').removeClass('active');
      Ember.$('.teacher.list').addClass('active');
    },

    /**
     * Action triggered when select single student
     */
    onSelectStudent(student, index) {
      let controller = this;
      controller.set('isStudentCourseMap', true);
      controller.set('isLoading', true);
      controller.set('units', Ember.A([]));
      controller.set('activeStudent', student);
      controller.getStudentCourseMap(student.id);
      controller.loadRoute0Data();
      if (controller.get('isPremiumClass')) {
        controller.getRescopedData();
      }
      Ember.$('.list').removeClass('active');
      Ember.$(`.student-${index}`).addClass('active');
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
      controller.set('studentReportContextData', params);
      controller.set('isShowStudentReport', true);
    },

    /**
     * Action triggered when close collection report pull up
     */
    onClosePullUp() {
      let controller = this;
      controller.set('isShowStudentReport', false);
    },

    /**
     * Trigger when student unit level  report clicked
     */
    onOpenStudentUnitLevelReport(params) {
      this.set('showStudentUnitReport', true);
      this.set('studentUnitReportContext', params);
    },

    /**
     * Trigger when student lesson   report clicked
     */
    onOpenStudentLessonReport(params) {
      this.set('showStudentLessonReport', true);
      this.set('studentLessonReportContext', params);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Observers

  // -------------------------------------------------------------------------
  // Methods

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

  /**
   * @function getRescopedData
   * Method to get rescoped data
   */
  getRescopedData() {
    let controller = this;
    let isPremiumClass = controller.get('isPremiumClass');
    //Initially load rescope data
    if (isPremiumClass) {
      controller.set('isPremiumClass', isPremiumClass);
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
          controller.set('isChecked', false);
        } else {
          controller.set('isChecked', true);
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
    let filter = {
      classId: currentClass.get('id'),
      courseId: currentClass.get('courseId')
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
    let controller = this;
    let isChecked = controller.get('isChecked');
    const $contentcontroller = Ember.$(contentClassnames.join());
    if (isChecked) {
      $contentcontroller.show().addClass('rescoped-content');
    } else {
      $contentcontroller.hide();
    }
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

        let numberOfStudnts = classPerformance.findNumberOfStudentsByItem(
          unitId
        );
        let performance = {
          score,
          timeSpent,
          completionDone,
          completionTotal,
          numberOfStudnts
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
    let isPremiumClass = controller.get('isPremiumClass');
    if (isPremiumClass) {
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
      route0Service.fetchInClassByTeacher({ courseId, classId, userId })
    );
    return Ember.RSVP.hash({
      route0Contents: route0Promise
    }).then(({ route0Contents }) => {
      let status = route0Contents ? route0Contents.status : null;
      return status === 'accepted' ? route0Contents : Ember.RSVP.resolve({});
    });
  }
});
