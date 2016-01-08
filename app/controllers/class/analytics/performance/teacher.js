import Ember from 'ember';

/**
 * Teacher Analytics Performance Controller
 *
 * Controller responsible of the logic for the teacher performance
 *
 * @module
 * @see routes/analytics/performance/teacher.js
 * @augments ember/Controller
 */
export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  queryParams: ['filterBy'],

  classController: Ember.inject.controller('class'),

  // -------------------------------------------------------------------------
  // Actions
  actions:{
    /**
     * Triggered when a filter option is selected
     * @param {string} option
     */
    optionsChange:function(options){
      this.set('selectedOptions', options.map(function(option){
        return option.get("value");

      }));
    },

    /**
     * Triggered when the breadcrumb item is selected
     * @param {*} item
     */
    selectBreadcrumbItem: function(item){
      Ember.log(item);
    },
    /**
     * Triggered when a filter option is selected
     * @param {string} option
     */
    selectFilterBy: function(option){
      this.set("filterBy", option);
    },

    /**
     * Triggered when the user toggles between normal and full screen mode
     */
    toggleFullScreen: function () {
      return this.get("classController").toggleFullScreen();
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

  /**
   * List of selected options from the data picker.
   * @property {Array}
   */
  selectedOptions: Ember.A(["score"]),

  /**
   * If analytics is fullscreen
   * @property {Boolean}
   */
  isFullScreen:  Ember.computed.alias('classController.isFullScreen'),

  /**
   * List of breadcrumbs.
   * @property {Array}
   */
  breadcrumb: Ember.A(),

  /**
   * List of  options specific to teacher to be displayed by the component Data picker
   *
   * Only to validate acceptance criteria 6 "The data picker could received which options are selectable by default"
   *
   * @constant {Array}
   */
  optionsTeacher: Ember.A([Ember.Object.create({
    'value': 'score',
    'selected':true,
    'readOnly':true
  }),Ember.Object.create({
    'value': 'completion',
    'selected':false,
    'readOnly':false
  }),Ember.Object.create({
    'value': 'study-time',
    'selected':false,
    'readOnly':false
  })]),

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  addToBreadCrumb: function(item){
    const breadcrumb = this.get("breadcrumb");
    breadcrumb.pushObject(item);
  }
});
