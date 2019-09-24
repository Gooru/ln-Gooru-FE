import Ember from 'ember';
import { CONTENT_TYPES } from 'gooru-web/config/config';

export default Ember.Component.extend({
  classNames: ['portfolio', 'gru-offline-activities-panel'],

  session: Ember.inject.service('session'),

  portfolioService: Ember.inject.service('api-sdk/portfolio'),

  i18n: Ember.inject.service(),

  didInsertElement() {
    const component = this;
    component.loadPortfolioItems();
  },

  actions: {
    onOpenFilter() {
      const component = this;
      component.toggleProperty('isShowContentFilters');
    },

    refreshFilters(appliedFilters) {
      const component = this;
      component.loadPortfolioItems(appliedFilters);
      component.toggleProperty('isShowContentFilters');
    },

    clearFilters() {
      const component = this;
      component.loadPortfolioItems();
    }
  },

  userId: Ember.computed.alias('session.userId'),

  isShowContentFilters: false,

  filters: {},

  userCreatedAt: Ember.computed('userProfile.createdAt', function() {
    return moment(this.get('userProfile.createdAt')).format('YYYY-MM-DD');
  }),

  loadPortfolioItems(filters = {}) {
    const component = this;
    component
      .fetchStudiedOfflineActivities(filters)
      .then(function(studiedOfflineActivities) {
        component.parseStudiedOfflineActivities(studiedOfflineActivities);
      });
  },

  fetchStudiedOfflineActivities(filters = {}) {
    const component = this;
    const portfolioService = component.get('portfolioService');
    const userId = component.get('userId');
    const activityType = CONTENT_TYPES.OFFLINE_ACTIVITY;
    const requestParam = {
      userId,
      activityType
    };
    filters = Object.assign(filters, requestParam);
    let contentBase = component.getContentBaseByFilter(filters);
    return portfolioService.getUserPortfolioUniqueItems(filters, contentBase);
  },

  parseStudiedOfflineActivities(studiedOfflineActivities) {
    const component = this;
    const studiedOfflineActivitySubTypes = Object.keys(
      studiedOfflineActivities
    );
    let parsedOfflineActivities = Ember.A([]);
    if (!component.isDestroyed) {
      studiedOfflineActivitySubTypes.map(subType => {
        let offlineActivities = studiedOfflineActivities[subType];
        parsedOfflineActivities.pushObject(
          Ember.Object.create({
            label: `common.subtask.${subType}`,
            offlineActivities
          })
        );
      });
      component.set('learnedPortfolioItems', parsedOfflineActivities);
    }
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
