import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['oca-month-report-pull-up'],

  /**
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service('api-sdk/class-activity'),

  classId: null,

  context: null,

  classActivities: null,

  selectedActivity: null,

  /**
   * Propery to hide the default pullup.
   * @property {showPullUp}
   */
  showPullUp: false,

  isShowStudentsSummaryReport: false,

  isLoading: false,

  actions: {
    onPullUpClose(closeAll) {
      let component = this;
      component.closePullUp(closeAll);
    },

    pullUpClose(closeAll) {
      let component = this;
      component.set('isShowStudentsSummaryReport', false);
      if (closeAll) {
        component.closePullUp(closeAll);
      }
    },

    onSelectActivity(activity) {
      let component = this;
      component.set('selectedActivity', activity);
      component.set('isShowStudentsSummaryReport', true);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  didInsertElement() {
    this.openPullUp();
  },

  didRender() {
    this.handleAppContainerScroll();
  },
  didDestroyElement() {
    this.handleAppContainerScroll();
  },

  init() {
    let component = this;
    component._super(...arguments);
    component.loadData();
  },

  /**
   * Function to animate the  pullup from bottom to top
   */
  openPullUp() {
    let component = this;
    component.set('showPullUp', true);
    component.$().animate(
      {
        top: '10%'
      },
      400
    );
  },

  /**
   * Function to animate the  pullup from top to bottom
   */
  closePullUp(closeAll) {
    let component = this;
    component.$().animate(
      {
        top: '100%'
      },
      400,
      function() {
        component.set('showPullUp', false);
        component.sendAction('onClosePullUp', closeAll);
      }
    );
  },

  /**
   * Function to hanle the pullup scroll
   */
  handleAppContainerScroll() {
    let activePullUpCount = Ember.$(document.body).find('.backdrop-pull-ups')
      .length;
    if (activePullUpCount > 0) {
      Ember.$(document.body).addClass('no-vertical-scroll');
    } else if (activePullUpCount === 0) {
      Ember.$(document.body).removeClass('no-vertical-scroll');
    }
  },

  loadData() {
    let component = this;
    const classId = component.get('classId');
    let forMonth = component.get('context.month');
    let forYear = component.get('context.year');
    component.set('isLoading', true);
    Ember.RSVP.hash({
      classActivities: component
        .get('classActivityService')
        .findClassActivities(classId, null, forMonth, forYear)
    }).then(function(hash) {
      component.set('classActivities', hash.classActivities);
      component.set('isLoading', false);
    });
  }
});
