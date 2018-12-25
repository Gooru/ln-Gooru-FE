import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['chrono-timeline'],

  timeData: null,

  activeResource: null,

  activeIndex: null,

  actions: {
    onSelectCard(cardPos) {
      let component = this;
      component.animateCardTransition(cardPos);
    }
  },


  init() {
    let component = this;
    component._super(...arguments);
    let midLen = component.get('timeData').length / 2;
    let activeResource = component.get('timeData')[midLen];
    component.set('activeResource', activeResource);
    component.set('activeIndex', midLen);
  },

  didRender() {
    let component = this;
    component.setDefaultClasses();
  },


  moveToSelected(element) {
    let component = this;
    var selected = element;
    var next = component.$(selected).next();
    var prev = component.$(selected).prev();
    var prevSecond = component.$(prev).prev();
    var nextSecond = component.$(next).next();
    var prevThird = component.$(prevSecond).prev();
    var nextThird = component.$(nextSecond).next();
    var prevFourth = component.$(prevThird).prev();
    var nextFourth = component.$(nextThird).next();
    component.$(selected).removeClass().addClass('selected');
    component.$(prev).removeClass().addClass('prev');
    component.$(next).removeClass().addClass('next');
    component.$(nextSecond).removeClass().addClass('nextRightSecond');
    component.$(prevSecond).removeClass().addClass('prevLeftSecond');
    component.$(nextThird).removeClass().addClass('nextRightThird');
    component.$(prevThird).removeClass().addClass('prevLeftThird');
    component.$(nextFourth).removeClass().addClass('nextRightFourth');
    component.$(prevFourth).removeClass().addClass('prevLeftFourth');
    component.$('.nextRightFourth').nextAll().removeClass().addClass('hideRight');
    component.$('.prevLeftFourth').prevAll().removeClass().addClass('hideLeft');
  },

  setDefaultClasses() {
    let activeCard = this.get('activeIndex');
    let component = this;
    let activeCartContainer = component.$(`.card-${activeCard}`);
    component.$(activeCartContainer).addClass('selected');
    component.$(activeCartContainer).prev().addClass('prev');
    component.$(activeCartContainer).prev().prev().addClass('prevLeftSecond');
    component.$(activeCartContainer).prev().prev().prev().addClass('prevLeftThird');
    component.$(activeCartContainer).prev().prev().prev().prev().addClass('prevLeftFourth');
    component.$(activeCartContainer).prev().prev().prev().prev().prevAll().addClass('hideLeft');
    component.$(activeCartContainer).next().addClass('next');
    component.$(activeCartContainer).next().next().addClass('nextRightSecond');
    component.$(activeCartContainer).next().next().next().addClass('nextRightThird');
    component.$(activeCartContainer).next().next().next().next().addClass('nextRightFourth');
    component.$(activeCartContainer).next().next().next().next().nextAll().addClass('hideRight');

  },

  animateCardTransition(cardPos) {
    let component = this;
    component.moveToSelected(`.${cardPos}`);
    component.$('.class-activities > div').addClass('student-activity card');
    let cards = component.$('.class-activities > div');
    cards.each(function(index, elem) {
      component.$(elem).addClass(`card-${index + 1}`);
    });
  }
});
