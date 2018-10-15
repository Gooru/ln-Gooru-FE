import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['backdrop-pull-ups', 'teacher-class-dca-course-map-pull-up'],

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:api-sdk/course-map
   */
  courseMapService: Ember.inject.service('api-sdk/course-map'),

  /**
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service('api-sdk/class-activity'),

  /**
   * @type {CourseService} Service to retrieve course information
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @type {UnitService} Service to retrieve unit information
   */
  unitService: Ember.inject.service('api-sdk/unit'),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Propery to hide the default pullup.
   * @property {showPullUp}
   */
  showPullUp: false,

  /**
   * Maintains the state of data loading
   * @type {Boolean}
   */
  isLoading: false,

  /**
   * Maintains the context data
   * @type {Object}
   */
  context: null,

  /**
   * Class Id extract from context
   * @type {String}
   */
  classId: Ember.computed.alias('context.classId'),

  /**
   * Course Id which is mapped to this class.
   * @type {String}
   */
  courseId: Ember.computed.alias('context.courseId'),

  /**
   * This property have details of course object
   * @type {Object}
   */
  course: null,

  /**
   * Maximum number of days to schedule dca content ahead.
   * @type {Number}
   */
  maxNumberOfDays: 30,

  /**
   * Selected collection for scheduling
   * @type {Object}
   */
  selectedContentForSchedule: null,

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered when the user close the pull up.
     **/
    onPullUpClose() {
      this.closePullUp();
    },

    /**
     * Handle toggle functionality of hide/show unit items
     * @return {Object}
     */
    toggleUnitItems(selectedUnit) {
      let component = this;
      let unitId = selectedUnit.get('id');
      let element = `#dca-unit-${unitId}`;
      let courseId = component.get('courseId');
      if (selectedUnit.get('isActive')) {
        component.$(element).slideUp(400, function() {
          selectedUnit.set('isActive', false);
        });
      } else {
        component.$(element).slideDown(400, function() {
          selectedUnit.set('isActive', true);
        });
      }
      component
        .get('unitService')
        .fetchById(courseId, unitId)
        .then(unit => {
          if (!component.isDestroyed) {
            selectedUnit.set('children', unit.get('children'));
            selectedUnit.set('hasLessonFetched', true);
          }
        });
    },

    /**
     * Handle toggle functionality of hide/show lesson items
     * @return {Object}
     */
    toggleLessonItems(selectedUnit, selectedLesson) {
      let component = this;
      let classId = selectedUnit.get('classId');
      let unitId = selectedUnit.get('id');
      let lessonId = selectedLesson.get('id');
      let element = `#dca-lesson-${lessonId}`;
      let courseId = component.get('courseId');
      if (selectedLesson.get('isActive')) {
        component.$(element).slideUp(400, function() {
          selectedLesson.set('isActive', false);
        });
      } else {
        component.$(element).slideDown(400, function() {
          selectedLesson.set('isActive', true);
        });
      }
      component
        .get('courseMapService')
        .getLessonInfo(classId, courseId, unitId, lessonId, true)
        .then(lesson => {
          if (!component.isDestroyed) {
            selectedLesson.set('children', lesson.get('children'));
            selectedLesson.set('hasCollectionFetched', true);
          }
        });
    },

    /**
     * Action get triggered when add content to DCA got clicked
     */
    onAddContentToDCA(content) {
      let component = this;
      let classId = component.get('classId');
      let contentType = content.get('format');
      let contentId = content.get('id');
      component
        .get('classActivityService')
        .addActivityToClass(classId, contentId, contentType)
        .then(newContentId => {
          let date = moment().format('YYYY-MM-DD');
          let data = component.serializerSearchContent(
            content,
            newContentId,
            date
          );
          content.set('isAdded', true);
          component.sendAction('addedContentToDCA', data, date);
        });
    },

    /**
     * Action get triggered when schedule content to DCA got clicked
     */
    onScheduleContentToDCA(content, event) {
      let element = this.$(event.target).find('.schedule-dca-datepicker');
      if (!element.hasClass('active')) {
        this.$('.schedule-dca-datepicker').removeClass('active');
        element.addClass('active').datepicker('show');
      } else {
        element.removeClass('active').datepicker('hide');
      }
      this.set('selectedContentForSchedule', content);
    },

    /**
     * Open the player with the specific collection/assessment
     *
     * @function actions:playContent
     * @param {string} unitId - Identifier for a unit
     * @param {string} lessonId - Identifier for lesson
     * @param {string} collection - collection or assessment
     */
    playContent: function(unitId, lessonId, collection) {
      let component = this;
      let classId = component.get('classId');
      let courseId = component.get('courseId');
      let collectionId = collection.get('id');
      let collectionType = collection.get('collectionType');
      let url = `${
        window.location.origin
      }/player/class/${classId}/course/${courseId}/unit/${unitId}/lesson/${lessonId}/collection/${collectionId}?role=teacher&type=${collectionType}`;
      if (collection.get('isExternalAssessment')) {
        url = collection.get('url');
      }
      window.open(url);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * Function to triggered once when the component element is first rendered.
   */
  didInsertElement() {
    this.loadData();
    this.openPullUp();
  },

  didRender() {
    let component = this;
    component.$('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
    component.setupDatepicker();
  },

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
      400
    );
  },

  closePullUp() {
    let component = this;
    component.$().animate(
      {
        top: '100%'
      },
      400,
      function() {
        component.set('showPullUp', false);
      }
    );
  },

  loadData() {
    let component = this;
    let courseId = component.get('courseId');
    component.set('isLoading', true);
    component
      .get('courseService')
      .fetchById(courseId)
      .then(course => {
        if (!component.isDestroyed) {
          component.set('course', course);
          component.set('isLoading', false);
        }
      });
  },

  setupDatepicker() {
    let component = this;
    let startDate = moment().toDate();
    let maxNumberOfDays = component.get('maxNumberOfDays');
    let endDate = moment()
      .add(maxNumberOfDays, 'd')
      .toDate();
    component.$('.schedule-dca-datepicker').datepicker({
      startDate: startDate,
      endDate: endDate,
      format: 'yyyy-mm-dd',
      maxViewMode: 0,
      orientation: 'bottom right',
      container: '.teacher-class-dca-course-map-pull-up'
    });
    component
      .$('.schedule-dca-datepicker')
      .off('changeDate')
      .on('changeDate', function() {
        let datepicker = this;
        let scheduleDate = component
          .$(datepicker)
          .datepicker('getFormattedDate')
          .valueOf();
        let classId = component.get('classId');
        let contentType = component.get('selectedContentForSchedule.format');
        let contentId = component.get('selectedContentForSchedule.id');
        let content = component.get('selectedContentForSchedule');
        component
          .$(datepicker)
          .removeClass('active')
          .datepicker('hide');
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
      });
  },

  serializerSearchContent(content, contentId, date) {
    return Ember.Object.create({
      id: contentId,
      added_date: date,
      collection: content,
      isActive: false
    });
  }
});
