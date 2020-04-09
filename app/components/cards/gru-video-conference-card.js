import Ember from 'ember';
import { formatimeToDateTime } from 'gooru-web/utils/utils';

export default Ember.Component.extend({
  /**
   * Class attributes defines
   */
  classNames: ['gru-video-conference-card'],

  session: Ember.inject.service('session'),

  /**
   * @property {Boolean} hasVideoConference hold toggle checkbox activity
   */
  hasVideoConference: false,

  /**
   * @property {Object} activeActivityContent hold activity data
   */
  activeActivityContent: null,

  /**
   * @property {Boolean} isScheduled hold activity data
   */
  isScheduled: false,

  /**
   * @property {Boolean} conferenceToken
   */
  conferenceToken: Ember.computed('window', function() {
    return (
      window.localStorage.getItem(
        `user_vid_config_${this.get('session.userId')}`
      ) || false
    );
  }),

  /**
   * Toggle Options for the Advanced Edit button
   * @property {Ember.Array}
   */
  switchOptions: Ember.A([
    Ember.Object.create({
      label: '',
      value: true
    }),
    Ember.Object.create({
      label: '',
      value: false
    })
  ]),

  options: {
    dropdown: false
  },

  startTime: moment().format('hh:mm A'),

  endTime: moment()
    .add(1, 'hours')
    .format('hh:mm A'),

  updateStartDate: Ember.computed('activeActivityContent', function() {
    return this.get('activeActivityContent.added_date') || null;
  }),

  updateEndDate: Ember.computed('activeActivityContent', function() {
    return this.get('activeActivityContent.end_date') || null;
  }),

  didInsertElement() {
    const component = this;
    this.$('.startTime').timepicker({
      timeFormat: 'hh:mm p',
      interval: 15,
      defaultTime: this.roundTimeQuarterHour(),
      change: function() {
        const endTime = moment(component.$(this).val(), 'hh:mm A')
          .add(1, 'hours')
          .format('hh:mm A');
        component
          .$('.endTime')
          .timepicker('option', 'minTime', endTime)
          .val(endTime);
      }
    });
    this.$('.endTime').timepicker({
      timeFormat: 'hh:mm p',
      interval: 15
    });
  },

  actions: {
    /**
     * @function onToggleCheckbox action help to toggle conference
     */
    onToggleCheckbox(value) {
      if (this.get('conferenceToken')) {
        this.set('hasVideoConference', value);
      } else {
        this.set('hasVideoConference', value);
        this.sendAction('onToggleCheckbox', value);
      }
    },

    /**
     * @function onAddActivity action help to add activity
     */
    onAddActivity() {
      let isScheduled = this.get('isScheduled');
      let updateStartDate = this.get('updateStartDate');
      let updateEndDate = this.get('updateEndDate');
      let content =
        this.get('activeActivityContent') || Ember.Object.create({});
      const startTime = !isScheduled
        ? formatimeToDateTime(updateStartDate, this.$('.startTime').val())
        : this.$('.startTime').val();

      const endTime = !isScheduled
        ? formatimeToDateTime(updateEndDate, this.$('.endTime').val())
        : this.$('.endTime').val();

      content.set('meetingStartTime', startTime);
      content.set('meetingEndTime', endTime);
      content.set('hasVideoConference', this.get('hasVideoConference'));
      this.sendAction('onAddActivity', content);
    }
  },

  roundTimeQuarterHour() {
    let timeToReturn = new Date(
      moment()
        .add(5, 'm')
        .toDate()
    );
    timeToReturn.setMilliseconds(
      Math.round(timeToReturn.getMilliseconds() / 1000) * 1000
    );
    timeToReturn.setSeconds(Math.round(timeToReturn.getSeconds() / 60) * 60);
    timeToReturn.setMinutes(Math.round(timeToReturn.getMinutes() / 15) * 15);
    return moment(timeToReturn).format('hh:mm A');
  }
});
