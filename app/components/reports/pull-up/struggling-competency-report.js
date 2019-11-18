import Ember from 'ember';

export default Ember.Component.extend({
  //--------------------------------------------------------
  //Attributes
  classNames: ['pull-up', 'struggling-competency-report'],

  //--------------------------------------------------------
  //Dependencies
  session: Ember.inject.service('session'),

  /**
   * @property {service} searchService
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

  /**
   * Struggling compentency service
   */
  strugglingCompetencyService: Ember.inject.service(
    'api-sdk/struggling-competency'
  ),

  /**
   * @requires service:api-sdk/search
   */
  suggestService: Ember.inject.service('api-sdk/suggest'),

  //--------------------------------------------------------
  // Properties

  /**
   * @property {String} classId
   */
  classId: Ember.computed.alias('class.id'),

  /**
   * @property {Object} selectedCompetency
   * property hold selected competency
   */
  selectedCompetency: null,

  /**
   * @property {Array} studentsPerformanceList
   * property hold student performance list
   */
  studentsPerformanceList: null,

  /**
   * @property {Array} studentsPerformanceList
   * property hold student count exceed max 5
   */
  studentsCount: 0,

  /**
   * @property {Array} collectionContents
   * property hold collection based on competency code
   */
  collectionContents: [],

  /**
   * @property {Array} menuItems
   * property hold menu list that are showing in dropdown
   */
  menuItems: null,

  /**
   * @property {Object} selectedMenuItem
   * property hold selected menu item
   */
  selectedMenuItem: null,

  /**
   * @property {Array} libraries
   * property hold the library content
   */
  libraries: null,

  /**
   * @property {Boolean} showTenantLibraries
   * property used to show library list in competency pullup
   */
  showTenantLibraries: false,

  /**
   * @property {Boolean} showLibraryCollection
   * property used to show library collection list in competency pullup
   */
  showLibraryCollection: false,

  /**
   * @property {Object} selectedLibrary
   */
  selectedLibrary: null,

  /**
   * @property {boolean} showSuggestConfirmation
   */
  showSuggestConfirmation: false,

  /**
   * @property {Object} suggestedCollection
   */
  suggestedCollection: null,

  startAt: 0,

  pageSize: 5,

  /**
   * @property {Boolean} isShowMoreButton
   */
  isShowMoreButton: false,

  /**
   * @property {Boolean} isLoading
   */
  isLoading: true,

  //-------------------------------------------------------
  //Actions
  actions: {
    showStudentList() {
      let component = this;
      component.$('.sc-student-dropdown-list-container').slideToggle(500);
    },

    onClosePullUp(isCloseAll = false) {
      let component = this;
      component.$().slideUp({
        complete: function() {
          component.sendAction('closePullUp', isCloseAll);
        }
      });
    },

    /**
     * Action triggered when the user play collection
     * It'll open the player in new tab
     */
    onPlayCollection(collection) {
      const component = this;
      component.sendAction('onPreviewContent', collection);
    },

    /**
     * Action triggered when add collection to dca.
     * @param  {Object} collection
     */
    onAddContentToDCA(collection) {
      const component = this;
      component.sendAction('onAddContentToDCA', collection);
    },

    /**
     * Action get triggered when schedule content to CA got clicked
     */
    onScheduleContentToDCA(content, event) {
      this.sendAction('onScheduleContentToDCA', content, event);
    },

    /*
     * Action triggered when click search dropdown from competency pullup
     */
    onSelectDropdown() {
      Ember.$('.search-filter-container-list').slideToggle(500);
    },

    /**
     * Action triggered when click menu list from dropdown
     */
    onSelectMenuItems(item) {
      const component = this;
      let preSelectedMenu = component
        .get('menuItems')
        .findBy('isSelected', true);
      if (preSelectedMenu) {
        preSelectedMenu.set('isSelected', false);
      }
      item.set('isSelected', true);
      component.set('showTenantLibraries', false);
      component.set('showLibraryCollection', false);
      component.set('selectedMenuItem', item);
      component.set('collectionContents', []);
      component.set('startAt', 0);
      component.set('isShowMoreButton', false);
      component.set('isLoading', true);
      component.actions.onSelectDropdown();
      component.fetchSuggestedCollection(item);
    },

    // Action triggered when click on library
    onSelectLibrary(library) {
      let component = this;
      let selectedItem = component.get('selectedMenuItem');
      component.set('selectedLibrary', library);
      component.set('showLibraryCollection', true);
      component.set('isLoading', true);
      component.fetchSuggestedCollection(selectedItem);
    },

    // Action triggered when click on back button in library
    backToLibrary() {
      this.set('collectionContents', []);
      this.set('showLibraryCollection', false);
      this.set('startAt', 0);
      this.set('isShowMoreButton', false);
    },

    // Action call when click suggestion button
    onSuggestContent(collection) {
      this.set('suggestedCollection', collection);
      this.set('showSuggestConfirmation', true);
    },

    onCancelSuggest() {
      const component = this;
      component.set('showSuggestConfirmation', false);
    },

    onConfirmSuggest() {
      const component = this;
      const collection = component.get('suggestedCollection');
      const competencyCode = component.get('selectedCompetency.code');
      component.set('showSuggestConfirmation', false);
      collection.set('isSuggested', true);
      let studentList = component.get('studentsPerformanceList');
      if (studentList.length) {
        studentList.map(student => {
          component.suggestContent(
            student.userId,
            collection,
            'collection',
            competencyCode
          );
        });
      }
    },

    onShowMore() {
      let component = this;
      let selectedItem = component.get('selectedMenuItem');
      component.fetchSuggestedCollection(selectedItem);
    }
  },

  //---------------------------------------------------------------------
  // Hooks

  didInsertElement() {
    let component = this;
    if (component.get('selectedCompetency')) {
      let selectedCompetency = component.get('selectedCompetency');
      component.fetchStudentsPerfomance(selectedCompetency);
      component.fetchSuggestedCollection();
      this.openPullUp();
      this.createMenuItems();
    }
  },

  //---------------------------------------------------------------------
  // Method

  openPullUp() {
    let component = this;
    component.$().slideDown();
  },

  createMenuItems() {
    let component = this;
    let menuList = Ember.A([
      Ember.Object.create({ label: 'common.gooru-catalog' }),
      Ember.Object.create({ label: 'common.myContent' }),
      Ember.Object.create({ label: 'common.tenantLibrary' }),
      Ember.Object.create({ label: 'common.suggested', isSelected: true })
    ]);
    component.set('selectedMenuItem', menuList.findBy('isSelected', true));
    component.set('menuItems', menuList);
  },

  fetchStudentsPerfomance(selectedCompetency) {
    let component = this;
    let params = {
      competency: selectedCompetency.get('code'),
      classId: component.get('classId'),
      month: moment().format('MM'),
      year: moment().format('YYYY')
    };
    Ember.RSVP.hash({
      studentsPerfomance: component
        .get('strugglingCompetencyService')
        .fetchStudentsPerfomance(params)
    }).then(({ studentsPerfomance }) => {
      component.set('studentsPerformanceList', studentsPerfomance);
      if (studentsPerfomance.length > 5) {
        component.set('studentsCount', studentsPerfomance.length - 5);
      }
    });
  },

  fetchSuggestedCollection(item) {
    let component = this;
    Ember.RSVP.hash({
      collections: component.collectionServices(item)
    }).then(({ collections }) => {
      if (!component.isDestoryed) {
        let collectionContents = component.get('collectionContents');
        let collectionList = component.get('showLibraryCollection')
          ? collections.get('libraryContent.collections')
          : collections;
        component.set('isShowMoreButton', false);
        if (collectionList.length) {
          let startAt = component.get('startAt');
          component.set('startAt', startAt + 1);
          if (collectionList.length === 5) {
            component.set('isShowMoreButton', true);
          }
          collectionList.map(collection => {
            collectionContents.pushObject(collection);
          });
        }
        component.set('isLoading', false);
      }
    });
  },

  collectionServices(item = null) {
    let component = this;
    let competencyCode = component.get('selectedCompetency.code');
    let params = {
      page: component.get('startAt'),
      pageSize: component.get('pageSize'),
      filters: {
        'flt.relatedGutCode': competencyCode
      }
    };
    let libraryId = component.get('selectedLibrary.id');
    let currentUserId = component.get('session.userId');
    let selectedService = Ember.RSVP.resolve([]);
    if (item) {
      if (item.label === 'common.gooru-catalog') {
        selectedService = component
          .get('searchService')
          .searchCollections('*', params);
      } else if (item.label === 'common.myContent') {
        selectedService = component
          .get('profileService')
          .readCollections(currentUserId, params);
      } else if (item.label === 'common.tenantLibrary') {
        if (component.get('showTenantLibraries')) {
          let page = params.page;
          let pageSize = params.pageSize;
          params.offset = parseInt(page) * parseInt(pageSize);
          selectedService = component
            .get('libraryService')
            .fetchLibraryContent(libraryId, 'collection', params);
        } else {
          component.loadTenantLibraries();
          component.set('showTenantLibraries', true);
        }
      }
    } else {
      let param = {
        scope: 'proficiency',
        classId: component.get('classId')
      };
      selectedService = component
        .get('suggestService')
        .fetchInClassSuggestionsByCode(currentUserId, competencyCode, param);
    }
    return selectedService;
  },

  loadTenantLibraries() {
    const component = this;
    component
      .get('libraryService')
      .fetchLibraries()
      .then(libraries => {
        if (!component.isDestoryed) {
          component.set('isLoading', false);
          component.set('libraries', libraries);
        }
      });
  },

  suggestContent(userId, collection, collectionType, competencyCode) {
    const component = this;
    let contextParams = {
      user_id: userId,
      class_id: component.get('classId'),
      suggested_content_id: collection.get('id'),
      suggestion_origin: 'teacher',
      suggestion_originator_id: component.get('session.userId'),
      suggestion_criteria: 'performance',
      suggested_content_type: collectionType,
      suggested_to: 'student',
      suggestion_area: 'proficiency',
      tx_code: competencyCode,
      tx_code_type: 'competency'
    };
    component.get('suggestService').suggestContent(contextParams);
  }
});
