import Ember from 'ember';
import { isValidEmailId } from 'gooru-web/utils/utils';

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

    component.$('.search-field .chosen-search-input').keyup(function() {
      let enteredEmailId = this.value;
      component.set('activeEmailId', enteredEmailId);
      //Send action to parrent only when hit Enter key
      if (
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
    let activeEmailId = component.get('activeEmailId');
    let stringToShow =
      activeEmailId.trim() === ''
        ? component.get('placeholder')
        : activeEmailId;
    this.$('.chosen-search-input').val(stringToShow);
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
   * @property {String} activeEmailId
   * Property for active email id which is typed in the textbox
   */
  activeEmailId: '',
  /**
   * @property {String} placeholder
   */
  placeholder: Ember.computed(function() {
    return this.get('i18n').t('class.add-teachers');
  })
});
