import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['offline-activity-player', 'gru-offline-activity-submission'],

  activityTasks: Ember.computed.alias('offlineActivity.tasks')
});
