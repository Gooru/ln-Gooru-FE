import Ember from 'ember';
import {
  PLAYER_EVENT_SOURCE
} from 'gooru-web/config/config';
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
  startDate: null,

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
  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Actions

  actions: {
    onScheduleEndDate(date) {
      let component = this;
      let startDate = component.get('startDate');
      component.set('endDate', date);
      component.sendAction('onScheduleForDate', startDate, date, true);
    },

    onScheduleStartDate(date) {
      let component = this;
      component.set('startDate', date);
      if (!component.get('isOfflineActivity')) {
        component.sendAction('onScheduleForDate', date, date, false);
      }
    },

    onScheduleCAForMonth(forMonth, forYear) {
      let component = this;
      component.sendAction('onScheduleForMonth', forMonth, forYear, false);
    },

    onScheduleOAForMonth(month) {
      let component = this;
      let forMonth = month.get('monthNumber');
      let forYear = month.get('monthYear');
      component.sendAction('onScheduleForMonth', forMonth, forYear, true);
    }
  }
});
