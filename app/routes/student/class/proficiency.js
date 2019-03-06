import Ember from 'ember';
import { getSubjectIdFromSubjectBucket } from 'gooru-web/utils/utils';
import { CLASS_SKYLINE_INITIAL_DESTINATION } from 'gooru-web/config/config';

export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyService: Ember.inject.service('api-sdk/taxonomy'),

  /**
   * @type {SkylineInitialService} Service to retrieve skyline initial service
   */
  skylineInitialService: Ember.inject.service('api-sdk/skyline-initial'),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Subject associated with the course
   * @type {String}
   */
  subject: Ember.computed.alias('course.subject'),

  /**
   * Extract subject code from subject
   * @return {String}
   */
  subjectCode: Ember.computed('subject', function() {
    if (this.get('subject')) {
      return getSubjectIdFromSubjectBucket(this.get('subject'));
    }
  }),

  /**
   * Property used to identify destination.
   * @type {String}
   */
  destination: Ember.computed.alias('skylineInitialState.destination'),

  // -------------------------------------------------------------------------
  // Methods

  beforeModel() {
    const route = this;
    const currentClass = route.modelFor('student.class').class;
    const skylineInitialState = route.modelFor('student.class')
      .skylineInitialState;
    const classId = currentClass.get('id');
    return route
      .get('skylineInitialService')
      .fetchState(classId)
      .then(skylineInitialStateRes => {
        skylineInitialState.set(
          'destination',
          skylineInitialStateRes.get('destination')
        );
        skylineInitialState.set(
          'context',
          skylineInitialStateRes.get('context')
        );
        route.set('skylineInitialState', skylineInitialState);
        let destination = skylineInitialState.get('destination');
        if (destination === CLASS_SKYLINE_INITIAL_DESTINATION.courseMap) {
          return route.transitionTo('student.class.course-map');
        } else if (
          destination === CLASS_SKYLINE_INITIAL_DESTINATION.classSetupInComplete
        ) {
          return route.transitionTo('student.class.setup-in-complete');
        }
      });
  },

  model() {
    const route = this;
    const currentClass = route.modelFor('student.class').class;
    const course = route.modelFor('student.class').course;
    route.set('course', course);
    const subjectCode = route.get('subjectCode');

    const taxonomyService = route.get('taxonomyService');
    const fwCode = currentClass.get('preference.framework');
    const filters = {
      subject: currentClass.get('preference.subject')
    };
    if (fwCode) {
      filters.fw_code = fwCode;
    }
    return Ember.RSVP.hash({
      course: course,
      taxonomyGrades: taxonomyService.fetchGradesBySubject(filters),
      subject: route.get('taxonomyService').fetchSubject(subjectCode),
      class: currentClass
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController(controller, model) {
    controller.set('class', model.class);
    controller.set('course', model.course);
    controller.set('subject', model.subject);
    let skylineInitialState = this.get('skylineInitialState');
    controller.set('skylineInitialState', skylineInitialState);
    let taxonomyGrades = model.taxonomyGrades;
    if (taxonomyGrades) {
      controller.set(
        'taxonomyGrades',
        taxonomyGrades.sortBy('sequence').reverse()
      );
    }
    controller.initialize();
  },

  /**
   * Method will take cares of reset properties values on destroy
   * @param {Controller} controller
   */
  resetController(controller) {
    let stateCheckInterval = controller.get('stateCheckInterval');
    if (stateCheckInterval) {
      Ember.run.cancel(stateCheckInterval);
    }
  }
});
