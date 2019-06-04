import Ember from 'ember';
import OfflineActivitySerializer from 'gooru-web/serializers/offline-activity/offline-activity';
import OfflineActivityAdapter from 'gooru-web/adapters/offline-activity/offline-activity';

/**
 * @typedef {Object} ActivityService
 */
export default Ember.Service.extend({
  /**
   * @property {OfflineActivitySerializer} OfflineActivitySerializer
   */
  offlineActivitySerializer: null,

  /**
   * @property {offlineActivityAdapter} offlineActivityAdapter
   */
  offlineActivityAdapter: null,

  /**
   * @property {CollectionService}
   */
  quizzesCollectionService: Ember.inject.service('quizzes/collection'),

  init: function() {
    this._super(...arguments);
    this.set(
      'offlineActivitySerializer',
      OfflineActivitySerializer.create(Ember.getOwner(this).ownerInjection())
    );
    this.set(
      'offlineActivityAdapter',
      OfflineActivityAdapter.create(Ember.getOwner(this).ownerInjection())
    );
  },

  /**
   * Creates a new activity
   *
   * @param activityId object with the Activity data
   * @returns {Promise}
   */
  createActivity: function(activityData) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      let serializedActivityData = service
        .get('offlineActivitySerializer')
        .serializeCreateActivity(activityData);
      service
        .get('offlineActivityAdapter')
        .createActivity({
          body: serializedActivityData
        })
        .then(
          function(responseData, textStatus, request) {
            let activityId = request.getResponseHeader('location');
            activityData.set('id', activityId);
            resolve(activityData);
          },
          function(error) {
            reject(error);
          }
        );
    });
  },

  /**
   * Gets an Activity by id
   * @param {string} activityId
   * @returns {Promise}
   */
  readActivity: function(activityId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('offlineActivityAdapter')
        .readActivity(activityId)
        .then(function(responseData) {
          resolve(
            service
              .get('offlineActivitySerializer')
              .normalizeReadActivity(responseData)
          );
        }, reject);
    });
  },

  /**
   * Get a list of OA subtype
   * @returns {Promise}
   */
  getSubTypes: function() {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('offlineActivityAdapter')
        .getSubTypes()
        .then(function(responseData) {
          resolve(
            service
              .get('offlineActivitySerializer')
              .normalizeSubTypes(responseData)
          );
        }, reject);
    });
  },

  /**
   * Creates a new activity
   *
   * @param activityId object with the Activity data
   * @returns {Promise}
   */
  updateActivity: function(activityId, activityData) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      let serializedActivityData = service
        .get('offlineActivitySerializer')
        .serializeCreateActivity(activityData);
      service
        .get('offlineActivityAdapter')
        .updateActivity(activityId, serializedActivityData)
        .then(
          function() {
            resolve(activityData);
          },
          function(error) {
            reject(error);
          }
        );
    });
  },

  /**
   * Creates a reference in a specific offline activity
   * @param activityId
   * @param referenceData
   * @returns {Promise}
   *
   */
  createReferences: function(referenceData) {
    var service = this;
    let serializedReferenceData = service
      .get('activitySerializer')
      .serializeReferenceData(referenceData);
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('activityAdapter')
        .createReferences(referenceData.oaId, serializedReferenceData)
        .then(
          function(responseData, textStatus, request) {
            let refId = request.getResponseHeader('location');
            referenceData.set('id', refId);
            resolve(referenceData);
          },
          function(error) {
            reject(error);
          }
        );
    });
  },

  /**
   * Delete activity
   *
   * @param activityId The activity id to delete
   * @returns {Ember.RSVP.Promise}
   */
  deleteActivity: function(activity) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('offlineActivityAdapter')
        .deleteActivity(activity.id)
        .then(function() {
          resolve();
        }, reject);
    });
  },

  /**
   * Copies an activity by id
   * @param {string} activityId
   * @returns {Ember.RSVP.Promise}
   */
  copyActivity: function(activityId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('offlineActivityAdapter')
        .copyActivity(activityId)
        .then(function(responseData, textStatus, request) {
          resolve(request.getResponseHeader('location'));
        }, reject);
    });
  },

  /**
   * Reorder activity resources
   *
   * @param activityId the id of the Activity to be updated
   * @param {string[]} questionIds
   * @returns {Promise}
   */
  reorderActivity: function(activityId, questionIds) {
    const service = this;
    let serializedData = service
      .get('offlineActivitySerializer')
      .serializeReorderActivity(questionIds);
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('offlineActivityAdapter')
        .reorderActivity(activityId, serializedData)
        .then(function() {
          service.notifyQuizzesActivityChange(activityId);
          resolve();
        }, reject);
    });
  },

  /**
   * Notify an activity change at quizzes
   * @param {string} activityId
   */
  notifyQuizzesActivityChange: function(activityId) {
    const quizzesCollectionService = this.get('quizzesCollectionService');
    Ember.Logger.info('Notifying activity change');
    return quizzesCollectionService.notifyCollectionChange(
      activityId,
      'activity'
    );
  },

  /**
   * Find  the mastery accrual for the given list of activityIds
   *
   * @param {string} activityIds
   * @returns {Promise}
   */
  activitysMasteryAccrual: function(activityIds) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('offlineActivityAdapter')
        .activitysMasteryAccrual(activityIds)
        .then(function(responseData) {
          resolve(
            service
              .get('offlineActivitySerializer')
              .normalizeActivitysMasteryAccrual(responseData)
          );
        }, reject);
    });
  },

  oaTaskSubmissions(taskSubmissionPayload) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('offlineActivityAdapter')
        .oaTaskSubmissions(taskSubmissionPayload)
        .then(function() {
          resolve(true);
        }, reject);
    });
  },
  /**
   * Delete reference
   *
   * @param activityId The activity id to delete
   * @returns {Ember.RSVP.Promise}
   */
  deleteReference: function(reference) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('offlineActivityAdapter')
        .deleteReference(reference.oaId, reference.id)
        .then(function() {
          resolve();
        }, reject);
    });
  }
});
