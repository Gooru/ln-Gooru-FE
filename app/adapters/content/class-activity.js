import Ember from 'ember';
import {
  formatDate
} from 'gooru-web/utils/utils';

/**
 * Adapter to support the class activity CRUD operations
 *
 * @typedef {Object} ClassActivityAdapter
 */
export default Ember.Object.extend({
  session: Ember.inject.service('session'),

  namespace: '/api/nucleus/v2/classes',

  reportsNamespace: '/api/reports/v1/ca/classes',

  /**
   * Adds a new content to class
   *
   * @param {string} classId
   * @param {string} contentId
   * @param {string} contentType
   * @param {Date} addedDate
   * @returns {Promise}
   */
  addActivityToClass: function(
    classId,
    contentId,
    contentType,
    addedDate,
    forMonth = moment().format('MM'),
    forYear = moment().format('YYYY')
  ) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/${classId}/contents`;
    const options = {
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: adapter.defineHeaders(),
      data: JSON.stringify({
        class_id: classId,
        content_id: contentId,
        content_type: contentType,
        dca_added_date: addedDate ? formatDate(addedDate, 'YYYY-MM-DD') : null,
        for_month: parseInt(forMonth),
        for_year: parseInt(forYear),
        end_date: addedDate ? formatDate(addedDate, 'YYYY-MM-DD') : null
      })
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Enables the class content
   *
   * @param {string} classId
   * @param {string} classActivityId
   * @returns {Promise}
   */
  enableClassActivity: function(
    classId,
    classActivityId,
    activationDate = new Date(),
    enable = true
  ) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/${classId}/contents/${classActivityId}`;
    const data = {};
    const date = formatDate(activationDate, 'YYYY-MM-DD');
    if (enable) {
      data.activation_date = date;
    } else {
      data.dca_added_date = date;
    }
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

  /**
   * Gets all class activity for the authorized user (student|teacher)
   *
   * @param {string} classId
   * @param {string} contentType collection|assessment|resource|question
   * @param {Month} month optional, default is current month
   * @param {Year} year optional, default is current year
   * @returns {Promise}
   */
  findClassActivities: function(
    classId,
    contentType = undefined,
    forMonth = moment().format('MM'),
    forYear = moment().format('YYYY')
  ) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/${classId}/contents`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data: {
        content_type: contentType,
        for_month: forMonth,
        for_year: forYear
      }
    };
    return Ember.$.ajax(url, options);
  },

  getScheduledActivities(classId, startDate, endDate) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/${classId}/contents/online/scheduled`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data: {
        start_date: startDate,
        end_date: endDate
      }
    };
    return Ember.$.ajax(url, options);
  },

  getUnScheduledActivities(classId, forMonth, forYear) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/${classId}/contents/all/unscheduled`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data: {
        for_month: forMonth,
        for_year: forYear
      }
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Removes a class activity from class
   *
   * @param classId class id to be sent
   * @param contentId content id to be sent
   * @returns {Promise}
   */
  removeClassActivity: function(classId, contentId) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/${classId}/contents/${contentId}`;
    const options = {
      type: 'DELETE',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: adapter.defineHeaders(),
      data: JSON.stringify({})
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Get the users information for the specified activity
   *
   * @param {string} classId
   * @param {string} contentId content uuid
   * @returns {Promise}
   */
  fetchUsersForClassActivity: function(classId, contentId) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/${classId}/contents/${contentId}/users`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Update the users information for the specified activity
   *
   * @param {string} classId
   * @param {string} contentId
   * @returns {Promise}
   */
  addUsersToActivity: function(classId, contentId, users) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/${classId}/contents/${contentId}/users`;
    const options = {
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: adapter.defineHeaders(),
      data: JSON.stringify({
        users: users
      })
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * @function getMonthlyActivitiesCount
   * Method to fetch activities count for given class
   */
  getMonthlyActivitiesCount(classId, month, year) {
    const adapter = this;
    const namespace = adapter.get('reportsNamespace');
    const url = `${namespace}/${classId}/activities`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data: {
        month,
        year
      }
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Update Mastery Accrual Class Activity
   *
   * @param {string} classId
   * @param {string} classActivityId
   * @param {Boolean} allow_mastery_accrual
   * @returns {boolean}
   */
  updateMasteryAccrualClassActivity: function(
    classId,
    classActivityId,
    allow_mastery_accrual
  ) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/${classId}/contents/${classActivityId}/mastery-accrual`;
    const options = {
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: adapter.defineHeaders(),
      data: JSON.stringify({
        allow_mastery_accrual
      })
    };
    return Ember.$.ajax(url, options);
  },

  defineHeaders: function() {
    return {
      Authorization: `Token ${this.get('session.token-api3')}`
    };
  }
});
