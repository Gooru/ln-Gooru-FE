import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['domain-info-pull-up'],

  classNameBindings: ['showPullUp:open'],

  actions: {
    closePullUp() {
      let component = this;
      component.set('domain', null);
      component.toggleProperty('showPullUp');
    }
  }
});
