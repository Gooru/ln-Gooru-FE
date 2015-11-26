import Ember from 'ember';
/**
 * Youtube resource component
 *
 * Component responsible for controlling the logic and appearance of the youtube resource type
 *
 * @module
 * @see controllers/player.js
 * @see components/player/gru-viewer.js
 * @augments Ember/Component
 **/

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-youtube-resource'],

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
   * @property {string} full resource youtube url
   */
  youtubeUrl: Ember.computed("resource.url", function(){
    return this.get("resource.url").replace(/watch\?v=/g, "embed/")+
        "?start="+this.get('start')+
        "&end="+this.get('stop');
  }),

  /**
   * @property {string}Begin playing the video at the given number of seconds from the start of the video
   */
  start: Ember.computed("resource.start", function(){
    const component = this;
    return component.convertToSeconds(this.get("resource.start"));
  }),

  /**
   * @property {string}The time, measured in seconds from the start of the video, when the player should stop playing the video
   */
  stop: Ember.computed("resource.stop", function(){
    const component = this;
    return component.convertToSeconds(this.get("resource.stop"));
  }),
  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

  /**
   * Convert the time in this format 00:00:00 to seconds
   */
  convertToSeconds:function(time) {
    var sections = time.split(":");
    return parseInt(sections[0] * 3600) + parseInt(sections[1] * 60) + parseInt(sections[2]);
  }
});
