import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['player', 'player-pull-up'],

  //--------------------------------------------------------------------------
  //property

  /**
   * Indicates the status of the spinner
   * @property {Boolean}
   */
  isLoading: false,

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    Ember.$(document.body).addClass('iframe-panel');
    this.openPullUp();
  },

  didReceiveAttrs() {
    const component = this;
    /**
     * method used to listen the events from iframe.
     **/
    function receiveMessage(event) {
      if (event.data === 'PUllUP_CLOSE') {
        component.closePullUp();
      } else if (event.data === 'LOADING_COMPLETED') {
        component.set('isLoading', false);
      }
    }
    window.addEventListener('message', receiveMessage, false);
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {},

  //--------------------------------------------------------------------------
  // Methods

  /**
   * Function to animate the  pullup from bottom to top
   */
  openPullUp() {
    const component = this;
    component.set('isLoading', true);
    component.$().animate(
      {
        bottom: '0'
      },
      400
    );
  },

  closePullUp() {
    const component = this;
    component.$().animate(
      {
        bottom: '100%'
      },
      400,
      function() {
        component.sendAction('onclosePullUp');
        Ember.$(document.body).removeClass('iframe-panel');
      }
    );
  }
});
