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
   * @property {UUID} userId
   */
  userId: Ember.computed.alias('session.userId'),

  /**
   * @property {Array} collections
   */
  collections: Ember.A([]),

  /**
   * @property {Boolean} isExpanded
   */
  isExpanded: false,

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
      });
    }
    return collections;
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
  }
});
