import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['portfolio', 'gru-content-filters'],

  actions: {
    onSelectDateRange(startDate, endDate) {
      const component = this;
      let appliedFilters = component.get('appliedFilters');
      appliedFilters.startDate = moment(startDate).format('YYYY-MM-DD');
      appliedFilters.endDate = moment(endDate).format('YYYY-MM-DD');
      component.set('appliedFilters', appliedFilters);
      component.set(
        'daterange',
        Ember.Object.create({
          startDate,
          endDate
        })
      );
    },

    onShowDateRangeSelector() {
      const component = this;
      component.toggleProperty('isShowDateRangeSelector');
    },

    onCloseDatePicker() {
      const component = this;
      component.toggleProperty('isShowDateRangeSelector');
    },

    applyFilters() {
      const component = this;
      let appliedFilters = component.get('appliedFilters');
      appliedFilters = Object.assign(
        appliedFilters,
        component.get('gutFilters')
      );
      component.sendAction('refreshFilters', appliedFilters);
    }
  },

  appliedFilters: {},

  isShowDateRangeSelector: false,

  startDate: Ember.computed(function() {
    return moment()
      .subtract(1, 'months')
      .format('MM-DD-YYYY');
  }),

  endDate: Ember.computed(function() {
    return moment().format('YYYY-MM-DD');
  })
});
