import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * Handle event triggered by gru-summary
     * Scroll to specific question
     * TODO make this method generic
     */
    bubbleSelect: function(bubbleOption) {
      const animationSpeed = 1000;  // milliseconds
      const selectorTable = $(".gru-assessment-report #resource-" + bubbleOption.label);
      const $elTable = $(selectorTable);
      const $tableVisible = $(".gru-assessment-report").find('table:visible');

      const selectorList = $(".gru-assessment-report #mobile-resource-"+ bubbleOption.label);
      const $elList = $(selectorList);
      const $cardsVisible = $(".gru-assessment-report").find('.question-cards:visible');

      const isModal=$('.gru-assessment-report').parents('.gru-modal');
      //Check if the assessment report is showing into a modal
      if(isModal.length){
        if ($elTable.length) {
          $('.gru-modal').animate({
            scrollTop: $elTable.offset().top -   $('.gru-modal').offset().top
          }, animationSpeed);
        }
      }else{
        //Check if the questions details are showing on table (md or sm devices) or  a list (xs devices)
        if ($tableVisible.length) {
          $('html,body').animate({
            scrollTop: $elTable.offset().top - $('.controller.class.analytics.collection.student').offset().top
          }, animationSpeed);
        } else  if ($cardsVisible.length) {
          $('html,body').animate({
            scrollTop: $elList.offset().top - $('.controller.class.analytics.collection.student').offset().top
          }, animationSpeed);
        }else {
          Ember.Logger.error("No element was found for selectorTable: " + selectorTable);
        }
      }
    },

    selectAttempt: function(attempt){
      this.sendAction("onSelectAttempt", attempt);
    }
  },

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'gru-assessment-report'],


  // -------------------------------------------------------------------------
  // Events
  /**
   * Listening for model to update component properties
   */
  onInit: Ember.on("init", function(){
    if (this.get("model")){
      this.set("assessmentResult", this.get("model").assessmentResult);
    }
  }),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {AssessmentResult} assessment
   */
  assessmentResult: null,

  /**
   * @property {boolean} areAnswersHidden - Should answer results be hidden?
   */
  areAnswersHidden: false,

  /**
   * @property {boolean} isAnswerKeyHidden - Should the answer key be hidden?
   */
  isAnswerKeyHidden: false,

  /**
   * @property {string} on select attempt action name
   */
  onSelectAttempt: null,

  /**
   * @property {boolean} isRealTime
   */
  isRealTime:Ember.computed('model',function(){
    return this.get('model.assessmentResult.isRealTime');
  }),

  /**
   * @property {boolean} showAttempts
   */
  showAttempts:Ember.computed('model',function(){
    return this.get('model.assessmentResult.showAttempts') !== undefined ? this.get('model.assessmentResult.showAttempts') : true;
  }),

  /**
   * Return ordered questions array
   * @return {Ember.Array}
   */
  orderedQuestions: Ember.computed('assessmentResult.questionResults[]', function() {
    var resourceResultsOrdered = this.get('assessmentResult.questionResults').sort(function(a, b){
      return a.get('question.order')-b.get('question.order');
    });

    return resourceResultsOrdered;
  }),
  /**
   * Return ordered resources array
   * @return {Ember.Array}
   */
  orderedResources: Ember.computed('assessmentResult.resources[]', function() {
    var resourceResultsOrdered = this.get('assessmentResult.resources').sort(function(a, b){
      return a.get('resource.order')-b.get('resource.order');
    });

    return resourceResultsOrdered;
  }),

  // -------------------------------------------------------------------------
  // Events
  fixResourceResultOrder: function () {
    const component = this;
    component.get('assessmentResult').fixResultsOrder();
  }.on('init')
});
