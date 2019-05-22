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

  actions: {
    onSelectMonth(month) {
      let component = this;
      component.sendAction('onSelectMonth', month);
    }
  }
});
