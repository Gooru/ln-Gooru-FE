import Ember from 'ember';
import ClassActivity from 'gooru-web/models/content/class-activity';
import Collection from 'gooru-web/models/content/collection';
import Assessment from 'gooru-web/models/content/assessment';
import { parseDate } from 'gooru-web/utils/utils';
import { DEFAULT_IMAGES } from 'gooru-web/config/config';
import ConfigurationMixin from 'gooru-web/mixins/configuration';

/**
 * Serializer to support the Class Activity operations
 *
 * @typedef {Object} ClassActivitySerializer
 */
export default Ember.Object.extend(ConfigurationMixin, {
  session: Ember.inject.service('session'),

  /**
   * Normalizes class activities/contents
   *
   * @param payload endpoint response format in JSON format
   * @returns {Goal[]}
   */
  normalizeFindClassActivities: function(payload) {
    const serializer = this;
    if (
      payload &&
      payload.class_contents &&
      Ember.isArray(payload.class_contents)
    ) {
      return payload.class_contents.map(function(classActivity) {
        return serializer.normalizeClassActivity(classActivity);
      });
    } else {
      return [];
    }
  },

  /**
   * Normalize a class activity
   * @param {*} data
   * @return {Goal}
   */
  normalizeClassActivity: function(data) {
    const serializer = this;
    const content = serializer.normalizeClassActivityContent(data);
    return ClassActivity.create(Ember.getOwner(this).ownerInjection(), {
      id: data.id,
      date: data.activation_date
        ? parseDate(data.activation_date, 'YYYY-MM-DD')
        : null,
      added_date: data.dca_added_date
        ? data.dca_added_date
        : data.activation_date,
      activation_date: data.activation_date,
      collection: content,
      forYear: data.for_year,
      forMonth: data.for_month,
      usersCount: data.users_count
    });
  },

  /**
   * Normalize a class activity content
   * @param {*} data
   * @return {Goal}
   */
  normalizeClassActivityContent: function(data) {
    const serializer = this;
    const contentType = data.content_type;
    let content = null;
    const basePath = serializer.get('session.cdnUrls.content');
    const appRootPath = this.get('appRootPath'); //configuration appRootPath

    if (contentType === 'assessment') {
      const thumbnailUrl = data.thumbnail
        ? basePath + data.thumbnail
        : appRootPath + DEFAULT_IMAGES.ASSESSMENT;

      content = Assessment.create({
        id: data.content_id,
        title: data.title,
        resourceCount: data.resource_count,
        questionCount: data.question_count,
        oeQuestionCount: data.oe_question_count,
        collectionType: data.content_type,
        format: data.content_type,
        thumbnailUrl: thumbnailUrl
      });
    }

    if (contentType === 'collection') {
      const thumbnailUrl = data.thumbnail
        ? basePath + data.thumbnail
        : appRootPath + DEFAULT_IMAGES.COLLECTION;

      content = Collection.create({
        id: data.content_id,
        title: data.title,
        resourceCount: data.resource_count,
        questionCount: data.question_count,
        collectionType: data.content_type,
        thumbnailUrl: thumbnailUrl,
        format: data.content_type
      });
    }

    if (
      contentType === 'assessment-external' ||
      contentType === 'collection-external'
    ) {
      const thumbnailUrl = data.thumbnail
        ? basePath + data.thumbnail
        : appRootPath +
          (contentType === 'assessment-external'
            ? DEFAULT_IMAGES.ASSESSMENT
            : DEFAULT_IMAGES.COLLECTION);

      content = Collection.create({
        id: data.content_id,
        title: data.title,
        thumbnailUrl: thumbnailUrl,
        collectionType: data.content_type,
        url: data.url ? data.url : '',
        format: data.content_type
      });
    }

    //TODO normalize resources and questions
    return content;
  },

  normalizeFetchUsersForClassActivity(payload) {
    const serializer = this;
    const basePath = serializer.get('session.cdnUrls.user');
    const appRootPath = this.get('appRootPath'); //configuration appRootPath
    if (payload && payload.users && Ember.isArray(payload.users)) {
      return payload.users.map(function(user) {
        const thumbnailUrl = user.thumbnail
          ? basePath + user.thumbnail
          : appRootPath + DEFAULT_IMAGES.USER_PROFILE;
        return Ember.Object.create({
          id: user.id,
          firstname: user.first_name,
          lastname: user.last_name,
          thumbnail: thumbnailUrl,
          isActive: user.is_active
        });
      });
    } else {
      return [];
    }
  }
});
