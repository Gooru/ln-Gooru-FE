import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['student-proficiency-panel'],

  // -------------------------------------------------------------------------
  // Dependencies
  taxonomyService: Ember.inject.service('taxonomy'),

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Object}
   * Property to store active subject selected
   */
  activeSubject: null,

  /**
   * @property {Object}
   * Property to store timeLine
   */
  timeLine: null,

  /**
   * @property {Object}
   * Property to store class data
   */
  class: null,

  /**
   * @property {Object}
   * Property to store selected grade
   */
  selectedGrade: null,

  /**
   * @property {Boolean}
   * Property to find is student or not
   */
  isStudent: null,

  /**
   * @property {Array}
   * Property to store taxonomy categories
   */
  categories: null,
  /**
   * @property {Boolean}
   * Property to show matrix chart or not
   */
  isShowMatrixChart: null,

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
  timeSeriesStartDate: Ember.computed.alias('class.startDate'),

  selectedCategory: null,

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

    onToggleBaseline() {
      let component = this;
      component.toggleProperty('isSelectBaseLine');
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
      component.set('isShowTimeSeries', true);
    },
    /**
     * Action triggered when select a subject
     */
    onSelectSubject(subject) {
      let component = this;
      component.set('isSelectBaseLine', false);
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

    /**
     * Action triggered when select a domain
     */
    onDomainSelect(domain) {
      let component = this;
      component.sendAction('onDomainSelect', domain);
    }
  },

  didDestroyElement() {
    let component = this;
    component.set('isSelectBaseLine', false);
  }
});
