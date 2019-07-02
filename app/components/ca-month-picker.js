import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['ca-month-picker'],

  // -------------------------------------------------------------------------
  // Properties
  /**
   * It maintains number of months to show or not
   * @type {Number}
   */
  numberOfMonthsToShow: 3,

  /**
   * It maintains whether to show calender or not
   * @type {Boolean}
   */
  showCalendarView: false,

  /**
   * Maintains the value which of year activities displaying
   * @type {Moment}
   */
  forYear: moment(),

  /**
   * Maintains the selected month by user
   * @type {String}
   */
  selectedMonth: moment().format('MM'),
  /**
   * It maintains list of months to be display for unschedule contents
   * @return {Array}
   */
  months: Ember.computed('currentMonth', function() {
    let component = this;
    let monthsList = Ember.A([]);
    let currentMonth = component.get('currentMonth');
    let monthAndYearOfCurrentDate = moment().format('YYYY-MM');
    let firtDateOfCurrentMonth = moment(`${monthAndYearOfCurrentDate}-01`);
    if (currentMonth) {
      let numberOfMonthsToShow = component.get('numberOfMonthsToShow');
      for (let index = 0; index < numberOfMonthsToShow; index++) {
        let slectedMonth = moment(currentMonth).add(index, 'months');
        let monthName = moment(currentMonth)
          .add(index, 'months')
          .format('MMMM');
        let monthYear = moment(currentMonth)
          .add(index, 'months')
          .format('YYYY');
        let monthNumber = moment(currentMonth)
          .add(index, 'months')
          .format('MM');
        let month = Ember.Object.create({
          monthNumber,
          monthName,
          monthYear
        });
        month.set(
          'isPast',
          !slectedMonth.isSameOrAfter(firtDateOfCurrentMonth)
        );
        monthsList.pushObject(month);
      }
    }
    return monthsList;
  }),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    onSelectMonth(month) {
      let component = this;
      component.sendAction('onSelectMonth', month);
    },

    showPreviousYear() {
      const component = this;
      let previousYear = moment(component.get('forYear')).subtract(1, 'years').format('YYYY');
      component.set('forYear', previousYear);
    },

    showNextYear() {
      const component = this;
      let nextYear = moment(component.get('forYear')).add(1, 'years').format('YYYY');
      component.set('forYear', nextYear);
    }
  },

  didInsertElement() {
    let component = this;
    component.initialize();
  },

  // -------------------------------------------------------------------------
  // Methods
  initialize() {
    const component = this;
    let monthPickerEle = component.$('#ca-monthpicker');
    let defaultParams = {
      format: 'mm',
      viewMode: 'months',
      minViewMode: 'months'
    };
    monthPickerEle.datepicker(defaultParams);
    let selectedMonth = component.get('selectedMonth');
    const showCalendarView = component.get('showCalendarView');
    if (showCalendarView && selectedMonth) {
      let forMonth = moment(selectedMonth).format('MM');
      let forYear = component.get('forYear');
      monthPickerEle.datepicker('setDate', forMonth);
      let monthAndyear = `${forYear}-${forMonth}`;
      component.sendAction('onSelectMonth', monthAndyear, false);
    }
    monthPickerEle.off('changeDate').on('changeDate', function() {
      let monthpicker = this;
      let selectedMonth = Ember.$(monthpicker)
        .datepicker('getFormattedDate')
        .valueOf();
      let forYear = component.get('forYear');
      if (!moment(forYear).isValid()) {
        forYear = moment(forYear).format('YYYY');
      }
      let monthAndyear = `${forYear}-${selectedMonth}`;
      component.sendAction('onSelectMonth', monthAndyear, true);
    });
  }
});
