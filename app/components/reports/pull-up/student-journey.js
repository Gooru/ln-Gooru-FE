import Ember from 'ember';
import { PLAYER_EVENT_SOURCE } from 'gooru-web/config/config';
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['student-journey'],

  // -------------------------------------------------------------------------
  // Dependencies

  session: Ember.inject.service('session'),

  /**
   * @requires {AssessmentService} Service to retrieve an assessment
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  /**
   * @requires {CollectionService} Service to retrieve a collection
   */
  collectionService: Ember.inject.service('api-sdk/collection'),

  /**
   * @requires service:api-sdk/class-activity
   */
  oaService: Ember.inject.service('api-sdk/offline-activity/offline-activity'),

  /**
   * @property {collection}
   */
  collection: null,

  /**
   * @property {isShowPullUp}
   */
  isShowPullUp: false,

  /**
   * @property {studentCollectionReport}
   */
  studentCollectionReport: null,

  /**
   * @property {offlineActivity}
   */
  offlineActivity: PLAYER_EVENT_SOURCE.OFFLINE_CLASS,

  /**
   * @property {classActivity}
   */
  classActivity: PLAYER_EVENT_SOURCE.DAILY_CLASS,

  /**
   * @function getStundentCollectionReport
   * Method to get student collection report
   */
  getStundentCollectionReport(activity) {
    let component = this;
    let collectionPromise;
    let contentType = activity.get('collectionType');
    if (contentType === 'collection') {
      collectionPromise = component
        .get('collectionService')
        .readCollection(activity.get('id'));
    } else if (contentType === 'assessment') {
      collectionPromise = component
        .get('assessmentService')
        .readAssessment(activity.get('id'));
    } else if (contentType === 'assessment-external') {
      collectionPromise = component
        .get('assessmentService')
        .readExternalAssessment(activity.get('id'));
    } else if (contentType === 'offline-activity') {
      collectionPromise = component
        .get('oaService')
        .readActivity(activity.get('id'));
    } else {
      collectionPromise = component
        .get('collectionService')
        .readExternalCollection(activity.get('id'));
    }
    return Ember.RSVP.hash({
      collection: collectionPromise
    }).then(({ collection }) => {
      component.set('collection', collection);
      collection.set(
        'performance',
        Ember.Object.create({
          score: activity.score
        })
      );
      component.openStudentCollectionReport(activity, collection, contentType);
    });
  },

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered when the user close the pull up.
     **/
    onClosePullUp() {
      let component = this;
      component.set('isShowPullUp', false);
    },

    /**
     * Action triggered when the user open student Report.
     **/
    onOpenCollectionReport(activity) {
      let component = this;
      component.getStundentCollectionReport(activity);
    },

    //Action triggered when click collection/assessment title
    onPreviewContent(collection) {
      const component = this;
      let previewPlayerContext = Ember.Object.create({
        classId: collection.get('classId'),
        courseId: collection.get('courseId'),
        unitId: collection.get('unitId'),
        lessonId: collection.get('lessonId')
      });
      component.set('previewPlayerContext', previewPlayerContext);
      component.set('previewContent', collection);
      component.set('previewContentType', collection.get('collectionType'));
      if (component.get('previewContentType') === 'offline-activity') {
        component.set('isShowContentPreview', false);
        component.set('isShowOfflineActivityPreview', true);
      } else {
        component.set('isShowContentPreview', true);
        component.set('isShowOfflineActivityPreview', false);
      }
    }
  },

  /**
   * @function openStudentCollectionReport
   * Method to open student collection report
   */
  openStudentCollectionReport(activity, collection, collectionType) {
    let component = this;
    if (activity.get('contentSource') === PLAYER_EVENT_SOURCE.DAILY_CLASS) {
      component.set('isCmReport', false);
      component.showDCAReport(activity, collection, collectionType);
    } else {
      component.set('isCmReport', true);
      component.showCourseMapReport(activity, collection, collectionType);
    }
  },

  showCourseMapReport(activity, collection, collectionType) {
    let component = this;
    let params = {
      userId: component.get('isStudent')
        ? component.get('session.userId')
        : component.get('userId'),
      classId: activity.get('classId'),
      courseId: activity.get('courseId'),
      unitId: activity.get('unitId'),
      lessonId: activity.get('lessonId'),
      collectionId: activity.get('id'),
      sessionId:
        collectionType === 'assessment' ? activity.get('sessionId') : null,
      type: collectionType,
      isStudent: component.get('isStudent'),
      collection,
      performance: collection.performance
    };
    if (collectionType === 'assessment-external') {
      component.set('showExternalAssessmentReport', true);
      component.set('isShowStudentOfflineActivityReport', false);
      component.set('showCollectionReport', false);
    } else if (collectionType === 'offline-activity') {
      component.set('isShowStudentOfflineActivityReport', true);
      component.set('showExternalAssessmentReport', false);
      component.set('showCollectionReport', false);
    } else {
      component.set('showExternalAssessmentReport', false);
      component.set('isShowStudentOfflineActivityReport', false);
      component.set('showCollectionReport', true);
    }
    component.set('studentReportContextData', params);
  },

  showDCAReport(activity, collection, collectionType) {
    let component = this;
    let params = component.getStudentDCAReportData(
      activity,
      collection,
      collectionType
    );
    if (collectionType === 'assessment-external') {
      component.set('isShowStudentExternalAssessmentReport', true);
      component.set('showStudentDcaReport', false);
      component.set('isShowStudentExternalCollectionReport', false);
    } else if (collectionType === 'collection-external') {
      component.set('showStudentDcaReport', false);
      component.set('isShowStudentExternalAssessmentReport', false);
      component.set('isShowStudentExternalCollectionReport', true);
    } else {
      component.set('showStudentDcaReport', true);
      component.set('isShowStudentExternalAssessmentReport', false);
      component.set('isShowStudentExternalCollectionReport', false);
    }
    component.set('studentReportContextData', params);
  },

  getStudentDCAReportData(activity, collection, collectionType) {
    let component = this;
    return Ember.Object.create({
      activityDate: activity.get('lastAccessedDate'),
      collectionId: activity.get('id'),
      classId: activity.get('classId'),
      isStudent: component.get('isStudent'),
      type: collectionType,
      userId: component.get('isStudent')
        ? component.get('session.userId')
        : component.get('userId'),
      collection: component.getDCACollectionData(collection, collectionType),
      studentPerformance: component.getDCACollectionPerformance(activity)
    });
  },

  getDCACollectionData(collection, collectionType) {
    return Ember.Object.create({
      collectionType: collectionType,
      format: collectionType,
      id: collection.get('id'),
      title: collection.get('title'),
      thumbnailUrl: collection.get('thumbnailUrl'),
      questionCount: collection.get('questionCount'),
      resourceCount: collection.get('resourceCount'),
      oeQuestionCount: collection.get('oeQuestionCount')
    });
  },

  getDCACollectionPerformance(activity) {
    return Ember.Object.create({
      attempts: activity.get('attempts'),
      collectionId: activity.get('id'),
      hasStarted: true,
      id: activity.get('id'),
      sessionId: activity.get('sessionId'),
      timeSpent: activity.get('timeSpent'),
      status: activity.get('status'),
      views: activity.get('views')
    });
  }
});
