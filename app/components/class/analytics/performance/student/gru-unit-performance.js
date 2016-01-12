import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  performanceService: Ember.inject.service("api-sdk/performance"),
  // -------------------------------------------------------------------------
  // Attributes
  classNames:['gru-unit-performance-container', 'panel'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Load the data for this unit and trigger
     * the 'onLocationUpdate' event handler with the unit information
     *
     * @function actions:selectUnit
     */
    selectUnit: function (unit) {
      const component = this;

      component.loadLessons(unit.get('id'));

      let element =$('#'+ component.get('elementId')) ;
      if(element.hasClass('selected')){
        element.removeClass('selected');
      }
      else{
        $('.gru-unit-performance-container.selected').removeClass('selected');
        element.addClass('selected');
      }
    }
  },
  // -------------------------------------------------------------------------
  // Events
  didInsertElement:function(){

  },
  // -------------------------------------------------------------------------
  // Properties
  /**
   * Selected option to show when on extra small
   *
   * @property {String}
   */
  selectedOption: null,
  /**
   * Collection that contains the lesson performance models for this unit
   *
   * @property {Ember.Array}
   */
  lessons:null,
  /**
   * Number of the index of this unit
   *
   * @property {Number}
   */
  localIndex:null,
  /**
   * Model of the class this unit belongs to
   *
   * @property {Class}
   */
  classModel:null,
  /**
   * UserID this user belongs to
   *
   * @property {String}
   */
  userId:'',
  /**
   * Performance model for the unit
   *
   * @property {performance/performance}
   */
  performance:null,

  /**
   * @prop {Boolean}
   * Property that determines whether we are waiting for a promise to get fulfilled.
   */
  isLoading:false,

  // -------------------------------------------------------------------------

  // Methods

  /**
   * Get all the lessons for the unit
   *
   * @function
   * @requires api-sdk/lesson#findByClassAndCourseAndUnit
   * @returns {Ember.RSVP.Promise}
   */
  loadLessons: function(unitId) {
    const component = this;
    component.set('isLoading',true);
    if(!component.get('lessons')){
      component.get("performanceService").findLessonPerformanceByClassAndCourseAndUnit(
        component.get('userId'),
        component.get('classModel').id,
        component.get('classModel').course,
        unitId).then(function(result){
          component.set('lessons',result);
          component.set('isLoading',false);
        });
    }
  }
});
