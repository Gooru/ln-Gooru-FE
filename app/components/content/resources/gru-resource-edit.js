import Ember from 'ember';
import ContentEditMixin from 'gooru-web/mixins/content/edit';
import ProtocolMixin from 'gooru-web/mixins/content/protocol';
import {
  RESOURCE_COMPONENT_MAP,
  RESOURCE_TYPES,
  CONTENT_TYPES,
  EDUCATION_CATEGORY,
  UPLOADABLE_TYPES,
  VIDEO_RESOURCE_TYPE
} from 'gooru-web/config/config';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';
import ModalMixin from 'gooru-web/mixins/modal';
import { isVideoURL, inferUploadType } from 'gooru-web/utils/utils';
import {
  getCategoryCodeFromSubjectId,
  getSubjectId,
  getGutCodeFromSubjectId
} from 'gooru-web/utils/taxonomy';
export default Ember.Component.extend(
  ContentEditMixin,
  ModalMixin,
  ProtocolMixin,
  {
    // -------------------------------------------------------------------------
    // Dependencies

    session: Ember.inject.service('session'),

    /**
     * @requires service:notifications
     */
    notifications: Ember.inject.service(),

    /**
     * @property {MediaService} Media service API SDK
     */
    mediaService: Ember.inject.service('api-sdk/media'),

    /**
     * @requires service:api-sdk/resource
     */
    resourceService: Ember.inject.service('api-sdk/resource'),

    /**
     * @requires service:api-sdk/profile
     */
    profileService: Ember.inject.service('api-sdk/profile'),

    /**
     * @property {Service} I18N service
     */
    i18n: Ember.inject.service(),

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
      editContent: function() {
        var resourceForEditing = this.get('resource').copy();
        this.set('tempResource', resourceForEditing);
        this.get('tempResource').set('owner', this.get('resource.owner'));
        this.set('isEditing', true);
      },

      /**
       * Select resource type
       */
      selectType: function(type) {
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
      publishToProfile: function() {
        var resourceForEditing = this.get('resource').copy();
        this.set('tempResource', resourceForEditing);
        this.saveContent();
      },

      /**
       * Delete resource
       */
      deleteResource: function() {
        const myId = this.get('session.userId');
        const collection = this.get('collection');
        var model = {
          content: this.get('resource'),
          deleteMethod: function() {
            return this.get('resourceService').deleteResource(
              this.get('resource.id'),
              collection
            );
          }.bind(this),
          type: CONTENT_TYPES.RESOURCE,
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
          'content.modals.gru-delete-resource',
          model,
          null,
          null,
          null,
          false
        );
      },

      addToCollection: function() {
        const component = this;
        if (component.get('session.isAnonymous')) {
          component.send('showModal', 'content.modals.gru-login-prompt');
        } else {
          component
            .get('profileService')
            .readCollections(component.get('session.userId'))
            .then(function(collections) {
              component.send(
                'showModal',
                'content.modals.gru-add-to-collection',
                {
                  content: component.get('resource'),
                  collections
                },
                null,
                'add-to'
              );
            });
        }
      },

      selectSubject: function(subject) {
        this.set('selectedSubject', subject);
      },

      selectCategory: function(category) {
        let component = this;
        var standardLabel = category === EDUCATION_CATEGORY.value;
        component.set('standardLabel', !standardLabel);
        if (category === component.get('selectedCategory')) {
          component.set('selectedCategory', null);
        } else {
          component.set('selectedCategory', category);
        }
        component.set('selectedSubject', null);
      },

      /**
       * Remove tag data from the taxonomy list in tempUnit
       */
      removeTag: function(taxonomyTag) {
        var tagData = taxonomyTag.get('data');
        this.get('tempResource.standards').removeObject(tagData);
      },

      openTaxonomyModal: function() {
        this.openTaxonomyModal();
      },

      setPublisher: function(checked) {
        var tempResource = this.get('tempResource');
        if (checked) {
          tempResource.set('publisher', this.get('session.userData.username'));
          tempResource.set('amIThePublisher', true);
        } else {
          tempResource.set('publisher', '');
          tempResource.set('amIThePublisher', false);
        }
      },

      linkSwitch: function() {
        var tempResource = this.get('tempResource');
        tempResource.set('displayGuide', this.get('tempResource.displayGuide'));
      },

      openSkillsModal: function() {
        this.openSkillsModal();
      },

      /**
       * Remove century skill id
       */
      removeSkill: function(skillItemId) {
        this.get('tempResource.centurySkills').removeObject(skillItemId);
      },

      //Action triggered when click on back
      onClickBack() {
        window.history.back();
      },

      //Action triggered when click on edit button in resource
      editResource: function() {
        var resourceForEditing = this.get('resource').copy();
        this.set('tempResource', resourceForEditing);
        this.set('isResourceEditing', true);
      },

      //Action triggered when change the resource urlResourceFactory
      onURLChange: function() {
        this.detectVimeoYoutubeVideoURL(this.get('tempResource.url'));
      },

      //Action triggered when click on save button in resource
      updateResource: function() {
        const component = this;
        var editedResource = component.get('tempResource');
        if (component.get('isUrlChange')) {
          if (this.get('editedResource.file')) {
            this.set(
              'emptyFileError',
              this.get('i18n').t('common.errors.file-upload-missing', {
                extensions: this.get('resource.extensions')
              })
            );
          } else {
            editedResource.validate().then(function({ validations }) {
              if (validations.get('isValid')) {
                component
                  .handleResourceUpload(editedResource)
                  .then(function(uploadedResource) {
                    component.set('tempResource', uploadedResource);
                    component.saveContent();
                  });
              }
              component.set('didValidate', true);
            });
          }
        } else {
          component.set('isResourceEditing', false);
        }
      },

      //Action triggered when click on cancel button in resource
      cancelEditResources: function() {
        this.set('isResourceEditing', false);
      },

      selectFile: function(file) {
        this.set('tempResource.file', file);
        if (file) {
          let uploadType = inferUploadType(file.name, UPLOADABLE_TYPES);
          this.send('selectUploadType', uploadType);
        }
      },

      selectUploadType: function(uploadType) {
        if (uploadType) {
          this.set('tempResource.format', uploadType.value);
          this.set('tempResource.extensions', uploadType.validExtensions);
          this.set('tempResource.mimeType', uploadType.validType);
        }
      }
    },

    // -------------------------------------------------------------------------
    // Properties

    /**
     * Indicates if the url is a video url
     * @property {boolean}
     */
    isVideo: Ember.computed('resource.url', function() {
      return isVideoURL(this.get('resource.url'));
    }),

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

    /**
     * i18n key for the standard/competency dropdown label
     * @property {string}
     */
    standardLabelKey: Ember.computed('standardLabel', function() {
      return this.get('standardLabel')
        ? 'common.standards'
        : 'common.competencies';
    }),

    /**
     * @property {boolean}
     */
    standardLabel: true,

    /**
     * @property {boolean}
     */
    standardDisabled: Ember.computed.not('selectedSubject'),

    /**
     * @property {TaxonomyTag[]} List of taxonomy tags
     */
    tags: Ember.computed('resource.standards.[]', function() {
      return TaxonomyTag.getTaxonomyTags(this.get('resource.standards'), false);
    }),

    /**
     * @property {TaxonomyTag[]} List of taxonomy tags
     */
    editableTags: Ember.computed('tempResource.standards.[]', function() {
      return TaxonomyTag.getTaxonomyTags(
        this.get('tempResource.standards'),
        false,
        true
      );
    }),

    /**
     * Toggle Options
     * @property {Ember.Array}
     */
    switchOptions: Ember.A([
      Ember.Object.create({
        label: 'On',
        value: true
      }),
      Ember.Object.create({
        label: 'Off',
        value: false
      })
    ]),

    /**
     * Indicates if the current resource type is resource
     * @property {boolean}
     */
    isNotIframeUrl: Ember.computed('resource', function() {
      const resource = this.get('resource');
      return resource && resource.displayGuide;
    }),

    /**
     * Indicates is the resource type edit option should be disabled
     * @property {boolean}
     */
    disableTypeEdition: Ember.computed('resource.url', function() {
      return isVideoURL(this.get('resource.url'));
    }),

    /**
     * @property {CenturySkill[]} List of selected century skills
     */
    tempSelectedSkills: Ember.computed(
      'tempResource.centurySkills.[]',
      'centurySkills.[]',
      function() {
        let selectedCenturySkillsIds = this.get('tempResource.centurySkills');

        return this.selectedCenturySkillsData(selectedCenturySkillsIds);
      }
    ),

    /**
     * @property {CenturySkill[]} List of selected century skills
     */
    selectedSkills: Ember.computed(
      'resource.centurySkills.[]',
      'centurySkills.[]',
      function() {
        let selectedCenturySkillsIds = this.get('resource.centurySkills');

        return this.selectedCenturySkillsData(selectedCenturySkillsIds);
      }
    ),

    /**
     * List of Century Skills
     * @prop {CenturySkill[]}
     */
    centurySkills: Ember.A([]),

    /**
     * @type {String} the selected category
     */
    selectedCategory: Ember.computed('resource', function() {
      let standard = this.get('resource.standards.firstObject');
      let subjectId = standard ? getSubjectId(standard.get('id')) : null;
      return subjectId ? getCategoryCodeFromSubjectId(subjectId) : null;
    }),

    selectedSubject: Ember.computed('resource', function() {
      let standard = this.get('resource.standards.firstObject');
      if (standard) {
        standard.set(
          'subjectCode',
          getGutCodeFromSubjectId(getSubjectId(standard.get('id')))
        );
      }
      return standard ? standard : null;
    }),

    /**
     * @property {boolean}
     */
    isResourceEditing: false,

    /**
     * @type {String} emptyFileError
     */
    emptyFileError: null,

    /**
     * @property {boolean}
     */
    isResourcesAlreadyExists: false,

    /**
     * @property {boolean}
     */
    isUrlChange: Ember.computed('resource', function() {
      let currentURL = this.get('tempResource.url');
      return currentURL !== this.get('resource.url');
    }),

    isEditResources: Ember.computed('resource', function() {
      let resourceOwner = this.get('resource.owner');
      let ownerId = resourceOwner ? resourceOwner.get('id') : null;
      let userId = this.get('session.userId');
      let originalResourceId = this.get('resource.originalResourceId');
      return !originalResourceId && userId === ownerId;
    }),

    // -------------------------------------------------------------------------
    // Methods

    openTaxonomyModal: function() {
      var component = this;
      var standards = component.get('tempResource.standards') || [];
      var subject = component.get('selectedSubject');
      var subjectStandards = TaxonomyTagData.filterBySubject(
        subject,
        standards
      );
      var notInSubjectStandards = TaxonomyTagData.filterByNotInSubject(
        subject,
        standards
      );
      var model = {
        selected: subjectStandards,
        shortcuts: null, // TODO: TBD
        subject: subject,
        standardLabel: component.get('standardLabel'),
        callback: {
          success: function(selectedTags) {
            var dataTags = selectedTags.map(function(taxonomyTag) {
              return taxonomyTag.get('data');
            });
            const standards = Ember.A(dataTags);
            standards.pushObjects(notInSubjectStandards.toArray());
            component.get('tempResource.standards').pushObjects(standards);
            component.set(
              'tempResource.standards',
              component.get('tempResource.standards').uniqBy('code')
            );
          }
        }
      };

      this.actions.showModal.call(
        this,
        'taxonomy.modals.gru-standard-picker',
        model,
        null,
        'gru-standard-picker'
      );
    },

    /**
     * Save Content
     */
    saveContent: function() {
      const component = this;
      const collection = component.get('collection');
      var editedResource = component.get('tempResource');
      editedResource.validate().then(function({ validations }) {
        if (validations.get('isValid')) {
          if (!component.get('isUrlChange')) {
            Ember.set(editedResource, 'url', undefined);
          }
          if (editedResource.description === '') {
            Ember.set(editedResource, 'description', null);
          }
          component
            .get('resourceService')
            .updateResource(
              component.get('resource.id'),
              editedResource,
              collection
            )
            .then(
              function() {
                if (!component.get('isUrlChange')) {
                  Ember.set(
                    editedResource,
                    'url',
                    component.get('resource.url')
                  );
                }
                component.set('resource', editedResource);
                component.set('isEditing', false);
                component.set('isResourceEditing', false);
                component.set('isResourcesAlreadyExists', false);
              },
              function(data) {
                if (data.resourceId) {
                  //already exists
                  component.set('isResourcesAlreadyExists', true);
                }
              }
            )
            .catch(function() {
              var message = component
                .get('i18n')
                .t('common.errors.resource-not-updated').string;
              component.get('notifications').error(message);
            });
        }
        component.set('didValidate', true);
      });
    },

    openSkillsModal: function() {
      var component = this;
      var model = {
        selectedCenturySkills: component.get('tempResource.centurySkills'),
        centurySkills: component.get('centurySkills'),
        callback: {
          success: function(selectedCenturySkills) {
            component.set(
              'tempResource.centurySkills',
              Ember.A(selectedCenturySkills)
            );
          }
        }
      };
      this.actions.showModal.call(
        this,
        'century-skills.modals.gru-century-skills',
        model,
        null,
        'gru-century-skills'
      );
    },

    /**
     * Returns selectedCenturySkills data
     * @param {Number[]} selectedCenturySkills ids
     * @return {centurySkill[]}
     */
    selectedCenturySkillsData: function(selectedCenturySkillsIds) {
      var selectedCenturySkillsData = Ember.A([]);
      let centurySkills = this.get('centurySkills');

      if (selectedCenturySkillsIds && centurySkills) {
        for (var i = 0; i < selectedCenturySkillsIds.length; i++) {
          var skillItem = selectedCenturySkillsIds[i];

          centurySkills.filter(function(centurySkill) {
            if (centurySkill.get('id') === skillItem) {
              selectedCenturySkillsData.pushObject(centurySkill);
            }
          });
        }
      }
      return selectedCenturySkillsData;
    },

    /**
     * Check it can be render inside player or not
     * @property {boolean}
     */

    isLinkOut: Ember.computed('resource', function() {
      let currentProtocol = this.get('currentProtocol');
      let resourceProtocol = this.get('resourceProtocol');
      if (currentProtocol === 'https:' && resourceProtocol === 'http:') {
        return true;
      }
      return false;
    }),

    detectVimeoYoutubeVideoURL: function(url) {
      if (isVideoURL(url)) {
        this.set('isVideo', true);
        this.set('tempResource.format', VIDEO_RESOURCE_TYPE);
      } else {
        this.set('isVideo', false);
      }
    },

    /**
     * Create a resource (url/upload)
     * @param {Resource}
     * @return {Promise.<Resource>}
     */
    handleResourceUpload: function(resource) {
      return new Ember.RSVP.Promise(
        function(resolve) {
          if (this.get('tempResource.file')) {
            this.get('mediaService')
              .uploadContentFile(resource.file)
              .then(function(filename) {
                resource.set('url', `https:${filename}`);
                resolve(resource);
              });
          } else {
            // Nothing to upload ... return resource as is.
            resolve(resource);
          }
        }.bind(this)
      );
    }
  }
);
