import Ember from 'ember';

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Attributes

  queryParams: ['entity'],

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Maintains number of secs to wait for redirect.
   * @type {Number}
   */
  counter: 10,

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    loginAsGooru() {
      this.transitionToRoute('/sign-in');
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  init() {
    let controller = this;
    controller.set('counter', 10);
    controller.timer = setInterval(() => {
      let count = controller.get('counter') * 1 - 1;
      if (count <= 0) {
        controller.set('counter', 0);
        clearInterval(controller.timer);
        controller.transitionToRoute('/sign-in');
      } else {
        controller.set('counter', count);
      }
    }, 1000);
  },

  destroy() {
    this._super(...arguments);
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
});
