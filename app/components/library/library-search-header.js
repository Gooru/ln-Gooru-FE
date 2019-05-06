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

  classNames: ['library-search-header'],

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  /**
   * @property {Array} filterByList
   * Property to store filter-by list
   */
  filterByList: null,

  /**
   * @property {Object} selectedFilters
   * Property to store selected filters
   */
  selectedFilters: null,

  /**
   * @property {Boolean} isShow
   * Property to toggle filter view
   */
  isShow: false,

  /**
   * @property {Boolean} isMobileView
   * Property to store isMobile view or not
   */
  isMobileView: isCompatibleVW(SCREEN_SIZES.MEDIUM),

  /**
   * @property {Number} selectedFiltersLimit
   * Property to hold limit of selected filters to show
   */
  selectedFiltersLimit: Ember.computed('isMobileView', function() {
    return this.get('isMobileView') ? 7 : 5;
  }),

  /**
   * @property {Observe} onSelectFilter
   */
  onSelectFilter: Ember.observer('selectedFilters.[]', function() {
    let component = this;
    let selectedFilters = component.get('selectedFilters');
    let selectedFiltersLimit = component.get('selectedFiltersLimit');
    if (selectedFilters.length < selectedFiltersLimit) {
      component.set('filters', selectedFilters);
    } else {
      component.set('filters', selectedFilters.slice(0, selectedFiltersLimit));
      component.set(
        'moreFilters',
        selectedFilters.slice(selectedFiltersLimit, selectedFilters.length)
      );
    }
  }),

  actions: {
    /**
     * Action get triggered when filter button is clicked
     */
    toggleSearchFilter() {
      let component = this;
      component.toggleProperty('isShow');
    },

    /**
     * Action get triggered when clear button is clicked
     */
    clearFilter(item) {
      const component = this;
      if (item.get('filter') === 'flt.standard') {
        component.set('unCheckedItem', item);
      }
      component.get('selectedFilters').removeObject(item);
      component.send('searchContent');
    },
    /**
     * Action get triggered when search button is clicked
     */
    searchContent() {
      const component = this;
      component.sendAction('onSearch', component.get('searchTerm'));
    },

    /**
     * Action get triggered when user select on content type filter
     */
    onSelectFilterBy(item) {
      const component = this;
      component.get('selectedResourceTypes').clear();
      component.get('selectedQuestionTypes').clear();
      component.set('activeContentType', item.get('type'));
      component.send('searchContent');
    },

    showModal(item) {
      let component = this;
      component.sendAction('onShowModal', item);
    },

    selectResourceOption(item) {
      let component = this;
      let selectedResourceTypes = component.get('selectedResourceTypes');
      if (selectedResourceTypes.includes(item)) {
        selectedResourceTypes.removeObject(item);
      } else {
        selectedResourceTypes.pushObject(item);
      }
      component.send('searchContent');
    },

    selectQuestionOption(item) {
      let component = this;
      let selectedQuestionTypes = component.get('selectedQuestionTypes');
      if (selectedQuestionTypes.includes(item)) {
        selectedQuestionTypes.removeObject(item);
      } else {
        selectedQuestionTypes.pushObject(item);
      }
      component.send('searchContent');
    },

    goBack() {
      const component = this;
      if (component.get('useBackUrl')) {
        window.history.back();
      } else {
        component.get('router').transitionTo('library');
      }
    }
  },

  init() {
    const component = this;
    component._super(...arguments);
    component.loadFilters();
  },

  didRender() {
    const component = this;
    component.initializePopover();
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Method to initialize popover
   */
  initializePopover() {
    const component = this;
    component.$('.more-pointer').popover({
      html: true,
      trigger: 'click',
      animation: true,
      placement: 'auto',
      content: () => {
        return component.$('.more-filters').html();
      }
    });
    component.$(document).click(function(event) {
      if (event.target.className !== 'more-pointer') {
        if (component.$('.more-pointer')) {
          component.$('.more-pointer').popover('hide');
        }
      }
    });
  },

  /**
   * Method to load filters
   */
  loadFilters() {
    const component = this;
    component.set('filterByList', component.getFilters());
  },

  /**
   * Method to perpare filter list
   */
  getFilters() {
    const component = this;
    return Ember.A([Ember.Object.create({
      label: component.get('i18n').t('search-filter.courses').string,
      type: 'course'
    }),
    Ember.Object.create({
      label: component.get('i18n').t('search-filter.collections').string,
      type: 'collection'
    }),
    Ember.Object.create({
      label: component.get('i18n').t('search-filter.assessments').string,
      type: 'assessment'
    }),
    Ember.Object.create({
      label: component.get('i18n').t('search-filter.resources').string,
      type: 'resource'
    }),
    Ember.Object.create({
      label: component.get('i18n').t('search-filter.questions').string,
      type: 'question'
    }),
    Ember.Object.create({
      label: component.get('i18n').t('search-filter.rubrics').string,
      type: 'rubric'
    })
    ]);
  }

});
