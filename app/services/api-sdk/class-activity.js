import Ember from 'ember';
import ClassActivityAdapter from 'gooru-web/adapters/content/class-activity';
import ClassActivitySerializer from 'gooru-web/serializers/content/class-activity';

/**
 * @typedef {Object} ClassActivityService
 */
export default Ember.Service.extend({
  /**
   * @property {PerformanceService} performanceService
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * @property {ClassActivityAdapter} classActivityAdapter
   */
  classActivityAdapter: null,

  init: function() {
    this._super(...arguments);
    this.set(
      'classActivitySerializer',
      ClassActivitySerializer.create(Ember.getOwner(this).ownerInjection())
    );
    this.set(
      'classActivityAdapter',
      ClassActivityAdapter.create(Ember.getOwner(this).ownerInjection())
    );
  },

  /**
   * Adds a new content to class
   *
   * @param {string} classId
   * @param {string} contentId
   * @param {string} contentType
   * @param {Date} addedDate
   * @param {Month} month optional, default is current month
   * @param {Year} year optional, default is current year
   * @returns {boolean}
   */
  addActivityToClass: function(
    classId,
    contentId,
    contentType,
    addedDate,
    forMonth = moment().format('MM'),
    forYear = moment().format('YYYY')
  ) {
    const service = this;
    if (addedDate != null) {
      forMonth = moment(addedDate).format('MM');
      forYear = moment(addedDate).format('YYYY');
    }
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('classActivityAdapter')
        .addActivityToClass(
          classId,
          contentId,
          contentType,
          addedDate,
          forMonth,
          forYear
        )
        .then(function(responseData, textStatus, request) {
          let newContentId = parseInt(request.getResponseHeader('location'));
          resolve(newContentId);
        }, reject);
    });
  },

  /**
   * Enables the class content
   *
   * @param {string} classId
   * @param {string} classActivityId
   * @param {Date} activationDate
   * @returns {boolean}
   */
  enableClassActivity: function(
    classId,
    classActivityId,
    activationDate = new Date()
  ) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('classActivityAdapter')
        .enableClassActivity(classId, classActivityId, activationDate)
        .then(function() {
          resolve(true);
        }, reject);
    });
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
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('classActivityAdapter')
        .findClassActivities(classId, contentType, forMonth, forYear)
        .then(function(payload) {
          const classActivities = service
            .get('classActivitySerializer')
            .normalizeFindClassActivities(payload);
          const startDate = moment(`${forYear}-${forMonth}-01`).format(
            'YYYY-MM-DD'
          );
          const endDate = moment(startDate)
            .endOf('month')
            .format('YYYY-MM-DD');
          service
            .findClassActivitiesPerformanceSummary(
              classId,
              classActivities,
              startDate,
              endDate
            )
            .then(resolve, reject);
        });
    });
  },

  /**
   * Gets all class activity for the authorized user (student|teacher)
   *
   * @param {string} userId
   * @param {string} classId
   * @param {string} contentType collection|assessment|resource|question
   * @param {Month} month optional, default is current month
   * @param {Year} year optional, default is current year
   * @returns {Promise.<ClassActivity[]>}
   */
  findStudentClassActivities: function(
    userId,
    classId,
    contentType = undefined,
    forMonth = moment().format('MM'),
    forYear = moment().format('YYYY')
  ) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('classActivityAdapter')
        .findClassActivities(classId, contentType, forMonth, forYear)
        .then(function(payload) {
          const classActivities = service
            .get('classActivitySerializer')
            .normalizeFindClassActivities(payload);
          const startDate = moment(`${forYear}-${forMonth}-01`).format(
            'YYYY-MM-DD'
          );
          const endDate = moment(startDate)
            .endOf('month')
            .format('YYYY-MM-DD');
          service
            .findStudentActivitiesPerformanceSummary(
              userId,
              classId,
              classActivities,
              startDate,
              endDate
            )
            .then(resolve, reject);
        });
    });
  },

  /**
   * Gets all class activity for the authorized user (student|teacher)
   * @param {string} userId
   * @param {string} classId
   * @param {ClassActivity[]} classActivities
   * @param {Date} startDate optional start date, default is now
   * @param {Date} endDate optional end date, default is now
   * @returns {Promise.<ClassActivity[]>}
   */
  findStudentActivitiesPerformanceSummary: function(
    userId,
    classId,
    classActivities,
    startDate = new Date(),
    endDate = new Date()
  ) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      const assessmentIds = classActivities
        .filterBy('collection.isAssessment')
        .mapBy('collection.id');
      const collectionIds = classActivities
        .filterBy('collection.isCollection')
        .mapBy('collection.id');
      const performanceService = service.get('performanceService');
      Ember.RSVP.hash({
        activityCollectionPerformanceSummaryItems: collectionIds.length
          ? performanceService.findStudentActivityPerformanceSummaryByIds(
            userId,
            classId,
            collectionIds,
            'collection',
            startDate,
            endDate
          )
          : [],
        activityAssessmentPerformanceSummaryItems: assessmentIds.length
          ? performanceService.findStudentActivityPerformanceSummaryByIds(
            userId,
            classId,
            assessmentIds,
            'assessment',
            startDate,
            endDate
          )
          : []
      }).then(function(hash) {
        let performances = hash.activityCollectionPerformanceSummaryItems.concat(
          hash.activityAssessmentPerformanceSummaryItems
        );
        performances.forEach(performance => {
          let classActivity = classActivities
            .filterBy('activation_date', performance.get('activation_date'))
            .filterBy(
              'collection.id',
              performance.get('collectionPerformanceSummary.collectionId')
            )
            .objectAt(0);

          if (classActivity) {
            let performanceData = performance.get(
              'collectionPerformanceSummary'
            );
            performanceData.set('hasStarted', true);
            classActivity.set('collection.performance', performanceData);
          }
        });

        resolve(classActivities);
      }, reject);
    });
  },

  /**
   * Gets all class activity for the authorized user (student|teacher)
   * @param {string} classId
   * @param {ClassActivity[]} classActivities
   * @param {Date} startDate optional start date, default is now
   * @param {Date} endDate optional end date, default is now
   * @returns {Promise.<ClassActivity[]>}
   */
  findClassActivitiesPerformanceSummary: function(
    classId,
    classActivities,
    startDate = new Date(),
    endDate = new Date()
  ) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      let assessmentIds = classActivities
        .filterBy('collection.isAssessment')
        .mapBy('collection.id');
      let collectionIds = classActivities
        .filterBy('collection.isCollection')
        .mapBy('collection.id');
      let externalCollectionIds = classActivities
        .filterBy('collection.isExternalCollection')
        .mapBy('collection.id');
      collectionIds = collectionIds.concat(externalCollectionIds);
      let externalAssessmentIds = classActivities
        .filterBy('collection.isExternalAssessment')
        .mapBy('collection.id');
      assessmentIds = assessmentIds.concat(externalAssessmentIds);
      const performanceService = service.get('performanceService');
      Ember.RSVP.hash({
        activityCollectionPerformanceSummaryItems: collectionIds.length
          ? performanceService.findClassActivityPerformanceSummaryByIds(
            classId,
            collectionIds,
            'collection',
            startDate,
            endDate
          )
          : [],
        activityAssessmentPerformanceSummaryItems: assessmentIds.length
          ? performanceService.findClassActivityPerformanceSummaryByIds(
            classId,
            assessmentIds,
            'assessment',
            startDate,
            endDate
          )
          : []
      }).then(function(hash) {
        let performances = hash.activityCollectionPerformanceSummaryItems.concat(
          hash.activityAssessmentPerformanceSummaryItems
        );
        performances.forEach(performance => {
          let classActivity = classActivities
            .filterBy('activation_date', performance.get('activation_date'))
            .filterBy(
              'collection.id',
              performance.get('collectionPerformanceSummary.collectionId')
            )
            .objectAt(0);
          if (classActivity) {
            let classActivityIndex = classActivities.indexOf(classActivity);
            let performanceData = performance.get(
              'collectionPerformanceSummary'
            );
            performanceData.set('hasStarted', true);
            classActivities[classActivityIndex].set(
              'collection.performance',
              performanceData
            );
          }
        });
        resolve(classActivities);
      }, reject);
    });
  },

  /**
   * Remove class activity from class which is added
   * @param {string} classId The class id to delete
   * @param {string} contentId The content id to delete
   * @returns {Promise}
   */
  removeClassActivity: function(classId, contentId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('classActivityAdapter')
        .removeClassActivity(classId, contentId)
        .then(resolve, reject);
    });
  },

  /**
   * Get the users information for the specified activity
   *
   * @param {string} classId
   * @param {string} contentId content uuid
   * @returns {Promise}
   */
  fetchUsersForClassActivity: function(classId, contentId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('classActivityAdapter')
        .fetchUsersForClassActivity(classId, contentId)
        .then(
          function(response) {
            resolve(
              service
                .get('classActivitySerializer')
                .normalizeFetchUsersForClassActivity(response)
            );
          },
          function(error) {
            reject(error);
          }
        );
    });
  },

  /**
   * Update the users information for the specified activity
   *
   * @param {string} classId
   * @param {string} contentId
   * @param {Array} list of user ids
   * @returns {Promise}
   */
  addUsersToActivity: function(classId, contentId, users) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('classActivityAdapter')
        .addUsersToActivity(classId, contentId, users)
        .then(resolve, reject);
    });
  }
});
