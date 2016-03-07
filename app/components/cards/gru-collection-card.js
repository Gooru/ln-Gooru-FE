import Ember from 'ember';
/**
 * Collection and Assessment card
 *
 * Component responsible of showing the colleciton or resource information in cards, so that most useful information is summarized there.
 * @module
 */

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes

  classNames:['cards','gru-collection-card'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {

  },
  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Collection/Resource} collection
   */
  collection: null,

  /**
   * @property {boolean} Indicates if collection has 1 or more resources
   */
  hasResources: Ember.computed.gt('collection.resourceCount', 0),

  /**
   * @property {boolean} Indicates if collection has 1 or more questions
   */
  hasQuestions: Ember.computed.gt('collection.questionCount', 0),

  /**
   * @property {String} remixedByUser
   */
  remixedByUser: Ember.computed('collection',function(){
    return this.get('collection.remixedBy')[0];
  }),
  /**
   * @property {Number} remixedUsers
   */
  remixedUsers:Ember.computed('collection',function(){
    return (this.get('collection.remixedBy').length)-1;
  }),


});
