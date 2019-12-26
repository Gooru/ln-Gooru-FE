import Ember from 'ember';
import ActivityFeedbackAdapter from 'gooru-web/adapters/study-player/activity-feedback';
import ActivityFeedbackSerializer from 'gooru-web/serializers/study-player/activity-feedback';

/**
 * Service to support the capture activity feedback functionality
 *
 * @typedef {Object} ActivityFeedbackService
 */
export default Ember.Service.extend({
  activityFeedbackSerializer: null,
  activityFeedbackAdapter: null,

  init: function() {
    this._super(...arguments);
    this.set(
      'activityFeedbackSerializer',
      ActivityFeedbackSerializer.create(Ember.getOwner(this).ownerInjection())
    );
    this.set(
      'activityFeedbackAdapter',
      ActivityFeedbackAdapter.create(Ember.getOwner(this).ownerInjection())
    );
  },

  getFeedbackCategory: function(contentType, userCategoryId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('activityFeedbackAdapter')
        .getFeedbackCategories(contentType, userCategoryId)
        .then(function(responseData) {
          resolve(
            service
              .get('activityFeedbackSerializer')
              .getFeedbackCategories(responseData)
          );
        }, reject);
    });
  },

  fetchActivityFeedback: function(contentId, userId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('activityFeedbackAdapter')
        .fetchActivityFeedback(contentId, userId)
        .then(function(responseData) {
          resolve(
            service
              .get('activityFeedbackSerializer')
              .fetchActivityFeedback(responseData)
          );
        }, reject);
    });
  },

  submitUserFeedback: function(feedbackData) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('activityFeedbackAdapter')
        .submitUserFeedback(feedbackData)
        .then(function(responseData) {
          resolve(responseData);
        }, reject);
    });
  }
});
