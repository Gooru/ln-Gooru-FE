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

  userId: Ember.computed.alias('session.userId'),

  loadPortfolioItems() {
    const component = this;
    component
      .fetchStudiedOfflineActivities()
      .then(function(studiedOfflineActivities) {
        component.parseStudiedOfflineActivities(studiedOfflineActivities);
      });
  },

  fetchStudiedOfflineActivities() {
    const component = this;
    const portfolioService = component.get('portfolioService');
    const userId = component.get('userId');
    const activityType = CONTENT_TYPES.OFFLINE_ACTIVITY;
    const requestParam = {
      userId,
      activityType
    };
    return portfolioService.getUserPortfolioUniqueItems(requestParam);
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
  }
});
