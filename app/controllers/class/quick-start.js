import Ember from "ember";
import ModalMixin from 'gooru-web/mixins/modal';
/**
 * Class quick start controller
 *
 * Controller responsible of the logic for the class quick start page
 */
export default Ember.Controller.extend(ModalMixin,{

  // -------------------------------------------------------------------------
  // Dependencies
  classController: Ember.inject.controller('class'),

  classService: Ember.inject.service('api-sdk/class'),

  searchService: Ember.inject.service('api-sdk/search'),

  // -------------------------------------------------------------------------
  // Attributes


  // -------------------------------------------------------------------------
  // Actions
  actions: {
    loadFeaturedCourses: function() {
      var controller = this;
      controller.get('searchService').searchFeaturedCourses('*')
        .then(function(featuredCourses) {
          controller.set('featuredCourses', featuredCourses);
          controller.send('showModal', "content.modals.gru-quick-course-search",
            controller.get('modelForFeaturedCoursesModal'), null, null, "quick-course-search");
        });
    }
  },

  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties

  class: null,
  courses: null,
  featuredCourses: null,
  modelForCoursesModal: Ember.computed('class', 'courses', function() {
    return Ember.Object.create({
      'classId': this.get('class.class.id'),
      'courses': this.get('courses')
    });
  }),
  modelForFeaturedCoursesModal: Ember.computed('class', 'featuredCourses', function(){
    return Ember.Object.create({
      'classId': this.get('class.class.id'),
      'courses': this.get('featuredCourses'),
      'areFeatured':true
    });
  }),

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods


});
