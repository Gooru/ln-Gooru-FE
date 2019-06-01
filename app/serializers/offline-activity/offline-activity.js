import Ember from 'ember';
import DS from 'ember-data';
import {
  cleanFilename
} from 'gooru-web/utils/utils';
import {
  DEFAULT_IMAGES,
  ASSESSMENT_SHOW_VALUES
} from 'gooru-web/config/config';
import TaxonomySerializer from 'gooru-web/serializers/taxonomy/taxonomy';
import ActivityModel from 'gooru-web/models/content/activity';
import RubricSerializer from 'gooru-web/serializers/rubric/rubric';
/**
 * Serializer to support the Offline Activity operations
 *
 * @typedef {Object} OfflineActivitySerializer
 */
export default Ember.Object.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  session: Ember.inject.service('session'),

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  /**
   * @property {RubricSerializer} rubricSerializer
   */
  rubricSerializer: null,

  init: function() {
    this._super(...arguments);
    this.set(
      'taxonomySerializer',
      TaxonomySerializer.create(Ember.getOwner(this).ownerInjection())
    );
    this.set(
      'rubricSerializer',
      RubricSerializer.create(Ember.getOwner(this).ownerInjection())
    );
  },

  serializeCreateActivity(activityModel) {
    const serializer = this;
    let actualPayLoad = this.serializeActivity(activityModel);
    actualPayLoad.taxonomy = serializer
      .get('taxonomySerializer')
      .serializeTaxonomy(activityModel.get('standards'));
    actualPayLoad.subformat = activityModel.subFormat;
    return actualPayLoad;
  },

  serializeActivity(activityModel) {
    const thumbnail = cleanFilename(
      activityModel.get('thumbnailUrl'),
      this.get('session.cdnUrls')
    );
    let serializedActivity = {
      title: activityModel.get('title'),
      learning_objective: activityModel.get('learningObjectives'),
      visible_on_profile: activityModel.get('isVisibleOnProfile'),
      thumbnail: !Ember.isEmpty(thumbnail) ? thumbnail : null,
      metadata: activityModel.get('metadata') || {
        audience: [],
        depth_of_knowledge: [],
        '21_century_skills': []
      },
      setting: {
        bidirectional_play: activityModel.get('bidirectional') || false,
        show_feedback: activityModel.get('showFeedback') || ASSESSMENT_SHOW_VALUES.SUMMARY,
        show_key: activityModel.get('showKey') ?
          ASSESSMENT_SHOW_VALUES.SUMMARY : ASSESSMENT_SHOW_VALUES.NEVER,
        attempts_allowed: activityModel.get('attempts') || -1,
        classroom_play_enabled: true
      }
    };

    serializedActivity.metadata.audience = activityModel.get('audience') || [];
    serializedActivity.metadata.depth_of_knowledge =
      activityModel.get('depthOfknowledge') || [];
    serializedActivity.metadata['21_century_skills'] =
      activityModel.get('centurySkills') || [];
    return serializedActivity;
  },

  /**
   * Normalize the Activity data into a Activity object
   * @param activityData
   * @returns {Question}
   */
  normalizeReadActivity(activityData) {
    var serializer = this;
    const basePath = serializer.get('session.cdnUrls.content');
    const appRootPath = this.get('appRootPath'); //configuration appRootPath

    const thumbnailUrl = activityData.thumbnail ?
      basePath + activityData.thumbnail :
      appRootPath + DEFAULT_IMAGES.OFFLINE_ACTIVITY;

    const metadata = activityData.metadata || {};
    const settings = activityData.setting || {};

    let normalizedActivity = ActivityModel.create(
      Ember.getOwner(this).ownerInjection(), {
        id: activityData.target_collection_id ||
          activityData.suggested_content_id ||
          activityData.id,
        pathId: activityData.id,
        title: activityData.title,
        learningObjectives: activityData.learning_objective,
        isVisibleOnProfile: typeof activityData.visible_on_profile !== 'undefined' ?
          activityData.visible_on_profile : true,
        tasks: serializer.normalizeTasks(activityData.oa_tasks),
        taskCount: activityData.oa_tasks ? activityData.oa_tasks.length : 0,

        sequence: activityData.sequence_id,
        thumbnailUrl: thumbnailUrl,
        classroom_play_enabled: settings.classroom_play_enabled !== undefined ?
          settings.classroom_play_enabled : true,
        standards: serializer
          .get('taxonomySerializer')
          .normalizeTaxonomyObject(activityData.taxonomy),
        format: activityData.format ||
          activityData.target_content_type ||
          activityData.suggested_content_type ||
          'Offline-activity',
        subFormat: activityData.subformat,
        references: serializer.normalizeReferences(activityData.oa_references),
        rubric: serializer
          .get('rubricSerializer')
          .normalizeRubric(activityData.rubrics),
        url: activityData.url,
        ownerId: activityData.owner_id,
        metadata: metadata,
        audience: metadata.audience && metadata.audience.length > 0 ?
          metadata.audience : [],
        depthOfknowledge: metadata.depth_of_knowledge && metadata.depth_of_knowledge.length > 0 ?
          metadata.depth_of_knowledge : [],
        courseId: activityData.target_course_id ||
          activityData.suggested_course_id ||
          activityData.course_id,
        unitId: activityData.target_unit_id ||
          activityData.suggested_unit_id ||
          activityData.unit_id,
        lessonId: activityData.target_lesson_id ||
          activityData.suggested_lesson_id ||
          activityData.lesson_id,
        collectionSubType: activityData.target_content_subtype ||
          activityData.suggested_content_subtype,
        attempts: settings.attempts_allowed || -1,
        bidirectional: settings.bidirectional_play || false,
        showFeedback: settings.show_feedback || ASSESSMENT_SHOW_VALUES.SUMMARY,
        showKey: settings.show_key === ASSESSMENT_SHOW_VALUES.SUMMARY,
        centurySkills: metadata['21_century_skills'] &&
          metadata['21_century_skills'].length > 0 ?
          metadata['21_century_skills'] : []
      }
    );
    return normalizedActivity;
  },
  normalizeTasks(payload) {
    const serializer = this;
    if (Ember.isArray(payload)) {
      return payload.map(function(item, index) {
        return serializer.normalizeReadTask(item, index);
      });
    }
    return [];
  },

  /**
   * Normalize the task data
   * @param taskData
   * @param index optional index value, corresponds to the assessment or collection index
   * @returns {task} deep object, with submissions
   */
  normalizeReadTask(item) {
    const serializer = this;
    return Ember.Object.create({
      id: item.id,
      oaId: item.oa_id,
      title: item.title,
      description: item.title,
      oaTaskSubmissions: serializer.normalizeSubmissions(
        item.oa_tasks_submissions
      ),
      submissionCount: item.oa_tasks_submissions ?
        item.oa_tasks_submissions.length : 0
    });
  },

  normalizeSubTypes(payload) {
    const serializer = this;
    if (Ember.isArray(payload.collection_subformat_type)) {
      return payload.collection_subformat_type.map(function(item) {
        return Ember.Object.create({
          code: item,
          display_name: serializer.get('i18n').t(`common.subtask.${item}`).string ||
            `common.subtask.${item}`
        });
      });
    }
  },

  normalizeSubmissions(payload) {
    const serializer = this;
    if (Ember.isArray(payload)) {
      return payload.map(function(item, index) {
        return serializer.normalizeReadSubmissions(item, index);
      });
    }
    return [];
  },

  normalizeReadSubmissions(item) {
    return Ember.Object.create({
      id: item.id,
      oaTaskId: item.oa_task_id,
      taskSubmissionType: item.oa_task_submission_type,
      taskSubmissionSubType: item.oa_task_submission_subtype
    });
  },

  /**
   * Normalizes a rubric
   * @param {*} data
   * @return {Rubric}
   */
  normalizeReferences(payload) {
    const serializer = this;
    if (Ember.isArray(payload)) {
      return payload.map(function(item, index) {
        return serializer.normalizeReadReferences(item, index);
      });
    }
    return [];
  },

  normalizeReadReferences(item) {
    return Ember.Object.create({
      id: item.id,
      oaId: item.oa_id,
      type: item.oa_reference_type,
      subType: item.oa_reference_subtype,
      location: item.location
    });
  },

  /**
   * Normalizes Activity To Grade
   * @param {*} data
   * @return {Object} normalizeOAGradeItems
   */
  normalizeOAGradeItems(payload) {
    const serializer = this;
    const gradeItems = payload.gradeItems;
    return Ember.Object.create({
      classId: payload.classId,
      gradeItems: gradeItems ?
        gradeItems.map(item => serializer.normalizeGradeActivity(item)) : null
    });
  },

  /**
   * Normalizes a grade activity
   * @param {*} data
   * @return {Object}
   *
   */
  normalizeGradeActivity(data) {
    return Ember.Object.create({
      title: data.title,
      collectionId: data.collectionId,
      collectionType: data.collectionType,
      dcaContentId: data.dcaContentId,
      studentCount: data.studentCount
    });
  },

  /**
   * Normalizes Students for a Activity to be graded
   * @param {*} data
   * @return {Object}
   */
  normalizeStudentsForActivity(data) {
    const students = data.students;
    return Ember.Object.create({
      students: students ? students : null
    });
  },
});
