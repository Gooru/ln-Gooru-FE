import Ember from 'ember';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';
import ConfigurationMixin from 'gooru-web/mixins/configuration';
import { CONTENT_TYPES } from 'gooru-web/config/config';

export default Ember.Component.extend(ConfigurationMixin, {
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-class-activity-panel'],

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service('api-sdk/class-activity'),

  // -------------------------------------------------------------------------
  // Events

  didInsertElement() {
    let component = this;
    component.$('[data-toggle="tooltip"]').tooltip();
  },

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    onComplete() {
      let component = this;
      component.sendAction('completeActivity', component.get('classActivity'));
    },

    expandMore() {
      let component = this;
      let panelContainerEle = component.$('.ca-panel-container-2');
      if (!panelContainerEle.hasClass('active')) {
        component.$('.ca-panel-container-2').slideDown({
          start: function() {
            component.$(this).addClass('active');
            component.$(this).css('display', 'grid');
          }
        });
      } else {
        component.$('.ca-panel-container-2').slideUp({
          start: function() {
            component.$(this).removeClass('active');
          }
        });
      }
    },
    /**
     * Action triggered when the user play collection
     */
    onPlayContent(content) {
      const component = this;
      const classActivity = this.get('classActivity');
      component.sendAction('onPreviewContent', content, classActivity);
    },

    /**
     * Action will trigger to open teacher dca content report.
     * @param  {Object} collection
     */
    openDcaContentReport(selectedClassActivity) {
      let component = this;
      let format =
        selectedClassActivity.get('collection.format') ||
        selectedClassActivity.get('collection.collectionType');
      if (format === CONTENT_TYPES.OFFLINE_ACTIVITY) {
        this.sendAction('openDcaContentReport', selectedClassActivity);
      } else {
        component.set('selectedActivity', selectedClassActivity);
        component.set('isShowStudentsSummaryReport', true);
      }
    },

    /**
     * @function removeClassActivity
     */
    removeClassActivity: function(classActivity) {
      this.sendAction('onRemoveClassActivity', classActivity);
    },

    /**
     * @function changeVisibility
     */
    changeVisibility: function() {
      let classActivity = this.get('classActivity');
      this.sendAction('onChangeVisibility', classActivity);
    },

    /**
     * @function goLive
     */
    goLive: function(collection) {
      let options = {
        collectionId: collection.get('id'),
        collectionType: collection.get('collectionType')
      };

      this.sendAction('onGoLive', options);
    },

    /**
     * Action get triggered when schedule content to CA got clicked
     */
    onScheduleContentToDCA(classActivity, event) {
      this.sendAction(
        'onScheduleContentToDCA',
        classActivity,
        event,
        this.get('isUnScheduled')
      );
    },

    showStudentList() {
      this.set('showStudentListPullup', true);
    },

    onOpenPerformanceEntry(item, classActivity, isRepeatEntry) {
      let component = this;
      component.sendAction(
        'onOpenPerformanceEntry',
        item,
        classActivity,
        isRepeatEntry
      );
    },

    onUpdateMasteryAccrual() {
      let classActivity = this.get('classActivity');
      this.sendAction('onUpdateMasteryAccrual', classActivity);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  enableCollectionLiveLearning: function() {
    return true;
  }.property(),
  /**
   * @property {Boolean} isShowAddData
   */
  isShowAddData: Ember.computed(
    'classActivity.activation_date',
    'item',
    'members',
    function() {
      let component = this;
      let activationData = !!component.get('classActivity.activation_date');
      let isFutureDate = component.get('isActivityFuture');
      let isStudentsJoined = component.get('members.length') > 0;
      return activationData && !isFutureDate && isStudentsJoined;
    }
  ),

  /**
   * @property {Collection/Assessment} item
   */
  item: Ember.computed.alias('classActivity.collection'),

  /**
   * @property {CollectionPerformanceSummary}
   */
  collectionPerformanceSummary: Ember.computed.alias(
    'classActivity.collection.performance'
  ),

  /**
   * Toggle Options
   * @property {Ember.Array}
   */
  switchOptions: Ember.A([
    Ember.Object.create({
      label: 'On',
      value: true
    }),
    Ember.Object.create({
      label: 'Off',
      value: false
    })
  ]),

  /**
   * Toggle Options
   * @property {Ember.Array}
   */
  switchOptionsForOffline: Ember.A([
    Ember.Object.create({
      label: 'Yes',
      value: true
    }),
    Ember.Object.create({
      label: 'No',
      value: false
    })
  ]),

  /**
   * Maintains the flag to show go live or not
   * @type {Boolean}
   */
  showGolive: Ember.computed('isToday', function() {
    return this.get('isToday');
  }),

  activities: Ember.computed('classActivities', function() {
    let filteredActivites = [];
    let classActivities = this.get('classActivities');
    classActivities.forEach(function(classActivity) {
      classActivity.classActivities.forEach(activity => {
        filteredActivites.push(activity);
      });
    });
    return filteredActivites;
  }),

  /**
   * Maintains the flag to show remove content button or not.
   * @type {Boolean}
   */
  showDcaRemoveButton: Ember.computed(
    'isToday',
    'isActivityFuture',
    function() {
      return this.get('isToday') || this.get('isActivityFuture');
    }
  ),

  /**
   * Maintains the flag to show assign button or not.
   * @type {Boolean}
   */
  showDcaAssignButton: false,

  /**
   * Maintains the flag to show add dca content button or not.
   * @type {Boolean}
   */
  showDcaAddButton: false,

  /**
   * Maintains the flag to show student list pull up.
   * @type {Boolean}
   */
  showStudentListPullup: false,

  /**
   * Class activity date
   * @type {Date}
   */
  activityDate: null,

  /**
   * It is used to find activity is today or not
   * @return {Boolean}
   */
  isToday: Ember.computed('activityDate', function() {
    let activityDate = this.get('activityDate');
    let currentDate = moment().format('YYYY-MM-DD');
    return currentDate === activityDate;
  }),

  /**
   * It is used to find activity is past or not
   * @return {Boolean}
   */
  isActivityPast: Ember.computed('activityDate', function() {
    let activityDate = this.get('activityDate');
    let currentDate = moment().format('YYYY-MM-DD');
    return moment(activityDate).isBefore(currentDate);
  }),

  /**
   * It is used to find activity is future or not
   * @return {Boolean}
   */
  isActivityFuture: Ember.computed('activityDate', function() {
    let activityDate = this.get('activityDate');
    let currentDate = moment().format('YYYY-MM-DD');
    return moment(activityDate).isAfter(currentDate);
  }),

  /**
   * It maintains the state of cohort pull up need to show or not.
   * @type {Boolean}
   */
  showCohort: false,

  /**
   * It's used identify CA is scheduled or unscheduled
   * @type {Boolean}
   */
  isUnScheduled: false,

  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  tags: Ember.computed('item.standards.[]', function() {
    let standards = this.get('item.standards');
    if (standards) {
      standards = standards.filter(function(standard) {
        // Filter out learning targets (they're too long for the card)
        return !TaxonomyTagData.isMicroStandardId(standard.get('id'));
      });
      return TaxonomyTag.getTaxonomyTags(standards);
    }
  })
});
