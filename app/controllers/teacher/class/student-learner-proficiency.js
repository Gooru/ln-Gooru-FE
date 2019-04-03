import Ember from 'ember';
import StudentLearnerProficiency from 'gooru-web/mixins/student-learner-proficiency';
export default Ember.Controller.extend(StudentLearnerProficiency, {
  // -------------------------------------------------------------------------
  // Dependenciess
  /**
   * Teacher class controller
   */
  classController: Ember.inject.controller('teacher/class')
});
