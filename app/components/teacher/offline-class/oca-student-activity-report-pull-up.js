import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['oca-student-activity-report-pull-up'],

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:api-sdk/collection
   */
  collectionService: Ember.inject.service('api-sdk/collection'),

  /**
   * @requires service:api-sdk/assessment
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  /**
   * Propery of class id
   * @property {Number}
   */
  classId: null,

  /**
   * Propery of student
   * @property {Object}
   */
  student: null,

  /**
   * @property {Object}
   */
  collection: null,

  /**
   * @property {Array}
   */
  resourcesCollection: null,

  /**
   * Propery to hide the default pullup.
   * @property {Boolean}
   */
  showPullUp: false,

  /**
   * @property {Boolean}
   */
  isLoading: false,

  actions: {
    onPullUpClose(closeAll) {
      this.closePullUp(closeAll);
    },
    onCloseStudentActivity() {
      let component = this;
      component.$().animate(
        {
          top: '100%'
        },
        400,
        function() {
          component.set('showPullUp', false);
        }
      );
    }
  },

  // -------------------------------------------------------------------------
  // Events

  didInsertElement() {
    this.openPullUp();
    this.handleAppContainerScroll();
  },

  didDestroyElement() {
    this.handleAppContainerScroll();
  },

  init() {
    let component = this;
    component._super(...arguments);
    component.loadData();
  },

  /**
   * Function to animate the  pullup from bottom to top
   */
  openPullUp() {
    let component = this;
    component.set('showPullUp', true);
    component.$().animate(
      {
        top: '10%'
      },
      400
    );
  },

  /**
   * Function to animate the  pullup from top to bottom
   */
  closePullUp(closeAll) {
    let component = this;
    component.$().animate(
      {
        top: '100%'
      },
      400,
      function() {
        component.set('showPullUp', false);
        component.sendAction('onClosePullUp', closeAll);
      }
    );
  },

  /**
   * Function to hanle the pullup scroll
   */
  handleAppContainerScroll() {
    let activePullUpCount = Ember.$(document.body).find('.backdrop-pull-ups')
      .length;
    if (activePullUpCount > 0) {
      Ember.$(document.body).addClass('no-vertical-scroll');
    } else if (activePullUpCount === 0) {
      Ember.$(document.body).removeClass('no-vertical-scroll');
    }
  },

  loadData() {
    let component = this;
    const collectionId = component.get('collection.id');
    const format = component.get('collection.format');
    component.set('isLoading', true);
    let collectionPromise;
    if (format === 'collection') {
      collectionPromise = component
        .get('collectionService')
        .readCollection(collectionId);
    } else if (format === 'assessment') {
      collectionPromise = component
        .get('assessmentService')
        .readAssessment(collectionId);
    } else if (format === 'assessment-external') {
      collectionPromise = component
        .get('assessmentService')
        .readExternalAssessment(collectionId);
    } else {
      collectionPromise = component
        .get('collectionService')
        .readExternalCollection(collectionId);
    }
    return Ember.RSVP.hash({
      collection: collectionPromise
    }).then(({ collection }) => {
      if (!component.isDestroyed) {
        component.parseCollectionResource(collection.children);
        component.set('isLoading', false);
      }
    });
  },

  parseCollectionResource(resources) {
    let component = this;
    let resourcesPerformance = component.get('student.performance.resources');
    resources.map(resource => {
      let performance = resourcesPerformance
        .filterBy('resourceId', resource.id)
        .objectAt(0);
      resource.set('performance', performance);
    });
    component.set('resourcesCollection', resources);
  }
});
