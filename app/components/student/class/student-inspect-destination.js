import Ember from 'ember';
import { CLASS_SKYLINE_INITIAL_DESTINATION } from 'gooru-web/config/config';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['student-inspect-destination'],

  classNameBindings: ['type'],

  // -------------------------------------------------------------------------
  // Dependencies

  route0Service: Ember.inject.service('api-sdk/route0'),

  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyService: Ember.inject.service('api-sdk/taxonomy'),

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    let component = this;
    if (component.get('isRoute0') && component.get('isRoute0Applicable')) {
      component.fetchRout0Contents();
    }
  },

  didRender() {
    var component = this;
    component.$('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
    component.$('[data-toggle="popover"]').popover({
      trigger: 'hover'
    });
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Action triggered when accept route0 suggestion
     */
    onRoute0Accept() {
      let component = this;
      let action = 'accepted';
      component.updateRoute0Action(action).then(() => {
        component.set('isRoute0Pending', false);
      });
    },

    /**
     * Action triggered when reject route0 suggestion
     */
    onRoute0Reject() {
      let component = this;
      let action = 'rejected';
      component.updateRoute0Action(action).then(() => {
        component.set('isRoute0Pending', false);
      });
    },

    /**
     * Action triggered when move to next screen
     */
    onMoveNext(curStep) {
      let component = this;
      if (curStep !== 'playNext') {
        component.set('type', curStep);
      }
      component.sendAction('onMoveNext', curStep);
    },
    /**
     * Action triggered when toggle route0 course-map view expanded/collapsed
     */
    onToggleRoute0View() {
      let component = this;
      if (component.get('isRoute0ExpandedView')) {
        component.$('.route0-body').hide(1000);
      } else {
        component.$('.route0-body').show(1000);
      }
      component.$('.route0-container').toggleClass('expanded');
      component.toggleProperty('isRoute0ExpandedView');
    },

    /**
     * On chart draw complete.
     */
    onChartDrawComplete() {
      let component = this;
      component.doAnimation();
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {JSON} competencyStatus
   */
  competencyStatus: null,

  route0Contents: null,

  taxonomyGrades: null,

  type: 'proficiency',

  /**
   * @property {Boolean} isRoute0
   */
  isRoute0: Ember.computed.equal('type', 'route'),

  /**
   * @property {Boolean} isProficiency
   */
  isProficiency: Ember.computed.equal('type', 'proficiency'),

  /**
   * @property {Boolean} isRoute0Pending
   */
  isRoute0Pending: Ember.computed('route0Contents', function() {
    let component = this;
    let route0Contents = component.get('route0Contents');
    return route0Contents ? route0Contents.status === 'pending' : false;
  }),

  /**
   * @property {Boolean} isRoute0ExpandedView
   */
  isRoute0ExpandedView: false,

  /**
   * @property {JSON} activeGrade
   */
  activeGrade: Ember.computed('taxonomyGrades', 'classGrade', function() {
    let taxonomyGrades = this.get('taxonomyGrades');
    let classGrade = this.get('classGrade');
    return taxonomyGrades.findBy('id', classGrade);
  }),

  /**
   * Property used to identify whether to show directions or not.
   * @type {Boolean}
   */
  showDirections: Ember.computed.equal(
    'skylineInitialState.destination',
    CLASS_SKYLINE_INITIAL_DESTINATION.showDirections
  ),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function fetchRout0Contents
   * Method to retch route0 suggestions
   */
  fetchRout0Contents() {
    let component = this;
    let courseId = component.get('courseId');
    let classId = component.get('classId');
    let route0Service = component.get('route0Service');
    let filters = {
      courseId,
      classId
    };
    return Ember.RSVP.hash({
      route0Contents: Ember.RSVP.resolve(route0Service.fetchInClass(filters))
    }).then(({ route0Contents }) => {
      component.set('route0Contents', route0Contents);
    });
  },

  /**
   * @function updateRoute0Action
   * Method to update route0 action triggered by user
   */
  updateRoute0Action(status) {
    let component = this;
    let classId = component.get('classId');
    let courseId = component.get('courseId');
    let actionData = {
      classId,
      courseId,
      status
    };
    let route0Service = component.get('route0Service');
    return Ember.RSVP.hash({
      route0ActionStatus: Ember.RSVP.resolve(
        route0Service.updateRouteAction(actionData)
      )
    });
  },

  doAnimation() {
    let component = this;
    let delay = 1000;
    component
      .$(
        '.proficiency-info-1, .student-inspect-competency-chart .chart-container'
      )
      .addClass('active');
    let listOfMasteredEle = component.$(
      '.status-2, .status-3, .status-4, .status-5'
    );
    delay = delay + 1000;
    component.delay(component.$('.proficiency-info-2'), delay);
    listOfMasteredEle.each(function(index, element) {
      component.delay(element, delay);
      delay = delay + 20;
    });
    delay = delay + 1000;
    component.delay(component.$('.proficiency-info-3'), delay);
    let listOfInprogressEle = component.$('.status-1');
    listOfInprogressEle.each(function(index, element) {
      component.delay(element, delay);
      delay = delay + 20;
    });
    delay = delay + 1000;
    component.delay(component.$('.proficiency-info-4'), delay);
    component.delay(
      component.$(
        '.student-inspect-competency-chart .chart-container polyline'
      ),
      delay
    );
    delay = delay + 2000;
    component.delay(component.$('.proficiency-info-5'), delay);
    delay = delay + 1000;
    component.delay(component.$('.proficiency-info-6'), delay);
  },

  delay(element, delay) {
    let component = this;
    Ember.run.later(function() {
      component.$(element).addClass('active');
    }, delay);
  }
});
