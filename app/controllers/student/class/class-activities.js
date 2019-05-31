import Ember from 'ember';
import SessionMixin from 'gooru-web/mixins/session';
import ModalMixin from 'gooru-web/mixins/modal';

/**
 * Class activities controller
 *
 * Controller responsible of the logic for the student class activities tab
 */
export default Ember.Controller.extend(SessionMixin, ModalMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * Read the class data from the parent student class controller
   * @property {Object}
   */
  classController: Ember.inject.controller('student.class'),

  /**
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service('api-sdk/class-activity'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    toggleDatePicker() {
      let controller = this;
      controller.toggleProperty('isActive');
      controller.animateDatePicker();
    },

    studentDcaReport(collection, studentPerformance, activityDate) {
      let component = this;
      let userId = component.get('session.userId');
      let params = {
        userId: userId,
        classId: component.get('class.id'),
        collectionId: collection.get('id'),
        type: collection.get('format'),
        isStudent: true,
        collection,
        activityDate,
        studentPerformance
      };
      if (collection.get('format') === 'assessment-external') {
        component.set('isShowStudentExternalAssessmentReport', true);
        component.set('showStudentDcaReport', false);
        component.set('isShowStudentExternalCollectionReport', false);
      } else if (collection.get('format') === 'collection-external') {
        component.set('showStudentDcaReport', false);
        component.set('isShowStudentExternalAssessmentReport', false);
        component.set('isShowStudentExternalCollectionReport', true);
      } else {
        component.set('showStudentDcaReport', true);
        component.set('isShowStudentExternalAssessmentReport', false);
        component.set('isShowStudentExternalCollectionReport', false);
      }
      component.set('studentReportContextData', params);
    },

    onClosePullUp() {
      let component = this;
      component.set('isShowStudentExternalCollectionReport', false);
      component.set('isShowStudentExternalAssessmentReport', false);
      component.set('studentDcaReport', false);
    },

    showPreviousMonth(date) {
      let controller = this;
      controller.loadActivitiesForMonth();
      controller.loadActivityForDate(date);
    },

    showNextMonth(date) {
      let controller = this;
      controller.loadActivitiesForMonth();
      controller.loadActivityForDate(date);
    },

    onSelectDate(date) {
      let controller = this;
      controller.set('selectedDate', date);
      controller.loadActivityForDate(date);
      controller.send('toggleDatePicker');
    },

    onSelectToday(date) {
      let controller = this;
      controller.send('onSelectDate', date);
    },

    toggleOffineActivity() {
      let controller = this;
      controller.animateOfflineActivityForMobile();
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  queryParams: ['tab'],

  /**
   * @property {String} tab
   */
  tab: null,

  /**
   * Contains classActivity objects
   * @property {classActivity[]} classActivities
   */
  classActivities: Ember.A([]),

  /**
   * Class id
   * @property {String}
   */
  classId: Ember.computed.alias('classController.class.id'),

  /**
   * Class Object
   * @property {Object}
   */
  class: Ember.computed.alias('classController.class'),

  /**
   * @property {boolean} Indicates if there are class activities
   */
  showClassActivities: Ember.computed.gt('classActivities.length', 0),

  /**
   * @property {Boolean} isShowStudentExternalAssessmentReport
   */
  isShowStudentExternalAssessmentReport: false,

  /**
   * @property {Boolean} studentDcaReport
   */
  studentDcaReport: false,

  /**
   * Class id
   * @property {String}
   */
  collection: Ember.computed.alias('classController.class.collection'),

  /**
   * Maintain  state of loading data
   * @type {Boolean}
   */
  isLoading: false,

  /**
   * Maintains the value which of month activities displaying
   * @type {Integer}
   */
  forMonth: Ember.computed(function() {
    return moment().format('MM');
  }),
  /**
   * Maintains the value which of year activities displaying
   * @type {Integer}
   */
  forYear: Ember.computed(function() {
    return moment().format('YYYY');
  }),

  /**
   * Maintains the value of date is today or not
   * @type {Integer}
   */
  isToday: Ember.computed('selectedDate', function() {
    return this.get('selectedDate') === moment().format('YYYY-MM-DD');
  }),

  /**
   * Maintains the value of selected date of the user
   * @type {Integer}
   */
  selectedDate: null,

  /**
   * It Maintains the list of scheduled class activities datewise.
   * @type {Array}
   */
  scheduledClassActivitiesDatewise: Ember.computed(
    'classActivitiesOfMonth.[]',
    function() {
      let controller = this;
      let activities = Ember.A();
      controller.get('classActivitiesOfMonth').forEach(classActivity => {
        let addedDate = classActivity.get('added_date');
        if (addedDate) {
          let isToday =
            moment(addedDate).format('YYYY-MM-DD') ===
            moment().format('YYYY-MM-DD');
          let activity = Ember.Object.create({
            day: moment(addedDate).format('DD'),
            hasActivity: true,
            isToday
          });
          activities.pushObject(activity);
        }
      });
      return activities;
    }
  ),

  // -------------------------------------------------------------------------
  // Methods

  initialize() {
    let controller = this;
    controller._super(...arguments);
    let todayDate = moment().format('YYYY-MM-DD');
    controller.loadActivityForDate(todayDate);
    controller.loadActiveOfflineActivities();
    controller.loadCompeltedOfflineActivities();

  },

  /**
   * @function animateDatePicker
   * Method to slide up and down date picker
   */
  animateDatePicker() {
    let element = Ember.$('.ca-schedule-items-header .ca-date-selector');
    let dateDisplayEle = Ember.$('.ca-date-selector .ca-date-picker-container');
    if (!element.hasClass('active')) {
      element.slideDown(400, function() {
        element.addClass('active');
        dateDisplayEle.addClass('active');
      });
    } else {
      element.slideUp(400, function() {
        element.removeClass('active');
        dateDisplayEle.removeClass('active');
      });
    }
  },

  /**
   * @function loadActivityForDate
   * Method to fetch activity for specific date
   * @params {string} Date
   */
  loadActivityForDate(date) {
    const controller = this;
    const userId = controller.get('session.userId');
    const classId = controller.get('classId');
    controller.set('isLoading', true);
    controller.get('classActivityService')
      .getStudentScheduledActivities(userId, classId, date)
      .then(function(classActivities) {
        controller.set('classActivities', classActivities);
        controller.set('isLoading', false);
      });
  },

  /**
   * @function loadActivitiesForMonth
   * Method to fetch activities for a month
   */
  loadActivitiesForMonth() {
    const controller = this;
    const classId = controller.get('classId');
    let forMonth = controller.get('forMonth');
    let forYear = controller.get('forYear');
    let startDate = `${forYear}-${forMonth}-01`;
    let userId = controller.get('session.userId');
    let endDate = moment(startDate).endOf('month').format('YYYY-MM-DD');
    controller.set('isLoading', true);
    controller
      .get('classActivityService')
      .getStudentScheduledActivities(userId, classId, startDate, endDate)
      .then(classActivities => {
        controller.set('classActivitiesOfMonth', classActivities);
        controller.set('isLoading', false);
      });
  },

  /**
   * @function loadActiveOfflineActivities
   * Method to fetch active offline activities
   */
  loadActiveOfflineActivities() {
    const controller = this;
    const classId = controller.get('classId');
    controller.get('classActivityService')
      .fetchActiveOfflineActivities(classId)
      .then(activeOfflineActivities => {
        controller.set('activeOfflineActivities', activeOfflineActivities);
      });
  },

  /**
   * @function loadCompeltedOfflineActivities
   * Method to fetch completed offline activities
   */
  loadCompeltedOfflineActivities() {
    const controller = this;
    const classId = controller.get('classId');
    controller
      .get('classActivityService')
      .fetchCompletedOfflineActivities(classId)
      .then(completedOfflineActivities => {
        controller.set('completedOfflineActivities', completedOfflineActivities);
      });
  },

  /**
   * Animate a offline activity for desktop
   */
  animateOfflineActivityForMobile() {
    let offlineActivityEle = Ember.$('.ca-panel .right-panel .offline-container');
    let windowHeight = $(window).height();
    if (offlineActivityEle.hasClass('active')) {
      offlineActivityEle.animate({
        top: windowHeight - 50
      }, 400,
      function() {
        offlineActivityEle.removeClass('active');
      });
    } else {
      offlineActivityEle.addClass('active');
      offlineActivityEle.animate({
        top: 100
      },
      400
      );
    }
  }
});
