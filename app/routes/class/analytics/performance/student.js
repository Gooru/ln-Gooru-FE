import Ember from 'ember';
import ApplicationRouteMixin from "ember-simple-auth/mixins/application-route-mixin";

/**
 * Student Analytics Performance Route
 *
 * Route responsible of the transitions and loading the model/data for the student performance
 *
 * @module
 * @see routes/analytics/performance/student.js
 * @augments ember/Controller
 */
export default Ember.Route.extend(ApplicationRouteMixin,{
  // -------------------------------------------------------------------------
  // Dependencies
  performanceService: Ember.inject.service("api-sdk/performance"),
  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function() {
    // TODO: authenticate session with ember-simple-auth, if not send to log in


  },
  model: function() {
    const route = this;
    const userId = route.get("session.userId");
    const classId= this.paramsFor('class').classId;
    const courseId = this.modelFor('class').class.get("course");
    const performances = this.get("performanceService").findStudentPerformanceByClassAndCourse(userId,classId,courseId);

    return Ember.RSVP.hash({
      courseId:courseId,
      userId:userId,
      classId:classId,
      performances: performances
    });

  },
  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.set("performances", model.performances);
    controller.set("courseId", model.courseId);
    controller.set("userId", model.userId);
    controller.set("classId", model.classId);
    controller.get('classController').selectMenuItem('analytics.performance');
  }
});
