import Ember from 'ember';
import StudentLearnerProficiency from 'gooru-web/mixins/student-learner-proficiency';
export default Ember.Component.extend(StudentLearnerProficiency, {
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['individual-student-report-preview'],

  // -------------------------------------------------------------------------
  // Dependencies

  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Date} timeSeriesStartDate
   */
  timeSeriesStartDate: Ember.computed.alias('class.startDate'),

  /**
   * @property {Object} studentProfile
   */
  studentProfile: Ember.computed.alias('reportData.student'),

  onSelectStudent: Ember.observer('reportData', function() {
    this.loadData();
  }),

  currentDate: moment().format('MMMM DD, YYYY'),

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    const component = this;
    this.loadData();
    component.$('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
  },

  //--------------------------------------------------------------------------
  //Actions
  actions: {
    onPrintPreview() {
      window.print();
    }
  }
});
