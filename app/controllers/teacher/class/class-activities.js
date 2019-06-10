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
    onPreviewContent(content, caContentId) {
      const controller = this;
      controller.set(
        'previewContentType',
        content.get('format') || content.get('collectionType')
      );
      controller.set('previewCaContentId', caContentId);
      controller.set('previewContent', content);
      if (controller.get('previewContentType') === 'offline-activity') {
        controller.set('isShowOfflineActivityPreview', true);
      } else {
        controller.set('isShowContentPreview', true);
      }
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
      let dateWiseClassActivity = controller
        .get('classActivities')
        .findBy('added_date', activityDate);
      let dateWiseClassActivities = dateWiseClassActivity.get(
        'classActivities'
      );
      let collections = dateWiseClassActivities.map(classActivity => {
        return classActivity.get('collection');
      });
      let params = {
        classId: controller.get('classId'),
        collection: collection,
        collections: collections,
        activityDate: activityDate,
        classMembers: controller.get('members')
      };
      controller.set('showDcaCollectionReportPullUp', true);
      controller.set('dcaCollectionReportData', params);
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
        let addedMonth = forMonth ?
          parseInt(forMonth) :
          parseInt(moment(addedDate).format('MM'));
        let addedYear = forYear ?
          parseInt(forYear) :
          parseInt(moment(addedDate).format('YYYY'));
        let forFirstDateOfMonth = controller.get('forFirstDateOfMonth');
        let selectedMonth = parseInt(moment(forFirstDateOfMonth).format('MM'));
        let selectedYear = parseInt(moment(forFirstDateOfMonth).format('YYYY'));
        if (selectedMonth === addedMonth && addedYear === selectedYear) {
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
          controller.fetchAssessmentsMasteryAccrual();
        }
      }
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
      let classActivityType =
        classActivity.get('collection.collectionType') ||
        classActivity.get('contentType');
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

    showPreviousMonth(date) {
      const controller = this;
      controller.set('isToday', false);
      controller.loadActivitiesForMonth();
      controller.loadActivityForDate(date);
      controller.loadUnScheduledActivities();
    },

    showNextMonth(date) {
      const controller = this;
      controller.set('isToday', false);
      controller.loadActivitiesForMonth();
      controller.loadActivityForDate(date);
      controller.loadUnScheduledActivities();
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
        controller.loadUnScheduledActivities();
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
        scheduleActivity: useOldInstance ?
          controller
            .get('classActivityService')
            .scheduleClassActivity(
              classId,
              contentId,
              scheduleDate,
              scheduleEndDate
            ) : controller
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
      }).then((hash) => {
        if (!controller.isDestroyed) {
          let activityId = hash.scheduleActivity ? hash.scheduleActivity : contentId;
          if (!hash.scheduleActivity) {
            controller.get('unScheduledClassActivities').removeObject(classActivity);
          }
          if (isOfflineActivity) {
            controller.addOfflineContent(content, activityId, scheduleDate, scheduleEndDate);
          } else {
            controller.addContent(content, activityId, scheduleDate, scheduleEndDate);
            controller.loadActivitiesForMonth();
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
              controller.loadUnScheduledActivities();
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
      Ember.run.later(function() {
        let datepickerEle = Ember.$('.ca-datepicker-schedule-container');
        let datepickerCtnEle = Ember.$(
          '.ca-datepicker-schedule-container .ca-daterange-picker'
        );
        datepickerCtnEle.removeClass('ca-datepicker-orientation-top');
        datepickerCtnEle.removeClass('ca-datepicker-orientation-bottom');
        datepickerCtnEle.removeClass('ca-datepicker-orientation-left');
        let selectedContentEle = Ember.$(event.target);
        let position = selectedContentEle.position();
        let top = position.top - datepickerEle.height();
        let left = position.left + 10 - datepickerEle.width();
        let controllerHeight = Ember.$(
          '.teacher.class.class-activities'
        ).height();
        let windowHeight = $(window).height();
        let allowedTop = windowHeight - controllerHeight + top;
        if (left < 0) {
          left = position.left;
          datepickerCtnEle.addClass('ca-datepicker-orientation-left');
        }
        if (allowedTop < 0) {
          datepickerCtnEle.addClass('ca-datepicker-orientation-bottom');
          top = position.top + 25;
        } else {
          datepickerCtnEle.addClass('ca-datepicker-orientation-top');
        }
        datepickerEle.css({
          top: top,
          left: left
        });
        if (!selectedContentEle.hasClass('active')) {
          selectedContentEle.addClass('active');
          datepickerEle.show();
        } else {
          selectedContentEle.removeClass('active');
          datepickerEle.hide();
        }
      }, 100);
      controller.set('selectedActivityIsUnScheduled', isUnScheduled);
      controller.set('selectedClassActivityForSchedule', classActivity);
      controller.set('allowTwoDateRangePicker', isOfflineActivity);
    },

    onSelectToday(date) {
      let controller = this;
      controller.send('onSelectDate', date);
      controller.loadActivitiesForMonth();
      controller.loadUnScheduledActivities();
    },

    onSelectDate(date) {
      let controller = this;
      let isToday = date === moment().format('YYYY-MM-DD');
      controller.set('isToday', isToday);
      controller.set('selectedDate', date);
      controller.loadActivityForDate(date);
      controller.send('toggleDatePicker');
    },

    onOpenPerformanceEntry(item, activity, isRepeatEntry) {
      let component = this;
      component.fetchActivityUsers(activity.id).then(function(activityMembers) {
        let classMembers = component.get('members');
        let classActivityStudents = Ember.A([]);
        activityMembers.map(member => {
          let isActivityMember = classMembers.findBy('id', member.id);
          let isActiveMember = member.isActive;
          if (isActivityMember && isActiveMember) {
            classActivityStudents.push(isActivityMember);
          }
        });
        component.set(
          'activityMembers',
          classActivityStudents.sortBy('firstName')
        );
        component.set('isShowAddData', true);
      });
      activity.set('isUpdatePerformance', isRepeatEntry);
      component.set('addDataContentType', item.get('format'));
      component.set('selectedItem', item);
      component.set('selectedActivity', activity);
      component.set('isRepeatEntry', isRepeatEntry);
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
        hasMultipleCompetencies: collection.get('masteryAccrualCompetencies.length') > 1,
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

  initialize() {
    let controller = this;
    controller._super(...arguments);
    let todayDate = controller.get('selectedDate');
    controller.loadActivityForDate(todayDate);
    controller.loadCompletedOfflineActivities();
    controller.loadItemsToGrade();
    let tab = controller.get('tab');
    if (tab && tab === 'report') {
      controller.set('isShowOCASummaryReportPullUp', true);
    }
    Ember.run.scheduleOnce('afterRender', controller, function() {
      controller.closeCADatePickerOnClickOutSide();
    });
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Boolean} isMobileView
   * Property to handle is mobile view
   */
  isMobileView: isCompatibleVW(SCREEN_SIZES.MEDIUM),

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
   * it maintains date which user selected is today or not
   * @property {Boolean} isToday
   */
  isToday: true,
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
    if (controller.get('isToday')) {
      let date = moment().format('YYYY-MM-DD');
      let todayClassActivities = classActivities.findBy('added_date', date);
      if (!todayClassActivities) {
        let classActivity = Ember.Object.create({
          added_date: date,
          classActivities: Ember.A([])
        });
        classActivities.pushObject(classActivity);
      }
    }
    return classActivities;
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
      return totalScheduleditems.length ?
        totalScheduleditems.reduce((total, count) => total + count) :
        0;
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

  /**
   * Animate a schedule section for desktop
   */
  animateUnScheduleForDesktop() {
    let unScheduleEle = Ember.$('.ca-panel .left-panel .unschedule-container');
    let leftPanelEle = Ember.$('.ca-panel .left-panel');
    let scheduleEle = Ember.$(
      '.schedule-container .ca-schedule-section .dca-content-list-container'
    );
    if (unScheduleEle.hasClass('active')) {
      unScheduleEle.removeClass('active');
      Ember.$('.ca-unscheduled-items').slideUp(400, function() {
        let containerheight = leftPanelEle.height() - unScheduleEle.height();
        scheduleEle.css({
          height: containerheight
        });
      });
    } else {
      scheduleEle.animate({
        height: '0'
      },
      function() {
        unScheduleEle.addClass('active');
        Ember.$('.ca-unscheduled-items').slideDown(400);
      }
      );
    }
  },

  /**
   * Animate a schedule section for mobile
   */
  animateUnScheduleForMobile() {
    let unScheduleEle = Ember.$('.ca-panel .left-panel .unschedule-container');
    let windowHeight = $(window).height();
    if (unScheduleEle.hasClass('active')) {
      unScheduleEle.animate({
        top: windowHeight - 50
      },
      400,
      function() {
        unScheduleEle.removeClass('active');
      }
      );
    } else {
      unScheduleEle.addClass('active');
      unScheduleEle.animate({
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
    let offlineActivityEle = Ember.$('.offline-activity-section');
    let itemToGradeEle = Ember.$(
      '.ca-panel .right-panel .item-to-grade-container'
    );
    if (itemToGradeEle.hasClass('active')) {
      itemToGradeEle.removeClass('active');
      offlineActivityEle.slideDown(400);
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
      offlineActivityEle.animate({
        top: windowHeight - 150
      },
      400,
      function() {
        offlineActivityEle.removeClass('active');
      }
      );
    } else {
      offlineActivityEle.addClass('active');
      offlineActivityEle.animate({
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
    let offlineActivityEle = Ember.$('.offline-activity-section');
    let itemToGradeEle = Ember.$(
      '.ca-panel .right-panel .item-to-grade-container'
    );
    if (itemToGradeEle.hasClass('active')) {
      offlineActivityEle.slideDown(400, function() {
        itemToGradeEle.removeClass('active');
      });
    } else {
      offlineActivityEle.slideUp(400, function() {
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
   * Add a class offlne activity from a list of activeOfflineActivities
   * @param {collection} content
   * @param {activityId} activityId
   * @param {startDate} startDate
   * @param {endDate} endDate
   */
  addOfflineContent(content, activityId, startDate, endDate) {
    let controller = this;
    let activeOfflineActivities = controller.get('activeOfflineActivities');
    let newClassActivity = controller
      .serializerOfflineActivityContent(content, activityId, startDate, endDate);
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
    let scheduledClassActivities = controller.get('scheduledClassActivities').objectAt(0);
    let newClassActivity = controller
      .serializerActivityContent(content, activityId, startDate);
    scheduledClassActivities
      .get('classActivities')
      .pushObject(newClassActivity);
    newClassActivity.set('isNewlyAdded', true);
    Ember.run.later(function() {
      newClassActivity.set('isNewlyAdded', false);
    }, 2000);
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
    let completedOfflineActivities = controller.get('completedOfflineActivities');
    let existingCompletedActivities = completedOfflineActivities
      .filterBy('collection.id', contentId)
      .filterBy('added_date', scheduleDate);
    return existingActiveActivities.length || existingCompletedActivities.length;
  },

  /**
   * Removes a class activity from a list of classActivities
   * @param {classActivity} classActivity
   */
  removeClassActivity: function(classActivity) {
    let id = classActivity.get('id');
    if (
      classActivity.get('contentType') === PLAYER_EVENT_SOURCE.OFFLINE_CLASS
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

  loadUnScheduledActivities() {
    const controller = this;
    const classId = controller.get('classId');
    let forMonth = controller.get('forMonth');
    let forYear = controller.get('forYear');
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
          completedOfflineActivities
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

  loadActivitiesForMonth() {
    const controller = this;
    const classId = controller.get('classId');
    let forMonth = controller.get('forMonth');
    let forYear = controller.get('forYear');
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

  loadActivityForDate(date) {
    const controller = this;
    const classId = controller.get('classId');
    controller.set('selectedDate', date);
    controller.set('isLoading', true);
    return Ember.RSVP.hash({
      offlineActivity: controller
        .get('classActivityService')
        .fetchActiveOfflineActivities(classId),
      classActivity: controller
        .get('classActivityService')
        .getScheduledClassActivitiesForDate(classId, date)
    }).then(function(hash) {
      let classActivities = hash.classActivity;
      let offlineActivities = hash.offlineActivity;
      controller.set('classActivities', Ember.A([]));
      if (classActivities && classActivities.length > 0) {
        controller.parseClassActivityData(classActivities);
      }
      controller.set('activeOfflineActivities', offlineActivities);
      controller.fetchAssessmentsMasteryAccrual();
      controller.set('isLoading', false);
    });
  },


  loadActiveOfflineActivity() {
    const controller = this;
    const classId = controller.get('classId');
    controller.set('isLoading', true);
    controller.get('classActivityService')
      .fetchActiveOfflineActivities(classId).then(function(offlineActivities) {
        controller.set('activeOfflineActivities', offlineActivities);
        controller.fetchAssessmentsMasteryAccrual();
        controller.set('isLoading', false);
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
        collection: collectionId ?
          controller.get('assessmentService').readAssessment(collectionId) : undefined
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
    }).then(({
      activityPerformance
    }) => {
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

  closeCADatePickerOnClickOutSide() {
    let controller = this;
    Ember.$('.teacher_class_class-activities').on('click', function(e) {
      if (Ember.$(e.target).hasClass('backdrop')) {
        Ember.$('.ca-datepicker-popover-container').hide();
        Ember.$('.ca-datepicker-popover').removeClass('active');
      }
      if (
        !Ember.$(e.target).hasClass('ca-date-picker-toggle') &&
        Ember.$('.ca-date-picker-container').has(e.target).length === 0
      ) {
        controller.slideUpCAInlineDatePickerOnClickOutSide();
      }
    });

    Ember.$(
      '.teacher_class_class-activities .dca-list-container, .teacher_class_class-activities .ca-unscheduled-content-items'
    ).on('scroll', function() {
      if (Ember.$('.ca-datepicker-popover-container').is(':visible')) {
        Ember.$('.ca-datepicker-popover-container').hide();
        Ember.$('.ca-datepicker-popover').removeClass('active');
      }
    });
  },

  slideUpCAInlineDatePickerOnClickOutSide() {
    let element = Ember.$(
      '.teacher_class_class-activities .ca-date-picker-inline'
    );
    if (element.length > 0 && element.hasClass('active')) {
      let dateDisplayEle = Ember.$(
        '.teacher_class_class-activities .dca-content-container .cal-mm-yyyy'
      );
      element.slideUp(400, function() {
        element.removeClass('active');
        dateDisplayEle.removeClass('active');
      });
    }
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
    }).then(({
      activityMembers
    }) => {
      return activityMembers;
    });
  },

  fetchAssessmentsMasteryAccrual() {
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
          collectionType === 'assessment' &&
          standards &&
          standards.length > 0
        ) {
          assessments.pushObject(collection);
        }
      });
    });
    activeOfflineActivities.map(offlineActivity => {
      let collection = offlineActivity.get('collection');
      let standards = offlineActivity.get('collection.standards');
      if (standards && standards.length > 0) {
        assessments.pushObject(collection);
      }
    });

    let assessmentIds = assessments.map(assessment => {
      return assessment.get('id');
    });

    if (assessmentIds.length > 0) {
      Ember.RSVP.hash({
        assessmentsMasteryAccrual: controller
          .get('assessmentService')
          .assessmentsMasteryAccrual(assessmentIds)
      }).then(({
        assessmentsMasteryAccrual
      }) => {
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
