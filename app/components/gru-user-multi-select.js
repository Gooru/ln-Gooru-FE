import Ember from 'ember';
import { isValidEmailId } from 'gooru-web/utils/utils';
import { KEY_CODES } from 'gooru-web/config/config';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['gru-user-multi-select'],

  // -------------------------------------------------------------------------
  // Dependencies
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    const component = this;
    component
      .$('#user-multi-select')
      .chosen()
      .change(function(event, action) {
        let userId = action.selected || action.deselected;
        let users = component.get('users');
        let changedUser = users.findBy('id', userId);
        if (action.selected) {
          component.sendAction('onSelectUserItem', changedUser);
        } else {
          component.sendAction('onRemoveUserItem', changedUser);
        }
      });

    component.$('.search-field .chosen-search-input').keyup(function(event) {
      let enteredEmailId = this.value;
      let keyCode = event.keyCode || event.which;
      //Send action to parrent only when hit Enter key
      if (
        keyCode === KEY_CODES.ENTER &&
        isValidEmailId(enteredEmailId) &&
        !component.isDuplicateUser(enteredEmailId)
      ) {
        component.sendAction('onSearchUser', enteredEmailId);
      }
    });
  },

  didRender() {
    const component = this;
    component.$('#user-multi-select').trigger('chosen:updated');
  },

  // -------------------------------------------------------------------------
  // Methods
  /**
   * @function isDuplicateUser
   * Method to check whether the user is already selected or not
   */
  isDuplicateUser(enteredEmailId = '') {
    const component = this;
    const users = component.get('users');
    return !!users.findBy('email', enteredEmailId);
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {String} placeholder
   */
  placeholder: Ember.computed(function() {
    return this.get('i18n').t('class.add-more-people');
  })
});
