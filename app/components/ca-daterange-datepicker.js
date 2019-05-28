import Ember from 'ember';
import {
  PLAYER_EVENT_SOURCE,
  SCREEN_SIZES
} from 'gooru-web/config/config';
import {
  isCompatibleVW
} from 'gooru-web/utils/utils';
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['ca-daterange-picker'],
  // -------------------------------------------------------------------------
  // Properties

  /**
   * Maintains content type of selected activity to schedule
   * @type {Stype}
   */
  contentType: null,

  /**
   * Maintains the value whether activity is offline or not
   * @type {Integer}
   */
  isOfflineActivity: Ember.computed.equal('contentType', PLAYER_EVENT_SOURCE.OFFLINE_CLASS),

  /**
   * Maintains the value which of activity startDate
   * @type {Integer}
   */
  startDate: moment(),

  /**
   * Maintains the value which of activity endDate
   * @type {Integer}
   */
  endDate: null,

  /**
   * Maintains the value which of month activities displaying
   * @type {Integer}
   */
  forMonth: Ember.computed(function() {
    return moment().format('MM');
  }),

  /**
   * Maintains the value which of year activities displaying
   * @type {Integer}
   */
  forYear: Ember.computed(function() {
    return moment().format('YYYY');
  }),

  /**
   * Maintains  the value of first date of month
   * @return {String}
   */
  forFirstDateOfMonth: Ember.computed('forMonth', 'forYear', function() {
    let forMonth = this.get('forMonth');
    let forYear = this.get('forYear');
    let date = `${forYear}-${forMonth}-01`;
    return moment(date).format('YYYY-MM-DD');
  }),

  /**
   * @property {Integer} selectedTabIndex
   * Property to handle selected tab index value
   */
  selectedTabIndex: 0,

  /**
   * @property {Boolean} isMobileView
   * Property to handle is mobile view
   */
  isMobileView: isCompatibleVW(SCREEN_SIZES.MEDIUM),


  isValid: Ember.computed('isOfflineActivity', 'endDate', function() {
    let component = this;
    return component.get('isOfflineActivity') && component.get('endDate') ||
      !component.get('isOfflineActivity') && component.get('startDate');
  }),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    close() {
      let component = this;
      component.set('showDatePicker', false);
    },

    submitDate() {
      let component = this;
      let startDate = component.get('startDate').format('YYYY-MM-DD');
      let endDate = component.get('endDate');
      let formatedEndDate = endDate ? endDate.format('YYYY-MM-DD') : endDate;
      let isOfflineActivity = component.get('isOfflineActivity');
      component.sendAction('onScheduleForDate', startDate, formatedEndDate, isOfflineActivity);
      component.send('close');
    },

    onSelectTab(index) {
      let component = this;
      component.set('selectedTabIndex', index);
    },

    onScheduleEndDate(date) {
      let component = this;
      let startDate = component.get('startDate');
      let isOfflineActivity = component.get('isOfflineActivity');
      component.set('endDate', date);
      if (!component.get('isMobileView')) {
        component.sendAction('onScheduleForDate', startDate, date, isOfflineActivity);
      }
    },

    onScheduleStartDate(startDate) {
      let component = this;
      let isOfflineActivity = component.get('isOfflineActivity');
      component.set('startDate', startDate);
      if (!component.get('isOfflineActivity') && !component.get('isMobileView')) {
        component.sendAction('onScheduleForDate', startDate, startDate, isOfflineActivity);
      }
    },

    onScheduleForMonth(month) {
      let component = this;
      let isOfflineActivity = component.get('isOfflineActivity');
      let forMonth = month.get('monthNumber');
      let forYear = month.get('monthYear');
      component.sendAction('onScheduleForMonth', forMonth, forYear, isOfflineActivity);
    }
  }
});
