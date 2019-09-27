import Ember from 'ember';

export default Ember.Object.extend({
  portfolioNamespace: '/api/ds/users/v2',

  session: Ember.inject.service('session'),

  /**
   * @function searchUserProfiles
   * @param {Object} searchCriteria
   * @return {Promise}
   * Method to do partial search like fetching users based on partial matching user context
   */
  getUserPortfolioUniqueItems(requestParams, contentBase = 'content') {
    const adapter = this;
    const namespace = adapter.get('portfolioNamespace');
    const url = `${namespace}/${contentBase}/portfolio/items`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders(),
      data: requestParams
    };
    return Ember.$.ajax(url, options);
  },

  defineHeaders: function() {
    return {
      Authorization: `Token ${this.get('session.token-api3')}`
    };
  }
});
