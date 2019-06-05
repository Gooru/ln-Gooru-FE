import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {rubricService}
   */
  rubricService: Ember.inject.service('api-sdk/rubric'),

  /**
   * @requires service:api-sdk/offline-activity/offline-activity
   */
  activityService: Ember.inject.service(
    'api-sdk/offline-activity/offline-activity'
  ),

  /**
   * @property {rubricService}
   */
  questionService: Ember.inject.service('api-sdk/question'),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'modals', 'gru-add-rubric-to-question'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Select rubric
     */
    selectRubric: function(rubric) {
      this.set('selectedRubric', rubric);
      $('.gru-add-rubric-to-question .selected').removeClass('selected');
      $(`.${rubric.id}`).addClass('selected');
    },

    /**
     * Add to question
     */
    addTo: function() {
      let component = this;
      const model = component.get('model');
      const rubricId = component.get('selectedRubric.id');
      if (model.rubricsFor && model.rubricsFor === 'student') {
        return component
          .get('activityService')
          .associateStudentRubricToOA(rubricId, model.oaId)
          .then(function() {
            if (model.callback) {
              // component
              //   .get('questionService')
              //   .readQuestion(model.oaId)
              //   .then(function(question) {
              //     model.callback.success(question.rubric);
              //   });
            }
            component.triggerAction({ action: 'closeModal' });
          });
      } else {
        return component
          .get('activityService')
          .associateTeacherRubricToOA(rubricId, model.oaId)
          .then(function() {
            if (model.callback) {
              // component
              //   .get('questionService')
              //   .readQuestion(model.oaId)
              //   .then(function(question) {
              //     model.callback.success(question.rubric);
              //   });
            }
            component.triggerAction({ action: 'closeModal' });
          });
      }
    },

    /**
     * Go to content page
     */
    goToContent: function() {
      let component = this;
      const model = component.get('model');
      component
        .get('router')
        .transitionTo('profile.content.rubrics', model.userId);
      component.triggerAction({ action: 'closeModal' });
    }
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * Model with the values to use in the modal
   */
  model: null,

  /**
   * Filter only rubrics ON
   */
  filteredRubrics: Ember.computed('model.rubrics', function() {
    return this.get('model.rubrics').filter(rubric => rubric.title);
  })
});
