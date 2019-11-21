import Ember from 'ember';
import { ROLES } from 'gooru-web/config/config';

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

  isdescription: false,

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
      component.set('isdescription', true);
    },

    onNext: function() {
      const component = this;
      let learningFeedback = component.feedbackObj();
      component
        .get('activityFeedbackService')
        .submitUserFeedback(learningFeedback)
        .then(() => {
          let currentIndex = component.get('resourceInfo.index');
          component.sendAction('onNext', currentIndex);
        });
    },

    onSkipFeedback: function() {
      const component = this;
      component.sendAction('onSkipFeedback');
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function fetchLearningActivityFeedback
   * Method to fetch learning activity feedback
   */

  fetchLearningActivityFeedback() {
    const component = this;
    let userCategoryId, contentType, contentId;
    let userId = component.get('session.userId');
    let format = component.get('format');
    if (format === 'offline-activity') {
      contentType = format;
      contentId = component.get('resourceInfo.oaId');
    } else if (format === 'assessment-external') {
      contentType = format;
      contentId = component.get('resourceInfo.id');
    } else if (format === 'collection-external') {
      contentType = format;
      contentId = component.get('resourceInfo.id');
    } else {
      contentType = component.get('resourceInfo.content_format')
        ? component.get('resourceInfo.content_format')
        : 'question';
      contentId = component.get('resourceInfo.id');
    }
    let role = component.get('session.role');
    if (role === ROLES.STUDENT) {
      userCategoryId = 2;
    } else if (role === ROLES.TEACHER) {
      userCategoryId = 1;
    } else {
      userCategoryId = 3;
    }
    Ember.RSVP.hash({
      categoryLists: component
        .get('activityFeedbackService')
        .getFeedbackCategory(contentType, userCategoryId),
      activityFeedback: component
        .get('activityFeedbackService')
        .fetchActivityFeedback(contentId, userId)
    }).then(function(hash) {
      if (hash.categoryLists.length) {
        hash.categoryLists.map(list => {
          if (list.feedbackTypeId === 1) {
            list.rating = 0;
          }
        });
      }

      if (hash.activityFeedback.length) {
        hash.activityFeedback.map(feedback => {
          hash.categoryLists.map(list => {
            if (list.categoryId === feedback.categoryId) {
              if (list.feedbackTypeId === 1) {
                list.rating = feedback.rating;
              } else {
                list.comments = feedback.comments;
              }
            }
          });
        });
      }
      component.set('categoryLists', hash.categoryLists);
    });
  },

  /**
   * @function feedbackObj
   * Method to return feedback objective
   */

  feedbackObj() {
    const component = this;
    let contentId, contentType, userCategoryId;
    let format = component.get('format');
    if (format === 'offline-activity') {
      contentType = format;
      contentId = component.get('resourceInfo.oaId');
    } else if (format === 'assessment-external') {
      contentType = format;
      contentId = component.get('resourceInfo.id');
    } else {
      contentType = component.get('resourceInfo.content_format')
        ? component.get('resourceInfo.content_format')
        : 'question';
      contentId = component.get('resourceInfo.id');
    }
    let userId = component.get('session.userId');
    let role = component.get('session.role');
    if (role === ROLES.STUDENT) {
      userCategoryId = 2;
    } else if (role === ROLES.TEACHER) {
      userCategoryId = 1;
    } else {
      userCategoryId = 3;
    }
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
      content_id: contentId,
      content_type: contentType,
      user_category_id: userCategoryId,
      user_feedbacks: userFeedback,
      user_id: userId
    };
    return userFeedbackObj;
  }
});
