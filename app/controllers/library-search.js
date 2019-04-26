import Ember from 'ember';
import ModalMixin from 'gooru-web/mixins/modal';
import {
  ROLES
} from 'gooru-web/config/config';
export default Ember.Controller.extend(ModalMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  session: Ember.inject.service(),

  /**
   * @type {Controller} Application controller
   */
  appController: Ember.inject.controller('application'),

  /**
   * A link to the parent application controller
   * @see controllers/application.js
   * @property {ClassesModel}
   */
  myClasses: Ember.computed.alias('appController.myClasses'),

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

  queryParams: ['libraryId', 'type', 'profileId', 'isBack'],

  // -------------------------------------------------------------------------
  // Properties
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
      return classes ?
        classes
          .getTeacherActiveClasses(this.get('session.userId'))
          .filterBy('courseId', null) : [];
    }
  ),

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

    doPaginate() {
      const controller = this;
      if (controller.get('selectedFilters').length > 0 ||
        controller.get('searchTerm') || controller.get('selectedQuestionTypes').length > 0 ||
        controller.get('selectedResourceTypes').length > 0 ||
        controller.get('type') === 'gooru-catalog') {
        controller.loadMoreDataForSearch();
      } else {
        if (controller.get('type') === 'library') {
          controller.loadMoreDataForLibrary();
        } else {
          controller.loadMoreDataForMyContent();
        }
      }
    }
  },

  fetchContent() {
    const controller = this;
    controller.get('searchResults').clear();
    if (controller.get('selectedFilters').length > 0 ||
      controller.get('searchTerm') || controller.get('selectedQuestionTypes').length > 0 ||
      controller.get('selectedResourceTypes').length > 0 ||
      controller.get('type') === 'gooru-catalog') {
      controller.fetchSearchContent();
    } else {
      if (controller.get('type') === 'library') {
        controller.fetchLibraryContent();
      } else {
        controller.fetchMyContent();
      }
    }
  },

  fetchSearchContent() {
    const controller = this;
    controller.set('isLoading', true);
    controller.set('page', 0);
    Ember.RSVP
      .hash({
        searchResults: controller.getSearchService()
      })
      .then(({
        searchResults
      }) => {
        if (!controller.isDestroyed) {
          controller.set('isLoading', false);
          controller.set('searchResults', searchResults);
        }
      });
  },

  fetchMyContent() {
    const controller = this;
    controller.set('isLoading', true);
    controller.set('page', 0);
    Ember.RSVP
      .hash({
        searchResults: controller.getMyContentService()
      })
      .then(({
        searchResults
      }) => {
        if (!controller.isDestroyed) {
          controller.set('isLoading', false);
          controller.set('searchResults', searchResults);
        }
      });
  },

  fetchLibraryContent() {
    let controller = this;
    controller.set('isLoading', true);
    controller.set('page', 0);
    Ember.RSVP
      .hash({
        searchResults: controller.getLibraryService()
      })
      .then(function(result) {
        if (result) {
          let libraryContent = result.searchResults.libraryContent;
          let content = libraryContent[Object.keys(libraryContent)[0]];
          let owners = libraryContent[Object.keys(libraryContent)[1]];
          controller.set('searchResults', controller.mapOwners(content, owners));
        }
        controller.set('isLoading', false);
      });
  },

  loadMoreDataForSearch() {
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

  loadMoreDataForMyContent() {
    let controller = this;
    if (!controller.get('isPaginate')) {
      controller.set('isPaginate', true);
      let page = controller.get('page') + 1;
      controller.set('page', page);
      Ember.RSVP
        .hash({
          searchResults: controller.getMyContentService()
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

  loadMoreDataForLibrary() {
    let controller = this;
    if (!controller.get('isPaginate')) {
      controller.set('isPaginate', true);
      let page = controller.get('page') + 1;
      controller.set('page', page);
      Ember.RSVP
        .hash({
          searchResults: controller.getLibraryService()
        })
        .then(function(result) {
          if (result) {
            let libraryContent = result.searchResults.libraryContent;
            let content = libraryContent[Object.keys(libraryContent)[0]];
            let owners = libraryContent[Object.keys(libraryContent)[1]];
            let searchResult = controller.get('searchResults');
            controller.set('searchResults', searchResult.concat(controller.mapOwners(content, owners)));
          }
          controller.set('isPaginate', false);
        });
    }
  },

  getLibraryService() {
    let controller = this;
    const libraryId = controller.get('library.id');
    let activeContentType = controller.get('activeContentType');
    const pagination = {
      offset: controller.get('page') * controller.get('defaultPageSize'),
      pageSize: controller.get('defaultPageSize')
    };
    return controller.get('libraryService').fetchLibraryContent(libraryId, activeContentType, pagination);
  },

  getMyContentService() {
    let controller = this;
    let activeContentType = controller.get('activeContentType');
    let profile = controller.get('profile');
    const params = {
      page: controller.get('page'),
      pageSize: controller.get('defaultPageSize')
    };
    if (activeContentType === 'collection') {
      return controller.get('profileService').readCollections(profile.get('id'), params);
    } else if (activeContentType === 'assessment') {
      return controller.get('profileService').readAssessments(profile.get('id'), params);
    } else if (activeContentType === 'course') {
      return controller.get('profileService').getCourses(profile, null, params);
    } else if (activeContentType === 'resource') {
      return controller.get('profileService').readResources(profile.get('id'), params);
    } else if (activeContentType === 'question') {
      return controller.get('profileService').readQuestions(profile.get('id'), params);
    } else {
      return controller.get('profileService').readRubrics(profile.get('id'), params);
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
      pageSize: controller.get('defaultPageSize')
    };
    let filters = controller.filterBuilder();

    if (!controller.get('selectedFilters').length > 0 && controller.get('isTeacher') && controller.get('activeContentType') !== 'course' &&
      controller.get('activeContentType') !== 'rubric') {
      filters['flt.audience'] = 'All Students,Teachers';
    }
    if (controller.get('type') === 'library') {
      filters.scopeKey = 'open-library';
      filters.scopeTargetNames = controller.get('library.shortName');
      filters['flt.publishStatus'] = 'published,unpublished';
    } else if (controller.get('type') === 'my-content') {
      filters.scopeKey = 'my-content';
      filters['flt.publishStatus'] = 'published,unpublished';
      if (!controller.get('isMyProfile')) {
        filters['flt.creatorId'] = controller.get('profile.id');
      }
    } else {
      filters.scopeKey = 'open-all';
    }

    if (controller.get('activeContentType') === 'resource') {
      params.formats = controller.get('selectedResourceTypes');
    }

    if (controller.get('activeContentType') === 'question') {
      params.formats = controller.get('selectedQuestionTypes');
    }

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
    controller.set('searchTerm', null);
    controller.get('searchResults').clear();
  }
});
