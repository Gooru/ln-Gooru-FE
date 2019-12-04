import Ember from 'ember';

/**
 * Adapter for struggling Competency
 *
 * @typedef {Object} StrugglingCompetencyAdapter
 */
export default Ember.Object.extend({
  session: Ember.inject.service('session'),

  namespace: '/api/ds/users/v2/competencies/struggling',

  /**
   * get struggling competency based on competency
   * @return {Promise}
   */
  fetchStrugglingCompetency(params) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const grade = params.grade || null;
    const classId = params.classId || null;
    const month = params.month || null;
    const year = params.year || null;
    const url = `${namespace}?grades=${grade}&class=${classId}&month=${month}&year=${year}`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8'
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * get student performance based on competency
   * @return {Promise}
   */
  fetchStudentsPerfomance(params) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const competency = params.competency || null;
    const classId = params.classId || null;
    const month = params.month || null;
    const year = params.year || null;
    const url = `${namespace}/performance?class=${classId}&competency=${competency}&month=${month}&year=${year}`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8'
    };
    return Ember.$.ajax(url, options);
  },

  defineHeaders() {
    return {
      Authorization: `Token ${this.get('session.token-api3')}`
    };
  }
});