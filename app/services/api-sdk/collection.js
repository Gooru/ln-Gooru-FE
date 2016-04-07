import Ember from 'ember';
import StoreMixin from '../../mixins/store';
import SessionMixin from '../../mixins/session';
import CollectionSerializer from 'gooru-web/serializers/content/collection';
import CollectionAdapter from 'gooru-web/adapters/content/collection';


/**
 * @typedef {Object} CollectionService
 */
export default Ember.Service.extend(StoreMixin, SessionMixin, {

  /**
   * @property {CollectionSerializer} collectionSerializer
   */
  collectionSerializer: null,

  /**
   * @property {CollectionAdapter} collectionAdapter
   */
  collectionAdapter: null,

  init: function () {
    this._super(...arguments);
    this.set('collectionSerializer', CollectionSerializer.create());
    this.set('collectionAdapter', CollectionAdapter.create(Ember.getOwner(this).ownerInjection()));
  },


  /**
   * Creates a new collection
   *
   * @param collectionData object with the collection data
   * @returns {Promise}
   */
  createCollection: function(collectionData) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      let serializedClassData = service.get('collectionSerializer').serializeCreateCollection(collectionData);
      service.get('collectionAdapter').createCollection({
        body: serializedClassData
      }).then(function(responseData, textStatus, request) {
        let collectionId = request.getResponseHeader('location');
        collectionData.set('id', collectionId);
        resolve(collectionData);
      }, function(error) {
        reject(error);
      });
    });
  },

  /**
   * Gets a specific collection|assessment by ID
   * @param {string} collectionId
   * @returns {Collection}
   */
  findById: function(collectionId) {
    return this.get('store').findRecord('collection/collection', collectionId, { reload: true });
  },

  /**
   * Gets all collections|assessments for an specific unit and lesson.
   * @param classId
   * @param courseId
   * @param unitId
   * @param lessonId
   * @returns {Collection[]}
   */
  findByClassAndCourseAndUnitAndLesson: function(classId, courseId, unitId, lessonId){
    return this.get('store').queryRecord('collection/collection',{
      classId : classId,
      courseId : courseId,
      unitId : unitId,
      lessonId : lessonId
    });
  }
});
