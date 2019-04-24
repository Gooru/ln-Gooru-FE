import Ember from 'ember';
import PullUpMixin from 'gooru-web/mixins/reports/pull-up/pull-up-mixin';

export default Ember.Component.extend(PullUpMixin, {
  classNames: ['activities', 'add-performance-data'],

  didInsertElement() {
    const component = this;
    component.openPullUp();
  }
});
