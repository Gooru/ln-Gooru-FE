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
    const classId = currentClass.get('id');
    let forMonth = moment().format('MM');
    let forYear = moment().format('YYYY');
    let startDate = `${forYear}-${forMonth}-01`;
    var endDate = moment(startDate).endOf('month').format('YYYY-MM-DD');
    return Ember.RSVP.hash({
      classActivities: route.get('classActivityService')
        .getScheduledActivities(classId, startDate, endDate)
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.get('classController').selectMenuItem('class-activities');
    controller.parseClassActivityData(model.classActivities);
    controller.initialize();
  },

  /**
   * Reset data on deactive
   * @param controller
   */
  resetController(controller) {
    controller.set('classActivities', Ember.A([]));
    controller.set('tab', null);
  }
});
