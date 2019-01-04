import Ember from 'ember';
import { validateTimespent, generateUUID } from 'gooru-web/utils/utils';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: [
    'performance-manual-entry',
    'external-collection-performance-entry'
  ],

  // -------------------------------------------------------------------------
  // Services
  collectionService: Ember.inject.service('api-sdk/collection'),

  performanceService: Ember.inject.service('api-sdk/performance'),

  session: Ember.inject.service('session'),

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Object} collection
   */
  collection: null,

  /**
   * @property {Array} students
   */
  students: null,

  /**
   * @property {Array} activity
   */
  activityData: null,

  /**
   * @property {UUID} classId
   */
  classId: null,

  /**
   * @property {Object} resource
   */
  resource: null,

  /**
   * @property {Boolean} loading
   */
  isLoading: true,

  /**
   * @property {String} contentSource
   */
  contentSource: 'dailyclassactivity',

  /**
   * @property {String} timeZone
   */
  timeZone: Ember.computed(function() {
    return moment.tz.guess() || null;
  }),

  /**
   * @property {Number} maxHour
   */
  maxHour: null,
  /**
   * @property {Number} maxMins
   */
  maxMins: null,

  /**
   * @property {Object} collectionResource
   */
  collectionResource: null,

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * @function submit
     */
    submit() {
      let component = this;
      let externalCollectionPerformanceDataParams = component.getDataParams();
      component.updateStudentCollectionPerformance(
        externalCollectionPerformanceDataParams
      );
      component.sendAction('onClosePerformanceEntry');
    }
  },

  // -------------------------------------------------------------------------
  // Events

  init() {
    let component = this;
    component._super(...arguments);
    component.loadCollectionData();
  },

  didRender() {
    let component = this;
    component.timeValidator();
  },

  timeValidator() {
    let component = this;
    component.$('.timespent').keyup(function() {
      let hours = component.get('maxHour');
      let mins = component.get('maxMins');
      component.set('isValid', validateTimespent(hours, mins));
    });
  },

  /**
   * @function fetchCollectionData
   */
  fetchCollectionData(collectionId) {
    let component = this;
    let collectionService = component.get('collectionService');
    return Ember.RSVP.hash({
      collectionData: Ember.RSVP.resolve(
        collectionService.readExternalCollection(collectionId)
      )
    }).then(({ collectionData }) => {
      return collectionData;
    });
  },

  /**
   * @function loadCollectionData
   */
  loadCollectionData() {
    let component = this;
    let collection = component.get('collection');
    component.fetchCollectionData(collection.id).then(function(collectionData) {
      component.set('collectionResource', collectionData);
      component.set('isLoading', false);
    });
  },

  /**
   * @function getDataParams
   */
  getDataParams() {
    let component = this;
    let collection = component.get('collectionResource');
    let studentIds = component.get('students').mapBy('id');
    let conductedOn =
      new Date(component.get('activityData.activation_date')) || new Date();
    let classId = component.get('classId');
    let studentPerformanceData = {
      tenant_id: component.get('session.tenantId') || null,
      student_id: studentIds,
      class_id: classId,
      unit_id: collection.get('unitId'),
      lesson_id: collection.get('lessonId'),
      collection_id: collection.get('id'),
      collection_type: 'collection-external',
      session_id: generateUUID(),
      content_source: component.get('contentSource'),
      time_zone: component.get('timeZone'),
      conducted_on: conductedOn.toISOString(),
      course_id: collection.get('courseId'),
      path_id: 0,
      time_spent:
        (component.get('maxHour') * 60 * 60 + component.get('maxMins') * 60) *
        1000,
      path_type: null
    };
    return studentPerformanceData;
  },

  /**
   * @function updateStudentCollectionPerformance
   */
  updateStudentCollectionPerformance(dataParams) {
    let component = this;
    let performanceService = component.get('performanceService');
    return Ember.RSVP.hash({
      studentPerformanceUpdated: Ember.RSVP.resolve(
        performanceService.updateCollectionOfflinePerformance(dataParams)
      )
    });
  }
});
