import Ember from 'ember';
import { isNumeric } from 'gooru-web/utils/math';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-study-navbar'],

  // -------------------------------------------------------------------------
  // Dependencies

  session: Ember.inject.service('session'),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Controls display of notification list, typical use from header is to hide it as required.
   */
  displayNotificationList: null,

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     *
     * Triggered when an menu item is selected
     * @param item
     */
    selectItem: function(item) {
      let component = this;
      if (component.get('onItemSelected')) {
        component.selectItem(item);
        if (item === 'class-info') {
          Ember.$('.classroom-information').toggle(
            {
              direction: 'left'
            },
            1000
          );
        } else {
          component.sendAction('onItemSelected', item);
        }
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

    /**
     * Action triggered when click brand logo
     */
    onCloseStudyClassPlayer() {
      Ember.$('body')
        .removeClass('fullscreen')
        .removeClass('fullscreen-exit');
      this.get('router').transitionTo('student-home');
    },

    /**
     * Trigger the event to open student course report
     */
    openCourseReport() {
      this.sendAction('openCourseReport');
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

    if (currentPath === 'student.class.profile') {
      component.set('selectedMenuItem', 'profile');
    } else if (currentPath === 'student.class.course-map') {
      component.set('selectedMenuItem', 'course-map');
    } else if (currentPath === 'student.class.class-activities') {
      component.set('selectedMenuItem', 'class-activities');
    } else if (currentPath === 'student.class.student-learner-proficiency') {
      component.set('selectedMenuItem', 'profile-prof');
    }

    var item = component.get('selectedMenuItem');
    component.selectItem(item);

    if (component.get('isStudyPlayer')) {
      Ember.$('body').removeClass('fullscreen-exit');
      if (component.get('isFullScreen')) {
        Ember.$('body').addClass('fullscreen');
      }
    } else {
      Ember.$('body').addClass('fullscreen-exit');
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    this.set('selectedMenuItem', null);
    Ember.$('body')
      .removeClass('fullscreen')
      .removeClass('fullscreen-exit');
  },

  // -------------------------------------------------------------------------
  // Properties

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

  sourceType: null,

  /**
   * Maintains  the state of class info icon display or not.
   * @type {Boolean}
   */
  hasClassInfo: null,

  /**
   * It has the value of title to be display.
   * @type {String}
   */
  navTitle: null,

  /**
   * Maintains  the state of IL activity  or not.
   * @type {Boolean}
   */
  ILActivity: null,

  /**
   * Computed property to identify it's IL or not.
   * @return {Boolean}
   */
  isILActivity: Ember.computed('sourceType', function() {
    let sourceType = this.get('sourceType');
    let ILActivity = this.get('ILActivity');
    return sourceType === 'ILActivity' || ILActivity;
  }),

  /**
   * @property {Boolean} isCourseMapped
   */
  isCourseMapped: Ember.computed('class', 'isILActivity', function() {
    let component = this;
    let classData = component.get('class');
    let isILActivity = component.get('isILActivity');
    return isILActivity || (classData && classData.get('courseId'));
  }),

  /**
   * @property {Boolean}
   * Computed property  to identify class CM is started or not
   */
  hasCMStarted: Ember.computed('cmPerformanceSummary', function() {
    const scorePercentage = this.get('cmPerformanceSummary.score');
    return scorePercentage !== null && isNumeric(scorePercentage);
  }),

  /**
   * Compute the performance summary data based on performance from IL or class.
   * @return {Object}
   */
  cmPerformanceSummary: Ember.computed(
    'class.performanceSummary',
    'performanceSummary',
    function() {
      return (
        this.get('class.performanceSummary') || this.get('performanceSummary')
      );
    }
  ),

  /**
   * Compute the performance summary data  class CA.
   * @return {Object}
   */
  caPerformanceSummary: Ember.computed(
    'class.performanceSummaryForDCA',
    'performanceSummaryForDCA',
    function() {
      return (
        this.get('class.performanceSummaryForDCA') ||
        this.get('performanceSummaryForDCA')
      );
    }
  ),

  /**
   * Compute the competency completion status.
   * @return {Object}
   */
  competencyCompletionStats: Ember.computed(
    'class.competencyStats',
    'competencyStats',
    function() {
      return this.get('class.competencyStats') || this.get('competencyStats');
    }
  ),

  /**
   * @property {Boolean}
   * Computed property  to identify class CA is started or not
   */
  hasCAStarted: Ember.computed('caPerformanceSummary', function() {
    const scorePercentage = this.get('caPerformanceSummary.scoreInPercentage');
    return scorePercentage !== null && isNumeric(scorePercentage);
  }),

  /**
   * The class is premium or not
   * @property {Boolean}
   */
  isPremiumClass: Ember.computed('class', function() {
    let controller = this;
    const currentClass = controller.get('class');
    let setting = currentClass ? currentClass.get('setting') : null;
    return setting ? setting['course.premium'] : false;
  }),

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
  selectItem: function(selection) {
    if (selection) {
      let item = selection;
      let itemElement = `.${item}`;
      if (item === 'class-info') {
        this.$(itemElement).removeClass('vactive');
        return false;
      } else {
        this.$('.tab').removeClass('vactive');
        this.$(itemElement).addClass('vactive');
      }
    }
    if (selection === 'class-activities' && !this.get('hasCMStarted')) {
      this.$('.course-map').addClass('enable');
    } else {
      this.$('.course-map').removeClass('enable');
    }
  }
});
