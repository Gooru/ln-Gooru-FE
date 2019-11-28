import Ember from 'ember';
import {
  CONTENT_TYPES,
  KEY_CODES,
  SCREEN_SIZES
} from 'gooru-web/config/config';
import { isCompatibleVW } from 'gooru-web/utils/utils';

import ConfigurationMixin from 'gooru-web/mixins/configuration';

export default Ember.Component.extend(ConfigurationMixin, {
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
    component.searchHandler();
  },

  actions: {
    onSelectExternalActivity() {
      const component = this;
      component.sendAction('onSelectExternalActivity');
    },

    onSelectContentSource(contentSource) {
      const component = this;
      component.set('activeContentSource', contentSource.get('value'));
      let isShowContentSelector = true;
      let contentSearchTerm = component.get('contentSearchTerm');
      if (contentSource.get('value') === 'tenant-library') {
        isShowContentSelector = false;
        contentSearchTerm = null;
        component.loadTenantLibraries();
      } else if (
        contentSource.get('value') === 'my-content' ||
        contentSource.get('value') === 'gooru-catalog'
      ) {
        component.loadCotents();
      } else {
        contentSearchTerm = null;
        isShowContentSelector = false;
        component.sendAction('onShowLessonPlan');
      }
      component.set('contentSearchTerm', contentSearchTerm);
      component.set('isShowContentSelector', isShowContentSelector);
    },

    onSelectContentType(contentType) {
      const component = this;
      component.set('activeContentType', contentType.get('value'));
      component.loadCotents();
    },

    onClickFilterIcon() {
      const component = this;
      component.toggleProperty('isShowFilter');
    },

    onApplyFilter() {
      const component = this;
      component.loadCotents();
    }
  },

  isShowContentSelector: true,

  isFilterEnabled: Ember.computed.alias(
    'configuration.GRU_FEATURE_FLAG.searchFilter'
  ),

  removedFilterItem: null,

  /**
   * @property {Boolean} isShowListView
   * Property to toggle between list/grid view
   */
  isShowListView: isCompatibleVW(SCREEN_SIZES.MEDIUM),

  /**
   * @property {Number} selectedFiltersLimit
   * Property to hold limit of selected filters to show
   */
  selectedFiltersLimit: Ember.computed('isShowListView', function() {
    return this.get('isShowListView') ? 1 : 2;
  }),

  /**
   * @property {Array} selectedFilters
   */
  selectedFilters: Ember.A([]),

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

  page: 0,

  searchContentLimit: 20,

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
    let queryParams = component.getSearchRequestBody();
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
    let params = {
      page: component.get('page'),
      pageSize: component.get('searchContentLimit')
    };
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
      offset: component.get('page') * component.get('searchContentLimit'),
      pageSize: component.get('searchContentLimit')
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
  },

  searchHandler() {
    let component = this;
    component.$('#search-content').on('keyup', function(e) {
      const contentSearchTerm = component.get('contentSearchTerm');
      if (e.which === KEY_CODES.ENTER && contentSearchTerm.length >= 3) {
        component.loadCotents();
      }
    });

    component.$('.search-icon i.search').click(function() {
      const contentSearchTerm = component.get('contentSearchTerm');
      if (contentSearchTerm.length >= 3) {
        component.loadCotents();
      }
    });
  },

  getSearchRequestBody() {
    let component = this;
    let params = {
      taxonomies: null,
      page: component.get('page'),
      pageSize: component.get('searchContentLimit')
    };
    let filters = component.filterBuilder();
    let searchTerm = component.get('contentSearchTerm');
    const activeContentSource = component.get('activeContentSource');
    if (activeContentSource === 'my-content') {
      filters.scopeKey = 'my-content';
      filters['flt.publishStatus'] = 'published,unpublished';
    } else if (activeContentSource === 'tenant-library') {
      filters.scopeKey = 'open-library';
      filters.scopeTargetNames = component.get(
        'selectedTenantLibrary.shortName'
      );
      filters['flt.publishStatus'] = 'published,unpublished';
    } else {
      filters.scopeKey = 'open-all';
      filters['flt.publishStatus'] = 'published';
    }
    let subject = component.get('course.subject');
    let competencyData = component.get('competencyData');
    let primaryLanguage = component.get('class.primaryLanguage');
    let gutCode = competencyData ? competencyData.get('competencyCode') : null;
    if (!component.get('selectedFilters').length && !searchTerm) {
      if (subject) {
        filters['flt.subject'] = subject;
      }

      if (gutCode) {
        filters['flt.gutCode'] = gutCode;
      }

      if (primaryLanguage) {
        filters['flt.languageId'] = primaryLanguage;
      }
    }
    params.filters = filters;
    return params;
  },

  filterBuilder() {
    const component = this;
    let filters = {};
    filters['flt.audience'] = component.filterSelectedItems(
      'filter',
      'flt.audience'
    );
    filters['flt.educationalUse'] = component.filterSelectedItems(
      'filter',
      'flt.educational'
    );
    filters['flt.language'] = component.filterSelectedItems(
      'filter',
      'flt.language'
    );
    filters['flt.audience'] = component.filterSelectedItems(
      'filter',
      'flt.audience'
    );
    filters['flt.standard'] = component.filterSelectedItems(
      'filter',
      'flt.standard'
    );
    filters['flt.creator'] = component.get('selectedFilters')['flt.authorName'];
    return filters;
  },

  filterSelectedItems(keyField, keyValue) {
    const component = this;
    let filterList = component
      .get('selectedFilters')
      .filterBy(keyField, keyValue);
    let keyName = keyValue === 'flt.standard' ? 'id' : 'name';
    return component.toArray(filterList, keyName);
  },

  toArray(filterList, key) {
    let params = filterList.map(filter => {
      return filter[key];
    });
    return params.length > 0 ? params.join(',') : null;
  }
});