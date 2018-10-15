import Ember from 'ember';
import { getGradeColor } from 'gooru-web/utils/utils';
import RubricGrade from 'gooru-web/models/rubric/rubric-grade';
import RubricCategoryScore from 'gooru-web/models/rubric/grade-category-score';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {RubricService} Service to retrieve rubric information
   */
  rubricService: Ember.inject.service('api-sdk/rubric'),

  /**
   * @type {ProfileService} Service to retrieve profile information
   */
  profileService: Ember.inject.service('api-sdk/profile'),

  /**
   * @type {ProfileService} Service to retrieve question information
   */
  questionService: Ember.inject.service('api-sdk/question'),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['grade', 'backdrop-pull-ups', 'free-response-question-grade'],

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

  /**
   * Function to triggered once when the component element is after rendered
   */
  didRender() {
    this._super(...arguments);
    let component = this;
    component.setupTooltip();
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * ClassId belongs to this FRQ grade item.
   * @type {String}
   */
  classId: Ember.computed.alias('context.classId'),

  /**
   * CourseId belongs to this FRQ grade item.
   * @type {String}
   */
  courseId: Ember.computed.alias('context.courseId'),

  /**
   * Unit belongs to this FRQ grade item.
   * @type {Object}
   */
  unit: Ember.computed.alias('context.unit'),

  /**
   * Lesson belongs to this FRQ grade item.
   * @type {Object}
   */
  lesson: Ember.computed.alias('context.lesson'),

  /**
   * Collection of this FRQ grade item.
   * @type {Object}
   */
  collection: Ember.computed.alias('context.collection'),

  /**
   * Question of this FRQ grade item.
   * @type {Object}
   */
  question: Ember.computed.alias('context.question'),

  /**
   * Propery to hide the default pullup.
   * @property {Boolean}
   */
  showPullUp: false,

  /**
   * It maintains the state of loading
   * @type {Boolean}
   */
  isLoading: false,

  /**
   * List of users who need grading
   * @type {Array}
   */
  users: Ember.A([]),

  /**
   *  Rubric which is associated with question
   * @type {Object}
   */
  rubric: null,

  /**
   * Answer data provided by the users
   * @type {Object}
   */
  answer: null,

  /**
   * Computed Properties for rubric categories
   * @type {Object}
   */
  categories: Ember.computed('userGrade', function() {
    let categories = this.get('userGrade.categories')
      ? this.get('userGrade.categories')
      : Ember.A([]);
    categories.map(category => {
      let levels = category.get('levels');
      if (levels) {
        if (category.get('allowsLevels') && category.get('allowsScoring')) {
          levels = levels.sortBy('score');
        }
        category.set('levels', levels);
      }
    });
    return categories ? categories : Ember.A([]);
  }),

  /**
   * Maintains the user grade
   * @return {Object}
   */
  userGrade: Ember.computed('studentId', 'users.[]', function() {
    let studentId = this.get('studentId');
    let user = this.get('users').findBy('id', studentId);
    return user ? user.get('rubricGrade') : null;
  }),

  /**
   *  Maintains student id value who requires grading
   * @type {String}
   */
  studentId: null,

  /**
   * Calculate rubric total points
   * @type {Number}
   */
  totalRubricPoints: Ember.computed('rubric.categories', function() {
    let component = this;
    let totalRubricPoints = 0;
    let categories = component.get('rubric.categories');
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
  userGradeScore: Ember.computed('userGrade.studentScore', function() {
    let score = -1;
    let gradeMaxScore = this.get('rubric.maxScore');
    let studentScore = this.get('userGrade.studentScore');
    if (studentScore > 0) {
      score = Math.floor((studentScore / gradeMaxScore) * 100);
    }
    return score;
  }),

  /**
   * Read student grade score
   * @return {Number}
   */
  studentGradeScore: Ember.computed('userGrade.studentScore', function() {
    let score = 0;
    let studentScore = this.get('userGrade.studentScore');
    if (studentScore) {
      score = studentScore;
    }
    return score;
  }),

  /**
   * Maintains the value of selected user index.
   * @return {Number}
   */
  currentStudentIndex: Ember.computed('studentId', 'users', function() {
    let users = this.get('users');
    let studentId = this.get('studentId');
    let user = users.findBy('id', studentId);
    return users.indexOf(user) + 1;
  }),

  /**
   * Maintains the  list of question items  need to grade.
   * @type {Array}
   */
  itemsToGrade: Ember.A([]),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered when the user invoke the pull up.
     **/
    onPullUpClose(closeAll) {
      this.closePullUp(closeAll);
    },

    /**
     * Action get triggered when comment icon got toggle.
     */
    onShowAddCommentBox(categoryIndex) {
      let component = this;
      let element = component.$(`#frq-grade-rubric-category-${categoryIndex}`);
      if (element.hasClass('comment-active')) {
        element.find('.frq-grade-comment-section').slideUp(400, function() {
          element.removeClass('comment-active');
        });
      } else {
        element.find('.frq-grade-comment-section').slideDown(400, function() {
          element.addClass('comment-active');
        });
      }
    },

    /**
     * Action triggered when clear the category level choosen
     * @param  {Object} category
     */
    unSelectCategoryLevel(category) {
      category.set('scoreInPrecentage', null);
      let levels = category.get('levels');
      if (levels && levels.length > 0) {
        levels.findBy('selected', true).set('selected', false);
      }
      category.set('selected', false);
    },

    /**
     * Action triggered when category get choosen
     * @param  {Object} category
     */
    onChooseCategory(category) {
      category.set('selected', true);
    },

    onClickPrev() {
      let component = this;
      component
        .$(
          '.frq-grade-students-carousel #frq-grade-students-carousel-wrapper .carousel-control'
        )
        .addClass('in-active');
      let users = component.get('users');
      let selectedElement = component.$(
        '.frq-grade-students-carousel #frq-grade-students-carousel-wrapper .item.active'
      );
      let currentIndex = selectedElement.data('item-index');
      let selectedIndex = selectedElement.data('item-index') - 1;
      if (currentIndex === 0) {
        selectedIndex = users.length - 1;
      }
      let user = users.objectAt(selectedIndex);
      component.set('studentId', user.get('id'));
      component
        .$('.frq-grade-students-carousel #frq-grade-students-carousel-wrapper')
        .carousel('prev');
      component.loadData();
    },

    onClickNext() {
      let component = this;
      component
        .$(
          '.frq-grade-students-carousel #frq-grade-students-carousel-wrapper .carousel-control'
        )
        .addClass('in-active');
      let users = component.get('users');
      let selectedElement = component.$(
        '.frq-grade-students-carousel #frq-grade-students-carousel-wrapper .item.active'
      );
      let currentIndex = selectedElement.data('item-index');
      let selectedIndex = currentIndex + 1;
      if (users.length - 1 === currentIndex) {
        selectedIndex = 0;
      }
      let user = users.objectAt(selectedIndex);
      component.set('studentId', user.get('id'));
      component
        .$('.frq-grade-students-carousel #frq-grade-students-carousel-wrapper')
        .carousel('next');
      component.loadData();
    },

    /**
     * Action triggered when general comment section got focus in/out.
     */
    updateUserGradeComment() {
      let comment = this.$('.frq-grade-general-comment-container p').text();
      this.set('userGrade.comment', comment);
    },

    /**
     * Action get triggered when user submit grade for student.
     */
    submitUserGrade() {
      this.saveUserGrade();
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
    }
  },

  //--------------------------------------------------------------------------
  // Methods

  initialize() {
    let component = this;
    let classId = component.get('classId');
    let courseId = component.get('courseId');
    let unitId = component.get('unitId');
    let lessonId = component.get('lessonId');
    let collectionId = component.get('collection.id');
    let questionId = component.get('question.id');
    component.set('isLoading', true);
    return Ember.RSVP.hash({
      question: this.get('questionService').readQuestion(questionId),
      users: this.get('rubricService').getStudentsForQuestion(
        questionId,
        classId,
        courseId,
        collectionId
      )
    })
      .then(({ users, question }) => {
        component.set('question', question);
        if (users.get('students') && users.get('students').length) {
          let studentId = component.get('studentId');
          if (!studentId) {
            studentId = users.get('students.firstObject');
            component.set('studentId', studentId);
          }

          return Ember.RSVP.hash({
            answer: this.get('rubricService').getAnswerToGrade(
              studentId,
              classId,
              courseId,
              collectionId,
              questionId,
              unitId,
              lessonId
            ),
            rubric: question.get('rubric.id')
              ? this.get('rubricService').getRubric(question.get('rubric.id'))
              : null,
            userIds: users.get('students'),
            users: this.get('profileService').readMultipleProfiles(
              users.get('students')
            ),
            currentUserId: studentId,
            classId,
            questionId,
            courseId,
            collectionId,
            unitId,
            lessonId
          });
        }
      })
      .then(({ users, rubric, answer }) => {
        if (!component.get('isDestroyed')) {
          users.map(user => {
            let newRubric = rubric ? rubric.copy() : rubric;
            user.set(
              'rubricGrade',
              component.createRubricGrade(newRubric, user)
            );
          });
          component.set('users', users);
          component.set('rubric', rubric);
          component.set('answer', answer);
          component.set('isLoading', false);
          component.handleCarouselControl();
        }
      });
  },

  loadData() {
    let component = this;
    let classId = component.get('classId');
    let courseId = component.get('courseId');
    let unitId = component.get('unitId');
    let lessonId = component.get('lessonId');
    let collectionId = component.get('collection.id');
    let questionId = component.get('question.id');
    let studentId = component.get('studentId');
    component.set('isLoading', true);
    return Ember.RSVP.hash({
      answer: this.get('rubricService').getAnswerToGrade(
        studentId,
        classId,
        courseId,
        collectionId,
        questionId,
        unitId,
        lessonId
      )
    }).then(({ answer }) => {
      if (!component.get('isDestroyed')) {
        component.set('answer', answer);
        component.set('isLoading', false);
        component.handleCarouselControl();
      }
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

  closePullUp(closeAll) {
    let component = this;
    component.$().animate(
      {
        top: '100%'
      },
      400,
      function() {
        component.set('showPullUp', false);
        if (closeAll) {
          component.sendAction('onClosePullUp');
        }
      }
    );
  },

  setupTooltip: function() {
    let component = this;
    let categories = component.get('categories');
    component.$('.frq-grade-info-popover').popover({
      placement: 'top auto',
      container: '.free-response-question-grade',
      trigger: 'manual'
    });
    let isMobile = window.matchMedia('only screen and (max-width: 768px)');
    if (isMobile.matches) {
      component.$('.close-popover').click(function() {
        component.$('.frq-grade-info-popover').popover('hide');
      });
    }

    component.$('.frq-grade-info-popover').on('click', function() {
      let levelIndex = component.$(this).data('level');
      let categoryIndex = component.$(this).data('category');
      let category = categories.objectAt(categoryIndex);
      let level = category.get('levels').objectAt(levelIndex);
      category.get('levels').map(level => {
        level.set('selected', false);
      });
      level.set('selected', true);
      let totalPoints = category.get('totalPoints');
      let scoreInPrecentage = Math.floor(
        (level.get('score') / totalPoints) * 100
      );
      category.set('scoreInPrecentage', scoreInPrecentage);
      category.set('selected', true);
      if (isMobile.matches) {
        component
          .$('.frq-grade-info-popover')
          .not(this)
          .popover('hide');
        component.$(this).popover('show');
        Ember.$('.popover-title')
          .append('<span class="close-popover">x</span>')
          .css('background-color', getGradeColor(scoreInPrecentage));
      }
    });
    if (!isMobile.matches) {
      component.$('.frq-grade-info-popover').on('mouseleave', function() {
        $(this).popover('hide');
      });
      component.$('.frq-grade-info-popover').on('mouseenter', function() {
        let levelIndex = component.$(this).data('level');
        let categoryIndex = component.$(this).data('category');
        let category = categories.objectAt(categoryIndex);
        let totalPoints = category.get('totalPoints');
        let level = category.get('levels').objectAt(levelIndex);
        $(this).popover('show');
        if (category.get('allowsScoring')) {
          let scoreInPrecentage = Math.floor(
            (level.get('score') / totalPoints) * 100
          );
          Ember.$('.popover-title').css(
            'background-color',
            getGradeColor(scoreInPrecentage)
          );
        } else {
          Ember.$('.popover-title').hide();
        }
      });
    }
  },

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

  createRubricGrade(rubric, user) {
    let component = this;
    return RubricGrade.create(Ember.getOwner(this).ownerInjection(), rubric, {
      comment: '',
      studentId: user.get('id'),
      classId: component.get('classId'),
      courseId: component.get('courseId'),
      unitId: component.get('unit.id'),
      lessonId: component.get('lesson.id'),
      collectionId: component.get('collection.id'),
      resourceId: component.get('question.id'),
      createdDate: new Date(),
      rubricCreatedDate: component.get('rubric.createdDate'),
      rubricUpdatedDate: component.get('updatedDate'),
      studentScore: 0
    });
  },

  saveUserGrade() {
    let component = this;
    let userGrade = component.get('userGrade');
    let categories = component.get('categories');
    let categoriesScore = Ember.A([]);
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
      }
    });
    userGrade.set('categoriesScore', categoriesScore);
    userGrade.set('sessionId', component.get('answer.sessionId'));
    userGrade.set('updatedDate', new Date());
    component
      .get('rubricService')
      .setStudentRubricGrades(userGrade)
      .then(() => {
        component.slideToNextUser();
      });
  },

  slideToNextUser() {
    let component = this;
    let users = component.get('users');
    if (users.length > 1) {
      let studentId = component.get('studentId');
      let users = component.get('users');
      let selectedUser = users.findBy('id', studentId);
      let selectedIndex = users.indexOf(selectedUser);
      let rightNavElement = component.$(
        '#frq-grade-students-carousel-wrapper .carousel-control.right'
      );
      let leftNavElement = component.$(
        '#frq-grade-students-carousel-wrapper .carousel-control.left'
      );
      let nextUserIndex = 0;
      if (!rightNavElement.hasClass('in-active')) {
        nextUserIndex = selectedIndex + 1;
      } else if (!leftNavElement.hasClass('in-active')) {
        nextUserIndex = selectedIndex - 1;
      }
      let nextUser = users.objectAt(nextUserIndex);
      component.set('studentId', nextUser.get('id'));
      component
        .$('.frq-grade-students-carousel  #frq-grade-students-carousel-wrapper')
        .carousel(nextUserIndex);
      users.removeAt(selectedIndex);
      component.loadData();
      component.handleCarouselControl();
    } else {
      component.$('.caught-up-container').show(400, function() {
        let itemsToGrade = component.get('itemsToGrade');
        if (itemsToGrade) {
          let questionId = component.get('question.id');
          let item = itemsToGrade.findBy('question.id', questionId);
          itemsToGrade.removeObject(item);
        }
        component.$().fadeOut(5000, function() {
          component.set('showPullUp', false);
        });
      });
    }
  },

  handleCarouselControl() {
    let component = this;
    let studentId = component.get('studentId');
    let users = component.get('users');
    let selectedUser = users.findBy('id', studentId);
    let currentIndex = users.indexOf(selectedUser);
    if (users.length - 1 === 0) {
      component
        .$(
          '.frq-grade-students-carousel #frq-grade-students-carousel-wrapper .carousel-control'
        )
        .addClass('in-active');
    } else {
      if (currentIndex === 0) {
        component
          .$(
            '.frq-grade-students-carousel #frq-grade-students-carousel-wrapper .carousel-control.left'
          )
          .addClass('in-active');
      } else {
        component
          .$(
            '.frq-grade-students-carousel #frq-grade-students-carousel-wrapper .carousel-control.left'
          )
          .removeClass('in-active');
      }
      if (currentIndex === users.length - 1) {
        component
          .$(
            '.frq-grade-students-carousel #frq-grade-students-carousel-wrapper .carousel-control.right'
          )
          .addClass('in-active');
      } else {
        component
          .$(
            '.frq-grade-students-carousel #frq-grade-students-carousel-wrapper .carousel-control.right'
          )
          .removeClass('in-active');
      }
    }
  }
});
