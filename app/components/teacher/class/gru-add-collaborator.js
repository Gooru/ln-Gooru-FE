import Ember from 'ember';
import { ROLES, KEY_CODES } from 'gooru-web/config/config';
import { isValidEmailId } from 'gooru-web/utils/utils';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['gru-add-collaborator'],

  // -------------------------------------------------------------------------
  // Dependencies
  profileService: Ember.inject.service('api-sdk/profile'),

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    const component = this;
    component.inputTypeHandler();
  },

  // -------------------------------------------------------------------------
  // Events
  actions: {
    //Action triggered when remove an user
    onRemoveUser(user) {
      this.get('users').removeObject(user);
    },

    //Action triggered when add collaborators into a class
    onAddCollaborators() {
      const component = this;
      const selectedUsers = component.get('users');
      component.sendAction('onAddCollaborators', selectedUsers);
      component.set('users', Ember.A([]));
    },

    //Action triggered when click on cancel
    onToggleAddCollaborator() {
      this.sendAction('onToggleAddCollaborator');
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Boolean} isEnableDone
   */
  isEnableDone: Ember.computed('users', 'userEmail', function() {
    const component = this;
    const isAddedUsers = component.get('users.length');
    const enteredUserEmail = component.get('userEmail');
    const enteredValidEmail = enteredUserEmail
      ? isValidEmailId(enteredUserEmail)
      : true;
    return isAddedUsers && enteredValidEmail;
  }),

  /**
   * @property {Array} users
   * Property for list of selected users
   */
  users: Ember.A([]),

  /**
   * @property {Boolean} inValidEmail
   * Property to evaluate whether the entered email id is valid or not
   */
  inValidEmail: false,

  /**
   * @property {String} userEmail
   * Property for entered user email
   */
  userEmail: null,

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function inputTypeHandler
   * Method to handle the input key event
   */
  inputTypeHandler() {
    const component = this;
    component.$('.email-value-container .email-value').keyup(function(event) {
      let userEmail = component.get('userEmail');
      if (event.keyCode === KEY_CODES.ENTER && isValidEmailId(userEmail)) {
        component.doValidateTeacherUser(userEmail);
      } else {
        component.set('inValidEmail', false);
      }
    });
  },

  /**
   * @function doValidateTeacherUser
   * Method to validate whether the entered email id is valid to add as a collaborator or not
   */
  doValidateTeacherUser(userEmail) {
    const component = this;
    let users = component.get('users');
    let userData = users.findBy('email', userEmail) || Ember.Object.create({});
    return Ember.RSVP
      .hash({
        userDetails: component.fetchMatchingUserProfiles(userEmail)
      })
      .then(
        ({ userDetails }) => {
          if (userDetails.get('role') === ROLES.TEACHER) {
            userData.set('id', userDetails.get('id'));
            userData.set('firstName', userDetails.get('firstName'));
            userData.set('lastName', userDetails.get('lastName'));
            userData.set('fullName', userDetails.get('fullName'));
            userData.set('avatarUrl', userDetails.get('avatarUrl'));
            userData.set('email', userEmail);
            users.pushObject(userData);
            component.set('inValidEmail', false);
            component.set('userEmail', null);
          } else {
            component.set('inValidEmail', true);
          }
        },
        function() {
          component.set('inValidEmail', true);
        }
      );
  },

  /**
   * @function fetchMatchingUserProfiles
   * Method to fetch user profile details for given emailId
   */
  fetchMatchingUserProfiles(userEmail) {
    const controller = this;
    const profileService = controller.get('profileService');
    return profileService.checkEmailExists(userEmail);
  }
});
