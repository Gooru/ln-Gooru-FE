import Ember from 'ember';
import StrugglingCompetencyAdapter from 'gooru-web/adapters/competency/struggling-competency';
import StrugglingCompetencySerializer from 'gooru-web/serializers/competency/struggling-competency';
/**
 * Service for the struggling competency
 *
 * @typedef {Object} strugglingCompetencyService
 */
export default Ember.Service.extend({
  strugglingCompetencyAdapter: null,

  strugglingCompetencySerializer: null,

  init() {
    this._super(...arguments);
    this.set(
      'strugglingCompetencyAdapter',
      StrugglingCompetencyAdapter.create(Ember.getOwner(this).ownerInjection())
    );
    this.set(
      'strugglingCompetencySerializer',
      StrugglingCompetencySerializer.create(
        Ember.getOwner(this).ownerInjection()
      )
    );
  },

  /**
   * Get students struggling competency
   * @returns {Promise.<[]>}
   */
  fetchStrugglingCompetency(params) {
    let service = this;
    return new Ember.RSVP.Promise((resolve, reject) => {
      service
        .get('strugglingCompetencyAdapter')
        .fetchStrugglingCompetency(params)
        .then(response => {
          resolve(
            service
              .get('strugglingCompetencySerializer')
              .normalizeStrugglingCompetency(response)
          );
        }, reject);
    });
  },

  /**
   * Get students performance
   * @returns {Promise.<[]>}
   */
  fetchStudentsPerfomance(params) {
    let service = this;
    return new Ember.RSVP.Promise((resolve, reject) => {
      service
        .get('strugglingCompetencyAdapter')
        .fetchStudentsPerfomance(params)
        .then(response => {
          resolve(
            service
              .get('strugglingCompetencySerializer')
              .normalizeStudentsPerfomance(response)
          );
        }, reject);
    });
  }
});
