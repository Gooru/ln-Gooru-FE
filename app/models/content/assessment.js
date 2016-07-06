import Ember from 'ember';
import CollectionBase from 'gooru-web/models/content/collection-base';
import { validator, buildValidations } from 'ember-cp-validations';
import { CONTENT_TYPES, ASSESSMENT_SHOW_VALUES } from 'gooru-web/config/config';

const Validations = buildValidations({
  title: {
    validators: [
      validator('presence', {
        presence: true,
        message: '{{description}}',
        descriptionKey: 'common.errors.assessment-title-presence'
      })
    ]
  }
});


/**
 * Assessment model
 * typedef {Object} Assessment
 */
export default Ember.Object.extend(Validations, CollectionBase, {

  /**
   * @property {string} indicates it is an assessment
   */
  collectionType: "assessment",

  /**
   * @property {string}
   */
  format: null,

  /**
   * @property {string}
   */
  url: null,

  /**
   * @property {boolean}
   */
  isExternalAssessment: Ember.computed.equal("format", CONTENT_TYPES.EXTERNAL_ASSESSMENT),

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
  showKey: null

});
