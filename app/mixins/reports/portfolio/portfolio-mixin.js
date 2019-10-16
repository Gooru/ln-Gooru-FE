import Ember from 'ember';
import { CONTENT_TYPES } from 'gooru-web/config/config';

export default Ember.Mixin.create({
  portfolioService: Ember.inject.service('api-sdk/portfolio'),

  session: Ember.inject.service('session'),

  userId: Ember.computed(function() {
    return this.get('session.userId');
  }),

  actions: {
    onSelectAttempt(attempt) {
      const mixin = this;
      mixin.set('activeAttempt', attempt);
      mixin.loadActivityPerformance(attempt);
    }
  },

  activeAttempt: Ember.computed('activityAttempts.[]', function() {
    const mixin = this;
    const activityAttempts = mixin.get('activityAttempts');
    return activityAttempts
      ? activityAttempts.objectAt(0)
      : Ember.Object.create({});
  }),

  latestAttempt: Ember.computed('activityAttempts.[]', function() {
    const mixin = this;
    const activityAttempts = mixin.get('activityAttempts');
    return activityAttempts
      ? activityAttempts.objectAt(0)
      : Ember.Object.create({});
  }),

  totalNumberOfAttempts: Ember.computed('activityAttempts', function() {
    return this.get('activityAttempts.length') - 1;
  }),

  loadActivityAttempts() {
    const mixin = this;
    Ember.RSVP.hash({
      activityAttempts: mixin.fetchActivityAttempts()
    }).then(({ activityAttempts }) => {
      if (!mixin.isDestroyed) {
        mixin.set('activityAttempts', activityAttempts);
        if (activityAttempts.length) {
          mixin.loadActivityPerformance(activityAttempts.objectAt(0));
        }
      }
    });
  },

  loadActivityPerformance(activityAttempt) {
    const mixin = this;
    Ember.RSVP.hash({
      activityPerformance: mixin.fetchActivityAttemptPerformance(
        activityAttempt
      )
    }).then(({ activityPerformance }) => {
      if (!mixin.isDestroyed) {
        mixin.set('activityPerformance', activityPerformance);
        mixin.parseActivityPerformance();
      }
    });
  },

  fetchActivityAttempts() {
    const mixin = this;
    const userId = mixin.get('userId');
    const itemId = mixin.get('contentId');
    const requestParams = {
      userId,
      itemId
    };
    return mixin.get('portfolioService').getAllAttemptsByItem(requestParams);
  },

  fetchActivityAttemptPerformance(activityAttempt) {
    const mixin = this;
    const userId = mixin.get('userId');
    const itemId = activityAttempt.get('id');
    const sessionId = activityAttempt.get('sessionId');
    const contentSource = activityAttempt.get('contentSource');
    const activityType = activityAttempt
      .get('type')
      .includes(CONTENT_TYPES.ASSESSMENT)
      ? CONTENT_TYPES.ASSESSMENT
      : CONTENT_TYPES.COLLECTION;
    const requestParams = {
      userId,
      itemId,
      sessionId,
      contentSource
    };
    return mixin
      .get('portfolioService')
      .getActivityPerformanceBySession(requestParams, activityType);
  }
});
