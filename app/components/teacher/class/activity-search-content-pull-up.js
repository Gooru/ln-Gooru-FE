import Ember from 'ember';
import { SEARCH_FILTER_BY_CONTENT_TYPES, KEY_CODES } from 'gooru-web/config/config';

export default Ember.Component.extend({

  //--------------------------------------------------------------------------
  // Attributes

  classNames: ['activity-search-content-pull-up'],


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
  // Events
  didInsertElement() {
    const component = this;
    component.openPullUp();
    component.loadData();
    component.closeCADatePickerOnScroll();
    component.doHandleSearchEvent();
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    //Action triggered when click on add icon
    onAddActivity(content) {
      const component = this;
      let classId = component.get('classId');
      let contentType =
        content.get('format') || component.get('activeContentType');
      let contentId = content.get('id');
      let date = moment().format('YYYY-MM-DD');
      component
        .get('classActivityService')
        .addActivityToClass(classId, contentId, contentType, date)
        .then(function() {
          content.set('isAdded', true);
        });
    },

    /**
     * Action get triggered when schedule content to CA got clicked
     */
    onScheduleActivity(content, event) {
      const component = this;
      let datepickerEle = component.$('.schedule-ca-datepicker-container');
      let datepickerCtnEle = component.$(
        '.schedule-ca-datepicker-container .ca-date-picker-container'
      );
      datepickerCtnEle.removeClass('ca-datepicker-orientation-center ca-datepicker-orientation-top ca-datepicker-orientation-bottom');
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

    //Add activity to specific date
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
        .then(function() {
          if (!component.isDestroyed) {
            content.set('isAdded', true);
          }
        });
    },

    //Action triggered when schedule an activity to specific month
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
        .then(function() {
          if (!component.isDestroyed) {
            content.set('isAdded', true);
          }
        });
    },

    //Action triggered when choose a menu item
    onChooseMenuItem(menuItem) {
      const component = this;
      component.set('activeMenuItem', menuItem);
      component.set('page', 0);
      component.loadData();
      component.toggleMenuItem(menuItem);
      component.resetDatepickerPopover();
    },

    //Action triggered when close pullup
    onClosePullup() {
      const component = this;
      component.closePullUp();
    },

    //Action triggered when click on content wise filter
    onFilterBy(contentType) {
      const component = this;
      component.set('activeContentType', contentType);
      component.resetProperties();
      component.loadData();
    },

    //Action triggered when search by term
    onSearchActivities() {
      const component = this;
      if (component.get('isValidSearchTerm')) {
        component.loadData();
      }
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Boolean} showPullUp
   * Property to show/hide pullup
   */
  showPullUp: false,

  /**
   * @property {String} activeContentType
   * Property to hold active content type
   */
  activeContentType: 'assessment',

  /**
   * @property {Array} contentList
   * Property to hold list of contents from library
   */
  contentList: Ember.A([]),

  /**
   * @property {Number} page
   * Property to hold page number
   */
  page: 0,

  /**
   * @property {Number} pageSize
   * Property to hold pageSize
   */
  pageSize: 10,

  /**
   * @property {Array} contentTypes
   * Property to hold list of conten types
   */
  contentTypes: SEARCH_FILTER_BY_CONTENT_TYPES,

  /**
   * @property {String} activitySearchTerm
   * Property to hold entered search term
   */
  activitySearchTerm: null,

  /**
   * @property {Array} menuItems
   * Property to hold list of menu items
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
   * @property {Object} activeMenuItem
   * Property to hold active menu item
   */
  activeMenuItem: Ember.computed('menuItems.@each.selected', function() {
    let menuItems = this.get('menuItems');
    return menuItems.findBy('selected', true);
  }),

  /**
   * @property {Boolean} isShowCourseMapContents
   * Property to show/hide course map container
   */
  isShowCourseMapContents: false,

  /**
   * @property {Boolean} isValidSearchTerm
   * Property to to validate search term
   */
  isValidSearchTerm: Ember.computed('activitySearchTerm', function() {
    const component = this;
    let activitySearchTerm = component.get('activitySearchTerm');
    return activitySearchTerm ? activitySearchTerm.length >= 3 : false;
  }),
  //--------------------------------------------------------------------------
  // Methods

  /**
   * Function to animate the  pullup from bottom to top
   */
  openPullUp() {
    const component = this;
    component.$().animate(
      {
        top: '10%'
      },
      400
    );
  },

  /**
   * @function closePullUp
   * Method to close pullup
   */
  closePullUp() {
    const component = this;
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

  /**
   * @function loadData
   * Method to load data
   */
  loadData() {
    const component = this;
    let activeLibraryType = component.get('activeMenuItem.key');
    component.set('isLoading', true);
    if (activeLibraryType === 'courseMap') {
      component.set('isLoading', false);
      component.set('isShowCourseMapContents', true);
    } else if (activeLibraryType === 'myContent') {
      component.fetchMyContents().then(function(contentList) {
        component.set('contentList', contentList);
        component.incrementProperty('page');
        component.set('isLoading', false);
      });
    } else {
      component.fetchSearchContents().then(function(contentList) {
        component.set('contentList', contentList);
        component.incrementProperty('page');
        component.set('isLoading', false);
      });
    }
  },

  /**
   * @function fetchClassActivities
   * Method to fetch list of activities
   */
  fetchClassActivities() {
    const component = this;
    const classActivityService = component.get('classActivityService');
    const classId = component.get('classId');
    let activeMonth = component.get('activeMonth');
    let activeYear = component.get('activeYear');
    return Ember.RSVP.hash({
      classActivities: classActivityService.findClassActivities(classId, null, activeMonth, activeYear)
    })
      .then(({classActivities}) => {
        return classActivities;
      });
  },

  /**
   * @function fetchSearchContents
   * Method to fetch contents from search library
   */
  fetchSearchContents() {
    const component = this;
    const searchService = component.get('searchService');
    let params = {
      page: component.get('page'),
      pageSize: component.get('pageSize')
    };
    let activeContentType = component.get('activeContentType');
    let filters = {
      'flt.grade': component.get('classData.grade') || null,
      'flt.subject': component.get('classData.subject') || null,
      'flt.gutCode': component.get('competencyData.competencyCode')
    };
    let term = component.get('activitySearchTerm') || '*';
    params.filters = filters;
    if (activeContentType === 'assessment') {
      return searchService.searchAssessments(term, params);
    } else {
      return searchService.searchCollections(term, params);
    }
  },


  /**
   * @function fetchMyContents
   * Method to fetch my contents
   */
  fetchMyContents() {
    let component = this;
    let currentUserId = component.get('session.userId');
    let activeContentType = component.get('activeContentType');
    let params = {
      page: component.get('page'),
      pageSize: component.get('pageSize')
    };
    let term = component.get('activitySearchTerm');
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

  /**
   * @function doHandleSearchEvent
   * Method to handle search event
   */
  doHandleSearchEvent() {
    const component = this;
    component.$('.activity-search-term').on('keyup', function(event) {
      if (event.keyCode === KEY_CODES.ENTER && component.get('isValidSearchTerm')) {
        component.loadData();
      }
    });
  },

  /**
   * @function serializerSearchContent
   * Method to serialize search content
   */
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

  /**
   * @function createMenuItem
   * Method to create menu item
   */
  createMenuItem(key, label, selected) {
    return Ember.Object.create({
      key,
      label,
      selected
    });
  },

  /**
   * @function toggleMenuItem
   * Method to toggle menu item
   */
  toggleMenuItem(menuItem) {
    const component = this;
    let menuItems = component.get('menuItems');
    let currentMenuItem = menuItems.findBy('selected', true);
    currentMenuItem.set('selected', false);
    menuItem.set('selected', true);
    if (menuItem.get('key') !== 'courseMap') {
      component.set('isShowCourseMapContents', false);
    }
  },

  /**
   * @function closeCADatePickerOnScroll
   * Method to close datepicker
   */
  closeCADatePickerOnScroll() {
    const component = this;
    component.$('.body-container').on('scroll', function() {
      if (Ember.$('.ca-datepicker-popover-container').is(':visible')) {
        component.resetDatepickerPopover();
      }
    });
  },

  /**
   * @function resetDatepickerPopover
   * Method to reset datepicker
   */
  resetDatepickerPopover() {
    const component = this;
    component.$('.ca-datepicker-popover-container').hide();
    component.$('.ca-datepicker-popover').removeClass('active');
  },

  /**
   * @function resetProperties
   * Method to reset component properties
   */
  resetProperties() {
    const component = this;
    component.set('page', 0);
    component.set('contentList', Ember.A());
  }
});
