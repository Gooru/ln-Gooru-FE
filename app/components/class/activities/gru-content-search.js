import Ember from 'ember';
import { CONTENT_TYPES } from 'gooru-web/config/config';

export default Ember.Component.extend({
  classNames: ['class-activities', 'gru-content-search'],

  /**
   * @requires service:api-sdk/search
   */
  searchService: Ember.inject.service('api-sdk/search'),

  /**
   * @type {ProfileService} Profile service object
   */
  profileService: Ember.inject.service('api-sdk/profile'),

  /**
   * @type {libraryService} Library service object
   */
  libraryService: Ember.inject.service('api-sdk/library'),

  session: Ember.inject.service('session'),

  didInsertElement() {
    const component = this;
    component.loadCotents();
  },

  actions: {
    onSelectExternalActivity() {
      const component = this;
      component.sendAction('onSelectExternalActivity');
    },

    onSelectContentSource(contentSource) {
      const component = this;
      component.set('activeContentSource', contentSource.get('value'));
      if (contentSource.get('value') === 'tenant-library') {
        component.loadTenantLibraries();
      } else if (
        contentSource.get('value') === 'my-content' ||
        contentSource.get('value') === 'gooru-catalog'
      ) {
        component.loadCotents();
      } else {
        component.sendAction('onShowLessonPlan');
      }
    },

    onSelectContentType(contentType) {
      const component = this;
      component.set('activeContentType', contentType.get('value'));
      component.loadCotents();
    }
  },

  contentSearchTerm: '',

  activeContentType: 'collection',

  activeContentSource: 'gooru-catalog',

  contentTypes: Ember.computed(function() {
    return Ember.A([
      Ember.Object.create({
        label: 'Collection',
        value: CONTENT_TYPES.COLLECTION
      }),
      Ember.Object.create({
        label: 'Assessment',
        value: CONTENT_TYPES.ASSESSMENT
      }),
      Ember.Object.create({
        label: 'Offline Activity',
        value: CONTENT_TYPES.OFFLINE_ACTIVITY
      })
    ]);
  }),

  contentSources: Ember.computed(function() {
    return Ember.A([
      Ember.Object.create({
        label: 'Lesson Plan',
        value: 'lesson-plan'
      }),
      Ember.Object.create({
        label: 'My Content',
        value: 'my-content'
      }),
      Ember.Object.create({
        label: 'Tenant Library',
        value: 'tenant-library'
      }),
      Ember.Object.create({
        label: 'Gooru Catalog',
        value: 'gooru-catalog'
      })
    ]);
  }),

  observeLibraryChange: Ember.observer('activeTenantLibrary', function() {
    const component = this;
    component.fetchLibraryContentByType().then(function(libraryContents) {
      component.sendAction('onShowFilteredContents', libraryContents);
    });
  }),

  loadCotents() {
    const component = this;
    const activeContentSource = component.get('activeContentSource');
    const filteredContentPromise =
      activeContentSource === 'gooru-catalog'
        ? component.fetchCatalogContentByType()
        : component.fetchMyContentByType();
    Ember.RSVP.hash({
      filteredContentList: filteredContentPromise
    }).then(({ filteredContentList }) => {
      component.sendAction('onShowFilteredContents', filteredContentList);
    });
  },

  loadTenantLibraries() {
    const component = this;
    component
      .get('libraryService')
      .fetchLibraries()
      .then(tenantLibraries => {
        component.sendAction('onShowTenantLibraries', tenantLibraries);
      });
  },

  fetchCatalogContentByType() {
    let component = this;
    let activeContentType = component.get('activeContentType');
    let queryParams = {};
    let term = component.getSearchTerm();
    if (activeContentType === CONTENT_TYPES.COLLECTION) {
      return component
        .get('searchService')
        .searchCollections(term, queryParams);
    } else if (activeContentType === CONTENT_TYPES.ASSESSMENT) {
      return component
        .get('searchService')
        .searchAssessments(term, queryParams);
    } else {
      return component
        .get('searchService')
        .searchOfflineActivity(term, queryParams);
    }
  },

  fetchMyContentByType() {
    let component = this;
    let userId = component.get('session.userId');
    let activeContentType = component.get('activeContentType');
    let params = {};
    let term = component.getSearchTerm();
    if (term) {
      params.searchText = term;
    }
    if (activeContentType === CONTENT_TYPES.COLLECTION) {
      return component.get('profileService').readCollections(userId, params);
    } else if (activeContentType === CONTENT_TYPES.ASSESSMENT) {
      return component.get('profileService').readAssessments(userId, params);
    } else {
      return component
        .get('profileService')
        .readOfflineActivities(userId, params);
    }
  },

  fetchLibraryContentByType() {
    const component = this;
    const activeContentType = component.get('activeContentType');
    const activeTenantLibraryId = component.get('activeTenantLibrary.id');
    const pagination = {
      offset: 0,
      pageSize: 10
    };
    return Ember.RSVP.hash({
      libraryData: component
        .get('libraryService')
        .fetchLibraryContent(
          activeTenantLibraryId,
          activeContentType,
          pagination
        )
    }).then(({ libraryData }) => {
      const libraryContents = libraryData.get('libraryContent');
      const contents =
        activeContentType === 'assessment'
          ? libraryContents.get('assessments')
          : activeContentType === 'collection'
            ? libraryContents.get('collections')
            : libraryContents.get('offline_activities');
      return contents;
    });
  },

  getSearchTerm() {
    const component = this;
    const contentSearchTerm = component.get('contentSearchTerm');
    return contentSearchTerm !== '' ? contentSearchTerm : '*';
  }
});
