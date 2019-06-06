import Ember from 'ember';
import RubricGrade from 'gooru-web/models/rubric/rubric-grade';
import RubricCategoryScore from 'gooru-web/models/rubric/grade-category-score';
import { PLAYER_EVENT_SOURCE } from 'gooru-web/config/config';
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['grade', 'backdrop-pull-ups', 'oa-grading-report'],

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @requires service:api-sdk/offline-activity-analytics
   */
  oaAnaltyicsService: Ember.inject.service(
    'api-sdk/offline-activity/oa-analytics'
  ),

  /**
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service('api-sdk/class-activity'),

  /**
   * @type {ProfileService} Service to retrieve profile information
   */
  profileService: Ember.inject.service('api-sdk/profile'),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Content of this OA grade item.
   * @type {Object}
   */
  content: Ember.computed.alias('context.content'),

  /**
   * Content Id of this OA grade item.
   * @type {String}
   */
  activityId: Ember.computed.alias('context.content.id'),

  /**
   * Tasks of this OA grade item.
   * @type {Array}
   */
  tasks: Ember.computed.alias('context.content.tasks'),

  /**
   * Rubrics of this OA grade item.
   * @type {Object}
   */
  rubric: Ember.computed.alias('context.content.rubric'),

  /**
   * Student count of this OA grade item.
   * @type {Number}
   */
  studentCount: Ember.computed.alias('context.studentCount'),

  /**
   * Selected Student to grade
   * @type {Object}
   */
  student: null,
  /**
   * Selected Student id
   * @type {Object}
   */
  studentId: Ember.computed('student', function() {
    return this.get('student.id');
  }),
  /**
   * Maintains the value of selected user index.
   * @return {Number}
   */
  currentStudentIndex: Ember.computed('studentId', 'users', function() {
    let studentIndex = 1;
    let users = this.get('users');
    if (users) {
      let studentId = this.get('studentId');
      let user = users.findBy('id', studentId);
      studentIndex = users.indexOf(user) + 1;
    }
    return studentIndex;
  }),

  /**
   * Maintains the user grade
   * @return {Object}
   */
  teacherRubric: Ember.computed('studentId', 'users.[]', function() {
    let studentId = this.get('studentId');
    let user;
    if (this.get('users')) {
      user = this.get('users').findBy('id', studentId);
    }
    return user ? user.get('teacherRubric') : null;
  }),

  /**
   * Maintains the teacher grade
   * @return {Object}
   */
  teacherGrade: Ember.computed('studentId', 'users.[]', function() {
    let studentId = this.get('studentId');
    let user;
    if (this.get('users')) {
      user = this.get('users').findBy('id', studentId);
    }
    return user ? user.get('teacherGrade') : null;
  }),

  /**
   * Computed Properties for rubric categories
   * @type {Object}
   */
  categories: Ember.computed('teacherRubric', 'teacherGrade', function() {
    let component = this;
    let teacherGradedCategories = Ember.A([]);
    let categories = component.get('teacherRubric.categories')
      ? component.get('teacherRubric.categories')
      : [];
    let teacherGrade = component.get('teacherGrade');
    if (teacherGrade) {
      teacherGradedCategories = teacherGrade.get('categoryGrade')
        ? teacherGrade.get('categoryGrade')
        : Ember.A([]);

      component
        .get('teacherRubric')
        .set('studentScore', teacherGrade.get('score'));
      component
        .get('teacherRubric')
        .set('comment', teacherGrade.get('overallComment'));
    }
    categories.map((category, index) => {
      let teacherGradedCategory = teacherGradedCategories.objectAt(index);
      let levels = category.get('levels');
      if (levels) {
        if (category.get('allowsLevels') && category.get('allowsScoring')) {
          levels = levels.sortBy('score');
          if (teacherGradedCategory) {
            let totalPoints = teacherGradedCategory.get('levelMaxScore');
            let scoreInPrecentage = Math.floor(
              (teacherGradedCategory.get('levelScore') / totalPoints) * 100
            );
            category.set('scoreInPrecentage', scoreInPrecentage);
          }
        }
        if (teacherGradedCategory) {
          let levelObtained = levels.findBy(
            'name',
            teacherGradedCategory.get('levelObtained')
          );
          if (levelObtained) {
            levelObtained.set('selected', true);
          }
          category.set('comment', teacherGradedCategory.get('levelComment'));
        }
        category.set('levels', levels);
      }
    });
    return categories ? categories : Ember.A([]);
  }),

  /**
   * Computed Properties for student self graded rubric categories
   * @type {Object}
   */
  studentSelfGradedCategories: Ember.computed(
    'student.rubric',
    'student.selfGrade',
    function() {
      let component = this;
      let categories = component.get('student.rubric.categories')
        ? component.get('student.rubric.categories')
        : [];
      let selfGrade = component.get('student.selfGrade');
      if (selfGrade) {
        let studentSelfGradedCategories = selfGrade.get('categoryGrade')
          ? selfGrade.get('categoryGrade')
          : Ember.A([]);
        categories.map((category, index) => {
          let studentSelfGradedCategory = studentSelfGradedCategories.objectAt(
            index
          );
          let levels = category.get('levels');
          if (levels) {
            if (category.get('allowsLevels') && category.get('allowsScoring')) {
              levels = levels.sortBy('score');
              let totalPoints = studentSelfGradedCategory.get('levelMaxScore');
              let scoreInPrecentage = Math.floor(
                (studentSelfGradedCategory.get('levelScore') / totalPoints) *
                  100
              );
              category.set('scoreInPrecentage', scoreInPrecentage);
            }
            let levelObtained = levels.findBy(
              'name',
              studentSelfGradedCategory.get('levelObtained')
            );
            if (levelObtained) {
              levelObtained.set('selected', true);
            }
            category.set(
              'comment',
              studentSelfGradedCategory.get('levelComment')
            );
            category.set('levels', levels);
          }
        });
      }
      return categories ? categories : Ember.A([]);
    }
  ),

  /**
   * Computed Properties for student self graded score
   * @type {Object}
   */
  studentSelfGradeScore: Ember.computed(
    'student.rubric',
    'student.selfGrade',
    function() {
      let component = this;
      let scoring = component.get('student.rubric.scoring');
      let studentScore;
      if (scoring) {
        let selfGrade = component.get('student.selfGrade');
        studentScore = selfGrade ? selfGrade.get('studentScore') : 0;
      }
      return Ember.Object.create({
        studentScore
      });
    }
  ),

  /**
   * Calculate rubric total points
   * @type {Number}
   */
  totalRubricPoints: Ember.computed('categories', function() {
    let component = this;
    let totalRubricPoints = 0;
    let categories = component.get('categories');
    if (categories) {
      categories.forEach(category => {
        if (category.get('allowsLevels') && category.get('allowsScoring')) {
          totalRubricPoints += category.get('totalPoints');
        }
      });
    }
    return totalRubricPoints;
  }),

  /**
   * Calculate user rubric total points
   * @type {Number}
   */
  totalUserRubricPoints: Ember.computed(
    'studentId',
    'categories.@each.selected',
    'categories.@each.scoreInPrecentage',
    function() {
      let component = this;
      let totalUserRubricPoints = 0;
      let categories = component.get('categories');
      if (categories) {
        categories.forEach(category => {
          if (category.get('allowsLevels') && category.get('allowsScoring')) {
            let level = category.get('levels').findBy('selected', true);
            if (level) {
              totalUserRubricPoints += parseInt(level.get('score'));
            }
          }
        });
      }
      return totalUserRubricPoints;
    }
  ),

  /**
   * Calculate rubric total score.
   * @return {Number}
   */
  userRubricScore: Ember.computed(
    'totalRubricPoints',
    'totalUserRubricPoints',
    function() {
      let score = -1;
      let totalRubricPoints = this.get('totalRubricPoints');
      let totalUserRubricPoints = this.get('totalUserRubricPoints');
      if (totalUserRubricPoints > 0) {
        score = Math.floor((totalUserRubricPoints / totalRubricPoints) * 100);
      }
      return score;
    }
  ),

  /**
   * Calculate grade total score.
   * @return {Number}
   */
  userGradeScore: Ember.computed('teacherRubric', function() {
    let score = -1;
    let gradeMaxScore = this.get('teacherRubric.maxScore');
    let studentScore = this.get('teacherRubric.studentScore');
    if (studentScore > 0) {
      score = Math.floor((studentScore / gradeMaxScore) * 100);
    }
    return score;
  }),

  /**
   * Read student grade score
   * @return {Number}
   */
  studentGradeScore: Ember.computed('teacherRubric.studentScore', function() {
    let score = 0;
    let studentScore = this.get('teacherRubric.studentScore');
    if (studentScore) {
      score = studentScore;
    }
    return score;
  }),

  /**
   * Read student self graded score
   * @return {Number}
   */
  studentSelfGrade: Ember.computed('student.selfGrade', function() {
    let component = this;
    let score = 0;
    let selfGrade = component.get('student.selfGrade');
    if (selfGrade) {
      let gradeMaxScore = selfGrade.get('maxScore');
      let studentScore = selfGrade.get('score');
      if (studentScore > 0) {
        score = Math.floor((studentScore / gradeMaxScore) * 100);
      }
    }
    return score;
  }),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered when the user invoke the pull up.
     **/
    onPullUpClose() {
      this.closePullUp();
    },

    onClickPrev() {
      let component = this;
      component
        .$(
          '.oa-grade-students-carousel #oa-grade-students-carousel-wrapper .carousel-control'
        )
        .addClass('in-active');
      let users = component.get('users');
      let selectedElement = component.$(
        '.oa-grade-students-carousel #oa-grade-students-carousel-wrapper .item.active'
      );
      let currentIndex = selectedElement.data('item-index');
      let selectedIndex = selectedElement.data('item-index') - 1;
      if (currentIndex === 0) {
        selectedIndex = users.length - 1;
      }
      let user = users.objectAt(selectedIndex);
      component.set('student', user);
      component
        .$('.oa-grade-students-carousel #oa-grade-students-carousel-wrapper')
        .carousel('prev');
      component.loadData();
    },

    onClickNext() {
      let component = this;
      component
        .$(
          '.oa-grade-students-carousel #oa-grade-students-carousel-wrapper .carousel-control'
        )
        .addClass('in-active');
      let users = component.get('users');
      let selectedElement = component.$(
        '.oa-grade-students-carousel #oa-grade-students-carousel-wrapper .item.active'
      );
      let currentIndex = selectedElement.data('item-index');
      let selectedIndex = currentIndex + 1;
      if (users.length - 1 === currentIndex) {
        selectedIndex = 0;
      }
      let user = users.objectAt(selectedIndex);
      component.set('student', user);
      component
        .$('.oa-grade-students-carousel #oa-grade-students-carousel-wrapper')
        .carousel('next');
      component.loadData();
    },

    /**
     * Action get triggered when rubric attachment preview got close
     */
    filePreviewClose() {
      this.$('.rubric-file-preview-container').fadeOut('slow');
    },

    /**
     * Action get triggered when rubric attachment preview got open
     */
    filePreviewOpen() {
      this.$('.rubric-file-preview-container')
        .css('visibility', 'visible')
        .hide()
        .fadeIn('slow');
    },

    saveGrade() {
      this.saveUserGrade();
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * Function to triggered once when the component element is first rendered.
   */
  didInsertElement() {
    this._super(...arguments);
    this.openPullUp();
    this.initialize();
  },

  didDestroyElement() {
    this.handleAppContainerScroll();
  },

  /**
   * Function to triggered once when the component element is after rendered
   */
  didRender() {
    this._super(...arguments);
    let component = this;
    component.handleAppContainerScroll();
  },

  // -------------------------------------------------------------------------
  //Methods

  initialize() {
    let component = this;
    let classId = component.get('context.classId');
    let activityId = component.get('context.dcaContentId');
    return Ember.RSVP.hash({
      studentList: component
        .get('classActivityService')
        .fetchUsersForClassActivity(classId, activityId)
    })
      .then(({ studentList }) => {
        if (!component.isDestroyed) {
          let users = studentList.filterBy('isActive', true);
          let studentId = component.get('studentId');
          if (!studentId) {
            let student = users.get('firstObject');
            component.set('student', student);
            let classId = component.get('context.classId');
            let activityId = component.get('context.dcaContentId');
            let studentId = component.get('student.id');
            return Ember.RSVP.hash({
              submission: component
                .get('oaAnaltyicsService')
                .getSubmissionsToGrade(classId, activityId, studentId),
              users
            });
          }
        }
      })
      .then(({ submission, users }) => {
        if (!component.get('isDestroyed')) {
          users.map(user => {
            let studentRubric = component
              .get('rubric')
              .findBy('isTeacherGrader', false);
            let newStudentRubric = studentRubric
              ? studentRubric.copy()
              : studentRubric;
            user.set(
              'rubric',
              component.createRubricGrade(newStudentRubric, user)
            );
            let teacherRubric = component
              .get('rubric')
              .findBy('isTeacherGrader', true);
            let newTeacherRubric = teacherRubric
              ? teacherRubric.copy()
              : teacherRubric;
            user.set(
              'teacherRubric',
              component.createRubricGrade(newTeacherRubric, user)
            );
          });
          component.set('users', users);
          let studentGrade = submission.get('oaRubrics.studentGrades');
          let teacherGrade = submission.get('oaRubrics.teacherGrades');
          let taskSubmission = submission.get('tasks');
          component.parseStudentSubmissionGrade(studentGrade, teacherGrade);
          component.parseStudentTaskSubmission(taskSubmission);
          component.set('isLoading', false);
          component.handleCarouselControl();
        }
      });
  },

  /**
   * Method to set values of student self grade and teacher grade for a selected student
   * @param  {Object} studentGrade
   * @param  {Object} teacherGrade
   */
  parseStudentSubmissionGrade(studentGrade, teacherGrade) {
    let component = this;
    let student = component.get('student');
    student.set('selfGrade', studentGrade);
    student.set('teacherGrade', teacherGrade);
  },

  /**
   * Method to parse student lavel task submission
   * @param  {Object} tasksSubmission
   */
  parseStudentTaskSubmission(tasksSubmission) {
    let component = this;
    let tasks = component.get('tasks');
    let activityTasks = Ember.A([]);
    tasks.map(task => {
      let newTask = component.createNewObjectForTask(task);
      let studentTaskSubmissions = tasksSubmission.findBy(
        'taskId',
        task.get('id')
      );
      if (studentTaskSubmissions) {
        newTask.set(
          'studentTaskSubmissions',
          studentTaskSubmissions.get('submissions')
        );
        newTask.set(
          'submissionText',
          studentTaskSubmissions.get('submissions').objectAt(0).submissionText
        );
      }
      activityTasks.pushObject(newTask);
    });
    component.set('activityTasks', activityTasks);
  },

  /**
   * Method to create new object instance for task level
   * @param  {Object} tasksSubmission
   */
  createNewObjectForTask(task) {
    return Ember.Object.create({
      title: task.get('title'),
      oaId: task.get('oaId'),
      id: task.get('id'),
      description: task.get('description'),
      submissionCount: task.get('submissionCount'),
      oaTaskSubmissions:
        task.get('oaTaskSubmissions').length > 0
          ? task.get('oaTaskSubmissions').map(item => {
            return Ember.Object.create({
              id: item.id,
              taskSubmissionSubType: item.taskSubmissionSubType,
              taskSubmissionType: item.taskSubmissionType,
              oaTaskId: item.oaTaskId
            });
          })
          : []
    });
  },

  /**
   * Method to save user grade by a teacher
   */
  saveUserGrade() {
    let component = this;
    let teacherGrade = component.get('teacherRubric');
    let categories = component.get('categories');
    let context = component.get('context');
    let categoriesScore = Ember.A([]);
    teacherGrade.set('classId', context.get('classId'));
    teacherGrade.set('dcaContentId', context.get('dcaContentId'));
    teacherGrade.set('collectionId', context.get('content.id'));
    teacherGrade.set('contentSource', PLAYER_EVENT_SOURCE.DAILY_CLASS);
    teacherGrade.set('collectionType', PLAYER_EVENT_SOURCE.OFFLINE_CLASS);
    teacherGrade.set('categoriesScore', categoriesScore);
    categories.forEach(category => {
      let level = null;
      if (category.get('allowsLevels')) {
        level = category.get('levels').findBy('selected', true);
        categoriesScore.pushObject(
          component.createRubricCategory(category, level)
        );
      } else if (category.get('comment')) {
        categoriesScore.pushObject(
          component.createRubricCategory(category, level)
        );
      } else {
        categoriesScore.pushObject(component.createRubricCategory(category));
      }
    });
    component
      .get('oaAnaltyicsService')
      .submitTeacherGrade(teacherGrade)
      .then(function() {
        component.slideToNextUser();
      });
  },

  /**
   * Method to create rubric category
   * @param  {Object} category
   * @param  {Object} level
   */
  createRubricCategory(category, level) {
    let rubricCategory = RubricCategoryScore.create(
      Ember.getOwner(this).ownerInjection(),
      {
        title: category.get('title')
      }
    );
    rubricCategory.set('levelMaxScore', 0);
    if (level) {
      rubricCategory.set('levelObtained', level.get('name'));
      if (category.get('allowsLevels') && category.get('allowsScoring')) {
        rubricCategory.set('levelScore', level.get('score'));
        rubricCategory.set('levelMaxScore', category.get('totalPoints'));
      }
    }
    rubricCategory.set('levelComment', category.get('comment'));
    return rubricCategory;
  },

  /**
   * Method to create rubric grade
   * @param  {Object} rubric
   * @param  {Object} user
   */
  createRubricGrade(rubric, user) {
    let component = this;
    return RubricGrade.create(Ember.getOwner(this).ownerInjection(), rubric, {
      comment: '',
      studentId: user.get('id'),
      classId: component.get('context.classId'),
      collectionId: component.get('context.dcaContentId'),
      createdDate: new Date(),
      studentScore: 0
    });
  },

  /**
   * Method to fetch submissions given by teacher and student
   */
  loadData() {
    let component = this;
    let classId = component.get('context.classId');
    let activityId = component.get('context.dcaContentId');
    let studentId = component.get('studentId');
    component.set('isLoading', true);
    component
      .get('oaAnaltyicsService')
      .getSubmissionsToGrade(classId, activityId, studentId)
      .then(submission => {
        let studentGrade = submission.get('oaRubrics.studentGrades');
        let teacherGrade = submission.get('oaRubrics.teacherGrades');
        let taskSubmission = submission.get('tasks');
        component.parseStudentSubmissionGrade(studentGrade, teacherGrade);
        component.parseStudentTaskSubmission(taskSubmission);
        component.set('isLoading', false);
        component.handleCarouselControl();
      });
  },

  /**
   * Function to animate the  pullup from bottom to top
   */
  openPullUp() {
    let component = this;
    component.$().animate(
      {
        top: '10%'
      },
      400
    );
  },

  closePullUp() {
    let component = this;
    component.$().animate(
      {
        top: '100%'
      },
      400,
      function() {
        component.set('showPullUp', false);
      }
    );
  },

  /**
   * Method to handle container scroll
   */
  handleAppContainerScroll() {
    let activePullUpCount = Ember.$(document.body).find('.backdrop-pull-ups')
      .length;
    if (activePullUpCount > 0) {
      Ember.$(document.body).addClass('no-vertical-scroll');
    } else if (activePullUpCount === 0) {
      Ember.$(document.body).removeClass('no-vertical-scroll');
    }
  },

  /**
   * Method to slide to next user
   */
  slideToNextUser() {
    let component = this;
    let users = component.get('users');
    if (users.length > 1) {
      let studentId = component.get('studentId');
      let users = component.get('users');
      let selectedUser = users.findBy('id', studentId);
      let selectedIndex = users.indexOf(selectedUser);
      let rightNavElement = component.$(
        '#oa-grade-students-carousel-wrapper .carousel-control.right'
      );
      let leftNavElement = component.$(
        '#oa-grade-students-carousel-wrapper .carousel-control.left'
      );
      let nextUserIndex = 0;
      if (!rightNavElement.hasClass('in-active')) {
        nextUserIndex = selectedIndex + 1;
      } else if (!leftNavElement.hasClass('in-active')) {
        nextUserIndex = selectedIndex - 1;
      }
      let nextUser = users.objectAt(nextUserIndex);
      component.set('student', nextUser);
      component
        .$('.oa-grade-students-carousel  #oa-grade-students-carousel-wrapper')
        .carousel(nextUserIndex);
      component.loadData();
      component.handleCarouselControl();
    } else {
      component.$('.caught-up-container').show(400, function() {
        let itemsToGrade = component.get('itemsToGrade');
        if (itemsToGrade) {
          let contentId = component.get('content.id');
          let item = itemsToGrade.findBy('content.id', contentId);
          itemsToGrade.removeObject(item);
        }
        component.$().fadeOut(5000, function() {
          component.set('showPullUp', false);
        });
      });
    }
  },

  /**
   * Method to handle carousel
   */
  handleCarouselControl() {
    let component = this;
    let studentId = component.get('studentId');
    let users = component.get('users');
    let selectedUser = users.findBy('id', studentId);
    let currentIndex = users.indexOf(selectedUser);
    if (users.length - 1 === 0) {
      component
        .$(
          '.oa-grade-students-carousel #oa-grade-students-carousel-wrapper .carousel-control'
        )
        .addClass('in-active');
    } else {
      if (currentIndex === 0) {
        component
          .$(
            '.oa-grade-students-carousel #oa-grade-students-carousel-wrapper .carousel-control.left'
          )
          .addClass('in-active');
      } else {
        component
          .$(
            '.oa-grade-students-carousel #oa-grade-students-carousel-wrapper .carousel-control.left'
          )
          .removeClass('in-active');
      }
      if (currentIndex === users.length - 1) {
        component
          .$(
            '.oa-grade-students-carousel #oa-grade-students-carousel-wrapper .carousel-control.right'
          )
          .addClass('in-active');
      } else {
        component
          .$(
            '.oa-grade-students-carousel #oa-grade-students-carousel-wrapper .carousel-control.right'
          )
          .removeClass('in-active');
      }
    }
  }
});
