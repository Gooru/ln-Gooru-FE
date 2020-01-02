import Ember from 'ember';
import {
  CONTENT_TYPES
} from 'gooru-web/config/config';

export default Ember.Component.extend({
  classNames: ['class-activities', 'gru-class-activity-card'],

  classNameBindings: ['isShowListView:list-view:card-view'],

  /**
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service('api-sdk/class-activity'),

  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service('api-sdk/class'),

  /**
   * @requires service:api-sdk/course
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @requires service:api-sdk/offline-activity
   */
  offlineActivityService: Ember.inject.service(
    'api-sdk/offline-activity/offline-activity'
  ),

  didInsertElement() {
    const component = this;
    component.loadClassData();
    component.$('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
    this.setupTooltip();
  },

  actions: {
    /**
     * @function goLive
     */
    goLive(content) {
      if (!this.get('isSecondaryClass')) {
        let options = {
          collectionId: content.get('contentId'),
          collectionType: content.get('contentType')
        };
        this.sendAction('onGoLive', options);
      }
    },

    onShowStudentsList(classData) {
      const component = this;
      component.sendAction('onShowStudentsList', classData);
    },

    onShowSuggestionList(classData) {
      return classData;
    },

    onDeleteActivity(classData) {
      return classData;
    },

    onToggleActivityVisibility() {
      const component = this;
      component.updateActivityVisibility();
    },

    onOpenPerformanceEntry(activityClass) {
      const component = this;
      component.sendAction(
        'onOpenPerformanceEntry',
        activityClass,
        component.get('activityContent')
      );
    },

    onRescheduleActivity() {
      const component = this;
      component.sendAction('onRescheduleActivity', component.get('activity'));
    },

    onEnableMastery() {
      const component = this;
      const classActivity = component.get('activity');
      component.sendAction('onEnableMastery', classActivity);
    },

    onShowContentPreview() {
      const component = this;
      const classActivity = component.get('activity');
      component.sendAction('onShowContentPreview', classActivity);
    },

    onShowContentReport(activityClass) {
      const component = this;
      const classActivity = Ember.Object.create({
        classId: activityClass.get('id'),
        id: activityClass.get('activity.id'),
        collection: activityClass.get('content'),
        contentId: activityClass.get('content.id'),
        contentType: activityClass.get('content.collectionType'),
        activation_date: activityClass.get('activity.activation_date'),
        activityClass
      });
      component.sendAction('onShowContentReport', classActivity);
    },

    /**
     * @function removeClassActivity
     */
    removeClassActivity(activityClass) {
      const component = this;
      const classActivity = component.get('activity');
      let activityClassesLength = classActivity.get('activityClasses').length;
      let isRemoveClassActivity = activityClassesLength === 1;
      this.sendAction(
        'onRemoveActivityClass',
        classActivity,
        activityClass,
        isRemoveClassActivity
      );
    },

    onToggleContent(className) {
      const component = this;
      component.$(`.${className}`).slideToggle();
    },

    onMarkOaCompleted() {
      const component = this;
      component.markOfflineActivityAsComplete();
    },

    //Action triggered when click on grading icon at the activity card
    onEnableOaGrading(activityClass) {
      const component = this;
      const classActivity = component.get('activity');
      if (classActivity.get('isCompleted')) {
        const gradingItemObject = Ember.Object.create({
          classId: activityClass.get('id'),
          dcaContentId: activityClass.get('activity.id'),
          contentType: CONTENT_TYPES.OFFLINE_ACTIVITY,
          studentCount: activityClass.get('activity.usersCount'),
          activityDate: activityClass.get('activity.activation_date')
        });
        component
          .getOfflineActivity(activityClass.get('content.id'))
          .then(offlineActivity => {
            gradingItemObject.set('content', offlineActivity);
            gradingItemObject.set('collection', offlineActivity);
            component.sendAction(
              'onGradeItem',
              gradingItemObject,
              activityClass
            );
          });
      }
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  setupTooltip: function() {
    let component = this;
    let $anchor = this.$('.content');
    let isMobile = window.matchMedia('only screen and (max-width: 768px)');
    let tagPopoverDefaultPosition = this.get('tagPopoverDefaultPosition');
    $anchor.attr('data-html', 'true');
    $anchor.popover({
      placement: tagPopoverDefaultPosition,
      content: function() {
        return component.$('.tag-tooltip').html();
      },
      trigger: 'manual',
      container: 'body'
    });

    if (isMobile.matches) {
      $anchor.on('click', function() {
        let $this = $(this);
        if (!$this.hasClass('list-open')) {
          // Close all tag tooltips by simulating a click on them
          $('.gru-class-activity-card > .content.list-open').click();
          $this.addClass('list-open').popover('show');
        } else {
          $this.removeClass('list-open').popover('hide');
        }
      });
    } else {
      $anchor.on('mouseenter', function() {
        $(this).popover('show');
      });

      $anchor.on('mouseleave', function() {
        $(this).popover('hide');
      });
    }
  },
  /**
   * Maintains the value of popover position
   * @type {String}
   */
  tagPopoverDefaultPosition: 'bottom',

  activityContent: Ember.computed.alias('activity.collection'),

  isAssessment: Ember.computed.equal(
    'activityContent.format',
    CONTENT_TYPES.ASSESSMENT
  ),

  isOfflineActivity: Ember.computed.equal(
    'activityContent.format',
    CONTENT_TYPES.OFFLINE_ACTIVITY
  ),

  isCollection: Ember.computed.equal(
    'activityContent.format',
    CONTENT_TYPES.COLLECTION
  ),

  activityClasses: Ember.computed.alias('activity.activityClasses'),

  activityDate: Ember.computed.alias('activity.date'),

  selectedClassData: {},

  contentDescription: Ember.computed('activityContent', function() {
    const component = this;
    const activityContent = component.get('activityContent');
    return (
      activityContent.get('description') ||
      (activityContent.get('standards').length ?
        activityContent.get('standards').objectAt(0).title :
        '')
    );
  }),

  isShowMasteryAccrual: Ember.computed('activity', function() {
    const component = this;
    const activity = component.get('activity');
    const isUnScheduledActivity = component.get('isUnscheduledActivity');
    return (
      !isUnScheduledActivity &&
      activity.get('collection.format') !== 'collection'
    );
  }),

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

  enableCollectionLiveLearning: true,

  /**
   * It is used to find activity is today or not
   * @return {Boolean}
   */
  isToday: Ember.computed('activity', function() {
    let activityDate = this.get('activity.added_date');
    let currentDate = moment().format('YYYY-MM-DD');
    return currentDate === activityDate;
  }),

  /**
   * Maintains the flag to show go live or not
   * @type {Boolean}
   */
  showGolive: Ember.computed('isToday', function() {
    return this.get('isToday');
  }),

  /**
   * It is used to find activity is past or not
   * @return {Boolean}
   */
  isActivityPast: Ember.computed('activity', function() {
    let activityDate =
      this.get('activity.end_date') || this.get('activity.added_date');
    let currentDate = moment().format('YYYY-MM-DD');
    return moment(activityDate).isBefore(currentDate);
  }),

  isShowListView: false,

  loadClassData() {
    const component = this;
    const activityClasses = component.get('activityClasses');
    const allowCachedData = true;
    activityClasses.map(activityClass => {
      const classId = activityClass.get('id');
      return Ember.RSVP.hash({
        classData: component
          .get('classService')
          .readClassInfo(classId, allowCachedData),
        classMembers: activityClass.get('members') ||
          component
          .get('classService')
          .readClassMembers(classId, allowCachedData)
      }).then(({
        classData,
        classMembers
      }) => {
        if (classData.get('courseId')) {
          component
            .get('courseService')
            .fetchById(classData.get('courseId'), allowCachedData)
            .then(function(courseData) {
              activityClass.setProperties({
                course: courseData,
                members: classMembers.get('members') || classMembers
              });
            });
        }
      });
    });
  },

  updateActivityVisibility() {
    const component = this;
    const classActivity = component.get('activity');
    const activityDate =
      classActivity.get('activation_date') || moment().format('YYYY-MM-DD');
    const activityClasses = classActivity.get('activityClasses');
    const activityState = classActivity.get('isActive');
    activityClasses.map(activityClass => {
      const classId = activityClass.get('id');
      component
        .get('classActivityService')
        .enableClassActivity(
          classId,
          activityClass.get('activity.id'),
          activityDate,
          activityState
        )
        .then(function() {
          if (!component.get('isDestroyed')) {
            activityClass.set('activity.activation_date', activityDate);
          }
        });
    });
  },

  markOfflineActivityAsComplete() {
    const component = this;
    const classActivity = component.get('activity');
    const activityClasses = classActivity.get('activityClasses');
    activityClasses.map(activityClass => {
      const classId = activityClass.get('id');
      const activityId = activityClass.get('activity.id');
      component
        .get('classActivityService')
        .completeOfflineActivity(classId, activityId)
        .then(() => {
          classActivity.set('isCompleted', true);
        });
    });
  },

  getOfflineActivity(offlineActivityId) {
    const component = this;
    return component
      .get('offlineActivityService')
      .readActivity(offlineActivityId);
  }
});
