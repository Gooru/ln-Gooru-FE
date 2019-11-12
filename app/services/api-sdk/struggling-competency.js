import Ember from 'ember';
import StrugglingCompetencyAdapter from 'gooru-web/adapters/competency/struggling-competency';
import StrugglingCompetencySerializer from 'gooru-web/serializers/competency/struggling-competency';

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
  }
});
