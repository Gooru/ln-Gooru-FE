import Ember from 'ember';
import SessionMixin from 'gooru-web/mixins/session';
import ModalMixin from 'gooru-web/mixins/modal';

/**
 * Class activities controller
 *
 * Controller responsible of the logic for the student class activities tab
 */
export default Ember.Controller.extend(SessionMixin, ModalMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * Read the class data from the parent student class controller
   * @property {Object}
   */
  classController: Ember.inject.controller('student.class'),

  /**
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service('api-sdk/class-activity'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    studentDcaReport(collection, studentPerformance, activityDate) {
      let component = this;
      let userId = component.get('session.userId');
      let params = {
        userId: userId,
        classId: component.get('class.id'),
        collectionId: collection.get('id'),
        type: collection.get('format'),
        isStudent: true,
        collection,
        activityDate,
        studentPerformance
      };
      if (collection.get('format') === 'assessment-external') {
        component.set('isShowStudentExternalAssessmentReport', true);
        component.set('showStudentDcaReport', false);
      } else {
        component.set('showStudentDcaReport', true);
        component.set('isShowStudentExternalAssessmentReport', false);
      }
      component.set('studentReportContextData', params);
    },

    onClosePullUp() {
      let component = this;
      component.set('isShowStudentExternalAssessmentReport', false);
      component.set('studentDcaReport', false);
    },

    showCalendar() {
      this.toggleDatePicker();
    },

    showPreviousMonth() {
      this.loadData();
    },

    showNextMonth() {
      this.loadData();
    },

    onSelectDate(date) {
      this.handleScrollToSpecificDate(date);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Contains classActivity objects
   * @property {classActivity[]} classActivities
   */
  classActivities: Ember.A([]),

  /**
   * Class id
   * @property {String}
   */
  classId: Ember.computed.alias('classController.class.id'),

  /**
   * Class Object
   * @property {Object}
   */
  class: Ember.computed.alias('classController.class'),

  /**
   * @property {boolean} Indicates if there are class activities
   */
  showClassActivities: Ember.computed.gt('classActivities.length', 0),

  /**
   * @property {Boolean} isShowStudentExternalAssessmentReport
   */
  isShowStudentExternalAssessmentReport: false,

  /**
   * @property {Boolean} studentDcaReport
   */
  studentDcaReport: false,

  /**
   * Class id
   * @property {String}
   */
  collection: Ember.computed.alias('classController.class.collection'),

  /**
   * Maintain  state of loading data
   * @type {Boolean}
   */
  isLoading: false,

  /**
   * Maintains the value which of month activities displaying
   * @type {Integer}
   */
  forMonth: Ember.computed(function() {
    return moment().format('MM');
  }),

  /**
   * Maintains the value which of year activities displaying
   * @type {Integer}
   */
  forYear: Ember.computed(function() {
    return moment().format('YYYY');
  }),

  /**
   * Maintains  the value of first date of month
   * @return {String}
   */
  forFirstDateOfMonth: Ember.computed('forMonth', 'forYear', function() {
    let forMonth = this.get('forMonth');
    let forYear = this.get('forYear');
    let date = `${forYear}-${forMonth}-01`;
    return moment(date).format('YYYY-MM-DD');
  }),

  /**
   * Maintains the value  of today date
   * @type {String}
   */
  today: Ember.computed(function() {
    return moment().format('YYYY-MM-DD');
  }),

  /**
   * It Maintains the list of scheduled class activities datewise.
   * @type {Array}
   */
  scheduledClassActivitiesDatewise: Ember.computed(
    'classActivities.[]',
    function() {
      let controller = this;
      let activities = Ember.A();
      controller.get('classActivities').forEach(classActivity => {
        let addedDate = classActivity.get('added_date');
        if (addedDate) {
          let isToday =
            moment(addedDate).format('YYYY-MM-DD') ===
            moment().format('YYYY-MM-DD');
          let activity = Ember.Object.create({
            day: moment(addedDate).format('DD'),
            hasActivity: true,
            isToday
          });
          activities.pushObject(activity);
        }
      });
      return activities;
    }
  ),

  // -------------------------------------------------------------------------
  // Methods

  initialize() {
    let controller = this;
    controller._super(...arguments);
    Ember.run.scheduleOnce('afterRender', controller, function() {
      controller.set('forMonth', moment().format('MM'));
      controller.set('forYear', moment().format('YYYY'));
      let date = moment().format('YYYY-MM-DD');
      controller.handleScrollToSpecificDate(date);
      controller.slideUpCAInlineDatePickerOnClickOutSide();
    });
  },

  loadData() {
    const controller = this;
    const classId = controller.get('classId');
    let forMonth = controller.get('forMonth');
    let forYear = controller.get('forYear');
    const userId = controller.get('session.userId');
    controller.set('isLoading', true);
    controller
      .get('classActivityService')
      .findStudentClassActivities(userId, classId, null, forMonth, forYear)
      .then(classActivities => {
        controller.set('classActivities', Ember.A([]));
        if (classActivities && classActivities.length > 0) {
          controller.parseClassActivityData(classActivities);
        }
        controller.set('isLoading', false);
        Ember.run.later(function() {
          let date = moment().format('YYYY-MM-DD');
          controller.handleScrollToSpecificDate(date, true);
        }, 1000);
      });
  },

  parseClassActivityData(classActivitiesData) {
    let controller = this;
    let classActivities = controller.get('classActivities');
    classActivitiesData.forEach(data => {
      let addedDate = data.get('added_date');
      let classActivity = classActivities.findBy('added_date', addedDate);
      if (!classActivity) {
        classActivity = Ember.Object.create({
          added_date: addedDate,
          classActivities: Ember.A([])
        });
        classActivities.pushObject(classActivity);
      }
      classActivity.get('classActivities').pushObject(data);
    });
  },

  handleScrollToSpecificDate(date, isDefaultTop) {
    let dateEle = Ember.$(
      `.student_class_class-activities .dca-date-view-container-${date}`
    );
    if (dateEle.length > 0) {
      let scrollToContainer = Ember.$('.dca-list-container');
      let reduceHeight = 50;
      let top =
        dateEle.position().top - reduceHeight + scrollToContainer.scrollTop();
      scrollToContainer.animate(
        {
          scrollTop: top
        },
        1000
      );
    } else if (isDefaultTop) {
      let scrollToContainer = Ember.$('.dca-list-container');
      scrollToContainer.animate(
        {
          scrollTop: 0
        },
        1000
      );
    }
  },

  slideUpCAInlineDatePickerOnClickOutSide() {
    Ember.$('.student_class_class-activities').on('click', function(e) {
      if (
        !Ember.$(e.target).hasClass('ca-date-picker-toggle') &&
        Ember.$('.ca-date-picker-container').has(e.target).length === 0
      ) {
        let element = Ember.$(
          '.student_class_class-activities .ca-date-picker-inline'
        );
        if (element.length > 0 && element.hasClass('active')) {
          let dateDisplayEle = Ember.$(
            '.student_class_class-activities .ca-content-container .cal-mm-yyyy'
          );
          element.slideUp(400, function() {
            element.removeClass('active');
            dateDisplayEle.removeClass('active');
          });
        }
      }
    });
  }
});
