import Ember from 'ember';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service("api-sdk/class"),


  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function() {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  /**
   * Get model for the controller
   */
  model: function(params) {
    const selectedClass = this.get("classService").findById(params.classId);

    return Ember.RSVP.hash({
      class: selectedClass
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    const selectedClass = model.class;
    controller.set("class", selectedClass);
  },

  // Actions

  actions: {
    /**
     * Triggered when a class menu item is selected
     * @param {string} item
     */
    selectMenuItem: function(item){
      const
        route = this,
        currentMenuItem = route.get("controller.menuItem");

      route.set("controller.menuItem", item);
      if (currentMenuItem !== item) {
        route.transitionTo('class.' + item);
      }
    }
  }
});
