import Ember from 'ember';
import CollectionBase from 'gooru-web/models/content/collection-base';
import { validator, buildValidations } from 'ember-cp-validations';
import { CONTENT_TYPES } from 'gooru-web/config/config';

//ToDo: Add validation on title, Taxonomy, subtype
const Validations = buildValidations({
  title: {
    validators: [
      validator('presence', {
        presence: true,
        message: '{{description}}',
        descriptionKey: 'common.errors.activity-title-presence'
      })
    ]
  },
  standards: {
    validators: [
      validator('presence', {
        presence: true,
        message: '{{description}}',
        descriptionKey: 'common.errors.activity-title-presence'
      })
    ]
  }
});

/**
 *  Activity model
 * typedef {Object} Assessment
 */
export default Ember.Object.extend(Validations, CollectionBase, {
  /**
   * @property {string} indicates it is an assessment
   */
  collectionType: 'activity',

  /**
   * @property {string}
   */
  url: null,

  /**
   * @property {boolean}
   */
  isActivity: Ember.computed.equal('format', CONTENT_TYPES.ACTIVITY),

  /**
   * @property {integer}
   */
  attempts: -1,

  /**
   * @property {boolean}
   */
  bidirectional: false,

  /**
   * @property {string}
   */
  showFeedback: null,
  /**
   * @property {string}
   */
  reference: null,
  /**
   * @property {import { module } from '@ember/array';}
   */
  references: [],

  /**
   * @property {import { module } from '@ember/array';}
   */
  tasks: [],

  /**
   * @property {boolean}
   */
  classroom_play_enabled: null,

  /**
   * @property {string}
   */
  showKey: null,

  toPlayerCollection: function() {
    var collection = this._super(...arguments);
    collection.set('attempts', this.attempts);
    collection.set('bidirectional', this.bidirectional);
    collection.set('showFeedback', this.showFeedback);
    collection.set('showKey', this.showKey);
    return collection;
  }
});
