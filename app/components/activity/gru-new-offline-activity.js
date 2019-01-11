import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['activity', 'gru-new-offline-activity'],

  lookupService: Ember.inject.service('api-sdk/lookup'),


  collectionService: Ember.inject.service('api-sdk/collection'),

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    let component = this;
    console.log('loading');
    component.openPullUp();
    component.fetchAudiences();
    component.set('forMonth', moment().format('MM'));
    component.set('forYear', moment().format('YYYY'));
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    closePullUp() {
      let component = this;
      component.closePullUp();
    },

    onSelectDate(selectedDate) {
      let component = this;
      console.log('selectedDate0', selectedDate);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Boolean} isShowPullUp
   */
  isShowPullUp: false,
  /**
   * @property {Boolean} isClose
   */
  isClose: false,

  isShowTaxonomyPicker: Ember.computed('classPreference', function() {
    let component = this;
    let classPreference = component.get('classPreference');
    return classPreference ? classPreference.subject && classPreference.framework : false;
  }),

  // -------------------------------------------------------------------------
  // Methods
  openPullUp() {
    let component = this;
    component.$().animate(
      {
        top: '5%'
      },
      400
    );
  },

  closePullUp() {
    let component = this;
    component.$().animate(
      {
        top: '100%'
      },
      400,
      function() {
        component.set('isShowPullUp', false);
      }
    );
  },

  fetchAudiences() {
    const component = this;
    const lookupService = component.get('lookupService');
    return Ember.RSVP.hash({
      audiences: Ember.RSVP.resolve(lookupService.readAudiences())
    })
      .then(({audiences}) => {
        console.log('audiences', audiences);
        component.set('audiences', audiences);
      });
  },

  createExternalCollection(collectionData) {
    const component = this;
    const collectionService = component.get('collectionService');
    return Ember.RSVP.resolve(collectionService.createExternalCollection(collectionData));
  }
});
