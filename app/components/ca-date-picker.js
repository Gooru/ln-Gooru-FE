import Ember from 'ember';
import {
  DCA_CALENDAR_VIEWS
} from 'gooru-web/config/config';
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['ca-date-picker-container'],

  // -------------------------------------------------------------------------
  // Events

  didInsertElement() {
    this._super(...arguments);
    this.initialize();
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
      let datepickerPrevEle = component.$('#ca-datepicker .datepicker-days .prev');
      datepickerPrevEle.trigger('click');
      let date = `${forYear}-${forMonth}-01`;
      let parsedDate = moment(date).format('YYYY-MM-DD');
      component.set('forFirstDateOfMonth', parsedDate);
      component.sendAction('showPreviousMonth', parsedDate);
      if (component.get('highlightFirstDayOfMonth')) {
        component.updateFirstDayOfMonth(parsedDate);
      }
    },

    showNextMonth() {
      let component = this;
      let forFirstDateOfMonth = component.get('forFirstDateOfMonth');
      let forMonth = moment(forFirstDateOfMonth)
        .add(1, 'months')
        .format('MM');
      let forYear = moment(forFirstDateOfMonth)
        .add(1, 'months')
        .format('YYYY');
      component.set('forMonth', forMonth);
      component.set('forYear', forYear);
      let datepickerNextEle = component.$('#ca-datepicker .datepicker-days .next');
      datepickerNextEle.trigger('click');
      let date = `${forYear}-${forMonth}-01`;
      let parsedDate = moment(date).format('YYYY-MM-DD');
      component.set('forFirstDateOfMonth', parsedDate);
      component.sendAction('showNextMonth', parsedDate);
      if (component.get('highlightFirstDayOfMonth')) {
        component.updateFirstDayOfMonth(parsedDate);
      }
    },

    showCalendar() {
      this.toggleDatePicker();
    },

    onSelectMonth(month) {
      this.sendAction('onSelectMonth', month);
    },

    onSelectToday() {
      let component = this;
      let allowDateSelectorToggle = component.get('allowDateSelectorToggle');
      if (allowDateSelectorToggle) {
        component.toggleDatePicker();
      }
      component.showTodayActivity();
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
   * Maintains the value whether validate end date or not
   * @type {Boolean}
   */
  validateEndDate: false,

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
   * It Maintains the state of month need to display or not.
   * @type {Boolean}
   */
  showMonths: false,

  /**
   * It will  whether calender toggle allowed or not.
   * @type {Boolean}
   */
  allowDateSelectorToggle: false,

  /**
   * It will decide whether today button need to show or not.
   * @type {Boolean}
   */
  showToday: false,

  /**
   * If show today is true then this attribute will check today is exist for the current month selection.
   * @return {String}
   */
  isTodayExistInCurrentMonth: Ember.computed('forFirstDateOfMonth', function() {
    let component = this;
    let forFirstDateOfMonth = component.get('forFirstDateOfMonth');
    return moment().format('MM') === moment(forFirstDateOfMonth).format('MM');
  }),

  /**
   * It will decide whether  need to highlight activities or not.
   * @type {Boolean}
   */
  highlightActivities: false,

  /**
   * It will decide whether  need to highlight first date of the month or not.
   * @type {Boolean}
   */
  highlightFirstDayOfMonth: false,

  /**
   * It maintains the state of calendar view for weekly.
   * @type {Boolean}
   */
  isWeekly: Ember.computed.equal('calendarView', DCA_CALENDAR_VIEWS.WEEKLY),

  /**
   * It maintains the state of calendar view for monthly.
   * @type {Boolean}
   */
  isMonthly: Ember.computed.equal('calendarView', DCA_CALENDAR_VIEWS.MONTHLY),

  /**
   * It maintains the state of calendar view for daily.
   * @type {Boolean}
   */
  isDaily: Ember.computed.equal('calendarView', DCA_CALENDAR_VIEWS.DAILY),

  // -------------------------------------------------------------------------
  // Observers

  /**
   * This method  will trigger when  the property change happen in activities or highlightActivities
   */
  doHighlightActivities: Ember.observer(
    'highlightActivities',
    'activities.[]',
    function() {
      this.doHighlightActivity();
    }
  ),

  onSelectStartDate: Ember.observer('startDate', function() {
    let component = this;
    let startDate = this.get('startDate');
    let forFirstDateOfMonth = moment(startDate).format('YYYY-MM-DD');
    component.set('forFirstDateOfMonth', forFirstDateOfMonth);
    if (startDate) {
      component.$('#ca-datepicker').datepicker('setStartDate', startDate);
    }
  }),

  onChangeCalendarView: Ember.observer('calendarView', function() {
    let component = this;
    component.initialize();
  }),

  // -------------------------------------------------------------------------
  // Methods

  initialize() {
    const component = this;
    const isMonthly = component.get('isMonthly');
    const isWeekly = component.get('isWeekly');
    if (isMonthly) {
      component.set('showToday', false);
      component.initializeMonthPicker();
    } else if (isWeekly) {
      component.set('showToday', false);
      component.initializeWeekPicker();
    } else {
      component.set('showToday', true);
      component.initializeDatePicker();
    }
  },

  initializeDatePicker() {
    const component = this;
    let datepickerEle = component.$('#ca-datepicker');
    let defaultParams = {
      maxViewMode: 0,
      format: 'yyyy-mm-dd',
      todayHighlight: true
    };
    datepickerEle.datepicker(defaultParams);
    if (!component.get('selectedDate')) {
      datepickerEle.datepicker('setDate', 'now');
      component.set('selectedDate', moment().format('YYYY-MM-DD'));
    }
    component.doHighlightActivity();
    component.sendAction('onSelectDate', component.get('selectedDate'), false);
    datepickerEle.off('changeDate').on('changeDate', function() {
      let datepicker = this;
      let selectedDate = Ember.$(datepicker)
        .datepicker('getFormattedDate')
        .valueOf();
      component.doHighlightActivity();
      component.set('selectedDate', selectedDate);
      component.sendAction('onSelectDate', selectedDate);
    });
  },

  initializeWeekPicker() {
    const component = this;
    let weekpickerEle = component.$('#ca-weekpicker');
    let defaultParams = {
      maxViewMode: 0,
      format: 'yyyy-mm-dd',
      todayHighlight: true
    };
    weekpickerEle.datepicker(defaultParams);
    component.doHighlightActivity();
    if (!component.get('selectedWeek')) {
      weekpickerEle.datepicker('setDate', 'now');
      component.set('selectedWeek', moment().format('YYYY-MM-DD'));
    }
    component.doHighlightWeek(component.get('selectedWeek'), false);
    weekpickerEle.off('changeDate').on('changeDate', function() {
      let weekpickerEle = this;
      let selectedDate = Ember.$(weekpickerEle)
        .datepicker('getFormattedDate')
        .valueOf();
      component.doHighlightActivity();
      component.set('selectedWeek', selectedDate);
      component.doHighlightWeek(selectedDate);
    });

  },

  initializeMonthPicker() {
    const component = this;
    let monthPickerEle = component.$('#ca-monthpicker');
    let defaultParams = {
      format: 'yyyy-mm',
      viewMode: 'months',
      minViewMode: 'months'
    };
    monthPickerEle.datepicker(defaultParams);
    if (!component.get('selectedMonth')) {
      monthPickerEle.datepicker('setDate', 'now');
      component.set('selectedMonth', moment().format('YYYY-MM'));
    }
    component.sendAction('onSelectMonth', component.get('selectedMonth'), false);
    monthPickerEle.off('changeDate').on('changeDate', function() {
      let monthpicker = this;
      let selectedMonth = Ember.$(monthpicker)
        .datepicker('getFormattedDate')
        .valueOf();
      component.set('selectedMonth', selectedMonth);
      component.sendAction('onSelectMonth', selectedMonth);
    });

  },

  showTodayActivity() {
    let component = this;
    let isTodayExistInCurrentMonth = component.get(
      'isTodayExistInCurrentMonth'
    );
    let date = moment().format('YYYY-MM-DD');
    if (!isTodayExistInCurrentMonth) {
      let datePickerEle = component.$('#ca-datepicker');
      datePickerEle.datepicker('update', date);
      let forMonth = moment(date).format('MM');
      let forYear = moment(date).format('YYYY');
      component.set('forMonth', forMonth);
      component.set('forYear', forYear);
      let forFirstDateOfMonth = `${forYear}-${forMonth}-01`;
      component.set('forFirstDateOfMonth', forFirstDateOfMonth);
      component.sendAction('onSelectToday', date, true);
    } else {
      component.sendAction('onSelectToday', date);
    }
  },

  updateFirstDayOfMonth(date) {
    let component = this;
    let datePickerEle = component.$('#ca-datepicker');
    datePickerEle.datepicker('update', date);
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
  },

  getElementNameByCalendarView() {
    const component = this;
    return component.get('isMonthly') ? 'ca-monthpicker' :
      component.get('isWeekly') ? 'ca-weekpicker' : 'ca-datepicker';
  },

  doHighlightWeek(selectedDate, togglePicker) {
    const component = this;
    let dateEleContainer = component.$(`#ca-weekpicker
    .datepicker .datepicker-days .table-condensed tbody tr`);
    dateEleContainer.removeClass('week-active');
    var dateElement = dateEleContainer.find('td.active.day').parent();
    dateElement.addClass('week-active');
    var startDateOfWeek = moment(selectedDate).day(0).format('YYYY-MM-DD');
    var endDateOfWeek = moment(selectedDate).day(6).format('YYYY-MM-DD');
    component.sendAction('onSelectWeek', startDateOfWeek, endDateOfWeek, togglePicker);
  },

  doHighlightActivity() {
    let component = this;
    Ember.run.later((function() {
      let highlightActivities = component.get('highlightActivities');
      if (highlightActivities) {
        let dateEles = component.$(`#${component.getElementNameByCalendarView()}
        .datepicker .datepicker-days .table-condensed tbody tr td`);
        let activities = component.get('activities');
        dateEles.each(function(index, dateEle) {
          let dateElement = component.$(dateEle);
          if (!(dateElement.hasClass('new') || dateElement.hasClass('old'))) {
            let day = dateElement.html();
            if (day.length === 1) {
              day = `0${day}`;
            }
            let activity = activities.findBy('day', day);
            if (activity) {
              dateElement.removeClass('no-activities');
              dateElement.addClass('has-activities');
            } else {
              dateElement.addClass('no-activities');
              dateElement.removeClass('has-activities');
            }
          }
        });
      }
    }), 400);
  }
});
