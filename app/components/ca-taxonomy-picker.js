import Ember from 'ember';
import {TAXONOMY_CATEGORIES} from 'gooru-web/config/config';
import {getSubjectIdFromSubjectBucket} from 'gooru-web/utils/utils';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['ca-taxonomy-picker'],


  // -------------------------------------------------------------------------
  // Dependencies
  taxonomyService: Ember.inject.service('api-sdk/taxonomy'),

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    const component = this;
    component.loadData();
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    //Action triggered when expand subject
    onExpandSubject(subject, subjectSeq) {
      const component = this;
      component.set('activeSubject', subject);
      component.$(`.subject-${subjectSeq}`).toggle(1000);
    },

    //Action triggered when select a hirarchy level
    onSelectItem(item, type, sequence) {
      const component = this;
      if (type === 'framework') {
        let frameworkId = item.frameworkId;
        let subjectId = item.id;
        component.set('activeFramework', item);
        component.fetchCourses(frameworkId, subjectId);
        component.set('taxonomyCourses', Ember.A([]));
        component.set('taxonomyDomains', Ember.A([]));
        component.set('taxonomies', Ember.A([]));
      } else if (type === 'course') {
        let frameworkId = component.get('frameworkPreference');
        let subjectId = component.get('subjectPreference');
        let courseId = item.id;
        component.set('activeCourse', item);
        component.fetchDomains(frameworkId, subjectId, courseId);
        component.$('.domains-container').show(1000);
        component.$('.taxonomies-container').hide(1000);
        component.set('taxonomyDomains', Ember.A([]));
        component.set('taxonomies', Ember.A([]));
      } else if (type === 'domain') {
        let frameworkId = component.get('frameworkPreference');
        let subjectId = component.get('subjectPreference');
        let courseId = component.get('activeCourse.id');
        let domainId = item.id;
        component.set('activeDomain', item);
        component.fetchCompetencies(frameworkId, subjectId, courseId, domainId);
        component.$('.courses-container').hide(1000);
        component.$('.taxonomies-container').show(1000);
      } else if (type === 'taxonomy') {
        const taxonomyCard = component.$(`.taxonomy-card-${sequence}`);
        component.$(taxonomyCard).toggleClass('active-card');
        item.frameworkCode = component.get('frameworkPreference');
        component.sendAction('onSelectCompetency', item);
      }
    },

    //Action triggered when submit selected competencies
    onSubmitCompetencies() {
      const component = this;
      component.sendAction('onSubmitCompetencies');
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {String} subjectPreference
   */
  subjectPreference: Ember.computed('classPreference.subject', function() {
    let component = this;
    let subjectId = component.get('classPreference.subject');
    let frameworkId = component.get('frameworkPreference');
    return `${frameworkId  }.${  subjectId}`;
  }),

  /**
   * @property {String} categoryPreference
   */
  categoryPreference: Ember.computed('classPreference.subject', function() {
    const component = this;
    let subjectPreference = component.get('classPreference.subject');
    let categoryPreference = subjectPreference.split('.');
    let categoryAPIcode = categoryPreference.length > 1 ? categoryPreference.objectAt(0) : null;
    let categoryInfo = categoryAPIcode ? TAXONOMY_CATEGORIES.findBy('apiCode', categoryAPIcode) : null;
    return categoryInfo ? categoryInfo.value : null;
  }),

  /**
   * @property {String} frameworkPreference
   */
  frameworkPreference: Ember.computed.alias('classPreference.framework'),


  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function loadData
   * Method to load initial data
   */
  loadData() {
    const component = this;
    let category = component.get('categoryPreference');
    component.fetchSubjects(category).then(function(subjects) {
      component.set('taxonomySubjects', subjects);
      let subjectPreference = component.get('subjectPreference');
      let frameworkPreference = component.get('frameworkPreference');
      component.set('activeSubject', subjects.findBy('code', getSubjectIdFromSubjectBucket(subjectPreference)));
      component.fetchCourses(frameworkPreference, subjectPreference);
    });
  },

  /**
   * @function fetchSubjects
   * Method to fetch subjects
   */
  fetchSubjects(category) {
    const component = this;
    const taxonomyService = component.get('taxonomyService');
    return Ember.RSVP.hash({
      subjects: Ember.RSVP.resolve(taxonomyService.fetchSubjects(category))
    })
      .then(({subjects}) => {
        return subjects;
      });
  },

  /**
   * @function fetchCourses
   * Method to fetch courses
   */
  fetchCourses(frameworkId, subjectId) {
    const component = this;
    const taxonomyService = component.get('taxonomyService');
    return Ember.RSVP.hash({
      courses: Ember.RSVP.resolve(taxonomyService.fetchCourses(frameworkId, subjectId))
    })
      .then(({courses}) => {
        component.set('taxonomyCourses', courses);
      });
  },

  /**
   * @function fetchDomains
   * Method to fetch domains
   */
  fetchDomains(frameworkId, subjectId, courseId) {
    const component = this;
    const taxonomyService = component.get('taxonomyService');
    return Ember.RSVP.hash({
      domains: Ember.RSVP.resolve(taxonomyService.fetchDomains(frameworkId, subjectId, courseId))
    })
      .then(({domains}) => {
        component.set('taxonomyDomains', domains);
      });
  },

  /**
   * @function fetchCompetencies
   * Method to fetch competencies
   */
  fetchCompetencies(frameworkId, subjectId, courseId, domainId) {
    const component = this;
    const taxonomyService = component.get('taxonomyService');
    return Ember.RSVP.hash({
      competencies: Ember.RSVP.resolve(taxonomyService.fetchCodes(frameworkId, subjectId, courseId, domainId))
    })
      .then(({competencies}) => {
        component.set('taxonomies', competencies);
      });
  }
});
