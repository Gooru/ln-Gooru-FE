import Ember from 'ember';
import SearchSerializer from 'gooru-web/serializers/search/search';

/**
 * Serializer to support Suggest functionality
 *
 * @typedef {Object} SuggestSerializer
 */
export default SearchSerializer.extend({
  session: Ember.inject.service('session'),

  /**
   * Normalize the suggest resources response
   *
   * @param payload is the endpoint response in JSON format
   * @returns {Resource[]}
   */
  normalizeSuggestResources: function(payload) {
    const serializer = this;
    if (Ember.isArray(payload.suggestResults)) {
      return payload.suggestResults.map(function(result) {
        return serializer.normalizeResource(result);
      });
    }
  },

  /**
   * Normalize the suggestion count response
   *
   * @param payload is the endpoint response in JSON format
   * @returns {Array[]}
   */
  normalizeSuggestionCount: function(payload) {
    return payload.suggestions.map(suggestion => {
      return Ember.Object.create({
        caId: suggestion.caId,
        total: suggestion.total
      });
    });
  },

  /**
   * Normalize the suggestion content response
   *
   * @param payload is the endpoint response in JSON format
   * @returns {Array[]}
   */
  normalizeCASuggestionContents(payload) {
    let result = Ember.Object.create({
      caId: payload.caId,
      suggestions: this.normalizeCASuggestionList(payload.suggestedContents),
      total: payload.total
    });
    return result;
  },

  normalizeProficiencySuggestionContents(payload) {
    let result = Ember.Object.create({
      suggestions: this.normalizeProficiencySuggestionList(payload.suggestions),
      total: payload.total
    });
    return result;
  },

  normalizeProficiencySuggestionList(suggestions) {
    return suggestions.map(suggestion => {
      return Ember.Object.create({
        id: suggestion.id,
        unitId: suggestion.unitId,
        lessonId: suggestion.lessonId,
        collectionId: suggestion.collectionId,
        classId: suggestion.classId,
        suggestedContentId: suggestion.suggestedContentId,
        suggestedContentType: suggestion.suggestedContentType.toLowerCase(),
        suggestedTo: suggestion.suggestedTo,
        suggestionArea: suggestion.suggestionArea,
        suggestionCriteria: suggestion.suggestionCriteria,
        suggestionOrigin: suggestion.suggestionOrigin,
        suggestionOriginatorId: suggestion.suggestionOriginatorId,
        pathId: suggestion.pathId,
        userId: suggestion.userId,
        courseId: suggestion.courseId,
        createdAt: suggestion.createdAt,
        txCodeType: suggestion.txCodeType,
        txCode: suggestion.txCode,
        acceptedAt: suggestion.acceptedAt,
        accepted: suggestion.accepted,
        updatedAt: suggestion.updatedAt
      });
    });
  },

  normalizeCASuggestionList(suggestions) {
    return suggestions.map(suggestion => {
      return Ember.Object.create({
        collectionId: suggestion.collectionId,
        classId: suggestion.classId,
        suggestedContentId: suggestion.suggestedContentId,
        suggestedContentType: suggestion.suggestedContentType,
        title: suggestion.title,
        userCount: suggestion.userCount,
        url: suggestion.url,
        resourceCount: suggestion.resource_count,
        questionCount: suggestion.question_count,
        suggestedForContent: this.normalizeSuggestedForContent(
          suggestion.suggestedForContent
        ),
        suggestedToContext: this.normalizeSuggestedToContext(
          suggestion.suggestedToContext[0]
        ),
        taxonomy: suggestion.taxonomy
      });
    });
  },

  normalizeSuggestedForContent(payload) {
    const basePath = this.get('session.cdnUrls.content');
    const thumbnailUrl = basePath + payload.thumbnail;
    let content = Ember.Object.create({
      collectionId: payload.collectionId,
      title: payload.title,
      thumbnail: thumbnailUrl,
      taxonomy: payload.taxonomy,
      url: payload.url,
      questionCount: payload.question_count,
      resourceCount: payload.resource_count
    });
    return content;
  },

  normalizeSuggestedToContext(payload) {
    return Ember.Object.create({
      id: payload.id,
      suggestedTo: payload.suggestedTo,
      suggestionArea: payload.suggestionArea,
      suggestionOrigin: payload.suggestionOrigin,
      suggestionCriteria: payload.suggestionCriteria,
      suggestionOriginatorId: payload.suggestionOriginatorId,
      userId: payload.userId
    });
  }
});
