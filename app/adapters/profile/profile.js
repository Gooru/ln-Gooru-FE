import Ember from 'ember';
import { DEFAULT_PAGE_SIZE } from 'gooru-web/config/config';
import EndPointsConfig from 'gooru-web/utils/endpoint-config';

/**
 * Adapter to support the Profile CRUD operations in the API 3.0
 *
 * @typedef {Object} ProfileAdapter
 */
export default Ember.Object.extend({
  session: Ember.inject.service('session'),

  namespace: '/api/nucleus/v1/profiles',

  namespaceV2: '/api/nucleus/v2/profiles',

  usersNamespace: '/api/nucleus-auth/v1/users',

  authNamespace: '/api/nucleus-auth/v2',

  /**
   * Posts a request to the API to create a new user account
   *
   * @param data user data to be sent in the request body
   * @returns {Promise}
   */
  createProfile: function(data) {
    const adapter = this;
    const endpointUrl = EndPointsConfig.getEndpointSecureUrl();
    const namespace = this.get('authNamespace');
    const url = `${endpointUrl}${namespace}/signup`;
    const options = {
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      processData: false,
      headers: adapter.defineHeaders(),
      data: JSON.stringify(data.body)
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Updates the current user Profile data
   *
   * @param data the request body data
   * @returns {Promise}
   */
  updateMyProfile: function(data) {
    const adapter = this;
    const namespace = adapter.get('authNamespace');
    const url = `${namespace}/users`;
    const options = {
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      processData: false,
      headers: adapter.defineHeaders(),
      data: JSON.stringify(data.body)
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Gets the profile information of a given user id
   *
   * @param userId the unique profile user id
   * @returns {Promise}
   */
  readUserProfileByUsername: function(username) {
    const adapter = this;
    const namespace = adapter.get('namespaceV2');
    const url = `${namespace}/search?username=${username}`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Follows a user profile
   * @param userId
   * @returns {*|Promise}
   */
  followUserProfile: function(userId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/follow`;
    const options = {
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: adapter.defineHeaders(),
      data: JSON.stringify({ user_id: userId })
    };

    return Ember.$.ajax(url, options);
  },

  /**
   * Unfollows a user profile
   * @param userId
   * @returns {*|Promise}
   */
  unfollowUserProfile: function(userId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${userId}/unfollow`;
    const options = {
      type: 'DELETE',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };

    return Ember.$.ajax(url, options);
  },

  /**
   * Gets resources by user id
   *
   * @param {string} userId
   * @returns {Promise}
   */
  readResources: function(userId, params = {}) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${userId}/resources`;

    const page = params.page || 0;
    const pageSize = params.pageSize || DEFAULT_PAGE_SIZE;
    const offset = page * pageSize;
    var data = {
      limit: pageSize,
      offset: offset
    };
    if (params.searchText) {
      data.searchText = params.searchText;
    }
    if (params.sortOn) {
      data.sortOn = params.sortOn;
    }
    if (params.order) {
      data.order = params.order;
    }
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      data,
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Gets questions by user id
   *
   * @param {string} userId
   * @param {*} params
   * @returns {Promise}
   */
  readQuestions: function(userId, params = {}) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${userId}/questions`;

    const page = params.page || 0;
    const pageSize = params.pageSize || DEFAULT_PAGE_SIZE;
    const offset = page * pageSize;
    var data = {
      limit: pageSize,
      offset: offset
    };
    if (params.searchText) {
      data.searchText = params.searchText;
    }
    if (params.sortOn) {
      data.sortOn = params.sortOn;
    }
    if (params.order) {
      data.order = params.order;
    }

    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      data,
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Gets collections by user id
   *
   * @param {string} userId
   * @param {*} params
   * @returns {Promise}
   */
  readCollections: function(userId, params = {}) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${userId}/collections`;

    const page = params.page || 0;
    const pageSize = params.pageSize || DEFAULT_PAGE_SIZE;
    const offset = page * pageSize;
    var data = {
      limit: pageSize,
      offset: offset
    };
    if (params.filterBy) {
      data.filterBy = params.filterBy;
    }
    if (params.searchText) {
      data.searchText = params.searchText;
    }
    if (params.sortOn) {
      data.sortOn = params.sortOn;
    }
    if (params.order) {
      data.order = params.order;
    }
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      data,
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Gets assessments by user id
   *
   * @param {string} userId
   * @param {*} params
   * @returns {Promise}
   */
  readAssessments: function(userId, params = {}) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${userId}/assessments`;

    const page = params.page || 0;
    const pageSize = params.pageSize || DEFAULT_PAGE_SIZE;
    const offset = page * pageSize;
    var data = {
      limit: pageSize,
      offset: offset
    };
    if (params.filterBy) {
      data.filterBy = params.filterBy;
    }
    if (params.searchText) {
      data.searchText = params.searchText;
    }
    if (params.sortOn) {
      data.sortOn = params.sortOn;
    }
    if (params.order) {
      data.order = params.order;
    }
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data
    };
    return Ember.$.ajax(url, options);
  },
  /**
   * Gets Rubrics by user id
   *
   * @param {string} userId
   * @param {*} params
   * @returns {Promise}
   */
  readRubrics: function(userId, params = {}) {
    const adapter = this;
    const namespace = adapter.get('namespaceV2');
    const url = `${namespace}/${userId}/rubrics`;

    const page = params.page || 0;
    const pageSize = params.pageSize || DEFAULT_PAGE_SIZE;
    const offset = page * pageSize;
    var data = {
      limit: pageSize,
      offset: offset
    };
    if (params.filterBy) {
      data.filterBy = params.filterBy;
    }
    if (params.searchText) {
      data.searchText = params.searchText;
    }
    if (params.sortOn) {
      data.sortOn = params.sortOn;
    }
    if (params.order) {
      data.order = params.order;
    }
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Gets Rubrics by user id
   *
   * @param {string} userId
   * @param {*} params
   * @returns {Promise}
   */
  readOfflineActivities(userId, params = {}) {
    const adapter = this;
    const namespace = adapter.get('namespaceV2');
    const url = `${namespace}/${userId}/offline-activities`;

    const page = params.page || 0;
    const pageSize = params.pageSize || DEFAULT_PAGE_SIZE;
    const offset = page * pageSize;
    var data = {
      limit: pageSize,
      offset: offset
    };
    if (params.filterBy) {
      data.filterBy = params.filterBy;
    }
    if (params.searchText) {
      data.searchText = params.searchText;
    }
    if (params.sortOn) {
      data.sortOn = params.sortOn;
    }
    if (params.order) {
      data.order = params.order;
    }
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Start the forgot password workflow
   * @param username
   * @returns {*|Promise}
   */
  forgotPassword: function(email) {
    const adapter = this;
    const namespace = adapter.get('authNamespace');
    const tenantId = this.get('session.tenantId');
    const url = `${namespace}/users/reset-password`;
    const options = {
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: adapter.defineHeaders(),
      data: JSON.stringify({
        email: email,
        tenant_id: tenantId
      })
    };

    return Ember.$.ajax(url, options);
  },

  /**
   * Resets the user password
   * @param token
   * @returns {*|Promise}
   */
  resetPassword: function(password, token) {
    const adapter = this;
    const endpointUrl = EndPointsConfig.getEndpointSecureUrl();
    const namespace = adapter.get('authNamespace');
    const url = `${endpointUrl}${namespace}/users/reset-password`;
    const options = {
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: adapter.defineHeaders(),
      data: JSON.stringify({
        token,
        password: password
      })
    };

    return Ember.$.ajax(url, options);
  },

  /**
   * Changes the user password
   * @param {string} oldPassword
   * @param {string} newPassword
   * @returns {Ember.RSVP.Promise}
   */
  changePassword: function(oldPassword, newPassword) {
    const adapter = this;
    const endpointUrl = EndPointsConfig.getEndpointSecureUrl();
    const namespace = adapter.get('authNamespace');
    const url = `${endpointUrl}${namespace}/users/change-password`;
    const options = {
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: adapter.defineHeaders(),
      data: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword
      })
    };

    return Ember.$.ajax(url, options);
  },

  /**
   * Gets network by user id
   *
   * @param {string} userId
   * @param {string} type - followers or following
   * @returns {Promise}
   */
  readNetwork: function(userId, type) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${userId}/network`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data: {
        details: type
      }
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Get basic Profile data for a list of profile IDs
   *
   * @param profileIds the list of profile IDs
   * @returns {Promise}
   */
  readMultipleProfiles: function(profileIds) {
    const adapter = this;
    const namespace = adapter.get('namespaceV2');
    const url = `${namespace}/search`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders(),
      data: {
        userids: Ember.isArray(profileIds) ? profileIds.join() : null
      }
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Get  Profile preference for current profile
   *  @returns {Promise}
   *  @yields { preference_settings: {"standard_preference": {"K12.MA": "TEKS"}   } }
   *  @example http://nile-dev.gooru.org/api/nucleus/v2/profiles/preference
   */
  getProfilePreference: function() {
    const adapter = this;
    const namespace = adapter.get('namespaceV2');
    const url = `${namespace}/preference`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Update Profile preference for current profile
   *  @returns {Promise}
   *  @payload {"standard_preference": {"K12.MA": "TEKS"}   }
   *  @example http://nile-dev.gooru.org/api/nucleus/v2/profiles/preference
   */
  updateProfilePreference: function(data) {
    const adapter = this;
    const namespace = adapter.get('namespaceV2');
    const url = `${namespace}/preference`;
    const options = {
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      processData: false,
      headers: adapter.defineHeaders(),
      data: JSON.stringify(data)
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * @function searchUserProfiles
   * @param {Object} searchCriteria
   * @return {Promise}
   * Method to do partial search like fetching users based on partial matching user context
   */
  searchUserProfiles(searchCriteria) {
    const adapter = this;
    const namespace = adapter.get('namespaceV2');
    const url = `${namespace}/search`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders(),
      data: {
        partial: true
      }
    };
    options.data = Object.assign(options.data, searchCriteria);
    return Ember.$.ajax(url, options);
  },

  defineHeaders: function() {
    return {
      Authorization: `Token ${this.get('session.token-api3')}`
    };
  },
  loadScript: function(script, isQuizzes) {
    const adapter = this;
    const localAssetMap = {
      ar: 'assets/locales/ar/translations.js',
      as: 'assets/locales/as/translations.js',
      bn: 'assets/locales/bn/translations.js',
      en: 'assets/locales/en/translations.js',
      gu: 'assets/locales/gu/translations.js',
      hi: 'assets/locales/hi/translations.js',
      kn: 'assets/locales/kn/translations.js',
      ml: 'assets/locales/ml/translations.js',
      mr: 'assets/locales/mr/translations.js',
      or: 'assets/locales/or/translations.js',
      pa: 'assets/locales/pa/translations.js',
      sp: 'assets/locales/sp/translations.js',
      ta: 'assets/locales/ta/translations.js',
      te: 'assets/locales/te/translations.js'
    };

    const localQuizzesAssetMap = {
      ar: 'assets/quizzes-addon/locales/ar/quizzes/translations.js',
      as: 'assets/quizzes-addon/locales/as/quizzes/translations.js',
      bn: 'assets/quizzes-addon/locales/bn/quizzes/translations.js',
      en: 'assets/quizzes-addon/locales/en/quizzes/translations.js',
      gu: 'assets/quizzes-addon/locales/gu/quizzes/translations.js',
      hi: 'assets/quizzes-addon/locales/hi/quizzes/translations.js',
      kn: 'assets/quizzes-addon/locales/kn/quizzes/translations.js',
      ml: 'assets/quizzes-addon/locales/ml/quizzes/translations.js',
      mr: 'assets/quizzes-addon/locales/mr/quizzes/translations.js',
      or: 'assets/quizzes-addon/locales/or/quizzes/translations.js',
      pa: 'assets/quizzes-addon/locales/pa/quizzes/translations.js',
      sp: 'assets/quizzes-addon/locales/sp/quizzes/translations.js',
      ta: 'assets/quizzes-addon/locales/ta/quizzes/translations.js',
      te: 'assets/quizzes-addon/locales/te/quizzes/translations.js'
    };

    let url = isQuizzes ? localQuizzesAssetMap[script] : localAssetMap[script];
    let originLocation = `${window.location.origin}/`;
    url = originLocation + url;

    const options = {
      cache: true,
      type: 'GET',
      headers: adapter.defineHeaders(),
      url: url,
      dataType: 'script'
    };

    return Ember.$.ajax(url, options);
  }
});
