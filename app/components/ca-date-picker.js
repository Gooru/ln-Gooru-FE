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
    this.doHighlightActivity();
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
    if (startDate) {
      component.enableDatePicker();
      component.$('#ca-datepicker').datepicker('setStartDate', startDate);
    }
  }),


  onRefresh: Ember.observer('refreshDatePicker', function() {
    let component = this;
    component.showTodayActivity();
  }),

  // -------------------------------------------------------------------------
  // Methods

  initializeDatePicker: function() {
    let component = this;
    let allowDateSelectorToggle = component.get('allowDateSelectorToggle');
    let datepickerEle = component.$('#ca-datepicker');
    let defaultParams = {
      maxViewMode: 0,
      format: 'yyyy-mm-dd',
      todayHighlight: true
    };
    datepickerEle.datepicker(defaultParams);
    datepickerEle.off('changeDate').on('changeDate', function() {
      let datepicker = this;
      let selectedDate = Ember.$(datepicker)
        .datepicker('getFormattedDate')
        .valueOf();
      if (allowDateSelectorToggle) {
        component.toggleDatePicker();
      }
      component.doHighlightActivity();
      component.sendAction('onSelectDate', selectedDate);
    });

    if (component.get('validateEndDate')) {
      component.disableDatePicker();
    }
  },

  disableDatePicker() {
    let component = this;
    component.$('#ca-datepicker').removeClass('disable').addClass('disable');
  },

  enableDatePicker() {
    let component = this;
    component.$('#ca-datepicker').removeClass('disable');
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

  doHighlightActivity() {
    let component = this;
    let highlightActivities = component.get('highlightActivities');
    if (highlightActivities) {
      let dateEles = component.$(
        '#ca-datepicker .datepicker .datepicker-days  .table-condensed tbody tr td'
      );
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
  }
});
