import Ember from 'ember';

export default Ember.Controller.extend({
  timeData: null,
  barChartData: null,
  //navMathSubjectCode
  subjectCode: null,

  offsetlimit: 1,

  mileStone: Ember.computed(function() {
    return {
      iconClass: 'msaddon',
      offset: {
        left: '-20px'
      }
    };
  }),
  actions: {
    mileStoneHandler: function() {
      this.transitionToRoute('study-player');
    },
    scrollRight: function() {
      this.send('scrollRRight');
    },
    scrollLeft: function() {
      this.send('scrollLLeft');
    }
  }
});
