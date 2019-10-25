import Ember from 'ember';
import SuggestAdapter from 'gooru-web/adapters/suggest/suggest';
import SuggestSerializer from 'gooru-web/serializers/suggest/suggest';
import SuggestContext from 'gooru-web/models/suggest/suggest-context';
import { CONTENT_TYPES } from 'gooru-web/config/config';
/**
 * Service to support the suggest functionality
 *
 * Country, State, District
 *
 * @typedef {Object} SuggestService
 */
export default Ember.Service.extend({
  suggestSerializer: null,

  suggestAdapter: null,

  /**
   * @property {CollectionService}
   */
  collectionService: Ember.inject.service('api-sdk/collection'),

  /**
   * @property {CollectionService}
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  /**
   * @property {OfflineActivityService}
   */
  /**
   * @requires service:api-sdk/offline-activity
   */
  offlineActivityService: Ember.inject.service(
    'api-sdk/offline-activity/offline-activity'
  ),
  /**
   * @property {PerformanceService}
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  init: function() {
    this._super(...arguments);
    this.set(
      'suggestAdapter',
      SuggestAdapter.create(Ember.getOwner(this).ownerInjection())
    );
    this.set(
      'suggestSerializer',
      SuggestSerializer.create(Ember.getOwner(this).ownerInjection())
    );
  },

  /**
   * Gets resource suggestions for an specific collection/assessment in a course
   * @param {string} userId
   * @param {string} courseId
   * @param {string} unitId
   * @param {string} lessonId
   * @param {string} collectionId
   * @param {number} score
   * @param {number} timeSpent
   * @returns {Promise.<Resource[]>}
   */
  suggestResourcesForCollectionInCourse: function(
    userId,
    courseId,
    unitId,
    lessonId,
    collectionId,
    score = undefined,
    timeSpent = undefined
  ) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      const context = SuggestContext.create({
        collectionId: collectionId,
        userId: userId,
        courseId: courseId,
        unitId: unitId,
        lessonId: lessonId,
        score: score,
        timeSpent: timeSpent
      });
      service
        .get('suggestAdapter')
        .suggestResourcesForCollection(context)
        .then(function(response) {
          resolve(
            service.get('suggestSerializer').normalizeSuggestResources(response)
          );
        }, reject);
    });
  },

  /**
   * Gets resource suggestions for an specific collection/assessment
   * @param {string} userId
   * @param {string} collectionId
   * @param {number} score
   * @param {number} timeSpent
   * @returns {Promise.<Resource[]>}
   */
  suggestResourcesForCollection: function(
    userId,
    collectionId,
    score = undefined,
    timeSpent = undefined
  ) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      const context = SuggestContext.create({
        collectionId: collectionId,
        userId: userId,
        score: score,
        timeSpent: timeSpent
      });
      service
        .get('suggestAdapter')
        .suggestResourcesForCollection(context)
        .then(function(response) {
          resolve(
            service.get('suggestSerializer').normalizeSuggestResources(response)
          );
        }, reject);
    });
  },

  /**
   * Gets resource suggestions for an specific resource in a course
   * @param {string} userId
   * @param {string} courseId
   * @param {string} unitId
   * @param {string} lessonId
   * @param {string} collectionId
   * @param {string} resourceId
   * @returns {Promise.<Resource[]>}
   */
  suggestResourcesForResourceInCourse: function(
    userId,
    courseId,
    unitId,
    lessonId,
    collectionId,
    resourceId
  ) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      const context = SuggestContext.create({
        containerId: collectionId,
        userId: userId,
        courseId: courseId,
        unitId: unitId,
        lessonId: lessonId
      });
      service
        .get('suggestAdapter')
        .suggestResourcesForResource(resourceId, context)
        .then(function(response) {
          resolve(
            service.get('suggestSerializer').normalizeSuggestResources(response)
          );
        }, reject);
    });
  },

  /**
   * Gets resource suggestions for an specific resource
   * @param {string} userId
   * @param {string} resourceId
   * @returns {Promise.<Resource[]>}
   */
  suggestResourcesForResource: function(userId, resourceId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      const context = SuggestContext.create({
        userId: userId
      });
      service
        .get('suggestAdapter')
        .suggestResourcesForResource(resourceId, context)
        .then(function(response) {
          resolve(
            service.get('suggestSerializer').normalizeSuggestResources(response)
          );
        }, reject);
    });
  },

  /**
   * Add class-activity suggestions
   * @param {SuggestContext} context
   * @returns {Promise}
   */
  suggestContent(context) {
    const service = this;
    return service.get('suggestAdapter').suggestContent(context);
  },

  fetchSuggestionsByCAId(classId, context) {
    const service = this;
    const userId = context.userId;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('suggestAdapter')
        .fetchSuggestionForCA(classId, context)
        .then(function(response) {
          const normalizedContent = service
            .get('suggestSerializer')
            .normalizeCASuggestionContents(response.suggestions.objectAt(0));
          const suggestions = normalizedContent.get('suggestions');
          const pathIds = suggestions.map(suggestion => {
            return suggestion.get('suggestedToContext.id');
          });
          service
            .get('performanceService')
            .fecthSuggestionPerformance({
              source: 'dca',
              classId,
              userId,
              pathIds
            })
            .then(result => {
              result.map(performance => {
                const pathId = performance.get('pathId');
                let suggestion = suggestions.findBy(
                  'suggestedToContext.id',
                  pathId
                );
                suggestion.set('performance', performance);
              });
            });
          resolve(normalizedContent);
        }, reject);
    });
  },

  getSuggestionCountForCA(classId, context) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('suggestAdapter')
        .fetchSuggestionForCA(classId, context)
        .then(function(response) {
          let suggestions = service
            .get('suggestSerializer')
            .normalizeSuggestionCount(response);
          resolve(suggestions);
        }, reject);
    });
  },

  fetchAcrossClassSuggestionsByCode(userId, code, params) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('suggestAdapter')
        .fetchAcrossClassSuggestionsByCode(userId, code, params)
        .then(function(response) {
          let normalizedContent = service
            .get('suggestSerializer')
            .normalizeProficiencySuggestionContents(response);
          let collectionPromise = [];
          normalizedContent.suggestions.forEach(suggestion => {
            let collectionService = null;
            if (suggestion.suggestedContentType === CONTENT_TYPES.ASSESSMENT) {
              collectionService = service
                .get('assessmentService')
                .readAssessment(suggestion.suggestedContentId);
            } else if (
              suggestion.suggestedContentType === CONTENT_TYPES.COLLECTION
            ) {
              collectionService = service
                .get('collectionService')
                .readCollection(suggestion.suggestedContentId);
            } else {
              collectionService = service
                .get('offlineActivityService')
                .readActivity(suggestion.suggestedContentId);
            }
            collectionPromise.push(collectionService);
          });
          Ember.RSVP.Promise.all(collectionPromise).then(function(data) {
            data.forEach((collection, index) => {
              let suggestionContent = normalizedContent.suggestions.objectAt(
                index
              );
              suggestionContent.set('collection', collection);
            });
            resolve(normalizedContent);
          });
        }, reject);
    });
  },

  fetchInClassSuggestionsByCode(userId, code, params) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('suggestAdapter')
        .fetchInClassSuggestionsByCode(userId, code, params)
        .then(function(response) {
          resolve(response);
        }, reject);
    });
  },

  /**
   * fetch In-Class suggestions for student
   * @param {string} source
   * @returns {Promise}
   */
  fetchInClassSuggestionsForStudent(userId, classId, params) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('suggestAdapter')
        .fetchInClassSuggestionsForStudent(userId, classId, params)
        .then(function(response) {
          let suggestions = service
            .get('suggestSerializer')
            .normalizeSuggestionContainer(response);
          const caContents = suggestions.filterBy(
            'suggestionArea',
            'class-activity'
          );
          const courseMapContents = suggestions.filterBy(
            'suggestionArea',
            'course-map'
          );
          const proficiencyContents = suggestions.filterBy(
            'suggestionArea',
            'proficiency'
          );
          const caPathIds = caContents.map(caContent => {
            return caContent.get('id');
          });
          const proficienyPathIds = proficiencyContents.map(
            proficiencyContent => {
              return proficiencyContent.get('id');
            }
          );
          const courseMapPathIds = courseMapContents.map(courseMapContent => {
            return courseMapContent.get('id');
          });
          if (caPathIds.length) {
            service
              .get('performanceService')
              .fecthSuggestionPerformance({
                source: 'dca',
                classId,
                userId,
                pathIds: caPathIds
              })
              .then(result => {
                result.map(performance => {
                  const pathId = performance.get('pathId');
                  let suggestion = suggestions.findBy('id', pathId);
                  suggestion.set('performance', performance);
                });
              });
          }
          if (proficienyPathIds.length) {
            service
              .get('performanceService')
              .fecthSuggestionPerformance({
                source: 'proficiency',
                classId,
                userId,
                pathIds: proficienyPathIds
              })
              .then(result => {
                result.map(performance => {
                  const pathId = performance.get('pathId');
                  let suggestion = suggestions.findBy('id', pathId);
                  suggestion.set('performance', performance);
                });
              });
          }
          if (courseMapPathIds.length) {
            service
              .get('performanceService')
              .fecthSuggestionPerformance({
                source: 'coursemap',
                classId,
                userId,
                pathIds: courseMapPathIds
              })
              .then(result => {
                result.map(performance => {
                  const pathId = performance.get('pathId');
                  let suggestion = suggestions.findBy('id', pathId);
                  suggestion.set('performance', performance);
                });
              });
          }
          resolve(suggestions);
        }, reject);
    });
  }
});
