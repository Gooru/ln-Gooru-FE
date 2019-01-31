import Ember from 'ember';

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
   * @function getStundentCollectionReport
   * Method to get student collection report
   */
  getStundentCollectionReport(activity) {
    let component = this;
    let collectionPromise;
    if (activity.get('collectionType') === 'collection') {
      collectionPromise = component
        .get('collectionService')
        .readCollection(activity.get('id'));
    } else if (activity.get('collectionType') === 'assessment') {
      collectionPromise = component
        .get('assessmentService')
        .readAssessment(activity.get('id'));
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
      component.openStudentCollectionReport(activity, collection);
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
    }
  },

  /**
   * @function openStudentCollectionReport
   * Method to open student collection report pullup
   */
  openStudentCollectionReport(activity, collection) {
    let component = this;
    let collectionType = activity.get('collectionType');
    let params = {
      userId: component.get('session.userId'),
      classId: activity.get('classId'),
      courseId: activity.get('courseId'),
      unitId: activity.get('unitId'),
      lessonId: activity.get('lessonId'),
      collectionId: activity.get('id'),
      sessionId:
        collectionType === 'assessment' ? activity.get('sessionId') : null,
      type: collectionType,
      isStudent: true,
      isTeacher: false,
      collection
    };
    component.set('isShowPullUp', true);
    component.set('studentCollectionReport', params);
  }
});
