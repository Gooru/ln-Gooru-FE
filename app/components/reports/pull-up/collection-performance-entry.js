import Ember from 'ember';
import { generateUUID, validateTimespent } from 'gooru-web/utils/utils';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['performance-manual-entry', 'collection-performance-entry'],

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
   * @property {Array} resources
   */
  resources: null,

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

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * @function submit
     */
    submit() {
      let component = this;
      component.students.forEach(student => {
        let collectionPerformanceDataParams = component.getDataParams(student);
        component.updateStudentCollectionPerformance(
          collectionPerformanceDataParams
        );
      });
      component.sendAction('onClosePerformanceEntry');
    },
    /**
     * @function validateHour
     */

    timeValidator(resource, resourceSeq) {
      let component = this;
      let hours = resource.maxHour ? resource.maxHour : null;
      let mins = resource.maxMins ? resource.maxMins : null;
      if (validateTimespent(hours, mins)) {
        component.$(`.r-${resourceSeq}`).removeClass('invalid-time');
      } else {
        component
          .$(`.r-${resourceSeq}`)
          .removeClass('invalid-time')
          .addClass('invalid-time');
      }
      component.validateTime();
    }
    /**
     * @function validateMinute
     */
  },

  // -------------------------------------------------------------------------
  // Events

  init() {
    let component = this;
    component._super(...arguments);
    component.loadCollectionData();
  },

  /**
   * @function validateTimeSpent
   */
  validateTime() {
    let component = this;
    let isValid = component.$('.invalid-time').length > 0;
    component.set('isValid', isValid);
  },

  /**
   * @function fetchCollectionData
   */
  fetchCollectionData(collectionId) {
    let component = this;
    let collectionService = component.get('collectionService');
    return Ember.RSVP.hash({
      collectionData: Ember.RSVP.resolve(
        collectionService.readCollection(collectionId)
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
      let resources = collectionData
        ? collectionData.get('children')
        : Ember.A([]);
      component.set('resources', resources);
      component.set('isLoading', false);
    });
  },

  /**
   * @function getDataParams
   */
  getDataParams(student) {
    let component = this;
    let resources = component.get('resources');
    let collectionResources = Ember.A([]);
    let conductedOn =
      new Date(component.get('activityData.activation_date')) || new Date();
    let classId = component.get('classId');
    let collection = component.get('collection');
    let courseId = component.get('course') ? component.get('course').id : null;
    resources.forEach(function(resource) {
      let maxHour = parseInt(resource.maxHour);
      let maxMins = parseInt(resource.maxMins);
      maxHour = isNaN(maxHour) ? 0 : maxHour;
      maxMins = isNaN(maxMins) ? 0 : maxMins;
      let maxTimeInMilliSec = (maxHour * 60 * 60 + maxMins * 60) * 1000;
      let resourceData = {
        resource_id: resource.get('id'),
        resource_type: resource.get('content_format'),
        time_spent: maxTimeInMilliSec
      };
      collectionResources.push(resourceData);
    });
    let studentPerformanceData = {
      tenant_id: component.get('session.tenantId') || null,
      student_id: student.get('id'),
      session_id: generateUUID(),
      class_id: classId,
      collection_id: collection.id,
      collection_type: 'collection',
      content_source: component.get('contentSource'),
      time_zone: component.get('timeZone'),
      conducted_on: conductedOn.toISOString(),
      path_id: 0,
      path_type: null,
      resources: collectionResources,
      course_id: courseId
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
