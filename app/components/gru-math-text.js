import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Events

  renderMathExpression: Ember.on('didInsertElement', function() {
    var component = this;
    component.renderInMath();
  }),

  // -------------------------------------------------------------------------
  // Properties
  /**
   * Text to render
   */
  text: null,

  /**
   * Observe when the text change
   */
  mathRender: function() {
    var component = this;
    component.renderInMath();
  }.observes("text"),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * It searches all of the text nodes in a given element for the given delimiters, and renders the math in place.
   */
  renderInMath:function(){
    var component = this;
    component.$('.gru-math-text').html(component.get('text'));
    window.renderMathInElement(
      component.$('.gru-math-text').get(0),
      {
        delimiters: [
          {left: "$$", right: "$$", display: false}
        ]
      }
    );
  }
});
