import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['domain-info-pull-up'],

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    let component = this;
    component.openPullUp();
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Action when click on close button
     */
    closePullUp() {
      const component = this;
      component.$().animate(
        {
          top: '100%'
        },
        400,
        function() {
          component.set('showPullUp', false);
          component.set('domain', null);
        }
      );
    },
    /**
     * Action when click on competency title
     */
    onInspectCompetency(selectedCompetency) {
      const component = this;
      selectedCompetency = Ember.Object.create(selectedCompetency);
      let competencies = component.get('competencies');
      selectedCompetency.set('domainName', component.get('domain.domainName'));
      selectedCompetency.set('domainCode', component.get('domain.domainCode'));
      component.sendAction(
        'onSelectCompetency',
        selectedCompetency,
        competencies
      );
    },

    onSelectDatamodel(dataModel) {
      this.set('isShowCompetencies', dataModel === 'proficiency');
    }
  },

  isShowCompetencies: true,

  // -------------------------------------------------------------------------
  // Methods
  /**
   * Function to animate the  pullup from bottom to top
   */
  openPullUp() {
    const component = this;
    component.$().animate(
      {
        top: '0%'
      },
      400
    );
  }
});
