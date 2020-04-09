import Ember from 'ember';
import { SCREEN_SIZES } from 'gooru-web/config/config';
import { isCompatibleVW, formatimeToDateTime } from 'gooru-web/utils/utils';
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
  startDate: moment().format('YYYY-MM-DD'),

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
  userStartDateAsToday: true,

  /**
   * Enablr scheduled month
   */
  enableScheduleMonth: true,

  /**
   * Maintain course active date
   */

  courseStartDate: null,

  /**
   * Disable future Date
   */
  disableFutureDate: true,

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

  /**
   * Change start date datepicker navigation month
   */

  forChangeStartDateNavMonth: false,

  /**
   * @property {Boolean} hasVideoConference used to toggle activity popup
   */
  hasVideoConference: false,

  /**
   * @property {Boolean} isAddActivity used to toggle activity popup
   */
  isConferenceAllow: false,

  /**
   * @property {Boolean} enableVideoConference used to enable conference card
   */
  enableVideoConference: false,

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
      if (
        !this.get(
          'enableVideoConference' && !component.get('allowTwoDateRangePicker')
        )
      ) {
        component.sendAction('onScheduleForDate', startDate, startDate);
      }
    },

    onScheduleForMonth(month) {
      let component = this;
      let forMonth = month.get('monthNumber');
      let forYear = month.get('monthYear');
      if (!this.get('enableVideoConference')) {
        component.sendAction('onScheduleForMonth', forMonth, forYear);
      }
    },

    /**
     * @function onAddActivity  add class activity
     */
    onAddSheduledActivity(content) {
      let startDate = this.get('startDate');
      let endDate = !this.get('allowTwoDateRangePicker')
        ? startDate
        : this.get('endDate');
      content.set(
        'meetingStartTime',
        formatimeToDateTime(startDate, content.get('meetingStartTime'))
      );

      content.set(
        'meetingEndTime',
        formatimeToDateTime(endDate, content.get('meetingEndTime'))
      );
      if (this.get('allowTwoDateRangePicker')) {
        this.sendAction('onScheduleForDate', startDate, endDate, content);
      } else {
        this.sendAction('onScheduleForDate', startDate, startDate, content);
      }
    },

    /**
     * @function onToggleCheckbox  action trigger when click toggle checkbox
     */
    onToggleCheckbox() {
      this.set('isConferenceAllow', true);
    },

    /**
     * @function onDeny  action trigger when click deny
     */
    onDeny() {
      this.set('isConferenceAllow', false);
      this.set('hasVideoConference', false);
    },
    /**
     * @function onDeny  action trigger when click deny
     */
    onAllow() {
      this.set('isConferenceAllow', false);
      this.set('hasVideoConference', true);
    }
  }
});
