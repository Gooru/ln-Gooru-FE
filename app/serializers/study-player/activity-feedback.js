import Ember from 'ember';
/**
 * Serializer to support capture activity feedback functionality
 *
 * @typedef {Object} ActivityFeedbackSerializer
 */
export default Ember.Object.extend({
  getFeedbackCategories(payload) {
    let feedbackCategory = payload ? payload.feedback_categories : {};
    let contentCategory = Ember.Object.create();
    for (const property in feedbackCategory) {
      contentCategory[property] = [];
      feedbackCategory[property].map(category => {
        const categoryObject = Ember.Object.create({
          categoryId: category.id,
          categoryName: category.category_name,
          feedbackTypeId: category.feedback_type_id,
          maxScale: category.max_scale,
          rating: 0
        });
        contentCategory[property].push(categoryObject);
      });
    }
    return contentCategory;
  },

  fetchActivityFeedback(payload) {
    let activityFeedback = payload ? payload.userActivityFeedbacks : [];
    let userActivityFeedbacks = [];
    if (activityFeedback.length) {
      activityFeedback.map(feedback => {
        userActivityFeedbacks.pushObject(
          Ember.Object.create({
            categoryId: feedback.feedbackCategoryId,
            rating: feedback.userFeedbackQuantitative,
            comments: feedback.userFeedbackQualitative
          })
        );
      });
    }
    return userActivityFeedbacks;
  }
});
