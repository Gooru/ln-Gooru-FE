import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['teacher', 'performance-manual-entry'],

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    let component = this;
    component.openPullUp();
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    //Action triggered when close perf entry pullup
    onClosePerformanceEntry() {
      let component = this;
      component.closePullUp();
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Boolean} isShowPullUp
   */
  isShowPullUp: false,

  // -------------------------------------------------------------------------
  // Methods
  openPullUp() {
    let component = this;
    component.$().animate(
      {
        top: '5%'
      },
      400
    );
  },

  closePullUp() {
    let component = this;
    component.$().animate(
      {
        top: '100%'
      },
      400,
      function() {
        component.set('isShowPullUp', false);
      }
    );
  }
});
