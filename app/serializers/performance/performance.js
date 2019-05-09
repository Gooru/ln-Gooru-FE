import Ember from 'ember';
import DS from 'ember-data';

/**
 * Serializer for Performance model
 *
 * @typedef {Object} PerformanceSerializer
 */
export default DS.JSONAPISerializer.extend({
  /**
   * Normalizes the response for the QueryRecord method
   * @param store
   * @param primaryModelClass
   * @param payload
   * @returns {Performance|Performance[]} returns a Performance object or Performance array
   */
  normalizeQueryResponse: function(store, primaryModelClass, payload) {
    const serializer = this;
    const hasResults = payload.content.length > 0;
    var model = {
      data: []
    };
    if (hasResults) {
      model = serializer.getSingleRecord(payload.content[0]);
    }
    return model;
  },

  normalizeGetStudentsCollectionPerformance(payload) {
    let studentPerformances = payload ? payload.content || null : null;
    return studentPerformances || Ember.A([]);
  },
  /**
   * Normalizes the response for the QueryRecord method
   * @param store
   * @param primaryModelClass
   * @param payload
   * @returns {Performance|Performance[]} returns a Performance object or Performance array
   */
  getSingleRecord: function(payload) {
    const serializer = this;
    var results = payload.usageData;

    if (payload.alternatePath) {
      Ember.$.each(payload.alternatePath, (index, alternatePath) =>
        results.push(alternatePath)
      );
    }

    var model = {
      data: []
    };
    Ember.$.each(results, function(index, result) {
      model.data.push(serializer.normalizePerformanceAttributes(result));
    });
    return model;
  },

  /**
   * Normalizes performance attributes, userId is for Class performance, without userId if for Student Performance
   * @param result
   * @param userId
   * @returns {object} returns an object
   */
  normalizePerformanceAttributes: function(result, userId) {
    const serializer = this;

    /**
     *  Use the format 'userId@model-id' for class performance to differentiate student units
     *  If it's student performance we use only the model-id
     */
    var id = userId ? `${userId}@` : '';
    return {
      id: id + serializer.getModelId(result),
      type: serializer.getModelType(),
      attributes: {
        type: serializer.getObjectType(result),
        score: result.scoreInPercentage,
        completionDone: result.completedCount,
        completionTotal: result.totalCount,
        timeSpent: result.timeSpent,
        attempts: result.attempts,
        ratingScore: result.reaction || 0
      }
    };
  },

  /**
   * Normalizes performance id and type, userId is for Class performance, without userId if for Student Performance
   * @param result
   * @param userId
   * @returns {Object} returns an object
   */
  normalizePerformanceId: function(result, userId) {
    const serializer = this;
    /**
     *  Use the format 'userId@model-id' for class performance to differentiate student units
     *  If it's student performance we use only the model-id
     */
    var id = userId ? `${userId}@` : '';
    return {
      id: id + serializer.getModelId(result),
      type: serializer.getModelType()
    };
  },

  /**
   * Normalized data of user performance resource in  assessments
   * @return {Object}
   */
  normalizeUserPerformanceResourceInAssessment: function(response) {
    let resultSet = Ember.A();
    response = Ember.A(response.resources);
    response.forEach(data => {
      let result = Ember.Object.create(data);
      resultSet.pushObject(result);
    });
    return resultSet;
  },

  /**
   * Normalized data of user performance resource in  collections
   * @return {Object}
   */
  normalizeUserPerformanceResourceInCollection: function(response) {
    let resultSet = Ember.A();
    response = Ember.A(response.resources);
    response.forEach(data => {
      let result = Ember.Object.create(data);
      resultSet.pushObject(result);
    });
    return resultSet;
  },

  /**
   * Normalized class activity performance data.
   * @return {Array}
   */
  normalizeCAPerformanceData(response) {
    let resultSet = Ember.A();
    response = Ember.A(response.usageData);
    response.forEach(data => {
      let result = Ember.Object.create(data);
      resultSet.pushObject(result);
    });
    return resultSet;
  },

  /**
   * Normalized units performance data for course.
   * @return {Array}
   */

  normalizeUnitsPerformanceDataForCourse(response) {
    let resultSet = Ember.A();
    if (response.content !== undefined && response.content.length > 0) {
      response = Ember.A(response.content);
      response.forEach(data => {
        let result = Ember.Object.create(data);
        let usageData = result.get('usageData');
        if (usageData && usageData.length > 0) {
          usageData.forEach(data => {
            let unitPerformance = Ember.Object.create({
              performance: Ember.Object.create({
                timeSpent: data.timeSpent,
                scoreInPercentage: data.scoreInPercentage
              }),
              unitId: data.unitId,
              userUid: result.get('userUid')
            });
            resultSet.pushObject(unitPerformance);
          });
        }
      });
    }
    return resultSet;
  },

  /**
   * Normalized lessons performance data for unit.
   * @return {Array}
   */

  normalizeLessonsPerformanceDataForUnit(response) {
    let resultSet = Ember.A();
    if (response.content !== undefined && response.content.length > 0) {
      response = Ember.A(response.content);
      response.forEach(data => {
        let result = Ember.Object.create(data);
        let usageData = result.get('usageData');
        if (usageData && usageData.length > 0) {
          usageData.forEach(data => {
            let collectionPerformance = Ember.Object.create({
              performance: Ember.Object.create({
                timeSpent: data.timeSpent,
                scoreInPercentage: data.scoreInPercentage
              }),
              lessonId: data.lessonId,
              userUid: result.get('userUid')
            });
            resultSet.pushObject(collectionPerformance);
          });
        }
      });
    }
    return resultSet;
  }
});
