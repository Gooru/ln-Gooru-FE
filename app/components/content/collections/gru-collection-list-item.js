import Ember from 'ember';
import BuilderMixin from 'gooru-web/mixins/content/builder';
import {CONTENT_TYPES} from 'gooru-web/config/config';
import ModalMixin from 'gooru-web/mixins/modal';

/**
 * Collection List
 *
 * Component responsible for listing a set of resources/questions
 *
 * @module
 * @augments content/courses/gru-accordion-course
 *
 */
export default Ember.Component.extend(BuilderMixin,ModalMixin, {


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'collections', 'gru-collection-list-item'],

  tagName: 'li',

  attributeBindings: ['data-id'],

  'data-id':Ember.computed.alias('model.id'),
  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @requires service:api-sdk/resource
   */
  resourceService: Ember.inject.service("api-sdk/resource"),

  /**
   * @requires service:api-sdk/question
   */
  questionService: Ember.inject.service("api-sdk/question"),

  /**
   * @requires service:notifications
   */
  notifications: Ember.inject.service(),

  /**
   * @requires service:i18n
   */
  i18n: Ember.inject.service(),


  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Remove selected collection item
     */
    deleteItem: function (builderItem) {
      let component = this;
      var model =  {
        content: builderItem,
        index:this.get('index'),
        parentName:this.get('collection.title'),
        callback:{
          success:function(){
            component.get('onRemoveCollectionItem')(builderItem);
          }
        }
      };
      var collectionItem = null;
      if(builderItem.get('format')==='question'){
        collectionItem = {
          deleteMethod: function () {
            return this.get('questionService').deleteQuestion(this.get('model.id'));
          }.bind(this),
          type: CONTENT_TYPES.QUESTION,
        };
        this.actions.showModal.call(this,
          'content.modals.gru-delete-content',
          $.extend(model, collectionItem), null, null, null, false);
      }else{
        collectionItem = {
          removeMethod: function () {
            return this.get('resourceService').deleteResource(this.get('model.id'));
          }.bind(this),
          type: CONTENT_TYPES.RESOURCE,
        };
        this.actions.showModal.call(this,
          'content.modals.gru-remove-content',
          $.extend(model, collectionItem), null, null, null, false);
      }
    },

    /**
    * Route to edit with correct query params.
    */
    edit: function(item) {
      const component = this;
      const route = item.get('format') ==='question' ? "content.questions.edit" : "content.resources.edit";
      const queryParams = {
        queryParams: {
          collectionId: component.get('collection.id'),
          isCollection: component.get('isCollection')
        }
      };
      component.get('router').transitionTo(route, item.get("id"), queryParams);
    },

    copy: function(builderItem) {
      var model = {
        content: this.get('model'),
        collectionId: this.get('collection.id'),
        isCollection: this.get('isCollection'),
        onRemixSuccess: this.get('onRemixCollectionItem')
      };
      if(builderItem.get('format') === 'question') {
        this.send('showModal', 'content.modals.gru-question-remix', model);
      } else {
        this.send('showModal', 'content.modals.gru-resource-remix', model);
      }
    },

    editNarration: function (/*builderItem*/) {
      var modelForEditing = this.get('model').copy();

      this.set('tempModel', modelForEditing);
      this.set('model.isExpanded', true);
    },

    updateItem: function (builderItem) {
      let component = this;
      var editedModel = this.get('tempModel');
      let model = component.get('model');

      if(builderItem.get('format')==='question'){
        component.get('questionService').updateQuestion(editedModel.id, editedModel)
          .then(function () {
            model.merge(editedModel, ['narration']);
            component.set('model.isExpanded', false);
          }.bind(this))
          .catch(function (error) {
            var message = component.get('i18n').t('common.errors.question-not-updated').string;
            component.get('notifications').error(message);
            Ember.Logger.error(error);
          }.bind(component));
      }else{
        component.get('resourceService').updateResource(editedModel.id, editedModel)
          .then(function () {
            model.merge(editedModel, ['narration']);
            component.set('model.isExpanded', false);
          }.bind(this))
          .catch(function (error) {
            var message = component.get('i18n').t('common.errors.question-not-updated').string;
            component.get('notifications').error(message);
            Ember.Logger.error(error);
          }.bind(component));
      }
    },

    cancel: function (){
      this.set('model.isExpanded', false);
    }
  },
  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Number} remainingStandards - number of standards not displayed
   */
  remainingStandards: Ember.computed('visibleStandards', function() {
    return this.get('model.standards.length') - this.get('visibleStandards');
  }),

  /**
   * @property {Number} visibleStandards - number of standards that will be displayed
   */
  visibleStandards: 1,

  /**
   * @property {Object[]} visibleStandardsList - list of standards that will be displayed
   */
  visibleStandardsList: Ember.computed('visibleStandards', function() {
    var visibleStandards = this.get('visibleStandards');

    return this.get('model.standards').filter(function(item, index) {
      return index < visibleStandards;
    });
  }),
  /**
   * Course model as instantiated by the route. This is the resource that have the assigned collection
   * @property {Collection}
   */
  collection:null,
  /**
  * @property {Boolean} isCollection - is this a listing for a collection or for an assessment
  */
  isCollection:null,

  /**
   * @property {Boolean} isSorting
   */
  isSorting: null,

  /**
   * Copy of the resource/question model used for editing.
   * @property {Resource/Question }
   */
  tempModel: null
});
