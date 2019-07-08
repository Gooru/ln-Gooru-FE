import DS from 'ember-data';
import Ember from 'ember';

/**
 * Serializer for I2D endpoints
 *
 * @typedef {Object} I2DSerializer
 */
export default DS.JSONAPISerializer.extend({

  normalizeSearchResult: function(data) {
    const serializer = this;
    let uploads = data.uploads;
    return uploads.map((item) => {
      return serializer.normalizeSearchItem(item);
    });
  },

  normalizeSearchItem: function(item) {
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
  },

  normalizeImageData: function(data) {
    const serializer = this;
    data.parsed_data = [{
      'user_id': 'd2145a61-0274-448a-baa1-7d8423f84f57',
      'username': 'sheeban',
      'email': 'email0@example.com',
      'first_name': 'Sheeban',
      'last_name': 'Singaram',
      'question_id': 'ddb03d81-b07f-4723-a22e-233301cd61c2',
      'question_title': 'Title 1',
      'question_type': 'FRQ',
      'question_sequence': 1,
      'max_score': 5,
      'score': 2
    },
    {
      'user_id': 'd2145a61-0274-448a-baa1-7d8423f84f57',
      'username': 'sheeban',
      'email': 'email1@example.com',
      'first_name': 'Sheeban',
      'last_name': 'Singaram',
      'question_id': '08229613-9dad-485a-89dc-9bdc683fbba0',
      'question_title': 'Title 2',
      'question_type': 'FRQ',
      'question_sequence': 2,
      'max_score': 6,
      'score': 3
    }, {
      'user_id': 'd2145a61-0274-448a-baa1-7d8423f84f57',
      'username': 'sheeban',
      'email': 'email1@example.com',
      'first_name': 'Sheeban',
      'last_name': 'Singaram',
      'question_id': '3c809ec3-cc23-44b6-9348-d189fc8da52c',
      'question_title': 'Title 3',
      'question_type': 'FRQ',
      'question_sequence': 3,
      'max_score': 6,
      'score': 4
    },
    {
      'user_id': 'sd2145a61-0274-448a-baa1-7d8423f84se7',
      'username': 'ajay',
      'email': 'email0@example.com',
      'first_name': 'ajay',
      'last_name': 'kumar',
      'question_id': 'ddb03d81-b07f-4723-a22e-233301cd61c2',
      'question_title': 'Title 1',
      'question_type': 'FRQ',
      'question_sequence': 1,
      'max_score': 5,
      'score': 1
    },
    {
      'user_id': 'sd2145a61-0274-448a-baa1-7d8423f84se7',
      'username': 'sheeban',
      'email': 'email1@example.com',
      'first_name': 'ajay',
      'last_name': 'kumar',
      'question_id': '08229613-9dad-485a-89dc-9bdc683fbba0',
      'question_title': 'Title 2',
      'question_type': 'FRQ',
      'question_sequence': 2,
      'max_score': 6,
      'score': 4
    }, {
      'user_id': 'sd2145a61-0274-448a-baa1-7d8423f84se7',
      'username': 'ajay',
      'email': 'email1@example.com',
      'first_name': 'ajay',
      'last_name': 'kumar',
      'question_id': '3c809ec3-cc23-44b6-9348-d189fc8da52c',
      'question_title': 'Title 3',
      'question_type': 'FRQ',
      'question_sequence': 3,
      'max_score': 6,
      'score': 2
    }

    ];
    return Ember.Object.create({
      uploadInfo: serializer.normalizeSearchItem(data.upload_info),
      parsedData: data.parsed_data.map((data) => {
        return serializer.normalizeParseData(data);
      })
    });
  },

  normalizeParseData: function(data) {
    return Ember.Object.create({
      userId: data.user_id,
      username: data.username,
      email: data.email,
      firstName: data.first_name,
      lastName: data.last_name,
      questionId: data.question_id,
      questionTitle: data.question_title,
      questionType: data.question_type,
      questionSequence: data.question_sequence,
      maxScore: data.max_score,
      score: data.score
    });
  }
});
