import Ember from 'ember';

/**
 * Domain Picker
 *
 * Component responsible for displaying two panels (course and domain) for a tree
 * of browse items. Uses @see ../gru-taxonomy-picker
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  /**
   * @requires service:api-sdk/taxonomy
   */
  taxonomyService: Ember.inject.service('taxonomy'),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['taxonomy', 'modals', 'gru-domain-picker'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    loadTaxonomyData(path) {
      return new Ember.RSVP.Promise(
        function(resolve) {
          var subject = this.get('model.subject');
          var courseId = path[0];

          return this.get('taxonomyService')
            .getCourseDomains(subject, courseId)
            .then(function(domains) {
              resolve(domains);
            });
        }.bind(this)
      );
    },

    updateSelectedTags(selectedTags) {
      this.get('model.callback').success(selectedTags);
      this.triggerAction({ action: 'closeModal' });
    }
  },

  // -------------------------------------------------------------------------
  // Events

  init() {
    this._super(...arguments);

    this.set('panelHeaders', [
      this.get('i18n').t('common.course').string,
      this.get('i18n').t('common.domain').string
    ]);
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Object with necessary picker information:
   * - callback: {Object} Callback object made up of two properties: success and fail
   *             callback.success will be called on the 'updateSelectedTags' action.
   * - selected: {TaxonomyTagData[]} List of references to a set of taxonomy tag data
   * - subject: {TaxonomyRoot} Currently selected subject
   * @prop {Object}
   */
  model: null,

  /**
   * Headers to display at the top of each one of the panels (course & domain).
   * There *must* be one for each panel.
   * @prop {String[]}
   */
  panelHeaders: []
});
