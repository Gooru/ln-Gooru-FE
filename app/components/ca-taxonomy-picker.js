import Ember from 'ember';
import {TAXONOMY_CATEGORIES} from 'gooru-web/config/config';
import {getSubjectIdFromSubjectBucket} from 'gooru-web/utils/utils';

export default Ember.Component.extend({

  classNames: ['ca-taxonomy-picker'],


  taxonomyService: Ember.inject.service('api-sdk/taxonomy'),

  didInsertElement() {
    const component = this;
    component.loadData();
  },

  actions: {
    onExpandSubject(subject, subjectSeq) {
      const component = this;
      component.set('activeSubject', subject);
      component.$(`.subject-${subjectSeq}`).toggle(1000);
    },

    onSelectItem(item, type) {
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
        component.set('taxonomyDomains', Ember.A([]));
        component.set('taxonomies', Ember.A([]));
      } else if (type === 'domain') {
        let frameworkId = component.get('frameworkPreference');
        let subjectId = component.get('subjectPreference');
        let courseId = component.get('activeCourse.id');
        let domainId = item.id;
        component.set('activeDomain', item);
        component.fetchCompetencies(frameworkId, subjectId, courseId, domainId);
      } else if (type === 'taxonomy') {
        let selectedTaxonomies = component.get('selectedTaxonomies');
        selectedTaxonomies.push(item);
        component.set('selectedTaxonomies', selectedTaxonomies);
      }
    }
  },

  subjectPreference: Ember.computed('classPreference.subject', function() {
    let component = this;
    let subjectId = component.get('classPreference.subject');
    let frameworkId = component.get('frameworkPreference');
    return frameworkId + '.' + subjectId;
  }),

  categoryPreference: Ember.computed('classPreference.subject', function() {
    const component = this;
    let subjectPreference = component.get('classPreference.subject');
    let categoryPreference = subjectPreference.split('.');
    let categoryAPIcode = categoryPreference.length > 1 ? categoryPreference.objectAt(0) : null;
    let categoryInfo = categoryAPIcode ? TAXONOMY_CATEGORIES.findBy('apiCode', categoryAPIcode) : null;
    return categoryInfo ? categoryInfo.value : null;
  }),

  frameworkPreference: Ember.computed.alias('classPreference.framework'),

  selectedTaxonomies: Ember.A([]),

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

  fetchSubjects(category) {
    const component = this;
    const taxonomyService = component.get('taxonomyService');
    return Ember.RSVP.hash({
      subjects: Ember.RSVP.resolve(taxonomyService.fetchSubjects(category))
    })
      .then(({subjects}) => {
        console.log('subjects', subjects);
        return subjects;
      });
  },

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

  fetchDomains(frameworkId, subjectId, courseId) {
    const component = this;
    console.log('frameworkId in domains', frameworkId);
    const taxonomyService = component.get('taxonomyService');
    return Ember.RSVP.hash({
      domains: Ember.RSVP.resolve(taxonomyService.fetchDomains(frameworkId, subjectId, courseId))
    })
      .then(({domains}) => {
        console.log('domains', domains);
        component.set('taxonomyDomains', domains);
      });
  },

  fetchCompetencies(frameworkId, subjectId, courseId, domainId) {
    const component = this;
    const taxonomyService = component.get('taxonomyService');
    return Ember.RSVP.hash({
      competencies: Ember.RSVP.resolve(taxonomyService.fetchCodes(frameworkId, subjectId, courseId, domainId))
    })
      .then(({competencies}) => {
        console.log('competencies', competencies);
        component.set('taxonomies', competencies);
      });
  }
});
