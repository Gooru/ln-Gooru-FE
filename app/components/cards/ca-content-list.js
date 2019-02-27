import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['ca-content-list'],

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
   * conetnt object
   * @type {Object}
   */
  content: null,

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

  // -------------------------------------------------------------------------
  // Actions

  actions: {
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
