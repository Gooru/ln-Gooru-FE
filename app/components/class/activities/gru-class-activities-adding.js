import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['class-activities', 'gru-clas-activities-adding'],

  /**
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service('api-sdk/class-activity'),

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
    },

    onSelectTenantLibrary(tenantLibrary) {
      const component = this;
      component.set('activeTenantLibrary', tenantLibrary);
    },

    onShowFilteredContents(filteredContents) {
      const component = this;
      component.set('filteredContents', filteredContents);
      component.set('isShowTenantLibraries', false);
      component.set('isShowLessonPlan', false);
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

    onShowLessonPlan() {
      const component = this;
      component.set('isShowLessonPlan', true);
    }
  },

  activeTenantLibrary: {},

  assignActivityToMultipleClass(
    content,
    scheduleDate,
    endDate,
    month = undefined,
    year = undefined
  ) {
    const component = this;
    const secondaryClasses = component.get('secondaryClasses');
    const classesToBeAdded = Ember.A([component.get('primaryClass.id')]).concat(
      secondaryClasses.mapBy('id')
    );
    classesToBeAdded.map(classId => {
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
          const activityClasses = content.get('activityClasses') || Ember.A([]);
          activityClasses.pushObject(
            Ember.Object.create({
              id: classId,
              activity: Ember.Object.create({
                id: activityId,
                date: scheduleDate,
                month,
                year
              })
            })
          );
          content.set('activityClasses', activityClasses);
        });
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
  }
});
