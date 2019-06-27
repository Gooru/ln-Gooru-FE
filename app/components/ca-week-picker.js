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

  /**
   * Maintains  the value of first date of month
   * @return {String}
   */
  dateOfMonth: Ember.computed('forMonth', 'forYear', function() {
    let forMonth = this.get('forMonth');
    let forYear = this.get('forYear');
    let date = `${forYear}-${forMonth}-01`;
    return moment(date).format('YYYY-MM-DD');
  }),

  // -------------------------------------------------------------------------
  // Observers

  onChange: Ember.observer('isWeekly', function() {
    const component = this;
    if (component.get('isWeekly')) {
      component.doHighlightWeek(component.get('selectedWeek'), false);
      component.doHighlightActivity();
    }
  }),
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
      let dateOfMonth = component.get('dateOfMonth');
      let forMonth = moment(dateOfMonth)
        .subtract(1, 'months')
        .format('MM');
      let forYear = moment(dateOfMonth)
        .subtract(1, 'months')
        .format('YYYY');
      component.set('forMonth', forMonth);
      component.set('forYear', forYear);
      let datepickerPrevEle = component.$(
        '#ca-weekpicker .datepicker-days .prev'
      );
      datepickerPrevEle.trigger('click');
      let date = `${forYear}-${forMonth}-01`;
      let parsedDate = moment(date).format('YYYY-MM-DD');
      component.set('dateOfMonth', parsedDate);
      component.sendAction('showPreviousMonth', parsedDate);
    },

    showNextMonth() {
      let component = this;
      let dateOfMonth = component.get('dateOfMonth');
      let forMonth = moment(dateOfMonth)
        .add(1, 'months')
        .format('MM');
      let forYear = moment(dateOfMonth)
        .add(1, 'months')
        .format('YYYY');
      component.set('forMonth', forMonth);
      component.set('forYear', forYear);
      let datepickerNextEle = component.$(
        '#ca-weekpicker .datepicker-days .next'
      );
      datepickerNextEle.trigger('click');
      let date = `${forYear}-${forMonth}-01`;
      let parsedDate = moment(date).format('YYYY-MM-DD');
      component.set('dateOfMonth', parsedDate);
      component.sendAction('showNextMonth', parsedDate);
    }
  },

  doHighlightWeek(selectedDate, togglePicker) {
    const component = this;
    let dateEleContainer = component.$(`#ca-weekpicker
    .datepicker .datepicker-days .table-condensed tbody tr`);
    dateEleContainer.removeClass('week-active');
    let dateElement = dateEleContainer.find('td.active.day').parent();
    dateElement.addClass('week-active');
    let startDateOfWeek = moment(selectedDate).day(0).format('YYYY-MM-DD');
    let endDateOfWeek = moment(selectedDate).day(6).format('YYYY-MM-DD');
    component.sendAction('onSelectWeek', startDateOfWeek, endDateOfWeek, togglePicker);
  },

  initialize() {
    const component = this;
    let weekpickerEle = component.$('#ca-weekpicker');
    let defaultParams = {
      maxViewMode: 0,
      format: 'yyyy-mm-dd',
      todayHighlight: true
    };
    weekpickerEle.datepicker(defaultParams);
    if (!component.get('selectedWeek')) {
      weekpickerEle.datepicker('setDate', 'now');
      component.set('selectedWeek', moment().format('YYYY-MM-DD'));
    }
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

  doHighlightActivity() {
    let component = this;
    Ember.run.later((function() {
      let highlightActivities = component.get('highlightActivities');
      if (highlightActivities) {
        let dateEles = component.$(`#ca-weekpicker
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
