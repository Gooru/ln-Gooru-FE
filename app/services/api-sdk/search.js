import Ember from 'ember';
import SearchSerializer from 'gooru-web/serializers/search/search';
import SearchAdapter from 'gooru-web/adapters/search/search';

/**
 * Service to support the Search of Collections and Resources
 *
 * @typedef {Object} SearchService
 */
export default Ember.Service.extend({
  searchSerializer: null,

  searchAdapter: null,

  /**
   * Make a cache of competency content and make use of offset as well to avoid recursive API
   */
  competencyContentContainer: null,

  init: function() {
    this._super(...arguments);
    this.set(
      'searchSerializer',
      SearchSerializer.create(Ember.getOwner(this).ownerInjection())
    );
    this.set(
      'searchAdapter',
      SearchAdapter.create(Ember.getOwner(this).ownerInjection())
    );
    this.set('competencyContentContainer', []);
  },

  /**
   * Search for collections
   *
   * @param term the term to search
   * @param params
   * @param resetPagination indicates if the pagination needs a reset
   * @returns {Promise}
   */
  searchCollections: function(term, params, resetPagination = false) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('searchAdapter')
        .searchCollections(term, params, resetPagination)
        .then(function(response) {
          resolve(
            service.get('searchSerializer').normalizeSearchCollections(response)
          );
        }, reject);
    });
  },

  /**
   * Search for assessments
   *
   * @param term the term to search
   * @param params
   * @param resetPagination indicates if the pagination needs a reset
   * @returns {Promise}
   */
  searchAssessments: function(term, params, resetPagination = false) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('searchAdapter')
        .searchAssessments(term, params, resetPagination)
        .then(function(response) {
          resolve(
            service.get('searchSerializer').normalizeSearchAssessments(response)
          );
        }, reject);
    });
  },

  /**
   * Search for resources
   *
   * @param term the term to search
   * @param params
   * @param resetPagination indicates if the pagination needs a reset
   * @returns {Promise.<Resource[]>}
   */
  searchResources: function(term, params, resetPagination = false) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('searchAdapter')
        .searchResources(term, params, resetPagination)
        .then(
          function(response) {
            resolve(
              service.get('searchSerializer').normalizeSearchResources(response)
            );
          },
          function(error) {
            reject(error);
          }
        );
    });
  },

  /**
   * Search for questions
   *
   * @param term the term to search
   * @param params
   * @param resetPagination indicates if the pagination needs a reset
   * @returns {Promise.<Question[]>}
   */
  searchQuestions: function(term, params, resetPagination = false) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('searchAdapter')
        .searchQuestions(term, params, resetPagination)
        .then(
          function(response) {
            resolve(
              service.get('searchSerializer').normalizeSearchQuestions(response)
            );
          },
          function(error) {
            reject(error);
          }
        );
    });
  },

  /**
   * Search for featured courses
   *
   * @param term the term to search
   * @returns {Promise.<Question[]>}
   */
  searchFeaturedCourses: function(term, filters) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('searchAdapter')
        .searchFeaturedCourses(term, filters)
        .then(
          function(response) {
            resolve(
              service.get('searchSerializer').normalizeSearchCourses(response)
            );
          },
          function(error) {
            reject(error);
          }
        );
    });
  },

  /**
   * Search for courses
   *
   * @param term the term to search
   * @returns {Promise.<Question[]>}
   */
  searchCourses: function(term) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('searchAdapter')
        .searchCourses(term)
        .then(
          function(response) {
            resolve(
              service.get('searchSerializer').normalizeSearchCourses(response)
            );
          },
          function(error) {
            reject(error);
          }
        );
    });
  },

  fetchLearningMapsContent(gutCode, filters) {
    const service = this;
    let start = filters.start || 0;
    let competencyContentContainer = service.get('competencyContentContainer');
    return new Ember.RSVP.Promise(function(resolve, reject) {
      let isCompetencyContentAvailable = competencyContentContainer[
        `${gutCode}`
      ]
        ? competencyContentContainer[`${gutCode}`][start] || null
        : null;
      if (isCompetencyContentAvailable) {
        resolve(competencyContentContainer[`${gutCode}`][start]);
      } else {
        service
          .get('searchAdapter')
          .fetchLearningMapsContent(gutCode, filters)
          .then(
            function(response) {
              let normalizedCompetencyContent = service
                .get('searchSerializer')
                .normalizeLearningMapsContent(response);
              let fetchedCompetencyContent =
                competencyContentContainer[`${gutCode}`] || [];
              fetchedCompetencyContent[start] = normalizedCompetencyContent;
              competencyContentContainer[
                `${gutCode}`
              ] = fetchedCompetencyContent;
              service.set(
                'competencyContentContainer',
                competencyContentContainer
              );
              resolve(normalizedCompetencyContent);
            },
            function(error) {
              reject(error);
            }
          );
      }
    });
  },

  fetchLearningMapsCompetencyContent(gutCode, filters) {
    const service = this;
    let start = filters.startAt || 0;
    let competencyContentContainer = service.get('competencyContentContainer');
    return new Ember.RSVP.Promise(function(resolve, reject) {
      let isCompetencyContentAvailable = competencyContentContainer[
        `${gutCode}`
      ]
        ? competencyContentContainer[`${gutCode}`][start] || null
        : null;
      if (isCompetencyContentAvailable) {
        resolve(competencyContentContainer[`${gutCode}`][start]);
      } else {
        service
          .get('searchAdapter')
          .fetchLearningMapsCompetencyContent(gutCode, filters)
          .then(
            function(response) {
              let normalizedCompetencyContent = service
                .get('searchSerializer')
                .normalizeLearningMapsContent(response);
              let fetchedCompetencyContent =
                competencyContentContainer[`${gutCode}`] || [];
              fetchedCompetencyContent[start] = normalizedCompetencyContent;
              competencyContentContainer[
                `${gutCode}`
              ] = fetchedCompetencyContent;
              service.set(
                'competencyContentContainer',
                competencyContentContainer
              );
              resolve(normalizedCompetencyContent);
            },
            function(error) {
              reject(error);
            }
          );
      }
    });
  }
});
