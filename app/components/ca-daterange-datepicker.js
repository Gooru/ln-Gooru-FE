import Ember from 'ember';
import { SCREEN_SIZES } from 'gooru-web/config/config';
import { isCompatibleVW } from 'gooru-web/utils/utils';
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['ca-daterange-picker'],
  // -------------------------------------------------------------------------
  // Properties

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
   * Enable future date as editable
   */
  enableFutureDate: true,

  enableScheduleMoth: Ember.computed.alias('enableFutureDate'),

  /**
   * @property {Boolean} isMobileView
   * Property to handle is mobile view
   */
  isMobileView: isCompatibleVW(SCREEN_SIZES.MEDIUM),

  isValid: Ember.computed('allowTwoDateRangePicker', 'endDate', function() {
    let component = this;
    return (
      (component.get('allowTwoDateRangePicker') && component.get('endDate')) ||
      (!component.get('allowTwoDateRangePicker') && component.get('startDate'))
    );
  }),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    close() {
      let component = this;
      component.sendAction('closeDatePicker');
    },

    submitDate() {
      let component = this;
      let startDate = component.get('startDate');
      let endDate = component.get('endDate');
      component.sendAction('onScheduleForDate', startDate, endDate);
      component.send('close');
    },

    onSelectTab(index) {
      let component = this;
      component.set('selectedTabIndex', index);
    },

    onScheduleEndDate(date) {
      let component = this;
      component.set('endDate', date);
    },

    onScheduleStartDate(startDate) {
      let component = this;
      component.set('startDate', startDate);
      if (!component.get('allowTwoDateRangePicker')) {
        component.sendAction('onScheduleForDate', startDate, startDate);
      }
    },

    onScheduleForMonth(month) {
      let component = this;
      let forMonth = month.get('monthNumber');
      let forYear = month.get('monthYear');
      component.sendAction('onScheduleForMonth', forMonth, forYear);
    }
  }
});
