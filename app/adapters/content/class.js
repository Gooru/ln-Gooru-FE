import Ember from 'ember';

/**
 * Adapter to support the Class CRUD operations in the API 3.0
 *
 * @typedef {Object} ClassAdapter
 */
export default Ember.Object.extend({
  session: Ember.inject.service('session'),

  namespace: '/api/nucleus/v1/classes',

  reportNamespace: '/api/nucleus-download-reports/v1',

  demoNamespace: '/api/demo/v1',

  /**
   * Archive class
   *
   * @param classId Identifier of the class to be archive
   * @returns {Promise}
   */
  archiveClass: function(classId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${classId}/archive`;
    const options = {
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: adapter.defineHeaders(),
      data: JSON.stringify({})
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Posts a new class
   *
   * @param data class data to be sent in the request body
   * @returns {Promise}
   */
  createClass: function(data) {
    const adapter = this;
    const url = adapter.get('namespace');
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
   * Updates an existing class
   *
   * @param data class data to be sent in the request body
   * @returns {Promise}
   */
  updateClass: function(data) {
    const adapter = this;
    const classId = data.classId;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${classId}`;
    const options = {
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: adapter.defineHeaders(),
      data: JSON.stringify(data.class)
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Deletes a class by id
   *
   * @param classId class id to be sent
   * @returns {Promise}
   */
  deleteClass: function(classId) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/${classId}`;
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
   * Remove Student from a specific class
   *
   * @param classId class id to be sent
   * @param userId user id to be deleted
   * @returns {Promise}
   */
  removeStudentFromClass: function(classId, userId) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/${classId}/members/${userId}`;
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
   * Join class
   *
   * @param {string} code class code
   * @returns {Promise}
   */
  joinClass: function(code) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${code}/members`;
    const options = {
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: adapter.defineHeaders(),
      data: JSON.stringify({}) //empty body is required by the BE
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Gets the list of classes for a user
   * @returns {Promise}
   */
  getMyClasses: function() {
    const adapter = this;
    const url = adapter.get('namespace');
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Gets the class information of a given class id
   * @param classId the class ID to be read
   * @returns {Promise}
   */
  readClassInfo: function(classId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${classId}`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Get the list of members, invitees, collaborators and owner of the class
   * @param classId the class ID to be read
   * @returns {Promise}
   */
  readClassMembers: function(classId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${classId}/members`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Gets the class content visibility
   * @param classId the class ID to be read
   * @returns {Promise}
   */
  readClassContentVisibility: function(classId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${classId}/courses`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },
  /**
   * Update content visibility
   * @param []
   * @returns {Promise}
   */
  updateContentVisibility: function(classId, content) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${classId}/courses`;
    const options = {
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: adapter.defineHeaders(),
      data: JSON.stringify({
        assessments: content.assessments
      })
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Associates a Course with a Class
   *
   * @param classId the class id
   * @param courseId the course id
   * @returns {Promise}
   */
  associateCourseToClass: function(courseId, classId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${classId}/courses/${courseId}`;
    const options = {
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: adapter.defineHeaders(),
      data: JSON.stringify({})
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Gets the class report status for an archived class
   * @param {string} classId the class id
   * @param {string} courseId the course id
   * @param {string} userId the user id
   * @returns {Promise.<string>} available|queued|in-progress
   */
  readClassReportStatus: function(classId, courseId, userId) {
    const adapter = this;
    const namespace = adapter.get('reportNamespace');
    const sessionToken = encodeURIComponent(this.get('session.token-api3'));
    const url = `${namespace}/class/${classId}/course/${courseId}/download/request?sessionToken=${sessionToken}&userId=${userId}`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Creates the headers required by API 3.0
   * @returns {{Authorization: string}}
   */
  defineHeaders: function() {
    return {
      Authorization: `Token ${this.get('session.token-api3')}`
    };
  },

  /**
   * Remove co-teacher From Class
   * @param classId
   * @param userId the user id to delete
   * @returns {Promise}
   */
  removeCoTeacherFromClass: function(classId, collaborator) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/${classId}/collaborators`;
    const options = {
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: adapter.defineHeaders(),
      data: JSON.stringify({
        collaborator: collaborator
      })
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * @function joinCoTeacherIntoClass
   * Method to join as a co-teacher into a class
   */
  joinCoTeacherIntoClass(classCode) {
    const adapter = this;
    const namespace = this.get('demoNamespace');
    const url = `${namespace}/coteacher`;
    const options = {
      type: 'POST',
      contentType: 'application/json',
      headers: adapter.defineHeaders(),
      data: JSON.stringify({
        code: classCode
      })
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * profileBaseLine class
   * @param classId Identifier of the class to be baseLine
   * @param users Array of profileids which needs to be baselined, a empty array is for whole class
   * @returns {Promise}
   */
  profileBaseLine: function(classId, users) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${classId}/profilebaseline`;
    const options = {
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data: JSON.stringify({
        users: users ? [users] : []
      })
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Updates class settings
   * @param classId Identifier of the class to update
   * @param settings {"grade_lower_bound" : 1, "grade_upper_bound" : 3, "grade_current" : 2, "route0: true}
   * @returns {Promise}
   */
  classSettings: function(classId, settings) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${classId}/settings/reroute`;
    const options = {
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data: JSON.stringify(settings)
    };
    return Ember.$.ajax(url, options);
  },
  /**
   * Updates grade settings, Grade Settings for Student
   * @param classId Identifier of the class to update
   * @param settings {"grade_lower_bound" : 1, "grade_upper_bound" : 3, "grade_current" : 2, "route0: true}
   * @example
   * <pre>PUT /api/nucleus/{version}/classes/{class-id}/members/settings/reroute
   { "grade_lower_bound" : 1, "grade_upper_bound" : 3, "users" : ["68492039-3713-42de-90ad-94d5945cd482", "a71fc3aa-38b4-41bd-b7ef-6be7b509d3d7"] }
   * @returns {Promise}
   */
  classMembersSettings: function(classId, settings) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${classId}/members/settings/reroute`;
    const options = {
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data: JSON.stringify(settings)
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Updates grade settings, Grade Settings for Student
   * @param classId Identifier of the class to update
   * @param users {"grade_lower_bound" : 1, "grade_upper_bound" : 3, "grade_current" : 2, "route0: true}
   * @example
   *  PUT /api/nucleus/{version}/classes/{class-id}/members/deactivate
   { "users" : ["68492039-3713-42de-90ad-94d5945cd482", "a71fc3aa-38b4-41bd-b7ef-6be7b509d3d7"] }
   * @returns {Promise}
   */
  classMembersDeactivate: function(classId, users) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${classId}/members/deactivate`;
    const options = {
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data: JSON.stringify(users)
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Updates grade settings, Grade Settings for Student
   * @param classId Identifier of the class to update
   * @param users
   * @example
   *  PUT /api/nucleus/{version}/classes/{class-id}/members/activate
   { "users" : ["68492039-3713-42de-90ad-94d5945cd482", "a71fc3aa-38b4-41bd-b7ef-6be7b509d3d7"] }
   * @returns {Promise}
   */
  classMembersActivate: function(classId, users) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${classId}/members/activate`;
    const options = {
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data: JSON.stringify(users)
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * @function updatePreference
   * Method to update class preference
   */
  updatePreference(classid, preference) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${classid}/preference`;
    const options = {
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data: JSON.stringify({
        preference: preference
      })
    };
    return Ember.$.ajax(url, options);
  },
  /**
   * @function updateLanguage
   * Method to update class language
   */
  updateLanguage(classid, language) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${classid}/language/${language}`;
    const options = {
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data: JSON.stringify({})
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * @function updateProfileBaseline
   * Method to update profile baseline
   */
  updateProfileBaseline(classId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${classId}/profilebaseline/student`;
    const options = {
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data: JSON.stringify({})
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * @function addStudentsToClass
   * @param {UUID} classId
   * @param {Object} dataParam
   * Method to add students into a class
   */
  addStudentsToClass(classId, dataParam) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${classId}/students`;
    const options = {
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data: JSON.stringify(dataParam)
    };
    return Ember.$.ajax(url, options);
  }
});
