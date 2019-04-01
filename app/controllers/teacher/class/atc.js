import Ember from 'ember';
import { isCompatibleVW } from 'gooru-web/utils/utils';

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * Analytics Service
   */
  analyticsService: Ember.inject.service('api-sdk/analytics'),

  /**
   * Class Service
   */
  classService: Ember.inject.service('api-sdk/class'),

  /**
   * Session Service
   */
  session: Ember.inject.service('session'),

  /**
   * Class Controller
   */
  classController: Ember.inject.controller('teacher.class'),

  /**
   * Class Activities Service
   */
  classActivitiesService: Ember.inject.service('api-sdk/class-activity'),

  /**
   * Competency Service
   */
  competencyService: Ember.inject.service('api-sdk/competency'),

  // -------------------------------------------------------------------------
  // Properties
  /**
   * A link to the parent class controller
   * @see controllers/class.js
   * @property {Class}
   */
  class: Ember.computed.alias('classController.class'),

  /**
   * @property {Object} course
   */
  course: Ember.computed.alias('class.course'),

  /**
   * @property {UUID} classId
   */
  classId: Ember.computed.alias('class.id'),

  /**
   * @property {UUID} courseId
   */
  courseId: Ember.computed.alias('course.id'),

  /**
   * @property {Array} students
   */
  students: Ember.computed.alias('class.members'),

  /**
   * @property {String} subjectCode
   */
  subjectCode: Ember.computed.alias('course.subject'),

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

  /**
   * @property {Boolean} isShowCompetencyCompletionReport
   */
  isShowCompetencyCompletionReport: false,

  /**
   * Maintains the value which of month activities displaying
   * @type {Integer}
   */
  activeMonth: Ember.computed(function() {
    return moment().format('MM');
  }),

  /**
   * @property {Boolean} isCurrentMonth
   */
  isCurrentMonth: Ember.computed('activeMonth', function() {
    const controller = this;
    let activeMonth = controller.get('activeMonth');
    let currentMonth = moment().format('MM');
    return activeMonth === currentMonth;
  }),

  /**
   * Maintains the value which of year activities displaying
   * @type {Integer}
   */
  activeYear: Ember.computed(function() {
    return moment().format('YYYY');
  }),

  /**
   * @property {String} userAgent
   */
  userAgent: 'desktop',

  /**
   * @property {Boolean} isExpandedView
   */
  isExpandedView: false,

  /**
   * @property {Boolean} isShowAtcView
   */
  isShowAtcView: Ember.computed('students', 'courseId', function() {
    const controller = this;
    let isStudentsAvailable = controller.get('students.length');
    let isCourseMapped = controller.get('courseId');
    return isStudentsAvailable && isCourseMapped;
  }),

  /**
   * @property {Boolean} isShowActivitySearchContentPullup
   * Property to show/hide activity search content pullup
   */
  isShowActivitySearchContentPullup: false,

  /**
   * @property {String} defaultContentTypeToSuggest
   * Property to hold default content suggstion
   */
  defaultContentTypeToSuggest: 'collection',

  /**
   * @property {Array} selectedStudents
   * Property to hold list of students to suggest
   */
  selectedStudents: Ember.A([]),

  /**
   * @property {Json} classPreference
   */
  classPreference: Ember.computed.alias('class.preference'),

  // -------------------------------------------------------------------------
  // Events
  initializeController() {
    const controller = this;
    if (controller.get('isPremiumClass') && controller.get('isShowAtcView')) {
      if (isCompatibleVW('medium')) {
        controller.set('userAgent', 'mobile');
      }
      controller.loadData();
    }
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    //Action triggered when click a domain
    onSelectDomain(domainData) {
      const controller = this;
      controller.set(
        'competencyCompletionReport',
        domainData.get('competenciesData').sortBy('completionPercentage')
      );
      controller.set('selectedDomain', domainData);
      controller.set('isShowCompetencyCompletionReport', true);
    },

    //Action triggered when change month
    onChangeMonth() {
      const controller = this;
      controller.loadData();
    },

    //Action triggered when toggle domains to be reviewed list
    toggleView() {
      const controller = this;
      controller.set('isExpandedView', !controller.get('isExpandedView'));
      let domainsCompletionReport = controller.get('domainsCompletionReport');
      controller.getDomainListToShow(domainsCompletionReport);
    },

    //Action triggered when click activities count box
    onRedirectToCA() {
      const controller = this;
      const classId = controller.get('classId');
      let month = controller.get('activeMonth');
      let year = controller.get('activeYear');
      let queryParams = {
        month,
        year
      };
      controller.transitionToRoute('teacher.class.class-activities', classId, {
        queryParams
      });
    },

    //Action triggered when click on competency suggestion
    onSuggestAtCompetency(
      competency,
      selectedContentType = null,
      selectedStudents = []
    ) {
      const controller = this;
      let contextParams = {
        classId: controller.get('classId'),
        class: controller.get('class'),
        course: controller.get('course'),
        courseId: controller.get('courseId')
      };
      controller.set('contextParams', contextParams);
      controller.set('selectedCompetencyData', competency);
      controller.set('isShowActivitySearchContentPullup', true);
      controller.set(
        'selectedContentType',
        selectedContentType || controller.get('defaultContentTypeToSuggest')
      );
      controller.set('selectedStudents', selectedStudents);
    },

    //Action triggered at once an activity added into the DCA
    addedContentToDCA(activityData) {
      const controller = this;
      let selectedStudents = controller.get('selectedStudents');
      if (selectedStudents.length) {
        let studentIds = selectedStudents.map(student => {
          return student.get('id');
        });
        let activityId = activityData.get('id');
        controller.assignStudentsToContent(studentIds, activityId);
      }
    }
  },

  // -------------------------------------------------------------------------
  // Functions
  /**
   * @function loadData
   * Method to load atc view data
   */
  loadData() {
    const controller = this;
    controller.set('isLoading', true);
    controller.fetchClassActivitiesCount();
    controller
      .fetchDomainsCompletionReport()
      .then(function(domainsCompletionReport) {
        controller.set('domainsCompletionReport', domainsCompletionReport);
        controller.getDomainListToShow(domainsCompletionReport);
        controller.set('isLoading', false);
      });
  },

  /**
   * @function fetchClassActivitiesCount
   * Method to fetch activities count
   */
  fetchClassActivitiesCount() {
    const controller = this;
    const classActivitiesService = controller.get('classActivitiesService');
    const classId = controller.get('classId');
    let month = controller.get('activeMonth');
    let year = controller.get('activeYear');
    return Ember.RSVP
      .hash({
        activitiesCount: Ember.RSVP.resolve(
          classActivitiesService.getMonthlyActivitiesCount(classId, month, year)
        )
      })
      .then(({ activitiesCount }) => {
        controller.set('activitiesCount', activitiesCount);
        return activitiesCount;
      })
      .catch(function() {
        let activitiesCount = {
          scheduled: 0,
          unscheduled: 0
        };
        controller.set('activitiesCount', activitiesCount);
      });
  },

  /**
   * @function fetchDomainsCompletionReport
   * Method to fetch domains completion report
   */
  fetchDomainsCompletionReport() {
    const controller = this;
    const competencyService = controller.get('competencyService');
    const classId = controller.get('classId');
    let month = controller.get('activeMonth');
    let year = controller.get('activeYear');
    let agent = controller.get('userAgent');
    let requestBody = {
      classId,
      month,
      year,
      agent
    };
    return Ember.RSVP
      .hash({
        domainsCompletionReport: Ember.RSVP.resolve(
          competencyService.getDomainsCompletionReport(requestBody)
        )
      })
      .then(({ domainsCompletionReport }) => {
        return domainsCompletionReport;
      });
  },

  /**
   * @function getDomainListToShow
   * Method to get domains list to show
   */
  getDomainListToShow(domainsCompletionReport) {
    const controller = this;
    let domainsCompletionList = Ember.A([]);
    let notStartedCompletionList = Ember.A([]);
    if (domainsCompletionReport) {
      let domainsCompletionReportList = domainsCompletionReport.get(
        'domainsData'
      );
      let sortedReportList = domainsCompletionReportList.sortBy(
        'completionPercentage'
      );
      domainsCompletionList = sortedReportList.filter(function(domain) {
        return domain.completionPercentage;
      });
      notStartedCompletionList = sortedReportList.filter(function(domain) {
        return domain.completionPercentage === 0;
      });
    }
    controller.set(
      'domainsCompletionList',
      domainsCompletionList.concat(notStartedCompletionList)
    );
    return domainsCompletionList;
  },

  /**
   * @function assignStudentsToContent
   * Method to assign list of students into an activity
   */
  assignStudentsToContent(studentIds, contentId) {
    const controller = this;
    const classId = controller.get('classId');
    controller
      .get('classActivitiesService')
      .addUsersToActivity(classId, contentId, studentIds);
  }
});
