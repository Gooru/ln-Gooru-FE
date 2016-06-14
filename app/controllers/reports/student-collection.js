import Ember from "ember";
import { toLocal } from 'gooru-web/utils/utils';
/**
 *
 * Controls the access to the analytics data for a
 * student related to a collection of resources
 *
 */

export default Ember.Controller.extend({

  queryParams: ["classId", "courseId", "unitId", "lessonId", "collectionId", "userId", "type"],
  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {Ember.Service} Service to retrieve an assessment result
   */
  performanceService: Ember.inject.service("api-sdk/performance"),

  /**
   * @property {Ember.Service} Service to retrieve analytics data
   */
  analyticsService: Ember.inject.service("api-sdk/analytics"),

  /**
   * @property {Ember.Service} Service to search for resources
   */
  searchService: Ember.inject.service("api-sdk/search"),

  /**
   * @property {Ember.Service} Service to get the Taxonomy data
   */
  taxonomyService: Ember.inject.service("api-sdk/taxonomy"),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    selectAttempt: function(attempt){
      const session = this.get("completedSessions")[attempt-1];
      this.loadSession(session);
    }
  },

  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Collection}
   */
  collection: null,

  /**
   * @property {AssessmentResult}
   */
  assessmentResult: null,

  /**
   * @property {UserSession[]}
   */
  completedSessions: [],

  /**
   * @property {Context}
   */
  context: null,

  /**
   * @property {Lesson}
   */
  lesson: null,

  /**
   * @property {string} indicates if it is collection or assessment
   */
  type: null,

  /**
   * indicates if it is assessment type
   * @property {boolean}
   */
  isAssessment: Ember.computed.equal("type", "assessment"),

  /**
   * indicates if it is collection type
   * @property {boolean}
   */
  isCollection: Ember.computed.not("isAssessment"),


  /**
   * Indicates which is the url to go back when pressing the button
   * this is usefull when comming from the player out of the context of a class
   * this needs to be improved so it works when refreshing the page
   * @property {string}
   */
  backUrl: null,

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  loadSession: function (session) {
    const controller = this;
    const context = controller.get("context");
    if (session){ //collections has no session
      context.set("sessionId", session.sessionId);
    }
    controller.get("performanceService")
      .findAssessmentResultByCollectionAndStudent(context)
      .then(function(assessmentResult) {
        assessmentResult.merge(controller.get("collection"));
        assessmentResult.set("totalAttempts", controller.get("completedSessions.length")); //TODO this is coming wrong from BE
        if (session && session.eventTime){
          assessmentResult.set("submittedAt", toLocal(session.eventTime));
        }

        controller.get('analyticsService')
          .getStandardsSummary(context.get('sessionId'))
          .then(function(standardsSummary) {
            assessmentResult.set('mastery', standardsSummary);
            let standardsIds = standardsSummary.map(function(standardSummary) { return standardSummary.get('id') });
            controller.get('taxonomyService')
              .fetchCodesByIds(standardsIds)
              .then(function(taxonomyStandards) {
                standardsSummary.forEach(function(standardSummary) {
                  const taxonomyStandard = taxonomyStandards.findBy('id', standardSummary.get('id'));
                  if (taxonomyStandard) {
                    standardSummary.set('description', taxonomyStandard.title);
                  }
                  controller.get('searchService')
                    .searchResources('*', {
                      courseId: controller.get('courseId'),
                      taxonomies: [standardSummary.get('id')],
                      publishStatus: 'unpublished'  // TODO this parameter needs to be removed once we go to Production
                    })
                    .then(function(resources) {
                      const suggestedResources = resources.map(function(resource) {
                      return {
                        resource: resource.toPlayerResource()
                      };
                    });
                    standardSummary.set('suggestedResources', suggestedResources);
                  });
                });
              });
          });
        controller.set("assessmentResult", assessmentResult);
    });
  },

  resetValues: function () {
    this.set("assessmentResult", null);
    this.set("completedSessions", []);
    this.set("context", null);
    this.set("lesson", null);
    this.set("type", null);
  }

});
