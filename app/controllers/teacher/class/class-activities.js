import Ember from 'ember';
import SessionMixin from 'gooru-web/mixins/session';
import ModalMixin from 'gooru-web/mixins/modal';

/**
 * Class activities controller
 *
 * Controller responsible of the logic for the teacher class activities tab
 */
export default Ember.Controller.extend(SessionMixin, ModalMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * Class controller
   */
  classController: Ember.inject.controller('teacher.class'),

  /**
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service('api-sdk/class-activity'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered when add dca button got clicked.
     * @param  {String} selectedSearchContentType
     */
    onAddDca(selectedSearchContentType) {
      let controller = this;
      let contextParams = {
        classId: controller.get('classId'),
        class: controller.get('class'),
        course: controller.get('course')
      };
      controller.set('contextParams', contextParams);
      controller.set('selectedSearchContentType', selectedSearchContentType);
      controller.set('showSearchContentPullup', true);
    },

    /**
     * Action Triggered when course map button clicked.
     */
    addFromCourseMap() {
      let controller = this;
      let contextParams = {
        classId: controller.get('classId'),
        courseId: controller.get('courseId')
      };
      controller.set('courseMapContextParams', contextParams);
      controller.set('showDcaCourseMapPullup', true);
    },

    /**
     * Action will trigger to open teacher dca content report.
     * @param  {Object} collection
     */
    openDcaContentReport(selectedClassActivity) {
      let controller = this;
      let collection = selectedClassActivity.get('collection');
      let activityDate = selectedClassActivity.get('added_date');
      let dateWiseClassActivity = controller
        .get('classActivities')
        .findBy('added_date', activityDate);
      let dateWiseClassActivities = dateWiseClassActivity.get(
        'classActivities'
      );
      let collections = dateWiseClassActivities.map(classActivity => {
        return classActivity.get('collection');
      });
      let params = {
        classId: controller.get('classId'),
        collection: collection,
        collections: collections,
        activityDate: activityDate,
        classMembers: controller.get('members')
      };
      controller.set('showDcaCollectionReportPullUp', true);
      controller.set('dcaCollectionReportData', params);
    },

    /**
     * Update the  content data to  class activities
     * @param  {Object} content
     * @param  {Date} addedDate
     */
    addedContentToDCA(content, addedDate) {
      let controller = this;
      let classActivities = controller.get('classActivities');
      let dateWiseClassActivities = classActivities.findBy(
        'added_date',
        addedDate
      );
      if (!dateWiseClassActivities) {
        classActivities.pushObject(
          Ember.Object.create({
            added_date: addedDate,
            classActivities: Ember.A([])
          })
        );
        dateWiseClassActivities = classActivities.findBy(
          'added_date',
          addedDate
        );
      }
      let id = content.get('id');
      let addContent = dateWiseClassActivities
        .get('classActivities')
        .findBy('id', id);
      if (!addContent) {
        addContent = content;
        dateWiseClassActivities.get('classActivities').pushObject(content);
        let sortedDateWiseClassActivities = dateWiseClassActivities
          .get('classActivities')
          .sortBy('id')
          .reverse();
        dateWiseClassActivities.set(
          'classActivities',
          sortedDateWiseClassActivities
        );
      }
      if (!content.get('isAddedFromPanel')) {
        controller.get('newlyAddedDcaContents').pushObject(addContent);
      } else {
        addContent.set('isNewlyAdded', true);
        Ember.run.later(function() {
          addContent.set('isNewlyAdded', false);
        }, 2000);
      }
      this.set(
        'classActivities',
        classActivities.sortBy('added_date').reverse()
      );
    },

    /**
     *
     * @function actions:changeVisibility
     */
    changeVisibility: function(classActivity) {
      const controller = this;
      const currentClass = controller.get('classController.class');
      const classId = currentClass.get('id');
      const classActivityId = classActivity.get('id');
      const date = classActivity.get('added_date');
      controller
        .get('classActivityService')
        .enableClassActivity(classId, classActivityId, date)
        .then(function() {
          classActivity.set('date', date);
        });
    },

    /**
     *
     * @function actions:removeClassActivity
     */
    removeClassActivity: function(classActivity) {
      let controller = this;
      let currentClassId = controller.get('classController.class.id');
      let classActivityId = classActivity.get('id');
      let classActivityType = classActivity.get('collection.collectionType');
      var model = {
        type: classActivityType,
        deleteMethod: function() {
          return controller
            .get('classActivityService')
            .removeClassActivity(currentClassId, classActivityId);
        },
        callback: {
          success: function() {
            controller.removeClassActivity(classActivity);
          }
        }
      };
      this.actions.showModal.call(
        this,
        'content.modals.gru-remove-class-activity',
        model
      );
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
        '.controller.teacher.class.class-activities #ca-datepicker .datepicker-days .prev'
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
        '.controller.teacher.class.class-activities #ca-datepicker .datepicker-days .next'
      );
      datepickerEle.trigger('click');
      this.loadData();
    },

    showCalendar() {
      this.toggleDatePicker();
    }
  },

  // -------------------------------------------------------------------------
  // Events

  initialize() {
    let controller = this;
    controller._super(...arguments);
    Ember.run.scheduleOnce('afterRender', controller, function() {
      controller.initializeDatePicker();
    });
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {boolean} Indicates if there are class activities
   */
  showClassActivities: Ember.computed.gt('classActivities.length', 0),

  /**
   * Maintains the selected search content type.
   * @type {String}
   */
  selectedSearchContentType: 'collection',

  /**
   * Maintains the state of show search content pull up
   * @type {Boolean}
   */
  showSearchContentPullup: false,

  /**
   * Maintains the state of show dca collection report pull up
   * @type {Boolean}
   */
  showDcaCollectionReportPullUp: false,

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
   * Course Id which is associated with this class
   * @property {String}
   */
  courseId: Ember.computed.alias('classController.class.courseId'),

  /**
   * Course Object
   * @property {Object}
   */
  course: Ember.computed.alias('classController.course'),

  /**
   * Class id
   * @property {String}
   */
  members: Ember.computed.alias('classController.class.members'),
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
   * Maintains the list of newly added DCA content
   * @type {Array}
   */
  newlyAddedDcaContents: Ember.A([]),

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
  // Observers

  /**
   * Update the newly added flag for added dca content.
   */
  updateNewlyAddedFlag: Ember.observer(
    'showSearchContentPullup',
    'showDcaCourseMapPullup',
    function() {
      let component = this;
      let showSearchContentPullup = component.get('showSearchContentPullup');
      let showDcaCourseMapPullup = component.get('showDcaCourseMapPullup');
      let newlyAddedDcaContents = component.get('newlyAddedDcaContents');
      if (
        !showDcaCourseMapPullup &&
        !showSearchContentPullup &&
        newlyAddedDcaContents.length > 0
      ) {
        newlyAddedDcaContents.forEach(content => {
          content.set('isNewlyAdded', true);
        });
        Ember.run.later(function() {
          newlyAddedDcaContents.forEach(content => {
            content.set('isNewlyAdded', false);
          });
          component.set('newlyAddedDcaContents', Ember.A());
        }, 5000);
      }
    }
  ),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Removes a class activity from a list of classActivities
   * @param {classActivity} classActivity
   */
  removeClassActivity: function(classActivity) {
    let classActivities = this.get('classActivities');
    let addedDate = classActivity.get('added_date');
    let id = classActivity.get('id');
    let dateWiseClassActivities = classActivities.findBy(
      'added_date',
      addedDate
    );
    let classActivityToDelete = dateWiseClassActivities
      .get('classActivities')
      .findBy('id', id);
    dateWiseClassActivities
      .get('classActivities')
      .removeObject(classActivityToDelete);
    if (dateWiseClassActivities.get('classActivities').length === 0) {
      classActivities.removeObject(dateWiseClassActivities);
    }
  },

  loadData() {
    const controller = this;
    const classId = controller.get('classId');
    let forMonth = controller.get('forMonth');
    let forYear = controller.get('forYear');
    controller.set('isLoading', true);
    controller
      .get('classActivityService')
      .findClassActivities(classId, null, forMonth, forYear)
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
      '.controller.teacher.class.class-activities #ca-datepicker'
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
        '.controller.teacher.class.class-activities .dca-list-container'
      );
      let selectedDateEle = Ember.$(
        `.controller.teacher.class.class-activities .dca-list-container .ca-date-${selectedDate}`
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
      '.controller.teacher.class.class-activities .ca-datepicker-container'
    );
    let dateDisplayEle = Ember.$(
      '.controller.teacher.class.class-activities .ca-datepicker-container .cal-mm-yyyy'
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
