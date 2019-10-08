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
    }
  }
});
