import Ember from 'ember';
import SessionMixin from 'gooru-web/mixins/session';
import ModalMixin from 'gooru-web/mixins/modal';
import { PLAYER_EVENT_SOURCE, SCREEN_SIZES } from 'gooru-web/config/config';
import { isCompatibleVW } from 'gooru-web/utils/utils';

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

  /**
   * @requires service:api-sdk/suggest
   */
  suggestService: Ember.inject.service('api-sdk/suggest'),

  /**
   * @requires service:api-sdk/offline-activity-analytics
   */
  oaAnaltyicsService: Ember.inject.service(
    'api-sdk/offline-activity/oa-analytics'
  ),

  /**
   * @requires service:api-sdk/offline-activity
   */
  offlineActivityService: Ember.inject.service(
    'api-sdk/offline-activity/offline-activity'
  ),
  // -------------------------------------------------------------------------
  // Actions

  actions: {
    onShowSuggestion(classActivity) {
      const controller = this;
      controller.fetchSuggestionContent(classActivity);
    },
    onOpenReportGrade(itemToGrade) {
      let controller = this;
      controller.set('itemToGradeContextData', itemToGrade);
      controller.set('showOAGrade', true);
    },

    toggleDatePicker() {
      let controller = this;
      controller.toggleProperty('isActive');
      controller.animateDatePicker();
    },

    /**
     * Action triggered when items to grade section item got clicked.
     */
    toggleItemsToGrade() {
      let controller = this;
      let isMobileView = controller.get('isMobileView');
      if (isMobileView) {
        controller.animateItemsToGradeForMobile();
      } else {
        controller.animateItemsToGradeForDesktop();
      }
    },

    studentDcaReport(
      collection,
      studentPerformance,
      activityDate,
      classActivity
    ) {
      let component = this;
      let userId = component.get('session.userId');
      let users = component.get('class.members').filterBy('id', userId);
      let params = {
        userId: userId,
        classId: component.get('class.id'),
        collectionId: collection.get('id'),
        type: collection.get('format'),
        isStudent: true,
        collection,
        activityDate,
        studentPerformance,
        classActivity,
        users
      };
      component.set('isShowStudentExternalAssessmentReport', false);
      component.set('showStudentDcaReport', false);
      component.set('isShowStudentExternalCollectionReport', false);
      component.set('isShowOfflineActivityReport', false);
      if (collection.get('format') === 'assessment-external') {
        component.set('isShowStudentExternalAssessmentReport', true);
      } else if (collection.get('format') === 'collection-external') {
        component.set('isShowStudentExternalCollectionReport', true);
      } else if (collection.get('format') === 'offline-activity') {
        component.set('isShowOfflineActivityReport', true);
      } else {
        component.set('showStudentDcaReport', true);
      }
      component.set('studentReportContextData', params);
    },

    onClosePullUp() {
      let component = this;
      component.set('isShowStudentExternalCollectionReport', false);
      component.set('isShowStudentExternalAssessmentReport', false);
      component.set('studentDcaReport', false);
      component.set('isShowOfflineActivityReport', false);
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
      let isMobileView = controller.get('isMobileView');
      if (isMobileView) {
        controller.animateOfflineActivityForMobile();
      } else {
        controller.animateOfflineActivityForDesktop();
      }
    },

    playContent(route, queryParams, contentId, content) {
      const component = this;
      component.set(
        'playerUrl',
        component.target
          .get('router')
          .generate(route, contentId, { queryParams })
      );
      component.set('isOpenPlayer', true);
      component.set('playerContent', content);
    },

    closePullUp() {
      const component = this;
      component.set('isOpenPlayer', false);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Boolean} isMobileView
   * Property to handle is mobile view
   */
  isMobileView: isCompatibleVW(SCREEN_SIZES.MEDIUM),

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
   * it maintains data for active offline activities
   * @property {Array}
   */
  activeOfflineActivities: Ember.A([]),

  /**
   * it maintains data for completed offline activities
   * @property {Array}
   */
  completedOfflineActivities: Ember.A([]),

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

  itemsToGrade: Ember.A([]),

  studentId: Ember.computed('session', function() {
    let controller = this;
    return controller.get('session.userId');
  }),

  // -------------------------------------------------------------------------
  // Methods

  initialize() {
    let controller = this;
    controller._super(...arguments);
    let todayDate = moment().format('YYYY-MM-DD');
    controller.loadActivityForDate(todayDate);
    controller.loadActiveOfflineActivities();
    controller.loadCompeltedOfflineActivities();
    controller.loadItemsToGrade();
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
    controller
      .get('classActivityService')
      .getStudentScheduledActivities(userId, classId, date)
      .then(function(classActivities) {
        controller.set('classActivities', classActivities);
        if (classActivities.length) {
          controller.getSuggestionCounts(classActivities);
        }
        controller.set('isLoading', false);
      });
  },

  getSuggestionCounts(classActivities) {
    const controller = this;
    const classId = controller.get('classId');
    const userId = controller.get('session.userId');
    const caIds = classActivities.map(classActivity => classActivity.get('id'));
    const context = {
      scope: PLAYER_EVENT_SOURCE.CLASS_ACTIVITY,
      caIds
    };
    controller
      .get('suggestService')
      .getSuggestionCountForCA(userId, classId, context)
      .then(contents => {
        contents.map(content => {
          const caId = content.get('caId');
          let classActivity = classActivities.findBy('id', caId);
          classActivity.set('suggestionCount', content.get('total'));
        });
      });
  },

  fetchSuggestionContent(classActivity) {
    const controller = this;
    const classId = controller.get('classId');
    const userId = controller.get('session.userId');
    const caId = classActivity.get('id');
    const context = {
      scope: PLAYER_EVENT_SOURCE.CLASS_ACTIVITY,
      caIds: [caId],
      detail: true
    };
    if (!classActivity.get('suggestions')) {
      controller
        .get('suggestService')
        .fetchSuggestionsByCAId(userId, classId, context)
        .then(content => {
          let suggestions = content.get('suggestions');
          classActivity.set('suggestions', suggestions);
          classActivity.set('isSuggestionFetched', true);
        });
    }
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
    let endDate = moment(startDate)
      .endOf('month')
      .format('YYYY-MM-DD');
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
    controller
      .get('classActivityService')
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
    const userId = controller.get('session.userId');
    controller
      .get('classActivityService')
      .fetchCompletedOfflineActivities(classId, userId)
      .then(completedOfflineActivities => {
        controller.set(
          'completedOfflineActivities',
          completedOfflineActivities
        );
      });
  },

  loadItemsToGrade() {
    let controller = this;
    const classId = controller.get('classId');
    const userId = controller.get('session.userId');
    Ember.RSVP.hash({
      oaItems: controller
        .get('oaAnaltyicsService')
        .getOAToGrade(classId, userId)
    }).then(function(hash) {
      let gradeItems = hash.oaItems.gradeItems;
      if (gradeItems) {
        let itemsToGrade = Ember.A([]);
        gradeItems.map(function(item) {
          let gradeItem;
          gradeItem = controller.createActivityGradeItemObject(item);
          if (gradeItem) {
            itemsToGrade.push(gradeItem);
          }
        });
        Ember.RSVP.all(itemsToGrade).then(function(gradeItems) {
          controller.set('itemsToGrade', gradeItems);
        });
      }
    });
  },

  /**
   * Creates the grade item information for activity level
   * @param {[]} grade item
   * @param {item} item
   */
  createActivityGradeItemObject: function(item) {
    const controller = this;
    const activityId = item.get('collectionId');
    const contentType = item.get('collectionType');
    const dcaContentId = item.get('dcaContentId');
    const itemObject = Ember.Object.create();
    return new Ember.RSVP.Promise(function(resolve, reject) {
      controller
        .get('offlineActivityService')
        .readActivity(activityId)
        .then(function(content) {
          itemObject.setProperties({
            classId: controller.get('class.id'),
            dcaContentId,
            content,
            contentType
          });
          resolve(itemObject);
        }, reject);
    });
  },

  /**
   * Animate a items to grade section for mobile
   */
  animateItemsToGradeForMobile() {
    let itemToGradeEle = Ember.$(
      '.ca-panel .right-panel .item-to-grade-container'
    );
    let windowHeight = $(window).height();
    if (itemToGradeEle.hasClass('active')) {
      itemToGradeEle.animate(
        {
          top: windowHeight - 100
        },
        400,
        function() {
          itemToGradeEle.removeClass('active');
        }
      );
    } else {
      itemToGradeEle.addClass('active');
      itemToGradeEle.animate(
        {
          top: 100
        },
        400
      );
    }
  },

  /**
   * Animate a items to grade section for desktop
   */
  animateItemsToGradeForDesktop() {
    let offlineActivityContainer = Ember.$(
      '.ca-panel .right-panel .offline-container'
    );
    let itemToGradeContainer = Ember.$(
      '.ca-panel .right-panel .item-to-grade-container'
    );
    if (!itemToGradeContainer.hasClass('active')) {
      let offlineActivityEle = offlineActivityContainer.children(
        '.offline-activity-contents'
      );
      let itemToGradeEle = itemToGradeContainer.children(
        '.ca-grade-content-items'
      );
      offlineActivityContainer.removeClass('active');
      offlineActivityEle.slideUp(400);
      itemToGradeEle.slideDown(400, function() {
        itemToGradeContainer.addClass('active');
      });
    }
  },

  /**
   * Animate a items to grade section for desktop
   */
  animateOfflineActivityForDesktop() {
    let offlineActivityContainer = Ember.$(
      '.ca-panel .right-panel .offline-container'
    );
    let itemToGradeContainer = Ember.$(
      '.ca-panel .right-panel .item-to-grade-container'
    );
    if (!offlineActivityContainer.hasClass('active')) {
      let offlineActivityEle = offlineActivityContainer.children(
        '.offline-activity-contents'
      );
      let itemToGradeEle = itemToGradeContainer.children(
        '.ca-grade-content-items'
      );
      itemToGradeContainer.removeClass('active');
      itemToGradeEle.slideUp(400);
      offlineActivityEle.slideDown(400, function() {
        offlineActivityContainer.addClass('active');
      });
    }
  },

  /**
   * Animate a offline activity for desktop
   */
  animateOfflineActivityForMobile() {
    let offlineActivityEle = Ember.$(
      '.ca-panel .right-panel .offline-container'
    );
    let windowHeight = $(window).height();
    if (offlineActivityEle.hasClass('toggle')) {
      offlineActivityEle.animate(
        {
          top: windowHeight - 50
        },
        400,
        function() {
          offlineActivityEle.removeClass('toggle');
        }
      );
    } else {
      offlineActivityEle.addClass('toggle');
      offlineActivityEle.animate(
        {
          top: 100
        },
        400
      );
    }
  }
});
