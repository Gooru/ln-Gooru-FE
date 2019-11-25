import Ember from 'ember';
/**
 * Serializer to support capture activity feedback functionality
 *
 * @typedef {Object} ActivityFeedbackSerializer
 */
export default Ember.Object.extend({
  getFeedbackCategories(payload) {
    let feedbackCategory = payload ? payload.feedback_categories : [];
    let categoryList = [];
    feedbackCategory.map(category => {
      categoryList.pushObject(
        Ember.Object.create({
          categoryId: category.id,
          categoryName: category.category_name,
          feedbackTypeId: category.feedback_type_id,
          maxScale: category.max_scale,
          rating: 0
        })
      );
    });
    return categoryList;
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
