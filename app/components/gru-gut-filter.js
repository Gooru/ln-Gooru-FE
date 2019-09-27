import Ember from 'ember';
import {
  flattenGutToFwCompetency,
  flattenGutToFwDomain
} from 'gooru-web/utils/taxonomy';

export default Ember.Component.extend({
  classNames: ['filter', 'gru-gut-filter'],

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:taxonomy
   */
  taxonomyService: Ember.inject.service('taxonomy'),

  competencyService: Ember.inject.service('api-sdk/competency'),

  session: Ember.inject.service('session'),

  didInsertElement() {
    const component = this;
    component.loadCategories().then(function(categories) {
      component.reloadGutFilters(categories);
    });
  },

  actions: {
    onSelectCategory(category) {
      const component = this;
      if (component.get('activeCategory.id') !== category.get('id')) {
        component.loadSubjects(category);
        component.updateGutFilters({});
        component.set('activeCategory', category);
        component.set('subjects', Ember.A([]));
        component.set('domains', Ember.A([]));
        component.set('competencies', Ember.A([]));
        component.updateGutFilters('category');
        component.resetProperties(
          Ember.A(['activeSubject', 'activeDomain', 'activeCompetency'])
        );
      }
    },

    onSelectSubject(subject) {
      const component = this;
      if (component.get('activeSubject.id') !== subject.get('id')) {
        component.loadDomainCompetencies(subject);
        component.set('activeSubject', subject);
        component.updateGutFilters('subject', subject.get('code'));
        component.set('domains', Ember.A([]));
        component.set('competencies', Ember.A([]));
        component.resetProperties(
          Ember.A(['activeDomain', 'activeCompetency'])
        );
        let subjectFilterObject = Ember.Object.create({
          type: 'subject',
          filteKey: 'subjectCode',
          value: subject.get('code'),
          displayValue: subject.get('title')
        });
        component.sendAction('onSelectFilterItem', subjectFilterObject);
      }
    },

    onSelectDomain(domain) {
      const component = this;
      if (
        component.get('activeDomain.domainCode') !== domain.get('domainCode')
      ) {
        const domainCompetencies = component.get('domainCompetencies');
        const selectedDomainCompetencies = domainCompetencies.findBy(
          'domainCode',
          domain.domainCode
        );
        component.set(
          'competencies',
          selectedDomainCompetencies
            ? selectedDomainCompetencies.competencies
            : Ember.A([])
        );
        component.set('activeDomain', domain);
        component.updateGutFilters('domain', domain.get('domainCode'));
        component.resetProperties(Ember.A(['activeCompetency']));
        let domainFilterObject = Ember.Object.create({
          type: 'domain',
          filterKey: 'domainCode',
          value: domain.get('domainCode'),
          displayValue: domain.get('domainName')
        });
        component.sendAction('onSelectFilterItem', domainFilterObject);
      }
    },

    onSelectCompetency(competency) {
      const component = this;
      if (
        component.get('activeCompetency.competencyCode') !==
        competency.get('competencyCode')
      ) {
        component.set('activeCompetency', competency);
        component.updateGutFilters(
          'competency',
          competency.get('competencyCode')
        );
        let gutFilterObject = Ember.Object.create({
          type: 'competency',
          value: competency.get('competencyCode'),
          displayValue: competency.get('competencyCode')
        });
        component.sendAction('onSelectFilterItem', gutFilterObject);
      }
    }
  },

  userId: Ember.computed.alias('session.userId'),

  competencies: Ember.A([]),

  activeCategory: null,

  activeSubject: null,

  activeDomain: null,

  activeCompetency: null,

  gutFilters: {
    subjectCode: undefined,
    domainCode: undefined,
    gutCode: undefined
  },

  standardPreference: Ember.computed(function() {
    const component = this;
    return component.get('userPreference.standard_preference') || {};
  }),

  isLoading: false,

  loadCategories() {
    const component = this;
    return component
      .get('taxonomyService')
      .getCategories()
      .then(categories => {
        component.set('categories', categories);
        return categories;
      });
  },

  loadSubjects(category) {
    const component = this;
    const categoryId = category.get('id');
    component.set('isLoading', true);
    return component
      .get('taxonomyService')
      .getTaxonomySubjects(categoryId)
      .then(function(subjects) {
        if (!component.isDestroyed) {
          component.set('subjects', subjects);
          component.set('isLoading', false);
        }
        return subjects;
      });
  },

  loadDomainCompetencies(activeSubject) {
    const component = this;
    const subject = activeSubject || component.get('activeSubject');
    const standardPreference = component.get('standardPreference');
    const frameworkId = standardPreference[subject.get('code')] || null;
    const taxonomyService = component.get('taxonomyService');
    const competencyService = component.get('competencyService');
    const userId = component.get('userId');
    const subjectId = subject.get('id');
    component.set('isLoading', true);
    return Ember.RSVP.hash({
      domainCompetencies: competencyService.getCompetencyMatrixDomain(
        userId,
        subjectId
      ),
      matrixCoordinates: competencyService.getCompetencyMatrixCoordinates(
        subjectId
      ),
      crossWalkFWCompetencies: frameworkId
        ? taxonomyService.fetchCrossWalkFWC(frameworkId, subjectId)
        : Ember.RSVP.resolve(null)
    }).then(
      ({ domainCompetencies, matrixCoordinates, crossWalkFWCompetencies }) => {
        if (!component.isDestroyed) {
          component.set(
            'domains',
            matrixCoordinates.get('domains') || Ember.A([])
          );
          component.set(
            'domainCompetencies',
            domainCompetencies.domains || Ember.A([])
          );
          if (crossWalkFWCompetencies) {
            component.set(
              'fwCompetencies',
              flattenGutToFwCompetency(crossWalkFWCompetencies)
            );
            component.set(
              'fwDomains',
              flattenGutToFwDomain(crossWalkFWCompetencies)
            );
          }
          component.set('isLoading', false);
        }
        return domainCompetencies;
      }
    );
  },

  updateGutFilters(dataKey, value) {
    const component = this;
    let gutFilters = component.get('gutFilters') || {};
    if (dataKey === 'category') {
      gutFilters.subjectCode = undefined;
      gutFilters.domainCode = undefined;
      gutFilters.gutCode = undefined;
    } else if (dataKey === 'subject') {
      gutFilters.subjectCode = value;
      gutFilters.domainCode = undefined;
      gutFilters.gutCode = undefined;
    } else if (dataKey === 'domain') {
      gutFilters.domainCode = value;
      gutFilters.gutCode = undefined;
    } else if (dataKey === 'competency') {
      gutFilters.gutCode = value;
    }
    component.set('gutFilters', gutFilters);
  },

  resetProperties(properties = Ember.A([])) {
    const component = this;
    properties.map(property => {
      if (!component.isDestroyed) {
        component.set(`${property}`, null);
      }
    });
  },

  reloadGutFilters(categories) {
    const component = this;
    const appliedFilters = component.get('appliedFilters');
    const filterSubjectCode = appliedFilters.subjectCode;
    const filterDomainCode = appliedFilters.domainCode;
    const filterGutCode = appliedFilters.gutCode;
    if (filterSubjectCode) {
      const activeCategory = categories.findBy(
        'code',
        filterSubjectCode.split('.')[0]
      );
      component.set('activeCategory', activeCategory);
      component.loadSubjects(activeCategory).then(function(subjects) {
        const activeSubject = subjects.findBy('code', filterSubjectCode);
        component.set('activeSubject', activeSubject);
        if (filterDomainCode) {
          component
            .loadDomainCompetencies(activeSubject, filterDomainCode)
            .then(function(domainCompetencies) {
              const activeDomain = domainCompetencies.domains.findBy(
                'domainCode',
                filterDomainCode
              );
              component.set('activeDomain', activeDomain);
              component.set('competencies', activeDomain.get('competencies'));
              if (filterGutCode) {
                const activeCompetency = activeDomain
                  .get('competencies')
                  .findBy('competencyCode', filterGutCode);
                component.set('activeCompetency', activeCompetency);
                component.set(
                  'appliedFilters.gutCode',
                  activeCompetency.get('competencyCode')
                );
              }
            });
        }
      });
    }
  }
});
