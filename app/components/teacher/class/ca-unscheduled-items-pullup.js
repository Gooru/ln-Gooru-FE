import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['backdrop-pull-ups', 'teacher-ca-unscheduled-items-pullup'],

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service('api-sdk/class-activity'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered when the user invoke the close pull up.
     **/
    onPullUpClose() {
      this.closePullUp();
    },

    /**
     * Action triggered when the user invoke the toggle pull up.
     **/
    onPullUpOpen() {
      let component = this;
      if (component.$().hasClass('active')) {
        this.closePullUp();
      } else {
        this.openPullUp();
      }
    },

    /**
     * It will takes care of content will schedule for the specific date.
     * @param  {String} scheduleDate
     */
    onScheduleDate(scheduleDate) {
      let component = this;
      let classId = component.get('classId');
      let contentType = component.get('selectedContentForSchedule.format');
      let contentId = component.get('selectedContentForSchedule.id');
      let content = component.get('selectedContentForSchedule');
      let datepickerEle = component.$('.schedule-ca-datepicker-container');
      datepickerEle.hide();
      component
        .get('classActivityService')
        .addActivityToClass(classId, contentId, contentType, scheduleDate)
        .then(newContentId => {
          if (!component.isDestroyed) {
            let data = component.serializerSearchContent(
              content,
              newContentId,
              scheduleDate
            );
            component.sendAction('addedContentToDCA', data, scheduleDate);
          }
        });
    },

    /**
     * It will takes care of content will schedule for the specific month.
     * @param  {Number} forMonth
     * @param  {Number} forYear
     */
    onScheduleForMonth(forMonth, forYear) {
      let component = this;
      let classId = component.get('classId');
      let contentType = component.get('selectedContentForSchedule.format');
      let contentId = component.get('selectedContentForSchedule.id');
      let content = component.get('selectedContentForSchedule');
      let datepickerEle = component.$('.schedule-ca-datepicker-container');
      datepickerEle.hide();
      component
        .get('classActivityService')
        .addActivityToClass(
          classId,
          contentId,
          contentType,
          null,
          forMonth,
          forYear
        )
        .then(newContentId => {
          if (!component.isDestroyed) {
            let data = component.serializerSearchContent(
              content,
              newContentId,
              null,
              forMonth,
              forYear
            );
            component.sendAction(
              'addedContentToDCA',
              data,
              null,
              forMonth,
              forYear
            );
          }
        });
    },

    /**
     * Action get triggered when schedule content to CA got clicked
     */
    onScheduleContentToDCA(content, event) {
      let component = this;
      let datepickerEle = component.$('.schedule-ca-datepicker-container');
      let datepickerCtnEle = component.$(
        '.schedule-ca-datepicker-container .ca-date-picker-container'
      );
      datepickerCtnEle.removeClass('ca-datepicker-orientation-top');
      datepickerCtnEle.removeClass('ca-datepicker-orientation-bottom');
      datepickerCtnEle.removeClass('ca-datepicker-orientation-center');
      let selectedContentEle = component.$(event.target);
      let position = selectedContentEle.position();
      let top = position.top + 10 - datepickerEle.height();
      let left = position.left + 20 - datepickerEle.width();
      let componentHeight = component.$().height();
      if (left < 0) {
        left = position.left - datepickerEle.width() / 2;
        datepickerCtnEle.addClass('ca-datepicker-orientation-center');
      }
      let windowHeight = $(window).height();
      let allowedTop = windowHeight - componentHeight + top;
      if (allowedTop < 0) {
        datepickerCtnEle.addClass('ca-datepicker-orientation-bottom');
        top = position.top + 25;
      } else {
        datepickerCtnEle.addClass('ca-datepicker-orientation-top');
      }
      datepickerEle.css({
        top: top,
        left: left
      });
      if (!selectedContentEle.hasClass('active')) {
        selectedContentEle.addClass('active');
        datepickerEle.show();
      } else {
        selectedContentEle.removeClass('active');
        datepickerEle.hide();
      }
      this.set('selectedContentForSchedule', content);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  didInsertElement() {
    this.closeCADatePickerOnScroll();
  },

  didRender() {
    this.handleAppContainerScroll();
  },

  didDestroyElement() {
    this.handleAppContainerScroll();
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * ClassId belongs to this class.
   * @type {String}
   */
  classId: null,

  /**
   * It maintains the list of un scheduled class activities.
   * @type {Array}
   */
  unScheduledClassActivities: Ember.A([]),

  //--------------------------------------------------------------------------
  // Methods

  /**
   * Function to animate the  pullup from bottom to top
   */
  openPullUp() {
    let component = this;
    component.$().animate(
      {
        top: '10%'
      },
      400,
      function() {
        component.$().addClass('active');
      }
    );
  },

  closePullUp() {
    let component = this;
    component.$().animate(
      {
        top: '90%'
      },
      400,
      function() {
        component.$().css('top', 'calc(100% - 35px)');
        component.$().removeClass('active');
        component.set('showPullUp', false);
      }
    );
  },

  handleAppContainerScroll() {
    let activePullUpCount = Ember.$(document.body).find('.backdrop-pull-ups')
      .length;
    if (activePullUpCount > 0) {
      Ember.$(document.body).addClass('no-vertical-scroll');
    } else if (activePullUpCount === 0) {
      Ember.$(document.body).removeClass('no-vertical-scroll');
    }
  },

  serializerSearchContent(content, contentId, date) {
    return Ember.Object.create({
      id: contentId,
      added_date: date,
      activityDate: date,
      collection: content,
      usersCount: -1,
      isActive: false
    });
  },

  closeCADatePickerOnScroll() {
    let component = this;
    component.$('.ca-unscheduled-content-items').on('scroll', function() {
      if (Ember.$('.ca-datepicker-popover-container').is(':visible')) {
        Ember.$('.ca-datepicker-popover-container').hide();
        Ember.$('.ca-datepicker-popover').removeClass('active');
      }
    });
  }
});
