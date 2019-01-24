import Ember from 'ember';
import { PLAYER_EVENT_SOURCE } from 'gooru-web/config/config';

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
  // Properties

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Launch an assessment on-air
     *
     * @function actions:goLive
     */
    goLive: function(collectionId) {
      const currentClass = this.modelFor('teacher.class').class;
      const classId = currentClass.get('id');
      const queryParams = {
        queryParams: {
          source: PLAYER_EVENT_SOURCE.DAILY_CLASS
        }
      };
      this.transitionTo(
        'reports.collection',
        classId,
        collectionId,
        queryParams
      );
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  model: function() {
    const route = this;
    const currentClass = route.modelFor('teacher.class').class;
    const classId = currentClass.get('id');
    let forMonth = moment().format('MM');
    let forYear = moment().format('YYYY');
    return Ember.RSVP.hash({
      classActivities: route
        .get('classActivityService')
        .findClassActivities(classId, null, forMonth, forYear)
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    let route = this;
    let performanceSummaryForDCA = route.modelFor('teacher.class')
      .performanceSummaryForDCA;
    controller.set('performanceSummaryForDCA', performanceSummaryForDCA);
    controller.parseClassActivityData(model.classActivities);
    controller.initialize();
  },

  /**
   * Reset data on deactive
   * @param controller
   */
  resetController(controller) {
    controller.set('tab', null);
    controller.set('classActivities', Ember.A([]));
  }
});
