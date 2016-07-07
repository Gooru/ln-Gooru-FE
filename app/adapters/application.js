import Ember from 'ember';
import DS from 'ember-data';
import Env from '../config/environment';
import SessionMixin from '../mixins/session';

const Config = Env['simple-auth-custom'] || {};
const EndPointsConfig = Env['gooru-endpoints'] || {};

export default DS.RESTAdapter.extend(SessionMixin, {

  headers: Ember.computed('session.token', function() {
    return {
      'gooru-session-token': this.get('session.token-api3')
    };
  }),

  /**
   * @property {string} API Key
   * @see simple-auth-custom at environment.js
   */
  apiKey: Config.apiKey,

  /**
   * This custom implementation removes the default pluralization of the type
   */
  pathForType: function() {
    return '';
  },

  /**
   * Customizing ajax calls
   * @param url
   * @param method
   * @param hash
   * @returns {*}
   */
  ajax: function(url, method, hash) {
    const protocol = EndPointsConfig.protocol;
    const hostname = EndPointsConfig.hostname;
    const port = EndPointsConfig.port ? `:${EndPointsConfig.port}` : '';
    return this._super(`${protocol}${hostname}${port}${url}`, method, hash);
  }

});
