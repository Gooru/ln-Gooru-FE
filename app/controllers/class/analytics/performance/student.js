import Ember from 'ember';

/**
 * Student Analytics Performance Controller
 *
 * Controller responsible of the logic for the student performance
 *
 * @module
 * @see routes/analytics/performance/student.js
 * @augments ember/Controller
 */
export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  classController: Ember.inject.controller('class'),
  queryParams: ['filterBy'],

  // -------------------------------------------------------------------------
  // Actions
  actions:{
    /**
    * Triggered when a filter option is selected
    * @param {string} option
    */
    selectFilterBy: function(option){
      this.set("filterBy", option);
    },

    optionsChange:function(options){
      //TO DO
      console.log(options);
    }
  },
  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties
  /**
   * A link to the parent class controller
   * @see controllers/class.js
   * @property {Class}
   */
  "class": Ember.computed.reads('classController.class'),

  /**
   * The filterBy selected
   * @property {String}
   */
  filterBy: 'assessment',

  breadcrumb: Ember.A([
    {
      value: '111',
      label: 'Course Name'
    },
    {
      value: '222',
      label: 'Unit number one'
    },
    {
      value: '333',
      label: 'Lesson number one'
    },
    {
      value: '444',
      label: 'Collection one with a long name'
    }
  ])
  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

});
