import Ember from 'ember';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';
import { SCREEN_SIZES } from 'gooru-web/config/config';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['cards', 'dca-search-collection-card'],

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service('api-sdk/class-activity'),

  //
  // -------------------------------------------------------------------------
  // Events
  didRender() {
    let component = this;
    component.$('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * collection object
   * @type {Object}
   */
  collection: null,

  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  tags: Ember.computed('collection.standards.[]', function() {
    let standards = this.get('collection.standards');
    if (standards) {
      standards = standards.filter(function(standard) {
        // Filter out learning targets (they're too long for the card)
        return !TaxonomyTagData.isMicroStandardId(standard.get('id'));
      });
      return TaxonomyTag.getTaxonomyTags(standards);
    }
  }),

  /**
   * Maintains collection type
   * @type {String}
   */
  contentType: null,

  /**
   * Selected collection for scheduling
   * @type {Object}
   */
  selectedCollectionForSchedule: null,

  /**
   * Class Id
   * @type {String}
   */
  classId: null,

  /**
   * @property {Boolean} isMediumScreen
   * Property to check whether loading card in medium screen or not
   */
  isMediumScreen: Ember.computed(function() {
    return SCREEN_SIZES.MEDIUM >= screen.width;
  }),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered when the user play collection
     * It'll open the player in new tab
     */
    onPlayCollection(collection) {
      const component = this;
      component.sendAction('onPreviewContent', collection);
    },

    /**
     * Action triggered when add collection to dca.
     * @param  {Object} collection
     */
    onAddCollectionToDCA(collection) {
      this.sendAction('onAddContentToDCA', collection);
    },

    /**
     * Action get triggered when schedule content to CA got clicked
     */
    onScheduleContentToDCA(content, event) {
      this.sendAction('onScheduleContentToDCA', content, event);
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  serializerSearchContent(content, contentId, date, forMonth, forYear) {
    return Ember.Object.create({
      id: contentId,
      added_date: date,
      collection: content,
      activityDate: date,
      forMonth,
      forYear,
      usersCount: -1,
      isActive: false
    });
  }
});
