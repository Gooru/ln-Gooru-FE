import Ember from 'ember';
import Lesson from 'gooru-web/models/content/lesson';
import LessonPlanSerializer from 'gooru-web/serializers/content/lesson-plan';
import LessonItem from 'gooru-web/models/content/lessonItem';
import { DEFAULT_IMAGES, CONTENT_TYPES } from 'gooru-web/config/config';
import ConfigurationMixin from 'gooru-web/mixins/configuration';
import TaxonomySerializer from 'gooru-web/serializers/taxonomy/taxonomy';

/**
 * Serializer to support the Lesson CRUD operations
 *
 * @typedef {Object} LessonSerializer
 */
export default Ember.Object.extend(ConfigurationMixin, {
  session: Ember.inject.service('session'),

  /**
   * @property {TaxonomySerializer} taxonomySerializer
   */
  taxonomySerializer: null,

  /**
   * @property {LessonPlanSerializer} lessonPlanSerializer
   */
  lessonPlanSerializer: null,

  init: function() {
    this._super(...arguments);
    this.set(
      'taxonomySerializer',
      TaxonomySerializer.create(Ember.getOwner(this).ownerInjection())
    );
    this.set(
      'lessonPlanSerializer',
      LessonPlanSerializer.create(Ember.getOwner(this).ownerInjection())
    );
  },

  /**
   * Serialize a Content/Lesson object into a JSON representation required by the Create Lesson endpoint
   *
   * @param lessonModel - The lesson model to be serialized
   * @returns {Object} JSON Object representation of the lesson model
   */
  serializeCreateLesson: function(lessonModel) {
    var lessonData = this.get('serializeUpdateLesson')(lessonModel);
    return lessonData;
  },

  /**
   * Serialize a Content/Lesson object into a JSON representation required by the Update Lesson endpoint
   *
   * @param lessonModel - The lesson model to be serialized
   * @returns {Object} JSON Object representation of the lesson model
   */
  serializeUpdateLesson: function(lessonModel) {
    return {
      title: lessonModel.get('title'),
      taxonomy: null // TODO: pending
    };
  },

  /**
   * Normalize a lesson response
   * @param lessonData - The endpoint response in JSON format
   * @returns {Content/Lesson} lesson model
   */
  normalizeLesson: function(lessonData) {
    const serializer = this;
    const basePath = serializer.get('session.cdnUrls.content');
    const appRootPath = this.get('appRootPath'); //configuration appRootPath
    if (lessonData.lesson_plan && lessonData.lesson_plan.sessions) {
      lessonData.lesson_plan.sessions.forEach(session => {
        if (session.duration) {
          session.duration = session.duration * 1000;
        }
        if (session.student_contents) {
          let studentContent = [];
          session.student_contents.map(content => {
            let collection = lessonData.collection_summary.findBy(
              'id',
              content.content_id
            );
            studentContent.push(collection);
          });
          session.student_contents = studentContent;
        }
      });
    }
    return Lesson.create(Ember.getOwner(this).ownerInjection(), {
      children: (function() {
        var lessonItems = [];

        if (lessonData.collection_summary) {
          lessonItems = lessonData.collection_summary.map(function(
            lessonItemData
          ) {
            const lessonItem = LessonItem.create({
              id: lessonItemData.id,
              format: lessonItemData.format,
              url: lessonItemData.url,
              questionCount: lessonItemData.question_count || 0,
              resourceCount: lessonItemData.resource_count || 0,
              openEndedQuestionCount: lessonItemData.oe_question_count || 0,
              sequence: lessonItemData.sequence_id,
              title: lessonItemData.title
            });

            const defaultImage =
              lessonItemData.format === CONTENT_TYPES.COLLECTION ||
              lessonItemData.format === CONTENT_TYPES.EXTERNAL_COLLECTION
                ? appRootPath + DEFAULT_IMAGES.COLLECTION
                : lessonItemData.format === CONTENT_TYPES.OFFLINE_ACTIVITY
                  ? appRootPath + DEFAULT_IMAGES.OFFLINE_ACTIVITY
                  : appRootPath + DEFAULT_IMAGES.ASSESSMENT;
            const thumbnailUrl = lessonItemData.thumbnail
              ? basePath + lessonItemData.thumbnail
              : defaultImage;
            lessonItem.set('thumbnailUrl', thumbnailUrl);

            return lessonItem;
          });
        }
        return Ember.A(lessonItems);
      })(),
      id: lessonData.lesson_id,
      sequence: lessonData.sequence_id,
      title: lessonData.title,
      taxonomy: serializer
        .get('taxonomySerializer')
        .normalizeTaxonomyObject(lessonData.taxonomy),
      lessonPlan: serializer
        .get('lessonPlanSerializer')
        .normalizeLessonPlan(lessonData.lesson_plan)
    });
  },

  /**
   * Serialize reorder lesson
   * @param {string[]} collectionIds
   */
  serializeReorderLesson: function(collectionIds) {
    const values = collectionIds.map((id, index) => ({
      id,
      sequence_id: index + 1
    }));
    return {
      order: values
    };
  }
});
