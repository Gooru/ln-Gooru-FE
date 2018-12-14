import Ember from 'ember';
import ModalMixin from 'gooru-web/mixins/modal';
import { getSubjectIdFromSubjectBucket } from 'gooru-web/utils/utils';
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

  // -------------------------------------------------------------------------
  // Attributes

  classGrades: function() {
    var taxonomyGrades = this.get('taxonomyGrades');
    Ember.Logger.log('taxonomyGrades', taxonomyGrades);
    return taxonomyGrades;
  }.property(),

  gradeSubjetFWKDv: function() {
    var taxonomyGrades = this.get('gradeSubjectFWK');
    return taxonomyGrades;
  }.property(),

  /**
   * 1 . Course not assigned to class
        ☐ Dont show Low(Origin) High(Destination) Subject Framework of class
        ☐ Dont show Low(Origin) High(Destination) Subject Framework for each student ( the column in student table should be disabled / hidden )
        2. Course assigned with NO subject
        ☐ Dont show Low(Origin) High(Destination) Subject Framework for each student ( the column in student table should be disabled / hidden )
        3. Course assigned with subject and is NOT premium
        ☐ Dont show Low(Origin) High(Destination) Subject Framework for each student ( the column in student table should be disabled / hidden )
        ☐ Disable turing route 0 on - Button on the course setting section (current text is Re-Scope change that to Route0)
        4. Course is assigned , has subject and is premium
        ☐ Show Low(Origin) High(Destination) Subject Framework of class
        ☐ Show Low(Origin) High(Destination) Subject Framework for each student
        ☐ Enable setting route 0 - Button on the course setting section (current text is Re-Scope change that to Route0)
        5. Grade values range of Low(Origin) High(Destination) class
            ☐ Values comes from GradeMaster ? to check
            ☐ Range cannot be shrinked but can only be expanded.
        6. Grade values range of Low(Origin) High(Destination) for each student
        ☐  Student range does not cross the class range boundary
        ☐  Origin cannot be greater the destination.
        ☐  Student grade setting Button present before delete to apply the grade setting
    */
  classDisplayRules: function() {
    let course = this.get('course.id'),
      subject = this.get('subject'),
      premium = this.get('isPremiumClass');

    Ember.Logger.log(
      `course: ${course}, subject : ${subject} , premium : ${premium}`
    );
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Action triggered when the user click outside of pullup.
     **/
    onClosePullUp() {
      this.set('showReportPullUp', false);
      this.set('isShowProficiencyPullup', false);
      this.set('isShowCompetencyContentReport', false);
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

    profileStudent: function(student) {
      let controller = this;
      let studentId = student.get('id');
      let classId = controller.get('class.id');
      this.transitionToRoute(`/${studentId}/about?classId=${classId}`);
    },

    proficiencyStudent: function(student) {
      let controller = this;
      controller.set('isShowProficiencyPullup', true);
      controller.set('selectedStudent', student);
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
     * UX not ready for add
     */
    addCoteacher: function() {
      let classCollaboratorArr = [
        '8bc34655-3704-4721-898f-8695ef262905',
        '848d2f39-789c-459f-a3a9-ff6ca832a65b'
      ];
      var classCollaboratorsRef = this.get('class').get('collaborators');
      let classCollaborators = classCollaboratorsRef.copy();
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

    /**
     * Action triggered when select a competency
     */
    onSelectCompetency(competency) {
      let controller = this;
      controller.set('selectedCompetency', competency);
      controller.set('isShowCompetencyContentReport', true);
    },

    /**
     * Navigate to teacher profile page
     * @param  {Object} teacher
     */
    profileTeacher: function(teacher) {
      let controller = this;
      let teacherId = teacher.get('id');
      let classId = controller.get('class.id');
      localStorage.setItem('classId', classId);
      this.transitionToRoute(`/${teacherId}/about?classId=${classId}`);
    },
    /**
     * Baseline class
     * @requires course, subject
     */
    generateClassPathway: function(users) {
      let ouser = users ? users : null;
      if (this.get('course.id') && this.get('subject')) {
        this.generateClassPathway(ouser);
      } else {
        Ember.Logger.log('Course or Subject not assigned to class');
      }
    },

    /**
     * update class settings
     * @requires course, subject
     */
    updateClassSettings: function(value, setKey) {
      const controller = this;
      if (controller.get('course.id') && controller.get('sanitizedSubject')) {
        let settings = {
            grade_lower_bound: controller.get('tempClass.gradeLowerBound'),
            grade_upper_bound: controller.get('tempClass.gradeUpperBound'),
            grade_current: controller.get('tempClass.gradeCurrent'),
            route0: controller.get('tempClass.route0Applicable')
          },
          akey = setKey ? setKey : 'route0';

        settings[akey] = value;

        let tClass = controller.get('tempClass');
        tClass.set('gradeLowerBound', settings.grade_lower_bound);
        tClass.set('gradeUpperBound', settings.grade_upper_bound);
        tClass.set('gradeCurrent', settings.grade_current);
        tClass.set('route0', settings.route0);
        controller.set('tempClass', tClass);

        controller.set('enableApplySettings', true); // some UI interaction happened...enable apply button
      } else {
        Ember.Logger.log(
          'Course or Subject not assigned to class, cannot update class settings'
        );
      }
    },

    updateClassMembersSettings: function(student, value, setKey) {
      const controller = this;
      if (controller.get('course.id') && controller.get('sanitizedSubject')) {
        let settings = {
            grade_lower_bound: student.get('gradeLowerBound'),
            grade_upper_bound: student.get('gradeUpperBound'),
            users: [student.id]
          },
          akey = setKey ? setKey : '';
        settings[akey] = value;
        student.set('gradeLowerBound', settings.grade_lower_bound);
        student.set('gradeUpperBound', settings.grade_upper_bound);
        /*  let normalizedClassSettings = {
          gradeLowerBound: settings.grade_lower_bound,
          gradeUpperBound: settings.grade_upper_bound,
          gradeCurrent: settings.grade_current,
          route0Applicable: settings.route0
        };

        let curClass = this.get('class');
        curClass.setProperties(normalizedClassSettings); */
        controller.updateBondValueToSingleStudent(student);

        //controller.updateClassMembersSettings(settings); // No Api calls on update only save settings
      } else {
        Ember.Logger.log(
          'Course or Subject not assigned to class, cannot update class settings'
        );
      }
    },

    applyClassMembersSettings: function(student) {
      const controller = this;
      if (controller.get('course.id') && controller.get('sanitizedSubject')) {
        let settings = {
          grade_lower_bound: student.get('gradeLowerBound'),
          grade_upper_bound: student.get('gradeUpperBound'),
          users: [student.id]
        };
        controller.updateClassMembersSettings(settings); // Calling  Gen Path way once class settings save is success
        //controller.generateClassPathway(student.id);
      } else {
        Ember.Logger.log(
          'Course or Subject not assigned to class, cannot update class settings'
        );
      }
    },
    /**
     *
     * Triggered when a edit save score option is selected
     */
    saveOffline: function(value) {
      let controller = this;
      controller.set('tempClass.isOffline', value);
      controller.saveClass();
    },

    classMembersToggle: function(student) {
      const controller = this;
      if (controller.get('course.id') && controller.get('sanitizedSubject')) {
        let settings = {
          users: [student.id]
        };

        if (student.isActive) {
          controller.classMembersDeactivate(settings);
        } else {
          controller.classMembersActivate(settings);
        }

        student.set('isActive', !student.isActive); //Toggle Status
        controller.updateBondValueToSingleStudent(student);
      } else {
        Ember.Logger.log(
          'Course or Subject not assigned to class, cannot update class settings'
        );
      }
    },

    applyClassSettings: function() {
      const controller = this;
      if (controller.get('course.id') && controller.get('sanitizedSubject')) {
        let settings = {
          grade_lower_bound: controller.get('tempClass.gradeLowerBound'),
          grade_upper_bound: controller.get('tempClass.gradeUpperBound'),
          grade_current: controller.get('tempClass.gradeCurrent'),
          route0: controller.get('tempClass.route0Applicable')
        };
        controller.updateClassSettings(settings); // Call api with whatever is saved
      } else {
        Ember.Logger.log(
          'Course or Subject not assigned to class, cannot update class settings'
        );
      }
    },
    prepareListData: function(context, posParam) {
      const controller = this;
      let classV = controller.get('class'),
        classLB = classV.gradeLowerBound,
        classCurrent = classV.gradeCurrent,
        source = controller.get('subjectTaxonomyGrades'),
        sourceFilteredByContext;

      // class filters
      if (posParam === 'student-origin' || posParam === 'student-destination') {
        if (posParam === 'student-origin') {
          if (classLB) {
            sourceFilteredByContext = controller.filterRange(
              source,
              classLB,
              context.gradeLowerBound || classCurrent
            );
          }
          /* Student's lower bound can't be SET if class lower bound is null
             Student's lower bound can't be lower than class lower bound
             Student's destination can be set to any value greater than or equal to class grade
             Shrinking is not allowed .i.e. student
             */
        } else if (posParam === 'student-destination') {
          if (classCurrent) {
            sourceFilteredByContext = controller.filterRange(
              source,
              context.gradeUpperBound ||
                classCurrent ||
                context.gradeLowerBound ||
                classLB,
              null
            );
          }
          /* Student's upper bound can't be SET if class current bound is null */
        }
      } else if (posParam === 'class-origin') {
        sourceFilteredByContext = controller.filterRange(
          source,
          classLB ? 0 : null,
          classLB ? classLB : controller.get('tempClass.gradeCurrent')
        );
        /*  The grade_lower_bound should be less than or equal to current_grade
        The grade_lower_bound can be modified multiple times. However, it can't be made higher than previous value  */
      } else if (posParam === 'class-current') {
        sourceFilteredByContext = controller.filterRange(
          source,
          controller.get('tempClass.gradeLowerBound'),
          classCurrent // Once set class current cant be updated so if would always be null, once called for
        );
      }

      controller.set('currentFilterList', sourceFilteredByContext);
      return sourceFilteredByContext;
    }
  },

  currentFilterList: null, //Dynamic filtered list

  filterRange: function(filterSource, lb, ub) {
    let filteredDest = null;
    if (filterSource && lb && ub) {
      // if ub and lb , cg is between lb and ub
      filteredDest = filterSource.map(srcRow => {
        if (srcRow && srcRow.id >= lb && srcRow.id <= ub) {
          return srcRow;
        }
      });
    } else if (filterSource && (lb && !ub)) {
      filteredDest = filterSource.map(srcRow => {
        if (srcRow && srcRow.id >= lb) {
          return srcRow;
        }
      });
    } else if (filterSource && (!lb && ub)) {
      filteredDest = filterSource.map(srcRow => {
        if (srcRow && srcRow.id <= ub) {
          return srcRow;
        }
      });
    } else if (filterSource && (!lb && !ub)) {
      filteredDest = filterSource; //all
    }
    return filteredDest;
  },

  //------------end action ---

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
   * @type {Boolean}
   * Property to check whether a class is premium
   */
  isPremiumClass: Ember.computed('class', function() {
    let controller = this;
    const currentClass = controller.get('class');
    let setting = currentClass.get('setting');
    return setting ? setting['course.premium'] : false;
  }),

  subject: Ember.computed.alias('course.subject'),

  sanitizedSubject: Ember.computed('subject', function() {
    if (this.get('subject')) {
      return getSubjectIdFromSubjectBucket(this.get('subject'));
    }
  }),
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
   * @param {Boolean} reverseSort - default sort in ascending order
   */
  reverseSort: false,

  /**
   * @param {String} sortBy - sort criteria
   */
  sortBy: 'firstName',

  /**
   * @param {String} sortDefinition - List of sort criteria
   */
  sortDefinition: Ember.computed('sortBy', 'reverseSort', function() {
    let sortOrder = this.get('reverseSort') ? 'desc' : 'asc';
    return [`${this.get('sortBy')}:${sortOrder}`];
  }),

  /**
   * @param {[Student]} sortedMembers - Class members sorted
   */
  sortedMembers: Ember.computed.sort('class.members', 'sortDefinition'),

  memberGradeBounds: Ember.computed.sort(
    'class.memberGradeBounds',
    'sortDefinition'
  ),

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

  /**
   * @property {Boolean}
   * Property to show/hide proficiency pull up
   */
  isShowProficiencyPullup: false,

  /**
   * @property {String}
   * Property to store coruse subject bucket or K12.MA will be default
   */
  subjectBucket: Ember.computed('course', function() {
    let controller = this;
    return controller.get('course.subject') || 'K12.MA';
  }),

  /**
   * @property {Object}
   * Property to store selected student's data
   */
  selectedStudent: null,

  /**
   * @property {isCourseAssigned}
   * Property to check whether a course is assigned to the class or not
   */
  isCourseAssigned: Ember.computed('class', function() {
    let controller = this;
    let classData = controller.get('class');
    let isCourseAssigned = classData ? classData.courseId || false : false;
    return isCourseAssigned;
  }),

  enableApplySettings: false,

  subjectTaxonomyGrades: null,

  /**
   * @function fetchTaxonomyGrades
   * Method to fetch taxonomy grades
   */
  fetchTaxonomyGrades() {
    let component = this;
    if (this.get('course.id') && this.get('subject')) {
      let taxonomyService = component.get('taxonomyService');
      let filters = {
        subject: component.get('sanitizedSubject')
      };
      return Ember.RSVP.hash({
        taxonomyGrades: Ember.RSVP.resolve(
          taxonomyService.fetchGradesBySubject(filters)
        )
      }).then(({ taxonomyGrades }) => {
        component.set('subjectTaxonomyGrades', taxonomyGrades);
      });
    }
  },

  getGrade: Ember.computed('subjectTaxonomyGrades', function() {
    let fg = this.get('subjectTaxonomyGrades')
      ? this.get('subjectTaxonomyGrades').filter(
        tg => tg.id === this.get('class.gradeCurrent')
      )
      : null;
    return fg ? fg[0].grade : '';
  }),

  currentGradeDDValue: null,
  getCurrentGradeDDContent: Ember.computed(
    'subjectTaxonomyGrades',
    'class.gradeLowerBound',
    function() {
      const controller = this;
      let subjectTGS = controller.get('subjectTaxonomyGrades'),
        classLB = controller.get('tempClass.gradeLowerBound'),
        filteredGrades = null;
      if (subjectTGS && classLB) {
        filteredGrades = subjectTGS.map(subjectGrade => {
          if (subjectGrade.id >= classLB) {
            return subjectGrade;
          }
        });
      } else if (subjectTGS && !classLB) {
        filteredGrades = subjectTGS; //all
      }
      controller.set('currentGradeDDValue', filteredGrades);
      return filteredGrades;
    }
  ),

  /**
   * @property {Boolean} isShowCompetencyContentReport
   */
  isShowCompetencyContentReport: false,

  // -------------------------------------------------------------------------
  // Observers

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
                .merge(editedClass, [
                  'title',
                  'minScore',
                  'classSharing',
                  'isOffline'
                ]);
            });
        } else {
          var classForEditing = controller.get('class').copy();
          this.set('tempClass', classForEditing);
        }
        this.set('didValidate', true);
      }.bind(this)
    );
  },

  generateClassPathway: function(users) {
    const controller = this;
    const classId = this.get('class.id');
    controller
      .get('classService')
      .profileBaseLine(classId, users)
      .then(() => {
        controller.send('refreshRoute');
        controller.refreshRouter();
      });
  },

  fetchTaxonomySubject() {
    let component = this;
    if (this.get('course.id') && this.get('subject')) {
      let taxonomyService = component.get('taxonomyService');
      let filters = component.get('sanitizedSubject');
      return taxonomyService.fetchSubject(filters).then(respdata => {
        component.set('gradeSubjectFWK', respdata);
      });
    }
  },
  updateBondValuesToStudent() {
    let component = this;
    let members = component.get('class.members');
    members = members.map(m => {
      let grade = component.get('memberGradeBounds').findBy(m.id);
      if (grade) {
        m.gradeLowerBound = grade[m.id].grade_lower_bound;
        m.gradeUpperBound = grade[m.id].grade_upper_bound;
      } else {
        m.gradeLowerBound = null;
        m.gradeUpperBound = null;
      }
      return m;
    });
    component.set('class.members', members);
    return members;
  },

  updateBondValueToSingleStudent(student) {
    let component = this;
    let classmembers = component.get('class.members');
    let members = classmembers.map(m => {
      if (m.id === student.id) {
        return student;
      } else {
        return m;
      }
    });
    component.set('class.members', members);
    return members;
  },
  setupDisplayProperties() {
    let controller = this;
    controller.fetchTaxonomySubject();
    controller.fetchTaxonomyGrades();
    controller.updateBondValuesToStudent();
    controller.classDisplayRules();
  },

  updateClassSettings: function(settings) {
    const controller = this;
    const classId = this.get('class.id');

    controller
      .get('classService')
      .classSettings(classId, settings)
      .then(function(/* responseData */) {
        controller.set('enableApplySettings', false);

        if (!controller.get('isPremiumClass')) {
          controller.generateClassPathway(); // Call LP // Baseline class on setting save for not premium
        } else {
          controller.send('refreshRoute');
          controller.refreshRouter();
        }
      });
  },

  refreshRouter: function() {
    const controller = this;
    const queryParams = {
      refresh: `_${Math.random()
        .toString()
        .substr(2)}`
    };
    controller.transitionToRoute({
      queryParams
    });
  },
  updateClassMembersSettings: function(settings) {
    const controller = this;
    const classId = this.get('class.id');
    controller
      .get('classService')
      .classMembersSettings(classId, settings)
      .then(function(/* responseData */) {
        controller.generateClassPathway(settings.users[0]); // Call LP
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
