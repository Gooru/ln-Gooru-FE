import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['student-inspect-destination'],

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
    if (component.get('isRoute0')) {
      component.fetchRout0Contents();
    }
    component.getTaxonomyGrades();
    component.initExplantoryPopover();
  },

  didRender() {
    var component = this;
    component.$('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
  },

  /**
   * @function getTaxonomyGrades
   * Method to fetch taxonomy grades
   */
  getTaxonomyGrades() {
    let component = this;
    let taxonomyService = component.get('taxonomyService');
    let filters = {
      subject: component.get('subjectCode')
    };
    return Ember.RSVP.hash({
      taxonomyGrades: Ember.RSVP.resolve(
        taxonomyService.fetchGradesBySubject(filters)
      )
    }).then(({ taxonomyGrades }) => {
      let activeGrade = taxonomyGrades.findBy(
        'id',
        component.get('classGrade')
      );
      component.set('activeGrade', activeGrade);
      component.set('taxonomyGrades', taxonomyGrades.reverse());
    });
  },

  initExplantoryPopover() {
    let component = this;
    component.$('#master').popover({
      html: true,
      trigger: 'hover',
      content: function() {
        return $('#master_popover').html();
      }
    });

    component.$('#in-progress').popover({
      html: true,
      trigger: 'hover',
      content: function() {
        return $('#progress_popover').html();
      }
    });

    component.$('#not-started').popover({
      html: true,
      trigger: 'hover',
      content: function() {
        return $('#not_started_popover').html();
      }
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
      component.updateRoute0Action(action);
    },

    /**
     * Action triggered when move to next screen
     */
    onMoveNext(curStep) {
      let component = this;
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
      component.toggleProperty('isRoute0ExpandedView');
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

  /**
   * @property {Boolean} isRoute0
   */
  isRoute0: Ember.computed('type', function() {
    let component = this;
    let type = component.get('type');
    return type === 'route';
  }),

  /**
   * @property {Boolean} isProficiency
   */
  isProficiency: Ember.computed('type', function() {
    let component = this;
    let type = component.get('type');
    return type === 'proficiency';
  }),

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
  activeGrade: null,

  /**
   * @property {Number} destinationGradeLevel
   */
  destinationGradeLevel: Ember.computed('classGrade', function() {
    let component = this;
    return parseInt(component.get('classGrade')) - 1;
  }),

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
  }
});
