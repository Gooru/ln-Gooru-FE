import Ember from 'ember';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {Session} current session
   */
  session: Ember.inject.service("session"),

  /**
   * @type {UserService} Service to retrieve user information
   */
  userService: Ember.inject.service("api-sdk/user"),

  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service("api-sdk/class"),

  /**
   * @type {CourseService} Service to retrieve course information
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @type {UnitService} Service to retrieve unit information
   */
  unitService: Ember.inject.service('api-sdk/unit'),

  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function() {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  /**
   * Get model for the controller
   */
  model: function(params) {
    const route = this;
    const classId = params.classId;
    //const classPromise = this.get("classService").findById(classId);
    //const memberPromise = this.get("userService").findMembersByClass(classId);
    const classPromise = route.get('classService').readClassInfo(classId);
    const membersPromise = route.get('classService').readClassMembers(classId);



    /*
    return classPromise.then(function(classObj) {
      return route.get('unitService').findByClassAndCourse(classId, classObj.get('course')).then(function(units){
        return route.get('courseService').findById(classObj.get('course')).then(function(course){
          return Ember.RSVP.hash({
            class: classObj,
            course: course,
            units: units,
            members: memberPromise
          });
        });
      });
    });
    */
    return Ember.RSVP.hash({
      class: classPromise,
      members: membersPromise
    });

  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    let classModel = model.class;
    console.log(model.members);
    classModel.set('owner', model.members.get('owner'));
    classModel.set('collaborators', model.members.get('collaborators'));
    classModel.set('members', model.members.get('members'));

    controller.set("class", model.class);
    //controller.set("course", model.course);
    //controller.set("units", model.units);
    //controller.set("members", model.members);
  },

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Triggered when a class menu item is selected
     * @param {string} item
     */
    selectMenuItem: function(item){
      const route = this;
      const controller = route.get("controller");
      const aClass = controller.get('class');
      const isTeacher = aClass.isTeacher(this.get("session.userId"));
      controller.selectMenuItem(item);

      if ((item === "analytics.performance") && isTeacher){
        route.transitionTo('class.analytics.performance.teacher.course');
      }
      else {
        route.transitionTo('class.' + item);
      }
    }
  },

  // -------------------------------------------------------------------------
  // Events
  /**
   * This event handlers reset some class properties when leaving the route
   */
  handleDeactivate: function() {
    this.get("controller").exitFullScreen();
  }.on('deactivate')

});
