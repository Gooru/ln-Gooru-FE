import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['chrono-timeline'],

  // -------------------------------------------------------------------------
  // Dependencies
  session: Ember.inject.service('session'),

  /**
   * @requires {LessonService} Service to retrieve a lesson
   */
  lessonService: Ember.inject.service('api-sdk/lesson'),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {timeData}
   */
  timeData: Ember.A([]),

  /**
   * @property {showCourseReport}
   */
  showCourseReport: null,

  /**
   * @property {showCollectionReport}
   */
  showCollectionReport: null,

  /**
   * @property {studentCourseReportContext}
   */
  studentCourseReportContext: null,

  /**
   * @property {studentCollectionReportContext}
   */
  studentCollectionReportContext: null,

  /**
   * @property {positionToCenter}
   */
  positionToCenter: true,

  /**
   * @property {activities}
   */
  activities: Ember.computed(
    'timeData.[]',
    'timeData.@each.selected',
    function() {
      return this.parseTimelineData();
    }
  ),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    onPaginateNext() {
      this.sendAction('paginateNext');
    },

    onClosePullUp() {
      let component = this;
      component.set('showCourseReport', false);
    },

    onOpenCourseReport() {
      let component = this;
      component.openStudentCourseReport();
    },

    onOpenCollectionReport(collection, collectionType) {
      let component = this;
      component.openStudentCollectionReport(collection, collectionType);
    },

    onSelectCard(activity) {
      let component = this;
      let timeData = component.get('timeData');
      let selectedTimeData = timeData.findBy('selected', true);
      let selectedIndex = component.get('activities').indexOf(activity);
      component.checkPagination(selectedIndex);
      selectedTimeData.set('selected', false);
      activity.set('selected', true);
      component.set('positionToCenter', true);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  init() {
    let component = this;
    component._super(...arguments);
    let timeData = component.get('timeData');
    let numberOfTimeData = timeData.length;
    let lastIndex = numberOfTimeData - 1;
    let selectedTimeData = timeData.objectAt(lastIndex);
    selectedTimeData.set('selected', true);
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function parseTimelineData
   * Method to parse and set timeline data
   */
  parseTimelineData() {
    let component = this;
    let timeData = component.get('timeData');

    let numberOfTimeData = timeData.length;
    if (numberOfTimeData > 0) {
      let selectedTimeData = timeData.findBy('selected', true);
      let selectedIndex = timeData.indexOf(selectedTimeData);
      let leftPosSeq = 1;
      let leftStartIndex = selectedIndex - 4;
      let leftEndIndex = leftStartIndex + 4;

      component.updatePosition(
        timeData,
        leftStartIndex,
        leftEndIndex,
        'left',
        leftPosSeq
      );
      component.updatePosition(timeData, 0, leftStartIndex, 'left', 0);

      let rightPosSeq = 1;
      let rightStartIndex = selectedIndex + 1;
      let rightEndIndex = rightStartIndex + 4;
      component.updatePosition(
        timeData,
        rightStartIndex,
        rightEndIndex,
        'right',
        rightPosSeq
      );
      component.updatePosition(
        timeData,
        rightEndIndex,
        numberOfTimeData,
        'right',
        0
      );
    }
    let activities = Ember.A([]);
    timeData.forEach(data => {
      activities.pushObject(data);
    });
    return activities;
  },

  /**
   * @function checkPagination
   * Method to check and call paginate if condition is satisfied
   */
  checkPagination(selectedIndex) {
    let component = this;
    if (selectedIndex < 4) {
      component.sendAction('paginateNext');
    }
  },

  /**
   * @function openStudentCollectionReport
   * Method to open student collection report
   */
  openStudentCollectionReport(collection, collectionType) {
    let component = this;
    const lessonPromise = component.get('course.id')
      ? component
        .get('lessonService')
        .fetchById(
          component.get('course.id'),
          collection.get('unitId'),
          collection.get('lessonId')
        )
      : null;
    return Ember.RSVP.hashSettled({
      lesson: lessonPromise
    }).then(function(hash) {
      let lesson = hash.lesson.state === 'fulfilled' ? hash.lesson.value : null;
      let params = {
        userId: component.get('session.userId'),
        classId: component.get('class.id'),
        courseId: component.get('course.id'),
        unitId: collection.get('unitId'),
        lessonId: collection.get('lessonId'),
        collectionId: collection.get('id'),
        lesson: lesson,
        type: collectionType,
        isStudent: true,
        isTeacher: false,
        collection
      };
      component.set('studentCollectionReportContext', params);
      component.set('showCollectionReport', true);
    });
  },

  /**
   * @function openStudentCourseReport
   * Method to open student course report
   */
  openStudentCourseReport() {
    let component = this;
    component.set('showCourseReport', true);
    let params = Ember.Object.create({
      userId: component.get('session.userId'),
      classId: component.get('class.id'),
      class: component.get('class'),
      courseId: component.get('course.id'),
      course: component.get('course'),
      isTeacher: false,
      isStudent: true,
      loadUnitsPerformance: true
    });
    component.set('studentCourseReportContext', params);
  },

  /**
   * @function updatePosition
   * Method to update position in timeData
   */
  updatePosition(timeData, startIndex, endIndex, position, positionSeq) {
    for (let index = startIndex; index < endIndex; index++) {
      let data = timeData.objectAt(index);
      let seq = positionSeq === 0 ? positionSeq : positionSeq++;
      if (data) {
        data.set('position', position);
        data.set('positionSeq', seq);
      }
    }
  }
});
