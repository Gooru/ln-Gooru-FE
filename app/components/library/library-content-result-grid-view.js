import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['library-content-result-grid'],

  searchResults: null,

  didRender() {
    let component = this;
    component.handleShowMoreData();
  },

  actions: {
    openContentPlayer(collection) {
      this.get('router').transitionTo('player', collection.id, {
        queryParams: {
          type: collection.get('collectionType')
        }
      });
    },
    /**
     * Action triggered when click preview button
     */
    onPreviewContent(previewContent, previewContentType) {
      const component = this;
      component.set('previewContent', previewContent);
      component.set('previewContentType', previewContentType);
      component.set('isShowContentPreview', true);
    },

    /**
     * On card play question button click
     * @param {Question} question
     */
    playQuestion: function(question) {
      this.get('router').transitionTo('content.questions.play', question.get('id'));
    },

    /**
     * On card remix question button click
     * @param {Question} question
     */
    remixQuestion: function(question) {
      this.sendAction('onRemixQuestion', question);
    },

    /**
     * Edit rubric
     */
    editRubric: function(resource) {
      this.get('router').transitionTo('content.rubric.edit', resource.get('id'));
    }
  },

  handleShowMoreData() {
    let component = this;
    let container = component.$(component.element);
    container.scroll(function() {
      let scrollTop = container.scrollTop();
      let listContainerHeight = container.height();
      let isScrollReachedBottom = scrollTop === container.prop('scrollHeight') - listContainerHeight;
      if (isScrollReachedBottom) {
        component.sendAction('paginateNext');
      }
    });
  }
});
