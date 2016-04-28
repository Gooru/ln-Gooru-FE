import Ember from 'ember';
import ContentEditMixin from 'gooru-web/mixins/content/edit';
import { RESOURCE_COMPONENT_MAP, RESOURCE_TYPES } from "../../../config/config";

export default Ember.Component.extend(ContentEditMixin, {
  // -------------------------------------------------------------------------
  // Dependencies
  session: Ember.inject.service('session'),

  /**
   * @requires service:notifications
   */
  notifications: Ember.inject.service(),

  /**
   * @requires service:api-sdk/resource
   */
  resourceService: Ember.inject.service("api-sdk/resource"),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'resources', 'gru-resource-edit'],

  tagName: 'article',

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Edit Content
     */
    editContent: function () {
      var resourceForEditing = this.get('resource').copy();
      this.set('tempResource', resourceForEditing);
      this.set('isEditing', true);
    },

    /**
     * Select resource type
     */
    selectType:function(type){
      this.set('tempResource.format', type);
    },

    /**
     * Save updated content
     */
    updateContent: function() {
      this.saveContent();
    },

    /**
     * Save settings profile visibility option
     */
    publishToProfile: function(isChecked) {
      var resourceForEditing = this.get('resource').copy();
      this.set('tempResource', resourceForEditing);
      this.set('tempResource.isVisibleOnProfile', isChecked);
      this.saveContent();
    }
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * Resource model as instantiated by the route. This is the model used when not editing
   * or after any resource changes have been saved.
   * @property {Resource}
   */
  resource: null,

  /**
   * Copy of the resource model used for editing.
   * @property {Resource}
   */
  tempResource: null,

  /**
   * List of resource types
   * @property {Array}
   */
  resourceTypes: RESOURCE_TYPES,

  /**
   * Determines the name of the component that renders the resource
   * @property {String}
   */
  resourceComponent: Ember.computed('resource.resourceType', function() {
    return RESOURCE_COMPONENT_MAP[this.get('resource.resourceType')];
  }),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Save Content
   */
  saveContent: function () {
    const component = this;
    var editedResource = component.get('tempResource');
    editedResource.validate().then(function({model, validations}) {
      if (validations.get('isValid')) {
        component.get('resourceService').updateResource(component.get('resource.id'), editedResource)
          .then(function () {
            component.set('resource', editedResource);
            component.set('isEditing', false);
          })
          .catch(function () {
            var message = component.get('i18n').t('common.errors.resource-not-updated').string;
            component.get('notifications').error(message);
          });
      }
      component.set('didValidate', true);
    });
  }
});
