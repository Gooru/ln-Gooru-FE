import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['performance-manual-entry', 'external-assessment-performance-entry'],

  didInsertElement() {
    let component = this;
    console.log('assessment', this.get('assessment'));
    console.log('students', this.get('students'));
  }
});
