import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['teacher', 'performance-manual-entry'],

  didInsertElement() {
    let component = this;
    component.openPullUp();
  },

  actions: {
    onClosePullUp() {
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

  closePullUp(closeAll) {
    let component = this;
    component.$().animate(
      {
        top: '100%'
      },
      400,
      function() {
        component.set('isShowPullUp', false);
        // if (closeAll) {
        //   component.sendAction('onClosePullUp');
        // }
      }
    );
  }
});
