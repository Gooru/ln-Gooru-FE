import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['oca-students-summary-report-pull-up'],

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:api-sdk/analytics
   */
  analyticsService: Ember.inject.service('api-sdk/analytics'),
  /**
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service('api-sdk/class-activity'),

  /**
   * Propery of class id
   * @property {Number}
   */
  classId: null,

  /**
   * Propery of context from parent
   * @property {Object}
   */
  context: null,

  /**
   * Propery of students
   * @property {Array}
   */
  students: Ember.A([]),

  /**
   * Propery of performance activities
   * @property {Array}
   */
  activitiesPerformance: Ember.computed('classActivities', function() {
    let component = this;
    let classActivities = component.get('classActivities');
    let filteredActivites = classActivities.filter(function(activity) {
      return !!activity.collection.performance;
    });
    return filteredActivites;
  }),

  /**
   * Propery of collection
   * @property {Object}
   */
  collection: Ember.computed('context', function() {
    return this.get('context.collection');
  }),

  /**
   * Propery of context observer
   * @property {Observer}
   */
  contextObserver: Ember.observer('context', function() {
    this.loadData();
  }),

  /**
   * @property {Number}
   */
  selectedIndex: Ember.computed('context', function() {
    let component = this;
    let selectedSummary = component.get('context');
    let activitiesPerformance = component.get('activitiesPerformance');
    return activitiesPerformance.indexOf(selectedSummary);
  }),

  /**
   * @property {Boolean}
   */
  isToggleLeft: Ember.computed('context', function() {
    let component = this;
    let selectedIndex = component.get('selectedIndex');
    return selectedIndex > 0;
  }),

  /**
   * @property {Boolean}
   */
  isToggleRight: Ember.computed('context', function() {
    let component = this;
    let selectedIndex = component.get('selectedIndex');
    let length = component.get('activitiesPerformance').length;
    return selectedIndex < length - 1;
  }),

  /**
   * Propery to hide the default pullup.
   * @property {Boolean}
   */
  showPullUp: false,

  /**
   * @property {Boolean}
   */
  isLoading: false,

  /**
   * @property {Object}
   */
  selectedStudent: null,

  /**
   * @property {Boolean}
   */
  isShowStudentActivityReport: false,

  actions: {
    onPullUpClose(closeAll) {
      let component = this;
      component.closePullUp(closeAll);
    },

    pullUpClose(closeAll) {
      let component = this;
      component.set('isShowStudentActivityReport', false);
      component.closePullUp(closeAll);
    },

    onSelectStudent(student) {
      let component = this;
      component.set('isShowStudentActivityReport', true);
      component.set('selectedStudent', student);
    },

    toggle(isLeft) {
      let component = this;
      let currentIndex = component.get('selectedIndex');
      let allSummary = component.get('activitiesPerformance');
      let indexPosition = isLeft ? currentIndex - 1 : currentIndex + 1;
      let summary = allSummary.objectAt(indexPosition);
      if (summary) {
        component.set('context', summary);
      }
    }
  },

  // -------------------------------------------------------------------------
  // Events

  didInsertElement() {
    this.openPullUp();
    this.handleAppContainerScroll();
  },

  didDestroyElement() {
    this.handleAppContainerScroll();
  },

  init() {
    let component = this;
    component._super(...arguments);
    component.loadData();
  },

  /**
   * Function to animate the  pullup from bottom to top
   */
  openPullUp() {
    let component = this;
    component.set('showPullUp', true);
    component.$().animate({
      top: '10%'
    },
    400
    );
  },

  /**
   * Function to animate the  pullup from top to bottom
   */
  closePullUp(closeAll) {
    let component = this;
    component.$().animate({
      top: '100%'
    },
    400,
    function() {
      component.set('showPullUp', false);
      component.sendAction('onClosePullUp', closeAll);
    }
    );
  },

  /**
   * Function to hanle the pullup scroll
   */
  handleAppContainerScroll() {
    let activePullUpCount = Ember.$(document.body).find('.backdrop-pull-ups')
      .length;
    if (activePullUpCount > 0) {
      Ember.$(document.body).addClass('no-vertical-scroll');
    } else if (activePullUpCount === 0) {
      Ember.$(document.body).removeClass('no-vertical-scroll');
    }
  },

  loadData() {
    let component = this;
    const classId = component.get('classId');
    const activityId = component.get('context.id');
    const format = component.get('context.collection.format');
    const collectionType =
      format === 'collection' || format === 'collection-external' ?
        'collection' :
        'assessment';
    const collectionId = component.get('context.collection.id');
    const activityDate = component.get('context.activation_date');
    component.set('isLoading', true);
    return Ember.RSVP.hash({
      usersClassActivity: component
        .get('classActivityService')
        .fetchUsersForClassActivity(classId, activityId),
      studentsPerformance: component
        .get('analyticsService')
        .getDCAPerformance(classId, collectionId, collectionType, activityDate)
    }).then(({
      usersClassActivity,
      studentsPerformance
    }) => {
      if (!component.isDestroyed) {
        component.parseClassMembers(
          usersClassActivity,
          studentsPerformance,
          collectionType
        );
      }
      component.set('isLoading', false);
    });
  },

  parseClassMembers(usersClassActivity, studentsPerformance, collectionType) {
    let component = this;
    let students = Ember.A([]);
    let members = usersClassActivity.filterBy('isActive', true);
    members.forEach(member => {
      let memberId = member.get('id');
      let lastName = member.get('lastName');
      let firstName = member.get('firstName');
      let performance = studentsPerformance.filterBy('user', memberId);
      let student = Ember.Object.create({
        id: memberId,
        firstName: firstName,
        lastName: lastName,
        name: `${lastName} ${firstName}`,
        avatarUrl: member.get('avatarUrl'),
        performance: component.parseCollectionPerformanceData(
          collectionType,
          performance
        )
      });
      students.pushObject(student);
    });
    component.set('students', students);
  },

  parseCollectionPerformanceData(collectionType, collectionPerformance) {
    let performance = collectionPerformance.objectAt(0);
    let isAssessment =
      collectionType === 'assessment' ||
      collectionType === 'assessment-external';
    let collectionPerformanceData = null;
    if (performance) {
      collectionPerformanceData = Ember.Object.create({
        type: collectionType,
        score: isAssessment ? performance.assessment.score : 0,
        timeSpent: isAssessment ?
          performance.assessment.timespent : performance.collection.timeSpent,
        resources: performance.resourceResults
      });
    }
    return collectionPerformanceData;
  }
});
