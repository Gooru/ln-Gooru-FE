import Ember from 'ember';
import SearchSerializer from 'gooru-web/serializers/search/search';

/**
 * Serializer to support Suggest functionality
 *
 * @typedef {Object} SuggestSerializer
 */
export default SearchSerializer.extend({
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
  normalizeSuggestionContents: function(payload) {
    return Ember.Object.create({
      caId: payload.caId,
      suggestions: this.normalizeSuggestionList(payload.suggestions),
      total: payload.total
    });
  },

  normalizeSuggestionList(suggestions) {
    return suggestions.map(suggestion => {
      return Ember.Object.create({
        id: suggestion.id,
        unitId: suggestion.unitId,
        lessonId: suggestion.lessonId,
        collectionId: suggestion.collectionId,
        classId: suggestion.classId,
        caId: suggestion.caId,
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
  }
});
