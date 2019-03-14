import Ember from 'ember';
import ModalMixin from 'gooru-web/mixins/modal';
/**
 * Class management controller
 *
 * Controller responsible of the logic for the teacher class management tab
 */

export default Ember.Controller.extend(ModalMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  classController: Ember.inject.controller('teacher.class'),

  /**
   * @requires service:api-sdk/class
   */
  classService: Ember.inject.service('api-sdk/class'),

  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyService: Ember.inject.service('api-sdk/taxonomy'),

  /**
   * @property {Ember.Service} Service to do retrieve language
   */
  lookupService: Ember.inject.service('api-sdk/lookup'),

  /**
   * @type {SkylineInitialService} Service to retrieve skyline initial service
   */
  skylineInitialService: Ember.inject.service('api-sdk/skyline-initial'),

  // -------------------------------------------------------------------------
  // Properties

  studentsLevelSetting: Ember.computed(
    'class.members.@each.tempGradeLowerBound',
    'class.members.@each.tempGradeUpperBound',
    'class.members.@each.isActive',
    'class.members.[]',
    function() {
      return this.get('class.members').filter(member => {
        return (
          member.get('isActive') &&
          (member.get('tempGradeLowerBound') ||
            member.get('tempGradeUpperBound'))
        );
      });
    }
  ),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Action trigger to show toggle action menu dropdown
     */
    showActionButton(event) {
      let element = Ember.$(event.target).next();
      if (element.hasClass('active')) {
        element.removeClass('active');
      } else {
        Ember.$(
          '.teacher_class_class-management .student-settings-sec .actions-btn'
        ).removeClass('active');
        element.addClass('active');
      }
    },

    /**
     * Archive class
     **/
    archiveClass: function() {
      const classId = this.get('class.id');
      var model = {
        content: this.get('class'),
        archiveMethod: () =>
          this.get('classService')
            .archiveClass(classId)
            .then(() => this.send('updateUserClasses'))
            .then(() => this.transitionToRoute('teacher-home'))
      };

      this.actions.showModal.call(
        this,
        'content.modals.gru-archive-class',
        model,
        null,
        null,
        null,
        false
      );
    },

    /**
     *
     * Triggered when a delete class option is selected
     */
    deleteClass: function() {
      let controller = this;
      var model = {
        content: controller.get('class'),
        deleteMethod: function() {
          return controller
            .get('classService')
            .deleteClass(controller.get('class.id'));
        },
        callback: {
          success: function() {
            controller.send('updateUserClasses');
          }
        }
      };

      this.actions.showModal.call(
        controller,
        'content.modals.gru-delete-class',
        model,
        null,
        null,
        null,
        false
      );
    },

    /**
     *
     * Triggered when a edit title class option is selected
     */
    editTitle: function(state = false) {
      let controller = this;
      controller.set('editingTitle', state);

      if (!state) {
        controller.saveClass();
      }
    },

    /**
     *
     * Triggered when a edit min score class option is selected
     */
    editScore: function() {
      let controller = this;
      controller.set('editingScore', true);
    },

    /**
     *Remove student
     */
    removeStudent: function(student) {
      let controller = this;
      var model = {
        content: student,
        deleteMethod: function() {
          return controller
            .get('classService')
            .removeStudentFromClass(
              controller.get('class.id'),
              student.get('id')
            );
        },
        callback: {
          success: function() {
            controller.get('sortedMembers').removeObject(student);
          }
        }
      };

      this.actions.showModal.call(
        this,
        'content.modals.gru-remove-student',
        model,
        null,
        null,
        null,
        false
      );
    },

    /**
     *
     * Triggered when a edit save score option is selected
     */
    saveScore: function() {
      let controller = this;
      controller.set('editingScore', false);
      controller.saveClass();
    },

    /**
     *Sort student list by criteria
     */
    sortStudents: function(criteria) {
      if (this.get('sortBy') !== criteria) {
        this.set('sortBy', criteria);
        this.set('reverseSort', false);
      } else {
        this.set('reverseSort', !this.get('reverseSort'));
      }
    },

    /**
     *
     * Triggered when a update class option is selected
     */
    updateClass: function() {
      this.saveClass();
    },

    /**
     * Triggered from a co-teacher card of class mgt
     */
    removeCoteacher: function(coteacher) {
      var classCollaboratorsRef = this.get('class').get('collaborators');
      let classCollaborators = classCollaboratorsRef.copy();
      classCollaborators.reduce((acc, ccb, index, ccArr) => {
        if (ccb.id === coteacher.id) {
          ccArr.removeAt(index);
        }
      }, 0);
      let classCollaboratorArr = classCollaborators.map(ccb => ccb.id);
      this.get('classService')
        .removeCoTeacherFromClass(this.get('class.id'), classCollaboratorArr)
        .then(() => {
          this.get('class').set('collaborators', classCollaborators);
        });
    },

    /**
     *Remove student
     */
    onRemoveStudent: function(student) {
      let controller = this;
      var model = {
        content: student,
        deleteMethod: function() {
          return controller
            .get('classService')
            .removeStudentFromClass(
              controller.get('class.id'),
              student.get('id')
            );
        },
        callback: {
          success: function() {
            controller.get('classMembers').removeObject(student);
            controller.get('sortedMembers').removeObject(student);
          }
        }
      };

      this.actions.showModal.call(
        this,
        'content.modals.gru-remove-student',
        model,
        null,
        null,
        null,
        false
      );
    },
    /**
     * Method to show student report in pathway pullup
     */
    onOpenStudentReport(reportData, model) {
      let controller = this;
      controller.set('showReportPullUp', true);
      controller.set('reportData', reportData);
      controller.set('model', model);
      controller.set('isLoading', true);
    },

    updateFwkSettings(value) {
      const controller = this;
      if (controller.get('course.id') && controller.get('subject')) {
        let tClass = controller.get('tempClass'),
          sourcePreferenceJSON = controller.get('class.preference'),
          preferenceJSON = {
            subject: sourcePreferenceJSON.subject,
            framework: value.code
          };

        tClass.set('preference', preferenceJSON);
        controller.fetchTaxonomyGrades().then(() => {
          tClass.set('gradeLowerBound', null);
          tClass.set('gradeCurrent', null);
          controller.set('enableApplySettings', true); // some UI interaction happened...enable apply button
        });
      } else {
        Ember.Logger.log(
          'Course or Subject not assigned to class, cannot update class settings'
        );
      }
    },

    updateClassStudentGradeOrigin(grade, studentId) {
      let student = this.get('class.members').findBy('id', studentId);
      let gradeLowerBound = student.get('gradeLowerBound');
      let tempGradeLowerBound = grade.get('id');
      if (gradeLowerBound !== tempGradeLowerBound) {
        student.set('tempGradeLowerBound', tempGradeLowerBound);
      }
    },

    updateClassStudentGradeDestination(grade, studentId) {
      let student = this.get('class.members').findBy('id', studentId);
      let gradeUpperBound = student.get('gradeUpperBound');
      let tempGradeUpperBound = grade.get('id');
      if (gradeUpperBound !== tempGradeUpperBound) {
        student.set('tempGradeUpperBound', tempGradeUpperBound);
      }
    },

    updateClassGradeLevel(grade) {
      this.set('enableApplySettings', true);
      this.set('tempClass.gradeCurrent', grade.get('id'));
    },

    updateClassGradeOrigin(grade) {
      this.set('enableApplySettings', true);
      this.set('tempClass.gradeLowerBound', grade.get('id'));
      let gradeCurrent = this.get('class.gradeCurrent');
      let tempGradeCurrent = this.get('tempClass.gradeCurrent');
      if (!gradeCurrent && tempGradeCurrent) {
        this.set('tempClass.gradeCurrent', null);
      }
    },

    applyClassMembersSettings() {
      this.updateClassMembersSettings();
    },

    classMembersToggle(targetStatusActive, student) {
      const controller = this;
      if (controller.get('course.id') && controller.get('subject')) {
        let settings = {
          users: [student.id]
        };

        if (targetStatusActive) {
          controller.classMembersActivate(settings);
        } else {
          controller.classMembersDeactivate(settings);
        }
        student.set('isActive', targetStatusActive); //Toggle Status
      } else {
        Ember.Logger.log(
          'Course or Subject not assigned to class, cannot update class settings'
        );
      }
    },

    applyClassSettings() {
      const controller = this;
      if (controller.get('course.id') && controller.get('subject')) {
        let settings = {
          grade_lower_bound: controller.get('tempClass.gradeLowerBound'),
          grade_upper_bound: controller.get('tempClass.gradeUpperBound'),
          grade_current: controller.get('tempClass.gradeCurrent'),
          route0: controller.get('tempClass.route0Applicable'),
          preference:
            controller.get('tempClass.preference') ||
            controller.get('class.preference')
        };
        let classData = controller.get('class');
        classData.set('gradeLowerBound', settings.grade_lower_bound);
        classData.set('gradeUpperBound', settings.grade_upper_bound);
        classData.set('gradeCurrent', settings.grade_current);
        classData.set('route0', settings.route0);
        classData.set('preference', settings.preference);
        controller.updateClassSettings(settings);
      }
    },

    updateLanguage(language) {
      const controller = this;
      const classId = this.get('class.id');
      const languageId = language.get('id');
      controller
        .get('classService')
        .updateLanguage(classId, languageId)
        .then(() => {
          controller.set('class.primaryLanguage', languageId);
        });
    }
  },

  getGradeSequenceById(id, source) {
    return id && source && source.findBy('id', id)
      ? source.findBy('id', id).sequence
      : id;
  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Class}
   */
  class: Ember.computed.alias('classController.class'),

  /**
   * @property {Course}
   */
  course: Ember.computed.alias('classController.course'),

  /**
   * @property {classMembers}
   */
  classMembers: Ember.computed.alias('classController.members.members'),

  /**
   * @type {Boolean}
   * Property to check whether a class is premium
   */
  isPremiumClass: Ember.computed('class', function() {
    let controller = this;
    const currentClass = controller.get('class');
    let setting = currentClass.get('setting');
    return setting ? setting['course.premium'] : false;
  }),

  subject: Ember.computed.alias('class.preference.subject'),

  /**
   * @param {Boolean } didValidate - value used to check if input has been validated or not
   */
  didValidate: false,

  /**
   * @param {Boolean } editingTitle - value used to check if title is editing or not
   */
  editingTitle: null,

  /**
   * @param {Boolean } editingScore - value used to check if score is editing or not
   */
  editingScore: null,

  /**
   * @property {boolean} isAttendClassWithCode
   */
  isAttendClassWithCode: Ember.computed.equal('class.classSharing', 'open'),

  /**
   * @param {[Student]} sortedMembers - Class members sorted
   */
  sortedMembers: Ember.computed('class.members.[]', function() {
    return this.get('class.members').sortBy('firstName');
  }),

  memberGradeBounds: Ember.computed.alias('class.memberGradeBounds'),

  /**
   * Toggle Options
   * @property {Ember.Array}
   */
  switchOptions: Ember.A([
    Ember.Object.create({
      label: 'Yes',
      value: true
    }),
    Ember.Object.create({
      label: 'No',
      value: false
    })
  ]),

  /**
   * Copy of the class model used for editing.
   * @property {Class}
   */
  tempClass: null,

  enableApplySettings: false,

  subjectTaxonomyGrades: null,

  /**
   * @function fetchTaxonomyGrades
   * Method to fetch taxonomy grades
   */
  fetchTaxonomyGrades() {
    let controller = this;
    if (this.get('course.id') && this.get('subject')) {
      let taxonomyService = controller.get('taxonomyService');
      let filters = {
        subject: controller.get('subject')
      };
      let fwkCode =
        controller.get('tempClass.preference.framework') ||
        controller.get('class.preference.framework');
      if (fwkCode) {
        filters.fw_code = fwkCode;
      }

      return Ember.RSVP.hash({
        taxonomyGrades: Ember.RSVP.resolve(
          taxonomyService.fetchGradesBySubject(filters)
        )
      }).then(({ taxonomyGrades }) => {
        controller.set('subjectTaxonomyGrades', taxonomyGrades);
      });
    }
  },

  /**
   * Fetch class member data to get class member bounds.
   */
  fetchClassMemberBounds() {
    let controller = this;
    const classId = controller.get('class.id');
    controller
      .get('classService')
      .readClassMembers(classId)
      .then(members => {
        controller.set(
          'class.memberGradeBounds',
          members.get('memberGradeBounds')
        );
        controller.updateBoundValuesToStudent();
      });
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Validate and save class information
   */
  saveClass: function() {
    var controller = this;
    let editedClass = this.get('tempClass');
    var classSharing = this.get('isAttendClassWithCode')
      ? 'open'
      : 'restricted';

    editedClass.set('classSharing', classSharing);

    editedClass.validate().then(
      function({ validations }) {
        if (validations.get('isValid')) {
          controller
            .get('classService')
            .updateClass(editedClass)
            .then(function() {
              controller.send('updateUserClasses');
              controller
                .get('class')
                .merge(editedClass, ['title', 'minScore', 'classSharing']);
            });
        } else {
          var classForEditing = controller.get('class').copy();
          this.set('tempClass', classForEditing);
        }
        this.set('didValidate', true);
      }.bind(this)
    );
  },

  updateBoundValuesToStudent() {
    let controller = this;
    let members = controller.get('class.members');
    members.forEach(member => {
      let memberId = member.get('id');
      let grade = controller.get('memberGradeBounds').findBy(memberId);
      if (grade) {
        let gradeBounds = grade.get(memberId);
        member.set('gradeLowerBound', gradeBounds.grade_lower_bound);
        member.set('gradeUpperBound', gradeBounds.grade_upper_bound);
      }
      member.set('tempGradeLowerBound', null);
      member.set('tempGradeUpperBound', null);
    });
  },

  setupDisplayProperties() {
    let controller = this;
    controller.updateBoundValuesToStudent();
    controller.set('enableApplySettings', false);
  },

  updateClassSettings: function(settings) {
    const controller = this;
    const classId = this.get('class.id');
    let promises = {
      classPromise: controller
        .get('classService')
        .classSettings(classId, settings),
      preferencePromise: controller
        .get('classService')
        .updatePreference(classId, settings.preference)
    };
    Ember.RSVP.hash(promises).then(function(/* hash */) {
      controller.set('enableApplySettings', false);
      // TO-DO optmize, call only when bounds get change.
      controller.fetchClassMemberBounds();
    });
  },

  updateClassMembersSettings() {
    const controller = this;
    const classId = this.get('class.id');
    const isPremiumClass = controller.get('isPremiumClass');
    const studentsLevelSetting = controller.get('studentsLevelSetting');
    let studentsSetting = {
      users: []
    };
    let lowerBoundUpdateStudentsId = [];
    studentsLevelSetting.forEach(student => {
      let tempGradeLowerBound = student.get('tempGradeLowerBound');
      let tempGradeUpperBound = student.get('tempGradeUpperBound');
      let studentId = student.get('id');
      let studentSetting = {
        user_id: studentId
      };
      if (tempGradeLowerBound) {
        lowerBoundUpdateStudentsId.push(studentId);
        studentSetting.grade_lower_bound = tempGradeLowerBound;
      }
      if (tempGradeUpperBound) {
        studentSetting.grade_upper_bound = tempGradeUpperBound;
      }
      studentsSetting.users.push(studentSetting);
    });
    controller
      .get('classService')
      .classMembersSettings(classId, studentsSetting)
      .then(() => {
        controller.fetchClassMemberBounds();
        if (isPremiumClass && lowerBoundUpdateStudentsId.length > 0) {
          controller
            .get('skylineInitialService')
            .calculateSkyline(classId, lowerBoundUpdateStudentsId);
        }
      });
  },

  classMembersDeactivate: function(settings) {
    const controller = this;
    const classId = this.get('class.id');
    controller
      .get('classService')
      .classMembersDeactivate(classId, settings)
      .then(function(/* responseData */) {
        /*    //Do nothing for success  */
      });
  },

  classMembersActivate: function(settings) {
    const controller = this;
    const classId = this.get('class.id');
    controller
      .get('classService')
      .classMembersActivate(classId, settings)
      .then(function(/* responseData */) {
        /*    //Do nothing for success  */
      });
  },
  /**
   * Reset controller values
   */
  resetValues: function() {
    this.set('editingTitle', null);
    this.set('editingScore', null);
    this.set('didValidate', false);
  }
});
