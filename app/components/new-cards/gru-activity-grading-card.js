import Ember from 'ember';
import { CONTENT_TYPES } from 'gooru-web/config/config';

export default Ember.Component.extend({
  classNames: ['new-cards', 'gru-activity-grading-card'],

  /**
   * @requires service:api-sdk/offline-activity
   */
  offlineActivityService: Ember.inject.service(
    'api-sdk/offline-activity/offline-activity'
  ),

  /**
   * @requires service:api-sdk/assessment
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  didInsertElement() {
    const component = this;
    component.loadGradingData();
    component.$('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
  },

  actions: {
    onToggleContent(className) {
      const component = this;
      component.$(`.${className}`).slideToggle();
    },

    onGradeItem(gradingClass) {
      const component = this;
      const gradingItem = component.get('gradingItem');
      const gradingItemObject = Ember.Object.create({
        classId: gradingClass.get('id'),
        dcaContentId: gradingItem.get('activityId'),
        content: component.get('gradingContent'),
        collection: component.get('content'),
        contentType: gradingItem.get('contentType'),
        studentCount: gradingClass.get('studentCount'),
        activityDate: gradingClass.get('activityDate')
      });
      let activity = Ember.Object.create({
        activation_date: gradingClass.get('activityDate')
      });
      const classActivity = Ember.Object.create({
        id: gradingClass.get('id'),
        activity: activity,
        content: component.get('gradingContent')
      });
      component.sendAction('onGradeItem', gradingItemObject, classActivity);
    }
  },

  isAssessmentGrading: Ember.computed.equal(
    'gradingItem.contentType',
    CONTENT_TYPES.ASSESSMENT
  ),

  isOfflineActivityGrading: Ember.computed.equal(
    'gradingItem.contentType',
    CONTENT_TYPES.OFFLINE_ACTIVITY
  ),

  contentId: Ember.computed.alias('gradingItem.contentId'),

  gradingContent: Ember.Object.create({}),

  gradingClasses: Ember.computed.alias('gradingItem.gradingClasses'),

  loadGradingData() {
    const component = this;
    if (component.get('isAssessmentGrading')) {
      component.loadAssessmentData();
    } else {
      component.loadOfflineActivityData();
    }
  },

  loadAssessmentData() {
    const component = this;
    const assessmentId = component.get('contentId');
    const questionId = component.get('gradingItem.resourceId');
    return Ember.RSVP.hash({
      assessment: component
        .get('assessmentService')
        .readAssessment(assessmentId)
    }).then(({ assessment }) => {
      const questions = assessment.get('children');
      const question = questions.findBy('id', questionId);
      component.set('content', assessment);
      component.set('gradingContent', question);
    });
  },

  loadOfflineActivityData() {
    const component = this;
    const offlineActivityId = component.get('contentId');
    return Ember.RSVP.hash({
      offlineActivity: component
        .get('offlineActivityService')
        .readActivity(offlineActivityId)
    })
      .then(({ offlineActivity }) => {
        component.set('gradingContent', offlineActivity);
        component.set('content', offlineActivity);
      })
      .catch(function() {
        component.$('.activity-grading-card').addClass('content-not-found');
      });
  }
});
