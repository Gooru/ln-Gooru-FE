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
      let controller = this;
      controller.set('showDatePicker', false);
    },

    //Action triggered when click preview content
    onPreviewContent(content) {
      const controller = this;
      controller.set(
        'previewContentType',
        content.get('format') || content.get('collectionType')
      );
      controller.set('previewContent', content);
      controller.set('isShowContentPreview', true);
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
      let isOfflineActivity = classActivityData.get('contentType') === PLAYER_EVENT_SOURCE.OFFLINE_CLASS;
      if (isOfflineActivity) {
        let activeOfflineActivities = controller.get('activeOfflineActivities');
        activeOfflineActivities.pushObject(classActivityData);
        let unScheduledClassActivities = controller.get('unScheduledClassActivities');
        unScheduledClassActivities.removeObject(classActivityData);
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
            controller.get('newlyAddedDcaContents').pushObject(addClassActivity);
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
      let classActivityType = classActivity.get('collection.collectionType') || classActivity.get('contentType');
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
      if (forMonth === controller.get('forMonth') && forYear === controller.get('forYear')) {
        controller.loadUnScheduledActivities();
      }
    },

    /**
     * It will schedule Class Activities for specific date.
     * @param  {String} scheduleDate
     * @param  {String} scheduleEndDate
     */
    onScheduleForDate(scheduleDate, scheduleEndDate, isOfflineActivity) {
      let controller = this;
      let classId = controller.get('classId');
      let classActivity = controller.get('selectedClassActivityForSchedule');
      let content = classActivity.get('collection');
      let collectionId = classActivity.get('contentId') || content.get('id');
      controller.send('onCloseDatePicker');
      if (controller.isActivityAlreadyExists(scheduleDate, collectionId)) {
        return;
      }
      if (!classActivity.get('added_date')) {
        classActivity.set('added_date', scheduleDate);
      }
      let contentId = classActivity.get('id');
      let contentType = isOfflineActivity ? PLAYER_EVENT_SOURCE.OFFLINE_CLASS : content.get('format');
      let scheduleMonth = moment(scheduleDate).format('MM');
      let scheduleYear = moment(scheduleDate).format('YYYY');
      let currentScheduleMonth = classActivity.get('forMonth');
      let currentScheduleYear = classActivity.get('forYear');
      let useOldInstance = currentScheduleMonth === parseInt(scheduleMonth) &&
        currentScheduleYear === parseInt(scheduleYear) && controller.get('selectedActivityIsUnScheduled');
      return Ember.RSVP
        .hash({
          scheduleActivity: useOldInstance ? controller
            .get('classActivityService')
            .scheduleClassActivity(classId, contentId, scheduleDate, scheduleEndDate) : controller
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
        }).then(() => {
          if (!controller.isDestroyed) {
            if (isOfflineActivity) {
              let activeOfflineActivities = controller.get('activeOfflineActivities');
              activeOfflineActivities.pushObject(classActivity);
              let unScheduledClassActivities = controller.get('unScheduledClassActivities');
              unScheduledClassActivities.removeObject(classActivity);
              classActivity.set('isNewlyAdded', true);
              Ember.run.later(function() {
                classActivity.set('isNewlyAdded', false);
              }, 2000);
            } else {
              if (scheduleMonth === controller.get('forMonth') && scheduleYear === controller.get('forYear')) {
                if (scheduleDate === controller.get('selectedDate')) {
                  let scheduledClassActivities = controller.get('scheduledClassActivities').objectAt(0);
                  scheduledClassActivities.get('classActivities').pushObject(classActivity);
                  classActivity.set('isNewlyAdded', true);
                  Ember.run.later(function() {
                    classActivity.set('isNewlyAdded', false);
                  }, 2000);
                }
                let unScheduledClassActivities = controller.get('unScheduledClassActivities');
                unScheduledClassActivities.removeObject(classActivity);
                controller.fetchAssessmentsMasteryAccrual();
                controller.loadActivitiesForMonth();
              }
            }
          }
        });
    },

    /**
     * It will takes care of content will schedule for the specific month.
     * @param  {Number} forMonth
     * @param  {Number} forYear
     */
    onScheduleForMonth(forMonth, forYear, isOfflineActivity) {
      let controller = this;
      let classId = controller.get('classId');
      let classActivity = controller.get('selectedClassActivityForSchedule');
      let content = classActivity.get('collection');
      let contentType = isOfflineActivity ? PLAYER_EVENT_SOURCE.OFFLINE_CLASS : content.get('format');
      let contentId = classActivity.get('contentId') || content.get('id');
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
            if (forMonth === controller.get('forMonth') && forYear === controller.get('forYear')) {
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
      controller.set('selectedActivityIsUnScheduled', isUnScheduled);
      controller.set('selectedClassActivityForSchedule', classActivity);
      controller.set('showDatePicker', true);
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
        let top = position.top + 27 - datepickerEle.height();
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
      // if (!selectedContentEle.hasClass('active')) {
      //   selectedContentEle.addClass('active');
      //   datepickerEle.show();
      // } else {
      //   selectedContentEle.removeClass('active');
      //   datepickerEle.hide();
      // }
      // Ember.run.later(function() {
      //   let datepickerEle = Ember.$('.ca-datepicker-schedule-container');
      //   let datepickerCtnEle = Ember.$(
      //     '.ca-datepicker-schedule-container .ca-date-picker-container'
      //   );
      //   datepickerCtnEle.removeClass('ca-datepicker-orientation-top');
      //   datepickerCtnEle.removeClass('ca-datepicker-orientation-bottom');
      //   datepickerCtnEle.removeClass('ca-datepicker-orientation-left');
      //   let selectedContentEle = Ember.$(event.target);
      //   let position = selectedContentEle.position();
      //   let top = position.top - datepickerEle.height();
      //   let left = position.left + 10 - datepickerEle.width();
      //   let controllerHeight = Ember.$(
      //     '.teacher.class.class-activities'
      //   ).height();
      //   let windowHeight = $(window).height();
      //   let allowedTop = windowHeight - controllerHeight + top;
      //   if (left < 0) {
      //     left = position.left;
      //     datepickerCtnEle.addClass('ca-datepicker-orientation-left');
      //   }
      //   if (allowedTop < 0) {
      //     datepickerCtnEle.addClass('ca-datepicker-orientation-bottom');
      //     top = position.top + 25;
      //   } else {
      //     datepickerCtnEle.addClass('ca-datepicker-orientation-top');
      //   }
      //   if (isOfflineActivity) {
      //     datepickerEle.css({
      //       top: top,
      //       right: left,
      //       left: 'inherit'
      //     });
      //   } else {
      //     datepickerEle.css({
      //       top: top,
      //       left: left,
      //       right: 'inherit'
      //     });
      //   }
      //   if (!selectedContentEle.hasClass('active')) {
      //     selectedContentEle.addClass('active');
      //     datepickerEle.show();
      //   } else {
      //     selectedContentEle.removeClass('active');
      //     datepickerEle.hide();
      //   }
      // }, 100);
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
    controller.loadActiveOfflineActivities();
    controller.loadCompletedOfflineActivities();
    controller.getQuestionsToGrade();
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


  showDatePicker: false,

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
   * it maintains whether user clicked on unScheduled element or not
   * @property {Boolean} isToggleUnScheduleItem
   */
  isToggleUnScheduleItem: false,

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
   * It Maintains the label name for unschedule item
   * @property {String}
   */
  unscheduleHeaderTitle: Ember.computed('isMobileView', function() {
    return this.get('i18n').t('common.unscheduled-items').string;
  }),

  /**
   * It Maintains the label name for grade items item
   * @property {String}
   */
  itemsToGradeHeaderTitle: Ember.computed('isMobileView', function() {
    return this.get('i18n').t('class.analytics.performance.grade-items').string;
  }),

  /**
   * It Maintains the label name for offline activity item
   * @property {String}
   */
  offlineActivityHeaderTitle: Ember.computed('isMobileView', function() {
    return this.get('i18n').t('common.offline-activites').string;
  }),

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

  isActivityAlreadyExists(scheduleDate, contentId) {
    let controller = this;
    let activitiesForDate = controller.get('classActivitiesOfMonth').filterBy('added_date', scheduleDate);
    let activities = activitiesForDate.filterBy('contentId', contentId);
    return activities.length;
  },

  /**
   * Removes a class activity from a list of classActivities
   * @param {classActivity} classActivity
   */
  removeClassActivity: function(classActivity) {
    let id = classActivity.get('id');
    if (classActivity.get('contentType') === PLAYER_EVENT_SOURCE.OFFLINE_CLASS) {
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

  loadActiveOfflineActivities() {
    const controller = this;
    const classId = controller.get('classId');
    controller.set('isLoading', true);
    controller
      .get('classActivityService')
      .fetchActiveOfflineActivities(classId)
      .then(activeOfflineActivities => {
        controller.set('activeOfflineActivities', activeOfflineActivities);
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
        controller.set('completedOfflineActivities', completedOfflineActivities);
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
        let completedOfflineActivities = controller.get('completedOfflineActivities');
        activity.set('isCompleted', true);
        activeOfflineActivities.removeObject(activity);
        completedOfflineActivities.pushObject(activity);
      });
  },

  getQuestionsToGrade() {
    let controller = this;
    let classId = controller.get('classId');
    controller.get('rubricService').getQuestionsToGradeForDCA(classId)
      .then(pendingGradingItems => {
        let gradeItems = pendingGradingItems.gradeItems;
        if (gradeItems) {
          let itemsToGrade = Ember.A([]);
          gradeItems.map(function(item) {
            let gradeItem = controller.createGradeItemObject(item);
            if (gradeItem) {
              itemsToGrade.push(gradeItem);
            }
          });
          Ember.RSVP.all(itemsToGrade).then(function(questionItems) {
            controller.set('itemsToGrade', questionItems);
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
    var endDate = moment(startDate).endOf('month').format('YYYY-MM-DD');
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
    controller
      .get('classActivityService')
      .getScheduledClassActivitiesForDate(classId, date)
      .then(classActivities => {
        controller.set('classActivities', Ember.A([]));
        if (classActivities && classActivities.length > 0) {
          controller.parseClassActivityData(classActivities);
        }
        controller.fetchAssessmentsMasteryAccrual();
        controller.set('isLoading', false);
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
    const collectionId = item.get('collectionId');
    const collectionType = item.get('collectionType');
    const isAssessment = !collectionType || collectionType === 'assessment';
    const resourceId = item.get('resourceId');
    const studentCount = item.get('studentCount');
    const activityDate = item.get('activityDate');
    return new Ember.RSVP.Promise(function(resolve, reject) {
      return Ember.RSVP
        .hash({
          collection: collectionId ?
            isAssessment ?
              controller
                .get('assessmentService')
                .readAssessment(collectionId) :
              controller
                .get('collectionService')
                .readCollection(collectionId) : undefined
        })
        .then(function(hash) {
          const collection = hash.collection;
          const question = collection
            .get('children')
            .findBy('id', resourceId);
          itemObject.setProperties({
            classId: controller.get('class.id'),
            collection,
            question,
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
    return Ember.RSVP
      .hash({
        activityPerformance: classActivityService.findClassActivitiesPerformanceSummary(
          classId,
          Ember.A([activity]),
          startDate,
          endDate
        )
      })
      .then(({
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
        classActivityItems.splice(
          selectedActivityIndex,
          1,
          activityPerformance
        );
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

  serializerSearchContent(content, contentId, date, forMonth, forYear) {
    let collection = Ember.Object.create({
      id: content.get('id'),
      title: content.get('title'),
      format: content.get('format'),
      collectionType: content.get('format'),
      resourceCount: content.get('resourceCount'),
      questionCount: content.get('questionCount'),
      oeQuestionCount: content.get('oeQuestionCount')
    });
    return Ember.Object.create({
      id: contentId,
      added_date: date,
      activityDate: date,
      forMonth,
      forYear,
      usersCount: -1,
      collection,
      isActive: false
    });
  },

  fetchActivityUsers(activityId) {
    let controller = this;
    let classId = controller.get('classId');
    return Ember.RSVP
      .hash({
        activityMembers: controller
          .get('classActivityService')
          .fetchUsersForClassActivity(classId, activityId)
      })
      .then(({
        activityMembers
      }) => {
        return activityMembers;
      });
  },

  fetchAssessmentsMasteryAccrual() {
    let controller = this;
    let assessments = Ember.A();
    controller.get('scheduledClassActivities').forEach(classActivity => {
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
    let assessmentIds = assessments.map(assessment => {
      return assessment.get('id');
    });
    if (assessmentIds.length > 0) {
      Ember.RSVP
        .hash({
          assessmentsMasteryAccrual: controller
            .get('assessmentService')
            .assessmentsMasteryAccrual(assessmentIds)
        })
        .then(({
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
