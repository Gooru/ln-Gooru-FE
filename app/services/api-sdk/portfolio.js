import Ember from 'ember';
import PortfolioAdapter from 'gooru-web/adapters/portfolio';
import PortfolioSerializer from 'gooru-web/serializers/portfolio';

export default Ember.Service.extend({
  session: Ember.inject.service(),

  portfolioAdapter: null,

  portfolioSerializer: null,

  init: function() {
    this._super(...arguments);
    this.set(
      'portfolioAdapter',
      PortfolioAdapter.create(Ember.getOwner(this).ownerInjection())
    );
    this.set(
      'portfolioSerializer',
      PortfolioSerializer.create(Ember.getOwner(this).ownerInjection())
    );
  },

  getUserPortfolioUniqueItems(requestParam, contentBase) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('portfolioAdapter')
        .getUserPortfolioUniqueItems(requestParam, contentBase)
        .then(
          function(response) {
            resolve(
              service
                .get('portfolioSerializer')
                .serializePortfolioItems(
                  response.items,
                  requestParam.activityType
                )
            );
          },
          function(error) {
            reject(error);
          }
        );
    });
  },

  getAllAttemptsByItem(requestParam) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('portfolioAdapter')
        .getAllAttemptsByItem(requestParam)
        .then(
          function(response) {
            resolve(
              service
                .get('portfolioSerializer')
                .serializeActivityAttempts(response.items)
            );
          },
          function(error) {
            reject(error);
          }
        );
    });
  },

  getActivityPerformanceBySession(requestParams, contentType) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('portfolioAdapter')
        .getActivityPerformanceBySession(requestParams, contentType)
        .then(
          function(response) {
            resolve(
              service
                .get('portfolioSerializer')
                .serializeActivityPerformance(response.content)
            );
          },
          function(error) {
            reject(error);
          }
        );
    });
  }
});
