import Ember from 'ember';
import Context from 'gooru-web/models/result/context';
/**
 *
 * Analytics data for a student related to a collection of resources
 * Gathers and passes the necessary information to the controller
 *
 * @module
 * @augments ember/Route
 */
export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  session: Ember.inject.service("session"),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    goBack: function() {
      const controller = this.get("controller");
      const context = controller.get("context");
      if (context.get("lessonId")){
        this.transitionTo("class.analytics.performance.student",
          context.get("classId"),
          {
            queryParams: {
              unitId: context.get("unitId"),
              lessonId: context.get("lessonId"),
            }
          });
      }
      else {
        this.transitionTo("search.assessments");
      }
    }
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Ember.Service} Service to retrieve an assessment result
   */
  userSessionService: Ember.inject.service("api-sdk/user-session"),

  /**
   * @property {AssessmentService} Service to retrieve an assessment
   */
  assessmentService: Ember.inject.service("api-sdk/assessment"),

  /**
   * @property {CollectionService} Service to retrieve a collection
   */
  collectionService: Ember.inject.service("api-sdk/collection"),

  /**
   * @property {LessonService} Service to retrieve a lesson
   */
  lessonService: Ember.inject.service("api-sdk/lesson"),


  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function () {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  /**
   * @param {{ assessmentId: string, resourceId: string }} params
   */
  model(params) {
    const route = this;
    const context = route.getContext(params);
    const type = params.type || "collection";

    const lessonPromise = context.get("courseId") ?
      route.get("lessonService").fetchById(context.get("courseId"), context.get("unitId"), context.get("lessonId")) :
      null;

    const collectionPromise = (type === "collection") ?
      route.get("collectionService").readCollection(params.collectionId) :
      route.get("assessmentService").readAssessment(params.collectionId);
    return Ember.RSVP.hash({
      collection: collectionPromise,
      completedSessions : route.get("userSessionService").getCompletedSessions(context),
      lesson: lessonPromise,
      context: context
    });
  },

  /**
   *
   * @param controller
   * @param model
   * @returns {Promise.<T>}
   */
  setupController: function(controller, model){
    var completedSessions = model.completedSessions;
    const totalSessions = completedSessions.length;
    const lastCompletedSession = completedSessions[totalSessions - 1];
    controller.set("collection", model.collection.toPlayerCollection());
    controller.set("lesson", model.lesson);
    controller.set("completedSessions", completedSessions);
    controller.set("context", model.context);
    controller.loadSession(lastCompletedSession);
  },

  /**
   * Get the player context
   * @param params
   * @returns {Context}
   */
  getContext: function(params){
    const route = this;
    const userId = route.get('session.userId');
    const collectionId = params.collectionId;
    const courseId = params.courseId;
    const unitId = params.unitId;
    const lessonId = params.lessonId;

    return Context.create({
      collectionType: params.type,
      userId: userId,
      collectionId: collectionId,
      courseId: courseId,
      classId: params.classId,
      unitId: unitId,
      lessonId: lessonId
    });
  },

  deactivate: function(){
    this.get("controller").resetValues();
  }


});
