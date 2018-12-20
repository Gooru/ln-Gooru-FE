import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['ca-date-picker-container'],

  // -------------------------------------------------------------------------
  // Events

  didInsertElement() {
    this._super(...arguments);
    this.initializeDatePicker();
  },

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    showPreviousMonth() {
      let component = this;
      let forFirstDateOfMonth = component.get('forFirstDateOfMonth');
      let forMonth = moment(forFirstDateOfMonth)
        .subtract(1, 'months')
        .format('MM');
      let forYear = moment(forFirstDateOfMonth)
        .subtract(1, 'months')
        .format('YYYY');
      component.set('forMonth', forMonth);
      component.set('forYear', forYear);
      let datepickerEle = component.$('#ca-datepicker .datepicker-days .prev');
      datepickerEle.trigger('click');
      component.sendAction('showPreviousMonth');
    },

    showNextMonth() {
      let component = this;
      let forFirstDateOfMonth = this.get('forFirstDateOfMonth');
      let forMonth = moment(forFirstDateOfMonth)
        .add(1, 'months')
        .format('MM');
      let forYear = moment(forFirstDateOfMonth)
        .add(1, 'months')
        .format('YYYY');
      component.set('forMonth', forMonth);
      component.set('forYear', forYear);
      let datepickerEle = component.$('#ca-datepicker .datepicker-days .next');
      datepickerEle.trigger('click');
      component.sendAction('showNextMonth');
    },

    showCalendar() {
      this.toggleDatePicker();
    },

    onSelectMonth: function(month) {
      this.sendAction(
        'onSelectMonth',
        month.get('monthNumber'),
        month.get('monthYear')
      );
    }
  },

  // -------------------------------------------------------------------------
  // Properties

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
   * Start date will allow to pick date only future and today dates
   * @type {String}
   */
  startDate: null,

  /**
   * Maintains the state of datepicker display
   * @type {Boolean}
   */
  isInline: false,

  /**
   * If startDate is null and userStartDateAsToday is true, it will takes current date.
   * @type {Boolean}
   */
  userStartDateAsToday: false,

  /**
   * It Maintains the state of month need to display or not.
   * @type {Boolean}
   */
  showMonths: false,

  /**
   * It maintains number of months to show or not
   * @type {Number}
   */
  numberOfMonthsToShow: 3,

  /**
   * It maintains list of months to be display for unschedule contents
   * @return {Array}
   */
  months: Ember.computed('forFirstDateOfMonth', function() {
    let component = this;
    let showMonths = component.get('showMonths');
    let monthsList = Ember.A([]);
    let forFirstDateOfMonth = component.get('forFirstDateOfMonth');
    if (showMonths && forFirstDateOfMonth) {
      let numberOfMonthsToShow = component.get('numberOfMonthsToShow');
      for (let index = 1; index <= numberOfMonthsToShow; index++) {
        let monthName = moment(forFirstDateOfMonth)
          .add(index, 'months')
          .format('MMMM');
        let monthYear = moment(forFirstDateOfMonth)
          .add(index, 'months')
          .format('YYYY');
        let monthNumber = moment(forFirstDateOfMonth)
          .add(index, 'months')
          .format('MM');
        let month = Ember.Object.create({
          monthNumber,
          monthName,
          monthYear
        });
        monthsList.pushObject(month);
      }
    }
    return monthsList;
  }),

  /**
   * It will  whether calender toggle allowed or not.
   * @type {Boolean}
   */
  allowDateSelectorToggle: false,

  // -------------------------------------------------------------------------
  // Methods

  initializeDatePicker: function() {
    let component = this;
    let datepickerEle = component.$('#ca-datepicker');
    let defaultParams = {
      maxViewMode: 0,
      format: 'yyyy-mm-dd'
    };
    let startDate = this.get('startDate');
    let userStartDateAsToday = this.get('userStartDateAsToday');
    if (!startDate && userStartDateAsToday) {
      startDate = moment().format('YYYY-MM-DD');
    }
    if (startDate) {
      defaultParams.startDate = startDate;
    }
    datepickerEle.datepicker(defaultParams);
    datepickerEle.off('changeDate').on('changeDate', function() {
      let datepicker = this;
      let selectedDate = Ember.$(datepicker)
        .datepicker('getFormattedDate')
        .valueOf();
      component.sendAction('onSelectDate', selectedDate);
    });
  },

  toggleDatePicker() {
    let component = this;
    let element = component.$('.ca-datepicker-container');
    let dateDisplayEle = component.$('.cal-mm-yyyy');
    if (!element.hasClass('active')) {
      element.slideDown(400, function() {
        element.addClass('active');
        dateDisplayEle.addClass('active');
      });
    } else {
      element.slideUp(400, function() {
        element.removeClass('active');
        dateDisplayEle.removeClass('active');
      });
    }
  }
});
