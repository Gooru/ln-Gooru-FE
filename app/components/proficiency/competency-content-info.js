import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['competency-content-info'],

  // -------------------------------------------------------------------------
  // Events
  didRender() {
    var component = this;
    component.$('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });
  },

  actions: {
    onSelectActivityContent(contentType) {
      let component = this;
      component.sendAction('onSelectActivityContent', contentType);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Array} contentCounts
   */
  contentCounts: Ember.computed('learningMapData.contents', function() {
    let component = this;
    let competencyContents = component.get('learningMapData.contents');
    return Ember.A([
      {
        type: 'course',
        count: competencyContents.course.totalHitCount || 0
      },
      {
        type: 'unit',
        count: competencyContents.unit.totalHitCount || 0
      },
      {
        type: 'lesson',
        count: competencyContents.lesson.totalHitCount || 0
      },
      {
        type: 'rubric',
        count: competencyContents.rubric.totalHitCount || 0
      },
      {
        type: 'assessment',
        count: competencyContents.assessment.totalHitCount || 0
      },
      {
        type: 'collection',
        count: competencyContents.collection.totalHitCount || 0
      },
      {
        type: 'question',
        count: competencyContents.question.totalHitCount || 0
      },
      {
        type: 'resource',
        count: competencyContents.resource.totalHitCount || 0
      }
    ]);
  }),

  /**
   * @property {Array} preRequisites
   */
  preRequisites: Ember.computed('learningMapData.prerequisites', function() {
    let component = this;
    let competencyPreRequisites = component.get('learningMapData.prerequisites');
    return competencyPreRequisites || null;
  }),

  /**
   * @property {Array} signatureAssessments
   */
  signatureAssessments: Ember.computed('learningMapData.signatureContents', function() {
    let component = this;
    let signatureContents = component.get('learningMapData.signatureContents');
    let signatureAssessments = signatureContents.assessments;
    return signatureAssessments || null;
  }),

  /**
   * @property {Array} signatureCollections
   */
  signatureCollections: Ember.computed('learningMapData.signatureContents', function() {
    let component = this;
    let signatureContents = component.get('learningMapData.signatureContents');
    let signatureCollections = signatureContents.collections;
    return signatureCollections || null;
  })
});
