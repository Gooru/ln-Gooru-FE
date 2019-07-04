import DS from 'ember-data';
import Ember from 'ember';

/**
 * Serializer for I2D endpoints
 *
 * @typedef {Object} I2DSerializer
 */
export default DS.JSONAPISerializer.extend({

  normalizeSearchResult: function(data) {
    let uploads = data.uploads;
    return uploads.map((item) => {
      return Ember.Object.create({
        id: item.id,
        batchId: item.batch_id,
        classId: item.class_id,
        classCode: item.class_code,
        source: item.source,
        itemRealId: item.item_real_id,
        itemType: item.item_type,
        itemCode: item.item_code,
        imagePath: item.image_path,
        ctxCourseId: item.ctx_course_id,
        ctxUnitId: item.ctx_unit_id,
        ctxLesson_id: item.ctx_lesson_id,
        ctxCollectionId: item.ctx_collection_id,
        ctxPathType: item.ctx_path_type,
        ctxPathId: item.ctx_path_id,
        creatorId: item.creator_id,
        modifierId: item.modifier_id,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        status: item.status,
        version: item.version
      });
    });
  }
});
