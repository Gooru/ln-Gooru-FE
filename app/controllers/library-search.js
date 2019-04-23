import Ember from 'ember';
import ModalMixin from 'gooru-web/mixins/modal';
import {
  ROLES
} from 'gooru-web/config/config';
export default Ember.Controller.extend(ModalMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {Controller} Application controller
   */
  appController: Ember.inject.controller('application'),

  /**
   * @property {Profile} Session Profile
   */
  sessionProfile: Ember.computed.alias('appController.profile'),

  /**
   * @requires service:api-sdk/search
   */
  searchService: Ember.inject.service('api-sdk/search'),

  queryParams: ['id'],

  activeContentType: 'course',

  library: null,

  isLoading: false,

  /**
   * @property {Boolean} isTeacher
   */
  isTeacher: Ember.computed.equal('sessionProfile.role', ROLES.TEACHER),

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
   * @property {Array} selectedFilters
   */
  selectedFilters: Ember.A([]),

  actions: {
    /**
     * Action get triggered when search button is clicked
     */
    doSearch(searchTerm) {
      const controller = this;
      controller.set('searchTerm', searchTerm);
      controller.fetchContent();
    },

    /**
     * On card remix question button click
     * @param {Question} question
     */
    remixQuestion(question) {
      var remixModel = {
        content: question
      };
      this.send('showModal', 'content.modals.gru-question-remix', remixModel);
    },

    doPaginate() {
      const controller = this;
      controller.loadMoreData();
    }
  },

  fetchContent() {
    const controller = this;
    controller.toggleProperty('isLoading');
    controller.set('page', 0);
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
        }
      });
  },

  loadMoreData() {
    let controller = this;
    if (!controller.get('isPaginate')) {
      controller.set('isPaginate', true);
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
            controller.set('isPaginate', false);
            let searchResult = controller.get('searchResults');
            controller.set('searchResults', searchResult.concat(searchResults));
          }
        });
    }
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
    } else if (activeContentType === 'question') {
      return controller.get('searchService').searchQuestions(term, params);
    } else {
      return controller.get('searchService').searchRubrics(term, params);
    }
  },

  getSearchTerm() {
    let controller = this;
    return controller.get('searchTerm');
  },

  getSearchParams() {
    let controller = this;
    let params = {
      page: controller.get('page'),
      pageSize: controller.get('defaultSearchPageSize')
    };
    let filters = controller.filterBuilder();

    if (controller.get('isTeacher') && controller.get('activeContentType') !== 'course' &&
      controller.get('activeContentType') !== 'rubric') {
      filters['flt.audience'] = 'All Students,Teachers';
    }
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
  },


  resetProperties() {
    const controller = this;
    controller.get('selectedFilters').clear();
    controller.set('activeContentType', 'course');
    controller.get('searchResults').clear();
  }
});
