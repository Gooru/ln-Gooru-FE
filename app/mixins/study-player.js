import Ember from 'ember';
export default Ember.Mixin.create({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {NavigateMapService}
   */
  navigateMapService: Ember.inject.service('api-sdk/navigate-map'),

  /**
   * Removing dependency on local storage and  bypassing next call when dont have a suggestion
   */
  checknPlayNext: function() {
    if (this.get('hasAnySuggestion')) {
      this.playNextContent();
    } else {
      const context = this.get('mapLocation.context'); //Already having contex
      this.playGivenContent(context);
    }
  },

  playNextContent: function() {
    const component = this;
    const navigateMapService = this.get('navigateMapService');
    const context = this.get('mapLocation.context');
    navigateMapService.next(context).then(nextContext => {
      component.set('mapLocation', nextContext);
      component.playGivenContent(nextContext.context);
    });
  },

  playGivenContent: function(context) {
    let status = (context.get('status') || '').toLowerCase();
    if (status !== 'done') {
      this.toPlayer();
    } else {
      this.set('mapLocation.context.status', 'done');
      this.set('hasSignatureCollectionSuggestions', false);
      this.set('hasSignatureCollectionSuggestions', false);
      this.set('isStatusDone', true);
    }
  }
});
