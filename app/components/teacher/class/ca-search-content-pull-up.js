import Ember from 'ember';
import {
  SEARCH_FILTER_BY_CONTENT_TYPES,
  KEY_CODES
} from 'gooru-web/config/config';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['backdrop-pull-ups', 'teacher-class-search-content-pull-up'],

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:api-sdk/search
   */
  searchService: Ember.inject.service('api-sdk/search'),

  /**
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service('api-sdk/class-activity'),

  /**
   * @type {ProfileService} Profile service object
   */
  profileService: Ember.inject.service('api-sdk/profile'),

  /**
   * Session object of logged in user
   * @type {Object}
   */
  session: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Propery to hide the default pullup.
   * @property {showPullUp}
   */
  showPullUp: false,

  /**
   * Maintains the state of active content type (C/A/R/Q), default collection
   * @type {String}
   */
  activeContentType: 'collection',

  /**
   * Allowed filter content types
   * @type {Array}
   */
  filterContentType: SEARCH_FILTER_BY_CONTENT_TYPES,

  /**
   * Maintains the search result data
   * @type {Array}
   */
  searchResults: Ember.A([]),

  /**
   * Maintains the state of data loading
   * @type {Boolean}
   */
  isLoading: false,

  /**
   * Maintains the context data
   * @type {Object}
   */
  context: null,

  /**
   * Class Id extract from context
   * @type {String}
   */
  classId: Ember.computed.alias('context.classId'),

  /**
   * class Object extract from context
   * @type {String}
   */
  class: Ember.computed.alias('context.class'),

  /**
   * course Object extract from context
   * @type {String}
   */
  course: Ember.computed.alias('context.course'),

  /**
   * courseId Object extract from context
   * @type {String}
   */
  courseId: Ember.computed.alias('context.courseId'),

  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  tags: Ember.computed('collection.standards.[]', function() {
    let standards = this.get('collection.standards');
    if (standards) {
      standards = standards.filter(function(standard) {
        // Filter out learning targets (they're too long for the card)
        return !TaxonomyTagData.isMicroStandardId(standard.get('id'));
      });
      return TaxonomyTag.getTaxonomyTags(standards);
    }
  }),

  /**
   * Maintains the state of selected  content type for search
   * @type {String}
   */
  selectedSearchContentType: 'collection',

  /**
   * Maintains the state of more data exists or not
   * @type {Boolean}
   */
  isMoreDataExists: false,

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
   * Maintains the list of  menu items
   * @type {Array}
   */
  menuItems: Ember.computed('courseId', function() {
    let courseId = this.get('courseId');
    let menuItems = Ember.A([]);
    menuItems.pushObject(
      this.createMenuItem('catalog', 'common.gooru-catalog', true)
    );
    menuItems.pushObject(
      this.createMenuItem('myContent', 'common.myContent', false)
    );
    if (courseId) {
      menuItems.pushObject(
        this.createMenuItem('courseMap', 'common.course-map', false)
      );
    }
    return menuItems;
  }),

  /**
   * It will compute the selected menu item on changes of menu item selection or data change.
   * @type {String}
   */
  selectedMenuItem: Ember.computed('menuItems.@each.selected', function() {
    let menuItems = this.get('menuItems');
    return menuItems.findBy('selected', true);
  }),

  /**
   * Maintains the state of menu list visibility
   * @type {Boolean}
   */
  isMenuEnabled: false,

  /**
   * Maintains the list of added collection ids from today's class activities
   * @type {Object}
   */
  addedCollectionIdsInTodayClassActivities: Ember.computed(
    'todaysClassActivities',
    function() {
      let classActivities = this.get('todaysClassActivities');
      let collectionIds = Ember.A([]);
      if (classActivities) {
        collectionIds = classActivities.map(classActivity => {
          return classActivity.get('collection.id');
        });
      }
      return collectionIds;
    }
  ),

  /**
   * Maintains the list of search result set.
   * @type {Array}
   */
  searchResultSet: Ember.computed('searchResults.[]', function() {
    let searchResults = this.get('searchResults');
    let collectionIds = this.get('addedCollectionIdsInTodayClassActivities');
    collectionIds.forEach(id => {
      let result = searchResults.findBy('id', id);
      if (result) {
        result.set('isAdded', true);
      }
    });
    return searchResults;
  }),

  /**
   * This flag gets update on selection of menu items
   * @type {Boolean}
   */
  isCourseMap: false,

  // -------------------------------------------------------------------------
  // actions

  actions: {
    /**
     * Action triggered when the user close the pull up.
     **/
    onPullUpClose() {
      this.closePullUp();
    },

    /**
     * Event get triggered when filter by content type menu is selected
     * @param  {String} contentType
     */
    onSelectFilterBy(contentType) {
      this.set('activeContentType', contentType);
      this.loadData();
    },

    /**
     * Action get triggered when add content to DCA got clicked
     */
    onAddContentToDCA(content) {
      let component = this;
      let classId = component.get('classId');
      let contentType =
        content.get('format') || component.get('activeContentType');
      let contentId = content.get('id');
      let date = moment().format('YYYY-MM-DD');
      component
        .get('classActivityService')
        .addActivityToClass(classId, contentId, contentType, date)
        .then(newContentId => {
          let data = component.serializerSearchContent(
            content,
            newContentId,
            date
          );
          content.set('isAdded', true);
          component.sendAction('addedContentToDCA', data, date);
        });
    },

    /**
     * Action get triggered when schedule content  added to DCA
     */
    addedScheduleContentToDCA(content, newContentId, addedDate) {
      let component = this;
      let data = component.serializerSearchContent(
        content,
        newContentId,
        addedDate
      );
      component.sendAction('addedContentToDCA', data, addedDate);
    },

    /**
     * Toggle menu list based on the recent selection of the menu.
     */
    toggleMenuList() {
      this.toggleProperty('isMenuEnabled');
    },

    /**
     * Choose the menu item
     */
    onChooseMenuItem(selectedItem) {
      let component = this;
      component.toggleMenuItem(selectedItem);
    },

    /**
     * It will takes care of content will schedule for the specific date.
     * @param  {String} scheduleDate
     */
    onScheduleDate(scheduleDate) {
      let component = this;
      let classId = component.get('classId');
      let contentType =
        component.get('selectedContentForSchedule.format') ||
        component.get('activeContentType');
      let contentId = component.get('selectedContentForSchedule.id');
      let content = component.get('selectedContentForSchedule');
      let datepickerEle = component.$('.schedule-ca-datepicker-container');
      datepickerEle.hide();
      component
        .get('classActivityService')
        .addActivityToClass(classId, contentId, contentType, scheduleDate)
        .then(newContentId => {
          if (!component.isDestroyed) {
            let data = component.serializerSearchContent(
              content,
              newContentId,
              scheduleDate
            );
            component.sendAction('addedContentToDCA', data, scheduleDate);
          }
        });
    },

    /**
     * It will takes care of content will schedule for the specific month.
     * @param  {Number} forMonth
     * @param  {Number} forYear
     */
    onScheduleForMonth(forMonth, forYear) {
      let component = this;
      let classId = component.get('classId');
      let contentType =
        component.get('selectedContentForSchedule.format') ||
        component.get('activeContentType');
      let contentId = component.get('selectedContentForSchedule.id');
      let content = component.get('selectedContentForSchedule');
      let datepickerEle = component.$('.schedule-ca-datepicker-container');
      datepickerEle.hide();
      component
        .get('classActivityService')
        .addActivityToClass(
          classId,
          contentId,
          contentType,
          null,
          forMonth,
          forYear
        )
        .then(newContentId => {
          if (!component.isDestroyed) {
            let data = component.serializerSearchContent(
              content,
              newContentId,
              null,
              forMonth,
              forYear
            );
            component.sendAction(
              'addedContentToDCA',
              data,
              null,
              forMonth,
              forYear
            );
          }
        });
    },

    /**
     * Action get triggered when schedule content to CA got clicked
     */
    onScheduleContentToDCA(content, event) {
      let component = this;
      let datepickerEle = component.$('.schedule-ca-datepicker-container');
      let datepickerCtnEle = component.$(
        '.schedule-ca-datepicker-container .ca-date-picker-container'
      );
      datepickerCtnEle.removeClass('ca-datepicker-orientation-top');
      datepickerCtnEle.removeClass('ca-datepicker-orientation-bottom');
      datepickerCtnEle.removeClass('ca-datepicker-orientation-center');
      let selectedContentEle = component.$(event.target);
      let position = selectedContentEle.position();
      let top = position.top + 10 - datepickerEle.height();
      let left = position.left + 20 - datepickerEle.width();
      let componentHeight = component.$().height();
      let windowHeight = $(window).height();
      let allowedTop = windowHeight - componentHeight + top;
      if (left < 0) {
        left = position.left - datepickerEle.width() / 2;
        datepickerCtnEle.addClass('ca-datepicker-orientation-center');
      }
      if (allowedTop < 0) {
        datepickerCtnEle.addClass('ca-datepicker-orientation-bottom');
        top = position.top + 35;
      } else {
        datepickerCtnEle.addClass('ca-datepicker-orientation-top');
      }
      datepickerEle.css({
        top: top,
        left: left
      });
      if (!selectedContentEle.hasClass('active')) {
        selectedContentEle.addClass('active');
        datepickerEle.show();
      } else {
        selectedContentEle.removeClass('active');
        datepickerEle.hide();
      }
      this.set('selectedContentForSchedule', content);
    },

    //Action triggered when click + icon in the pullup
    onClickCreateOfflineActivity() {
      this.set('isShowCreateOfflineActivity', true);
    },

    //Action triggered after created offline activity and add it to dca
    onAddExternalCollectionToDCA(
      activityData,
      activityDate,
      scheduledMonth,
      scheduledYear
    ) {
      const component = this;
      component.set('activeContentType', 'collection');
      let selectedItem = component.get('menuItems').findBy('key', 'myContent');
      component.toggleMenuItem(selectedItem, true);
      component.sendAction(
        'addedContentToDCA',
        activityData,
        activityDate,
        scheduledMonth,
        scheduledYear
      );
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * Function to triggered once when the component element is first rendered.
   */
  didInsertElement() {
    let component = this;
    component.set(
      'activeContentType',
      component.get('selectedSearchContentType')
    );
    component.resetMenuItems();
    component.loadData();
    component.openPullUp();
    component.handleSearchBar();
    component.handleShowMoreData();
    component.closeCADatePickerOnScroll();
  },

  //--------------------------------------------------------------------------
  // Methods

  /**
   * Function to animate the  pullup from bottom to top
   */
  openPullUp() {
    let component = this;
    component.$().animate(
      {
        top: '10%'
      },
      400
    );
  },

  closePullUp() {
    let component = this;
    component.$().animate(
      {
        top: '100%'
      },
      400,
      function() {
        component.set('showPullUp', false);
      }
    );
  },

  handleSearchBar() {
    let component = this;
    component.$('#search-content').on('keyup', function(e) {
      if (e.which === KEY_CODES.ENTER) {
        component.loadData();
      }
    });

    component.$('.search-icon .search').click(function() {
      let term = component.getSearchTerm();
      if (term.length > 0) {
        component.loadData();
      }
    });
  },

  loadData() {
    let component = this;
    component.set('isLoading', true);
    component.set('page', 0);
    component.set('isMoreDataExists', false);

    Ember.RSVP.hash({
      searchResults: component.getSearchService()
    }).then(({ searchResults }) => {
      if (!component.isDestroyed) {
        component.set('isLoading', false);
        component.set('searchResults', searchResults);
        component.$('.search-list-container').scrollTop(0);
        if (
          searchResults &&
          searchResults.length === component.get('defaultSearchPageSize')
        ) {
          component.set('isMoreDataExists', true);
        }
      }
    });
  },

  loadMoreData() {
    let component = this;
    component.set('isLoading', true);
    let page = component.get('page') + 1;
    component.set('page', page);
    Ember.RSVP.hash({
      searchResults: component.getSearchService()
    }).then(({ searchResults }) => {
      if (!component.isDestroyed) {
        component.set('isLoading', false);
        let searchResult = component.get('searchResults');
        component.set('searchResults', searchResult.concat(searchResults));
        if (
          searchResults &&
          searchResults.length === component.get('defaultSearchPageSize')
        ) {
          component.set('isMoreDataExists', true);
        }
      }
    });
  },

  getSearchServiceByType() {
    let component = this;
    let activeContentType = component.get('activeContentType');
    let params = component.getSearchParams();
    let term = component.getSearchTerm() ? component.getSearchTerm() : '*';
    if (activeContentType === 'collection') {
      return component.get('searchService').searchCollections(term, params);
    } else if (activeContentType === 'assessment') {
      return component.get('searchService').searchAssessments(term, params);
    }
  },

  getMyContentByType() {
    let component = this;
    let currentUserId = component.get('session.userId');
    let activeContentType = component.get('activeContentType');
    let params = component.getMyContentParams();
    let term = component.getSearchTerm();
    if (term) {
      params.searchText = term;
    }
    if (activeContentType === 'collection') {
      return component
        .get('profileService')
        .readCollections(currentUserId, params);
    } else if (activeContentType === 'assessment') {
      return component
        .get('profileService')
        .readAssessments(currentUserId, params);
    }
  },

  getSearchService() {
    let component = this;
    let searchService = null;
    let label = component.get('selectedMenuItem.label');
    if (label === 'common.myContent') {
      searchService = component.getMyContentByType();
    } else if (label === 'common.gooru-catalog') {
      searchService = component.getSearchServiceByType();
    }
    return searchService;
  },

  getSearchTerm() {
    let searchText = this.$('#search-content').val();
    return searchText;
  },

  getSearchParams() {
    let component = this;
    let params = {
      taxonomies: null,
      page: component.get('page'),
      pageSize: component.get('defaultSearchPageSize')
    };
    let term = component.getSearchTerm();
    if (!term) {
      let grade = component.get('class.grade');
      let subject = component.get('course.subject');
      let filters = {};
      if (grade) {
        filters['flt.grade'] = grade;
      }
      if (subject) {
        filters['flt.subject'] = subject;
      }
      params.filters = filters;
    }
    return params;
  },

  getMyContentParams() {
    let component = this;
    let params = {
      page: component.get('page'),
      pageSize: component.get('defaultSearchPageSize')
    };
    return params;
  },

  serializerSearchContent(content, contentId, date, forMonth, forYear) {
    let format = content.get('format');
    if (!format) {
      content.set('format', this.get('activeContentType'));
    } else {
      content.set('collectionType', format);
    }

    return Ember.Object.create({
      id: contentId,
      added_date: date,
      activityDate: date,
      collection: content,
      usersCount: -1,
      isActive: false,
      forMonth: parseInt(forMonth),
      forYear: parseInt(forYear)
    });
  },

  handleShowMoreData() {
    let component = this;
    let container = component.$('.search-list-container');
    component.$(container).scroll(function() {
      let scrollTop = Ember.$(container).scrollTop();
      let listContainerHeight = Ember.$(container).height() + 60;
      let isScrollReachedBottom =
        scrollTop ===
        component.$(container).prop('scrollHeight') - listContainerHeight;
      if (
        isScrollReachedBottom &&
        !component.get('isLoading') &&
        component.get('isMoreDataExists')
      ) {
        component.loadMoreData();
      }
    });
  },

  resetMenuItems() {
    let menuItems = this.get('menuItems');
    menuItems.forEach(item => {
      item.set('selected', false);
      if (item.get('key') === 'catalog') {
        item.set('selected', true);
      }
    });
    this.set('isCourseMap', false);
  },

  closeCADatePickerOnScroll() {
    let component = this;
    component.$('.search-list-container').on('scroll', function() {
      if (Ember.$('.ca-datepicker-popover-container').is(':visible')) {
        Ember.$('.ca-datepicker-popover-container').hide();
        Ember.$('.ca-datepicker-popover').removeClass('active');
      }
    });
  },

  createMenuItem(key, label, selected) {
    return Ember.Object.create({
      key: key,
      label: label,
      selected: selected
    });
  },

  /**
   * @function toggleMenuItem
   * Method to toggle selected menu item
   */
  toggleMenuItem(selectedItem, skipToggle) {
    const component = this;
    let menuItems = component.get('menuItems');
    menuItems.forEach(item => {
      item.set('selected', false);
      if (selectedItem.get('label') === item.get('label')) {
        item.set('selected', true);
      }
    });
    if (!skipToggle) {
      component.toggleProperty('isMenuEnabled');
    }
    if (selectedItem.get('key') === 'courseMap') {
      component.set('isCourseMap', true);
    } else {
      component.set('isCourseMap', false);
      component.loadData();
    }
  }
});
