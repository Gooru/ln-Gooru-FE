import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['domain-info-pull-up'],

  classNameBindings: ['showPullUp:open'],

  actions: {
    closePullUp() {
      let component = this;
      component.toggleProperty('showPullUp');
      component.set('domain', null);
    },

    onInspectCompetency(selectedCompetency) {
      let component = this;
      let competencies = component.get('competencies');
      selectedCompetency.set('domainName', component.get('domain.domainName'));
      component.sendAction(
        'onSelectCompetency',
        selectedCompetency,
        competencies
      );
    }
  }
});
