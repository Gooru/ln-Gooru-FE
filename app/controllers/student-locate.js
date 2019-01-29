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

  // -------------------------------------------------------------------------
  // Attributes

  queryParams: ['classId', 'courseId'],

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

  domainCompetencyList: null,

  init() {
    let controller = this;
    controller.fetchStudentDetails();
  },

  actions: {
    paginateNext() {
      let controller = this;
      if (!controller.get('noMoreData')) {
        let offset = controller.get('limit') + controller.get('offset') + 1;
        controller.set('offset', offset);
        controller.getStudentPerformance();
      }
    },

    mileStoneHandler: function() {
      let controller = this;
      let classId = controller.get('classId');
      let courseId = controller.get('courseId');
      if (classId) {
        controller.transitionToRoute('student.class.course-map', classId);
      } else {
        controller.transitionToRoute('student.class.course', courseId);
      }
    },

    showPullUp() {
      let controller = this;
      let userId = this.get('session.userId');
      controller.transitionToRoute('student-learner-proficiency', userId);
      // controller.set('isShowProficiencyPullup', true);
    },

    onClosePullUp() {
      this.set('isShowProficiencyPullup', false);
    },

    onSelectCompetency(competency, userId, domainCompetencyList) {
      let controller = this;
      controller.set('selectedCompetency', competency);
      controller.set('domainCompetencyList', domainCompetencyList);
      controller.set('isShowCompetencyContentReport', true);
    }
  },

  /**
   * @function fetchStudentDetails
   * @param userId
   * Method to fetch list of student using given user id
   */
  fetchStudentDetails() {
    let controller = this;
    let userId = controller.get('session.userId');
    return Ember.RSVP.hash({
      studentDetails: Ember.RSVP.resolve(
        controller.get('profileService').readUserProfile(userId)
      )
    }).then(({ studentDetails }) => {
      controller.set('activeStudent', studentDetails);
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
