import Ember from 'ember';
import QuizzesContext from 'quizzes-addon/models/context/context';

/**
 * Convenience mixin for accesing the quizzes context service
 *
 * @typedef {Object} ConfigurationMixin
 */
export default Ember.Mixin.create({
  /**
   * @property {Ember.Service} Service to create/get quizzes contexts
   */
  quizzesContextService: Ember.inject.service('quizzes/context'),

  /**
   * Create or get a quizzes context
   * @param {object} params All route params
   * @param {Collection} collection
   * @param {boolean} hasContext if class id and context mapping should be added
   */
  createContext: function(params, collection, hasContext) {
    let context = QuizzesContext.create({
      collectionId: collection.get('id'),
      title: collection.get('title'),
      isCollection: collection.get('isCollection')
    });
    if (hasContext) {
      let contextInfo = null;
      if (params.caContentId) {
        contextInfo = btoa(
          JSON.stringify({ dcaContentId: params.caContentId })
        );
      }
      context.setProperties({
        classId: params.classId,
        contextMapping: {
          courseId: params.courseId || collection.get('courseId'),
          unitId: params.unitId || collection.get('unitId'),
          lessonId: params.lessonId || collection.get('lessonId'),
          eventSource: params.source,
          version: 1,
          contextInfo
        }
      });
    }
    return this.get('quizzesContextService').createContext(context);
  }
});
