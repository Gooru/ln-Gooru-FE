import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['teacher', 'performance-manual-entry'],

  didInsertElement() {
    let component = this;
    component.openPullUp();
  },

  actions: {
    onClosePerformanceEntry() {
      let component = this;
      component.closePullUp();
    }
  },

  isShowPullUp: false,


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
