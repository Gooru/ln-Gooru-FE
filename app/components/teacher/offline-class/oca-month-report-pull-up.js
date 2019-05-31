import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['oca-month-report-pull-up'],

  /**
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service('api-sdk/class-activity'),

  /**
   * Propery of class id
   * @property {Number}
   */
  classId: null,

  /**
   * Propery of context from parent
   * @property {Object}
   */
  context: null,

  /**
   * Propery of class activities
   * @property {Array}
   */
  classActivities: null,

  /**
   * Propery of selected activity
   * @property {Object}
   */
  selectedActivity: null,

  /**
   * Propery to hide the default pullup.
   * @property {Boolean}
   */
  showPullUp: false,

  /**
   * @property {Boolean}
   */
  isShowStudentsSummaryReport: false,

  /**
   * @property {Boolean}
   */
  isLoading: false,

  allSummaryData: null,

  contextObserver: Ember.observer('context', function() {
    this.loadData();
  }),

  selectedIndex: Ember.computed('context', function() {
    let component = this;
    let selectedSummary = component.get('context');
    let allSummary = component.get('allSummaryData');
    return allSummary.indexOf(selectedSummary);
  }),

  isToggleLeft: Ember.computed('context', function() {
    let component = this;
    let selectedIndex = component.get('selectedIndex');
    return selectedIndex > 0;
  }),

  isToggleRight: Ember.computed('context', function() {
    let component = this;
    let selectedIndex = component.get('selectedIndex');
    let length = component.get('allSummaryData').length;
    return selectedIndex < length - 1;
  }),

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
    },

    toggle(isLeft) {
      let component = this;
      let currentIndex = component.get('selectedIndex');
      let allSummary = component.get('allSummaryData');
      let indexPosition = isLeft ? currentIndex - 1 : currentIndex + 1;
      let summary = allSummary.objectAt(indexPosition);
      if (summary) {
        component.set('context', summary);
      }
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
    component.loadData();
  },

  /**
   * Function to animate the  pullup from bottom to top
   */
  openPullUp() {
    let component = this;
    component.set('showPullUp', true);
    component.$().animate({
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
    component.$().animate({
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
    let forMonth = component.get('context.month');
    let forYear = component.get('context.year');
    let startDate = `${forYear}-${forMonth}-01`;
    var endDate = moment(startDate).endOf('month').format('YYYY-MM-DD');
    const classId = component.get('classId');
    component.set('isLoading', true);
    Ember.RSVP.hash({
      classActivities: component
        .get('classActivityService')
        .getPerformanceOfClassActivitiesForMonth(classId, startDate, endDate)
    }).then(function(hash) {
      component.set('classActivities', hash.classActivities);
      component.set('isLoading', false);
    });
  }
});
