import Ember from 'ember';

/**
 * Adapter to support the Assessment CRUD operations in the API 3.0
 *
 * @typedef {Object} AssessmentAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  namespace: '/api/nucleus/v1/assessments',

  /**
   * Posts a new assessment
   *
   * @param data assessment data to be sent in the request body
   * @returns {Promise}
   */
  createAssessment: function(data) {
    const adapter = this;
    const url = this.get('namespace');
    const options = {
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: adapter.defineHeaders(),
      data: JSON.stringify(data.body)
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Update an Assessment
   *
   * @param assessmentId the id of the Assessment to be updated
   * @param data Assessment data to be sent in the request body
   * @returns {Promise}
   */
  updateAssessment: function(assessmentId, data) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/${assessmentId}`;
    const options = {
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: adapter.defineHeaders(),
      data: JSON.stringify(data)
    };
    return Ember.$.ajax(url, options);
  },

  defineHeaders: function() {
    return {
      'Authorization': 'Token ' + this.get('session.token-api3')
    };
  }

});
