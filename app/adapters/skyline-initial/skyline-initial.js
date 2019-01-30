import Ember from 'ember';

/**
 * Adapter to support the skyline initial API
 *
 * @typedef {Object} SkylineAdapter
 */
export default Ember.Object.extend({
  session: Ember.inject.service('session'),

  namespace: '/api/skyline-initial',

  /**
   * Get state of skyline initialization
   * @returns {Promise.<[]>}
   */
  fetchState(classId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/v1/state`;
    const options = {
      type: 'POST',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({ classId })
    };
    return Ember.RSVP.hashSettled({
      state: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.state.value;
    });
  },

  defineHeaders() {
    return {
      Authorization: `Token ${this.get('session.token-api3')}`
    };
  }
});
