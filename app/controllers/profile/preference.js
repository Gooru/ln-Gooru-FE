import Ember from 'ember';

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyService: Ember.inject.service('api-sdk/taxonomy'),

  /**
   * @property {Service} Profile service
   */
  profileService: Ember.inject.service('api-sdk/profile'),

  /**
   * @property {Ember.Service} Service to do retrieve language
   */
  lookupService: Ember.inject.service('api-sdk/lookup'),

  //------------------------------------------------------------------------------
  // Attributes

  categoriesMaster: null,
  categoriesDropDown: null,

  /**
   * Current selection, list of subjects and their fwks for current selected category
   */
  currentCategoriesSubjectFWKs: null,

  /**
   *  Current selection, list of frameworks for current selected subject
   */
  currentSelectedSubject: null,

  /**
   * Temp placeholder for framework selection
   */
  currentSelectedSubjectFWK: null,

  /**
   *  Temp list of current selection of categories, need to see if that is redundant with selections
   */
  addedCategories: null,

  /**
   * Maintains a list of current selection of category.subject : frameworks
   * Is tightly binded with added addedCategories any change in addedCategories should reflect here
   */
  selections: {},

  currentSelectedCategory: null,

  isEditMode: false,

  //------------------------------------------------------------------------------
  actions: {
    addCategory: function(category) {
      if (!category) {
        category = this.get('currentSelectedCategory');
      }
      this.addCategory(category);
      this.set('currentSelectedCategory', null);
    },
    editCategory: function() {
      this.editCategory();
      this.changeMode(true);
    },
    removeCategory: function(category) {
      this.removeCategory(category);
    },
    updateCategory: function(category) {
      this.updateCategory(category);
    },
    markSelectedSubject(subject, category) {
      this.markSelectedSubject(subject, category);
    },
    markSelectedFrameworks: function(fwk, subject, category) {
      this.markSelectedFrameworks(fwk, subject, category);
    },
    addSelectedSubject: function(category) {
      this.updateMarkedSelectionsAsAdded('dummy', null, category);
    },
    updateFrameworkForSubjectCategory: function(fwk, subject, category) {
      let subjectObj = this.getSubjectForCategory(subject, category);
      this.removeSubject(category, subject);
      this.updateMarkedSelectionsAsAdded(fwk, subjectObj, category);
      this.showHideSubjectsDDForCategory(category, false);
    },
    savePreferences: function() {
      this.savePreferences();
      this.changeMode(false);
      this.changeModeOnSaveAll();
    },

    selectCategoryToAdd: function(category) {
      this.set('currentSelectedCategory', category);
    },
    changeMode: function(showedit) {
      this.changeMode(showedit);
    },
    cancel() {
      this.getCategories().then(() => {
        this.getProfilePreference();
      });
    },

    updateMarkedSelectionsAsAdded(fwk, subjects, category) {
      this.updateMarkedSelectionsAsAdded(fwk, subjects, category);
    },

    removeSubject(category, subject) {
      this.removeSubject(category, subject);
    },
    updateLanguage(language) {
      const controller = this;
      controller.set('selectedLanguage', language);
    },

    showAddSub(category, show) {
      this.showHideSubjectsDDForCategory(category, show || true);
    }
  },
  //--- pro

  getSubjectForCategory: function(subjectCode, category) {
    const controller = this;

    let categoriesMaster = controller.get('categoriesMaster');
    let found = categoriesMaster.findBy('id', category.id);
    if (found.subjectFwks) {
      return found.subjectFwks.findBy('code', subjectCode);
    }
  },

  showHideSubjectsDDForCategory(category, show) {
    let found = this.addedCategories.findBy('id', category.id);
    Ember.set(found, 'showAddSub', show);
  },
  //------------------------------------------------------------------------------
  // Impl methods
  //------------------------------------------------------------------------------
  removeSubject1(category, subject) {
    let addedCategories = this.get('addedCategories');
    if (addedCategories && category) {
      let found = addedCategories.findBy('id', category.id);
      if (found) {
        if (category.subjects.findBy('code', subject.code)) {
          category.removeObject(subject);
        }
      }

      Ember.set(found, 'edit', true);
    }
  },

  removeSubject(category, subject) {
    const controller = this;
    let addedCategories = controller.get('addedCategories');
    let found = addedCategories.findBy('id', category.id);
    if (found.subjects) {
      let subjectIndex = found.subjects.findIndex(
        c => Object.keys(c)[0] === subject
      );
      if (subjectIndex > -1) {
        found.subjects.removeAt(subjectIndex);
      }
    }
    controller.set('addedCategories', addedCategories);
  },
  changeModeOnSaveAll() {
    let addedCategories = this.get('addedCategories');
    addedCategories.map(c => Ember.set(c, 'edit', false));
    this.set('addedCategories', addedCategories);
  },

  changeMode: function(showedit) {
    this.set('isEditMode', showedit);
  },
  /**
   *
   * @param {object} category
   * Marks a category for adding to profile preference
   * Removes the marked category from the drop down of categories
   * Set current selection to edit, its saved with the update category
   */
  addCategory(category) {
    let addedCategories = this.get('addedCategories');
    Ember.set(category, 'edit', true);
    addedCategories.pushObject(category);
    this.set('addedCategories', addedCategories);

    let categoriesDropDown = this.get('categoriesDropDown');
    categoriesDropDown.removeObject(category);
    this.get('categoriesDropDown', categoriesDropDown);
    this.getSubjectFrameworks(category);
    //this.changeMode(false);
  },

  /**
   *
   * @param {object} category
   * Marks a category for editing to in memory
   * Removes the marked category from the drop down of categories
   * Set current selection to edit, its saved with the update category
   */
  editCategory(category) {
    let addedCategories = this.get('addedCategories');
    if (category) {
      let found = addedCategories.findBy('id', category.id);
      Ember.set(found, 'edit', true);
      addedCategories.removeObject(category);
      addedCategories.pushObject(found);
    } else {
      addedCategories.map(c => Ember.set(c, 'edit', true));
    }
    this.set('addedCategories', addedCategories);
  },

  /**
   * Converts the edit mode to read only mode
   * save the in edit list to the list to be saved category
   * @param {object} category
   */
  updateCategory(category) {
    let addedCategories = this.get('addedCategories');
    addedCategories.removeObject(category);
    Ember.set(category, 'edit', false);
    addedCategories.pushObject(category);
    this.set('addedCategories', addedCategories);
    // Add new Object
  },

  markSelectedSubject(subject, category) {
    Ember.set(category, 'currentSelectedSubject', subject);
  },

  markSelectedFrameworks(fwk, subjects, category) {
    Ember.set(category.currentSelectedSubject, 'currentSelectedFwk', fwk);
  },

  setSelectedSubjectFrameworks(fwk, subject, category) {
    /*  controller.set('currentSelectedSubject', null);
    controller.set('currentSelectedCategory', null);
    controller.set('currentSelectedFwk', null); */

    const controller = this;
    let subjectEntry = {};
    subjectEntry[subject.code] = fwk.frameworkId;
    let addedCategories = controller.get('addedCategories');
    let found = addedCategories.findBy('id', category.id);
    if (found) {
      Ember.set(found, 'currentSelectedSubject', null);
      //found.currentSelectedSubject = null;
    }
    if (found.subjects) {
      if (found.subjects[subject.code]) {
        found.subjects.remove(subject.code);
      }
      found.subjects.pushObject(subjectEntry);
    } else {
      Ember.set(found, 'subjects', Ember.A([]));
      found.subjects.pushObject(subjectEntry);
    }
    addedCategories.sortBy('id');
    controller.set('addedCategories', addedCategories);
  },

  updateAddedCategories(category, subject, opCode) {
    const controller = this;
    let addedData = controller.get('addedCategories');

    if (opCode === 'addCat') {
      addedData.pushObject(category);
      controller.set('addedCategories', addedData);
    } else if (opCode === 'removeCat') {
      addedData.removeObject(category);
      controller.set('addedCategories', addedData);
    } else if (opCode === 'removeSub') {
      let found = addedData.findBy('id', category.id);
      if (found.subjectFwks) {
        if (found.subjectFwks.findBy('code', subject.code)) {
          let subjectsCpy = Object.assign(Ember.A([]), found.subjectFwks);
          found.subjectFwks.removeObject(subject);
          let selCate = controller.categoriesMaster.findBy('id', category.id);
          Ember.set(
            selCate,
            'subjectFwks',
            Object.assign(Ember.A([]), subjectsCpy)
          );
        }
      }
    } else if (opCode === 'addSub') {
      let found = addedData.findBy('id', category.id);
      if (found.subjects) {
        found.subjects.pushObject(subject);
      }
    }
    controller.set('addedCategories', addedData);
  },

  updateMarkedSelectionsAsAdded(fwk, subject, category) {
    const controller = this;

    if (!category) {
      category = controller.get('currentSelectedCategory');
    }
    if (!subject) {
      subject =
        category.currentSelectedSubject ||
        category.get('currentSelectedSubject');
    }
    if (!fwk) {
      fwk = subject.currentSelectedFwk || subject.get('currentSelectedFwk');
    }

    if (subject && category && fwk) {
      Ember.set(category, 'currentSelectedSubject', null);
      //category.currentSelectedSubject = null;
      controller.setSelectedSubjectFrameworks(fwk, subject, category);
      controller.updateAddedCategories(category, subject, 'removeSub'); //here a

      controller.set('currentSelectedSubject', null);
      controller.set('currentSelectedCategory', null);
      controller.set('currentSelectedFwk', null);
    }
  },

  savePreferences() {
    const controller = this;
    let selectionsInit = controller.get('selections');
    if (selectionsInit) {
      selectionsInit.clear();
    }
    controller.set('selections', selectionsInit); // Set clear

    let addedCategories = controller.get('addedCategories');
    if (addedCategories) {
      addedCategories = addedCategories.filter(c => {
        if (c.subjects) {
          //let catSubjects = c.subjects.map;
          c.subjects.map(s => {
            controller.markSelectedFrameworksParsed(
              Object.values(s),
              Object.keys(s),
              c
            );
          });
          if (c.subjects.length > 0) {
            return c;
          }
        }
      });
    }
    controller.set('addedCategories', addedCategories);

    let selections = controller.get('selections');
    //Flatten Data array not expected
    let flatSelections = Object.assign({}, selections);
    let languagePreferenceArray = controller.get('selectedLanguage')
      ? [controller.get('selectedLanguage').id]
      : null;
    let preferenceData = {
      standard_preference: flatSelections,
      language_preference: languagePreferenceArray
    };
    controller.updateProfilePreference(preferenceData);
  },

  //------------------------------------------------------------------------------
  // Impl methods
  //------------------------------------------------------------------------------

  removeCategory(category) {
    const controller = this;
    let addedCopy = controller.get('addedCategories');
    addedCopy.removeObject(category);
    controller.set('addedCategories', addedCopy);
    let categoriesDropDown = controller.get('categoriesDropDown');
    categoriesDropDown.pushObject(category);
    controller.set('categoriesDropDown', categoriesDropDown);
  },

  // markSubjectSelected(subject, category) {
  //   this.set('currentSelectedSubject', subject);
  //   let fwk,
  //     categorySubject = `${category.id}.${subject.id}`, //eslint-disable-line
  //     tEntry = { categorySubject: fwk };
  //   this.selections.pushObject(tEntry); //Push object with empty frameworks
  // },

  markSelectedFrameworksParsedWithCategrory(fwkValue, subjectValue, category) {
    let fwk = Ember.isArray(fwkValue) ? fwkValue[0] : fwkValue,
      subject = Ember.isArray(subjectValue) ? subjectValue[0] : subjectValue;

    const controller = this;
    let categorySubject = `${category.id}.${subject}`, //eslint-disable-line
      tEntry = {},
      selections = controller.get('selections');
    tEntry[categorySubject] = fwk;
    selections.pushObject(tEntry); //Push object for saving
    controller.set('selections', selections);
  },
  markSelectedFrameworksParsed(fwkValue, subjectValue) {
    let fwk = Ember.isArray(fwkValue) ? fwkValue[0] : fwkValue,
      subject = Ember.isArray(subjectValue) ? subjectValue[0] : subjectValue;

    const controller = this;
    let selections = controller.get('selections');
    if (fwk) {
      selections[subject] = fwk; //Push object for saving
    }
    controller.set('selections', selections);
  },

  /**
   * Maintains list of categories and associated subject -> Frameworks
   * @param {object} category
   * @param {object} subjectFwks
   */
  maintainMaster(category, subjectFwks) {
    const controller = this;
    let found = controller.get('categoriesMaster').findBy('id', category.id);
    if (!found.subjectFwks) {
      Ember.set(found, 'subjectFwks', subjectFwks);
      controller.get('categoriesMaster').pushObject(found);
    } else {
      return found;
    }
    /* found.subjectFwks.find(c => c.key ===`${category.id}.${subject.code}` ); */
  },

  /**
   * Normalize data
   * @param {object} response
   * { "preference_settings": {
   * "standard_preference": {
   *   "K12.MA": "TEKS"
   * }}
   */
  normalizeProfilePreference(response) {
    const controller = this;
    let data = response.standard_preference;
    for (let categorySubject in data) {
      let subject = {},
        fwk = {},
        categoryCode = categorySubject.split('.')[0];

      subject.code = categorySubject;
      fwk.frameworkId = data[categorySubject];

      let foundCategory = controller
        .get('categoriesMaster')
        .findBy('code', categoryCode);
      let foundAddedCategory = controller
        .get('addedCategories')
        .findBy('code', categoryCode);
      if (foundCategory && !foundAddedCategory) {
        controller.addCategory(foundCategory, false); //Complete category object
      }
      if (
        response.language_preference &&
        response.language_preference.length > 0
      ) {
        let languagePreSelection = controller
          .get('languages')
          .findBy('id', response.language_preference[0]); // First / primary language consideration as spec.
        controller.set('selectedLanguage', languagePreSelection);
      }
      controller.setSelectedSubjectFrameworks(fwk, subject, foundCategory); // fwk.frameworkId, subject.code, cat
    }

    controller.changeModeOnSaveAll();
    controller.changeMode(false);

    /* //following is the storage format

    addedCategories.map(c => {
      c.subjects.map(s => {
        controller.markSelectedFrameworksParsed(
          Object.values(s),
          Object.keys(s),
          c
        );
      });
    }); */
    //let selections = controller.get('selections');
  },
  //------------------------------------------------------------------------------
  // Data Helpers
  //------------------------------------------------------------------------------

  getProfilePreference() {
    const controller = this;
    controller
      .get('profileService')
      .getProfilePreference()
      .then(response => {
        controller.normalizeProfilePreference(response);
      });
  },

  updateProfilePreference(data) {
    const controller = this;
    controller
      .get('profileService')
      .updateProfilePreference(data)
      .then(/* Do nothing */);
  },
  getSubjectFrameworks(category) {
    const controller = this;
    let taxonomyService = controller.get('taxonomyService');
    let subjectFwksCategory = controller.maintainMaster(category);
    let addedCategories = controller.get('addedCategories');

    /* If subjects are already fetched use them else fetch and cache */
    if (subjectFwksCategory) {
      addedCategories.removeObject(category);
      Ember.set(category, 'subjectFwks', subjectFwksCategory);
      addedCategories.pushObject(category);
      controller.set('addedCategories', addedCategories);
      /* controller.set('currentCategoriesSubjectFWKs', subjectFwks); */
    } else {
      return taxonomyService.fetchSubjects(category.id).then(response => {
        addedCategories.removeObject(category);

        Ember.set(
          category,
          'subjectFwks',
          Object.assign(Ember.A([]), response)
        );
        controller.maintainMaster(
          category,
          Object.assign(Ember.A([]), response)
        );
        addedCategories.pushObject(category);
        controller.set('addedCategories', addedCategories);
      });
    }
  },

  getCategories() {
    const controller = this;
    let taxonomyService = controller.get('taxonomyService');
    return new Ember.RSVP.Promise(function(resolve) {
      return taxonomyService.fetchCategories().then(response => {
        controller.set('categoriesDropDown', response.copy());
        controller.set(
          'categoriesMaster',
          Object.assign(Ember.A([]), response)
        );
        let addedCopy = response.copy();
        addedCopy.clear();
        controller.set('addedCategories', addedCopy); // Create a shallow copy of the original one
        controller.set('selections', addedCopy.copy());
        resolve(response);
      });
    });
  },
  fetchLanguage() {
    const controller = this;
    controller
      .get('lookupService')
      .getLanguages()
      .then(languages => controller.set('languages', languages.languages));
  },
  //------------------------------------------------------------------------------
  // Initialize the controller
  //------------------------------------------------------------------------------
  initControllerFromRoute() {
    this.fetchLanguage();
    this.getCategories().then(() => {
      this.getProfilePreference();
    });
  }
});
