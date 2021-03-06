import Ember from 'ember';

/**
 * Image resource component
 *
 * Component responsible for controlling the logic and appearance of the image resource type
 *
 * @module
 * @see controllers/player.js
 * @see components/player/gru-viewer.js
 * @augments Ember/Component
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-image-resource'],

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Resource} the resource
   */
  resource: null,

  /**
   * @property {Number} the calculated resource content height
   */

  calculatedResourceContentHeight: null,

  /**
   * @property {string} bind the height css style for the component
   */
  resourceHeight: Ember.computed('calculatedResourceContentHeight', function() {
    var height = this.get('calculatedResourceContentHeight');
    const heightString = height > 0 ? `${height}px` : '100%';
    return Ember.String.htmlSafe(`height: ${heightString}`);
  })

  // -------------------------------------------------------------------------
  // Observers

  // -------------------------------------------------------------------------
  // Methods
});
