import Ember from 'ember';
import { CONTENT_TYPES } from 'gooru-web/config/config';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: [
    'milestone-report',
    'student-milestone-lesson-performance-accordion'
  ],

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:api-sdk/performance
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * @requires service:sesion
   */
  session: Ember.inject.service('session'),

  /**
   * @requires service:api-sdk/course-map
   */
  courseMapService: Ember.inject.service('api-sdk/course-map'),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    //Action triggered when toggle a lesson
    onToggleLesson() {
      const component = this;
      if (!component.get('collections.length')) {
        component.loadCollectionsPerformance().then(function() {
          component.lessonAccordionToggleHandler();
        });
      } else {
        component.lessonAccordionToggleHandler();
      }
    },

    //Action triggered when click on collection performance
    onOpenCollectionReport(collection) {
      const component = this;
      let collectionReportContext = {
        userId: component.get('userId'),
        classId: component.get('classId'),
        courseId: component.get('courseId'),
        unitId: component.get('unitId'),
        lessonId: component.get('lessonId'),
        collectionId: collection.get('id'),
        type: collection.get('format'),
        lesson: component.get('lesson'),
        isStudent: true,
        isTeacher: false,
        collection
      };
      let reportType = collection.get('format');
      if (reportType === 'assessment-external') {
        component.set('isShowStudentExternalAssessmentReport', true);
      } else {
        component.set('isShowCollectionReport', true);
      }
      component.set('collectionReportContext', collectionReportContext);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {UUID} unitId
   */
  unitId: Ember.computed.alias('lesson.unit_id'),

  /**
   * @property {UUID} lessonId
   */
  lessonId: Ember.computed.alias('lesson.lesson_id'),

  /**
   * @property {Array} collections
   */
  collections: Ember.A([]),

  /**
   * @property {Boolean} isExpanded
   */
  isExpanded: false,

  /**
   * @property {Boolean} isRescopedLesson
   */
  isRescopedLesson: Ember.computed(
    'lesson.isRescopedLesson',
    'lesson.performance',
    function() {
      const component = this;
      const isRescopedLesson = component.get('lesson.isRescopedLesson');
      const isLessonPerformed =
        component.get('lesson.isPerformed') ||
        component.get('lesson.performance');
      return isRescopedLesson && !isLessonPerformed;
    }
  ),

  /**
   * @property {Array} rescopedCollectionIds
   */
  rescopedCollectionIds: Ember.A([]),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function loadCollectionsPerformance
   */
  loadCollectionsPerformance() {
    const component = this;
    component.set('isLoading', true);
    return Ember.RSVP
      .hash({
        lessonInfo: component.fetchLessonInfo(),
        collectionsPerformance: component.fetchMilestoneCollectionsPerformance(
          CONTENT_TYPES.COLLECTION
        ),
        assessmentsPerformance: component.fetchMilestoneCollectionsPerformance(
          CONTENT_TYPES.ASSESSMENT
        )
      })
      .then(
        ({ lessonInfo, collectionsPerformance, assessmentsPerformance }) => {
          let collections = lessonInfo
            ? lessonInfo.get('children')
            : Ember.A([]);
          if (!component.isDestroyed) {
            component.set(
              'collections',
              component.parseCollectionsPerformance(
                collections,
                collectionsPerformance.concat(assessmentsPerformance)
              )
            );
            component.parseRescopedCollections(collections);
            component.set('isLoading', false);
          }
        }
      );
  },

  /**
   * @function fetchMilestoneCollectionsPerformance
   */
  fetchMilestoneCollectionsPerformance(collectionType) {
    const component = this;
    const classId = component.get('classId');
    const courseId = component.get('courseId');
    const unitId = component.get('unitId');
    const lessonId = component.get('lessonId');
    const userId = component.get('userId');
    const performanceService = component.get('performanceService');
    return performanceService.getCollectionsPerformanceByLessonId(
      classId,
      courseId,
      unitId,
      lessonId,
      collectionType,
      userId
    );
  },

  /**
   * @function fetchLessonInfo
   */
  fetchLessonInfo() {
    const component = this;
    const courseMapService = component.get('courseMapService');
    const classId = component.get('classId');
    const courseId = component.get('courseId');
    const unitId = component.get('unitId');
    const lessonId = component.get('lessonId');
    return courseMapService.getLessonInfo(
      classId,
      courseId,
      unitId,
      lessonId,
      true
    );
  },

  /**
   * @function parseCollectionsPerformance
   */
  parseCollectionsPerformance(collections, collectionsPerformance) {
    const component = this;
    if (collections && !component.isDestroyed) {
      collectionsPerformance.map(collectionPerformance => {
        let collectionData = collections.findBy(
          'id',
          collectionPerformance.get('collectionId')
        );
        collectionData.set(
          'performance',
          collectionPerformance.get('performance')
        );
        component.set('lesson.isPerformed', true);
      });
    }
    return collections;
  },

  /**
   * @function parseRescopedCollections
   */
  parseRescopedCollections(collections) {
    const component = this;
    let rescopedCollectionIds = component.get('rescopedCollectionIds');
    rescopedCollectionIds.map(collectionId => {
      let collection = collections.findBy('id', collectionId);
      if (collection) {
        collection.set('isRescopedCollection', true);
      }
    });
  },

  /**
   * @function lessonAccordionToggleHandler
   */
  lessonAccordionToggleHandler() {
    const component = this;
    if (component.get('isExpanded')) {
      component.$('.collections-info-container').slideUp(400);
    } else {
      component.$('.collections-info-container').slideDown(400);
    }
    component.toggleProperty('isExpanded');
  },

  /**
   * @function handlePathLinePointers
   * Method to handle path line connector
   * TODO It's not yet integrated need to extend the support
   */
  handlePathLinePointers(collections) {
    let suggestedCollections = collections.filterBy('isSuggestedContent', true);
    if (suggestedCollections) {
      suggestedCollections.map(collection => {
        let curCollectionPos = collections.indexOf(collection);
        let prevCollection = collections.objectAt(curCollectionPos - 1);
        if (prevCollection && prevCollection.get('isSuggestedContent')) {
          if (prevCollection.get('pathType') === collection.get('pathType')) {
            collection.set(
              'alignmentType',
              `${prevCollection.get('alignmentType')}`
            );
            collection.set('pathLine', 'identical');
          } else if (prevCollection.get('alignmentType') === 'center-path') {
            collection.set(
              'alignmentType',
              collection.get('pathType') === 'teacher'
                ? 'left-path'
                : 'right-path'
            );
            collection.set(
              'pathLine',
              collection.get('pathType') === 'teacher'
                ? 'left-line'
                : 'right-line'
            );
          } else {
            collection.set('alignmentType', 'center-path');
            collection.set(
              'pathLine',
              collection.get('pathType') === 'teacher'
                ? 'left-line'
                : 'right-line'
            );
          }
        } else {
          collection.set(
            'alignmentType',
            collection.get('pathType') === 'teacher'
              ? 'left-path'
              : 'right-path'
          );
          collection.set(
            'pathLine',
            collection.get('pathType') === 'teacher'
              ? 'left-line'
              : 'right-line'
          );
        }
        let nextCollection = collections.objectAt(curCollectionPos + 1);
        if (nextCollection && !nextCollection.get('isSuggestedContent')) {
          nextCollection.set(
            'alignmentType',
            collection.get('alignmentType') === 'left-path'
              ? 'right-path'
              : 'left-path'
          );
          nextCollection.set(
            'pathLine',
            collection.get('alignmentType') === 'left-path'
              ? 'right-line'
              : 'left-line'
          );
        }
      });
    }
    return collections;
  }
});
