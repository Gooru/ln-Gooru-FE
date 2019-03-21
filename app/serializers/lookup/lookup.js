import Ember from 'ember';
import CountryModel from 'gooru-web/models/country';
import StateModel from 'gooru-web/models/state';
import DistrictModel from 'gooru-web/models/district';
import AudienceModel from 'gooru-web/models/audience';
import DepthOfKnowledgeModel from 'gooru-web/models/depth-of-knowledge';
import LicenseModel from 'gooru-web/models/license';

/**
 * Serializer to support the Profile CRUD operations for API 3.0
 *
 * @typedef {Object} ProfileSerializer
 */
export default Ember.Object.extend({
  /**
   * Normalizes audiences
   * @param {} payload
   * @returns {Audience[]}
   */
  normalizeReadAudiences: function(payload) {
    const items = payload.audience || [];
    return items.map(function(audience) {
      return AudienceModel.create({
        id: audience.id,
        name: audience.label,
        order: audience.sequence_id
      });
    });
  },

  /**
   * Normalizes depth of knowledge items
   * @param {} payload
   * @returns {DepthOfKnowledge[]}
   */
  normalizeReadDepthOfKnowledgeItems: function(payload) {
    const items = payload.depth_of_knowledge || [];
    return items.map(function(dok) {
      return DepthOfKnowledgeModel.create({
        id: dok.id,
        name: dok.label,
        order: dok.sequence_id
      });
    });
  },

  /**
   * Normalizes licenses
   * @param {} payload
   * @returns {License[]}
   */
  normalizeReadLicenses: function(payload) {
    const items = payload.license || [];
    return items.map(function(license) {
      return LicenseModel.create({
        id: license.id,
        name: license.label,
        order: license.sequence_id
      });
    });
  },

  /**
   * Normalizes countries
   * @param {} payload
   * @returns {Country[]}
   */
  normalizeReadCountries: function(payload) {
    const countries = payload.countries || [];
    return countries.map(function(country) {
      return CountryModel.create({
        id: country.id,
        name: country.name,
        code: country.code
      });
    });
  },

  /**
   * Normalizes states
   * @param {} payload
   * @returns {State[]}
   */
  normalizeReadStates: function(payload) {
    const states = payload.states || [];
    return states.map(function(state) {
      return StateModel.create({
        id: state.id,
        name: state.name,
        code: state.code
      });
    });
  },

  /**
   * Normalizes district
   * @param {} payload
   * @returns {District[]}
   */
  normalizeReadDistricts: function(payload) {
    const districts = payload['school-districts'] || [];
    return districts.map(function(district) {
      return DistrictModel.create({
        id: district.id,
        name: district.name,
        code: district.code
      });
    });
  },

  /**
   * Normalizes Language
   * @param {} payload
   * @returns {Language[]}
   */
  normalizeLanguages: function(payload) {
    const languages = payload.languages || [];
    return languages.map(function(language) {
      return Ember.Object.create(language);
    });
  },

  /**
   * Normalizes Educational
   * @param {} payload
   * @returns {Educational[]}
   */
  normalizeEducations: function(payload) {
    const educationalUse = payload.educational_use || [];
    return educationalUse.map(function(educational) {
      return Ember.Object.create(educational);
    });
  }
});
