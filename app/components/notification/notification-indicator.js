import Ember from 'ember';
import {
  NOTIFICATION_SETTINGS,
  PLAYER_EVENT_SOURCE,
  ROLES
} from 'gooru-web/config/config';

const notificationAccesor = {
  class: 'active-study',
  global: 'active-common'
};

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  notificationService: Ember.inject.service('api-sdk/app-notification'),

  /**
   * Logged in user session object
   * @type {Session}
   */
  session: Ember.inject.service(),

  classNames: ['notification'],

  // -------------------------------------------------------------------------
  // Dispaly properties

  /**
   * @property {string} current page index string returned by notification.boundry
   * needed by notifion api for calulating next page and has more data, is a factor of limit
   */
  currentPageIndex: Ember.computed.alias('notificationModel.boundary'),

  /**
   * @property {Number} number of rows to be returned by notification
   */
  rowsPerPage: NOTIFICATION_SETTINGS.page_size,

  hasActiveNotifications: Ember.computed(
    'notificationModel',
    'notificationModel.notifications',
    'notificationModel.moreItemsRemaining',
    function() {
      let actvnot =
        this.notificationModel &&
        this.notificationModel.notifications &&
        this.notificationModel.notifications.length > 0;
      return actvnot;
    }
  ),

  /**
   * @property {boolean}, controls display of notification list
   */
  displayNotificationList: false,

  notifcationCountIndicator: '',

  notifcationCount: Ember.computed(
    'notificationModel.moreItemsRemaining',
    function() {
      const component = this;
      let actvnot =
          component.notificationModel &&
          component.notificationModel.notifications &&
          component.notificationModel.notifications.length > 0
            ? component.notificationModel.notifications.length
            : 0,
        notnCnt = 0,
        displyNotn = '';

      // More than rows per page limit, display rows per page
      if (
        component.get('moreItemsRemaining') &&
        component.get('hasActiveNotifications')
      ) {
        notnCnt = component.get('rowsPerPage');
        displyNotn = `${notnCnt}+`;
      } else if (
        !component.get('moreItemsRemaining') &&
        component.get('hasActiveNotifications')
      ) {
        // // More than rows per page limit, but has a few row, display actual rows
        notnCnt = actvnot;
        displyNotn = `${notnCnt}`;
      }
      component.set('notifcationCountIndicator', displyNotn);
      return notnCnt;
    }
  ),

  /**@constant {mapobject}
   * Provides mappings between notifications and there addressable actions, such as navigate
   * also provides config if dismissed after action taken
   */
  notificationAddressAction: {
    notificationTypes: [
      {
        type: 'teacher.suggestion',
        action: 'explore',
        actionType: 'navigate',
        postActionHook: {
          dismissPopupAfterAction: true,
          deletenotificationuponaction: false,
          refreshAfterDeleteNotification: true,
          navigate: true,
          navigationDetails: {
            route: 'study-player',
            exactparams: 'courseId',
            queryPType: 'hybrid',
            queryparams: {
              courseId: 0,
              classId: 0,
              unitId: 0,
              lessonId: 0,
              collectionId: 0,
              role: ROLES.STUDENT,
              source: PLAYER_EVENT_SOURCE.COURSE_MAP,
              type: null,
              itemId: 0,
              itemType: '',
              subtype: null,
              pathId: 0,
              minScore: 0,
              collectionSource: 'course_map',
              isStudyPlayer: true,
              pathType: '',
              isNotification: true
            }
          }
        }
      },
      {
        type: 'teacher.override',
        action: 'explore',
        actionType: 'navigate',
        postActionHook: {
          dismissPopupAfterAction: true,
          deletenotificationuponaction: true,
          refreshAfterDeleteNotification: false,
          navigate: true,
          navigationDetails: {
            route: 'student.class.course-map',
            queryPType: 'hybrid',
            exactparams: 'classId',
            setlocation: true,
            queryparams: {
              classId: 0,
              unitId: 0,
              lessonId: 0,
              collectionId: 0,
              tab: 'assesmentreport',
              location: 'unitId+lessonId+collectionId+currentItemType',
              refresh: true
            }
          }
        }
      },
      {
        type: 'teacher.grading.complete',
        action: 'explore',
        actionType: 'navigate',
        postActionHook: {
          dismissPopupAfterAction: true,
          deletenotificationuponaction: true,
          refreshAfterDeleteNotification: false,
          navigate: true,
          navigationDetails: {
            route: 'student.class.course-map',
            queryPType: 'hybrid',
            exactparams: 'classId',
            setlocation: true,
            queryparams: {
              classId: 0,
              unitId: 0,
              lessonId: 0,
              collectionId: 0,
              tab: 'assesmentreport',
              location: 'unitId+lessonId+collectionId+currentItemType'
            }
          }
        }
      },
      {
        type: 'student.self.report',
        action: 'explore',
        actionType: 'navigate',
        postActionHook: {
          dismissPopupAfterAction: true,
          deletenotificationuponaction: true,
          refreshAfterDeleteNotification: false,
          navigate: true,
          navigationDetails: {
            route: 'teacher.class.course-map',
            queryPType: 'hybrid',
            exactparams: 'classId',
            setlocation: true,
            queryparams: {
              classId: 0,
              unitId: 0,
              lessonId: 0,
              collectionId: 0,
              tab: 'assesmentreport',
              location: 'unitId+lessonId+collectionId+currentItemType'
            }
          }
        }
      },
      {
        type: 'student.gradable.submission',
        action: 'explore',
        actionType: 'navigate',
        postActionHook: {
          dismissPopupAfterAction: true,
          deletenotificationuponaction: false,
          navigate: true,
          navigationDetails: {
            route: 'teacher.class.course-map',
            queryPType: 'paramonly',
            exactparams: 'classId',
            queryparams: {
              classId: 0
            }
          }
        }
      }
    ]
  },

  /**
   * @property {string} current page index string returned by notification.boundry
   * needed by notifion api for calulating next page and has more data, is a factor of limit
   */
  moreItemsRemaining: Ember.computed.alias(
    'notificationModel.moreItemsRemaining'
  ),

  /**
   * Model is as is given by the API, extract display model data model
   * Update dataModel with each fetch
   * Compute display model for changes, setting moreItemsRemaining
   */
  notificationModel: {},

  timer: null,

  init() {
    this._super(...arguments);
    this.model = this.model || {
      notificationlocation: notificationAccesor.global
    };

    const component = this;
    component.getNotifications(component.getDefaultFilter()); // Initial call, all the rest calls would be made with the setinterval
    this.timer = setInterval(() => {
      component.getNotifications(component.getDefaultFilter()); //Force default filter for first time load and refresh
    }, NOTIFICATION_SETTINGS.polling_interval);
  },

  // -------------------------------------------------------------------------
  // Location based setting [starts]
  // -------------------------------------------------------------------------

  /**
   * @property {string}
   * Context in which notification is loaded student/teacher
   */
  notificationCtxRole: Ember.computed(function() {
    const component = this;
    let userrole = component.get('session').get('role');
    userrole =
      userrole === 'teacher' || userrole === 'student' ? userrole : null; // Don't show notifications of user role is not student or teacher
    return userrole;
  }),

  model: null,

  /**
   * Takes action on the notification
   * Refresh UI upon success, to remove the acted notification
   * @param notification item model
   */
  //updateNotification(notiticationItem) {},

  activeNotificationsChanged: Ember.computed(
    'hasActiveNotifications',
    function() {
      this.model.hasActiveNotifications = this.get('hasActiveNotifications');
    }
  ),

  /**
   * @property {boolean} Indicates if the accessor path
   */
  accessorClass: Ember.computed('model.notificationlocation', {
    get() {
      return notificationAccesor[this.get('model.notificationlocation')];
    },
    set(key, value) {
      if (!this.get('model')) {
        this.set('model', {});
      }
      this.set('model.isClass', value);
      this.set('inClass', true);
      return this.set('model.notificationlocation', notificationAccesor[value]);
    }
  }),

  // -------------------------------------------------------------------------
  // Location based setting [ends]
  // -------------------------------------------------------------------------

  // -------------------------------------------------------------------------
  // actions
  actions: {
    showNotificationList() {
      const component = this;
      component.set('displayNotificationList', true);
      component.getNotifications(component.getDefaultFilter()); //Force default filter for first time load
    },
    /**
     * Concrete notification action
     * @param {notifiocationItem object} notin
     */
    dismissNotifiocation(notin) {
      const component = this;
      if (notin && component.get('notificationCtxRole')) {
        let serviceEndpoint =
          component.get('notificationCtxRole') === 'student'
            ? component
              .get('notificationService')
              .resetStudentNotifcation(notin.id)
            : component
              .get('notificationService')
              .resetTeacherNotifcation(notin.id);
        return serviceEndpoint;
        //}
      }
    },

    /**
     * Get fetch data, and updates current data model. Data is fetched based existing filters

     */
    showMore() {
      const component = this;
      return component.getNotifications();
    },

    closeNotificationList() {
      const component = this;
      let dataModel = component.get('notificationModel');
      if (dataModel && dataModel.notifications) {
        dataModel.notifications.clear();
      }
      component.set('notificationModel', dataModel);
      component.set('displayNotificationList', false);
    }
  },
  // -------------------------------------------------------------------------
  // actions -handlers
  /**
   * Makes Service Call refresh the list of notifications,
   * This should also update the indicator, by computing number of items to be displayed on indicator
   */
  getNotifications(dataFilter) {
    const component = this;
    if (!component.get('notificationCtxRole')) {
      return; //Don't fetch any notifications if user role is null
    }
    let notinPromise;
    let showMoreFlow = !dataFilter;
    dataFilter = dataFilter || component.getDataFilter();
    if (component.get('notificationCtxRole') === 'student') {
      notinPromise = component
        .get('notificationService')
        .studentFetch(dataFilter);
    } else {
      notinPromise = component
        .get('notificationService')
        .teacherFetch(dataFilter);
    }
    notinPromise.then(function(data) {
      let notndatamodel = {},
        notndetail = [];
      Object.assign(notndatamodel, component.get('notificationModel') || {});
      Object.assign(
        notndetail,
        component.get('notificationModel') &&
          component.get('notificationModel').notifications
          ? component.get('notificationModel').notifications
          : {}
      );
      let newDataModel = {},
        newNotificationDetails = [];

      Object.assign(newNotificationDetails, data.notifications);
      Object.assign(newDataModel, data);
      let concatAndDeDuplicateObjects = (p, ...arrs) =>
        []
          .concat(...arrs)
          .reduce(
            (a, b) => (!a.filter(c => b[p] === c[p]).length ? [...a, b] : a),
            []
          );

      var ndt = showMoreFlow
        ? concatAndDeDuplicateObjects('id', notndetail, newNotificationDetails)
        : newNotificationDetails;

      if (!(component.get('isDestroyed') || component.get('isDestroying'))) {
        newDataModel.notifications = ndt;
        component.set('notificationModel', newDataModel);
      }
    });
  },

  /**
   * Gets active data filter options and return data fitler object
   * @returns{object  { classId: '', limit: 10, boundary: null } } filters
   */
  getDataFilter() {
    const component = this;
    let filter = { classId: '', limit: 2, boundary: '' };
    filter.boundary =
      component.notificationModel && component.notificationModel.boundary
        ? component.notificationModel.boundary
        : '';
    filter.limit = component.get('rowsPerPage');
    filter.classId =
      component.get('model.isClass') && component.get('classId')
        ? component.get('classId')
        : ''; // from page Options passed to instance

    return filter;
  },

  /**
   * Gets active data filter options and return data fitler object
   * @returns{object  { classId: '', limit: 10, boundary: null } } filters
   */
  getDefaultFilter() {
    const component = this;
    let filter = { classId: '', limit: 2, boundary: '' };
    filter.classId =
      component.get('model.isClass') && component.get('classId')
        ? component.get('classId')
        : ''; // from page Options passed to instance
    filter.limit = component.get('rowsPerPage');
    return filter;
  },

  destroy() {
    this._super(...arguments);
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
});
