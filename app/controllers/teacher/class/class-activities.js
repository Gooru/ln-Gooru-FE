import Ember from 'ember';
import SessionMixin from 'gooru-web/mixins/session';
import ModalMixin from 'gooru-web/mixins/modal';
import {
  PLAYER_EVENT_SOURCE,
  SCREEN_SIZES,
  CONTENT_TYPES,
  DCA_CALENDAR_VIEWS
} from 'gooru-web/config/config';
import { isCompatibleVW, getWeekDaysByDate } from 'gooru-web/utils/utils';

/**
 * Class activities controller
 *
 * Controller responsible of the logic for the teacher class activities tab
 */
export default Ember.Controller.extend(SessionMixin, ModalMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * Class controller
   */
  classController: Ember.inject.controller('teacher.class'),

  /**
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service('api-sdk/class-activity'),

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

  /**
   * @requires service:api-sdk/assessment
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  /**
   * @requires RubricService
   */
  rubricService: Ember.inject.service('api-sdk/rubric'),

  // -------------------------------------------------------------------------
  // Attributes

  queryParams: ['tab', 'month', 'year'],

  tab: null,

  isShowOCASummaryReportPullUp: false,

  isActive: false,

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered when teacher switched the calendar tab.
     */
    selectCalendarView(type) {
      const controller = this;
      controller.onSetDataForCalendarView(type);
    },
    /**
     * Action triggered when teacher graded for student.
     */
    onRefreshItem() {
      let controller = this;
      controller.loadCompletedOfflineActivities();
    },
    /**
     * Action triggered when unschedule item got clicked.
     */
    toggleUnSchedule() {
      let controller = this;
      controller.set('selectedPanel', 'unschedule-activity');
      let isMobileView = controller.get('isMobileView');
      if (isMobileView) {
        controller.animateUnScheduleForMobile();
      } else {
        controller.animateUnScheduleForDesktop();
      }
    },

    /**
     * Action triggered when items to grade section item got clicked.
     */
    toggleOffineActivity() {
      let controller = this;
      controller.set('selectedPanel', 'OA');
      let isMobileView = controller.get('isMobileView');
      if (isMobileView) {
        controller.animateOfflineActivityForMobile();
      } else {
        controller.animateOfflineActivityForDesktop();
      }
    },

    /**
     * Action triggered when items to grade section item got clicked.
     */
    toggleItemsToGrade() {
      let controller = this;
      controller.set('selectedPanel', 'items-to-grade');
      let isMobileView = controller.get('isMobileView');
      if (isMobileView) {
        controller.animateItemsToGradeForMobile();
      } else {
        controller.animateItemsToGradeForDesktop();
      }
    },

    onOpenReportGrade(itemToGrade) {
      let controller = this;
      controller.set('itemToGradeContextData', itemToGrade);
      if (
        itemToGrade.get('contentType') === PLAYER_EVENT_SOURCE.OFFLINE_CLASS
      ) {
        controller.set('showFRQuestionGrade', false);
        controller.set('showOAGrade', true);
      } else {
        controller.set('showOAGrade', false);
        controller.set('showFRQuestionGrade', true);
      }
    },

    onCompleteActivity(activity) {
      let controller = this;
      controller.markActivityAsComplete(activity);
    },

    toggleDatePicker() {
      let controller = this;
      controller.toggleProperty('isActive');
      controller.animateDatePicker();
    },

    onCloseDatePicker() {
      let datepickerEle = Ember.$('.ca-datepicker-schedule-container');
      datepickerEle.hide();
    },

    //Action triggered when click preview content
    onPreviewContent(content, classActivity, isReportView) {
      const controller = this;
      controller.set(
        'previewContentType',
        content.get('format') || content.get('collectionType')
      );
      if (classActivity) {
        const assessmentCode = `${controller.get(
          'class.code'
        )}${classActivity.get('id')}`;
        controller.set('assessmentCode', assessmentCode);
      }
      controller.set('previewCa', classActivity);
      controller.set('previewContent', content);
      if (controller.get('previewContentType') === 'offline-activity') {
        controller.set('isShowOfflineActivityPreview', true);
      } else {
        controller.set('isShowContentPreview', true);
      }
      controller.set('isReportView', isReportView);
    },

    /**
     * Action triggered when add dca button got clicked.
     * @param  {String} selectedSearchContentType
     */
    onAddDca(selectedSearchContentType) {
      let controller = this;
      let contextParams = {
        classId: controller.get('classId'),
        class: controller.get('class'),
        course: controller.get('course'),
        courseId: controller.get('courseId')
      };
      controller.set('contextParams', contextParams);
      controller.set('selectedSearchContentType', selectedSearchContentType);
      controller.set('showSearchContentPullup', true);
    },

    /**
     * Action will trigger to open teacher dca content report.
     * @param  {Object} collection
     */
    openDcaContentReport(selectedClassActivity) {
      let controller = this;
      let collection = selectedClassActivity.get('collection');
      let activityDate = selectedClassActivity.get('added_date');
      let params = {
        classId: controller.get('classId'),
        collection: collection,
        activityDate: activityDate,
        classMembers: controller.get('members')
      };
      let format =
        selectedClassActivity.get('collection.format') ||
        selectedClassActivity.get('collection.collectionType');
      if (format === CONTENT_TYPES.OFFLINE_ACTIVITY) {
        controller.send(
          'onPreviewContent',
          collection,
          selectedClassActivity,
          true
        );
      } else {
        controller.set('showDcaCollectionReportPullUp', true);
        controller.set('dcaCollectionReportData', params);
      }
    },

    /**
     * Update the  content data to  class activities
     * @param  {Object} classActivity
     * @param  {Date} addedDate
     */
    addedContentToDCA(classActivityData, addedDate, forMonth, forYear) {
      let controller = this;
      let isOfflineActivity =
        classActivityData.get('collection.format') ===
        PLAYER_EVENT_SOURCE.OFFLINE_CLASS;
      if (isOfflineActivity) {
        let activeOfflineActivities = controller.get('activeOfflineActivities');
        let existingActivities = activeOfflineActivities
          .filterBy('collection.id', classActivityData.get('collection.id'))
          .filterBy('added_date', addedDate);
        if (!existingActivities.length) {
          activeOfflineActivities.pushObject(classActivityData);
        }
        classActivityData.set('isNewlyAdded', true);
        Ember.run.later(function() {
          classActivityData.set('isNewlyAdded', false);
        }, 2000);
      } else {
        let addedMonth = forMonth
          ? parseInt(forMonth)
          : parseInt(moment(addedDate).format('MM'));
        let addedYear = forYear
          ? parseInt(forYear)
          : parseInt(moment(addedDate).format('YYYY'));
        let forFirstDateOfMonth = controller.get('forFirstDateOfMonth');
        let selectedMonth = parseInt(moment(forFirstDateOfMonth).format('MM'));
        let selectedYear = parseInt(moment(forFirstDateOfMonth).format('YYYY'));
        const isMonthly = controller.get('isMonthly');
        const isDaily = controller.get('isDaily');
        const isWeekly = controller.get('isWeekly');
        if (
          (isMonthly &&
            (selectedMonth === addedMonth && addedYear === selectedYear)) ||
          (isDaily && addedDate === controller.get('selectedDate')) ||
          (isWeekly &&
            moment(addedDate).isBetween(
              controller.get('startDateOfWeek'),
              controller.get('endDateOfWeek')
            ))
        ) {
          let classActivities = controller.get('classActivities');
          let dateWiseClassActivities = classActivities.findBy(
            'added_date',
            addedDate
          );
          if (!dateWiseClassActivities) {
            classActivities.pushObject(
              Ember.Object.create({
                added_date: addedDate,
                classActivities: Ember.A([])
              })
            );
            dateWiseClassActivities = classActivities.findBy(
              'added_date',
              addedDate
            );
          }
          let id = classActivityData.get('collection.id');
          let addClassActivity = dateWiseClassActivities
            .get('classActivities')
            .findBy('collection.id', id);
          if (!addClassActivity) {
            addClassActivity = classActivityData;
            dateWiseClassActivities
              .get('classActivities')
              .pushObject(classActivityData);
            let sortedDateWiseClassActivities = dateWiseClassActivities
              .get('classActivities')
              .sortBy('id')
              .reverse();
            dateWiseClassActivities.set(
              'classActivities',
              sortedDateWiseClassActivities
            );
          }
          if (!classActivityData.get('isAddedFromPanel')) {
            controller
              .get('newlyAddedDcaContents')
              .pushObject(addClassActivity);
          } else {
            addClassActivity.set('isNewlyAdded', true);
            Ember.run.later(function() {
              addClassActivity.set('isNewlyAdded', false);
            }, 2000);
          }
          this.set(
            'classActivities',
            classActivities.sortBy('added_date').reverse()
          );
        }
      }
      controller.fetchAssessmentsMasteryAccrual(true);
    },

    /**
     *
     * @function actions:changeVisibility
     */
    changeVisibility: function(classActivity, scheduleDate, enable = true) {
      const controller = this;
      const currentClass = controller.get('classController.class');
      const classId = currentClass.get('id');
      const classActivityId = classActivity.get('id');
      const addedDate = classActivity.get('added_date');
      const date = addedDate ? addedDate : scheduleDate;
      const contentId = classActivity.get('collection.id');
      const classActivities = controller.get('classActivities');
      let dateWiseClassActivities = classActivities.findBy(
        'added_date',
        scheduleDate
      );
      if (dateWiseClassActivities) {
        let classActivitiesDateWise = dateWiseClassActivities.get(
          'classActivities'
        );
        let classActivityDateWise = classActivitiesDateWise.findBy(
          'collection.id',
          contentId
        );
        if (classActivityDateWise) {
          return this;
        }
      }
      controller
        .get('classActivityService')
        .enableClassActivity(classId, classActivityId, date, enable)
        .then(function() {
          if (!controller.isDestroyed) {
            classActivity.set('date', date);
            classActivity.set('added_date', date);
            if (enable) {
              classActivity.set('activation_date', date);
              classActivity.set('isActive', true);
            } else {
              classActivity.set('activation_date', null);
              classActivity.set('isActive', false);
            }
            if (scheduleDate) {
              if (!dateWiseClassActivities) {
                dateWiseClassActivities = Ember.Object.create({
                  added_date: scheduleDate,
                  classActivities: Ember.A([])
                });
                classActivities.pushObject(dateWiseClassActivities);
                controller.set(
                  'classActivities',
                  classActivities.sortBy('added_date').reverse()
                );
              }
              dateWiseClassActivities
                .get('classActivities')
                .pushObject(classActivity);
            }
          }
        });
    },

    /**
     *
     * @function actions:removeClassActivity
     */
    removeClassActivity: function(classActivity) {
      let controller = this;
      let currentClassId = controller.get('classController.class.id');
      let classActivityId = classActivity.get('id');
      let classActivityType = classActivity.get('collection.collectionType');
      var model = {
        type: classActivityType,
        deleteMethod: function() {
          return controller
            .get('classActivityService')
            .removeClassActivity(currentClassId, classActivityId);
        },
        callback: {
          success: function() {
            controller.removeClassActivity(classActivity);
          }
        }
      };
      this.actions.showModal.call(
        this,
        'content.modals.gru-remove-class-activity',
        model
      );
    },

    /**
     * Load the data for month user selected
     * @param  {Date} date
     */
    showPreviousMonth(date) {
      const controller = this;
      let forMonth = moment(date).format('MM');
      let forYear = moment(date).format('YYYY');
      controller.loadActivitiesForMonth(forMonth, forYear);
    },

    /**
     * Load the data for month user selected
     * @param  {Date} date
     */
    showNextMonth(date) {
      const controller = this;
      let forMonth = moment(date).format('MM');
      let forYear = moment(date).format('YYYY');
      controller.loadActivitiesForMonth(forMonth, forYear);
    },

    showUnScheduledItems() {
      this.set('showUnScheduledItemsPullup', true);
    },

    onRefreshUnScheduleItem(forMonth, forYear) {
      const controller = this;
      if (
        forMonth === controller.get('forMonth') &&
        forYear === controller.get('forYear')
      ) {
        controller.loadUnScheduledActivities(forMonth, forYear);
      }
    },

    /**
     * It will schedule Class Activities for specific date.
     * @param  {String} scheduleDate
     * @param  {String} scheduleEndDate
     */
    onScheduleForDate(scheduleDate, scheduleEndDate) {
      let controller = this;
      let classId = controller.get('classId');
      let classActivity = controller.get('selectedClassActivityForSchedule');
      let content = classActivity.get('collection');
      let isOfflineActivity =
        content.get('format') === PLAYER_EVENT_SOURCE.OFFLINE_CLASS;
      let collectionId = content.get('id');
      controller.send('onCloseDatePicker');
      if (
        !isOfflineActivity &&
        controller.isActivityAlreadyExists(scheduleDate, collectionId)
      ) {
        return;
      }

      if (
        isOfflineActivity &&
        controller.isOfflineActivityAlreadyExists(scheduleDate, collectionId)
      ) {
        return;
      }
      let contentId = classActivity.get('id');
      let contentType = content.get('format');
      let scheduleMonth = moment(scheduleDate).format('MM');
      let scheduleYear = moment(scheduleDate).format('YYYY');
      let currentScheduleMonth = classActivity.get('forMonth');
      let currentScheduleYear = classActivity.get('forYear');
      let useOldInstance =
        currentScheduleMonth === parseInt(scheduleMonth) &&
        currentScheduleYear === parseInt(scheduleYear) &&
        controller.get('selectedActivityIsUnScheduled');
      return Ember.RSVP.hash({
        scheduleActivity: useOldInstance
          ? controller
            .get('classActivityService')
            .scheduleClassActivity(
              classId,
              contentId,
              scheduleDate,
              scheduleEndDate
            )
          : controller
            .get('classActivityService')
            .addActivityToClass(
              classId,
              collectionId,
              contentType,
              scheduleDate,
              scheduleMonth,
              scheduleYear,
              scheduleEndDate
            )
      }).then(hash => {
        if (!controller.isDestroyed) {
          let activityId = hash.scheduleActivity
            ? hash.scheduleActivity
            : contentId;
          if (!hash.scheduleActivity) {
            controller
              .get('unScheduledClassActivities')
              .removeObject(classActivity);
          }
          if (isOfflineActivity) {
            controller.addOfflineContent(
              content,
              activityId,
              scheduleDate,
              scheduleEndDate
            );
          } else {
            controller.addContent(
              content,
              activityId,
              scheduleDate,
              scheduleEndDate
            );
            controller.loadActivitiesForMonth(scheduleMonth, scheduleYear);
          }
          controller.fetchAssessmentsMasteryAccrual();
        }
      });
    },

    /**
     * It will takes care of content will schedule for the specific month.
     * @param  {Number} forMonth
     * @param  {Number} forYear
     */
    onScheduleForMonth(forMonth, forYear) {
      let controller = this;
      let classId = controller.get('classId');
      let classActivity = controller.get('selectedClassActivityForSchedule');
      let content = classActivity.get('collection');
      let contentType = content.get('format');
      let contentId = content.get('id');
      controller.send('onCloseDatePicker');
      controller
        .get('classActivityService')
        .addActivityToClass(
          classId,
          contentId,
          contentType,
          null,
          forMonth,
          forYear
        )
        .then(() => {
          if (!controller.isDestroyed) {
            if (
              forMonth === controller.get('forMonth') &&
              forYear === controller.get('forYear')
            ) {
              controller.loadUnScheduledActivities(forMonth, forYear);
            }
          }
        });
    },

    /**
     * Action get triggered when schedule content to CA got clicked
     */
    onScheduleContentToDCA(classActivity, event, isUnScheduled) {
      let controller = this;
      let isOfflineActivity =
        classActivity.get('collection.format') ===
        PLAYER_EVENT_SOURCE.OFFLINE_CLASS;
      let datepickerEle = Ember.$('.ca-datepicker-schedule-container');
      let selectedContentEle = Ember.$(event.target);
      if (!selectedContentEle.hasClass('active')) {
        selectedContentEle.addClass('active');
        datepickerEle.show();
      } else {
        selectedContentEle.removeClass('active');
        datepickerEle.hide();
      }
      controller.set('selectedActivityIsUnScheduled', isUnScheduled);
      controller.set('selectedClassActivityForSchedule', classActivity);
      controller.set('allowTwoDateRangePicker', isOfflineActivity);
      controller.set('endDate', null);
    },

    onSelectToday(date) {
      let controller = this;
      controller.send('onSelectDate', date);
      controller.send('toggleDatePicker');
    },

    onSelectDate(date, isToggle) {
      let controller = this;
      controller.set('selectedDate', date);
      let forMonth = moment(date).format('MM');
      let forYear = moment(date).format('YYYY');
      controller.set('forMonth', forMonth);
      controller.set('forYear', forYear);
      controller.loadScheduledClassActivities(date, date);
      if (isToggle) {
        controller.send('toggleDatePicker');
      }
    },

    onSelectWeek(startDate, endDate, isToggle) {
      let controller = this;
      let forMonth = moment(endDate).format('MM');
      let forYear = moment(endDate).format('YYYY');
      controller.set('forMonth', forMonth);
      controller.set('forYear', forYear);
      controller.set('selectedWeekDate', startDate);
      controller.set('startDateOfWeek', startDate);
      controller.set('endDateOfWeek', endDate);
      controller.loadScheduledClassActivities(startDate, endDate);
      if (isToggle) {
        controller.send('toggleDatePicker');
      }
    },

    onSelectMonth(date, isToggle) {
      let controller = this;
      let startDate = `${date}-01`;
      let endDate = moment(startDate)
        .endOf('month')
        .format('YYYY-MM-DD');
      let forMonth = moment(startDate).format('MM');
      let forYear = moment(startDate).format('YYYY');
      controller.set('forMonth', forMonth);
      controller.set('forYear', forYear);
      controller.set('selectedMonth', date);
      controller.loadScheduledClassActivities(startDate, endDate);
      if (isToggle) {
        controller.send('toggleDatePicker');
      }
    },

    onOpenPerformanceEntry(item, activity, isRepeatEntry) {
      let controller = this;
      controller
        .fetchActivityUsers(activity.id)
        .then(function(activityMembers) {
          let classMembers = controller.get('members');
          let classActivityStudents = Ember.A([]);
          activityMembers.map(member => {
            let isActivityMember = classMembers.findBy('id', member.id);
            let isActiveMember = member.isActive;
            if (isActivityMember && isActiveMember) {
              classActivityStudents.push(isActivityMember);
            }
          });
          controller.set(
            'activityMembers',
            classActivityStudents.sortBy('firstName')
          );
          controller.set('isShowAddData', true);
        });
      activity.set('isUpdatePerformance', isRepeatEntry);
      controller.set('addDataContentType', item.get('format'));
      controller.set('selectedItem', item);
      controller.set('selectedActivity', activity);
      controller.set('isRepeatEntry', isRepeatEntry);
    },

    onClosePerformanceEntry() {
      let controller = this;
      controller.set('isShowAddData', false);
      controller.fetchActivityPerformanceSummary(
        controller.get('selectedActivity')
      );
      controller.get('classController').fetchDcaSummaryPerformance();
    },

    onClosePullUp() {
      this.set('isShowOCASummaryReportPullUp', false);
      this.set('tab', null);
    },

    onUpdateMasteryAccrual(classActivity) {
      let controller = this;
      let collection = classActivity.get('collection');
      let contentId = classActivity.get('id');
      let classId = controller.get('classId');
      let allowMasteryAccrual = !classActivity.get('allowMasteryAccrual');
      let model = {
        hasMultipleCompetencies:
          collection.get('masteryAccrualCompetencies.length') > 1,
        allowMasteryAccrual: classActivity.get('allowMasteryAccrual'),
        onConfirm: function() {
          return controller
            .get('classActivityService')
            .updateMasteryAccrualClassActivity(
              classId,
              contentId,
              allowMasteryAccrual
            );
        },
        callback: {
          success: function() {
            classActivity.set(
              'allowMasteryAccrual',
              !classActivity.get('allowMasteryAccrual')
            );
          }
        }
      };
      this.actions.showModal.call(
        this,
        'content.modals.ca-mastery-accrual-confirmation',
        model
      );
    }
  },

  // -------------------------------------------------------------------------
  // Events

  monthAndYearObserve: function() {
    Ember.run.once(this, 'onChangeOfMonthAndYear');
  }.observes('forYear', 'forMonth'),

  onChangeOfMonthAndYear: function() {
    let controller = this;
    const forYear = controller.get('forYear');
    const forMonth = controller.get('forMonth');
    controller.loadActivitiesForMonth(forMonth, forYear);
    controller.loadUnScheduledActivities(forMonth, forYear);
  },

  initialize() {
    let controller = this;
    controller._super(...arguments);
    controller.loadActiveOfflineActivities();
    controller.loadCompletedOfflineActivities();
    controller.loadItemsToGrade();
    let tab = controller.get('tab');
    if (tab && tab === 'report') {
      controller.set('isShowOCASummaryReportPullUp', true);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {String} selectedActivityView
   * Property to handle is state of selected view for activity
   */
  selectedCalendarView: DCA_CALENDAR_VIEWS.DAILY,

  /**
   * It maintains the state of calendar view for weekly.
   * @type {Boolean}
   */
  isWeekly: Ember.computed.equal(
    'selectedCalendarView',
    DCA_CALENDAR_VIEWS.WEEKLY
  ),

  /**
   * It maintains the state of calendar view for monthly.
   * @type {Boolean}
   */
  isMonthly: Ember.computed.equal(
    'selectedCalendarView',
    DCA_CALENDAR_VIEWS.MONTHLY
  ),

  /**
   * It maintains the state of calendar view for daily.
   * @type {Boolean}
   */
  isDaily: Ember.computed.equal(
    'selectedCalendarView',
    DCA_CALENDAR_VIEWS.DAILY
  ),

  /**
   * It maintains the state of selected panel of user.
   * @type {Boolean}
   */
  selectedPanel: 'OA',

  /**
   * @property {Boolean} isMobileView
   * Property to handle is mobile view
   */
  isMobileView: isCompatibleVW(SCREEN_SIZES.MEDIUM),

  /**
   * @property {String} startDateOfWeek
   * Property to maintains the start date of week
   */
  startDateOfWeek: null,

  /**
   * @property {String} endDateOfWeek
   * Property to maintains the end date of week
   */
  endDateOfWeek: null,

  /**
   * It maintains whether selected activity is schedule or not
   * @property {Boolean} selectedActivityIsUnScheduled
   */
  selectedActivityIsUnScheduled: false,

  /**
   * @property {String} contextSource
   */
  contextSource: PLAYER_EVENT_SOURCE.DAILY_CLASS,

  /**
   * @property {Boolean} isShowContentPreview
   */
  isShowContentPreview: false,

  /**
   * it maintains date which user is selected
   * @property {String}
   */
  selectedDate: null,

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
   * it maintains date which user selected is today or not
   * @property {Boolean} isToday
   */
  isToday: Ember.computed('selectedDate', function() {
    return this.get('selectedDate') === moment().format('YYYY-MM-DD');
  }),
  /**
   * @property {Object}
   */
  previewContent: null,

  /**
   * @property {Boolean} isShowCreateOfflineActivity
   */
  isShowCreateOfflineActivity: false,

  /**
   * @property {Boolean} isRepeatEntry
   */
  isRepeatEntry: false,

  /**
   * @property {Object} selectedActivity
   */
  selectedActivity: null,

  /**
   * @property {String} selectedItem
   */
  selectedItem: null,

  /**
   * @property {Boolean} isShowPerformanceEntryPullUp
   */
  isShowPerformanceEntryPullUp: false,

  /**
   * It Maintains the list of class activities for a month
   * @property {Array}
   */
  classActivitiesOfMonth: Ember.A([]),

  /**
   * @property {boolean} Indicates if there are class activities
   */
  showClassActivities: Ember.computed.gt('scheduledClassActivities.length', 0),

  /**
   * It Maintains the list of  scheduled class activities
   * @type {Array}
   */
  scheduledClassActivities: Ember.computed('classActivities.[]', function() {
    let controller = this;
    let classActivities = controller
      .get('classActivities')
      .filter(function(classActivity) {
        if (classActivity.get('added_date')) {
          return classActivity;
        }
      });
    return classActivities ? classActivities : [];
  }),

  totalScheduleditems: Ember.computed(
    'scheduledClassActivities.[]',
    function() {
      let controller = this;
      let scheduledClassActivities = controller.get('scheduledClassActivities');
      let totalScheduleditems = scheduledClassActivities.map(function(
        classActivity
      ) {
        return classActivity.get('classActivities').length;
      });
      return totalScheduleditems.length
        ? totalScheduleditems.reduce((total, count) => total + count)
        : 0;
    }
  ),

  /**
   * It maintains the today's class activities data.
   */
  todaysClassActivities: Ember.computed('classActivities.[]', function() {
    let controller = this;
    let todaysDate = moment().format('YYYY-MM-DD');
    let classActivities = controller.get('classActivities');
    let todaysClassActivities = classActivities.findBy(
      'added_date',
      todaysDate
    );
    return todaysClassActivities;
  }),

  /**
   * Maintains the selected search content type.
   * @type {String}
   */
  selectedSearchContentType: 'collection',

  /**
   * Maintains the state of show search content pull up
   * @type {Boolean}
   */
  showSearchContentPullup: false,

  /**
   * Maintains the state of show dca collection report pull up
   * @type {Boolean}
   */
  showDcaCollectionReportPullUp: false,

  /**
   * Contains classActivity objects
   * @property {classActivity[]} classActivities
   */
  classActivities: Ember.A([]),

  /**
   * Contains itemsToGrade objects
   * @property {Array[]} itemsToGrade
   */
  itemsToGrade: Ember.A([]),

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
   * Course Id which is associated with this class
   * @property {String}
   */
  courseId: Ember.computed.alias('classController.class.courseId'),

  /**
   * Course Object
   * @property {Object}
   */
  course: Ember.computed.alias('classController.course'),

  /**
   * Class id
   * @property {String}
   */
  members: Ember.computed('classController.class.members', function() {
    const controller = this;
    let classMembers = controller.get('classController.class.members');
    return classMembers.sortBy('firstName');
  }),
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
   * Maintains the list of newly added DCA content
   * @type {Array}
   */
  newlyAddedDcaContents: Ember.A([]),

  /**
   * Maintains the value which of month activities displaying
   * @type {Integer}
   */
  forMonth: Ember.computed(function() {
    return moment().format('MM');
  }),

  /**
   * Maintains the value which of month activities displaying for a week
   * @type {Integer}
   */
  forWeekMonth: Ember.computed(function() {
    return moment().format('MM');
  }),

  /**
   * Maintains the value which of year activities displaying for a week
   * @type {Integer}
   */
  forWeekYear: Ember.computed(function() {
    return moment().format('YYYY');
  }),

  /**
   * Maintains the value which of year activities displaying
   * @type {Integer}
   */
  forYear: Ember.computed(function() {
    return moment().format('YYYY');
  }),

  /**
   * Maintains the value  of today date
   * @type {String}
   */
  today: Ember.computed(function() {
    return moment().format('YYYY-MM-DD');
  }),

  /**
   * Maintains  the value of first date of month
   * @return {String}
   */
  forFirstDateOfMonth: Ember.computed('forMonth', 'forYear', function() {
    let forMonth = this.get('forMonth');
    let forYear = this.get('forYear');
    let date = `${forYear}-${forMonth}-01`;
    return moment(date).format('YYYY-MM-DD');
  }),

  /**
   * It maintains the  state of unscheduled classActivities pull up
   * @type {Boolean}
   */
  showUnScheduledItemsPullup: false,

  performanceSummaryForDCA: Ember.computed.alias(
    'classController.performanceSummaryForDCA'
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

  /**
   * @property {Number} month
   */
  month: null,

  /**
   * @property {Number} year
   */
  year: null,

  /*
   * @property {Json} classPreference
   */
  classPreference: Ember.computed.alias('class.preference'),

  /**
   * Property used to identity activities list is for current month and year
   * @type {Boolean}
   */
  isCurrentYearAndMonth: Ember.computed('forYear', 'forMonth', function() {
    let year = this.get('forYear');
    let month = this.get('forMonth');
    let selectedYearAndMonth = `${year}-${month}`;
    return moment().format('YYYY-MM') === selectedYearAndMonth;
  }),

  /**
   * This property decide to show the mastery accrual toggle button or not
   * @return {Boolean}
   */
  showMasteryAccrual: Ember.computed('class.preference', function() {
    let controller = this;
    let preference = controller.get('class.preference');
    let framework = preference ? preference.get('framework') : null;
    let subject = preference ? preference.get('subject') : null;
    return framework && subject;
  }),

  // -------------------------------------------------------------------------
  // Observers

  /**
   * Update the newly added flag for added dca content.
   */
  updateNewlyAddedFlag: Ember.observer(
    'showSearchContentPullup',
    'showDcaCourseMapPullup',
    function() {
      let controller = this;
      let showSearchContentPullup = controller.get('showSearchContentPullup');
      let showDcaCourseMapPullup = controller.get('showDcaCourseMapPullup');
      let newlyAddedDcaContents = controller.get('newlyAddedDcaContents');
      if (
        !showDcaCourseMapPullup &&
        !showSearchContentPullup &&
        newlyAddedDcaContents.length > 0
      ) {
        newlyAddedDcaContents.forEach(content => {
          content.set('isNewlyAdded', true);
        });
        Ember.run.later(function() {
          newlyAddedDcaContents.forEach(content => {
            content.set('isNewlyAdded', false);
          });
          controller.set('newlyAddedDcaContents', Ember.A());
        }, 5000);
      }
    }
  ),

  /**
   * @property {Boolean} isShowAddData
   */
  isShowAddData: false,

  /**
   * @property {String} addDataContentType
   */
  addDataContentType: '',

  // -------------------------------------------------------------------------
  // Methods

  onSetDataForCalendarView(type) {
    const controller = this;
    let forMonth = controller.get('forMonth');
    let forYear = controller.get('forYear');
    let scheduledClassActivities = controller
      .get('scheduledClassActivitiesDatewise')
      .sortBy('day');
    if (type === DCA_CALENDAR_VIEWS.DAILY) {
      let selectedDate;
      if (
        controller.get('selectedCalendarView') === DCA_CALENDAR_VIEWS.WEEKLY
      ) {
        let startDate = controller.get('startDateOfWeek');
        let weekDays = getWeekDaysByDate(startDate, 'DD');
        let activity;
        weekDays.map(weekDay => {
          activity = scheduledClassActivities.findBy('day', weekDay);
          if (activity && !selectedDate) {
            selectedDate = `${forYear}-${forMonth}-${activity.get('day')}`;
          }
        });
        if (!selectedDate) {
          selectedDate = `${forYear}-${forMonth}-01`;
        }
      } else {
        let activityDay = scheduledClassActivities.objectAt(0);
        let day = activityDay ? activityDay.get('day') : '01';
        selectedDate = `${forYear}-${forMonth}-${day}`;
      }
      controller.set('selectedDate', selectedDate);
    } else if (type === DCA_CALENDAR_VIEWS.WEEKLY) {
      let selectedDate;
      if (controller.get('selectedCalendarView') === DCA_CALENDAR_VIEWS.DAILY) {
        selectedDate = controller.get('selectedDate');
      } else {
        let activityDay = scheduledClassActivities.objectAt(0);
        let day = activityDay ? activityDay.get('day') : '01';
        selectedDate = `${forYear}-${forMonth}-${day}`;
      }
      controller.set('selectedWeekDate', selectedDate);
    } else {
      let parsedMonth = `${forYear}-${forMonth}`;
      controller.set('selectedDate', null);
      controller.set('selectedMonth', parsedMonth);
    }
    controller.set('selectedCalendarView', type);
  },

  /**
   * Animate a schedule section for desktop
   */
  animateUnScheduleForDesktop() {
    let offlineActivityEle = Ember.$(
      '.ca-panel .right-panel .offline-activity-container .offline-activity-section'
    );
    let unScheduleEle = Ember.$(
      '.ca-panel .right-panel .unschedule-container .ca-unscheduled-items'
    );
    let itemToGradeEle = Ember.$(
      '.ca-panel .right-panel .item-to-grade-container .ca-grade-content-items'
    );
    if (!unScheduleEle.hasClass('active')) {
      offlineActivityEle.removeClass('active');
      itemToGradeEle.removeClass('active');
      offlineActivityEle.slideUp(400);
      itemToGradeEle.slideUp(400);
      unScheduleEle.slideDown(400, function() {
        unScheduleEle.addClass('active');
      });
    }
  },

  /**
   * Animate a schedule section for mobile
   */
  animateUnScheduleForMobile() {
    let unScheduleEle = Ember.$('.ca-panel .right-panel .unschedule-container');
    let windowHeight = $(window).height();
    if (unScheduleEle.hasClass('active')) {
      unScheduleEle.animate(
        {
          top: windowHeight - 50
        },
        400,
        function() {
          unScheduleEle.removeClass('active');
        }
      );
    } else {
      unScheduleEle.addClass('active');
      unScheduleEle.animate(
        {
          top: 100
        },
        400
      );
    }
  },

  /**
   * Animate a offline activity for desktop
   */
  animateOfflineActivityForDesktop() {
    let offlineActivityEle = Ember.$(
      '.ca-panel .right-panel .offline-activity-container .offline-activity-section'
    );
    let unScheduleEle = Ember.$(
      '.ca-panel .right-panel .unschedule-container .ca-unscheduled-items'
    );
    let itemToGradeEle = Ember.$(
      '.ca-panel .right-panel .item-to-grade-container .ca-grade-content-items'
    );
    if (!offlineActivityEle.hasClass('active')) {
      itemToGradeEle.removeClass('active');
      unScheduleEle.removeClass('active');
      itemToGradeEle.slideUp(400);
      unScheduleEle.slideUp(400);
      offlineActivityEle.slideDown(400, function() {
        offlineActivityEle.addClass('active');
      });
    }
  },

  /**
   * Animate a offline activity for desktop
   */
  animateOfflineActivityForMobile() {
    let offlineActivityEle = Ember.$(
      '.ca-panel .right-panel .offline-activity-container'
    );
    let windowHeight = $(window).height();
    if (offlineActivityEle.hasClass('active')) {
      offlineActivityEle.animate(
        {
          top: windowHeight - 150
        },
        400,
        function() {
          offlineActivityEle.removeClass('active');
        }
      );
    } else {
      offlineActivityEle.addClass('active');
      offlineActivityEle.animate(
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
    let offlineActivityEle = Ember.$(
      '.ca-panel .right-panel .offline-activity-container .offline-activity-section'
    );
    let unScheduleEle = Ember.$(
      '.ca-panel .right-panel .unschedule-container .ca-unscheduled-items'
    );
    let itemToGradeEle = Ember.$(
      '.ca-panel .right-panel .item-to-grade-container .ca-grade-content-items'
    );
    if (!itemToGradeEle.hasClass('active')) {
      offlineActivityEle.removeClass('active');
      unScheduleEle.removeClass('active');
      offlineActivityEle.slideUp(400);
      unScheduleEle.slideUp(400);
      itemToGradeEle.slideDown(400, function() {
        itemToGradeEle.addClass('active');
      });
    }
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
   * Add a class offlne activity from a list of activeOfflineActivities
   * @param {collection} content
   * @param {activityId} activityId
   * @param {startDate} startDate
   * @param {endDate} endDate
   */
  addOfflineContent(content, activityId, startDate, endDate) {
    let controller = this;
    let activeOfflineActivities = controller.get('activeOfflineActivities');
    let newClassActivity = controller.serializerOfflineActivityContent(
      content,
      activityId,
      startDate,
      endDate
    );
    activeOfflineActivities.pushObject(newClassActivity);
    newClassActivity.set('isNewlyAdded', true);
    Ember.run.later(function() {
      newClassActivity.set('isNewlyAdded', false);
    }, 2000);
  },

  /**
   * Add a class activity from a list of scheduledClassActivities
   * @param {collection} content
   * @param {activityId} activityId
   * @param {startDate} startDate
   * @param {endDate} endDate
   */
  addContent(content, activityId, startDate) {
    let controller = this;
    let newClassActivity = controller.serializerActivityContent(
      content,
      activityId,
      startDate
    );
    if (controller.get('selectedDate') === startDate) {
      if (controller.get('scheduledClassActivities.length')) {
        let scheduledClassActivities = controller
          .get('scheduledClassActivities')
          .objectAt(0);
        scheduledClassActivities
          .get('classActivities')
          .pushObject(newClassActivity);
      } else {
        controller.get('classActivities').pushObject(
          Ember.Object.create({
            added_date: startDate,
            classActivities: Ember.A([newClassActivity])
          })
        );
      }
      newClassActivity.set('isNewlyAdded', true);
      Ember.run.later(function() {
        newClassActivity.set('isNewlyAdded', false);
      }, 2000);
    }
  },

  isActivityAlreadyExists(scheduleDate, contentId) {
    let controller = this;
    let activitiesForDate = controller
      .get('classActivitiesOfMonth')
      .filterBy('added_date', scheduleDate);
    let activities = activitiesForDate.filterBy('contentId', contentId);
    return activities.length;
  },

  isOfflineActivityAlreadyExists(scheduleDate, contentId) {
    let controller = this;
    let activeOfflineActivities = controller.get('activeOfflineActivities');
    let existingActiveActivities = activeOfflineActivities
      .filterBy('collection.id', contentId)
      .filterBy('added_date', scheduleDate);
    let completedOfflineActivities = controller.get(
      'completedOfflineActivities'
    );
    let existingCompletedActivities = completedOfflineActivities
      .filterBy('collection.id', contentId)
      .filterBy('added_date', scheduleDate);
    return (
      existingActiveActivities.length || existingCompletedActivities.length
    );
  },

  /**
   * Removes a class activity from a list of classActivities
   * @param {classActivity} classActivity
   */
  removeClassActivity: function(classActivity) {
    let id = classActivity.get('id');
    if (
      classActivity.get('collection.collectionType') ===
      PLAYER_EVENT_SOURCE.OFFLINE_CLASS
    ) {
      let offlineActivities;
      if (classActivity.get('isCompleted')) {
        offlineActivities = this.get('completedOfflineActivities');
      } else {
        offlineActivities = this.get('activeOfflineActivities');
      }
      offlineActivities.removeObject(classActivity);
    } else {
      let classActivities = this.get('scheduledClassActivities');
      let classActivitiesOfMonth = this.get('classActivitiesOfMonth');
      let addedDate = classActivity.get('added_date');
      let dateWiseClassActivities = classActivities.findBy(
        'added_date',
        addedDate
      );
      let monthWiseClassActivity = classActivitiesOfMonth.findBy(
        'added_date',
        addedDate
      );
      classActivitiesOfMonth.removeObject(monthWiseClassActivity);
      let classActivityToDelete = dateWiseClassActivities
        .get('classActivities')
        .findBy('id', id);
      dateWiseClassActivities
        .get('classActivities')
        .removeObject(classActivityToDelete);
      if (dateWiseClassActivities.get('classActivities').length === 0) {
        classActivities.removeObject(dateWiseClassActivities);
      }
    }
  },

  loadUnScheduledActivities(forMonth, forYear) {
    const controller = this;
    const classId = controller.get('classId');
    controller.set('isLoading', true);
    controller
      .get('classActivityService')
      .getUnScheduledActivities(classId, forMonth, forYear)
      .then(unScheduledActivities => {
        controller.set('unScheduledClassActivities', unScheduledActivities);
        controller.set('isLoading', false);
      });
  },

  loadCompletedOfflineActivities() {
    const controller = this;
    const classId = controller.get('classId');
    controller
      .get('classActivityService')
      .fetchCompletedOfflineActivities(classId)
      .then(completedOfflineActivities => {
        controller.set(
          'completedOfflineActivities',
          completedOfflineActivities.sortBy('end_date')
        );
      });
  },

  markActivityAsComplete(activity) {
    let controller = this;
    let classId = controller.get('classId');
    let contentId = activity.get('id');
    controller
      .get('classActivityService')
      .completeOfflineActivity(classId, contentId)
      .then(() => {
        let activeOfflineActivities = controller.get('activeOfflineActivities');
        let completedOfflineActivities = controller.get(
          'completedOfflineActivities'
        );
        activity.set('isCompleted', true);
        activeOfflineActivities.removeObject(activity);
        completedOfflineActivities.pushObject(activity);
        controller.loadItemsToGrade();
      });
  },

  loadItemsToGrade() {
    let controller = this;
    let classId = controller.get('classId');
    Ember.RSVP.hash({
      oaItems: controller.get('oaAnaltyicsService').getOAToGrade(classId),
      questionItems: controller
        .get('rubricService')
        .getQuestionsToGradeForDCA(classId)
    }).then(function(hash) {
      //FE support only assessment to be graded
      let questionItems = hash.questionItems.gradeItems.filterBy(
        'collectionType',
        'assessment'
      );
      let oaItems = hash.oaItems.gradeItems;
      let gradeItems = questionItems.concat(oaItems);
      if (gradeItems) {
        let itemsToGrade = Ember.A([]);
        gradeItems.map(function(item) {
          let gradeItem;
          if (item.get('collectionType') === 'offline-activity') {
            gradeItem = controller.createActivityGradeItemObject(item);
          } else {
            gradeItem = controller.createQuestionGradeItemObject(item);
          }
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

  loadActivitiesForMonth(forMonth, forYear) {
    const controller = this;
    const classId = controller.get('classId');
    let startDate = `${forYear}-${forMonth}-01`;
    var endDate = moment(startDate)
      .endOf('month')
      .format('YYYY-MM-DD');
    controller.set('isLoading', true);
    controller
      .get('classActivityService')
      .getScheduledClassActivitiesForMonth(classId, startDate, endDate)
      .then(classActivities => {
        controller.set('classActivitiesOfMonth', classActivities);
        controller.set('isLoading', false);
      });
  },

  loadActiveOfflineActivities() {
    const controller = this;
    const classId = controller.get('classId');
    controller.set('isLoading', true);
    controller
      .get('classActivityService')
      .fetchActiveOfflineActivities(classId)
      .then(function(offlineActivities) {
        controller.set(
          'activeOfflineActivities',
          offlineActivities.sortBy('end_date')
        );
        controller.fetchAssessmentsMasteryAccrual();
        controller.set('isLoading', false);
      });
  },

  loadScheduledClassActivities(startDate, endDate) {
    const controller = this;
    const classId = controller.get('classId');
    controller.set('isDataLoading', true);
    controller.set('classActivities', Ember.A([]));
    controller
      .get('classActivityService')
      .getScheduledClassActivitiesForDate(classId, startDate, endDate)
      .then(function(classActivities) {
        controller.set('classActivities', Ember.A([]));
        if (classActivities && classActivities.length > 0) {
          controller.parseClassActivityData(classActivities);
        }
        controller.fetchAssessmentsMasteryAccrual();
      });
    controller.set('isDataLoading', false);
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

  /**
   * Creates the grade item information for question level
   * @param {[]} grade item
   * @param {item} item
   */
  createQuestionGradeItemObject: function(item) {
    const controller = this;
    const itemObject = Ember.Object.create();
    const collectionId = item.get('collectionId');
    const collectionType = item.get('collectionType');
    const resourceId = item.get('resourceId');
    const studentCount = item.get('studentCount');
    const activityDate = item.get('activityDate');
    return new Ember.RSVP.Promise(function(resolve, reject) {
      return Ember.RSVP.hash({
        collection: collectionId
          ? controller.get('assessmentService').readAssessment(collectionId)
          : undefined
      }).then(function(hash) {
        const collection = hash.collection;
        const content = collection.get('children').findBy('id', resourceId);
        itemObject.setProperties({
          classId: controller.get('class.id'),
          collection,
          content,
          contentType: collectionType,
          studentCount,
          activityDate
        });
        resolve(itemObject);
      }, reject);
    });
  },

  /**
   * @function animateDatePicker
   * Method to animate date picker
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
   * @function fetchActivityPerformanceSummary
   * Method to fetch given activity performance summary
   */
  fetchActivityPerformanceSummary(activity) {
    const controller = this;
    const classActivityService = controller.get('classActivityService');
    const classId = controller.get('classId');
    const forYear = controller.get('forYear');
    const forMonth = controller.get('forMonth');
    const startDate = moment(`${forYear}-${forMonth}-01`).format('YYYY-MM-DD');
    const endDate = moment(startDate)
      .endOf('month')
      .format('YYYY-MM-DD');
    let classActivities = controller.get('classActivities');
    return Ember.RSVP.hash({
      activityPerformance: classActivityService.findClassActivitiesPerformanceSummary(
        classId,
        Ember.A([activity]),
        startDate,
        endDate
      )
    }).then(({ activityPerformance }) => {
      activityPerformance = activityPerformance.objectAt(0);
      let dateWiseClassActivities = classActivities.findBy(
        'added_date',
        activityPerformance.get('added_date')
      );
      let classActivityItems = dateWiseClassActivities.get('classActivities');
      let selectedActivityIndex = classActivityItems.indexOf(
        activityPerformance
      );
      classActivityItems.splice(selectedActivityIndex, 1, activityPerformance);
    });
  },

  parseClassActivityData(classActivitiesData) {
    let controller = this;
    let classActivities = controller.get('classActivities');
    classActivitiesData.forEach(data => {
      let addedDate = data.get('added_date');
      let classActivity = classActivities.findBy('added_date', addedDate);
      if (!classActivity) {
        classActivity = Ember.Object.create({
          added_date: addedDate,
          classActivities: Ember.A([])
        });
        classActivities.pushObject(classActivity);
      }
      classActivity.get('classActivities').pushObject(data);
    });
  },

  serializerActivityContent(content, contentId, startDate) {
    let forMonth = moment(startDate).format('MM');
    let forYear = moment(startDate).format('YYYY');
    let collection = Ember.Object.create({
      id: content.get('id'),
      title: content.get('title'),
      format: content.get('format'),
      collectionType: content.get('format'),
      resourceCount: content.get('resourceCount'),
      questionCount: content.get('questionCount'),
      oeQuestionCount: content.get('oeQuestionCount'),
      standards: content.get('standards'),
      thumbnailUrl: content.get('thumbnailUrl')
    });
    return Ember.Object.create({
      id: contentId,
      added_date: startDate,
      activityDate: startDate,
      allowMasteryAccrual: false,
      forMonth,
      forYear,
      usersCount: -1,
      collection,
      isActive: false
    });
  },

  serializerOfflineActivityContent(content, contentId, startDate, endDate) {
    let forMonth = moment(startDate).format('MM');
    let forYear = moment(startDate).format('YYYY');
    let collection = Ember.Object.create({
      id: content.get('id'),
      title: content.get('title'),
      collectionType: content.get('collectionType'),
      format: content.get('format'),
      taskCount: content.get('taskCount'),
      standards: content.get('standards'),
      thumbnailUrl: content.get('thumbnailUrl')
    });
    return Ember.Object.create({
      id: contentId,
      added_date: startDate,
      end_date: endDate,
      activityDate: startDate,
      allowMasteryAccrual: false,
      forMonth,
      forYear,
      collection,
      usersCount: -1,
      isActive: false,
      isCompleted: false
    });
  },

  fetchActivityUsers(activityId) {
    let controller = this;
    let classId = controller.get('classId');
    return Ember.RSVP.hash({
      activityMembers: controller
        .get('classActivityService')
        .fetchUsersForClassActivity(classId, activityId)
    }).then(({ activityMembers }) => {
      return activityMembers;
    });
  },

  fetchAssessmentsMasteryAccrual(addToActivity = false) {
    let controller = this;
    let activeOfflineActivities = controller.get('activeOfflineActivities');
    let scheduledClassActivities = controller.get('scheduledClassActivities');
    let assessments = Ember.A();
    scheduledClassActivities.forEach(classActivity => {
      let activities = classActivity.get('classActivities');
      activities.forEach(activity => {
        let collectionType =
          activity.get('collection.format') ||
          activity.get('collection.collectionType');
        let collection = activity.get('collection');
        let standards = activity.get('collection.standards');
        if (
          (collectionType === 'assessment' &&
            standards &&
            standards.length > 0) ||
          (collectionType === 'assessment' && addToActivity)
        ) {
          assessments.pushObject(collection);
        }
      });
    });
    activeOfflineActivities.map(offlineActivity => {
      let collection = offlineActivity.get('collection');
      assessments.pushObject(collection);
    });

    let assessmentIds = assessments.map(assessment => {
      return assessment.get('id');
    });

    if (assessmentIds.length > 0) {
      Ember.RSVP.hash({
        assessmentsMasteryAccrual: controller
          .get('assessmentService')
          .assessmentsMasteryAccrual(assessmentIds)
      }).then(({ assessmentsMasteryAccrual }) => {
        if (!controller.get('isDestroyed')) {
          assessments.forEach(assessment => {
            let assessmentId = assessment.get('id');
            let assessmentMasteryAccrual = assessmentsMasteryAccrual.findBy(
              assessmentId
            );
            if (assessmentMasteryAccrual) {
              let masteryAccrualCompetencies = assessmentMasteryAccrual.get(
                assessmentId
              );
              if (masteryAccrualCompetencies) {
                assessment.set(
                  'masteryAccrualCompetencies',
                  masteryAccrualCompetencies
                );
              }
            }
          });
        }
      });
    }
  }
});
