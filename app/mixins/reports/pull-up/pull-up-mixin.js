import Ember from 'ember';

export default Ember.Mixin.create({
  //--------------------------------------------------------------------------
  // Methods

  populatedTopPos: '10%',

  showPullUp: false,

  actions: {
    onClosePullUp() {
      this.closePullUp();
    }
  },

  /**
   * Function to animate the  pullup from bottom to top
   */
  openPullUp() {
    const mixin = this;
    let populatedTopPos = mixin.get('populatedTopPos');
    mixin.$().animate(
      {
        top: populatedTopPos
      },
      400
    );
  },

  /**
   * Method to close pullup
   */
  closePullUp() {
    const mixin = this;
    mixin.$().animate({
      top: '100%'
    },
    400,
    function() {
      mixin.set('showPullUp', false);
    });
  }
});
