import Ember from 'ember';
import { formatimeToDateTime, dateTimeToTime } from 'gooru-web/utils/utils';

export default Ember.Component.extend({
  /**
   * Class attributes defines
   */
  classNames: ['gru-video-conference-card'],

  session: Ember.inject.service('session'),

  videConferenceService: Ember.inject.service('api-sdk/video-conference'),

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
   * @property {Boolean} isUpdateCard hold activity data
   */
  isUpdateCard: false,

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
  /**
   * @return {String} hold the start time
   */
  startTime: Ember.computed('activeActivityContent', function() {
    return this.get('activeActivityContent.meeting_url')
      ? dateTimeToTime(this.get('activeActivityContent.meeting_starttime'))
      : moment().format('hh:mm A');
  }),
  /**
   * @return {String} hold the end time
   */
  endTime: Ember.computed('activeActivityContent', function() {
    return this.get('activeActivityContent.meeting_url')
      ? dateTimeToTime(this.get('activeActivityContent.meeting_endtime'))
      : moment()
        .add(1, 'hours')
        .format('hh:mm A');
  }),

  isUpdateVideoConference: Ember.computed('activeActivityContent', function() {
    return !!this.get('activeActivityContent.meeting_url');
  }),

  updateStartDate: Ember.computed('activeActivityContent', function() {
    return this.get('activeActivityContent.added_date') || null;
  }),

  updateEndDate: Ember.computed('activeActivityContent', function() {
    return this.get('activeActivityContent.end_date') || null;
  }),

  isChangedTime: false,

  didInsertElement() {
    const component = this;
    if (
      !component.get('conferenceToken') &&
      component.get('hasVideoConference')
    ) {
      this.sendAction('onToggleCheckbox', component.get('hasVideoConference'));
    }
    component.$('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
    this.$('.startTime').timepicker({
      timeFormat: 'hh:mm p',
      interval: 15,
      defaultTime: this.get('isUpdateVideoConference')
        ? this.get('startTime')
        : this.roundTimeQuarterHour(),
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
      interval: 15,
      change: function() {
        if (
          this.get('activeActivityContent.meeting_endtime') !== $(this).val()
        ) {
          component.set('isChangedTime', true);
        }
      }
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
      if (!this.get('conferenceToken') && this.get('hasVideoConference')) {
        this.get('videConferenceService').fetchConferenceToken();
      }
      this.sendAction('onAddActivity', content);
    },

    onRemoveConference() {
      let content = this.get('activeActivityContent');
      let activityPromise = content.activityClasses.map(activity => {
        return new Ember.RSVP.Promise((resolve, reject) => {
          let params = {
            classId: activity.get('id'),
            contentId: activity.get('activity.id')
          };
          return Ember.RSVP.hash({
            updateConference: this.get(
              'videConferenceService'
            ).deleteConferenceEvent(params)
          }).then(() => {
            resolve();
          }, reject);
        });
      });
      Ember.RSVP.all(activityPromise).then(() => {
        content.setProperties({
          meeting_id: null,
          meeting_url: null,
          meeting_endtime: null,
          meeting_starttime: null,
          meeting_timezone: null
        });
        this.set('isAddActivity', false);
      });
    },

    updateMeeting() {
      let content = this.get('activeActivityContent');
      let updateStartDate = this.get('updateStartDate');
      let updateEndDate = this.get('updateEndDate');
      let params = {
        data: {
          meeting_id: content.get('meeting_id'),
          meeting_url: content.get('meeting_url'),
          meeting_endtime: formatimeToDateTime(
            updateEndDate,
            this.$('.endTime').val()
          ),
          meeting_starttime: formatimeToDateTime(
            updateStartDate,
            this.$('.startTime').val()
          ),
          meeting_timezone: content.get('meeting_timezone')
        }
      };
      let activityPromise = content.activityClasses.map(activity => {
        return new Ember.RSVP.Promise((resolve, reject) => {
          params.classId = activity.get('id');
          params.contentId = activity.get('activity.id');
          return Ember.RSVP.hash({
            updateConference: this.get(
              'videConferenceService'
            ).updateConferenceEvent(params)
          }).then(() => {
            resolve();
          }, reject);
        });
      });
      Ember.RSVP.all(activityPromise).then(() => {
        content.setProperties(params.data);
        this.set('isAddActivity', false);
      });
    },

    launchMeeting(meetingUrl) {
      if (meetingUrl) {
        window.open(
          meetingUrl,
          '_blank',
          'toolbar=yes,scrollbars=yes,resizable=yes,top=10,left=10,width=1000,height=700'
        );
        this.set('isAddActivity', false);
      }
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
