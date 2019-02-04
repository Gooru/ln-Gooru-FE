import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['competency-info-pull-up'],

  classNameBindings: ['isInspectCompetency:open'],

  actions: {
    closePullUp() {
      let component = this;
      component.set('competency', null);
      component.toggleProperty('isInspectCompetency');
    }
  }
});
