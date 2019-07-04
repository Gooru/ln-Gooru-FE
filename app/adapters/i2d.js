import Ember from 'ember';

export default Ember.Object.extend({

  session: Ember.inject.service('session'),
  /**
   * @property {string} End-point URI
   */
  namespace: '/api/v1/i2d',

  /**
   * Upload the image
   *
   * @param data
   * @returns {Promise}
   */
  uploadImage: function(data) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/upload`;
    const options = {
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data: JSON.stringify(data)
    };
    return Ember.$.ajax(url, options);
  },

  searchImage: function(data) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/upload/search`;
    const options = {
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data: JSON.stringify(data)
    };
    return Ember.$.ajax(url, options);
  },

  defineHeaders: function() {
    return {
      Authorization: `Token ${this.get('session.token-api3')}`
    };
  }
});
