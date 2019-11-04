import Ember from 'ember';
import ConfigurationMixin from 'gooru-web/mixins/configuration';
import { isNumeric } from 'gooru-web/utils/math';

/**
 * Teacher class navigation
 *
 * Component responsible for enabling more flexible navigation options for the teacher class.
 * For example, where {@link teacher/class/gru-class-nav-bar.js}} allows access the teacher class information and navigate through the menu options.
 * @module
 * @see controllers/teacher/class.js
 * @augments ember/Component
 */
export default Ember.Component.extend(ConfigurationMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-class-navbar', 'teacher'],

  /**
   * Controls display of notification list, typical use from header is to hide it as required.
   */
  displayNotificationList: null,

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Class} class
   */
  class: null,

  /**
   * @property {SecondaryClass} secondaryClass
   */
  selectedSecondaryClass: null,

  /**
   * @property {String|Function} onItemSelected - event handler for when an menu item is selected
   */
  onItemSelected: null,

  /**
   * @property {String} selectedMenuItem - menu Item selected
   */
  selectedMenuItem: null,

  /**
   * @property {boolean|Function} onCollapseExpandClicked - event handler for when the toggle button is clicked
   */
  onCollapseExpandClicked: null,

  /**
   * @property {boolean} toggleState - indicates the toggle button state, false means open, true means closed
   */
  toggleState: false,

  navTitle: null,

  /**
   * @property {Boolean}
   * Computed property  to identify class CM is started or not
   */
  hasCMStarted: Ember.computed('class.performanceSummary', function() {
    const scorePercentage = this.get('class.performanceSummary.score');
    return scorePercentage !== null && isNumeric(scorePercentage);
  }),

  /**
   * @property {Object}
   * property  performanceSummaryForDCA
   */
  performanceSummaryForDCA: null,

  /**
   * @property {Boolean}
   * Computed property  to identify class CA is started or not
   */
  hasCAStarted: Ember.computed('performanceSummaryForDCA', function() {
    const scorePercentage = this.get(
      'performanceSummaryForDCA.performance.scoreInPercentage'
    );
    return scorePercentage !== null && isNumeric(scorePercentage);
  }),

  isPrimaryClass: Ember.computed('selectedSecondaryClass', 'class', function() {
    let secondaryClass = this.get('selectedSecondaryClass.isSecondaryClass')
      ? this.get('selectedSecondaryClass')
      : null;
    let primaryClass = secondaryClass
      ? secondaryClass.get('id') === this.get('class.id')
      : true;
    return primaryClass;
  }),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    onOpenCourseReport() {
      let component = this;
      component.sendAction('onOpenCourseReport');
    },

    onOpenPerformanceReport() {
      let component = this;
      if (component.get('isPremiumClass')) {
        component.sendAction('onOpenCompetencyReport');
      } else {
        component.sendAction('onOpenCourseReport');
      }
    },

    onOpenOCAReport() {
      let component = this;
      component.sendAction('onOpenOCAReport');
    },

    /**
     *
     * Triggered when an menu item is selected
     * @param item
     */
    selectItem: function(item) {
      let isPremiumClass = this.get('isPremiumClass');
      if (item !== this.get('selectedMenuItem')) {
        this.set('selectedSecondaryClass', null);
      }
      if (this.get('onItemSelected')) {
        if (!(item === 'performance' && isPremiumClass)) {
          this.selectItem(item);
        }
        this.sendAction('onItemSelected', item);
      }
    },

    /**
     * Triggered when a menu item is selected. Set the class icon for the item selected showing in the mobiles dropdown menu.
     */
    toggleHeader: function() {
      this.set('toggleState', !this.get('toggleState'));
      if (this.onCollapseExpandClicked) {
        this.sendAction('onCollapseExpandClicked', this.get('toggleState'));
      }
    },

    closeNotificationList() {
      this.set('displayNotificationList', false);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * DidInsertElement ember event
   */
  didInsertElement: function() {
    this._super(...arguments);
    const { getOwner } = Ember;
    let currentPath = getOwner(this).lookup('controller:application')
      .currentPath;
    let component = this;
    if (currentPath === 'teacher.class.students') {
      component.set('selectedMenuItem', 'students');
    } else if (currentPath === 'teacher.class.course-map') {
      component.set('selectedMenuItem', 'course-map');
    } else if (currentPath === 'teacher.class.class-activities') {
      component.set('selectedMenuItem', 'class-activities');
    }

    var item = this.get('selectedMenuItem');
    this.selectItem(item);
    Ember.$('header.gru-header').hide();
  },

  didRender() {
    const component = this;
    component.$('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
  },

  willDestroyElement() {
    this._super(...arguments);
    this.set('selectedMenuItem', null);
    Ember.$('header.gru-header').show();
  },

  // -------------------------------------------------------------------------
  // Observers
  /**
   * Refreshes the left navigation with the selected menu item
   */
  refreshSelectedMenuItem: function() {
    var item = this.get('selectedMenuItem');
    this.selectItem(item);
  }.observes('selectedMenuItem'),

  // -------------------------------------------------------------------------

  // Methods
  /**
   * Triggered when a menu item is selected. Set the class icon for the item selected showing in the mobiles dropdown menu.
   * @param {string} item
   */
  selectItem: function(item) {
    if (item) {
      let itemElement = `.${item}`;
      this.$('.tab').removeClass('vactive');
      this.$(itemElement).addClass('vactive');
    }
  }
});
