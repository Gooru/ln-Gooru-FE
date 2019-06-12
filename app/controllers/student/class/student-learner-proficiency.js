import Ember from 'ember';
import StudentLearnerProficiency from 'gooru-web/mixins/student-learner-proficiency';
export default Ember.Controller.extend(StudentLearnerProficiency, {
  /**
   * Inject the  student class parent controller.
   */
  studentClassController: Ember.inject.controller('student.class')
});
