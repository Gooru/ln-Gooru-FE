import Ember from 'ember';

import ResourceModel from 'gooru-web/models/content/resource';
import QuestionModel from 'gooru-web/models/content/question';
import AssessmentModel from 'gooru-web/models/content/assessment';
import CollectionModel from 'gooru-web/models/content/collection';
import CourseModel from 'gooru-web/models/content/course';
import ProfileModel from 'gooru-web/models/profile/profile';
import { DEFAULT_IMAGES, TAXONOMY_LEVELS } from 'gooru-web/config/config';
import TaxonomySerializer from 'gooru-web/serializers/taxonomy/taxonomy';
import ConfigurationMixin from 'gooru-web/mixins/configuration';

/**
 * Serializer to support Search functionality
 *
 * @typedef {Object} SearchSerializer
 */
export default Ember.Object.extend(ConfigurationMixin, {
  session: Ember.inject.service('session'),

  /**
   * @property {TaxonomySerializer} taxonomySerializer
   */
  taxonomySerializer: null,

  init: function() {
    this._super(...arguments);
    this.set(
      'taxonomySerializer',
      TaxonomySerializer.create(Ember.getOwner(this).ownerInjection())
    );
  },

  /**
   * Normalize the Search collections response
   *
   * @param payload is the endpoint response in JSON format
   * @returns {Collection[]}
   */
  normalizeSearchCollections: function(payload) {
    const serializer = this;
    if (Ember.isArray(payload.searchResults)) {
      return payload.searchResults.map(function(result) {
        return serializer.normalizeCollection(result);
      });
    }
  },

  /**
   * Normalize a collection
   * @param {*} collectionData
   * @returns {Collection}
   */
  normalizeCollection: function(collectionData) {
    const serializer = this;
    const basePath = serializer.get('session.cdnUrls.content');
    const userBasePath = serializer.get('session.cdnUrls.user');
    const appRootPath = this.get('appRootPath'); //configuration appRootPath
    const thumbnailUrl = collectionData.thumbnail
      ? basePath + collectionData.thumbnail
      : appRootPath + DEFAULT_IMAGES.COLLECTION;
    const userThumbnailUrl = collectionData.userProfileImage
      ? userBasePath + collectionData.userProfileImage
      : appRootPath + DEFAULT_IMAGES.USER_PROFILE;
    const creatorThumbnailUrl = collectionData.creatorProfileImage
      ? userBasePath + collectionData.creatorProfileImage
      : appRootPath + DEFAULT_IMAGES.USER_PROFILE;
    const taxonomyInfo =
      (collectionData.taxonomySet &&
        collectionData.taxonomySet.curriculum &&
        collectionData.taxonomySet.curriculum.curriculumInfo) ||
      [];

    const course = collectionData.course || {};
    return CollectionModel.create(Ember.getOwner(this).ownerInjection(), {
      id: collectionData.id,
      title: collectionData.title,
      thumbnailUrl: thumbnailUrl,
      standards: serializer
        .get('taxonomySerializer')
        .normalizeTaxonomyArray(taxonomyInfo),
      publishStatus: collectionData.publishStatus,
      learningObjectives: collectionData.languageObjective,
      resourceCount: collectionData.resourceCount || 0,
      questionCount: collectionData.questionCount || 0,
      remixCount: collectionData.scollectionRemixCount || 0,
      course: course.title,
      courseId: course.id,
      isVisibleOnProfile: collectionData.profileUserVisibility,
      owner: ProfileModel.create({
        id: collectionData.gooruUId,
        firstName: collectionData.userFirstName,
        lastName: collectionData.userLastName,
        avatarUrl: userThumbnailUrl,
        username: collectionData.usernameDisplay
      }),
      creator: ProfileModel.create({
        id: collectionData.creatorId,
        firstName: collectionData.creatorFirstname,
        lastName: collectionData.creatorLastname,
        avatarUrl: creatorThumbnailUrl,
        username: collectionData.creatornameDisplay
      })
    });
  },

  /**
   * Normalize an assessment
   * @param {*} assessmentData
   * @returns {Assessment}
   */
  normalizeAssessment: function(assessmentData) {
    const serializer = this;
    const basePath = serializer.get('session.cdnUrls.content');
    const userBasePath = serializer.get('session.cdnUrls.user');
    const appRootPath = this.get('appRootPath'); //configuration appRootPath
    const thumbnailUrl = assessmentData.thumbnail
      ? basePath + assessmentData.thumbnail
      : appRootPath + DEFAULT_IMAGES.ASSESSMENT;
    const ownerThumbnailUrl = assessmentData.userProfileImage
      ? userBasePath + assessmentData.userProfileImage
      : appRootPath + DEFAULT_IMAGES.USER_PROFILE;
    const creatorThumbnailUrl = assessmentData.creatorProfileImage
      ? userBasePath + assessmentData.creatorProfileImage
      : appRootPath + DEFAULT_IMAGES.USER_PROFILE;
    const taxonomyInfo =
      (assessmentData.taxonomySet &&
        assessmentData.taxonomySet.curriculum &&
        assessmentData.taxonomySet.curriculum.curriculumInfo) ||
      [];

    const course = assessmentData.course || {};
    return AssessmentModel.create(Ember.getOwner(this).ownerInjection(), {
      id: assessmentData.id,
      title: assessmentData.title,
      thumbnailUrl: thumbnailUrl,
      standards: serializer
        .get('taxonomySerializer')
        .normalizeTaxonomyArray(taxonomyInfo),
      publishStatus: assessmentData.publishStatus,
      learningObjectives: assessmentData.languageObjective,
      resourceCount: assessmentData.resourceCount
        ? Number(assessmentData.resourceCount)
        : 0,
      questionCount: assessmentData.questionCount
        ? Number(assessmentData.questionCount)
        : 0,
      remixCount: assessmentData.scollectionRemixCount || 0,
      course: course.title,
      courseId: course.id,
      isVisibleOnProfile: assessmentData.profileUserVisibility,
      owner: ProfileModel.create({
        id: assessmentData.gooruUId,
        firstName: assessmentData.userFirstName,
        lastName: assessmentData.userLastName,
        avatarUrl: ownerThumbnailUrl,
        username: assessmentData.usernameDisplay
      }),
      creator: ProfileModel.create({
        id: assessmentData.creatorId,
        firstName: assessmentData.creatorFirstname,
        lastName: assessmentData.creatorLastname,
        avatarUrl: creatorThumbnailUrl,
        username: assessmentData.creatornameDisplay
      })
    });
  },

  /**
   * Normalize the Search assessments response
   *
   * @param payload is the endpoint response in JSON format
   * @returns {Assessment[]}
   */
  normalizeSearchAssessments: function(payload) {
    const serializer = this;
    if (Ember.isArray(payload.searchResults)) {
      return payload.searchResults.map(function(result) {
        return serializer.normalizeAssessment(result);
      });
    }
  },

  /**
   * Normalize the Search resources response
   *
   * @param payload is the endpoint response in JSON format
   * @returns {Resource[]}
   */
  normalizeSearchResources: function(payload) {
    const serializer = this;
    if (Ember.isArray(payload.searchResults)) {
      return payload.searchResults.map(function(result) {
        return serializer.normalizeResource(result);
      });
    }
  },

  /**
   * Normalize the Search question response
   *
   * @param payload is the endpoint response in JSON format
   * @returns {Question[]}
   */
  normalizeSearchQuestions: function(payload) {
    const serializer = this;
    if (Ember.isArray(payload.searchResults)) {
      return payload.searchResults.map(function(result) {
        return serializer.normalizeQuestion(result);
      });
    }
  },

  /**
   * Normalizes a question
   * @param {*} result
   * @returns {Question}
   */
  normalizeQuestion: function(result) {
    const serializer = this;
    const format =
      result.contentFormat || (result.resourceFormat.value || null); //value should be 'question'
    const type = QuestionModel.normalizeQuestionType(
      result.typeName || result.contentSubFormat
    );
    const taxonomyInfo =
      (result.taxonomySet &&
        result.taxonomySet.curriculum &&
        result.taxonomySet.curriculum.curriculumInfo) ||
      [];

    return QuestionModel.create(Ember.getOwner(this).ownerInjection(), {
      id: result.gooruOid,
      title: result.title,
      description: result.description,
      format: format,
      publisher: null, //TODO missing publisher at API response,
      thumbnailUrl: result.thumbnail,
      type: type,
      owner: result.user ? serializer.normalizeOwner(result.user) : null,
      standards: serializer
        .get('taxonomySerializer')
        .normalizeTaxonomyArray(taxonomyInfo)
    });
  },

  /**
   * Normalizes a resource
   * @param {*} result
   * @returns {Resource}
   */
  normalizeResource: function(result) {
    const serializer = this;
    const format = ResourceModel.normalizeResourceFormat(
      result.contentSubFormat
    );
    const taxonomyInfo =
      (result.taxonomySet &&
        result.taxonomySet.curriculum &&
        result.taxonomySet.curriculum.curriculumInfo) ||
      [];

    return ResourceModel.create(Ember.getOwner(this).ownerInjection(), {
      id: result.gooruOid,
      title: result.title,
      description: result.description,
      format: format,
      url: result.url,
      creator: result.creator
        ? serializer.normalizeOwner(result.creator)
        : null,
      owner: result.user ? serializer.normalizeOwner(result.user) : null,
      standards: serializer
        .get('taxonomySerializer')
        .normalizeTaxonomyArray(taxonomyInfo),
      publishStatus: result.publishStatus,
      publisher: result.publisher ? result.publisher[0] : null,
      efficacy: result.efficacy,
      engagement: result.engagement,
      relevance: result.relevance
    });
  },

  /**
   * Normalizes owner
   * @param ownerData
   * @returns {Profile}
   */
  normalizeOwner: function(ownerData) {
    const serializer = this;
    const basePath = serializer.get('session.cdnUrls.user');
    const appRootPath = this.get('appRootPath'); //configuration appRootPath
    const thumbnailUrl = ownerData.profileImage
      ? basePath + ownerData.profileImage
      : appRootPath + DEFAULT_IMAGES.USER_PROFILE;

    return ProfileModel.create(Ember.getOwner(this).ownerInjection(), {
      id: ownerData.gooruUId || ownerData.id,
      firstName: ownerData.firstName,
      lastName: ownerData.lastName,
      username: ownerData.usernameDisplay,
      avatarUrl: thumbnailUrl
    });
  },

  /**
   * Normalize the Search course response
   *
   * @param payload is the endpoint response in JSON format
   * @returns {Course[]}
   */
  normalizeSearchCourses: function(payload) {
    const serializer = this;
    if (Ember.isArray(payload.searchResults)) {
      return payload.searchResults.map(function(result) {
        return serializer.normalizeCourse(result);
      });
    }
  },

  /**
   * Normalizes a course
   * @param {*} result
   * @returns {Course}
   */
  normalizeCourse: function(result) {
    const serializer = this;
    const basePath = serializer.get('session.cdnUrls.content');
    const appRootPath = this.get('appRootPath'); //configuration appRootPath
    const thumbnailUrl = result.thumbnail
      ? basePath + result.thumbnail
      : appRootPath + DEFAULT_IMAGES.COURSE;
    const taxonomyInfo =
      (result.taxonomy &&
        result.taxonomy.curriculum &&
        result.taxonomy.curriculum.curriculumInfo) ||
      [];
    return CourseModel.create(Ember.getOwner(this).ownerInjection(), {
      id: result.id,
      title: result.title,
      description: result.description,
      thumbnailUrl: thumbnailUrl,
      subject: result.subjectBucket,
      subjectName:
        result.taxonomy && result.taxonomy.subject
          ? result.taxonomy.subject[0]
          : null,
      subjectSequence: result.subjectSequence,
      isVisibleOnProfile: result.visibleOnProfile,
      isPublished: result.publishStatus === 'published',
      unitCount: result.unitCount,
      taxonomy: serializer
        .get('taxonomySerializer')
        .normalizeTaxonomyArray(taxonomyInfo, TAXONOMY_LEVELS.COURSE),
      owner: result.owner ? serializer.normalizeOwner(result.owner) : null,
      sequence: result.sequence
    });
  },

  /**
   * Normalizes a unit
   * @param {*} result
   * @returns {unit}
   */
  normalizeUnit: function(result) {
    const serializer = this;
    const basePath = serializer.get('session.cdnUrls.content');
    const appRootPath = this.get('appRootPath'); //configuration appRootPath
    const thumbnailUrl = result.thumbnail
      ? basePath + result.thumbnail
      : appRootPath + DEFAULT_IMAGES.COLLECTION;
    const taxonomyInfo =
      (result.taxonomy &&
        result.taxonomy.curriculum &&
        result.taxonomy.curriculum.curriculumInfo) ||
      [];
    return CourseModel.create(Ember.getOwner(this).ownerInjection(), {
      id: result.id,
      title: result.title,
      description: result.description,
      createdDate: result.addDate,
      thumbnailUrl: thumbnailUrl,
      lastModified: result.lastModified,
      lastModifiedBy: result.lastModifiedBy,
      isVisibleOnProfile: result.visibleOnProfile,
      isPublished: result.publishStatus === 'published',
      assessmentCount: result.assessmentCount,
      collectionCount: result.collectionCount,
      lessonCount: result.lessonCount,
      standards: taxonomyInfo
        ? serializer
          .get('taxonomySerializer')
          .normalizeTaxonomyArray(taxonomyInfo, TAXONOMY_LEVELS.COURSE)
        : {},
      owner: result.owner ? serializer.normalizeOwner(result.owner) : null,
      sequence: result.sequence,
      relevance: result.relevance,
      efficacy: result.efficacy,
      engagement: result.engagement,
      type: result.format
    });
  },

  /**
   * Normalizes a lesson
   * @param {*} result
   * @returns {Course}
   */
  normalizeLesson: function(result) {
    const serializer = this;
    const basePath = serializer.get('session.cdnUrls.content');
    const appRootPath = this.get('appRootPath'); //configuration appRootPath
    const thumbnailUrl = result.thumbnail
      ? basePath + result.thumbnail
      : appRootPath + DEFAULT_IMAGES.COLLECTION;
    return CourseModel.create(Ember.getOwner(this).ownerInjection(), {
      id: result.id,
      title: result.title,
      description: result.description,
      createdDate: result.addDate,
      thumbnailUrl: thumbnailUrl,
      lastModified: result.lastModified,
      lastModifiedBy: result.lastModifiedBy,
      isVisibleOnProfile: result.visibleOnProfile,
      isPublished: result.publishStatus === 'published',
      assessmentCount: result.assessmentCount,
      collectionCount: result.collectionCount,
      standards: null,
      owner: result.owner ? serializer.normalizeOwner(result.owner) : null,
      sequence: result.sequence,
      relevance: result.relevance,
      efficacy: result.efficacy,
      engagement: result.engagement,
      type: result.format
    });
  },

  /**
   * Normalizes a question
   * @param {*} result
   * @returns {Question}
   */
  normalizeLearningMapsContent(learningMapsContent) {
    const serializer = this;
    const basePath = serializer.get('session.cdnUrls.content');
    const appRootPath = this.get('appRootPath'); //configuration appRootPath
    const signatureData = learningMapsContent.signatureContents;
    if (signatureData && signatureData.assessments) {
      signatureData.assessments.forEach(function(item) {
        item.thumbnail = item.thumbnail
          ? basePath + item.thumbnail
          : appRootPath + DEFAULT_IMAGES.COLLECTION;
      });
    }
    if (signatureData && signatureData.collections) {
      signatureData.collections.forEach(function(item) {
        item.thumbnail = item.thumbnail
          ? basePath + item.thumbnail
          : appRootPath + DEFAULT_IMAGES.COLLECTION;
      });
    }

    const returnObjects = {
      owner: Ember.getOwner(this).ownerInjection(),
      title: learningMapsContent.title,
      code: learningMapsContent.code,
      gutCode: learningMapsContent.gutCode,
      contents: learningMapsContent.contents,
      prerequisites: learningMapsContent.prerequisites,
      subject: learningMapsContent.subject,
      course: learningMapsContent.course,
      domain: learningMapsContent.domain,
      signatureContents: signatureData,
      learningMapsContent: serializer.normalizeSearchLearningMapsContentInfo(
        learningMapsContent.contents
      )
    };
    return returnObjects;
  },

  /**
   * @function normalizeSearchLearningMapsContentInfo
   * Serialize each content type from the learning map API
   */
  normalizeSearchLearningMapsContentInfo(contents) {
    let serializer = this;
    let serializedContentData = {};
    let assessmentData = [];
    let collectionData = [];
    let courseData = [];
    let resourceData = [];
    let questionData = [];
    let unitData = [];
    let lessonData = [];
    let rubricData = [];

    if (contents.assessment) {
      contents.assessment.searchResults.map(assessment => {
        let assessmentInfo = serializer.normalizeAssessment(assessment);
        assessmentInfo.id = assessment.id;
        assessmentInfo.description = assessment.learningObjective;
        assessmentInfo.creator = serializer.normalizeOwner(assessment.creator);
        assessmentInfo.owner = serializer.normalizeOwner(assessment.user);
        assessmentInfo.efficacy = assessment.efficacy;
        assessmentInfo.engagement = assessment.engagement;
        assessmentInfo.relevance = assessment.relevance;
        assessmentInfo.standards = serializer
          .get('taxonomySerializer')
          .normalizeLearningMapsTaxonomyArray(
            assessment.taxonomy,
            TAXONOMY_LEVELS.ASSESSMENT
          );
        assessmentData.push(assessmentInfo);
      });
    }

    if (contents.collection) {
      contents.collection.searchResults.map(collection => {
        let collectionInfo = serializer.normalizeCollection(collection);
        collectionInfo.id = collection.id;
        collectionInfo.description = collection.learningObjective;
        collectionInfo.creator = serializer.normalizeOwner(collection.creator);
        collectionInfo.owner = serializer.normalizeOwner(collection.user);
        collectionInfo.efficacy = collection.efficacy;
        collectionInfo.engagement = collection.engagement;
        collectionInfo.relevance = collection.relevance;
        collectionInfo.standards = serializer
          .get('taxonomySerializer')
          .normalizeLearningMapsTaxonomyArray(
            collection.taxonomy,
            TAXONOMY_LEVELS.COLLECTION
          );
        collectionData.push(collectionInfo);
      });
    }

    if (contents.course) {
      contents.course.searchResults.map(course => {
        let courseInfo = serializer.normalizeCourse(course);
        courseInfo.id = course.id;
        courseInfo.description = course.description;
        courseInfo.creator = course.creator
          ? serializer.normalizeOwner(course.creator)
          : {};
        courseInfo.owner = course.owner
          ? serializer.normalizeOwner(course.owner)
          : {};
        courseInfo.efficacy = course.efficacy;
        courseInfo.engagement = course.engagement;
        courseInfo.relevance = course.relevance;
        courseInfo.standards = serializer
          .get('taxonomySerializer')
          .normalizeLearningMapsTaxonomyArray(
            course.taxonomy,
            TAXONOMY_LEVELS.COURSE
          );
        courseData.push(courseInfo);
      });
    }

    if (contents.resource) {
      contents.resource.searchResults.map(resource => {
        let resourceInfo = serializer.normalizeResource(resource);
        resourceInfo.id = resource.id;
        resourceInfo.description = resource.description;
        resourceInfo.creator = resource.creator
          ? serializer.normalizeOwner(resource.creator)
          : {};
        resourceInfo.owner = resource.user
          ? serializer.normalizeOwner(resource.user)
          : {};
        resourceInfo.standards = serializer
          .get('taxonomySerializer')
          .normalizeLearningMapsTaxonomyArray(
            resource.taxonomy,
            TAXONOMY_LEVELS.RESOURCE
          );
        resourceData.push(resourceInfo);
      });
    }

    if (contents.question) {
      contents.question.searchResults.map(question => {
        let questionInfo = serializer.normalizeQuestion(question);
        questionInfo.id = question.id;
        questionInfo.description = question.description;
        questionInfo.creator = serializer.normalizeOwner(question.creator);
        questionInfo.owner = serializer.normalizeOwner(question.user);
        questionInfo.efficacy = question.efficacy;
        questionInfo.engagement = question.engagement;
        questionInfo.relevance = question.relevance;
        questionInfo.standards = serializer
          .get('taxonomySerializer')
          .normalizeLearningMapsTaxonomyArray(
            question.taxonomy,
            TAXONOMY_LEVELS.QUESTION
          );
        questionData.push(questionInfo);
      });
    }

    if (contents.unit) {
      contents.unit.searchResults.map(unit => {
        let unitInfo = serializer.normalizeUnit(unit);
        unitInfo.id = unit.id;
        unitInfo.description = unit.learningObjective;
        unitInfo.creator = unit.creator
          ? serializer.normalizeOwner(unit.creator)
          : {};
        unitInfo.owner = unit.owner
          ? serializer.normalizeOwner(unit.owner)
          : {};
        unitInfo.standards = serializer
          .get('taxonomySerializer')
          .normalizeLearningMapsTaxonomyArray(
            unitInfo.taxonomy,
            TAXONOMY_LEVELS.QUESTION
          );
        unitData.push(unitInfo);
      });
    }

    if (contents.lesson) {
      contents.lesson.searchResults.map(lesson => {
        let lessonInfo = serializer.normalizeLesson(lesson);
        lessonInfo.id = lesson.id;
        lessonInfo.description = lesson.learningObjective;
        lessonInfo.creator = lesson.creator
          ? serializer.normalizeOwner(lesson.creator)
          : {};
        lessonInfo.owner = lesson.owner
          ? serializer.normalizeOwner(lesson.owner)
          : {};
        lessonInfo.standards = serializer
          .get('taxonomySerializer')
          .normalizeLearningMapsTaxonomyArray(
            lessonInfo.taxonomy,
            TAXONOMY_LEVELS.QUESTION
          );
        lessonData.push(lessonInfo);
      });
    }

    serializedContentData.assessment = assessmentData;
    serializedContentData.collection = collectionData;
    serializedContentData.course = courseData;
    serializedContentData.resource = resourceData;
    serializedContentData.question = questionData;
    serializedContentData.unit = unitData;
    serializedContentData.lesson = lessonData;
    serializedContentData.rubric = rubricData;
    return serializedContentData;
  }
});
