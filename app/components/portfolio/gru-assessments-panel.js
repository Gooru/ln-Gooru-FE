import Ember from 'ember';
import { CONTENT_TYPES } from 'gooru-web/config/config';

export default Ember.Component.extend({
  classNames: ['portfolio', 'gru-assessments-panel'],

  session: Ember.inject.service('session'),

  portfolioService: Ember.inject.service('api-sdk/portfolio'),

  i18n: Ember.inject.service(),

  didInsertElement() {
    const component = this;
    component.loadStudiedAssessments();
  },

  userId: Ember.computed.alias('session.userId'),

  loadStudiedAssessments() {
    const component = this;
    component.fetchStudiedAssessments().then(function(studiedAssessments) {
      component.parseStudiedAssessments(studiedAssessments);
    });
  },

  fetchStudiedAssessments() {
    const component = this;
    const portfolioService = component.get('portfolioService');
    const userId = component.get('userId');
    const activityType = CONTENT_TYPES.ASSESSMENT;
    const requestParam = {
      userId,
      activityType
    };
    return portfolioService.getUserPortfolioUniqueItems(requestParam);
  },

  parseStudiedAssessments(studiedAssessments) {
    const component = this;
    if (!component.isDestroyed) {
      component.set('learnedPortfolioItems', studiedAssessments);
    }
  }
});
