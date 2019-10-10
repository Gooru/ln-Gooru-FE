import Ember from 'ember';
import { CONTENT_TYPES } from 'gooru-web/config/config';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['portfolio', 'gru-contents-panel'],

  classNameBindings: ['isExpanded:expanded-panel'],

  // -------------------------------------------------------------------------
  // Dependencies
  session: Ember.inject.service('session'),

  portfolioService: Ember.inject.service('api-sdk/portfolio'),

  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    const component = this;
    let appliedFilters = component.get('appliedFilters');
    const activeSubject = component.get('subject');
    const activeDomain = component.get('domain');
    const activeCompetency = component.get('competency');
    appliedFilters.subjectCode = activeSubject
      ? activeSubject.get('code')
      : undefined;
    appliedFilters.domainCode = activeDomain
      ? activeDomain.get('domainCode')
      : undefined;
    appliedFilters.gutCode = activeCompetency
      ? activeCompetency.get('competencyCode')
      : undefined;
    component.loadPortfolioActivities(appliedFilters);
    component.scrollHandler();
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    //Action triggered when clicking filter icon
    onOpenFilter() {
      const component = this;
      component.toggleProperty('isShowContentFilters');
    },

    //Action triggered when apply updated filters
    refreshFilters(appliedFilters) {
      const component = this;
      component.set('offset', 0);
      component.$('.portfolio-contents-container .body-container').scrollTop(0);
      component.loadPortfolioActivities(appliedFilters);
      component.toggleProperty('isShowContentFilters');
    },

    //Action triggered when clear filters
    clearFilters() {
      const component = this;
      component.loadPortfolioActivities();
    },

    //Action triggered while toggling body container
    onToggleContainer() {
      const component = this;
      component.$('.body-container').slideToggle();
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {UUID} userId
   * Active userID should be student
   */
  userId: Ember.computed(function() {
    return this.get('session.userId');
  }),

  /**
   * @property {Boolean} isShowContentFilters
   * Property to show/hide content filters
   */
  isShowContentFilters: false,

  /**
   * @property {Object} filters
   */
  filters: {},

  /**
   * @property {Date} userCreatedAt
   * Property for date of when user has created
   */
  userCreatedAt: Ember.computed('userProfile.createdAt', function() {
    return moment(this.get('userProfile.createdAt')).format('YYYY-MM-DD');
  }),

  /**
   * @property {Object} appliedFilters
   * Property for currently applied filters
   */
  appliedFilters: {},

  /**
   * @property {Number} offset
   * Property for active offset of content list
   */
  offset: 0,

  /**
   * @property {Number} limit
   * Property for limit to be fetched for content list
   */
  limit: 10,

  /**
   * @property {Array} studiedPortfolioActivities
   * Property for list of studied activities
   */
  studiedPortfolioActivities: Ember.A([]),

  /**
   * @property {Boolean} isFetchedAllContent
   * Property to check whether all contents are fetched or not
   */
  isFetchedAllContent: false,

  /**
   * @property {Boolean} isLoadingMore
   * Prperty to check whether loading more contents or not
   */
  isLoadingMore: false,

  /**
   * @property {String} activeContentLabel
   * Property for active content type label
   */
  activeContentLabel: Ember.computed(function() {
    const component = this;
    const contentType = component.get('contentType');
    const localString =
      contentType === CONTENT_TYPES.OFFLINE_ACTIVITY
        ? 'common.offline-activites'
        : contentType === CONTENT_TYPES.ASSESSMENT
          ? 'common.assessments'
          : 'common.collections';
    return component.get('i18n').t(localString);
  }),

  /**
   * @property {Boolean} isExpanded
   * Property to toggle the container between expanded/collapsed state
   */
  isExpanded: true,

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function loadPortfolioActivities
   * @param {Object} filters
   * Method to load student studied items
   */
  loadPortfolioActivities(filters) {
    const component = this;
    const contentType = component.get('contentType');
    let studiedPortfolioActivities = component.get(
      'studiedPortfolioActivities'
    );
    component.set('isLoading', true);
    Ember.RSVP.hash({
      portfolioContents: component.fetchPotfolioItems(filters, contentType)
    }).then(({ portfolioContents }) => {
      if (filters && !component.get('isLoadingMore')) {
        studiedPortfolioActivities = Ember.A([]);
        component.set('totalStudiedActivities', 0);
      }
      if (contentType === CONTENT_TYPES.OFFLINE_ACTIVITY) {
        component.parseStudiedOfflineActivities(
          studiedPortfolioActivities,
          portfolioContents
        );
      } else {
        if (!component.isDestroyed) {
          studiedPortfolioActivities = studiedPortfolioActivities.concat(
            portfolioContents
          );
          component.set(
            'totalStudiedActivities',
            studiedPortfolioActivities.length
          );
          component.set(
            'studiedPortfolioActivities',
            studiedPortfolioActivities
          );
          component.set(
            'isFetchedAllContent',
            portfolioContents.length < component.get('limit')
          );
          component.set('isLoading', false);
          component.set('isLoadingMore', false);
        }
      }
    });
  },

  /**
   * @function parseStudiedOfflineActivities
   * @param {Array} studiedActivities
   * @param {Object} studiedActivities
   * Method to parse offline activities contents and group them by sub type
   */
  parseStudiedOfflineActivities(
    studiedPortfolioActivities = Ember.A([]),
    studiedActivities
  ) {
    const component = this;
    const offlineActivitySubtypes = Object.keys(studiedActivities);
    let totalStudiedActivities = component.get('totalStudiedActivities') || 0;
    let totalFetchedActitivities = 0;
    let parsedOfflineActivities = Ember.A([]);

    offlineActivitySubtypes.map(subType => {
      let offlineActivities = studiedActivities[subType];
      totalFetchedActitivities += offlineActivities.length;
      parsedOfflineActivities.pushObject(
        Ember.Object.create({
          label: `common.subtask.${subType}`,
          offlineActivities
        })
      );
    });
    if (!component.isDestroyed) {
      studiedPortfolioActivities = studiedPortfolioActivities.concat(
        parsedOfflineActivities
      );
      component.set('studiedPortfolioActivities', studiedPortfolioActivities);
      component.set(
        'totalStudiedActivities',
        totalStudiedActivities + totalFetchedActitivities
      );
      component.set(
        'isFetchedAllContent',
        totalFetchedActitivities.length < component.get('limit')
      );
      component.set('isLoading', false);
      component.set('isLoadingMore', false);
    }
  },

  /**
   * @function fetchPotfolioItems
   * @param {Object} filters
   * @param {String} activityType
   * Method to fetch portfolio items by given content type
   */
  fetchPotfolioItems(filters = {}, activityType) {
    const component = this;
    const portfolioService = component.get('portfolioService');
    const userId = component.get('userId');
    const offset = component.get('offset');
    const limit = component.get('limit');
    const requestParam = {
      userId,
      activityType,
      offset,
      limit
    };
    filters = Object.assign(filters, requestParam);
    let contentBase = component.getContentBaseByFilter(filters);
    return portfolioService.getUserPortfolioUniqueItems(filters, contentBase);
  },

  /**
   * @function getContentBaseByFilter
   * @param {Object} filters
   * @return {String}
   * Method to get content base which is required for calling appropriate api based on applied filters
   */
  getContentBaseByFilter(filters) {
    let contentBase = 'content';
    if (filters.gutCode && filters.gutCode !== '') {
      contentBase = 'competency';
    } else if (filters.domainCode && filters.domainCode !== '') {
      contentBase = 'domain';
    } else if (filters.subjectCode && filters.subjectCode !== '') {
      contentBase = 'subject';
    }
    return contentBase;
  },

  /**
   * @func scrollHandler
   * Method to handle scrolling event of body container
   */
  scrollHandler() {
    const component = this;
    component
      .$('.portfolio-contents-container .body-container')
      .on('scroll', function() {
        if (
          !component.get('isFetchedAllContent') &&
          !component.get('isLoading')
        ) {
          const innerHeight = component.$(this).innerHeight();
          const scrollTop = component.$(this).scrollTop();
          const scrollHeight = component.$(this)[0].scrollHeight;
          if (scrollTop + innerHeight >= scrollHeight - 100) {
            component.incrementProperty('offset', 10);
            component.set('isLoadingMore', true);
            component.loadPortfolioActivities(component.get('appliedFilters'));
          }
        }
      });
  }
});
