import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['student-proficiency-panel'],

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyService: Ember.inject.service('taxonomy'),

  /**
   * @property {Object}
   * Property to store student profile
   */
  studentProfile: null,

  /**
   * @property {Array}
   * Property to store taxonomy categories
   */
  categories: null,

  /**
   * @property {Boolean} isShowTimeSeries
   */
  isShowTimeSeries: false,

  /**
   * @property {Date} timeSeriesStartDate
   */
  timeSeriesStartDate: null,

  /**
   * @property {Boolean} isShowMatrixChart
   */
  isShowMatrixChart: false,

  /**
   * @property {Date}
   * Property to store course started date or one year before date
   */
  courseStartDate: Ember.computed('course', function() {
    let component = this;
    let course = component.get('course');
    let courseCreatedDate = new Date();
    if (course && course.createdDate) {
      courseCreatedDate = new Date(course.createdDate);
    } else {
      let curMonth = courseCreatedDate.getMonth();
      let curYear = courseCreatedDate.getFullYear();
      let oneYearBeforeFromCurrentDate = courseCreatedDate;
      courseCreatedDate = new Date(
        oneYearBeforeFromCurrentDate.setMonth(curMonth - 11)
      );
      courseCreatedDate = new Date(
        oneYearBeforeFromCurrentDate.setFullYear(curYear - 1)
      );
    }
    return courseCreatedDate;
  }),

  actions: {
    /**
     * Action triggered when select a month from chart
     */
    onSelectMonth(date) {
      this.sendAction('onSelectMonth', date);
    },

    goBack() {
      let component = this;
      let isTeacher = component.get('isTeacher');
      let classId = component.get('class.id');
      let courseId = component.get('course.id');
      if (isTeacher) {
        component
          .get('router')
          .transitionTo('teacher.class.students-proficiency', classId);
      } else {
        component.get('router').transitionTo('student-locate', {
          queryParams: {
            classId: classId,
            courseId: courseId
          }
        });
      }
    },

    /**
     * Action triggered at once the baseline is drawn
     */
    onShownBaseLine(createdDate) {
      let component = this;
      component.set(
        'timeSeriesStartDate',
        createdDate ? new Date(createdDate) : component.get('courseStartDate')
      );
      component.set('isShowTimeSeries', true);
    },
    /**
     * Action triggered when select a subject
     */
    onSelectSubject(subject) {
      let component = this;
      component.set('activeSubject', subject);
      component.sendAction('onSubjectChange', subject);
    },

    /**
     * Action triggered when select a competency
     */
    onSelectCompetency(competency, domainCompetencyList) {
      let component = this;
      component.sendAction(
        'onSelectCompetency',
        competency,
        domainCompetencyList
      );
    },

    onDomainSelect(domain) {
      let component = this;
      component.sendAction('onDomainSelect', domain);
    }
  }
});