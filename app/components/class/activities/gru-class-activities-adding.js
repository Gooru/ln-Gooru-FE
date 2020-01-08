import Ember from 'ember';
import { SCREEN_SIZES, CONTENT_TYPES } from 'gooru-web/config/config';
import { isCompatibleVW } from 'gooru-web/utils/utils';

export default Ember.Component.extend({
  classNames: ['class-activities', 'gru-clas-activities-adding'],

  classNameBindings: ['isShowCourseMap:cm-view', 'isShowFullView:open'],

  /**
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service('api-sdk/class-activity'),

  /**
   * @type {CourseService} Service to retrieve course information
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service('api-sdk/class'),

  actions: {
    onSelectExternalActivity() {
      const component = this;
      component.set('isEnableExternalActivity', true);
    },

    onAddExternalActivity(
      activityData,
      scheduledDate,
      scheduledMonth,
      scheduledYear
    ) {
      const component = this;
      const content = activityData.get('collection');
      component.assignActivityToMultipleClass(
        content,
        scheduledDate,
        scheduledDate,
        scheduledMonth,
        scheduledYear
      );
    },

    onShowTenantLibraries(tenantLibraries) {
      const component = this;
      component.set('tenantLibraries', tenantLibraries);
      component.set('isShowTenantLibraries', true);
      component.set('isShowCourseMap', false);
    },

    onSelectTenantLibrary(tenantLibrary) {
      const component = this;
      component.set('activeTenantLibrary', tenantLibrary);
    },

    onShowFilteredContents(filteredContents) {
      const component = this;
      let todaysActivities = component.get('todaysActivities');
      filteredContents.map(content => {
        content.isAdded = !!todaysActivities.findBy('contentId', content.id);
      });
      component.set('filteredContents', filteredContents);
      component.set('isShowTenantLibraries', false);
      component.set('isShowCourseMap', false);
    },

    onAddActivity(
      content,
      scheduleDate = null,
      endDate = null,
      month,
      year,
      isScheduleByMonth = false
    ) {
      const component = this;
      scheduleDate = isScheduleByMonth
        ? null
        : scheduleDate || moment().format('YYYY-MM-DD');
      component.assignActivityToMultipleClass(
        content,
        scheduleDate,
        endDate,
        month,
        year
      );
    },

    onShowCourseMap() {
      const component = this;
      component.set('isShowCourseMap', true);
      component.set('isShowTenantLibraries', false);
    },

    onShowDateRangePicker(content) {
      const component = this;
      const contentFormat = content.get('format') || content.get('contentType');
      component.set('contentToSchedule', content);
      component.set('isShowDateRangePicker', true);
      component.set(
        'isShowStartEndDatePicker',
        contentFormat === CONTENT_TYPES.OFFLINE_ACTIVITY
      );
    },

    onCloseDateRangePicker() {
      this.set('isShowDateRangePicker', false);
    },

    scheduleContentForDate(scheduleDate, endDate) {
      const component = this;
      const content = component.get('contentToSchedule');
      component.assignActivityToMultipleClass(content, scheduleDate, endDate);
      component.set('isShowDateRangePicker', false);
    },

    scheduleContentForMonth(month, year) {
      const component = this;
      const content = component.get('contentToSchedule');
      const scheduleDate = null;
      const endDate = null;
      component.assignActivityToMultipleClass(
        content,
        scheduleDate,
        endDate,
        month,
        year
      );
      component.set('isShowDateRangePicker', false);
    },

    onTogglePanel() {
      const component = this;
      let top = isCompatibleVW(SCREEN_SIZES.EXTRA_SMALL) ? '102px' : '50px';
      if (component.get('isShowFullView')) {
        component.$().css(
          {
            top: 'unset'
          },
          400
        );
        component.$().removeClass('open');
      } else {
        component.$().animate(
          {
            top
          },
          400
        );
        component.$().addClass('open');
      }
      component.toggleProperty('isShowFullView');
    },

    onShowContentPreview(previewContent) {
      const component = this;
      component.set('previewContent', previewContent);
      if (previewContent.get('format') === 'offline-activity') {
        component.set('isShowOfflineActivityPreview', true);
      } else {
        component.set('isShowContentPreview', true);
      }
    },

    onToggleMultiClassPanel(component = this) {
      component.$('.multi-class-list').slideToggle();
      component.toggleProperty('isMultiClassListExpanded');
    },

    //Action triggered when selecting a class from dropdown
    onSelectCmClass(classInfo) {
      const component = this;
      component.set('activeCmClass', classInfo);
      component.getClassInfo(classInfo.get('id')).then(classData => {
        component.set('activeCmClass', classData);
      });
      component.actions.onToggleMultiClassPanel(component);
    }
  },

  activeTenantLibrary: {},

  isShowFullView: false,

  isMobileView: isCompatibleVW(SCREEN_SIZES.MEDIUM),

  isShowStartEndDatePicker: false,

  /**
   * @property {Boolean} isCourseAttached
   * Property to check whether Class has attached with a course or not
   */
  isCourseAttached: Ember.computed('activeCmClass', function() {
    return !!this.get('activeCmClass.courseId');
  }),

  defaultTab: Ember.Object.create({}),

  /**
   * @property {Object} activeCmClass
   * Property for the active class object
   */
  activeCmClass: Ember.computed(function() {
    return this.get('primaryClass');
  }),

  isMultiClassListExpanded: false,

  assignActivityToMultipleClass(
    content,
    scheduleDate,
    endDate,
    month = undefined,
    year = undefined
  ) {
    const component = this;
    content.set('isScheduledActivity', !!scheduleDate);
    content.set('isUnscheduledActivity', month && year);
    const secondaryClasses = component.get('secondaryClasses');
    const classesToBeAdded = Ember.A([component.get('primaryClass.id')]).concat(
      secondaryClasses.mapBy('id')
    );
    let promiseList = classesToBeAdded.map(classId => {
      return new Ember.RSVP.Promise((resolve, reject) => {
        component
          .addActivityToClass(
            classId,
            content,
            scheduleDate,
            month,
            year,
            endDate
          )
          .then(function(activityId) {
            const activityClasses =
              content.get('activityClasses') || Ember.A([]);
            let activityClass = Ember.Object.create({
              id: classId,
              activity: Ember.Object.create({
                id: activityId,
                date: scheduleDate,
                month,
                year
              })
            });
            activityClasses.pushObject(activityClass);
            content.set('activityClasses', activityClasses);
            resolve();
          }, reject);
      });
    });
    Ember.RSVP.all(promiseList).then(() => {
      if (scheduleDate) {
        content.set('isAdded', true);
      } else {
        content.set('isScheduled', true);
      }
      component.sendAction('activityAdded', content);
    });
  },

  addActivityToClass(classId, content, scheduleDate, month, year, endDate) {
    const component = this;
    const contentId = content.get('id');
    const contentType = content.get('format');
    return component
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
  },

  /**
   * @function getClassInfo
   * @param {UUID} classId
   * @return Promise classdata
   */
  getClassInfo(classId) {
    const component = this;
    const fetchCachedData = true;
    return component
      .get('classService')
      .readClassInfo(classId, fetchCachedData);
  }
});
