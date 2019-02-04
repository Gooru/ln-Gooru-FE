import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['proficiency-subject-panel'],

  subject: null,

  selectedDomain: null,

  domains: Ember.computed.alias('competencyMatrixCoordinates.domains'),

  framework: Ember.computed.alias('class.preference.framework')
});
