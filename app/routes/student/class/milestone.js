import Ember from 'ember';
import PrivateRouteMixin from 'gooru-web/mixins/private-route-mixin';
import { CLASS_SKYLINE_INITIAL_DESTINATION } from 'gooru-web/config/config';

export default Ember.Route.extend(PrivateRouteMixin, {
  // -------------------------------------------------------------------------
  // Methods
  beforeModel() {
    const route = this;
    let isPremiumCourse = route.modelFor('student.class').isPremiumCourse;
    if (isPremiumCourse) {
      let skylineInitialState = route.modelFor('student.class')
        .skylineInitialState;
      let destination = skylineInitialState.get('destination');
      if (
        destination === CLASS_SKYLINE_INITIAL_DESTINATION.classSetupInComplete
      ) {
        return route.transitionTo('student.class.setup-in-complete');
      } else if (
        destination === CLASS_SKYLINE_INITIAL_DESTINATION.showDirections ||
        destination === CLASS_SKYLINE_INITIAL_DESTINATION.ILPInProgress
      ) {
        return route.transitionTo('student.class.proficiency');
      } else if (
        destination === CLASS_SKYLINE_INITIAL_DESTINATION.diagnosticPlay
      ) {
        return route.transitionTo('student.class.diagnosis-of-knowledge');
      }
    }
  },

  model: function() {
    const route = this;
    const currentClass = route.modelFor('student.class').class;
    return Ember.RSVP.hash({
      currentClass: currentClass
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.set('class', model.currentClass);
    controller.get('studentClassController').selectMenuItem('course-map');
  }
});
