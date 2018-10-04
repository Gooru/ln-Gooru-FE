import Ember from 'ember';
import { getGradeColor } from 'gooru-web/utils/utils';
import RubricGrade from 'gooru-web/models/rubric/rubric-grade';

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
    this.loadData();
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
  categories: Ember.computed('userRubric', function() {
    let categories = this.get('userRubric.categories')
      ? this.get('userRubric.categories')
      : Ember.A([]);
    categories.map(category => {
      let levels = category.get('levels');
      if (levels) {
        levels = levels.reverse();
        category.set('levels', levels);
      }
    });
    return categories ? categories : Ember.A([]);
  }),

  /**
   * Maintains the object value of rubric grading
   * @type {Object}
   */
  userRubric: Ember.computed('studentId', 'users.[]', function() {
    let studentId = this.get('studentId');
    let user = this.get('users').findBy('id', studentId);
    return user ? user.get('rubric') : {};
  }),

  /**
   * Maintains the user grade
   * @return {Object}
   */
  userGrade: Ember.computed('studentId', function() {
    let component = this;
    let studentId = component.get('studentId');
    return RubricGrade.create(
      Ember.getOwner(this).ownerInjection(),
      component.get('rubric'),
      {
        comment: '',
        studentId: studentId,
        classId: component.get('classId'),
        courseId: component.get('courseId'),
        unitId: component.get('unit.id'),
        lessonId: component.get('lesson.id'),
        collectionId: component.get('collectionId'),
        resourceId: component.get('questionId'),
        sessionId: component.get('answer.sessionId'),
        createdDate: new Date(),
        rubricCreatedDate: component.get('rubric.createdDate'),
        rubricUpdatedDate: component.get('updatedDate'),
        studentScore: 0
      }
    );
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
          totalRubricPoints += category.get('levels.length');
        } else {
          totalRubricPoints += 1;
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
            let levelIndex = category.get('levels').indexOf(level);
            if (levelIndex > -1) {
              totalUserRubricPoints += levelIndex + 1;
            }
          } else if (category.get('selected')) {
            totalUserRubricPoints += 1;
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
    }
  },

  //--------------------------------------------------------------------------
  // Methods

  loadData() {
    let component = this;
    let classId = component.get('classId');
    let courseId = component.get('courseId');
    let unitId = component.get('unitId');
    let lessonId = component.get('lessonId');
    let collectionId = component.get('collection.id');
    let questionId = component.get('question.id');
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
            component.set('studentId', users.get('students.firstObject'));
            studentId = users.get('students.firstObject');
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
        users.map(user => {
          user.set('rubric', rubric.copy());
        });
        component.set('users', users);
        component.set('rubric', rubric);
        component.set('answer', answer);
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
    component.$('.frq-grade-info-popover').on('click', function() {
      let levelIndex = component.$(this).data('level');
      let categoryIndex = component.$(this).data('category');
      let category = categories.objectAt(categoryIndex);
      let level = category.get('levels').objectAt(levelIndex);
      category.get('levels').map(level => {
        level.set('selected', false);
      });
      level.set('selected', true);
      let numberOfLevels = category.get('levels.length');
      let scoreInPrecentage = ((levelIndex + 1) / numberOfLevels) * 100;
      category.set('scoreInPrecentage', scoreInPrecentage);
      category.set('selected', true);
      if (isMobile.matches) {
        component
          .$('.frq-grade-info-popover')
          .not(this)
          .popover('hide');
        component.$(this).popover('show');
        Ember.$('.popover-title').css(
          'background-color',
          getGradeColor(scoreInPrecentage)
        );
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
        let numberOfLevels = category.get('levels.length');

        $(this).popover('show');
        if (category.get('allowsScoring')) {
          let scoreInPrecentage = ((levelIndex + 1) / numberOfLevels) * 100;
          Ember.$('.popover-title').css(
            'background-color',
            getGradeColor(scoreInPrecentage)
          );
        } else {
          Ember.$('.popover-title').hide();
        }
      });
    }
  }
});
