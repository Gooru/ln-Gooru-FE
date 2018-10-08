import Ember from 'ember';
import { GRU_FEATURE_FLAG } from 'gooru-web/config/config';
export default Ember.Component.extend({
  classNames: ['gru-study-navbar'],

  classNameBindings: ['isStudentLanding:student-landing'],

  session: Ember.inject.service('session'),

  isFeatureEnabled: Ember.computed(function() {
    let feature = 'notifications';
    return GRU_FEATURE_FLAG[feature];
  }),

  /**
   * Controls display of notification list, typical use from header is to hide it as required.
   */
  displayNotificationList: null,

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
          $('.classroom-information').toggle(
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
    onClickBrand() {
      Ember.$('body')
        .removeClass('fullscreen')
        .removeClass('fullscreen-exit');
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

  sourceType: null, // 'IlActivity/Other'

  hasClassInfo: null,

  navTitle: null,

  ILActivity: null,

  /**
   * @property {Boolean}
   * Computed property  to identify class is started or not
   */
  hasStarted: Ember.computed('performanceSummary', function() {
    const scorePercentage = this.get('performanceSummary.score');
    return scorePercentage !== null && scorePercentage >= 0;
  }),

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
  }
});
