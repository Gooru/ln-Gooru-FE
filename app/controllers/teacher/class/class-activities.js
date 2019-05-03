import Ember from 'ember';
import SessionMixin from 'gooru-web/mixins/session';
import ModalMixin from 'gooru-web/mixins/modal';

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

  // -------------------------------------------------------------------------
  // Attributes

  queryParams: ['tab', 'month', 'year'],

  tab: null,

  isShowOCASummaryReportPullUp: false,

  // -------------------------------------------------------------------------
  // Actions

  actions: {
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
      let addedMonth = forMonth
        ? parseInt(forMonth)
        : parseInt(moment(addedDate).format('MM'));
      let addedYear = forYear
        ? parseInt(forYear)
        : parseInt(moment(addedDate).format('YYYY'));
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
              let id = classActivity.get('id');
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
              let unScheduledClassActivities = classActivities.findBy(
                'added_date',
                null
              );
              if (unScheduledClassActivities) {
                let classActivityToDelete = unScheduledClassActivities
                  .get('classActivities')
                  .findBy('id', id);
                if (classActivityToDelete) {
                  unScheduledClassActivities
                    .get('classActivities')
                    .removeObject(classActivity);
                }
              }
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

    showPreviousMonth() {
      this.loadData();
    },

    showNextMonth() {
      this.loadData();
    },

    showUnScheduledItems() {
      this.set('showUnScheduledItemsPullup', true);
    },

    /**
     * It will takes care of content will schedule for the specific date.
     * @param  {String} scheduleDate
     */
    onScheduleDate(scheduleDate) {
      let controller = this;
      let classId = controller.get('classId');
      let classActivity = controller.get('selectedClassActivityForSchedule');
      let content = classActivity.get('collection');
      let contentType = content.get('format');
      let contentId = content.get('id');
      let datepickerEle = Ember.$('.ca-datepicker-schedule-container');
      datepickerEle.hide();
      let scheduleMonth = parseInt(moment(scheduleDate).format('MM'));
      let scheduleYear = parseInt(moment(scheduleDate).format('YYYY'));
      let forMonth = parseInt(classActivity.get('forMonth'));
      let forYear = parseInt(classActivity.get('forYear'));
      let activationDate = classActivity.get('activation_date');
      if (
        forMonth === scheduleMonth &&
        forYear === scheduleYear &&
        !activationDate
      ) {
        const isToday = moment().format('YYYY-MM-DD') === scheduleDate;
        this.send('changeVisibility', classActivity, scheduleDate, isToday);
      } else {
        controller
          .get('classActivityService')
          .addActivityToClass(classId, contentId, contentType, scheduleDate)
          .then(newContentId => {
            if (!controller.isDestroyed) {
              let data = controller.serializerSearchContent(
                content,
                newContentId,
                scheduleDate
              );
              controller.send('addedContentToDCA', data, scheduleDate);
            }
          });
      }
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
      let datepickerEle = Ember.$('.ca-datepicker-schedule-container');
      datepickerEle.hide();
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
        .then(newContentId => {
          if (!controller.isDestroyed) {
            let data = controller.serializerSearchContent(
              content,
              newContentId,
              null,
              forMonth,
              forYear
            );
            controller.send('addedContentToDCA', data, null, forMonth, forYear);
          }
        });
    },

    /**
     * Action get triggered when schedule content to CA got clicked
     */
    onScheduleContentToDCA(classActivity, event) {
      let datepickerEle = Ember.$('.ca-datepicker-schedule-container');
      let datepickerCtnEle = Ember.$(
        '.ca-datepicker-schedule-container .ca-date-picker-container'
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
      this.set('selectedClassActivityForSchedule', classActivity);
    },

    onSelectDate(date, reload) {
      let controller = this;
      if (reload) {
        let forMonth = moment(date).format('MM');
        let forYear = moment(date).format('YYYY');
        controller.set('forMonth', forMonth);
        controller.set('forYear', forYear);
        controller.loadData();
      } else {
        this.handleScrollToSpecificDate(date);
      }
    },

    onSelectToday() {
      let controller = this;
      controller.incrementProperty('refreshDatePicker');
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

  initialize() {
    let controller = this;
    controller._super(...arguments);
    let tab = controller.get('tab');
    if (tab && tab === 'report') {
      controller.set('isShowOCASummaryReportPullUp', true);
    }
    Ember.run.scheduleOnce('afterRender', controller, function() {
      controller.closeCADatePickerOnClickOutSide();
      let date = moment().format('YYYY-MM-DD');
      controller.handleScrollToSpecificDate(date);
    });
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Boolean} isShowContentPreview
   */
  isShowContentPreview: false,

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
    if (controller.get('isCurrentYearAndMonth')) {
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
    return classActivities.sortBy('added_date').reverse();
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
   * It Maintains the list of unscheduled class activities
   * @type {Array}
   */
  unScheduledClassActivities: Ember.computed('classActivities.[]', function() {
    let controller = this;
    let classActivities = controller
      .get('classActivities')
      .filter(function(classActivity) {
        if (!classActivity.get('added_date')) {
          return classActivity;
        }
      });
    let unScheduledClassActivities = classActivities.objectAt(0);
    return unScheduledClassActivities
      ? unScheduledClassActivities.get('classActivities')
      : [];
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
    'classActivities.[]',
    function() {
      let controller = this;
      let activities = Ember.A();
      controller.get('classActivities').forEach(classActivity => {
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
   * Removes a class activity from a list of classActivities
   * @param {classActivity} classActivity
   */
  removeClassActivity: function(classActivity) {
    let classActivities = this.get('classActivities');
    let addedDate = classActivity.get('added_date');
    let id = classActivity.get('id');
    let dateWiseClassActivities = classActivities.findBy(
      'added_date',
      addedDate
    );
    let classActivityToDelete = dateWiseClassActivities
      .get('classActivities')
      .findBy('id', id);
    dateWiseClassActivities
      .get('classActivities')
      .removeObject(classActivityToDelete);
    if (dateWiseClassActivities.get('classActivities').length === 0) {
      classActivities.removeObject(dateWiseClassActivities);
    }
  },

  loadData() {
    const controller = this;
    const classId = controller.get('classId');
    let forMonth = controller.get('forMonth');
    let forYear = controller.get('forYear');
    controller.set('isLoading', true);
    controller
      .get('classActivityService')
      .findClassActivities(classId, null, forMonth, forYear)
      .then(classActivities => {
        controller.set('classActivities', Ember.A([]));
        if (classActivities && classActivities.length > 0) {
          controller.parseClassActivityData(classActivities);
        }
        controller.fetchAssessmentsMasteryAccrual(classActivities);
        controller.set('isLoading', false);
        Ember.run.later(function() {
          let date = moment().format('YYYY-MM-DD');
          controller.handleScrollToSpecificDate(date, true);
        }, 1000);
      });
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
      .then(({ activityPerformance }) => {
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

  closeCADatePickerOnClickOutSide() {
    let controller = this;
    Ember.$('.teacher_class_class-activities').on('click', function(e) {
      if (
        !Ember.$(e.target).hasClass('ca-datepicker-popover') &&
        Ember.$('.ca-datepicker-popover-container').has(e.target).length === 0
      ) {
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

  handleScrollToSpecificDate(date, isDefaultTop) {
    let dateEle = Ember.$(
      `.teacher_class_class-activities .dca-date-view-container-${date}`
    );
    if (dateEle.length > 0) {
      let scrollToContainer = Ember.$('.dca-list-container');
      let reduceHeight = 100;
      let top =
        dateEle.position().top - reduceHeight + scrollToContainer.scrollTop();
      scrollToContainer.animate(
        {
          scrollTop: top
        },
        1000
      );
    } else if (isDefaultTop) {
      let scrollToContainer = Ember.$('.dca-list-container');
      scrollToContainer.animate(
        {
          scrollTop: 0
        },
        1000
      );
    }
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
      .then(({ activityMembers }) => {
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
        .then(({ assessmentsMasteryAccrual }) => {
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
