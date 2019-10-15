import Ember from 'ember';

export default Ember.Component.extend({
  /**
   * @property {String} source value when playing a collection/assessment
   */
  source: null,

  /**
   * @property {String} collectionType suggested content type
   */
  collectionType: null,

  /**
   * @property {Object} content suggested content
   */
  content: null,

  actions: {
    onSuggestContent(content, collectionType) {
      const component = this;
      component.sendAction('onSuggestContent', content, collectionType);
    },

    onPreviewContent() {
      const component = this;
      component.sendAction('onPreviewContent', this.content);
    },

    playContent() {
      const component = this;
      const content = component.get('content');
      const contentId = content.get('collection.id');
      let queryParams = {
        collectionId: contentId,
        role: 'student',
        source: component.get('source'),
        type: component.get('collectionType'),
        isIframeMode: true
      };
      if (component.get('isTeacherSuggestion')) {
        queryParams.pathId = content.id;
        queryParams.pathType = 'proficiency.teacher';
      }
      component.sendAction('playContent', queryParams, contentId, content);
    }
  }
});
