import Ember from 'ember';
import {
  PLAYER_EVENT_SOURCE
} from 'gooru-web/config/config';

export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {Service} session service
   */
  session: Ember.inject.service('session'),

  /**
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service('api-sdk/class-activity'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Launch an assessment on-air
     *
     * @function actions:goLive
     */
    goLive: function(options) {
      const currentClass = this.modelFor('teacher.class').class;
      const classId = currentClass.get('id');
      const queryParams = {
        queryParams: {
          source: PLAYER_EVENT_SOURCE.DAILY_CLASS,
          collectionType: options.collectionType
        }
      };
      this.transitionTo(
        'reports.collection',
        classId,
        options.collectionId,
        queryParams
      );
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  model: function(params) {
    const route = this;
    const currentClass = route.modelFor('teacher.class').class;
    const classId = currentClass.get('id');
    let forMonth = params.month || moment().format('MM');
    let forYear = params.year || moment().format('YYYY');
    let startDate = `${forYear}-${forMonth}-01`;
    let endDate = moment().endOf('month').format('YYYY-MM-DD');
    let selectedPeriod = Ember.Object.create({
      forMonth,
      forYear
    });
    return Ember.RSVP.hash({
      unScheduledClassActivities: route.get('classActivityService')
        .getUnScheduledActivities(classId, forMonth, forYear),
      classActivitiesOfMonth: route.get('classActivityService')
        .getScheduledClassActivitiesForMonth(classId, startDate, endDate),
      selectedPeriod
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.set('classActivitiesOfMonth', model.classActivitiesOfMonth);
    controller.set('unScheduledClassActivities', model.unScheduledClassActivities);
    controller.set('forMonth', model.selectedPeriod.forMonth);
    controller.set('forYear', model.selectedPeriod.forYear);
    controller.set('selectedDate', moment().format('YYYY-MM-DD'));
    controller.initialize();
    controller.get('classController').selectMenuItem('class-activities');
  },

  /**
   * Reset data on deactive
   * @param controller
   */
  resetController(controller) {
    controller.set('tab', null);
    controller.set('classActivities', Ember.A([]));
    controller.set('activeOfflineActivities', Ember.A([]));
    controller.set('completedOfflineActivities', Ember.A([]));
    controller.set('unScheduledClassActivities', Ember.A([]));
    controller.set('month', null);
    controller.set('year', null);
    controller.set('selectedDate', null);
    controller.set('isShowAddData', false);
  }
});
