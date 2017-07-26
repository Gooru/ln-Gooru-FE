import Ember from 'ember';
import { DEFAULT_PAGE_SIZE } from 'gooru-web/config/config';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {libraryService} Library service object
   */
  libraryService: Ember.inject.service('api-sdk/library'),

  /**
   * @type {Controller} Application controller
   */
  appController: Ember.inject.controller('application'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    showMoreResults: function(){
      this.showMoreResults();
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {number} library id
   */
  libraryId: null,

  /**
   * @property {Question[]} questions
   */
  questions: null,

  /**
   * @property {Profile} Session Profile
   */
  sessionProfile: Ember.computed.alias('appController.profile'),

  /**
   * @property {*}
   */
  pagination: {
    page: 0,
    pageSize: DEFAULT_PAGE_SIZE
  },

  /**
   * @property {boolean}
   */
  showMoreResultsButton: Ember.computed('questions.[]', function(){
    return this.get('questions.length') &&
      (this.get('questions.length') % this.get('pagination.pageSize') === 0);
  }),

  // Methods
  showMoreResults: function(){
    const controller = this;
    const libraryId = this.get('libraryId');
    const pagination = this.get('pagination');
    pagination.page = pagination.page + 1;
    pagination.pageSize = pagination.pageSize;

    controller.get('libraryService')
    .fetchLibraryContent(libraryId, 'question', pagination)
    .then(function(questions) {
        controller.get('questions').pushObjects(questions.toArray());
    });
  },

  resetValues: function(){
    this.set('pagination', {
      page: 0,
      pageSize: DEFAULT_PAGE_SIZE
    });
  },

  /**
   * Map each question to their corresponding owner
   * @param {Question[]} question list
   * @param {Owner[]} owner list
   */
  mapOwners: function (questions, owners) {
    let ownerMap = {};
    owners.forEach(function (owner) {
      ownerMap[owner.id] = owner;
    });
    let mappedQuestions = questions.map(function (question) {
      question.owner = ownerMap[question.ownerId];
      return question;
    });
    return mappedQuestions;
  }

});
