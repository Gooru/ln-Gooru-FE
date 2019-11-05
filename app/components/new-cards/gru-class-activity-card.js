import Ember from 'ember';
import { CONTENT_TYPES } from 'gooru-web/config/config';

export default Ember.Component.extend({
  classNames: ['class-activities', 'gru-class-activity-card'],

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

  didInsertElement() {
    const component = this;
    component.loadClassData();
  },

  actions: {
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
    }
  },

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
   * It is used to find activity is past or not
   * @return {Boolean}
   */
  isActivityPast: Ember.computed('activityDate', function() {
    let activityDate = this.get('activityDate');
    let currentDate = moment().format('YYYY-MM-DD');
    return moment(activityDate).isBefore(currentDate);
  }),

  loadClassData() {
    const component = this;
    const activityClasses = component.get('activityClasses');
    activityClasses.map(activityClass => {
      const classId = activityClass.get('id');
      return Ember.RSVP.hash({
        classData: component.get('classService').readClassInfo(classId),
        classMembers:
          activityClass.get('members') ||
          component.get('classService').readClassMembers(classId)
      }).then(({ classData, classMembers }) => {
        component
          .get('courseService')
          .fetchById(classData.get('courseId'))
          .then(function(courseData) {
            activityClass.setProperties({
              course: courseData,
              members: classMembers.get('members') || classMembers
            });
          });
      });
    });
  },

  updateActivityVisibility() {
    const component = this;
    const classActivity = component.get('activity');
    const activityDate = classActivity.get('activation_date');
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
          component.set('activity.activation_date', activityDate);
        });
    });
  }
});
