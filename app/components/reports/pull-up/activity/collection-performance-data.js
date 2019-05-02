import Ember from 'ember';
import { CONTENT_TYPES } from 'gooru-web/config/config';
import {
  validateTimespent,
  generateUUID,
  formatTime as formatMilliseconds
} from 'gooru-web/utils/utils';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['add-data', 'collection-performance-data'],

  // -------------------------------------------------------------------------
  // Serevices
  collectionService: Ember.inject.service('api-sdk/collection'),

  performanceService: Ember.inject.service('api-sdk/performance'),

  analyticsService: Ember.inject.service('api-sdk/analytics'),

  session: Ember.inject.service('session'),

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    const component = this;
    if (component.get('isCollection')) {
      component.loadCollectionData();
    }
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    //Action triggered when select a resource
    onSelectResource(resource) {
      const component = this;
      if (component.get('activeResource.id') !== resource.get('id')) {
        component.set('activeResource', resource);
        component.resetHourMinute(
          formatMilliseconds(resource.get('timeSpent'))
        );
      }
    },

    //Action triggered when save given timespent into active resource
    onSaveTimeSpent() {
      const component = this;
      let maxHour = parseInt(component.get('maxHour'));
      let maxMinute = parseInt(component.get('maxMinute'));
      maxHour = isNaN(maxHour) ? 0 : maxHour;
      maxMinute = isNaN(maxMinute) ? 0 : maxMinute;
      let timeSpentInmIlliSec = (maxHour * 60 * 60 + maxMinute * 60) * 1000;
      component.set('activeResource.timeSpent', timeSpentInmIlliSec);
      if (component.get('isLastResource')) {
        component.submitCollectionPerformanceData();
      } else {
        const resources = component.get('resources');
        let curResourceIndex = resources.indexOf(
          component.get('activeResource')
        );
        let nextResource = resources.objectAt(curResourceIndex + 1);
        component.set('activeResource', nextResource);
        component.resetHourMinute(
          formatMilliseconds(nextResource.get('timeSpent'))
        );
      }
    },

    //Action triggered when search for a resource
    onSearchResource() {
      const component = this;
      let resourceSearchPattern = component.get('resourceSearchPattern');
      let resources = component.get('resources');
      let filteredResources = resources.filter(resource =>
        resource
          .get('title')
          .toLowerCase()
          .includes(resourceSearchPattern)
      );
      component.set('resourceList', filteredResources);
    },

    //Action triggered when clear search resources text pattern
    onClearSearchResources() {
      const component = this;
      component.set('resourceSearchPattern', '');
      component.set('resourceList', component.get('resources'));
    },

    //Action triggered when submit external collection timespent
    onSubmitExternalCollectionTimeSpent() {
      const component = this;
      component.submitExternalCollectionPerformanceData();
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Boolean} isCollection
   */
  isCollection: Ember.computed.equal(
    'collection.format',
    CONTENT_TYPES.COLLECTION
  ),

  /**
   * @property {String} resourceSearchPattern
   */
  resourceSearchPattern: '',

  /**
   * @property {Array} resources
   */
  resources: Ember.A([]),

  /**
   * @property {Array} resourceList
   */
  resourceList: Ember.computed('resources', function() {
    return this.get('resources');
  }),

  /**
   * @property {Object} activeResource
   */
  activeResource: Ember.computed('resources', function() {
    const component = this;
    return component.get('resources').objectAt(0);
  }),

  /**
   * @property {Number} maxHour
   */
  maxHour: 0,

  /**
   * @property {Number} maxMinute
   */
  maxMinute: 0,

  /**
   * @property {Boolean} isLastResource
   */
  isLastResource: Ember.computed('activeResource', function() {
    const component = this;
    const resources = component.get('resources');
    const activeResource = component.get('activeResource');
    return resources.indexOf(activeResource) === resources.length - 1;
  }),

  /**
   * @property {Boolean} isValidTimeSpent
   */
  isValidTimeSpent: Ember.computed('maxHour', 'maxMinute', function() {
    const component = this;
    const maxHour = component.get('maxHour');
    const maxMinute = component.get('maxMinute');
    return validateTimespent(maxHour, maxMinute);
  }),

  /**
   * @property {Number} timeSpentInmIlliSec
   */
  timeSpentInmIlliSec: 0,

  /**
   * @property {Boolean} isShowClearSearchResources
   */
  isShowClearSearchResources: Ember.computed(
    'resourceSearchPattern',
    function() {
      const component = this;
      return component.get('resourceSearchPattern.length') > 0;
    }
  ),

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
  // Functions

  /**
   * @function resetHourMinute
   * Method to reset active maxHour and maxMinute
   */
  resetHourMinute(timeString) {
    const component = this;
    let maxHour = 0;
    let maxMinute = 0;
    if (timeString) {
      let splittedTime = timeString.split(' ');
      let firstHalfString = splittedTime[0];
      let secodHalfString = splittedTime[1];
      if (firstHalfString.includes('h')) {
        maxHour = firstHalfString.slice(0, -1);
      } else if (firstHalfString.includes('m')) {
        maxMinute = firstHalfString.slice(0, -1);
      }
      if (secodHalfString.includes('m')) {
        maxMinute = secodHalfString.slice(0, -1);
      }
    }
    component.set('maxHour', parseInt(maxHour));
    component.set('maxMinute', parseInt(maxMinute));
  },

  /**
   * @function loadCollectionData
   * Method to load collection data
   */
  loadCollectionData() {
    const component = this;
    let collection = component.get('collection');
    component
      .fetchCollectionData(collection.get('id'))
      .then(function(collectionData) {
        component.set('resources', collectionData.get('children'));
      });
  },

  /**
   * @function fetchCollectionData
   * Method to fetch collection data
   */
  fetchCollectionData(collectionId) {
    const component = this;
    const collectionService = component.get('collectionService');
    return collectionService.readCollection(collectionId);
  },

  /**
   * @function submitCollectionPerformanceData
   * Method to submit student collection timespent data
   */
  submitCollectionPerformanceData() {
    const component = this;
    const students = component.get('students');
    let studentCollectionPerformanceData = component.getCollectionDataParams();
    students.map(student => {
      studentCollectionPerformanceData.session_id = generateUUID();
      studentCollectionPerformanceData.student_id = student.get('id');
      component.saveStudentCollectionPerformanceData(
        studentCollectionPerformanceData
      );
    });
    component.sendAction('onClosePullUp');
  },

  /**
   * @function submitExternalCollectionPerformanceData
   * Method to submit external collection performance data
   */
  submitExternalCollectionPerformanceData() {
    const component = this;
    component.saveStudentCollectionPerformanceData(
      component.getExternalCollectionDataParams()
    );
    component.sendAction('onClosePullUp');
  },

  /**
   * @function saveStudentCollectionPerformanceData
   * Method to save student collection performance data
   */
  saveStudentCollectionPerformanceData(collectionParams) {
    const component = this;
    const performanceService = component.get('performanceService');
    return performanceService.updateCollectionOfflinePerformance(
      collectionParams
    );
  },

  /**
   * @function getCollectionDataParams
   * Method to generate collection data params
   */
  getCollectionDataParams() {
    const component = this;
    let resources = component.get('resources');
    let collectionResources = Ember.A([]);
    let conductedOn =
      new Date(component.get('activityData.activation_date')) || new Date();
    let classId = component.get('classId');
    let collection = component.get('collection');
    let activityId = component.get('activityData.id');
    let courseId = component.get('course') ? component.get('course').id : null;
    resources.forEach(function(resource) {
      let resourceData = {
        resource_id: resource.get('id'),
        resource_type: resource.get('content_format'),
        time_spent: resource.get('timeSpent'),
        question_type: resource.get('type')
      };
      collectionResources.push(resourceData);
    });
    let studentPerformanceData = {
      tenant_id: component.get('session.tenantId') || null,
      class_id: classId,
      collection_id: collection.get('id'),
      collection_type: 'collection',
      content_source: component.get('contentSource'),
      time_zone: component.get('timeZone'),
      conducted_on: conductedOn.toISOString(),
      path_id: 0,
      path_type: null,
      resources: collectionResources,
      course_id: courseId,
      additionalContext: btoa(JSON.stringify({ dcaContentId: activityId }))
    };
    return studentPerformanceData;
  },

  /**
   * @function getExternalCollectionDataParams
   * Method to generate external collection data params
   */
  getExternalCollectionDataParams() {
    const component = this;
    let collection = component.get('collection');
    let studentIds = component.get('students').mapBy('id');
    let conductedOn =
      new Date(component.get('activityData.activation_date')) || new Date();
    let classId = component.get('classId');
    let activityId = component.get('activityData.id');
    let timeSpentInmIlliSec =
      (parseInt(component.get('maxHour')) * 60 * 60 +
        parseInt(component.get('maxMinute')) * 60) *
      1000;
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
      time_spent: timeSpentInmIlliSec,
      path_type: null,
      additionalContext: btoa(JSON.stringify({ dcaContentId: activityId }))
    };
    return studentPerformanceData;
  }
});
