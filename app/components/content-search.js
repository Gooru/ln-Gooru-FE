import Ember from 'ember';
import {
  SCREEN_SIZES
} from 'gooru-web/config/config';
import {
  isCompatibleVW
} from 'gooru-web/utils/utils';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content-search'],

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),
  /**
   * @type {libraryService} Library service object
   */
  libraryService: Ember.inject.service('api-sdk/library'),
  /**
   * @requires service:api-sdk/search
   */
  searchService: Ember.inject.service('api-sdk/search'),


  filterByList: Ember.A([]),

  activeContentType: 'course',

  library: null,

  isLoading: false,

  /**
   * Maintains the current page number of search
   * @type {Number}
   */
  page: 0,

  /**
   * Maintains the value of default search page size.
   * @type {Number}
   */
  defaultSearchPageSize: 20,

  /**
   * @property {Object} unCheckedItems
   * Property to hold unCheckedItems of taxonomy standards
   */
  unCheckedItem: null,

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
    return this.get('isShowListView') ? 1 : 5;
  }),

  /**
   * @property {Observe} onSelectFilter
   */
  onSelectFilter: Ember.observer('selectedFilters.[]', function() {
    let controller = this;
    let selectedFilters = controller.get('selectedFilters');
    let selectedFiltersLimit = controller.get('selectedFiltersLimit');
    if (selectedFilters.length < selectedFiltersLimit) {
      controller.set('filters', selectedFilters);
    } else {
      controller.set('filters', selectedFilters.slice(0, selectedFiltersLimit));
      controller.set(
        'moreFilters',
        selectedFilters.slice(selectedFiltersLimit, selectedFilters.length)
      );
    }
  }),

  isShow: false,

  /**
   * Maintains the state of more data exists or not
   * @type {Boolean}
   */
  isMoreDataExists: false,

  /**
   * @property {Array} selectedFilters
   */
  selectedFilters: Ember.A([]),

  init() {
    let controller = this;
    controller._super(...arguments);
    controller.loadFilters();
    controller.fetchContent();
  },

  didRender() {
    let controller = this;
    controller.initializePopover();
  },

  actions: {
    /**
     * Action get triggered when filter button is clicked
     */
    toggleSearchFilter() {
      let controller = this;
      controller.toggleProperty('isShow');
    },
    /**
     * Action get triggered when clear button is clicked
     */
    clearFilter(item) {
      const controller = this;
      if (item.get('filter') === 'flt.standard') {
        controller.set('unCheckedItem', item);
      }
      controller.get('selectedFilters').removeObject(item);
      controller.send('doSearch');
    },
    /**
     * Action get triggered when search button is clicked
     */
    doSearch() {
      const controller = this;
      controller.fetchContent();
    },
    onSelectFilterBy(item) {
      const controller = this;
      controller.set('searchResults', []);
      controller.set('activeContentType', item.get('type'));
      controller.fetchContent();
    },

    openContentPlayer: function(collection) {
      this.transitionToRoute('player', collection.id, {
        queryParams: {
          type: collection.get('collectionType')
        }
      });
    },

    //Action triggered when click preview button
    onPreviewContent(previewContent, previewContentType) {
      const controller = this;
      controller.set('previewContent', previewContent);
      controller.set('previewContentType', previewContentType);
      controller.set('isShowContentPreview', true);
    }
  },

  initializePopover() {
    let controller = this;
    controller.$('.more-pointer').popover({
      html: true,
      trigger: 'click',
      animation: true,
      placement: 'auto',
      content: () => {
        return Ember.$('.more-filters').html();
      }
    });

    controller.$(document).click(function(event) {
      if (event.target.className !== 'more-pointer') {
        if (controller.$('.more-pointer')) {
          controller.$('.more-pointer').popover('hide');
        }
      }
    });
  },

  loadFilters() {
    const controller = this;
    controller.set('filterByList', controller.getFilters());
  },


  getFilters() {
    const controller = this;
    return Ember.A([Ember.Object.create({
      label: controller.get('i18n').t('search-filter.courses').string,
      type: 'course'
    }),
    Ember.Object.create({
      label: controller.get('i18n').t('search-filter.collections').string,
      type: 'collection'
    }),
    Ember.Object.create({
      label: controller.get('i18n').t('search-filter.assessments').string,
      type: 'assessment'
    }),
    Ember.Object.create({
      label: controller.get('i18n').t('search-filter.resources').string,
      type: 'resource'
    })
    ]);
  },

  fetchContent() {
    const controller = this;
    controller.toggleProperty('isLoading');
    controller.set('page', 0);
    controller.set('isMoreDataExists', false);
    Ember.RSVP
      .hash({
        searchResults: controller.getSearchService()
      })
      .then(({
        searchResults
      }) => {
        if (!controller.isDestroyed) {
          controller.toggleProperty('isLoading');
          controller.set('searchResults', searchResults);
          if (
            searchResults &&
            searchResults.length === controller.get('defaultSearchPageSize')
          ) {
            controller.set('isMoreDataExists', true);
          }
        }
      });
  },

  loadMoreData() {
    let controller = this;
    controller.set('isLoading', true);
    let page = controller.get('page') + 1;
    controller.set('page', page);
    Ember.RSVP
      .hash({
        searchResults: controller.getSearchService()
      })
      .then(({
        searchResults
      }) => {
        if (!controller.isDestroyed) {
          controller.set('isLoading', false);
          let searchResult = controller.get('searchResults');
          controller.set('searchResults', searchResult.concat(searchResults));
          if (
            searchResults &&
            searchResults.length === controller.get('defaultSearchPageSize')
          ) {
            controller.set('isMoreDataExists', true);
          }
        }
      });
  },

  getSearchService() {
    let controller = this;
    let activeContentType = controller.get('activeContentType');
    let params = controller.getSearchParams();
    let term = controller.getSearchTerm() ? controller.getSearchTerm() : '*';
    if (activeContentType === 'collection') {
      return controller.get('searchService').searchCollections(term, params);
    } else if (activeContentType === 'assessment') {
      return controller.get('searchService').searchAssessments(term, params);
    } else if (activeContentType === 'course') {
      return controller.get('searchService').searchCourses(term, params);
    } else if (activeContentType === 'resource') {
      return controller.get('searchService').searchResources(term, params);
    }
  },

  getSearchTerm() {
    let controller = this;
    return controller.get('tempTerm');
  },

  getSearchParams() {
    let controller = this;
    let params = {
      page: controller.get('page'),
      pageSize: controller.get('defaultSearchPageSize')
    };
    let filters = controller.filterBuilder();
    if (controller.get('library')) {
      filters.scopeKey = 'open-library';
      filters.scopeTargetNames = controller.get('library.shortName');
    } else {
      filters.scopeKey = 'my-content';
    }
    filters['flt.publishStatus'] = 'published,unpublished';
    params.filters = filters;
    return params;
  },

  filterBuilder() {
    const controller = this;
    let filters = {};
    filters['flt.audience'] = controller.filterSelectedItems(
      'filter',
      'flt.audience'
    );
    filters['flt.educationalUse'] = controller.filterSelectedItems(
      'filter',
      'flt.educational'
    );
    filters['flt.language'] = controller.filterSelectedItems(
      'filter',
      'flt.language'
    );
    filters['flt.audience'] = controller.filterSelectedItems(
      'filter',
      'flt.audience'
    );
    filters['flt.standard'] = controller.filterSelectedItems(
      'filter',
      'flt.standard'
    );
    filters['flt.creator'] = controller.get('selectedFilters')['flt.authorName'];
    return filters;
  },

  filterSelectedItems(keyField, keyValue) {
    const controller = this;
    let filterList = controller
      .get('selectedFilters')
      .filterBy(keyField, keyValue);
    let keyName = keyValue === 'flt.standard' ? 'id' : 'name';
    return controller.toArray(filterList, keyName);
  },

  toArray(filterList, key) {
    let params = filterList.map(filter => {
      return filter[key];
    });
    return params.length > 0 ? params.join(',') : null;
  },


  /**
   * Map each collection to their corresponding owner
   * @param {Collection[]} collection list
   * @param {Owner[]} owner list
   */
  mapOwners: function(contents, owners) {
    let ownerMap = {};
    owners.forEach(function(owner) {
      ownerMap[owner.id] = owner;
    });
    let mappedContents = contents.map(function(content) {
      content.owner = content.ownerId ? ownerMap[content.ownerId] : ownerMap[content.owner];
      return content;
    });
    return mappedContents;
  }
});
