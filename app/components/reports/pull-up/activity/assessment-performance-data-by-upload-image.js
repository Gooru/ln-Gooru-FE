import Ember from 'ember';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['assessment-performance-data-by-upload-image'],

  // -------------------------------------------------------------------------
  // Properties
  /**
   * Selected file
   * @prop {Array}
   */
  selectedFiles: Ember.A([]),

  /**
   * List of error messages to present to the user for conditions that the loaded image does not meet
   * @prop {String[]}
   */
  filePickerErrors: null,

  /**
   * List of valid file extensions.
   * @prop {String}
   */
  mimeType: 'image/*',

  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  taxonomyTags: Ember.computed('assessment.standards.[]', function() {
    var standards = this.get('assessment.standards');
    if (standards) {
      standards = standards.filter(function(standard) {
        // Filter out learning targets (they're too long for the card)
        return !TaxonomyTagData.isMicroStandardId(standard.get('id'));
      });
    }
    return TaxonomyTag.getTaxonomyTags(standards);
  }),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * @function actions:enableButtons
     */
    prepareForSubmission(file) {
      const component = this;
      let selectedFiles = component.get('selectedFiles');
      component.readFile(file).then(function(fileData) {
        selectedFiles.pushObject(Ember.Object.create({
          file: fileData,
          name: fileData.name
        }));
      });
    }
  },

  // -------------------------------------------------------------------------
  // Events
  init: function() {
    this._super(...arguments);
    this.set('filePickerErrors', Ember.A());
  },

  // -------------------------------------------------------------------------
  // Methods
  readFile(file) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      const reader = new FileReader();
      reader.onloadend = function() {
        file.data = reader.result;
        resolve(file);
      };
      if (file) {
        reader.readAsDataURL(file);
      } else {
        reject();
      }
    });
  }
});
