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

    showPreviousMonth() {
      let forFirstDateOfMonth = this.get('forFirstDateOfMonth');
      let forMonth = moment(forFirstDateOfMonth)
        .subtract(1, 'months')
        .format('MM');
      let forYear = moment(forFirstDateOfMonth)
        .subtract(1, 'months')
        .format('YYYY');
      this.set('forMonth', forMonth);
      this.set('forYear', forYear);
      let datepickerEle = Ember.$(
        '.controller.student.class.class-activities #ca-datepicker .datepicker-days .prev'
      );
      datepickerEle.trigger('click');
      this.loadData();
    },

    showNextMonth() {
      let forFirstDateOfMonth = this.get('forFirstDateOfMonth');
      let forMonth = moment(forFirstDateOfMonth)
        .add(1, 'months')
        .format('MM');
      let forYear = moment(forFirstDateOfMonth)
        .add(1, 'months')
        .format('YYYY');
      this.set('forMonth', forMonth);
      this.set('forYear', forYear);
      let datepickerEle = Ember.$(
        '.controller.student.class.class-activities #ca-datepicker .datepicker-days .next'
      );
      datepickerEle.trigger('click');
      this.loadData();
    },

    showCalendar() {
      this.toggleDatePicker();
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

  // -------------------------------------------------------------------------
  // Methods

  initialize() {
    let controller = this;
    controller._super(...arguments);
    Ember.run.scheduleOnce('afterRender', controller, function() {
      controller.set('forMonth', moment().format('MM'));
      controller.set('forYear', moment().format('YYYY'));
      controller.initializeDatePicker();
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

  initializeDatePicker: function() {
    let datepickerEle = Ember.$(
      '.controller.student.class.class-activities #ca-datepicker'
    );
    datepickerEle.datepicker({
      maxViewMode: 0,
      format: 'yyyy-mm-dd'
    });
    datepickerEle.off('changeDate').on('changeDate', function() {
      let datepicker = this;
      let selectedDate = Ember.$(datepicker)
        .datepicker('getFormattedDate')
        .valueOf();
      let listContainerEle = Ember.$(
        '.controller.student.class.class-activities .dca-list-container'
      );
      let selectedDateEle = Ember.$(
        `.controller.student.class.class-activities .dca-list-container .ca-date-${selectedDate}`
      );
      if (selectedDateEle.length > 0) {
        listContainerEle.animate(
          {
            scrollTop: selectedDateEle.offset().top
          },
          'slow'
        );
      }
    });
  },

  toggleDatePicker() {
    let element = Ember.$(
      '.controller.student.class.class-activities .ca-content-container .ca-datepicker-container'
    );
    let dateDisplayEle = Ember.$(
      '.controller.student.class.class-activities .ca-content-container .ca-date-container .cal-mm-yyyy'
    );
    if (!element.hasClass('active')) {
      element.slideDown(400, function() {
        element.addClass('active');
        dateDisplayEle.addClass('active');
      });
    } else {
      element.slideUp(400, function() {
        element.removeClass('active');
        dateDisplayEle.removeClass('active');
      });
    }
  }
});
