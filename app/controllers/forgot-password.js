import Ember from 'ember';
import User from 'gooru-web/models/forgot-password';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {Service} Session service
   */
  profileService: Ember.inject.service("api-sdk/profile"),

  /**
   * @property {Service} Notifications service
   */
  notifications: Ember.inject.service(),

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    resetPassword: function() {
      const controller = this;
      const user = controller.get('user');
      const errorMessage = controller.get('i18n').t('forgot-password.error-email-not-exists').string;

      if(controller.get('didValidate') === false) {
        var email = Ember.$('.gru-input.email input').val();
        user.set('email',email);
      }

      user.validate().then(function ({ validations }) {
        if (validations.get('isValid')) {
          controller.get("profileService")
            .forgotPassword(user.get('email'))
            .then(function() {
              controller.set('didValidate', true);
              controller.set('showSecondStep', true);
            }, function(error) {
              controller.set('emailError', error.email_id || errorMessage);
              controller.keydownEvents();
            });
        }
      });
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * init and reset all the properties for the validations
   */

  resetProperties(){
    var controller = this;
    var user = User.create(Ember.getOwner(this).ownerInjection(), {email: null});

    controller.set('user', user);
    controller.set("showSecondStep", false);
    controller.set('didValidate', false);
    controller.set('emailError', false);
  },

  /**
   * Add keydown events to clear errors on username and email
   */
  keydownEvents: function() {
    const controller = this;
    var $email = Ember.$('.email input');
    $email.unbind('keydown');
    $email.on('keydown', function() {
      controller.set('emailError', false);
    });
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @type {String} Error with email field
   */
  emailError: false,

  /**
   * @type {User} user
   */
  user: null,

  /**
   * @param {Boolean } didValidate - value used to check if input has been validated or not
   */
  didValidate: false,

  /**
   * @param {Boolean } showSecondStep - value used to check if Second Step is showing or not
   */
  showSecondStep: false

});
