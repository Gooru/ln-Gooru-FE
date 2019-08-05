import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['milestone-report', 'student-milestone-performance-report'],

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @type {performanceService} Service to retrieve performance information
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * @type {CourseService} Service to retrieve course information
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @type {rescopeService} Service to retrieve rescope information
   */
  rescopeService: Ember.inject.service('api-sdk/rescope'),

  /**
   * @type {session} Service to retrieve rescope information
   */
  session: Ember.inject.service('session'),

  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyService: Ember.inject.service('api-sdk/taxonomy'),

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    const component = this;
    component.loadMilestonesPerformanceData();
    component.setGradeSubject();
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    //Action triggered when click on a milestone
    onSelectMilestone(milestone, milestoneIndex) {
      const component = this;
      if (!component.isDestroyed) {
        component.set('selectedMilestone', milestone);
        component.set('activeMilestoneIndex', milestoneIndex);
        component.set('isShowMilestoneReport', true);
      }
    }
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {UUID} classId
   */
  classId: Ember.computed.alias('class.id'),

  /**
   * @property {UUID} courseId
   */
  courseId: Ember.computed.alias('class.courseId'),

  /**
   * @property {UUID} userId
   */
  userId: Ember.computed(function() {
    const component = this;
    return component.get('session.userId');
  }),

  /**
   * @property {String} frameworkCode
   */
  frameworkCode: Ember.computed.alias('class.preference.framework'),

  /**
   * @property {String} subject
   */
  subject: Ember.computed.alias('class.preference.subject'),

  /**
   * @property {Array} milestones
   */
  milestones: Ember.A([]),

  /**
   * @property {Number} courseScoreInPercentage
   */
  courseScoreInPercentage: Ember.computed.alias(
    'class.performanceSummary.score'
  ),

  /**
   * @property {Object} rescopedContents
   */
  rescopedContents: null,

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function loadMilestonesPerformanceData
   * Method to load milestones performance data
   */
  loadMilestonesPerformanceData() {
    const component = this;
    return Ember.RSVP
      .hash({
        milestones: component.fetchMilestones(),
        milestonesPerformanceScore: component.fetchMilestonesPerformanceScore(),
        milestonesPerformanceTimespent: component.fetchMilestonesPerformanceTimespent(),
        grades: component.fetchGradesBySubject()
      })
      .then(hash => {
        if (!component.isDestroyed) {
          let milestones = component.filterOutMilestonesBasedOnGrade(
            hash.grades,
            hash.milestones
          );
          component.parseMilestonesPerformance(
            milestones,
            hash.milestonesPerformanceScore,
            hash.milestonesPerformanceTimespent
          );
        }
      });
  },

  /**
   * @function fetchMilestones
   * Method to fetch milestones
   */
  fetchMilestones() {
    const component = this;
    const courseService = component.get('courseService');
    const courseId = component.get('courseId');
    const frameworkCode = component.get('frameworkCode');
    return courseService.getCourseMilestones(courseId, frameworkCode);
  },

  /**
   * @function fetchMilestonesPerformanceScore
   * Method to fetch milestones performance score
   */
  fetchMilestonesPerformanceScore() {
    const component = this;
    const performanceService = component.get('performanceService');
    const classId = component.get('classId');
    const courseId = component.get('courseId');
    const userId = component.get('userId');
    const frameworkCode = component.get('frameworkCode');
    return performanceService.getPerformanceForMilestones(
      classId,
      courseId,
      'assessment',
      userId,
      frameworkCode
    );
  },

  /**
   * @function fetchMilestonesPerformanceTimespent
   * Method to fetch milestones performance timespent
   */
  fetchMilestonesPerformanceTimespent() {
    const component = this;
    const performanceService = component.get('performanceService');
    const classId = component.get('classId');
    const courseId = component.get('courseId');
    const userId = component.get('userId');
    const frameworkCode = component.get('frameworkCode');
    return performanceService.getPerformanceForMilestones(
      classId,
      courseId,
      'collection',
      userId,
      frameworkCode
    );
  },

  /**
   * @function fetchGradesBySubject
   * Method to fetch grades by subject code
   */
  fetchGradesBySubject() {
    const component = this;
    let filters = {
      subject: component.get('subject')
    };
    let fwkCode = component.get('frameworkCode');
    if (fwkCode) {
      filters.fw_code = fwkCode;
    }
    return component.get('taxonomyService').fetchGradesBySubject(filters);
  },

  /**
   * @function setGradeSubject
   * Method to set grade subject object
   */
  setGradeSubject() {
    const component = this;
    const subject = component.get('subject');
    return Ember.RSVP
      .hash({
        gradeSubject: subject
          ? component.get('taxonomyService').fetchSubject(subject)
          : {}
      })
      .then(({ gradeSubject }) => {
        component.set('gradeSubject', gradeSubject);
      });
  },

  /**
   * @function parseMilestonesPerformance
   * Method to parse milestones perforamance data
   */
  parseMilestonesPerformance(
    milestones,
    milestonesPerformanceScore,
    milestonesPerformanceTimespent
  ) {
    const component = this;
    milestones.map(milestone => {
      let milestonePerformanceScore = milestonesPerformanceScore.findBy(
        'milestoneId',
        milestone.get('milestone_id')
      );
      if (milestonePerformanceScore) {
        milestone.set(
          'performance',
          milestonePerformanceScore.get('performance')
        );
      }
      let milestonePerformanceTimespent = milestonesPerformanceTimespent.findBy(
        'milestoneId',
        milestone.get('milestone_id')
      );
      if (milestonePerformanceTimespent) {
        if (milestone.get('performance')) {
          milestone.set(
            'performance.timeSpent',
            milestonePerformanceTimespent.get('performance.timeSpent')
          );
        } else {
          milestone.set(
            'performance',
            Ember.Object.create({
              timeSpent: milestonePerformanceTimespent.get(
                'performance.timeSpent'
              )
            })
          );
        }
      }
    });
    if (!component.isDestroyed) {
      component.set('milestones', milestones);
    }
  },

  /**
   * @function filterOutMilestonesBasedOnGrade
   * Method to filter oute milestones based on the grade boundaries
   */
  filterOutMilestonesBasedOnGrade(grades, milestones) {
    let component = this;
    let gradeBounds = component.get('class.memberGradeBounds');
    const userId = component.get('userId');
    let gradeBound = gradeBounds.findBy(userId);
    let milestoneData = Ember.A([]);
    let studentGradeBound = Ember.Object.create(gradeBound.get(userId));
    let classGradeId = component.get('class.gradeCurrent');
    component.set('studentGradeBound', studentGradeBound);
    component.set('grades', grades);
    let gradeLowerBound = studentGradeBound.get('grade_lower_bound');
    let gradeUpperBound = studentGradeBound.get('grade_upper_bound');
    let startGrade = grades.findBy('id', gradeLowerBound);
    let startGradeIndex = grades.indexOf(startGrade);
    let endGrade = grades.findBy('id', gradeUpperBound);
    let endGradeIndex = grades.indexOf(endGrade);
    let studentGrades = grades.slice(startGradeIndex, endGradeIndex + 1);

    milestones.forEach((milestone, index) => {
      let gradeId = milestone.get('grade_id');
      let grade = studentGrades.findBy('id', gradeId);
      if (grade) {
        if (gradeId === classGradeId) {
          milestone.set('isClassGrade', true);
        }
        milestone.set('milestoneIndex', index + 1);
        milestoneData.pushObject(milestone);
      }
    });
    return milestoneData;
  }
});
