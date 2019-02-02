import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['proficiency-subject-panel'],

  subject: null,

  selectedDomain: null,

  domains: Ember.computed.alias('taxonomyDomains.domains'),

  framework: Ember.computed.alias('class.preference.framework'),

  onDomainSelect: Ember.observer('selectedDomain', function() {
    let component = this;
    let selectedDomain = component.get('selectedDomain');
    if (selectedDomain) {
      component.set('showDomainInfo', true);
    }
  })
});
