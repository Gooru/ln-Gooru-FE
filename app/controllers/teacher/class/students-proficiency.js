import Ember from 'ember';
import { getSubjectIdFromSubjectBucket } from 'gooru-web/utils/utils';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  classController: Ember.inject.controller('teacher.class'),

  /**
   * @requires competencyService
   */
  competencyService: Ember.inject.service('api-sdk/competency'),

  /**
   * @requires classService
   */
  classService: Ember.inject.service('api-sdk/class'),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    //Action triggered when select a domain
    onSelectDomain(domain) {
      let controller = this;
      controller.set('isShowCourseCompetencyReport', false);
      controller.set('isShowDomainCompetencyReport', true);
      controller.set('activeDomain', domain);
    },

    //Action triggered when click back arrow
    onClickBack() {
      let controller = this;
      controller.set('isShowDomainCompetencyReport', false);
      controller.set('isShowCourseCompetencyReport', true);
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function loadStudentsProficiencyData
   * Method to load students proficiency data
   */
  loadStudentsProficiencyData() {
    let controller = this;
    return Ember.RSVP.hash({
      domainLevelSummary: controller.fetchDomainLevelSummary()
    })
      .then(({ domainLevelSummary}) => {
        controller.set('domainLevelSummary', domainLevelSummary);
      });
  },

  /**
   * @function fetchDomainLevelSummary
   * Method to fetch domain level summary data
   */
  fetchDomainLevelSummary() {
    let controller = this;
    let competencyService = controller.get('competencyService');
    let filters = {
      classId: controller.get('classId'),
      courseId: controller.get('courseId')
    };
    let domainLevelSummaryPromise = Ember.RSVP.resolve(competencyService.getDomainLevelSummary(filters));
    return Ember.RSVP.hash({
      domainLevelSummary: domainLevelSummaryPromise
    })
      .then(({domainLevelSummary}) => {
        controller.set('isDataNotAvailable', false);
        return domainLevelSummary;
      })
      .catch(function() {
        controller.set('isDataNotAvailable', true);
      });
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Class}
   */
  class: Ember.computed.alias('classController.class'),

  /**
   * @property {Course}
   */
  course: Ember.computed.alias('classController.course'),

  /**
   * @property {classMembers}
   */
  classMembers: Ember.computed.alias('classController.members.members'),

  /**
   * @property {classId}
   */
  classId: Ember.computed('class', function() {
    let controller = this;
    return controller.get('class.id');
  }),

  /**
   * @property {courseId}
   */
  courseId: Ember.computed('course', function() {
    let controller = this;
    return controller.get('course.id');
  }),

  /**
   * @property {subjectCode}
   */
  subjectCode: Ember.computed('course', function() {
    let controller = this;
    let course = controller.get('course');
    let subjectBucket = course.get('subject');
    return subjectBucket ? getSubjectIdFromSubjectBucket(subjectBucket) : null;
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
   * @property {Array} domainLevelSummary
   */
  domainLevelSummary: null,

  /**
   * @property {Number} maxCompetencyLength
   */
  maxCompetencyLength: 0,

  /**
   * @property {Boolean} isShowCourseCompetencyReport
   */
  isShowCourseCompetencyReport: true,

  /**
   * @property {Boolean} isShowDomainCompetencyReport
   */
  isShowDomainCompetencyReport: false,

  /**
   * @property {Boolean} isShowCompetencyReport
   */
  isShowCompetencyReport: Ember.computed('course', function() {
    let controller = this;
    let course = controller.get('course');
    let subjectCode = controller.get('subjectCode');
    let classMembers = controller.get('classMembers');
    return course && subjectCode && classMembers.length;
  })
});
