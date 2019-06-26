import Ember from 'ember';
import ModalMixin from 'gooru-web/mixins/modal';
import { SEARCH_CONTEXT, CONTENT_TYPES, ROLES } from 'gooru-web/config/config';
export default Ember.Controller.extend(ModalMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  session: Ember.inject.service(),

  /**
   * @type {Controller} Application controller
   */
  appController: Ember.inject.controller('application'),

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

  // -------------------------------------------------------------------------
  // Attributes

  queryParams: [
    'libraryId',
    'type',
    'profileId',
    'isBack',
    'term',
    'activeContentType'
  ],

  // -------------------------------------------------------------------------
  // Properties

  /**
   * A link to the parent application controller
   * @see controllers/application.js
   * @property {ClassesModel}
   */
  myClasses: Ember.computed.alias('appController.myClasses'),

  /**
   * @property {String} activeContentType
   */
  activeContentType: 'course',

  /**
   * @property {Object} library
   */
  library: null,

  /**
   * @property {Boolean} isLoading
   */
  isLoading: false,

  /**
   * @property {Array[]}
   */
  selectedResourceTypes: Ember.A([]),

  /**
   * @property {Array[]}
   */
  selectedQuestionTypes: Ember.A([]),

  /**
   * @property {Class[]} Active class without course
   */
  activeClasses: Ember.computed(
    'appController.myClasses.classes.[]',
    function() {
      const classes = this.get('appController.myClasses');
      return classes
        ? classes
          .getTeacherActiveClasses(this.get('session.userId'))
          .filterBy('courseId', null)
        : [];
    }
  ),

  isSearch: false,
  /**
   * Current user id
   */
  currentUserId: Ember.computed.alias('session.userId'),

  /**
   * @property {Boolean} isTeacher
   */
  isTeacher: Ember.computed.equal('session.role', ROLES.TEACHER),

  /**
   * Indicates if the user is seeing his own profile
   * @property {isMyProfile}
   * @see {Class} profile
   * @returns {bool}
   */
  isMyProfile: Ember.computed('profile', function() {
    let controller = this;
    return controller.get('profileId') === controller.get('currentUserId');
  }),

  /**
   * Maintains the current page number of search
   * @type {Number}
   */
  page: 0,

  /**
   * Maintains the current offset number of search
   * @type {Number}
   */
  offset: 0,

  /**
   * Maintains the value of default search page size.
   * @type {Number}
   */
  defaultPageSize: 20,

  /**
   * @property {Object} unCheckedItems
   * Property to hold unCheckedItems of taxonomy standards
   */
  unCheckedItem: null,

  /**
   * @property {Array} selectedFilters
   */
  selectedFilters: Ember.A([]),

  /**
   * @property {Array} searchResults
   */
  searchResults: Ember.A([]),

  actions: {
    /**
     * Action get triggered when search button is clicked
     */
    doSearch(searchTerm) {
      const controller = this;
      controller.set('searchTerm', searchTerm);
      controller.storeSelectedFilter();
      controller.fetchContent();
    },

    /**
     * Remix course action, when clicking remix at the course card
     * @param {Content/Course}
     */
    remixCourse: function(course) {
      this.send('showModal', 'content.modals.gru-course-remix', course);
    },

    /**
     * Triggers the refresh of user classes
     */
    updateClass: function() {
      this.send('updateUserClasses');
    },

    onShowModal(type) {
      this.send('showModal', type);
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

    /**
     * Action will trigger when scroll reaches at bottom
     * @param {Question} question
     */
    doPaginate() {
      const controller = this;
      if (
        controller.get('selectedFilters').length > 0 ||
        controller.get('searchTerm') ||
        controller.get('selectedQuestionTypes').length > 0 ||
        controller.get('selectedResourceTypes').length > 0 ||
        controller.get('type') === SEARCH_CONTEXT.GOORU_CATALOG
      ) {
        controller.loadMoreDataForSearch();
      } else {
        if (controller.get('type') === SEARCH_CONTEXT.LIBRARY) {
          controller.loadMoreDataForLibrary();
        } else {
          controller.loadMoreDataForMyContent();
        }
      }
    }
  },

  /**
   * Method is used to search contents by the params
   */
  searchByParams(term) {
    const controller = this;
    if (term) {
      controller.send('doSearch', term);
    }
  },

  /**
   * Method is used to fetch contents based on context
   */
  fetchContent() {
    const controller = this;
    controller.get('searchResults').clear();
    if (
      controller.get('selectedFilters').length > 0 ||
      controller.get('searchTerm') ||
      controller.get('selectedQuestionTypes').length > 0 ||
      controller.get('selectedResourceTypes').length > 0 ||
      controller.get('type') === SEARCH_CONTEXT.GOORU_CATALOG
    ) {
      controller.set('isSearch', true);
      controller.fetchSearchContent();
    } else {
      controller.set('isSearch', false);
      if (controller.get('type') === SEARCH_CONTEXT.LIBRARY) {
        controller.fetchLibraryContent();
      } else {
        controller.fetchMyContent();
      }
    }
  },

  /**
   * Method is used to store selected filter
   */
  storeSelectedFilter() {
    const component = this;
    const selectedFilters = component.get('selectedFilters');
    let storeObject = {};
    if (component.get('searchTerm')) {
      storeObject.searchTerm = component.get('searchTerm');
    }
    storeObject.selectedFilters = selectedFilters;
    let localStorage = window.localStorage;
    let itemId = `${component.get('profile.id')}_search_filter`;
    localStorage.setItem(itemId, JSON.stringify(storeObject));
  },

  /**
   * Method is used to init the selected filter
   */
  initializeSelectedFilter() {
    const component = this;
    let localStorage = window.localStorage;
    let storedObject = JSON.parse(localStorage.getItem(`${component.get('profile.id')}_search_filter`));
    if (storedObject) {
      component.set('searchTerm', storedObject.searchTerm);
      if (storedObject.searchedFilter) {
        storedObject.searchedFilter.map((searchFilter) => {
          component.get('selectedFilters').pushObject(Ember.Object.create(searchFilter));
        });
      }
    }
  },

  /**
   * Method is used to fetch Search contents
   */
  fetchSearchContent() {
    const controller = this;
    controller.set('isLoading', true);
    controller.set('page', 0);
    Ember.RSVP.hash({
      searchResults: controller.getSearchService()
    }).then(({ searchResults }) => {
      if (!controller.isDestroyed) {
        controller.set('isLoading', false);
        controller.set('searchResults', searchResults);
      }
    });
  },

  /**
   * Method is used to fetch my contents
   */
  fetchMyContent() {
    const controller = this;
    controller.set('isLoading', true);
    controller.set('page', 0);
    Ember.RSVP.hash({
      searchResults: controller.getMyContentService()
    }).then(({ searchResults }) => {
      if (!controller.isDestroyed) {
        controller.set('isLoading', false);
        controller.set('searchResults', searchResults);
      }
    });
  },

  /**
   * Method is used to fetch library contents
   */
  fetchLibraryContent() {
    let controller = this;
    controller.set('isLoading', true);
    controller.set('page', 0);
    Ember.RSVP.hash({
      searchResults: controller.getLibraryService()
    }).then(function(result) {
      if (result) {
        let libraryContent = result.searchResults.libraryContent;
        let content = libraryContent[Object.keys(libraryContent)[0]];
        let owners = libraryContent[Object.keys(libraryContent)[1]];
        controller.set('searchResults', controller.mapOwners(content, owners));
      }
      controller.set('isLoading', false);
    });
  },

  /**
   * Method is used to fetch more search contents
   */
  loadMoreDataForSearch() {
    let controller = this;
    if (!controller.get('isPaginate')) {
      controller.set('isPaginate', true);
      let page = controller.get('page') + 1;
      controller.set('page', page);
      Ember.RSVP.hash({
        searchResults: controller.getSearchService()
      }).then(({ searchResults }) => {
        if (!controller.isDestroyed) {
          controller.set('isPaginate', false);
          let searchResult = controller.get('searchResults');
          controller.set('searchResults', searchResult.concat(searchResults));
        }
      });
    }
  },

  /**
   * Method is used to fetch more my contents
   */
  loadMoreDataForMyContent() {
    let controller = this;
    if (!controller.get('isPaginate')) {
      controller.set('isPaginate', true);
      let page = controller.get('page') + 1;
      controller.set('page', page);
      Ember.RSVP.hash({
        searchResults: controller.getMyContentService()
      }).then(({ searchResults }) => {
        if (!controller.isDestroyed) {
          controller.set('isPaginate', false);
          let searchResult = controller.get('searchResults');
          controller.set('searchResults', searchResult.concat(searchResults));
        }
      });
    }
  },

  /**
   * Method is used to fetch more library contents
   */
  loadMoreDataForLibrary() {
    let controller = this;
    if (!controller.get('isPaginate')) {
      controller.set('isPaginate', true);
      let page = controller.get('page') + 1;
      controller.set('page', page);
      Ember.RSVP.hash({
        searchResults: controller.getLibraryService()
      }).then(function(result) {
        if (result) {
          let libraryContent = result.searchResults.libraryContent;
          let content = libraryContent[Object.keys(libraryContent)[0]];
          let owners = libraryContent[Object.keys(libraryContent)[1]];
          let searchResult = controller.get('searchResults');
          controller.set(
            'searchResults',
            searchResult.concat(controller.mapOwners(content, owners))
          );
        }
        controller.set('isPaginate', false);
      });
    }
  },

  /**
   * Method is used to get library service
   */
  getLibraryService() {
    let controller = this;
    const libraryId = controller.get('library.id');
    let activeContentType = controller.get('activeContentType');
    const pagination = {
      offset: controller.get('page') * controller.get('defaultPageSize'),
      pageSize: controller.get('defaultPageSize')
    };
    return controller
      .get('libraryService')
      .fetchLibraryContent(libraryId, activeContentType, pagination);
  },

  /**
   * Method is used to get my content service
   */
  getMyContentService() {
    let controller = this;
    let activeContentType = controller.get('activeContentType');
    let profile = controller.get('profile');
    const params = {
      page: controller.get('page'),
      pageSize: controller.get('defaultPageSize')
    };
    if (activeContentType === CONTENT_TYPES.COLLECTION) {
      return controller
        .get('profileService')
        .readCollections(profile.get('id'), params);
    } else if (activeContentType === CONTENT_TYPES.ASSESSMENT) {
      return controller
        .get('profileService')
        .readAssessments(profile.get('id'), params);
    } else if (activeContentType === CONTENT_TYPES.COURSE) {
      return controller.get('profileService').getCourses(profile, null, params);
    } else if (activeContentType === CONTENT_TYPES.RESOURCE) {
      return controller
        .get('profileService')
        .readResources(profile.get('id'), params);
    } else if (activeContentType === CONTENT_TYPES.QUESTION) {
      return controller
        .get('profileService')
        .readQuestions(profile.get('id'), params);
    } else if (activeContentType === CONTENT_TYPES.OFFLINE_ACTIVITY) {
      return controller
        .get('profileService')
        .readOfflineActivities(profile.get('id'), params);
    } else {
      return controller
        .get('profileService')
        .readRubrics(profile.get('id'), params);
    }
  },

  /**
   * Method is used to get search service
   */
  getSearchService() {
    let controller = this;
    let activeContentType = controller.get('activeContentType');
    let params = controller.getSearchParams();
    let term = controller.getSearchTerm() ? controller.getSearchTerm() : '*';
    if (activeContentType === CONTENT_TYPES.COLLECTION) {
      return controller.get('searchService').searchCollections(term, params);
    } else if (activeContentType === CONTENT_TYPES.ASSESSMENT) {
      return controller.get('searchService').searchAssessments(term, params);
    } else if (activeContentType === CONTENT_TYPES.COURSE) {
      return controller.get('searchService').searchCourses(term, params);
    } else if (activeContentType === CONTENT_TYPES.RESOURCE) {
      return controller.get('searchService').searchResources(term, params);
    } else if (activeContentType === CONTENT_TYPES.QUESTION) {
      return controller.get('searchService').searchQuestions(term, params);
    } else if (activeContentType === CONTENT_TYPES.OFFLINE_ACTIVITY) {
      return controller
        .get('searchService')
        .searchOfflineActivity(term, params);
    } else {
      return controller.get('searchService').searchRubrics(term, params);
    }
  },

  /**
   * Method is used to get search text
   */
  getSearchTerm() {
    let controller = this;
    return controller.get('searchTerm');
  },

  /**
   * Method is used to get search params
   */
  getSearchParams() {
    let controller = this;
    let params = {
      page: controller.get('page'),
      pageSize: controller.get('defaultPageSize')
    };
    let filters = controller.filterBuilder();

    if (controller.get('type') === SEARCH_CONTEXT.LIBRARY) {
      filters.scopeKey = 'open-library';
      filters.scopeTargetNames = controller.get('library.shortName');
      filters['flt.publishStatus'] = 'published,unpublished';
    } else if (controller.get('type') === SEARCH_CONTEXT.MY_CONTENT) {
      filters.scopeKey = 'my-content';
      filters['flt.publishStatus'] = 'published,unpublished';
      if (!controller.get('isMyProfile')) {
        filters['flt.creatorId'] = controller.get('profile.id');
      }
    } else {
      filters.scopeKey = 'open-all';
    }

    if (controller.get('activeContentType') === CONTENT_TYPES.RESOURCE) {
      params.formats = controller.get('selectedResourceTypes');
    }

    if (controller.get('activeContentType') === CONTENT_TYPES.QUESTION) {
      params.formats = controller.get('selectedQuestionTypes');
    }

    params.filters = filters;
    return params;
  },

  /**
   * Method is used to build the filters
   */
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
    filters['flt.creator'] = controller.get('selectedFilters')[
      'flt.authorName'
    ];
    return filters;
  },

  /**
   * Method is used to filter out selected items
   */
  filterSelectedItems(keyField, keyValue) {
    const controller = this;
    let filterList = controller
      .get('selectedFilters')
      .filterBy(keyField, keyValue);
    let keyName = keyValue === 'flt.standard' ? 'id' : 'name';
    return controller.toArray(filterList, keyName);
  },

  /**
   * Method is used to join values by comma seperator
   */
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
      content.owner = content.ownerId
        ? ownerMap[content.ownerId]
        : ownerMap[content.owner];
      return content;
    });
    return mappedContents;
  },

  /**
   * Method is used to reset properties
   */
  resetProperties() {
    const controller = this;
    controller.get('selectedFilters').clear();
    controller.set('activeContentType', 'course');
    controller.set('searchTerm', null);
    controller.set('profile', null);
    controller.set('library', null);
    controller.get('searchResults').clear();
  }
});
