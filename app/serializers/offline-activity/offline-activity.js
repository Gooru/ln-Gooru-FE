import Ember from 'ember';
import { cleanFilename, nullIfEmpty } from 'gooru-web/utils/utils';
import {
  DEFAULT_IMAGES,
  ASSESSMENT_SHOW_VALUES,
  OA_TASK_SUBMISSION_TYPES
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

  /**
   * Normalized model to serialize
   * @param {jsonObject} activityModel
   * @example  examplePayLoad = {
      title: 'sr1',
      subformat: 'oa.project.poster',
      thumbnail: 'dummy',
      learning_objective: 'dummy',
      metadata: null,
      taxonomy: {
        'CCSS.K12.MA-1-OA-A.01': {
          code: '1.OA.1',
          title:
            'Use addition and subtraction within 20 to solve word problems involving situations of adding to, taking from, putting together, taking apart, and comparing, with unknowns in all positions, e.g., by using objects, drawings, and equations with a symbol for the unknown number to represent the problem.',
          parent_title: 'Math',
          description: '',
          framework_code: 'CCSS'
        },
        'CCSS.K12.MA-1-OA-A.02': {
          code: '1.OA.2',
          title:
            'Solve word problems that call for addition of three whole numbers whose sum is less than or equal to 20, e.g., by using objects, drawings, and equations with a symbol for the unknown number to represent the problem.',
          parent_title: 'Math',
          description: '',
          framework_code: 'CCSS'
        }
      },

      setting: {
        bidirectional_play: false,
        show_feedback: 'summary',
        show_key: 'never',
        attempts_allowed: -1,
        classroom_play_enabled: true
      },
      primary_language: 1,
      taxonomy_to_build: null,
      reference: null,
      duration_hours: null,
      max_score: 200,
      exemplar: 'dummy'
    };
   *
   */
  serializeCreateActivity: function(activityModel) {
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
        show_feedback:
          activityModel.get('showFeedback') || ASSESSMENT_SHOW_VALUES.SUMMARY,
        show_key: activityModel.get('showKey')
          ? ASSESSMENT_SHOW_VALUES.SUMMARY
          : ASSESSMENT_SHOW_VALUES.NEVER,
        attempts_allowed: activityModel.get('attempts') || -1,
        classroom_play_enabled: true
      }
    };

    serializedActivity.metadata.audience = activityModel.get('audience') || [];
    serializedActivity.metadata.depth_of_knowledge =
      activityModel.get('depthOfknowledge') || [];
    serializedActivity.metadata['21_century_skills'] =
      activityModel.get('centurySkills') || [];
    serializedActivity.reference = activityModel.reference;
    serializedActivity.exemplar = activityModel.exemplar;
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

    const thumbnailUrl = activityData.thumbnail
      ? basePath + activityData.thumbnail
      : appRootPath + DEFAULT_IMAGES.OFFLINE_ACTIVITY;

    const metadata = activityData.metadata || {};
    const settings = activityData.setting || {};

    let normalizedActivity = ActivityModel.create(
      Ember.getOwner(this).ownerInjection(),
      {
        id:
          activityData.target_collection_id ||
          activityData.suggested_content_id ||
          activityData.id,
        pathId: activityData.id,
        title: activityData.title,
        learningObjectives: activityData.learning_objective,
        isVisibleOnProfile:
          typeof activityData.visible_on_profile !== 'undefined'
            ? activityData.visible_on_profile
            : true,
        tasks: serializer.normalizeTasks(activityData.oa_tasks),
        taskCount: activityData.oa_tasks ? activityData.oa_tasks.length : 0,

        sequence: activityData.sequence_id,
        thumbnailUrl: thumbnailUrl,
        classroom_play_enabled:
          settings.classroom_play_enabled !== undefined
            ? settings.classroom_play_enabled
            : true,
        standards: serializer
          .get('taxonomySerializer')
          .normalizeTaxonomyObject(activityData.taxonomy),
        format:
          activityData.format ||
          activityData.target_content_type ||
          activityData.suggested_content_type ||
          'Offline-activity',
        subFormat: activityData.subformat,
        reference: activityData.reference,
        exemplar: activityData.exemplar,
        references: serializer.normalizeReferences(activityData.oa_references),
        rubric: serializer.normalizeActivityRubric(activityData.rubrics),
        url: activityData.url,
        ownerId: activityData.owner_id,
        metadata: metadata,
        audience:
          metadata.audience && metadata.audience.length > 0
            ? metadata.audience
            : [],
        depthOfknowledge:
          metadata.depth_of_knowledge && metadata.depth_of_knowledge.length > 0
            ? metadata.depth_of_knowledge
            : [],
        courseId:
          activityData.target_course_id ||
          activityData.suggested_course_id ||
          activityData.course_id,
        unitId:
          activityData.target_unit_id ||
          activityData.suggested_unit_id ||
          activityData.unit_id,
        lessonId:
          activityData.target_lesson_id ||
          activityData.suggested_lesson_id ||
          activityData.lesson_id,
        collectionSubType:
          activityData.target_content_subtype ||
          activityData.suggested_content_subtype,
        attempts: settings.attempts_allowed || -1,
        bidirectional: settings.bidirectional_play || false,
        showFeedback: settings.show_feedback || ASSESSMENT_SHOW_VALUES.SUMMARY,
        showKey: settings.show_key === ASSESSMENT_SHOW_VALUES.SUMMARY,
        centurySkills:
          metadata['21_century_skills'] &&
          metadata['21_century_skills'].length > 0
            ? metadata['21_century_skills']
            : []
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

  normalizeActivityRubric(data) {
    const serializer = this;
    let rubric = Ember.Object.create();
    if (Ember.isArray(data)) {
      return data.map(function(item) {
        return serializer.get('rubricSerializer').normalizeRubric(item);
      });
    }
    return rubric;
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
      submissionCount: item.oa_tasks_submissions
        ? item.oa_tasks_submissions.length
        : 0
    });
  },

  normalizeSubTypes(payload) {
    const serializer = this;
    if (Ember.isArray(payload.collection_subformat_type)) {
      return payload.collection_subformat_type.map(function(item) {
        return Ember.Object.create({
          code: item,
          display_name:
            serializer.get('i18n').t(`common.subtask.${item}`).string ||
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

  serializeReferenceData: function(refData) {
    return {
      id: refData.id,
      oa_id: refData.oaId,
      oa_reference_type: refData.type,
      oa_reference_subtype: refData.subType,
      location: refData.location
    };
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
      gradeItems: gradeItems
        ? gradeItems.map(item => serializer.normalizeGradeActivity(item))
        : []
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
   * Normalizes a submission grade
   * @param {*} response
   * @return {Object}
   */
  normalizeSubmissionGrade(response) {
    let serializer = this;
    let oaRubrics = serializer.normalizeRubricGrade(response.oaRubrics);
    return Ember.Object.create({
      oaRubrics,
      tasks: response.tasks
        ? response.tasks.map(task => serializer.normalizeGradeTasks(task))
        : []
    });
  },

  /**
   * Normalizes a Grade tasks
   * @param {*} response
   * @return {Object}
   */
  normalizeGradeTasks(payload) {
    let serializer = this;
    return Ember.Object.create({
      taskId: payload.taskId,
      submissions: payload.submissions
        ? payload.submissions.map(submission =>
          serializer.normalizeGradeSubmission(submission)
        )
        : []
    });
  },

  /**
   * Normalizes a Grade submission
   * @param {*} response
   * @return {Object}
   */
  normalizeGradeSubmission(payload) {
    let submissionTypeData = OA_TASK_SUBMISSION_TYPES.findBy(
      'value',
      payload.submissionSubtype
    );
    let submissionIcon = submissionTypeData ? submissionTypeData.icon : null;
    return Ember.Object.create({
      submissionInfo: payload.submissionInfo,
      submissionSubtype: payload.submissionSubtype,
      submissionType: payload.submissionType,
      submittedOn: payload.submittedOn,
      submissionText: payload.submissionText,
      submissionIcon
    });
  },

  /**
   * Normalizes a grade
   * @param {*} response
   * @return {Object}
   */
  normalizeRubricGrade(payload) {
    let serializer = this;
    return Ember.Object.create({
      studentGrades: payload.studentGrades
        ? serializer.normalizeGrade(payload.studentGrades)
        : null,
      teacherGrades: payload.teacherGrades
        ? serializer.normalizeGrade(payload.teacherGrades)
        : null
    });
  },

  /**
   * Normalizes a teacher and student grade
   * @param {*} response
   * @return {Object}
   */
  normalizeGrade(payload) {
    let serializer = this;
    return Ember.Object.create({
      grader: payload.grader,
      maxScore: Math.round(parseInt(payload.maxScore)),
      overallComment: payload.overallComment,
      rubricId: payload.rubricId,
      score: Math.round(parseInt(payload.studentScore)),
      submittedOn: payload.submittedOn,
      timeSpent: payload.timeSpent,
      categoryGrade: payload.categoryScore
        ? payload.categoryScore.map(item =>
          serializer.get('rubricSerializer').normalizeCategoryScore(item)
        )
        : []
    });
  },

  serializeStudentRubricGrades(payload) {
    return Ember.Object.create({
      rubric_id: nullIfEmpty(payload.get('id')),
      student_id: payload.get('studentId'),
      class_id: payload.get('classId'),
      collection_id: payload.get('collectionId'),
      dca_content_id: payload.get('dcaContentId'),
      content_source: payload.get('contentSource'),
      collection_type: payload.get('collectionType'),
      session_id: nullIfEmpty(payload.get('sessionId')),
      grader: 'teacher',
      grader_id: this.get('session.userId'),
      student_score: payload.get('studentScore'),
      max_score: payload.get('maxScore'),
      overall_comment: payload.get('comment'),
      category_score: payload.get('categoriesScore').length
        ? payload
          .get('categoriesScore')
          .map(category =>
            this.get('rubricSerializer').serializedStudentGradeCategoryScore(
              category
            )
          )
        : null
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

  /**
   *
   * @param {json} payload
   * Returns object
   */
  serializeCreateTask(payload) {
    return {
      id: payload.id,
      oa_id: payload.oaId,
      title: payload.title,
      description: payload.description
    };
  },

  serializecreateTaskSubmission(payload) {
    return {
      id: payload.id,
      oa_id: payload.oaId,
      oa_task_id: payload.oaTaskId,
      oa_task_submission_type: payload.taskSubmissionType,
      oa_task_submission_subtype: payload.taskSubmissionSubType
    };
  }
});