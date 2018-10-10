import Ember from 'ember';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';

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
    component.setupDatepicker();
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
   * Maximum number of days to schedule dca content ahead.
   * @type {Number}
   */
  maxNumberOfDays: 30,

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

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered when the user play collection
     * It'll open the player in new tab
     */
    onPlayCollection(collectionId) {
      let collectionUrl = `${window.location.origin}/player/${collectionId}`;
      window.open(collectionUrl);
    },

    /**
     * Action triggered when add collection to dca.
     * @param  {Object} collection
     */
    onAddCollectionToDCA(collection) {
      this.sendAction('onAddContentToDCA', collection);
    },

    /**
     * Action triggered when schedule collection to dca.
     * @param  {Object} collection
     */
    onScheduleCollectionToDCA(collection, event) {
      let element = this.$(event.target).find('.schedule-dca-datepicker');
      if (!element.hasClass('active')) {
        this.$('.schedule-dca-datepicker').removeClass('active');
        element.addClass('active').datepicker('show');
      } else {
        element.removeClass('active').datepicker('hide');
      }
      this.set('selectedCollectionForSchedule', collection);
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  setupDatepicker() {
    let component = this;
    let startDate = moment().toDate();
    let maxNumberOfDays = component.get('maxNumberOfDays');
    let endDate = moment()
      .add(maxNumberOfDays, 'd')
      .toDate();
    component.$('.schedule-dca-datepicker').datepicker({
      startDate: startDate,
      endDate: endDate,
      format: 'yyyy-mm-dd',
      maxViewMode: 0,
      orientation: 'bottom right',
      container: '.teacher-class-search-content-pull-up'
    });
    component
      .$('.schedule-dca-datepicker')
      .off('changeDate')
      .on('changeDate', function() {
        let datepicker = this;
        let scheduleDate = component
          .$(datepicker)
          .datepicker('getFormattedDate')
          .valueOf();
        let classId = component.get('classId');
        let contentType = component.get('contentType');
        let contentId = component.get('selectedCollectionForSchedule.id');
        component
          .$(datepicker)
          .removeClass('active')
          .datepicker('hide');
        component
          .get('classActivityService')
          .addActivityToClass(classId, contentId, contentType, scheduleDate)
          .then(newContentId => {
            if (!component.isDestroyed) {
              component.sendAction(
                'addedScheduleContentToDCA',
                component.get('selectedCollectionForSchedule'),
                newContentId,
                scheduleDate
              );
            }
          });
      });
  }
});
