import Ember from 'ember';

export default Ember.Component.extend({
  /**
   * Config properties of the card
   */
  displayInfo: null,

  /**
   * Card Data model
   */
  timeSession: null,

  /**
   * Set the static display properties to model
   */
  setCardDisplay: Ember.computed('timeSession', function() {
    let model = this.get('timeSession');
    if (model) {
      model.cardImage = this.displayInfo[model.collectionType];
      this.set('timeSession', model);
    }
    if (!this.get('timeSession')) {
      let timesession = {
        collectionType: 'nodata',
        title: 'nodata'
      };
      this.set('timeSession', timesession);
    }
  }),
  init() {
    this._super(...arguments);
    if (!this.get('timeSession')) {
      let timesession = {
        collectionType: 'nodata',
        title: 'nodata'
      };
      this.set('timeSession', timesession);
    }
  }
});
