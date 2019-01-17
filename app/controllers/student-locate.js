import Ember from 'ember';
import { ANONYMOUS_COLOR } from 'gooru-web/config/config';

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @type {SessionService} Service to retrieve session information
   */
  session: Ember.inject.service('session'),

  /**
   * @type {ChronoPerformanceService} Service to retrieve performance information
   */
  chronoPerformanceService: Ember.inject.service('api-sdk/chrono-performance'),

  /**
   * @type {ProfileService} Service to retrieve profile information
   */
  profileService: Ember.inject.service('api-sdk/profile'),

  activityStartDate: Ember.computed('studentActivities', function() {
    return this.get('studentActivities.activityStartDate');
  }),

  activities: Ember.computed('studentActivities', function() {
    return this.get('studentActivities.activities');
  }),

  performanceSummary: Ember.computed('class', function() {
    return this.get('class.performanceSummary');
  }),

  barChartData: Ember.computed('class', function() {
    const completed = this.get('class.performanceSummary.totalCompleted');
    const total = this.get('class.performanceSummary.total');
    const percentage = completed ? (completed / total) * 100 : 0;
    return [
      {
        color: ANONYMOUS_COLOR,
        percentage
      }
    ];
  }),

  performancePercentage: Ember.computed('barChartData', function() {
    let data = this.get('barChartData').objectAt(0);
    return data.percentage.toFixed(0);
  }),

  mileStone: Ember.computed(function() {
    return {
      iconClass: 'msaddon',
      offset: {
        left: '-20px'
      }
    };
  }),

  /**
   * @property {limit}
   */
  limit: 15,
  /**
   * @property {offset}
   */
  offset: 0,

  /**
   * @property {ShowProficiencyPullup}
   */
  isShowProficiencyPullup: false,

  /**
   * @property {showPullUp}
   */
  showPullUp: false,

  /**
   * @property {activeStudent}
   */
  activeStudent: null,

  /**
   * @property {noMoreData}
   */
  noMoreData: false,

  /**
   * @property {String}
   * Property to store course subject bucket or K12.MA will be default
   */
  subjectBucket: Ember.computed('course', function() {
    let controller = this;
    return controller.get('course.subject') || null;
  }),

  init() {
    let component = this;
    component.fetchStudentDetails();
  },

  actions: {
    paginateNext() {
      let component = this;
      if (!component.get('noMoreData')) {
        let offset = component.get('limit') + component.get('offset') + 1;
        component.set('offset', offset);
        component.getStudentPerformance();
      }
    },

    mileStoneHandler: function() {
      window.history.back();
    },

    showPullUp() {
      let component = this;
      component.set('isShowProficiencyPullup', true);
    },

    onClosePullUp() {
      this.set('isShowProficiencyPullup', false);
    },

    onSelectCompetency(competency) {
      let controller = this;
      controller.set('selectedCompetency', competency);
      controller.set('isShowCompetencyContentReport', true);
    }
  },

  /**
   * @function fetchStudentDetails
   * @param userId
   * Method to fetch list of student using given user id
   */
  fetchStudentDetails() {
    let component = this;
    let userId = component.get('session.userId');
    return Ember.RSVP.hash({
      studentDetails: Ember.RSVP.resolve(
        component.get('profileService').readUserProfile(userId)
      )
    }).then(({ studentDetails }) => {
      component.set('activeStudent', studentDetails);
    });
  },

  /**
   * @function getStudentPerformance
   * Method to get active student performance details
   */
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
        let noMoreData = activities.length < this.get('limit');
        this.set('noMoreData', noMoreData);
        activities.map((activitiy, index) => {
          this.get('activities').insertAt(index, activitiy);
        });
      }
    });
  }
});
