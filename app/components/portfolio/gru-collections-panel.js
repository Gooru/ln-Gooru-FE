import Ember from 'ember';
import { CONTENT_TYPES } from 'gooru-web/config/config';

export default Ember.Component.extend({
  classNames: ['portfolio', 'gru-collections-panel'],

  session: Ember.inject.service('session'),

  portfolioService: Ember.inject.service('api-sdk/portfolio'),

  i18n: Ember.inject.service(),

  didInsertElement() {
    const component = this;
    component.loadStudiedCollections();
  },

  actions: {
    onOpenFilter() {
      const component = this;
      component.toggleProperty('isShowContentFilters');
    },

    refreshFilters(appliedFilters) {
      const component = this;
      component.loadStudiedCollections(appliedFilters);
      component.toggleProperty('isShowContentFilters');
    },

    clearFilters() {
      const component = this;
      component.loadStudiedCollections();
    }
  },

  userId: Ember.computed.alias('session.userId'),

  isShowContentFilters: false,

  filters: {},

  userCreatedAt: Ember.computed('userProfile.createdAt', function() {
    return moment(this.get('userProfile.createdAt')).format('YYYY-MM-DD');
  }),

  loadStudiedCollections(filters = {}) {
    const component = this;
    component
      .fetchStudiedCollections(filters)
      .then(function(studiedCollections) {
        component.set('learnedPortfolioItems', studiedCollections);
      });
  },

  fetchStudiedCollections(filters = {}) {
    const component = this;
    const portfolioService = component.get('portfolioService');
    const userId = component.get('userId');
    const activityType = CONTENT_TYPES.COLLECTION;
    const requestParam = {
      userId,
      activityType
    };
    filters = Object.assign(filters, requestParam);
    let contentBase = component.getContentBaseByFilter(filters);
    return portfolioService.getUserPortfolioUniqueItems(filters, contentBase);
  },

  getContentBaseByFilter(filters) {
    let contentBase = 'content';
    if (filters.gutCode && filters.gutCode !== '') {
      contentBase = 'competency';
    } else if (filters.domainCode && filters.domainCode !== '') {
      contentBase = 'domain';
    } else if (filters.subjectCode && filters.subjectCode !== '') {
      contentBase = 'subject';
    }
    return contentBase;
  }
});
