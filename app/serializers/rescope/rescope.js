import Ember from 'ember';

/**
 * Serializer to support Rescope Operations
 *
 * @typedef {Object} RescopeSerializer
 */
export default Ember.Object.extend({
  /**
   * @function normalizeSkippedContents
   * Method to normalize skipped contents
   */
  normalizeSkippedContents(payload) {
    let skippedContents = Ember.Object.create({
      assessments: Ember.A([]),
      collections: Ember.A([]),
      assessmentsExternal: Ember.A([]),
      collectionsExternal: Ember.A([]),
      offlineActivities: Ember.A([]),
      lessons: Ember.A([]),
      units: Ember.A([])
    });
    if (payload) {
      skippedContents.set('assessments', payload.assessments);
      skippedContents.set('collections', payload.collections);
      skippedContents.set('assessmentsExternal', payload.assessmentsExternal);
      skippedContents.set('collectionsExternal', payload.collectionsExternal);
      skippedContents.set('lessons', payload.lessons);
      skippedContents.set('units', payload.units);
      skippedContents.set(
        'offlineActivities',
        payload.offlineActivities || Ember.A([])
      );
    }
    return skippedContents;
  }
});
