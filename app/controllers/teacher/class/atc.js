import Ember from 'ember';

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
   * Maintains the value which of year activities displaying
   * @type {Integer}
   */
  activeYear: Ember.computed(function() {
    return moment().format('YYYY');
  }),

  /**
   * @property {Number} mediumDeviceWidth
   */
  mediumDeviceWidth: 992,

  /**
   * @property {String} userAgent
   */
  userAgent: 'desktop',


  // -------------------------------------------------------------------------
  // Events
  init() {
    const controller = this;
    if (controller.get('isPremiumClass')) {
      let screenWidth = window.screen.width;
      let mediumDeviceWidth = controller.get('mediumDeviceWidth');
      if (screenWidth <= mediumDeviceWidth) {
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
      let domainCode = domainData.get('domainCode');
      controller.fetchCompetencyCompletionReport(domainCode).then(function(competencyCompletionReport) {
        controller.set('selectedDomain', domainData);
        controller.set('competencyCompletionReport', competencyCompletionReport);
        controller.set('isShowCompetencyCompletionReport', true);
      });
    },

    //Action triggered when change month
    onChaneMonth() {
      const controller = this;
      controller.loadData();
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
    // controller.fetchDomainsCompletionReport().then(function(domainsCompletionReport) {
    //   controller.set('domainsCompletionReport', domainsCompletionReport);
    //   controller.set('isLoading', false);
    // });
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
    return Ember.RSVP.hash({
      activitiesCount: Ember.RSVP.resolve(classActivitiesService.getMonthlyActivitiesCount(classId, month, year))
    })
      .then(({activitiesCount}) => {
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
    let filters = {
      month,
      year,
      agent
    };
    return Ember.RSVP.hash({
      domainsCompletionReport: Ember.RSVP.resolve(competencyService.getDomainsCompletionReport(classId, filters))
    })
      .then(({domainsCompletionReport}) => {
        return domainsCompletionReport;
      });
  },

  /**
   * @function fetchCompetencyCompletionReport
   * Method to fetch competency completion report
   */
  fetchCompetencyCompletionReport(domainCode) {
    const controller = this;
    const competencyService = controller.get('competencyService');
    const classId = controller.get('classId');
    let month = controller.get('activeMonth');
    let year = controller.get('activeYear');
    let agent = controller.get('userAgent');
    let filters = {
      month,
      year,
      agent
    };
    return Ember.RSVP.hash({
      completionCompletionReport: Ember.RSVP.resolve(competencyService.getCompetencyCompletionReport(classId, domainCode, filters))
    })
      .then(({completionCompletionReport}) => {
        return completionCompletionReport;
      });
  }

});
