import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['performance-manual-entry', 'external-assessment-performance-entry'],

  didInsertElement() {
    let component = this;
    console.log('assessment', this.get('assessment'));
    console.log('students', this.get('students'));
  },

  actions: {
    onSelectStudent(student, studentSeq) {

    },

    onEditScore(studentSeq) {

    }
  },

  activeStudent: Ember.computed('students', function() {
    let component = this;
    let students = component.get('students');
    return students ? students.objectAt(0) : null;
  })
});
