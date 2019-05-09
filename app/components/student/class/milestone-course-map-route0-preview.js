import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['student-class-milestone-course-map-route0-preview'],

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:session
   */
  session: Ember.inject.service(),

  /**
   * route0 Service to perform route0 data operations
   */
  route0Service: Ember.inject.service('api-sdk/route0'),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Maintains the state of data loading
   * @type {Boolean}
   */
  isLoading: false,

  /**
   * Class Id extract from class object
   * @type {String}
   */
  classId: Ember.computed.alias('class.id'),

  /**
   * Course Id which is mapped to this class.
   * @type {String}
   */
  courseId: Ember.computed.alias('class.courseId'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    updateRoute0: function(status) {
      this.updateRoute0(status);
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  updateRoute0: function(status) {
    let component = this;
    let currentClass = component.get('class');
    let data = {
      classId: currentClass.get('id'),
      courseId: currentClass.get('courseId'),
      status: status
    };
    let route0 = component.get('route0');

    component
      .get('route0Service')
      .updateRouteAction(data)
      .then(() => {
        route0.set('status', status);
      });
  }
});
