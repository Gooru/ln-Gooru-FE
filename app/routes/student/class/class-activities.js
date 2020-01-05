import Ember from 'ember';

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
  // Methods

  model: function() {
    const route = this;
    const currentClass = route.modelFor('student.class').class;
    let userId = route.get('session.userId');
    const classId = currentClass.get('id');
    let forMonth = moment().format('MM');
    let forYear = moment().format('YYYY');
    let startDate = `${forYear}-${forMonth}-01`;
    var endDate = moment(startDate).endOf('month').format('YYYY-MM-DD');
    return Ember.RSVP.hash({
      classActivities: route.get('classActivityService')
        .getStudentScheduledActivities(userId, classId, startDate, endDate)
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.get('classController').selectMenuItem('class-activities');
    controller.set('classActivitiesOfMonth', model.classActivities);
    controller.set('selectedDate', moment().format('YYYY-MM-DD'));
    controller.initialize();
  },

  /**
   * Reset data on deactive
   * @param controller
   */
  resetController(controller) {
    const todayDate = moment();
    controller.set('classActivities', Ember.A([]));
    controller.set('classActivitiesOfMonth', Ember.A([]));
    controller.set('startDate', todayDate);
    controller.set('endDate', todayDate);
    controller.set('isToday', true);
    controller.set('isDaily', true);
    controller.set('isMonthly', false);
    controller.set('isWeekly', false);
    controller.set('showItemsToGrade', false);
    controller.set('forMonth', todayDate.format('MM'));
    controller.set('forYear', todayDate.format('YYYY'));
    controller.set('tab', null);
  }
});
