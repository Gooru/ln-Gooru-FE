import Ember from 'ember';
import CollectionEdit from 'gooru-web/components/content/collections/gru-collection-edit';
import { CONTENT_TYPES } from 'gooru-web/config/config';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import {
  getCategoryCodeFromSubjectId,
  getSubjectId,
  getGutCodeFromSubjectId
} from 'gooru-web/utils/taxonomy';
export default CollectionEdit.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:api-sdk/course
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  /**
   * @type {SessionService} Service to retrieve session information
   */
  session: Ember.inject.service('session'),

  /**
   * Collection model as instantiated by the route. This is the model used when not editing
   * or after any collection changes have been saved.
   * @property {Collection}
   */
  collection: null,

  aggregatedTags: Ember.computed('tempCollection.aggregatedTag.[]', function() {
    let aggregatedTags = TaxonomyTag.getTaxonomyTags(
      this.get('tempCollection.aggregatedTag'),
      false,
      false,
      true
    );
    return aggregatedTags;
  }),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'assessments', 'gru-assessment-edit'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    selectCategory: function(category) {
      let component = this;
      if (category === component.get('selectedCategory')) {
        component.set('selectedCategory', null);
      } else {
        component.set('selectedCategory', category);
      }
      component.set('selectedSubject', null);
    },
    /**
     * Save Content
     */
    updateContent: function() {
      let component = this;
      let editedAssessment = component.get('tempCollection');
      let assessment = component.get('collection');
      editedAssessment.validate().then(function({ validations }) {
        if (validations.get('isValid')) {
          let imageIdPromise = new Ember.RSVP.resolve(
            editedAssessment.get('thumbnailUrl')
          );
          if (
            editedAssessment.get('thumbnailUrl') &&
            editedAssessment.get('thumbnailUrl') !==
              assessment.get('thumbnailUrl')
          ) {
            imageIdPromise = component
              .get('mediaService')
              .uploadContentFile(editedAssessment.get('thumbnailUrl'));
          }
          imageIdPromise.then(function(imageId) {
            editedAssessment.set('thumbnailUrl', imageId);
            component
              .get('assessmentService')
              .updateAssessment(editedAssessment.get('id'), editedAssessment)
              .then(function() {
                assessment.merge(editedAssessment, [
                  'title',
                  'learningObjectives',
                  'isVisibleOnProfile',
                  'thumbnailUrl',
                  'standards',
                  'audience',
                  'depthOfknowledge',
                  'centurySkills'
                ]);
                component.set('isEditing', false);
                component
                  .get('tempCollection.standards')
                  .forEach(function(suggeststanObj) {
                    suggeststanObj.set('isRemovable', false);
                  });
              })
              .catch(function(error) {
                var message = component
                  .get('i18n')
                  .t('common.errors.assessment-not-updated').string;
                component.get('notifications').error(message);
                Ember.Logger.error(error);
              });
          });
        }
        component.set('didValidate', true);
      });
    },

    /**
     * Add tag data from the taxonomy list in tempUnit
     */
    addTag: function(taxonomyTag) {
      // let tagData = taxonomyTag;
      taxonomyTag.set('isRemovable', true);
      taxonomyTag.set('tagAlreadyexist', false);
      this.get('tempCollection.standards').addObject(taxonomyTag);
      this.set(
        'tempCollection.standards',
        this.get('tempCollection.standards').uniqBy('code')
      );
      this.get('tempCollection.aggregatedTag').removeObject(taxonomyTag);
      let newtaxonomyObj = Ember.Object.create({
        code: taxonomyTag.get('code'),
        frameworkCode: taxonomyTag.get('frameworkCode'),
        isRemovable: false,
        tagAlreadyexist: false
      });
      this.get('tempCollection.aggregatedTag').addObject(newtaxonomyObj);
      this.compareAggregatedTags();
    },
    /**
     * Remove tag data from the taxonomy list in tempUnit
     */
    removeTag: function(taxonomyTag) {
      var tagData = taxonomyTag;
      this.get('tempCollection.standards').removeObject(tagData);
      tagData.set('isRemovable', false);
      tagData.set('tagAlreadyexist', false);
      this.get('tempCollection.aggregatedTag').addObject(tagData);
      this.set(
        'tempCollection.aggregatedTag',
        this.get('tempCollection.aggregatedTag').uniqBy('code')
      );
      this.compareAggregatedTags();
    },

    /**
     * Save setting for visibility of collection in profile
     */
    publishToProfile: function() {
      var collectionForEditing = this.get('collection').copy();
      this.set('tempCollection', collectionForEditing);
      this.actions.updateContent.call(this);
    },

    /**
     * @type {String} the selected category
     */
    selectedCategory: Ember.computed('collection', function() {
      let standard = this.get('collection.standards.firstObject');
      let subjectId = standard ? getSubjectId(standard.get('id')) : null;
      return subjectId ? getCategoryCodeFromSubjectId(subjectId) : null;
    }),

    selectedSubject: Ember.computed('collection', function() {
      let standard = this.get('collection.standards.firstObject');
      if (standard) {
        standard.set(
          'subjectCode',
          getGutCodeFromSubjectId(getSubjectId(standard.get('id')))
        );
      }
      return standard ? standard : null;
    }),
    /**
     * Delete assessment
     */
    deleteItem: function() {
      const myId = this.get('session.userId');
      var model = {
        content: this.get('collection'),
        isHeaderDelete: true,
        parentName: this.get('course.title'),
        deleteMethod: function() {
          return this.get('assessmentService').deleteAssessment(
            this.get('collection')
          );
        }.bind(this),
        type: CONTENT_TYPES.ASSESSMENT,
        redirect: {
          route: 'library-search',
          params: {
            profileId: myId,
            type: 'my-content'
          }
        }
      };

      this.actions.showModal.call(
        this,
        'content.modals.gru-delete-content',
        model,
        null,
        null,
        null,
        false
      );
    },

    //Action triggered when click back in the edit page
    onClickBack() {
      let isPreview = this.get('isPreviewReferrer');
      const router = this.get('router');
      const previewRoute = 'library-search';
      const myId = this.get('session.userId');

      let queryParams = {
        profileId: myId,
        type: 'my-content',
        activeContentType: 'assessment'
      };

      if (isPreview) {
        router.transitionTo(previewRoute, { queryParams });
      } else {
        window.history.back();
      }
    }
  },

  /**
   * Returns compareAggregatedTags data
   * @param {Number[]} compareAggregatedTags ids
   * @return {compareAggregatedTags[]}
   */
  compareAggregatedTags: function() {
    const component = this;
    component
      .get('tempCollection.aggregatedTag')
      .forEach(function(suggeststanObj) {
        Ember.set(suggeststanObj, 'tagAlreadyexist', true);
      });
    component.get('tempCollection.standards').forEach(function(standardObj) {
      var suggestObj = component
        .get('tempCollection.aggregatedTag')
        .findBy('code', standardObj.code);
      if (suggestObj !== undefined) {
        Ember.set(suggestObj, 'tagAlreadyexist', false);
      }
    });
  },

  init: function() {
    this._super(...arguments);
    let collection = this.get('collection').copy();
    // let audience = collection.audience || Ember.A([]);
    // this.set(collection, 'audience', audience);
    this.set('tempCollection', collection);
  }
});
