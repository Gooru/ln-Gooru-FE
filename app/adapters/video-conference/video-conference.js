import Ember from 'ember';
/**
 * Adapter to get the video conference details
 *
 * @typedef {Object} VideoConference
 */
export default Ember.Object.extend({
  session: Ember.inject.service('session'),

  namespace: '/api/meeting-tools/v1/auth/google/calendar',

  classNamespace: '/api/nucleus/v2/classes',

  fetchConferenceToken() {
    const namespace = this.get('namespace');
    const url = `${namespace}/token`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: this.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },

  authorizeConference(redirectUrl) {
    const namespace = this.get('namespace');
    const url = `${namespace}/authorize`;
    const options = {
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      headers: this.defineHeaders(),
      data: JSON.stringify(redirectUrl)
    };
    return Ember.$.ajax(url, options);
  },

  createConferenceEvent(meetingInfo) {
    const namespace = this.get('namespace');
    const url = `${namespace}/event`;
    const options = {
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      headers: this.defineHeaders(),
      data: JSON.stringify(meetingInfo)
    };
    return Ember.$.ajax(url, options);
  },

  updateConferenceEvent(params) {
    const namespace = this.get('classNamespace');
    const url = `${namespace}/${params.classId}/contents/${params.contentId}/meeting`;
    const options = {
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      headers: this.defineHeaders(),
      data: JSON.stringify(params.data)
    };
    return Ember.$.ajax(url, options);
  },

  defineHeaders: function() {
    return {
      Authorization: `Token ${this.get('session.token-api3')}`
    };
  }
});
