import Ember from 'ember';
import { CONTENT_TYPES } from 'gooru-web/config/config';

export default Ember.Component.extend({
  classNames: ['class-activities', 'gru-class-activities-listing'],

  /**
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service('api-sdk/class-activity'),

  performanceService: Ember.inject.service('api-sdk/performance'),

  analyticsService: Ember.inject.service('api-sdk/analytics'),

  /**
   * @requires service:api-sdk/offline-activity-analytics
   */
  oaAnaltyicsService: Ember.inject.service(
    'api-sdk/offline-activity/oa-analytics'
  ),

  /**
   * @requires RubricService
   */
  rubricService: Ember.inject.service('api-sdk/rubric'),

  assessmentService: Ember.inject.service('api-sdk/assessment'),

  didInsertElement() {
    const component = this;
    component.loadActivitiesByActiveContentType();
    component.loadItemsToGrade();
  },

  actions: {
    onShowStudentsList(activityClass) {
      const component = this;
      component.set('selectedActivityClass', activityClass);
      component.set('isShowStudentsList', true);
    },

    onOpenPerformanceEntry(activityClass) {
      const component = this;
      const activityContent = activityClass.get('content');
      const classId = activityClass.get('id');
      const activityId = activityClass.get('activity.id');
      component
        .fetchActivityUsers(classId, activityId)
        .then(function(activityMembers) {
          let classMembers = activityClass.get('members');
          let classActivityStudents = Ember.A([]);
          activityMembers.map(member => {
            let isActivityMember = classMembers.findBy('id', member.id);
            let isActiveMember = member.isActive;
            if (isActivityMember && isActiveMember) {
              classActivityStudents.push(isActivityMember);
            }
          });
          component.set(
            'selectedClassActivityMembers',
            classActivityStudents.sortBy('firstName')
          );
          let selectedClassActivity = activityClass.get('activity');
          // NOTE collection object required at Add Data flow
          selectedClassActivity.collection = activityContent;
          selectedClassActivity.isUpdatePerformance = !!activityContent.get(
            'performance'
          );
          component.set('selectedClassActivity', selectedClassActivity);
          component.set('selectedClassData', activityClass);
          component.set('selectedActivityContent', activityContent);
          component.set('isShowAddData', true);
        });
    },

    onClosePerformanceEntry() {
      const component = this;
      const activityClass = component.get('selectedClassData');
      component.fetchActivityPerformanceSummary(activityClass);
      component.set('isShowAddData', false);
    },

    onToggleDatePicker(component = this) {
      component
        .$('.header-container .date-range-picker-container')
        .slideToggle();
    },

    showPreviousMonth(date) {
      const component = this;
      let forMonth = moment(date).format('MM');
      let forYear = moment(date).format('YYYY');
      component.set('forMonth', forMonth);
      component.set('forYear', forYear);
    },

    showNextMonth(date) {
      const component = this;
      let forMonth = moment(date).format('MM');
      let forYear = moment(date).format('YYYY');
      component.set('forMonth', forMonth);
      component.set('forYear', forYear);
    },

    onSelectRangeType(rangeType) {
      const component = this;
      component.set('isDaily', false);
      component.set('isMonthly', false);
      component.set('isWeekly', false);
      if (rangeType === 'daily') {
        component.set('isDaily', true);
      } else if (rangeType === 'weekly') {
        component.set('isWeekly', true);
      } else {
        component.set('isMonthly', true);
      }
    },

    //Datepicker selection of a date
    onSelectDate(date) {
      let component = this;
      component.set('startDate', date);
      component.set('endDate', date);
      let forMonth = moment(date).format('MM');
      let forYear = moment(date).format('YYYY');
      component.set('forMonth', forMonth);
      component.set('forYear', forYear);
      component.loadActivitiesByActiveContentType();
      component.set('selectedDate', date);
      component.actions.onToggleDatePicker(component);
    },

    onSelectWeek(startDate, endDate) {
      let component = this;
      let forMonth = moment(endDate).format('MM');
      let forYear = moment(endDate).format('YYYY');
      component.set('forMonth', forMonth);
      component.set('forYear', forYear);
      component.set('selectedWeekDate', startDate);
      component.set('startDateOfWeek', startDate);
      component.set('endDateOfWeek', endDate);
      component.set('startDate', startDate);
      component.set('endDate', endDate);
      component.loadActivitiesByActiveContentType();
      component.actions.onToggleDatePicker(component);
    },

    onSelectMonth(date) {
      let component = this;
      let startDate = `${date}-01`;
      let endDate = moment(startDate)
        .endOf('month')
        .format('YYYY-MM-DD');
      let forMonth = moment(startDate).format('MM');
      let forYear = moment(startDate).format('YYYY');
      component.set('forMonth', forMonth);
      component.set('forYear', forYear);
      component.set('selectedMonth', date);
      component.set('startDate', startDate);
      component.set('endDate', endDate);
      component.loadActivitiesByActiveContentType();
      component.actions.onToggleDatePicker(component);
    },

    onSelectToday(date) {
      let component = this;
      component.send('onSelectDate', date);
      component.set('startDate', date);
      component.set('endDate', date);
      let forMonth = moment(date).format('MM');
      let forYear = moment(date).format('YYYY');
      component.set('forMonth', forMonth);
      component.set('forYear', forYear);
      component.loadActivitiesByActiveContentType();
      component.actions.onToggleDatePicker(component);
    },

    onRescheduleActivity(classActivity) {
      const component = this;
      component.set('selectedClassActivity', classActivity);
      component.set('isShowDaterangePicker', true);
    },

    onScheduleByDate(startDate, endDate) {
      const component = this;
      const classActivity = component.get('selectedClassActivity');
      if (classActivity.get('added_date')) {
        component.addActivityToClass(classActivity, startDate, endDate);
      } else {
        component.scheduleActivityToClass(classActivity, startDate, endDate);
      }
      component.actions.onCloseDaterangePicker();
    },

    onScheduleByMonth(month, year) {
      const component = this;
      const classActivity = component.get('selectedClassActivity');
      component.addActivityToClass(classActivity, null, null, month, year);
      component.actions.onCloseDaterangePicker();
    },

    onCloseDaterangePicker() {
      this.set('isShowDaterangePicker', false);
    },

    onEnableMastery(classActivity) {
      const component = this;
      component.enableMasteryAccrual(classActivity);
    },

    onToggleContent(content) {
      const component = this;
      if (content.get('isActive')) {
        const contentType =
          content.get('type') === 'offline-activity'
            ? 'offline'
            : content.get('type');
        component.set(`${contentType}Activities`, Ember.A([]));
      } else {
        component.loadScheduledClassActivities(content.get('type'));
      }
      content.set('isActive', !content.get('isActive'));
      component.set('isShowScheduledActivities', true);
      component.set('isShowItemsToGrade', false);
      component.set('isShowUnscheduledActivities', false);
    },

    onLoadUnscheduledActivities() {
      const component = this;
      component.set('isShowScheduledActivities', false);
      component.set('isShowItemsToGrade', false);
      component.set('isShowUnscheduledActivities', true);
      component.get('contentTypes').map(content => {
        content.set('isActive', false);
      });
      component.loadUnScheduledActivities();
    },

    onShowItemsToGrade() {
      const component = this;
      component.groupGradingItems();
      component.set('isShowScheduledActivities', false);
      component.set('isShowItemsToGrade', true);
      component.set('isShowUnscheduledActivities', false);
      component.get('contentTypes').map(content => {
        content.set('isActive', false);
      });
    },

    onGradeItem(gradingObject) {
      const component = this;
      component.set('gradingObject', gradingObject);
      component.set('isShowGrading', true);
      if (gradingObject.get('contentType') === 'assessment') {
        component.set('isShowQuestionGrading', true);
      } else {
        component.set('isShowOaGrading', true);
      }
    },

    onShowContentPreview(previewContent) {
      const component = this;
      component.set('previewContent', previewContent);
      if (previewContent.get('contentType') === 'offline-activity') {
        component.set('isShowOfflineActivityPreview', true);
      } else {
        component.set('isShowContentPreview', true);
      }
    }
  },

  isDaily: true,

  isShowItemsToGrade: false,

  isShowUnscheduledActivities: false,

  isShowScheduledActivities: true,

  classId: Ember.computed.alias('primaryClass.id'),

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

  forMonth: Ember.computed(function() {
    return moment().format('MM');
  }),

  forYear: Ember.computed(function() {
    return moment().format('YYYY');
  }),

  startDate: Ember.computed(function() {
    return moment().format('YYYY-MM-DD');
  }),

  endDate: Ember.computed(function() {
    return moment().format('YYYY-MM-DD');
  }),

  /**
   * it maintains date which user is selected
   * @property {String}
   */
  selectedDate: null,

  scheduledActivitiesList: Ember.computed(
    'assessmentActivities.@each',
    'collectionActivities.@each',
    'offlineActivities.@each',
    function() {
      const component = this;
      const scheduledActivitiesList = Ember.A([]);
      const assessmentActivities = component.get('assessmentActivities');
      const collectionActivities = component.get('collectionActivities');
      const offlineActivities = component.get('offlineActivities');
      return scheduledActivitiesList.concat(
        assessmentActivities,
        collectionActivities,
        offlineActivities
      );
    }
  ),

  assessmentActivities: Ember.A([]),

  collectionActivities: Ember.A([]),

  offlineActivities: Ember.A([]),

  datewiseActivities: Ember.A([]),

  observeNewlyAddedActivity: Ember.observer('newlyAddedActivity', function() {
    const component = this;
    const activity = component.get('newlyAddedActivity');
    if (activity.get('isScheduledActivity')) {
      component.loadActivitiesByActiveContentType(activity.get('format'));
    } else {
      component.loadUnScheduledActivities();
    }
  }),

  loadActivitiesByActiveContentType() {
    const component = this;
    const activeContentTypes = component
      .get('contentTypes')
      .filterBy('isActive', true);
    activeContentTypes.map(content => {
      component.loadScheduledClassActivities(content.get('type'));
    });
  },

  loadScheduledClassActivities(contentType) {
    const component = this;
    const classId = component.get('classId');
    const secondaryClasses = component.get('secondaryClasses');
    const secondaryClassIds = secondaryClasses.mapBy('id');
    const startDate = component.get('startDate');
    const endDate = component.get('endDate');
    const requestBody = {
      content_type: contentType,
      secondaryclasses: secondaryClassIds.join(','),
      start_date: startDate,
      end_date: endDate
    };
    return Ember.RSVP.hash({
      scheduledActivities: component
        .get('classActivityService')
        .getScheduledActivitiesByDate(classId, requestBody)
    }).then(({ scheduledActivities }) => {
      contentType =
        contentType === 'offline-activity' ? 'offline' : contentType;
      const groupedClassActivities = component.groupActivitiesByClass(
        scheduledActivities
      );
      component.set(`${contentType}Activities`, groupedClassActivities);
      if (contentType !== 'collection') {
        component.fetchMasteryAccrualContents(groupedClassActivities);
      }
      return groupedClassActivities;
    });
  },

  loadUnScheduledActivities() {
    const component = this;
    const classId = component.get('classId');
    const secondaryClasses = component.get('secondaryClasses');
    const secondaryClassIds = secondaryClasses.map(secondaryClass => {
      return secondaryClass.get('id');
    });
    const forMonth = component.get('forMonth');
    const forYear = component.get('forYear');
    const requestBody = {
      content_type: 'offline-activity,assessment,collection',
      secondaryclasses: secondaryClassIds.join(','),
      for_month: forMonth,
      for_year: forYear
    };
    return Ember.RSVP.hash({
      unScheduledActivities: component
        .get('classActivityService')
        .getUnScheduledActivitiesByMonthYear(classId, requestBody)
    }).then(({ unScheduledActivities }) => {
      component.set(
        'unScheduledActivities',
        component.groupActivitiesByClass(unScheduledActivities)
      );
    });
  },

  loadItemsToGrade() {
    let component = this;
    const secondaryClasses = component.get('secondaryClasses');
    const classesToBeGraded = Ember.A([
      component.get('primaryClass.id')
    ]).concat(secondaryClasses.mapBy('id'));
    let gradingItemsList = Ember.A([]);
    classesToBeGraded.map(classId => {
      Ember.RSVP.hash({
        oaItems: component.get('oaAnaltyicsService').getOAToGrade(classId),
        questionItems: component
          .get('rubricService')
          .getQuestionsToGradeForDCA(classId)
      }).then(function(hash) {
        let questionItems = hash.questionItems.gradeItems.filterBy(
          'collectionType',
          CONTENT_TYPES.ASSESSMENT
        );
        let oaItems = hash.oaItems.gradeItems;
        let gradableItems = questionItems.concat(oaItems);
        if (gradableItems && gradableItems.length) {
          gradableItems.map(gradableItem => {
            gradableItem.set('classId', classId);
            gradingItemsList.pushObject(gradableItem);
          });
        }
      });
    });
    component.set('gradingItemsList', gradingItemsList);
  },

  groupActivitiesByClass(classActivities) {
    const component = this;
    const groupedActivities = Ember.A([]);
    const primaryClass = component.get('primaryClass');
    const secondaryClasses = component.get('secondaryClasses');
    classActivities.map(classActivity => {
      let activityClassData =
        secondaryClasses.findBy('id', classActivity.get('classId')) ||
        primaryClass;
      let existingActivity = groupedActivities.find(groupedActivity => {
        return (
          groupedActivity.get('contentId') === classActivity.get('contentId') &&
          groupedActivity.get('added_date') === classActivity.get('added_date')
        );
      });

      let activityClass = component.getStructuredClassActivityObject(
        classActivity,
        activityClassData
      );

      if (existingActivity) {
        let activityClasses = existingActivity.get('activityClasses');
        activityClasses.pushObject(activityClass);
      } else {
        classActivity.set('activityClasses', Ember.A([activityClass]));
        classActivity.set('isActive', !!classActivity.get('activation_date'));
        groupedActivities.pushObject(classActivity);
      }
    });
    return groupedActivities;
  },

  getStructuredClassActivityObject(classActivity, activityClassData) {
    return Ember.Object.create({
      id: classActivity.get('classId'),
      title: activityClassData.get('title'),
      members: activityClassData.get('members') || null,
      course: activityClassData.get('course') || null,
      content: classActivity.get('collection'),
      activity: Ember.Object.create({
        id: classActivity.get('id'),
        usersCount: classActivity.get('usersCount'),
        isCompleted: classActivity.get('isCompleted'),
        allowMasteryAccrual: classActivity.get('allowMasteryAccrual'),
        activation_date: classActivity.get('activation_date')
      })
    });
  },

  groupGradingItems() {
    const component = this;
    const gradingItemsList = component.get('gradingItemsList');
    const groupedGradingItems = Ember.A([]);
    const secondaryClasses = component.get('secondaryClasses');
    gradingItemsList.map(gradingItem => {
      let existingGradingItem = groupedGradingItems.find(groupedGradingItem => {
        return (
          (groupedGradingItem.get('contentType') === CONTENT_TYPES.ASSESSMENT &&
            groupedGradingItem.get('resourceId') ===
              gradingItem.get('resourceId')) ||
          (groupedGradingItem.get('contentType') ===
            CONTENT_TYPES.OFFLINE_ACTIVITY &&
            groupedGradingItem.get('contentId') ===
              gradingItem.get('collectionId'))
        );
      });
      const classData =
        secondaryClasses.findBy('id', gradingItem.get('classId')) ||
        component.get('primaryClass');
      const classObject = Ember.Object.create({
        title: classData.get('title'),
        id: classData.get('id'),
        code: classData.get('code'),
        activityDate: gradingItem.get('activityDate') || undefined,
        studentCount: gradingItem.get('studentCount')
      });
      if (existingGradingItem) {
        let gradingClasses = existingGradingItem.get('gradingClasses');
        gradingClasses.pushObject(classObject);
      } else {
        existingGradingItem = Ember.Object.create({
          contentId: gradingItem.get('collectionId'),
          contentType: gradingItem.get('collectionType'),
          resourceId: gradingItem.get('resourceId'),
          activityId: gradingItem.get('dcaContentId') || undefined,
          gradingClasses: Ember.A([classObject])
        });
        groupedGradingItems.pushObject(existingGradingItem);
      }
    });
    component.set('gradingItems', groupedGradingItems);
  },

  fetchActivityUsers(classId, activityId) {
    let component = this;
    return Ember.RSVP.hash({
      activityMembers: component
        .get('classActivityService')
        .fetchUsersForClassActivity(classId, activityId)
    }).then(({ activityMembers }) => {
      return activityMembers;
    });
  },

  /**
   * @function fetchActivityPerformanceSummary
   * Method to fetch given activity performance summary
   */
  fetchActivityPerformanceSummary(activityClass) {
    const component = this;
    const classActivityService = component.get('classActivityService');
    const classId = activityClass.get('id');
    const classActivity = activityClass.get('activity');
    const startDate = classActivity.get('activation_date');
    const endDate = classActivity.get('activation_date');
    return Ember.RSVP.hash({
      activityPerformance: classActivityService.findClassActivitiesPerformanceSummary(
        classId,
        Ember.A([classActivity]),
        startDate,
        endDate
      )
    }).then(({ activityPerformance }) => {
      return activityPerformance;
    });
  },

  scheduleActivityToClass(classActivity, scheduleDate, endDate) {
    const component = this;
    const contentId = classActivity.get('contentId');
    const contentType = classActivity.get('contentType');
    const month = moment(scheduleDate).format('MM');
    const year = moment(scheduleDate).format('YYYY');
    const activityClasses = classActivity.get('activityClasses');
    const secondaryClasses = component.get('secondaryClasses');
    const classesToSchedule = Ember.A([
      component.get('primaryClass.id')
    ]).concat(secondaryClasses.mapBy('id'));
    classesToSchedule.map(classId => {
      const addedActivity = activityClasses.findBy('id', classId);
      if (addedActivity) {
        const activityId = addedActivity.get('activity.id');
        component
          .get('classActivityService')
          .scheduleClassActivity(classId, activityId, scheduleDate, endDate);
      } else {
        component
          .get('classActivityService')
          .addActivityToClass(
            classId,
            contentId,
            contentType,
            scheduleDate,
            month,
            year,
            endDate
          );
      }
    });
    component.loadUnScheduledActivities();
  },

  addActivityToClass(
    classActivity,
    scheduleDate = null,
    endDate = null,
    month = null,
    year = null
  ) {
    const component = this;
    const contentId = classActivity.get('contentId');
    const contentType = classActivity.get('contentType');
    month = month || moment(scheduleDate).format('MM');
    year = year || moment(scheduleDate).format('YYYY');
    const secondaryClasses = component.get('secondaryClasses');
    const classesToSchedule = Ember.A([
      component.get('primaryClass.id')
    ]).concat(secondaryClasses.mapBy('id'));
    classesToSchedule.map(classId => {
      Ember.RSVP.hash({
        addedActivity: component
          .get('classActivityService')
          .addActivityToClass(
            classId,
            contentId,
            contentType,
            scheduleDate,
            month,
            year,
            endDate
          )
      }).then(({ addedActivity }) => {
        return addedActivity;
      });
    });
    component.loadScheduledClassActivities(contentType);
  },

  fetchMasteryAccrualContents(classActivities = Ember.A([])) {
    const component = this;
    const contentIds = classActivities.mapBy('contentId');
    if (classActivities.length) {
      Ember.RSVP.hash({
        masteryAccrualContents: component
          .get('assessmentService')
          .assessmentsMasteryAccrual(contentIds)
      }).then(({ masteryAccrualContents }) => {
        masteryAccrualContents.map(masteryAccrualContent => {
          let masteryAccrualContentId = Object.keys(masteryAccrualContent);
          const contentId = masteryAccrualContentId.objectAt(0);
          const classActivity = classActivities.findBy('contentId', contentId);
          classActivity.set(
            'masteryAccrualCompetencies',
            masteryAccrualContent[contentId]
          );
        });
      });
    }
  },

  enableMasteryAccrual(classActivity) {
    const component = this;
    const activityClasses = classActivity.get('activityClasses');
    activityClasses.map(activityClass => {
      const classId = activityClass.get('id');
      const contentId = activityClass.get('activity.id');
      const allowMasteryAccrual = !activityClass.get(
        'activity.allowMasteryAccrual'
      );
      component
        .get('classActivityService')
        .updateMasteryAccrualClassActivity(
          classId,
          contentId,
          allowMasteryAccrual
        )
        .then(function() {
          activityClass.set('allowMasteryAccrual', allowMasteryAccrual);
        });
    });
  },

  markOfflineActivityStatus(classActivity) {
    const component = this;
    const activityClasses = classActivity.get('activityClasses');
    activityClasses.map(activityClass => {
      const classId = activityClass.get('id');
      const activityId = activityClass.get('activity.id');
      component
        .get('classActivityService')
        .completeOfflineActivity(classId, activityId)
        .then(() => {
          activityClass.set('activity.isCompleted', true);
        });
    });
  }
});