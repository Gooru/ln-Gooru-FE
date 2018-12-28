import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

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

  userId: Ember.computed.alias('session.userId'),

  timeData: null,

  startDate: null,

  barChartData: null,

  limit: null,

  offset: 0,
  isStudent: false,

  showPullUp: false,

  activeSubject: null,
  activeStudent: null,

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
  /**
   * @property {JSON}
   * Property to store currently selected month and year
   */
  timeLine: Ember.computed(function() {
    let curDate = new Date();
    return {
      month: curDate.getMonth() + 1,
      year: curDate.getFullYear()
    };
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
      console.log("pullllluppp");
      component.set('showPullUp', true);
    },
    onClosePullUp() {
      this.set('isShowProficiencyPullup', false);
    },
    onSelectCompetency(competency) {
      let controller = this;
      console.log("competency", competency);
      controller.set('selectedCompetency', competency);
      controller.set('isShowCompetencyContentReport', true);
    },
  },
  /**
   * @function fetchSubjectsByCategory
   * @param category
   * Method to fetch list of student using category
   */
  fetchSubjectsByCategory(category) {
    let component = this;
    component
      .get('taxonomyService')
      .getTaxonomySubjects(category.value)
      .then(subjects => {
        let subject = component.getActiveSubject(subjects);
        component.set('taxonomySubjects', subjects);
        component.set('activeSubject', subject);
      });
  },
  /**
   * @function fetchStudentDetails
   * @param userId
   * Method to fetch list of student using given user id
   */
  fetchStudentDetails() {
    let component = this;
    let userId = component.get('userId');
    component.set('isStudent', true);
    return Ember.RSVP.hash({
      studentDetails: Ember.RSVP.resolve(
        component
        .get('profileService')
        .readUserProfile(userId)
      )
    }).then(({
      studentDetails
    }) => {
      component.set('activeStudent', studentDetails);
      console.log("studentDetails", studentDetails);
    });
  },
  /**
   * @function getActiveSubject
   * Method to get active subject by using subject bucket
   */
  getActiveSubject(subjects) {
    let component = this;
    let activeSubject = subjects.objectAt(1);
    let subjectBucket = component.get('subjectBucket');
    subjects.map(subject => {
      if (subjectBucket.split(subject.id).length > 1) {
        activeSubject = subject;
      }
    });
    return activeSubject;
  },
  /**
   * @function getStudentPerformance
   * Method to get active student details
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
