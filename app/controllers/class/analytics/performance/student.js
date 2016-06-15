import Ember from 'ember';
import {download} from 'gooru-web/utils/csv';

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

  queryParams: ['filterBy', 'unitId', 'lessonId'],

  classController: Ember.inject.controller('class'),

  performanceService: Ember.inject.service('api-sdk/performance'),

  // -------------------------------------------------------------------------
  // Actions
  actions:{
    /**
    * Triggered when a filter option is selected
    * @param {string} option
    */
    selectFilterBy: function(option) {
      this.set("filterBy", option);
      this.set('selectedFilterBy', option);
    },

    optionsChange:function(options){
      this.set('selectedOption',options[0].get("value"));
    },

    updateLocation:function(newLocation, type){
      const location = !newLocation ? null : newLocation;
      if (type === 'lesson') {
        this.set('lessonId', location);
      } else if (type === 'unit') {
        this.set('unitId', location);
        this.set('lessonId', null);
      }
    },

    /**
     * When clicking at the download button
     */
    download: function(){
      const data = {
        fields: ['First Name', "Last Name"],
        data: [
          ['Javier', 'P'],
          ['David', 'P']
        ]
      };
      const fileName = "student-performance";
      //Data and File name are examples at this point
      download(fileName, data);
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
   * A link to the computed property isStudent in class controller
   * @see controllers/class.js
   * @property {isStudent}
   */
  isStudent: Ember.computed.alias('classController.isStudent'),

  /**
   * The performances for the units that will be shown to the user
   * @property {Ember.Array}
   */
  "performances": null,

  /**
   * The selected option from the data picker.
   * @property {String}
   */
  selectedOption: 'score',

  /**
   * The current selected class model for the student
   * @property {Class}
   */
  "classModel":null,
  /**
   * The userId for the student
   * @property {String}
   */
  userId:null,
  /**
   * The unitId for the current unit
   * @property {String}
   */
  unitId:null,

  /**
   * The lessonId for the current lesson
   * @property {String}
   */
  lessonId:null,

  /**
   * The filterBy selected
   * @property {String}
   */
  filterBy: 'both',

  /**
   * The selected filter by from the drop down
   * @property {String}
   */
  selectedFilterBy: 'both',

  /**
   * The units of the selected class
   * @property {Object[]}
   */
  units: [],

  /**
   * If analytics is fullscreen
   * @property {Boolean}
   */
  isFullScreen:  Ember.computed.alias('classController.isFullScreen'),

  /**
   * Boolean that determines whether the route model has not finished loading.
   * @property {Boolean}
   */
  currentlyLoading: null,

  // -------------------------------------------------------------------------
  // Observers

  selectedFilterByObserver: Ember.observer('selectedFilterBy', function() {
    const controller = this;
    controller.set('performances', []);
    const filterBy = controller.get('selectedFilterBy');
    const units = controller.get('units');
    const userId = controller.get('userId');
    const classModel = controller.get('classModel');
    const classId= classModel.get('id');
    const courseId = classModel.get('courseId');
    controller.get('performanceService').findStudentPerformanceByCourse(userId, classId, courseId, units, {collectionType: filterBy})
      .then(function(unitPerformances) {
        controller.set('performances', unitPerformances);
      });
  })

  // -------------------------------------------------------------------------
  // Methods

});
