import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['domain-info-pull-up'],

  classNameBindings: ['showPullUp:open']
});
