import Ember from 'ember';
import {
  getCategoryCodeFromSubjectId
} from 'gooru-web/utils/taxonomy';
export default Ember.Component.extend({

  classNames: ['search-by-filter'],

  classNameBindings: ['isShow:active'],
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  /**
   * @property {Service} LookupService service
   */
  lookupService: Ember.inject.service('api-sdk/lookup'),

  /**
   * @property {Service} Taxonomy service
   */
  taxonomyService: Ember.inject.service('taxonomy'),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Array} Competency
   * Property to handle to show the component
   */
  isShow: false,

  hideAppScroll: false,

  resourceTypes: Ember.A([{}]),

  /**
   * @property {Array} Competency
   * Property to hold selected subject courses
   */
  selectedCourse: null,

  /**
   * @property {Array} Competency
   * Observer to load taxonomy picker whenever subject changes
   */
  onSubjectSelected: Ember.observer('selectedSubject.courses.[]', function() {
    let component = this;
    component.set('selectedCourse', this.get('selectedSubject.courses'));
    component.loadTaxonomyPicker();
  }),

  /**
   * @property {Array} Competency
   * Property to hold selected competency
   */
  selectedCompetencies: Ember.A([]),

  /**
   * i18n key for the browse selector text
   * @property {string}
   */
  browseSelectorText: Ember.computed(
    'taxonomyPickerData.standardLabel',
    function() {
      const standardLabel = this.get('taxonomyPickerData.standardLabel');
      return standardLabel ?
        'taxonomy.modals.gru-standard-picker.browseSelectorText' :
        'taxonomy.modals.gru-standard-picker.browseCompetencySelectorText';
    }
  ),

  /**
   * i18n key for the selected text key
   * @property {string}
   */
  selectedTextKey: Ember.computed(
    'taxonomyPickerData.standardLabel',
    function() {
      const standardLabel = this.get('taxonomyPickerData.standardLabel');

      return standardLabel ?
        'taxonomy.modals.gru-standard-picker.selectedText' :
        'taxonomy.modals.gru-standard-picker.selectedCompetencyText';
    }
  ),

  /**
   * @property {Array} domain
   * Property to hold selected domain
   */
  domain: null,

  /**
   * @property {Array} domian
   * Property to hold selected course
   */
  course: null,

  /**
   * @property {Object} filterItems
   */
  filterItems: Ember.Object.create({}),

  selectedFilters: Ember.A([]),

  /**
   * @property {String} selectedFilterBy
   */
  selectedFilterBy: null,

  /**
   * @type {String} the selected category
   */
  selectedCategory: Ember.computed(
    'preference',
    function() {
      let subjectId = this.get('preference.subject');
      return getCategoryCodeFromSubjectId(subjectId) || null;
    }
  ),

  init() {
    let component = this;
    component._super(...arguments);
    component.fetchAudiences();
    component.fetchLanguages();
    component.fetchEducationalUse();
    component.loadResourceTypes();
    component.loadFilters();
    component.loadSubjects();
  },

  actions: {
    selectSubject(subject) {
      let component = this;
      component.set('selectedSubject', subject);
    },

    selectCategory(category) {
      let component = this;
      if (category === component.get('selectedCategory')) {
        component.set('selectedCategory', null);
      } else {
        component.set('selectedCategory', category);
      }
      component.set('selectedSubject', null);
    },

    setAuthor() {
      let component = this;
      let term = $.trim(this.get('authorName'));
      let filterItems = component.get('selectedFilters');
      filterItems['flt.authorName'] = term;
    },

    setPublisher() {
      let component = this;
      let term = $.trim(this.get('publisherName'));
      let filterItems = component.get('selectedFilters');
      filterItems['flt.publisherName'] = term;
    },

    updateSelectedTags(selectedTags) {
      const component = this;
      var dataTags = selectedTags.map(function(taxonomyTag) {
        return taxonomyTag.get('data');
      });
      const standards = Ember.A(dataTags);
      component.set('selectedCompetencies', standards);
      standards.map((standard) => {
        component.get('selectedFilters').pushObject(Ember.Object.create({
          name: standard.get('id'),
          filter: 'flt.standard'
        }));
      });
    },

    loadTaxonomyData(path) {
      return new Ember.RSVP.Promise(
        function(resolve) {
          var subject = this.get('taxonomyPickerData.subject');
          var taxonomyService = this.get('taxonomyService');

          if (path.length > 1) {
            let courseId = path[0];
            let domainId = path[1];
            taxonomyService
              .getCourseDomains(subject, courseId)
              .then(function() {
                taxonomyService
                  .getDomainCodes(subject, courseId, domainId)
                  .then(function(standards) {
                    resolve(standards);
                  });
              });
          } else {
            let courseId = path[0];
            taxonomyService
              .getCourseDomains(subject, courseId)
              .then(function(domains) {
                resolve(domains);
              });
          }
        }.bind(this)
      );
    },

    onSelectResourceType(type) {
      const component = this;
      type.set('active', !type.get('active'));
      if (type.get('active')) {
        component.get('selectedFilters').pushObject(type);
      } else {
        component.get('selectedFilters').removeObject(type);
      }
    },

    //Action triggered when select audience card
    onSelectAudience(audience) {
      const component = this;
      audience.set('active', !audience.get('active'));
      if (audience.get('active')) {
        component.get('selectedFilters').pushObject(audience);
      } else {
        component.get('selectedFilters').removeObject(audience);
      }
    },

    onSelectLanguage(language) {
      const component = this;
      language.set('active', !language.get('active'));
      if (language.get('active')) {
        component.get('selectedFilters').pushObject(language);
      } else {
        component.get('selectedFilters').removeObject(language);
      }
    },

    onSelectEducational(educational) {
      const component = this;
      educational.set('active', !educational.get('active'));
      if (educational.get('active')) {
        component.get('selectedFilters').pushObject(educational);
      } else {
        component.get('selectedFilters').removeObject(educational);
      }
    },

    onSelectFilter(filterItem) {
      const component = this;
      component.set('selectedFilterBy', filterItem.get('type'));
    }
  },

  handleAppContainerScroll() {
    let component = this;
    let isOpen = component.get('isShow');
    if (isOpen) {
      Ember.$(document.body).addClass('no-vertical-scroll');
    } else {
      Ember.$(document.body).removeClass('no-vertical-scroll');
    }
  },

  /**
   * @function fetchAudiences
   * Method to fetch audiences
   */
  fetchAudiences() {
    const component = this;
    const lookupService = component.get('lookupService');
    lookupService.readAudiences().then((audiences) => {
      let serializeData = audiences.map((audience) => {
        return Ember.Object.create({
          name: audience.get('name'),
          filter: 'flt.audience'
        });
      });
      component.set('audiences', Ember.A(serializeData));
    });
  },

  fetchEducationalUse() {
    const component = this;
    const lookupService = component.get('lookupService');
    lookupService.getEducationalUse().then((educationalUses) => {
      let serializeData = educationalUses.map((educationalUse) => {
        return Ember.Object.create({
          name: educationalUse.get('label'),
          filter: 'flt.educational'
        });
      });
      component.set('educationalUses', Ember.A(serializeData));
    });
  },

  /**
   * Loads subjects by category
   */
  loadSubjects() {
    const component = this;
    component
      .get('taxonomyService')
      .getSubjects(component.get('selectedCategory'))
      .then(function(subjects) {
        let preference = component.get('preference');
        let preferedSubjects = subjects.findBy('code', preference.get('subject'));
        let subject = preferedSubjects.get('frameworks').findBy('frameworkId', preference.get('framework'));
        component.set('selectedSubject', subject);
      });
  },

  /**
   * @function fetchAudiences
   * Method to fetch audiences
   */
  fetchLanguages() {
    const component = this;
    const lookupService = component.get('lookupService');
    lookupService.getLanguages().then((languages) => {
      let serializeData = languages.map((language) => {
        return Ember.Object.create({
          name: language.get('name'),
          filter: 'flt.language'
        });
      });
      component.set('languages', Ember.A(serializeData));
    });
  },

  loadResourceTypes() {
    const component = this;
    component.set('resourceTypes', [
      Ember.Object.create({
        name: component.get('i18n').t('resource.video').string,
        type: 'flt.resources'
      }),
      Ember.Object.create({
        name: component.get('i18n').t('resource.webpage').string,
        type: 'flt.resources'
      }),
      Ember.Object.create({
        name: component.get('i18n').t('resource.interactive').string,
        type: 'flt.resources'
      }),
      Ember.Object.create({
        name: component.get('i18n').t('resource.image').string,
        type: 'flt.resources'
      }),
      Ember.Object.create({
        name: component.get('i18n').t('resource.text').string,
        type: 'flt.resources'
      }),
      Ember.Object.create({
        name: component.get('i18n').t('resource.audio').string,
        type: 'flt.resources'
      })
    ]);
  },
  /**
   * @function loadTaxonomyPicker
   * Method to load taxonomy picker
   */
  loadTaxonomyPicker() {
    const component = this;
    var standards = component.get('selectedCompetencies') || [];
    var subject = component.get('selectedSubject');
    var taxonomyPickerData = {
      selected: standards,
      shortcuts: null,
      subject,
      standardLabel: true
    };
    component.set('taxonomyPickerData', taxonomyPickerData);
    const standardLabel = this.get('taxonomyPickerData.standardLabel') ?
      'common.standard' :
      'common.competency';

    component.set('panelHeaders', [
      component.get('i18n').t('common.course').string,
      component.get('i18n').t('common.domain').string,
      component.get('i18n').t(standardLabel).string
    ]);
  },

  loadFilters() {
    const component = this;
    component.set('filters', [
      Ember.Object.create({
        label: component.get('i18n').t('search-filter.courses').string,
        type: 'courses'
      }),
      Ember.Object.create({
        label: component.get('i18n').t('search-filter.collections').string,
        type: 'collections'
      }),
      Ember.Object.create({
        label: component.get('i18n').t('search-filter.assessments').string,
        type: 'assessments'
      }),
      Ember.Object.create({
        label: component.get('i18n').t('search-filter.resources').string,
        type: 'resources'
      }),
      Ember.Object.create({
        label: component.get('i18n').t('search-filter.rubrics').string,
        type: 'rubrics'
      })
    ]);
  }
});
