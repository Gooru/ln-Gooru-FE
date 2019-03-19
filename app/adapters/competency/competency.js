import Ember from 'ember';

/**
 * Adapter to support the Competency API
 *
 * @typedef {Object} CompetencyAdapter
 */
export default Ember.Object.extend({
  session: Ember.inject.service('session'),

  namespace: '/api/ds/users',

  /**
   * Get user  competencies
   * @returns {Promise.<[]>}
   */
  getUserCompetencies(user, activeDuration = '3m') {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/v2/user/competency`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: {
        user,
        activeDuration
      }
    };
    return Ember.RSVP.hashSettled({
      userCompetencies: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.userCompetencies.value;
    });
  },

  /**
   * Get user performance competency collections
   * @returns {Promise.<[]>}
   */
  getUserPerformanceCompetencyCollections(user, gutCode, status) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/v2/user/performance/competency/collections`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: {
        user,
        gutCode,
        status
      }
    };
    return Ember.RSVP.hashSettled({
      userPerformanceCompetencyCollections: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.userPerformanceCompetencyCollections.value;
    });
  },

  /**
   * Get Competency Matrix Coordinates for Subject
   * @returns {Promise.<[]>}
   */
  getCompetencyMatrixCoordinates(subject) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/v2/tx/competency/matrix/coordinates`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: {
        subject
      }
    };
    return Ember.RSVP.hashSettled({
      competencyMatrixCoordinates: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.competencyMatrixCoordinates.value;
    });
  },

  /**
   * Get user competency Matrix for courses by subject
   * @returns {Promise.<[]>}
   */
  getCompetencyMatrixCourse(user, subject) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/v2/tx/competency/matrix/course`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: {
        user,
        subject
      }
    };
    return Ember.RSVP.hashSettled({
      competencyMatrixCourse: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.competencyMatrixCourse.value;
    });
  },

  /**
   * Get user competency Matrix for domains by subjects
   * @returns {Promise.<[]>}
   */
  getCompetencyMatrixDomain(user, subject, timeSeries = {}) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/v2/tx/competency/matrix/domain`;
    const defaultParams = {
      user,
      subject
    };
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8'
    };
    options.data = Object.assign(defaultParams, timeSeries);
    return Ember.RSVP.hashSettled({
      competencyMatrix: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.competencyMatrix.value;
    });
  },

  /**
   * Get user competency Matrix  by subjects
   * @returns {Promise.<[]>}
   */
  getCompetencyMatrix(user, subject) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/v2/tx/competency/matrix`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: {
        user,
        subject
      }
    };
    return Ember.RSVP.hashSettled({
      competencyMatrix: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.competencyMatrix.value;
    });
  },

  /**
   * @function getUserProficiencyBaseLine
   * Method to fetch user proficiency baseline
   */
  getUserProficiencyBaseLine(classId, courseId, userId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/v2/user/baseline/learnerprofile`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: {
        classId,
        courseId,
        userId
      }
    };
    return Ember.RSVP.hashSettled({
      competencyMatrix: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.competencyMatrix.value;
    });
  },

  /**
   * @function getUserSignatureContentList
   * Method to fetch user competency list of signature content
   */
  getUserSignatureCompetencies(userId, subject) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/v2/tx/competency/next`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: {
        subject: subject,
        user: userId
      }
    };
    return Ember.RSVP.hashSettled({
      competencyMatrix: Ember.$.ajax(url, options)
    }).then(function(hash) {
      return hash.competencyMatrix.value;
    });
  },

  /**
   * @function getDomainLevelSummary
   * Method to fetch domain level summary of a class
   */
  getDomainLevelSummary(filters) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/v2/user/competency/report/course`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: filters
    };

    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax(url, options).then(
        function(domainLevelSummary) {
          resolve(domainLevelSummary);
        },
        function(error) {
          reject(error);
        }
      );
    });
  },

  /**
   * @function getDomainsCompletionReport
   * Method to fetch domains completion report
   */
  getDomainsCompletionReport(requestBody) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/v2/classes/reports/domains`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: requestBody
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * @function getCompetencyCompletionReport
   * Method to fetch competency completion report
   */
  getCompetencyCompletionReport(requestBody) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/v2/classes/reports/domains/competencies`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: requestBody
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * @function getUsersCompetencyPerformanceSummary
   * Method to fetch users competency performance summary
   */
  getUsersCompetencyPerformanceSummary(requestBody) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/v2/classes/reports/domains/competencies/performance`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      data: requestBody
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * @function getCompetencyCompletionStats
   * Provide Competency Completion Stats for Premium Classes"
   */
  getCompetencyCompletionStats(classIds) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/v2/stats/competency`;
    const options = {
      type: 'POST',
      headers: adapter.defineHeaders(),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      data: JSON.stringify({ classIds })
    };
    return Ember.$.ajax(url, options);
  },

  defineHeaders() {
    return {
      Authorization: `Token ${this.get('session.token-api3')}`
    };
  }
});
