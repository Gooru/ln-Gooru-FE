import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['portfolio', 'gru-content-filters'],

  didInsertElement() {
    const component = this;
    component.reloadFilters();
    component.set(
      'isReloadFilters',
      !!component.get('activeFiltersList.length')
    );
  },

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
      let daterangeFilterObject = Ember.Object.create({
        type: 'daterange',
        value: `${appliedFilters.startDate} - ${appliedFilters.endDate}`,
        displayValue: `${appliedFilters.startDate} - ${appliedFilters.endDate}`
      });
      component.actions.onSelectFilterItem(daterangeFilterObject, component);
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
    },

    onSelectFilterItem(filterObject, component = this) {
      let activeFiltersList = component.get('activeFiltersList');
      let existingFilterObject = activeFiltersList.findBy(
        'type',
        filterObject.get('type')
      );
      let filterObjectIndex = existingFilterObject
        ? activeFiltersList.indexOf(existingFilterObject)
        : -1;
      if (filterObjectIndex >= 0) {
        activeFiltersList.splice(filterObjectIndex, 1, filterObject);
      } else {
        activeFiltersList.pushObject(filterObject);
      }
    },

    onResetFilters() {
      const component = this;
      component.resetFilters();
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
  }),

  activeFiltersList: Ember.A([]),

  isReloadFilters: false,

  resetFilters() {
    const component = this;
    component.set('appliedFilters', {});
    component.set('activeFiltersList', Ember.A([]));
    component.sendAction('refreshFilters', {});
  },

  reloadFilters() {
    const component = this;
    const appliedFilters = component.get('appliedFilters');
    if (appliedFilters.startDate && appliedFilters.endDate) {
      component.set(
        'daterange',
        Ember.Object.create({
          startDate: appliedFilters.startDate,
          endDate: appliedFilters.endDate
        })
      );
    }
    let gutFilters = {
      subjectCode: appliedFilters.subjectCode,
      domainCode: appliedFilters.domainCode,
      gutCode: appliedFilters.gutCode
    };
    component.set('gutFilters', gutFilters);
  }
});
