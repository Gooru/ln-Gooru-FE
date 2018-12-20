import Ember from 'ember';
import changePasswordValidations from 'gooru-web/validations/change-password';

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  parentController: Ember.inject.controller('profile'),

  profileService: Ember.inject.service('api-sdk/profile'),

  cprofile: function() {
    let Profile = Ember.Object.extend({
        oldPassword: null,
        newPassword: null,
        confirmPassword: null
      }),
      extendedProfile = Profile.extend(changePasswordValidations);
    var profile = extendedProfile.create(
      Ember.getOwner(this).ownerInjection(),
      {
        oldPassword: null,
        newPassword: null,
        confirmPassword: null
      }
    );

    return profile;
  }.property(),
  // -------------------------------------------------------------------------
  // Properties
  showChangePassFlag: false,

  didValidate: false,
  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  /**
   * @requires service:notifications
   */
  notifications: Ember.inject.service(),

  /**
   * A link to the parent profile controller
   * @see controllers/profile.js
   * @property {Class}
   */
  profile: Ember.computed.reads('parentController.profile'),

  /**
   * A link to the computed property isMyProfile in profile controller
   * @see controllers/profile.js
   * @property {isMyProfile}
   */
  isMyProfile: Ember.computed.reads('parentController.isMyProfile'),
  actions: {
    changePasswordIMPL: function() {
      Ember.Logger.log('changePasswordIMPL');
    },
    showChangePass: function(show) {
      if (show) {
        this.set('showChangePassFlag', true);
      } else {
        this.set('showChangePassFlag', false);
      }
    },
    changePassword: function() {
      const component = this;
      const profile = component.get('cprofile');

      if (component.get('didValidate') === false) {
        var password = Ember.$('.gru-input.oldPassword input').val(),
          newPassword = Ember.$('.gru-input.newPassword input').val(),
          confirmPassword = Ember.$('.gru-input.confirmPassword input').val();

        profile.set('oldPassword', password);
        profile.set('newPassword', newPassword);
        profile.set('confirmPassword', confirmPassword);
      }

      profile.validate().then(function({ validations }) {
        if (validations.get('isValid')) {
          component
            .get('profileService')
            .changePassword(
              profile.get('oldPassword'),
              profile.get('newPassword')
            )
            .then(
              function() {
                component.set('didValidate', true);

                var successMessage = component
                  .get('i18n')
                  .t('change-password.change-success').string;
                component.get('notifications').success(successMessage);
              },
              function(error) {
                var errorMessage = component
                  .get('i18n')
                  .t('change-password.change-password-error').string;
                component.get('notifications').error(errorMessage);
                Ember.Logger.error(error);
              }
            );
        }
      });
    }
  }
});
