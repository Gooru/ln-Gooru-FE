import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['proficiency-subject-panel'],

  /**
   * @property {Object} competency
   */
  subject: null,
  /**
   * @property {Array} competencyMatrixCoordinates
   */
  competencyMatrixCoordinates: null,

  /**
   * @property {Array} domains
   */
  domains: Ember.computed.alias('competencyMatrixCoordinates.domains'),

  /**
   * @property {String} framework
   */
  framework: null,

  actions: {
    onClosePullUp() {
      let component = this;
      component.sendAction('onClosePullUp');
    },

    onDomainSelect(selectedDomain) {
      let component = this;
      component.sendAction('onDomainSelect', selectedDomain);
    },

    onSelectDatamodel(datamodel) {
      const component = this;
      component.set('isShowDomainList', datamodel === 'proficiency');
    }
  },

  didRender() {
    let component = this;
    component.$('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
  },

  isShowDomainList: true
});
