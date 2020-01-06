import Ember from 'ember';
import SessionMixin from 'gooru-web/mixins/session';
import ModalMixin from 'gooru-web/mixins/modal';
import {
  PLAYER_EVENT_SOURCE,
  SCREEN_SIZES
} from 'gooru-web/config/config';
import {
  isCompatibleVW
} from 'gooru-web/utils/utils';

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

    onShowClassActivities() {
      const controller = this;
      controller.set('showItemsToGrade', false);
    },

    onShowItemsToGrade() {
      const controller = this;
      controller.set('showItemsToGrade', true);
    },

    onSelectWeek(startDate, endDate) {
      let controller = this;
      let forMonth = moment(endDate).format('MM');
      let forYear = moment(endDate).format('YYYY');
      controller.set('forMonth', forMonth);
      controller.set('forYear', forYear);
      controller.set('startDate', startDate);
      controller.set('endDate', endDate);
      controller.loadActivities(startDate, endDate);
      controller.send('toggleDatePicker');
    },

    onShowSuggestion(classActivity) {
      const controller = this;
      controller.set('selectedClassActivity', classActivity);
      controller.fetchSuggestionContent(classActivity);
    },

    onOpenReportGrade(itemToGrade) {
      let controller = this;
      controller.set('itemToGradeContextData', itemToGrade);
      controller.set('showOAGrade', true);
    },

    onToggleContent(content) {
      const controller = this;
      content.set('isActive', !content.get('isActive'));
      if (content.get('isActive')) {
        controller.loadActivities(controller.get('startDate'),
          controller.get('endDate'));
      } else {
        controller.filterActivitiesByContent();
      }
    },

    toggleDatePicker() {
      let controller = this;
      controller.toggleProperty('isActive');
      controller.animateDatePicker();
    },

    onSelectRangeType(rangeType) {
      const controller = this;
      let forMonth = moment().format('MM');
      let forYear = moment().format('YYYY');
      controller.set('isDaily', false);
      controller.set('isMonthly', false);
      controller.set('isWeekly', false);
      controller.set('forMonth', forMonth);
      controller.set('forYear', forYear);
      if (rangeType === 'daily') {
        controller.set('isDaily', true);
      } else if (rangeType === 'weekly') {
        controller.set('isWeekly', true);
      } else {
        controller.set('isMonthly', true);
      }
      controller.loadActivitiesForMonth();
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
      classActivity,
      isSuggested
    ) {
      let controller = this;
      let userId = controller.get('session.userId');
      let users = controller.get('class.members').filterBy('id', userId);
      let params = {
        userId: userId,
        classId: controller.get('class.id'),
        collectionId: collection.get('id') || collection.get('suggestedContentId'),
        type: collection.get('format') || collection.get('suggestedContentType'),
        isStudent: true,
        collection,
        activityDate,
        studentPerformance,
        classActivity,
        users
      };
      controller.set('isShowStudentExternalAssessmentReport', false);
      controller.set('showStudentDcaReport', false);
      controller.set('isShowStudentExternalCollectionReport', false);
      controller.set('isShowOfflineActivityReport', false);
      const isCollection = params.type === 'collection';
      if (collection.get('format') === 'assessment-external') {
        controller.set('isShowStudentExternalAssessmentReport', true);
      } else if (collection.get('format') === 'collection-external') {
        controller.set('isShowStudentExternalCollectionReport', true);
      } else if (collection.get('format') === 'offline-activity') {
        controller.set('isShowOfflineActivityReport', true);
      } else {
        controller.set('showStudentDcaReport', true);
      }
      controller.set('isSuggestedCollection', isSuggested && isCollection);
      controller.set('useSession', isSuggested && !isCollection);
      controller.set('studentReportContextData', params);
    },

    onClosePullUp() {
      let controller = this;
      controller.set('isShowStudentExternalCollectionReport', false);
      controller.set('isShowStudentExternalAssessmentReport', false);
      controller.set('studentDcaReport', false);
      controller.set('isShowOfflineActivityReport', false);
    },

    showPreviousMonth(date) {
      let controller = this;
      let forMonth = moment(date).format('MM');
      let forYear = moment(date).format('YYYY');
      controller.set('forMonth', forMonth);
      controller.set('forYear', forYear);
      controller.loadActivitiesForMonth();
    },

    onSelectMonth(date) {
      let controller = this;
      let startDate = `${date}-01`;
      let endDate = moment(startDate)
        .endOf('month')
        .format('YYYY-MM-DD');
      let forMonth = moment(startDate).format('MM');
      let forYear = moment(startDate).format('YYYY');
      controller.set('forMonth', forMonth);
      controller.set('forYear', forYear);
      controller.set('startDate', startDate);
      controller.set('endDate', endDate);
      controller.loadActivities(startDate, endDate);
      controller.send('toggleDatePicker');
    },

    showNextMonth(date) {
      let controller = this;
      let forMonth = moment(date).format('MM');
      let forYear = moment(date).format('YYYY');
      controller.set('forMonth', forMonth);
      controller.set('forYear', forYear);
      controller.loadActivitiesForMonth();
    },

    onSelectDate(date) {
      let controller = this;
      controller.set('startDate', date);
      controller.loadActivities(date);
      controller.send('toggleDatePicker');
    },

    onSelectToday(date) {
      let controller = this;
      controller.send('onSelectDate', date);
    },

    playContent(playerUrl, content) {
      const controller = this;
      controller.set('playerUrl', playerUrl);
      controller.set('isOpenPlayer', true);
      controller.set('playerContent', content);
      controller.set('isSuggestedContentPlay',
        content.get('isSuggestedContentPlay'));
    },

    closePullUp() {
      const controller = this;
      const isSuggestedContentPlay = controller.get('isSuggestedContentPlay');
      if (isSuggestedContentPlay) {
        const classActivity = controller.get('selectedClassActivity');
        classActivity.set('suggestions', false);
        controller.fetchSuggestionContent(classActivity);
      } else {
        const startDate = controller.get('startDate');
        controller.loadActivities(startDate);
      }
      controller.set('isOpenPlayer', false);
      controller.get('classController').send('reloadData');
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Boolean} isMobileView
   * Property to handle is mobile view
   */
  isMobileView: isCompatibleVW(SCREEN_SIZES.MEDIUM),

  /**
   * @property {Boolean} isDaily
   * Property to handle daily view
   */
  isDaily: true,

  /**
   * @property {Boolean} isWeekly
   * Property to handle weekly view
   */
  isWeekly: false,

  /**
   * @property {Boolean} isMonthly
   * Property to handle montly view
   */
  isMonthly: false,

  queryParams: ['tab'],

  /**
   * @property {String} tab
   */
  tab: null,

  resetPerformance: false,

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
  isToday: Ember.computed('startDate', function() {
    return this.get('startDate') === moment().format('YYYY-MM-DD');
  }),

  /**
   * Maintains the value of selected date of the user
   * @type {String}
   */
  startDate: Ember.computed(function() {
    return moment().format('YYYY-MM-DD');
  }),

  /**
   * Maintains the value to show items to grade
   * @type {Boolean}
   */
  showItemsToGrade: false,

  scheduledActivitiesList: Ember.computed(
    'classActivities.[]',
    function() {
      const component = this;
      const scheduledActivitiesList = Ember.A([]);
      const classActivities = component.get('classActivities');
      classActivities.forEach(data => {
        let addedDate = data.get('added_date');
        let classActivity = scheduledActivitiesList.findBy(
          'added_date',
          addedDate
        );
        if (!classActivity) {
          classActivity = Ember.Object.create({
            added_date: addedDate,
            scheduledActivities: Ember.A([])
          });
          scheduledActivitiesList.pushObject(classActivity);
        }
        classActivity.get('scheduledActivities').pushObject(data);
      });
      return scheduledActivitiesList.sortBy('added_date').reverse();
    }
  ),

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

  contentTypes: Ember.A([
    Ember.Object.create({
      type: 'collection',
      isActive: true
    }),
    Ember.Object.create({
      type: 'assessment',
      isActive: true
    }),
    Ember.Object.create({
      type: 'offline-activity',
      isActive: true
    })
  ]),

  // -------------------------------------------------------------------------
  // Methods

  initialize() {
    let controller = this;
    controller._super(...arguments);
    let todayDate = moment().format('YYYY-MM-DD');
    controller.loadItemsToGrade();
    controller.loadActivities(todayDate);
  },

  /**
   * @function animateDatePicker
   * Method to slide up and down date picker
   */
  animateDatePicker() {
    let element = Ember.$('.header-container .date-range-picker-container');
    let dateDisplayEle = Ember.$('.date-range-picker-container .ca-date-picker-container');
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

  filterActivitiesByContent() {
    const controller = this;
    const filteredContentTypes = controller.get('contentTypes')
      .filterBy('isActive', true).map((content) => {
        return content.get('type');
      });
    let classActivities = controller.get('classActivities');
    let filteredActivites = classActivities.filter((classActivity) => {
      let contentType = classActivity.get('contentType');
      contentType = contentType === 'assessment-external' ?
        'assessment' : contentType === 'collection-external' ?
          'collection' : contentType;
      return filteredContentTypes.includes(contentType);
    });
    controller.set('classActivities', filteredActivites);
  },


  loadActivities(startDate, endDate) {
    const controller = this;
    if (!endDate) {
      endDate = startDate;
    }
    controller.set('isLoading', true);
    const userId = controller.get('session.userId');
    const filteredContentTypes =
      controller.get('contentTypes').filterBy('isActive', true);
    const contentPromises = filteredContentTypes.map((content) => {
      const classId = controller.get('classId');
      const requestBody = {
        content_type: content.get('type'),
        start_date: startDate,
        end_date: endDate
      };
      return controller.get('classActivityService')
        .getScheduledActivitiesByDate(classId, requestBody, userId);
    });
    Ember.RSVP.all(contentPromises).then(function(response) {
      const classActivities = [].concat.apply([], response);
      if (classActivities.length) {
        controller.getSuggestionCounts(classActivities);
      }
      controller.set('classActivities', classActivities);
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
      caIds,
      userId
    };
    controller
      .get('suggestService')
      .getSuggestionCountForCA(classId, context)
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
      detail: true,
      userId
    };
    if (!classActivity.get('suggestions')) {
      controller
        .get('suggestService')
        .fetchSuggestionsByCAId(classId, context)
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
      itemToGradeEle.animate({
        top: windowHeight - 100
      },
      400,
      function() {
        itemToGradeEle.removeClass('active');
      }
      );
    } else {
      itemToGradeEle.addClass('active');
      itemToGradeEle.animate({
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
      offlineActivityEle.animate({
        top: windowHeight - 50
      },
      400,
      function() {
        offlineActivityEle.removeClass('toggle');
      }
      );
    } else {
      offlineActivityEle.addClass('toggle');
      offlineActivityEle.animate({
        top: 100
      },
      400
      );
    }
  }
});
