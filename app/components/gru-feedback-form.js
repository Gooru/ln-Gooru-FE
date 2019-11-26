import Ember from 'ember';
import { USER_CATEGORY_ID } from 'gooru-web/config/config';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Service

  /**
   * @requires service:session
   */
  session: Ember.inject.service('session'),

  /**
   * @property {activityFeedbackService}
   */
  activityFeedbackService: Ember.inject.service('api-sdk/activity-feedback'),

  /**
   * Observe the resource change
   */
  resourceObserver: Ember.observer('resourceInfo', function() {
    const component = this;
    component.fetchLearningActivityFeedback();
  }),

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    const component = this;
    component.fetchLearningActivityFeedback();
  },

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    showDescription: function() {
      const component = this;
      component.$('.description').slideToggle();
    },

    onNext: function() {
      const component = this;
      let learningFeedback = component.getFeedbackObject();
      component
        .get('activityFeedbackService')
        .submitUserFeedback(learningFeedback)
        .then(() => {
          component.sendAction('onNext');
        });
    },

    onSkipFeedback: function() {
      const component = this;
      component.sendAction('onSkipFeedback');
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {String} collection format
   */
  contentType: Ember.computed('resourceInfo', function() {
    let component = this;
    let contentFormat = component.get('resourceInfo.content_format');
    let format = component.get('format');
    if (contentFormat) {
      return contentFormat;
    } else if (format) {
      return format;
    } else {
      return 'question';
    }
  }),

  contentId: Ember.computed('resourceInfo', function() {
    let component = this;
    let format = component.get('format');
    if (format === 'offline-activity') {
      return component.get('resourceInfo.oaId');
    } else {
      return component.get('resourceInfo.id');
    }
  }),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function fetchLearningActivityFeedback
   * Method to fetch learning activity feedback
   */

  fetchLearningActivityFeedback() {
    const component = this;
    let userId = component.get('session.userId');
    let contentType = component.get('contentType');
    let contentId = component.get('contentId');
    let role = component.get('session.role');
    let userCategoryId = USER_CATEGORY_ID[`${role}`] || USER_CATEGORY_ID.other;
    Ember.RSVP.hash({
      categoryLists: component
        .get('activityFeedbackService')
        .getFeedbackCategory(contentType, userCategoryId),
      activityFeedback: component
        .get('activityFeedbackService')
        .fetchActivityFeedback(contentId, userId)
    }).then(function(hash) {
      if (hash.activityFeedback.length) {
        hash.activityFeedback.map(feedback => {
          let category = hash.categoryLists.findBy(
            'categoryId',
            feedback.categoryId
          );
          if (category) {
            if (category.feedbackTypeId === 1) {
              category.rating = feedback.rating;
            } else {
              category.comments = feedback.comments;
            }
          }
        });
      }
      component.set('categoryLists', hash.categoryLists);
    });
  },

  /**
   * @function getFeedbackObject
   * Method to return feedback objective
   */

  getFeedbackObject() {
    const component = this;
    let userId = component.get('session.userId');
    let role = component.get('session.role');
    let userCategoryId = USER_CATEGORY_ID[`${role}`] || USER_CATEGORY_ID.other;
    let userFeedback = Ember.A([]);
    let categoryLists = component.get('categoryLists');
    categoryLists.map(category => {
      let feedbackObj = {
        feeback_category_id: category.categoryId
      };
      if (category.feedbackTypeId === 1) {
        feedbackObj.user_feedback_quantitative = category.rating;
      } else if (category.feedbackTypeId === 3) {
        feedbackObj.user_feedback_qualitative = category.comments;
      }
      userFeedback.pushObject(feedbackObj);
    });
    let userFeedbackObj = {
      content_id: component.get('contentId'),
      content_type: component.get('contentType'),
      user_category_id: userCategoryId,
      user_feedbacks: userFeedback,
      user_id: userId
    };
    return userFeedbackObj;
  }
});
