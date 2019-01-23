import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['oca-summary-report-pull-up'],

  /**
   * @requires service:api-sdk/analytics
   */
  analyticsService: Ember.inject.service('api-sdk/analytics'),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Array<Object>}
   */
  reportData: null,

  /**
   * Propery of class id
   * @property {Number}
   */
  classId: null,

  /**
   * @property {Object}
   */
  performanceSummary: null,

  /**
   * @property {Number}
   */
  timeSpent: null,

  /**
   * Propery to hide the default pullup.
   * @property {Boolean}
   */
  showPullUp: false,

  /**
   * @property {Boolean}
   */
  isShowOCAMonthReportPullUp: false,

  /**
   * @property {Object}
   */
  selectedMonthSummary: null,

  actions: {
    onPullUpClose() {
      let component = this;
      component.closePullUp();
    },

    closePullUp(closeAll) {
      let component = this;
      component.set('isShowOCAMonthReportPullUp', false);
      if (closeAll) {
        component.closePullUp();
      }
    },

    onSelectMonth(selectedSummaryItem) {
      let component = this;
      component.set('selectedMonthSummary', selectedSummaryItem);
      component.set('isShowOCAMonthReportPullUp', true);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  didInsertElement() {
    this.openPullUp();
    this.handleAppContainerScroll();
  },

  didDestroyElement() {
    this.handleAppContainerScroll();
  },

  init() {
    let component = this;
    component._super(...arguments);
    component.getYearlySummaryData();
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
  closePullUp() {
    let component = this;
    component.$().animate(
      {
        top: '100%'
      },
      400,
      function() {
        component.set('showPullUp', false);
        component.sendAction('onClosePullUp');
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

  /**
   * Function to get yearly summary report
   */
  getYearlySummaryData() {
    let component = this;
    const classId = component.get('classId');
    let dcaYearlySummaryPromise = component
      .get('analyticsService')
      .getDCAYearlySummary(classId);
    Ember.RSVP.hash({
      dcaYearlySummary: dcaYearlySummaryPromise
    }).then(function(hash) {
      let dcaYearlySummary = hash.dcaYearlySummary;
      let summarySortedByMonth = dcaYearlySummary.sortBy('month');
      component.set('reportData', summarySortedByMonth);
      component.calculateTimeSpent();
    });
  },

  /**
   * Function to calculate timespent
   */
  calculateTimeSpent() {
    let component = this;
    let reportData = component.get('reportData');
    let timeSpent = null;
    reportData.forEach(summary => {
      timeSpent += summary.timeSpent ? summary.timeSpent : 0;
    });
    component.set('timeSpent', timeSpent);
  }
});
