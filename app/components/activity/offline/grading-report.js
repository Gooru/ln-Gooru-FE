import Ember from 'ember';
import { getGradeColor } from 'gooru-web/utils/utils';
import RubricGrade from 'gooru-web/models/rubric/rubric-grade';
import RubricCategoryScore from 'gooru-web/models/rubric/grade-category-score';
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
  rubric: Ember.computed.alias('context.content.rubric.firstObject'),

  /**
   * Student count of this OA grade item.
   * @type {Number}
   */
  studentCount: Ember.computed.alias('context.studentCount'),

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
  userGrade: Ember.computed('studentId', 'users.[]', function() {
    let studentId = this.get('studentId');
    let user;
    if (this.get('users')) {
      user = this.get('users').findBy('id', studentId);
    }
    return user ? user.get('rubricGrade') : null;
  }),

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
        score = Math.floor(totalUserRubricPoints / totalRubricPoints * 100);
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
      score = Math.floor(studentScore / gradeMaxScore * 100);
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
    onPullUpClose() {
      this.closePullUp();
    },

    /**
     * Action get triggered when comment icon got toggle.
     */
    onShowAddCommentBox(categoryIndex) {
      let component = this;
      let element = component.$(`#oa-grade-rubric-category-${categoryIndex}`);
      if (element.hasClass('comment-active')) {
        element.find('.oa-grade-comment-section').slideUp(400, function() {
          element.removeClass('comment-active');
        });
      } else {
        element.find('.oa-grade-comment-section').slideDown(400, function() {
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
      component.set('studentId', user.get('id'));
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
      component.set('studentId', user.get('id'));
      component
        .$('.oa-grade-students-carousel #oa-grade-students-carousel-wrapper')
        .carousel('next');
      component.loadData();
    },

    /**
     * Action triggered when general comment section got focus in/out.
     */
    updateUserGradeComment() {
      let comment = this.$('.oa-grade-general-comment-container p').text();
      this.set('userGrade.comment', comment);
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
    component.setupTooltip();
    component.handleAppContainerScroll();
  },

  // -------------------------------------------------------------------------
  //Methods

  initialize() {
    let component = this;
    let classId = component.get('classId');
    let activityId = component.get('activityId');
    return Ember.RSVP
      .hash({
        users: component
          .get('oaAnaltyicsService')
          .getStudentListToGrade(classId, activityId)
      })
      .then(({ users }) => {
        if (users.get('students') && users.get('students').length) {
          return Ember.RSVP.hash({
            users: component
              .get('profileService')
              .readMultipleProfiles(users.get('students'))
          });
        }
      })
      .then(({ users }) => {
        if (!component.get('isDestroyed')) {
          users.map(user => {
            let rubric = component.get('rubric');
            let newRubric = rubric ? rubric.copy() : rubric;
            user.set(
              'rubricGrade',
              component.createRubricGrade(newRubric, user)
            );
          });
          let studentId = component.get('studentId');
          if (!studentId) {
            studentId = users.get('firstObject.id');
            component.set('studentId', studentId);
          }
          component.set('users', users);
          component.set('isLoading', false);
          component.handleCarouselControl();
        }
      });
  },

  setupTooltip() {
    let component = this;
    let categories = component.get('categories');
    component.$('.oa-grade-info-popover').popover({
      placement: 'top auto',
      container: '.oa-grading-report',
      trigger: 'manual'
    });
    let isMobile = window.matchMedia('only screen and (max-width: 768px)');
    if (isMobile.matches) {
      component.$('.close-popover').click(function() {
        component.$('.oa-grade-info-popover').popover('hide');
      });
    }

    component.$('.oa-grade-info-popover').on('click', function() {
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
        level.get('score') / totalPoints * 100
      );
      category.set('scoreInPrecentage', scoreInPrecentage);
      category.set('selected', true);
      if (isMobile.matches) {
        component
          .$('.oa-grade-info-popover')
          .not(this)
          .popover('hide');
        component.$(this).popover('show');
        Ember.$('.popover-title')
          .append('<span class="close-popover">x</span>')
          .css('background-color', getGradeColor(scoreInPrecentage));
      }
    });
    if (!isMobile.matches) {
      component.$('.oa-grade-info-popover').on('mouseleave', function() {
        $(this).popover('hide');
      });
      component.$('.oa-grade-info-popover').on('mouseenter', function() {
        let levelIndex = component.$(this).data('level');
        let categoryIndex = component.$(this).data('category');
        let category = categories.objectAt(categoryIndex);
        let totalPoints = category.get('totalPoints');
        let level = category.get('levels').objectAt(levelIndex);
        $(this).popover('show');
        if (category.get('allowsScoring')) {
          let scoreInPrecentage = Math.floor(
            level.get('score') / totalPoints * 100
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
      collectionId: component.get('contentId'),
      createdDate: new Date(),
      rubricCreatedDate: component.get('rubrics.createdDate'),
      studentScore: 0
    });
  },

  loadData() {
    let component = this;
    component.handleCarouselControl();
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
    component.$().animate({
      top: '100%'
    },
    400,
    function() {
      component.set('showPullUp', false);
    });
  },

  handleAppContainerScroll() {
    let activePullUpCount = Ember.$(document.body).find('.backdrop-pull-ups')
      .length;
    if (activePullUpCount > 0) {
      Ember.$(document.body).addClass('no-vertical-scroll');
    } else if (activePullUpCount === 0) {
      Ember.$(document.body).removeClass('no-vertical-scroll');
    }
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
      component.set('studentId', nextUser.get('id'));
      component
        .$('.oa-grade-students-carousel  #oa-grade-students-carousel-wrapper')
        .carousel(nextUserIndex);
      users.removeAt(selectedIndex);
      component.loadData();
      component.handleCarouselControl();
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
