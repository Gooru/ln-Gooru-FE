import Ember from 'ember';

/**
 * Resource Model
 *
 * @typedef {Object} Resource
 */
export default Ember.Object.extend({

  id: null,

  /**
   * @property {string} full resource asset url
   */
  assetUrl: null,

  /**
   * Indicates the resoruce type. i.e video/youtube, assessment-question, image/png
   * @property {string} resource type
   */
  resourceType: null,

  /**
   * Indicates the resource format. i.e image, text, video, interaction, webpage, question
   * @property {string} resource format
   */
  resourceFormat: null,

  /**
   * @property {string}
   */
  title: null,

  /**
   * @property {string}
   */
  description: null,

  /**
   * @property {string} resource thumbnail
   */
  thumbnail: null,

  /**
   * Resource asset url, this is the actual resource content url
   * @property {string} folder
   */
  url: null,

  /**
   * @property {string}
   */
  mediaUrl: null,

  /**
   * @property {string}
   */
  narration: null,

  /**
   * @property {number}
   */
  order: null,

  /**
   * @property
   */
  owner: null,

  // ----------------------------------------- Question Fields
  /**
   * @property {string}
   */
  questionType: null,

  /**
   * @property {string}
   */
  text: null,

  /**
   * Returns the FIB text
   * @property {string}
   */
  fibText: Ember.computed(function(){
    const regExp = /(\[[^\[\]]+\])+/gi;
    return this.get("text").replace(regExp, "_______");
  }),

  /**
   * @property Array
   */
  hints: null,

  /**
   * @property {string}
   */
  explanation: null,

  /**
   * @property {Answer[]}
   */
  answers: Ember.A(),

  /**
   * Indicates if the question has answers
   * @property {boolean}
   */
  hasAnswers: Ember.computed.bool("answers.length"),

  /**
   * @property {*} resource options
   */
  options: null,

  /**
   * @property {string} thumbnail url
   */
  thumbnailUrl: Ember.computed('thumbnail', function() {
    const defaultThumbnailUrl = '/assets/gooru/default-' + this.get('resourceFormat') + '.png';
    return (this.get('thumbnail') ? this.get('thumbnail') : defaultThumbnailUrl);
  }),

  /**
   * @property {boolean} indicates if the resource is a question
   */
  isQuestion: Ember.computed.equal('resourceFormat', 'question'),

  /**
   * @property {boolean} indicates if the question is multiple choice type
   * @see components/player/gru-multiple-choice.js
   */
  isMultipleChoice: Ember.computed.equal('questionType', 'MC'),

  /**
   * @property {boolean} indicates if the question is multiple answer type
   * @see components/player/gru-multiple-answer.js
   */
  isMultipleAnswer: Ember.computed.equal('questionType', 'MA'),

  /**
   * @property {boolean} indicates if the question is true false type
   * @see components/player/gru-true-false.js
   */
  isTrueFalse: Ember.computed.equal('questionType', 'T/F'),

  /**
   * @property {boolean} indicates if the question is open ended type
   * @see components/player/gru-open-ended.js
   */
  isOpenEnded: Ember.computed.equal('questionType', 'OE'),

  /**
   * @property {boolean} indicates if the question is fill in the blank type
   * @see components/player/gru-fib.js
   */
  isFIB: Ember.computed.equal('questionType', 'FIB'),

  /**
   * @property {boolean} indicates if the question is hot spot text type
   * @see components/player/gru-hot-spot-text.js
   */
  isHotSpotText: Ember.computed.equal('questionType', 'HS_TXT'),

  /**
   * @property {boolean} indicates if the question is hot spot image type
   * @see components/player/gru-hot-spot-image.js
   */
  isHotSpotImage: Ember.computed.equal('questionType', 'HS_IMG'),

  /**
   * @property {boolean} indicates if the question is reorder
   * @see components/player/gru-reorder.js
   */
  isHotTextReorder: Ember.computed.equal('questionType', 'HT_RO'),

  /**
   * @property {boolean} indicates if the question is hot spot text
   * @see components/player/gru-hot-text-highlight.js
   */
  isHotTextHighlight: Ember.computed.equal('questionType', 'HT_HL'),

  /**
   * @property {boolean} indicates if the question is hot text word type
   */
  isHotTextHighlightWord: Ember.computed.equal('options.hotTextType', 'word'),

  /**
   * @property {boolean} indicates if the question is hot text word type
   */
  isHotTextHighlightSentence: Ember.computed.equal('options.hotTextType', 'sentence'),

  /**
   * The start time for video/youtube
   * @property {string} start
   */
  start: Ember.computed.alias("options.start"),
  /**
   * The end time for video/youtube
   * @property {string} start
   */
  stop: Ember.computed.alias("options.stop"),

  hasMedia: Ember.computed.bool('mediaUrl'),
  hasNarration: Ember.computed.bool('narration'),
  hasOwner: Ember.computed.bool('owner'),

  /**
   * Indicates if it is an image resource
   * @property {boolean}
   */
  isImageResource: Ember.computed("resourceType", function(){
    var resourceType = this.get("resourceType");
    return resourceType && resourceType.indexOf("image") >= 0;
  }),

  /**
   * Indicates if it is an youtube resource
   * @property {boolean}
   */
  isYoutubeResource: Ember.computed.equal("resourceType", "video/youtube"),

  /**
   * Indicates if it is an pdf resource
   * @property {boolean}
   */
  isPDFResource: Ember.computed.equal("resourceType", "handouts"),

  /**
   * Indicates if it is an url resource
   * @property {boolean}
   */
  isUrlResource: Ember.computed.equal("resourceType", "resource/url"),

  /**
   * Indicates if it is an vimeo resource
   * @property {boolean}
   */
  isVimeoResource: Ember.computed.equal("resourceType", "vimeo/video")
});
