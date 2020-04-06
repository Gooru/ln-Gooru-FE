import Ember from 'ember';

export default Ember.Component.extend({
  /**
   * Class attributes
   */
  classNames: ['gru-video-authorize-card'],

  /**
   * @return videConferenceService
   */
  videConferenceService: Ember.inject.service('api-sdk/video-conference'),

  /**
   * @property {Boolean} isConferenceAllow hold the toggleProperty
   */
  isConferenceAllow: false,

  actions: {
    /**
     * @function onDeny action trigger when click on deny
     */
    onDeny() {
      this.sendAction('onDeny');
    },

    /**
     * @function onAllow action trigger when click on deny
     */
    onAllow() {
      let params = {
        redirectUrl: `${window.location.href}?videoConference=true`
      };
      this.get('videConferenceService')
        .authorizeConference(params)
        .then(redirectUrl => {
          this.sendAction('onAllow');
          window.open(
            redirectUrl,
            '_blank',
            'toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=50px,width=800,height=700'
          );
        });
    }
  }
});
