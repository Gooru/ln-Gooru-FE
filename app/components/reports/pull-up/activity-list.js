import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['activity-list-pull-up'],

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    let component = this;
    component.openPullUp();
  },

  didDestroyElement() {
    this.set('activityContents', Ember.A([]));
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Action triggered when close pull up
     */
    onClosePullUp(closeAll) {
      let component = this;
      component.closePullUp(closeAll);
    },

    /**
     * Action triggered when click show more activity
     */
    onClickShowMoreActivity() {
      let component = this;
      component.sendAction('onClickShowMoreActivity');
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Propery to hide the default pullup.
   * @property {showPullUp}
   */
  showPullUp: false,

  /**
   * @property {String} type
   */
  type: '',

  /**
   * @property {Boolean} isShowMoveVisible
   */
  isShowMoveVisible: Ember.computed('activityContents', function() {
    let component = this;
    let offsetCount = component.get('offsetCount');
    let numberOfActivityContents = component.get('activityContents.length');
    return offsetCount === numberOfActivityContents && offsetCount >= 5;
  }),

  // -------------------------------------------------------------------------
  // Methods
  /**
   * Function to animate the  pullup from bottom to top
   */
  openPullUp() {
    let component = this;
    component.$().animate(
      {
        top: '9%'
      },
      400
    );
  },

  closePullUp(closeAll) {
    let component = this;
    component.$().animate(
      {
        top: '100%'
      },
      400,
      function() {
        component.set('showPullUp', false);
        component.sendAction('onResetPullUpData');
        if (closeAll) {
          component.sendAction('onClosePullUp');
        }
      }
    );
  }
});
