import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['student-proficiency-panel'],

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Object}
   * Property to store student profile
   */

  taxonomyService: Ember.inject.service('taxonomy'),

  /**
   * @property {Object}
   * Property to store active subject selected
   */
  studentProfile: null,

  /**
   * @property {Object}
   * Property to store user selected subject info
   */
  selectedSubject: null,

  /**
   * @property {Array}
   * Property to store taxonomy categories
   */
  categories: null,

  /**
   * @property {Array}
   * Property to store competency domains
   */
  competencyMatrixDomains: null,

  /**
   * @property {Object}
   * Property to store user proficiency baseline data
   */
  userProficiencyBaseLine: null,

  /**
   * @property {Array}
   * Property to store taxonomy subjects
   */
  taxonomySubjects: null,

  /**
   * @property {Array}
   * Property to store competency coordinates
   */
  competencyMatrixCoordinates: null,

  /**
   * @property {Object}
   * Property to store tagged subject bucket
   */
  subjectBucket: null,

  /**
   * @property {Array}
   * Property to identify baseline is selected or not
   */
  isSelectBaseLine: null,

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

  selectedCategory: null,

  subjectChange: Ember.observer('activeSubject', function() {
    let component = this;
    let subject = component.get('activeSubject');
    component.sendAction('onSubjectChange', subject);
  }),

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
    onSelectCategory(category) {
      let component = this;
      component.sendAction('onSelectCategory', category);
    },
    /**
     * Action triggered when select a month from chart
     */
    onSelectMonth(date) {
      this.sendAction('onSelectMonth', date);
    },
    onSelectGrade(gradeData) {
      let component = this;
      component.sendAction('onSelectGrade', gradeData);
    },

    goBack() {
      let component = this;
      let isStudent = component.get('isStudent');
      let classId = component.get('class.id');
      let courseId = component.get('course.id');
      if (isStudent) {
        component.get('router').transitionTo('student-locate', {
          queryParams: {
            classId: classId,
            courseId: courseId
          }
        });
      } else {
        component
          .get('router')
          .transitionTo('teacher.class.students-proficiency', classId);
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

    /**
     * Action triggered when select a domain
     */
    onDomainSelect(domain) {
      let component = this;
      component.sendAction('onDomainSelect', domain);
    }
  }
});
