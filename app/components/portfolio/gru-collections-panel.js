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

  userId: Ember.computed.alias('session.userId'),

  loadStudiedCollections() {
    const component = this;
    component.fetchStudiedCollections().then(function(studiedCollections) {
      component.parseStudiedCollections(studiedCollections);
    });
  },

  fetchStudiedCollections() {
    const component = this;
    const portfolioService = component.get('portfolioService');
    const userId = component.get('userId');
    const activityType = CONTENT_TYPES.COLLECTION;
    const requestParam = {
      userId,
      activityType
    };
    return portfolioService.getUserPortfolioUniqueItems(requestParam);
  },

  parseStudiedCollections(studiedCollections) {
    const component = this;
    if (!component.isDestroyed) {
      component.set('learnedPortfolioItems', studiedCollections);
    }
  }
});
