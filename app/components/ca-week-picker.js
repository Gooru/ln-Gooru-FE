import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['ca-week-picker-container'],

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

  selectedWeekDate: null,
  /**
   * Maintains  the value of first date of month
   * @return {String}
   */
  firstDateOfMonth: Ember.computed('forMonth', 'forYear', function() {
    let forMonth = this.get('forMonth');
    let forYear = this.get('forYear');
    let date = `${forYear}-${forMonth}-01`;
    return moment(date).format('YYYY-MM-DD');
  }),

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

  // -------------------------------------------------------------------------
  // Events

  didInsertElement() {
    this._super(...arguments);
    this.initialize();
    this.doHighlightActivity();
  },
  // -------------------------------------------------------------------------
  // Actions

  actions: {
    showPreviousMonth() {
      let component = this;
      let firstDateOfMonth = component.get('firstDateOfMonth');
      let forMonth = moment(firstDateOfMonth)
        .subtract(1, 'months')
        .format('MM');
      let forYear = moment(firstDateOfMonth)
        .subtract(1, 'months')
        .format('YYYY');
      let datepickerPrevEle = component.$(
        '#ca-weekpicker .datepicker-days .prev'
      );
      datepickerPrevEle.trigger('click');
      let date = `${forYear}-${forMonth}-01`;
      let parsedDate = moment(date).format('YYYY-MM-DD');
      component.set('firstDateOfMonth', parsedDate);
      component.sendAction('showPreviousMonth', parsedDate);
    },

    showNextMonth() {
      let component = this;
      let firstDateOfMonth = component.get('firstDateOfMonth');
      let forMonth = moment(firstDateOfMonth)
        .add(1, 'months')
        .format('MM');
      let forYear = moment(firstDateOfMonth)
        .add(1, 'months')
        .format('YYYY');
      let datepickerNextEle = component.$(
        '#ca-weekpicker .datepicker-days .next'
      );
      datepickerNextEle.trigger('click');
      let date = `${forYear}-${forMonth}-01`;
      let parsedDate = moment(date).format('YYYY-MM-DD');
      component.set('firstDateOfMonth', parsedDate);
      component.sendAction('showNextMonth', parsedDate);
    },

    onCloseDatePicker() {
      this.sendAction('closeDatePicker');
    }
  },

  initialize() {
    const component = this;
    let weekpickerEle = component.$('#ca-weekpicker');
    let defaultParams = {
      maxViewMode: 0,
      format: 'yyyy-mm-dd',
      todayHighlight: true
    };
    let startDate = component.get('selectedWeekDate');
    weekpickerEle.datepicker(defaultParams);
    if (startDate) {
      startDate = moment(startDate).format('YYYY-MM-DD');
      weekpickerEle.datepicker('setDate', startDate);
      component.doHighlightWeek(startDate, false);
    }
    weekpickerEle.off('changeDate').on('changeDate', function() {
      let weekpickerEle = this;
      let selectedDate = Ember.$(weekpickerEle)
        .datepicker('getFormattedDate')
        .valueOf();
      component.doHighlightActivity();
      component.doHighlightWeek(selectedDate, true);
    });
  },

  doHighlightWeek(selectedDate, isToggle) {
    const component = this;
    let dateEleContainer = component.$(`#ca-weekpicker
      .datepicker .datepicker-days .table-condensed tbody tr`);
    dateEleContainer.removeClass('week-active');
    let dateElement = dateEleContainer.find('td.active.day').parent();
    dateElement.addClass('week-active');
    let startDateOfWeek = moment(selectedDate)
      .day(0)
      .format('YYYY-MM-DD');
    let endDateOfWeek = moment(selectedDate)
      .day(6)
      .format('YYYY-MM-DD');
    component.sendAction(
      'onSelectWeek',
      startDateOfWeek,
      endDateOfWeek,
      isToggle
    );
  },

  doHighlightActivity() {
    let component = this;
    Ember.run.later(function() {
      let highlightActivities = component.get('highlightActivities');
      if (highlightActivities) {
        let dateEles = component.$(`#ca-weekpicker
        .datepicker .datepicker-days .table-condensed tbody tr td`);
        let activities = component.get('activities');
        dateEles.each(function(index, dateEle) {
          let dateElement = component.$(dateEle);
          let parentDateEle = dateElement.closest('tr');
          if (!(dateElement.hasClass('new') || dateElement.hasClass('old'))) {
            let day = dateElement.html();
            if (day.length === 1) {
              day = `0${day}`;
            }
            if (!parentDateEle.hasClass('week-active')) {
              let activity = activities.findBy('day', day);
              if (activity) {
                parentDateEle.removeClass();
                dateElement.addClass('has-activities');
                parentDateEle.addClass('has-activities');
              } else {
                if (parentDateEle.attr('class') !== 'has-activities') {
                  parentDateEle.addClass('no-activities');
                }
                dateElement.removeClass('has-activities');
              }
            }
          } else {
            if (parentDateEle.attr('class') !== 'has-activities') {
              parentDateEle.addClass('disable-event');
            }
          }
        });
      }
    }, 400);
  }
});
