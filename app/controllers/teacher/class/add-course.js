import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @type {searchService} Search service object
   */
  searchService: Ember.inject.service('api-sdk/search'),

  /**
   * @type {libraryService} Library service object
   */
  libraryService: Ember.inject.service('api-sdk/library'),

  classService: Ember.inject.service('api-sdk/class'),

  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @type {ProfileService} Profile service object
   */
  profileService: Ember.inject.service('api-sdk/profile'),

  /**
   * classController
   */
  classController: Ember.inject.controller('teacher.class'),

  /**
   * @property {Controller} Application Controller
   */
  applicationController: Ember.inject.controller('application'),

  session: Ember.inject.service('session'),

  /**
   * @dependency {i18nService} Service to retrieve translations information
   */
  i18n: Ember.inject.service(),

  init() {
    let controller = this;
    controller.set('isLoading', true);
    controller.fetchFeaturedCourses();
    controller.fetchLibraries();
  },

  actions: {
    onAddCourse(courseId) {
      let controller = this;
      controller.addCourseToClass(courseId);
    },

    onRemixCourse(courseId) {
      let controller = this;
      controller.remixCourse(courseId);
    },

    onSelectCatalog(catalogLibrary) {
      let controller = this;
      let dataSource = catalogLibrary.id;
      if (dataSource === 'catalog') {
        controller.searchCourses().then(function(searchCourses) {
          controller.set('libraryCourses', searchCourses);
        });
      } else if (dataSource === 'content') {
        controller.getUserCourses().then(function(userCourses) {
          controller.set('libraryCourses', userCourses);
        });
      } else {
        controller.fetchLibraryCourses(dataSource).then(function(libraryCourses) {
          controller.set('libraryCourses', libraryCourses);
        });
      }
      controller.set('isShowSearchCoursePullUp', true);
      controller.set('selectedCatalog', catalogLibrary);
    },

    onSearchCourse(searchText) {
      let controller = this;
      let selectedCatalog = controller.get('selectedCatalog');
      let isCatalogSearch = selectedCatalog.id === 'catalog';
      if (isCatalogSearch) {
        controller.searchCourses(searchText).then(function(searchCourses) {
          controller.set('libraryCourses', searchCourses);
        });
      }
    },

    showMoreResults() {
      let controller = this;
      let contentCatalogs = controller.get('contentCatalogs');
      controller.set('catalogListToShow', contentCatalogs);
      controller.set('isShowMoreCatalogs', false);
    }
  },

  observeLibraries: Ember.observer('libraries', function() {
    let controller = this;
    let libraries = controller.get('libraries');
    let contentCatalogs = controller.get('contentCatalogs');
    contentCatalogs = contentCatalogs.concat(libraries);
    controller.set('contentCatalogs', contentCatalogs);
  }),

  isShowSearchCoursePullUp: false,

  /**
   * @property {Class}
   */
  class: Ember.computed.alias('classController.class'),

  classId: Ember.computed.alias('class.id'),

  userId: Ember.computed.alias('session.userId'),

  contentCatalogs: Ember.computed('applicationController', function() {
    let controller = this;
    let tenantLogo = controller.get('tenantLogo');
    let userAvatar = controller.get('userDetails.avatarUrl');
    return Ember.A([
      {
        id: 'catalog',
        name: 'Gooru Catalog',
        image: tenantLogo
      },
      {
        id: 'content',
        name: 'My Content',
        image: userAvatar
      }
    ]);
  }),

  catalogListToShow: Ember.computed('contentCatalogs', function() {
    let controller = this;
    let catalogListToShow = controller.get('contentCatalogs');
    if (catalogListToShow.length > 4) {
      catalogListToShow = catalogListToShow.slice(0, 4);
      controller.set('isShowMoreCatalogs', true);
    }
    return catalogListToShow;
  }),

  classGrade: Ember.computed('class', function() {
    let controller = this;
    let classData = controller.get('class');
    return classData.grade;
  }),

  tenantLogo: Ember.computed.alias('applicationController.tenant.theme.header.logo'),

  userDetails: Ember.computed.alias('applicationController.profile'),

  isShowMoreCatalogs: false,


  /**
   * Map each course to their corresponding owner
   * @param {Course[]} course list
   * @param {Owner[]} owner list
   */
  mapOwners: function(courses, owners) {
    let ownerMap = {};
    owners.forEach(function(owner) {
      ownerMap[owner.id] = owner;
    });
    let mappedCourses = courses.map(function(course) {
      course.owner = ownerMap[course.ownerId];
      return course;
    });
    return mappedCourses;
  },


  fetchFeaturedCourses() {
    let controller = this;
    let searchService = controller.get('searchService');
    let classGrade = controller.get('classGrade');
    let filters = {
      'flt.subject': null,
      'flt.grade': classGrade
    };
    return Ember.RSVP.hash({
      featuredCourses: Ember.RSVP.resolve(searchService.searchFeaturedCourses('*', filters))
    })
      .then(({featuredCourses}) => {
        controller.set('featuredCourses', featuredCourses);
        controller.set('isLoading', false);
      });
  },

  copyCourse(courseId) {
    let controller = this;
    let courseService = controller.get('courseService');
    return Ember.RSVP.hash({
      copiedCourse: Ember.RSVP.resolve(courseService.copyCourse(courseId))
    })
      .then(({copiedCourse}) => {
        console.log('copiedCourse', copiedCourse);
      });
  },

  remixCourse(courseId) {
    let controller = this;
    let classId = controller.get('classId');
    let classService = controller.get('classService');
    return controller.copyCourse().then(function(copiedCourseId) {
      return controller.addCourseToClass(classId, classId);
    });
  },

  addCourseToClass(courseId) {
    let controller = this;
    let classId = controller.get('classId');
    let classService = controller.get('classService');
    return Ember.RSVP.resolve(classService.associateCourseToClass(courseId, classId));
  },

  fetchLibraries() {
    let controller = this;
    let libraryService = controller.get('libraryService');
    return Ember.RSVP.hash({
      libraries: Ember.RSVP.resolve(libraryService.fetchLibraries())
    })
      .then(({libraries}) => {
        controller.set('libraries', libraries);
      });
  },

  getUserCourses() {
    let controller = this;
    let params = {
      pageSize: 20
    };
    let profileService = controller.get('profileService');
    let userDetails = controller.get('userDetails');
    console.log('userDetails', userDetails);
    return Ember.RSVP.hash({
      userCourses: Ember.RSVP.resolve(profileService.getCourses(userDetails, params))
    })
      .then(({userCourses}) => {
        return userCourses;
      });
  },

  searchCourses(filters = '*') {
    let controller = this;
    let searchService = controller.get('searchService');
    return Ember.RSVP.hash({
      catalogCourses: Ember.RSVP.resolve(searchService.searchCourses(filters))
    })
      .then(({catalogCourses}) => {
        return catalogCourses;
      });
  },

  fetchLibraryCourses(libraryId) {
    let controller = this;
    let libraryService = controller.get('libraryService');
    let pagination = {
      pageSize: 10
    };
    return Ember.RSVP.hash({
      libraryContents: Ember.RSVP.resolve(libraryService.fetchLibraryContent(libraryId, 'course', pagination))
    })
      .then(({libraryContents}) => {
        let libraryContent = libraryContents.libraryContent;
        return controller.mapOwners(libraryContent.courses, libraryContent.ownerDetails);
      });
  }
});
