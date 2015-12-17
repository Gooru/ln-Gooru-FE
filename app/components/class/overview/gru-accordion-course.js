import Ember from 'ember';
import AccordionMixin from '../../../mixins/gru-accordion';

var startLocation;

/**
 * Accordion Course
 *
 * Component responsible for behaving as an accordion and listing a set of units
 * and the users participating in each unit.
 *
 * @module
 * @augments Ember/Component
 * @mixes mixins/gru-accordion
 */
export default Ember.Component.extend(AccordionMixin, {

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @requires service:api-sdk/unit
   */
  unitService: Ember.inject.service("api-sdk/unit"),

  /**
   * @requires service:api-sdk/course-location
   */
  courseLocationService: Ember.inject.service("api-sdk/course-location"),

  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-accordion', 'gru-accordion-course'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     * @function actions:selectItem
     * @param {string} collectionId - Identifier for a collection or assessment
     * @see components/class/overview/gru-accordion-lesson
     */
    selectItem: function(collectionId) {
      // Send the action so that it bubbles up to the route
      this.sendAction('onSelectItem', collectionId);
    }

  },


  // -------------------------------------------------------------------------
  // Events
  setupAccordionCourse: Ember.on('init', function() {
    // Load the units and users in the course when the component is instantiated
    var itemsPromise = this.getUnits();
    this.set('items', itemsPromise);

    // TODO: getCourseUsers is currently dependent on items that's why this declaration
    // takes place after setting items. Once api-sdk/course-location is complete
    // both declarations can be put together, as they should
    var usersLocation = this.getCourseUsers();
    this.set('usersLocation', usersLocation);
  }),

  // -------------------------------------------------------------------------
  // Properties

  currentResource: Ember.computed('userLocation', function () {
    const userLocation = this.get('userLocation');
    var parsedLocation = userLocation.split('+');
    var currentResource = null;

    if (parsedLocation.length === 3) {
      currentResource = parsedLocation[2];
    } else {
      Ember.Logger.warn('The user location does not specify a current resource');
    }
    return currentResource;
  }),

  /**
   * @prop {String} location - Current location that the user has navigated to
   * Combination of unit, lesson and/or resource (collection or assessment) separated by a plus sign
   * @example
   * 'uId001+lId002+cId003'
   */
  location: null,

  /**
   * @prop {String} openLocation - Location the accordions should be open to
   * @param {String} location - Should be bound to the URL query param
   * @see module:app/controllers/controllers/class/overview#location
   * @param {String} userLocation
   *
   * If there's no recollection of a previous location, the return value will
   * be 'location' if it's not empty; otherwise, it returns 'userLocation'.
   * If a previous location has been set, it will return 'location'
   * if 'location' is equal to 'userLocation', otherwise, it will return
   * an empty string.
   * @return {String}
   */
  openLocation: Ember.computed('location', 'userLocation', function () {
    var location;

    if (!startLocation) {
      location = (this.get('location')) ? this.get('location') : this.get('userLocation');
      startLocation = location;
    } else {
      location = (this.get('location') === this.get('userLocation')) ? this.get('userLocation') : '';
    }
    return location;
  }),

  /**
   * @prop {String} userLocation - Location of a user in a course
   */
  userLocation: null,

  /**
   * @prop {Ember.RSVP.Promise} usersLocation - Users enrolled in the course
   * Will resolve to {Location[]}
   */
  usersLocation: null,

  // -------------------------------------------------------------------------
  // Observers

  /**
   * Observe when the 'items' promise has resolved and proceed to add the
   * corresponding users information (coming from a separate service) to each
   * one of the items so they are resolved in one single loop in the template.
   */
  addUsersToItems: Ember.observer('items.isFulfilled', function() {
    if (this.get('items.isFulfilled')) {
      let visibleItems = this.get('visibleItems');

      this.get('usersLocation').then((usersLocation) => {
        visibleItems.forEach((item) => {
          // Get the users for a specific unit
          let entity = usersLocation.findBy('unit', item.get('id'));
          if (entity) {
            entity.get('locationUsers').then((locationUsers) => {
              item.set('users', locationUsers);
            });
          }
        });
      }).catch((e) => {
        Ember.Logger.error('Unable to retrieve course users: ', e);
      });
    }
  }),

  // -------------------------------------------------------------------------
  // Methods
  /**
   * Get all the units in a course
   *
   * @function
   * @requires api-sdk/unit#findByClassAndCourse
   * @returns {Ember.RSVP.Promise}
   */
  getUnits: function() {
    const classId = this.get('currentClass.id');
    const courseId = this.get('currentClass.course');

    return this.get("unitService").findByClassAndCourse(classId, courseId);
  },

  /**
   * Get all the users in the course
   *
   * @function
   * @requires service:api-sdk/course-location#findByCourse
   * @returns {Ember.RSVP.Promise}
   */
  getCourseUsers: function() {
    const courseId = this.get('currentClass.course');

    //return this.get("courseLocationService").findByCourse(courseId);

    // TODO: remove this after api-sdk/course-location is complete
    const component = this;
    return this.get('items').then((items) => {
      return component.get("courseLocationService").findByCourse(courseId, { units: items});
    });
  }

});
