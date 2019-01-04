import Ember from 'ember';

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

  /**
   * @property {courseId}
   */
  courseId: Ember.computed('course', function() {
    return this.get('course.id');
  }),

  /**
   * @property {classId}
   */
  classId: Ember.computed('class', function() {
    return this.get('class.id');
  }),

  /**
   * @property {userId}
   */
  userId: Ember.computed.alias('session.userId'),

  /**
   * @property {timelineData}
   */
  timeData: null,

  /**
   * @property {startDate}
   */
  startDate: null,

  /**
   * @property {barChartData}
   */
  barChartData: null,

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
   * @property {activeStudent}
   */
  activeStudent: null,

  /**
   * @property {mileStone}
   */
  mileStone: Ember.computed(function() {
    return {
      iconClass: 'msaddon',
      offset: {
        left: '-20px'
      }
    };
  }),

  /**
   * @property {String}
   * Property to store course subject bucket or K12.MA will be default
   */
  subjectBucket: Ember.computed('course', function() {
    let controller = this;
    return controller.get('course.subject') || 'K12.MA';
  }),

  init() {
    let component = this;
    component.fetchStudentDetails();
  },

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
    let userId = component.get('userId');
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
        activities.map((activitiy, index) => {
          this.get('timeData').insertAt(index, activitiy);
        });
      }
    });
  }
});
