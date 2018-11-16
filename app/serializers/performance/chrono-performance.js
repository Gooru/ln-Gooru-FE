import Ember from 'ember';
import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  /**
   * @type {SessionService} Service to retrieve session information
   */
  session: Ember.inject.service('session'),

  getStudentPerformanceOfAllItemsInClass(data) {
    return data;
  },

  /**
   * Filter convertions to be consumend by the adapter
   */
  serializedFilterData(data) {
    let { classId, courseId, userId, startDate, limit, offset } = data;
    classId = classId ? classId : null;
    courseId = courseId ? courseId : null;
    userId = userId ? userId : this.get('session.userId');
    startDate = startDate ? startDate : new Date().toISOString().slice(0, 10);
    limit = limit ? limit : 10;
    offset = offset ? offset : 0;

    return {
      classId: classId,
      courseId: courseId,
      userId: userId,
      startDate: startDate,
      limit: limit,
      offset: offset
    };

    //return data;
  },

  /**
   * @param {JSON Object } responseData, response data returned by service (snake_case)
   * @returns{JSON Object} data normalized, converted to the form used by application(non snake_case )
   */
  normalizeUsageData(responseData, serializedFilterData) {
    responseData =
      responseData && responseData.content && responseData.content.length > 0
        ? responseData.content[0].usageData
        : [];
    responseData.filterOptions = serializedFilterData;
    let newStartDate = new Date();
    newStartDate.setMonth(
      newStartDate.getMonth() === 0 ? 11 : newStartDate.getMonth() - 1
    );
    responseData.startDate = responseData.startDate
      ? responseData.startDate
      : newStartDate;
    return responseData;
  },

  normalizeFetch: data => {
    return data;
  },

  updateAction: data => {
    return data;
  }
});
