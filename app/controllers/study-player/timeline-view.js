import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  chronoPerformanceService: Ember.inject.service('api-sdk/chrono-performance'),

  courseId: Ember.computed('course', function() {
    return this.get('course.id');
  }),

  classId: Ember.computed('class', function() {
    return this.get('class.id');
  }),

  timeData: null,

  startDate: null,

  barChartData: null,

  limit: null,

  offset: 0,

  mileStone: Ember.computed(function() {
    return {
      iconClass: 'msaddon',
      offset: {
        left: '-20px'
      }
    };
  }),

  actions: {
    paginateNext() {
      let component = this;
      let offset = component.get('limit') + component.get('offset') + 1;
      component.set('offset', offset);
      component.getStudentPerformance();
    },

    mileStoneHandler: function() {
      this.isSysEvent = 1;
      this.transitionToRoute('study-player');
    }
  },

  getStudentPerformance() {
    const userId = this.get('session.userId');
    let filter = {
      userId: userId,
      courseId: this.get('courseId'),
      classId: this.get('classId'),
      offset: this.get('offset'),
      limit: this.get('limit')
    };
    let studentPerformancePromise = this.get(
      'chronoPerformanceService'
    ).getStudentPerformanceOfAllItemsInClass(filter);

    return Ember.RSVP.hashSettled({
      studentPerformance: studentPerformancePromise
    }).then(hash => {
      if (hash.studentPerformance.state === 'fulfilled') {
        let activities = hash.studentPerformance.value.activities.reverse();
        activities.map((activitiy, index) => {
          this.get('timeData').insertAt(index, activitiy);
        });
      }
    });
  }
});
