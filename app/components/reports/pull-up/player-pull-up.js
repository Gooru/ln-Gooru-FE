import Ember from 'ember';
import { PLAYER_EVENT_MESSAGE } from 'gooru-web/config/config';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['player', 'player-pull-up'],
  classNameBindings: ['player-background'],

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
    const component = this;
    Ember.$(document.body).addClass('iframe-panel');
    component.openPullUp();
    let content = component.get('playerContent');
    if (content.format === 'collection') {
      component.set('player-background', 'collection');
    } else {
      component.set('player-background', 'assessment');
    }
  },

  didReceiveAttrs() {
    const component = this;
    /**
     * method used to listen the events from iframe.
     **/
    function receiveMessage(event) {
      if (event.data === PLAYER_EVENT_MESSAGE.GRU_PUllUP_CLOSE) {
        component.send('closePlayer');
      } else if (event.data === PLAYER_EVENT_MESSAGE.GRU_LOADING_COMPLETED) {
        if (!component.get('isDestroyed')) {
          component.set('isLoading', false);
        }
      }
    }
    window.addEventListener('message', receiveMessage, false);
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    closePlayer: function() {
      const component = this;
      let classId = component.get('playerContent.classId');
      if (classId) {
        component
          .get('router')
          .transitionTo('student.class.course-map', classId);
      } else {
        component.closePullUp();
      }
    }
  },

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
        Ember.$(document.body).removeClass('iframe-panel');
        component.sendAction('onclosePullUp');
      }
    );
  }
});
