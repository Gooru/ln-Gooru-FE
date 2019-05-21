import Ember from 'ember';
import {
  aggregateMilestonePerformanceScore,
  aggregateMilestonePerformanceTimeSpent
} from 'gooru-web/utils/performance-data';
import { CONTENT_TYPES } from 'gooru-web/config/config';
import { roundFloat } from 'gooru-web/utils/math';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'backdrop-pull-ups', 'pull-up-unit-report'],

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {PerformanceService}
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * @type {UnitService} Service to retrieve unitService information
   */
  unitService: Ember.inject.service('api-sdk/unit'),

  courseService: Ember.inject.service('api-sdk/course'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered when the user invoke the pull up.
     **/
    onPullUpClose(closeAll) {
      this.closePullUp(closeAll);
    },

    onClickPrev() {
      let component = this;
      component
        .$('.unit-report-container #report-carousel-wrapper .carousel-control')
        .addClass('in-active');
      let units = component.get('unitsHasPerformance');
      let selectedElement = component.$(
        '.unit-report-container #report-carousel-wrapper .item.active'
      );
      let currentIndex = selectedElement.data('item-index');
      let selectedIndex = selectedElement.data('item-index') - 1;
      if (currentIndex === 0) {
        selectedIndex = units.length - 1;
      }
      component.set('selectedUnit', units.objectAt(selectedIndex));
      component
        .$('.unit-report-container #report-carousel-wrapper')
        .carousel('prev');
      if (component.get('isShowMilestoneReport')) {
        component.loadMilestoneLessonsPerformanceData();
      } else {
        component.loadData();
      }
    },

    onClickNext() {
      let component = this;
      component
        .$('.unit-report-container #report-carousel-wrapper .carousel-control')
        .addClass('in-active');
      let units = component.get('unitsHasPerformance');
      let selectedElement = component.$(
        '.unit-report-container #report-carousel-wrapper .item.active'
      );
      let currentIndex = selectedElement.data('item-index');
      let selectedIndex = currentIndex + 1;
      if (units.length - 1 === currentIndex) {
        selectedIndex = 0;
      }
      component.set('selectedUnit', units.objectAt(selectedIndex));
      component
        .$('.unit-report-container #report-carousel-wrapper')
        .carousel('next');
      if (component.get('isShowMilestoneReport')) {
        component.loadMilestoneLessonsPerformanceData();
      } else {
        component.loadData();
      }
    },

    openLessonReport(lesson, lessons) {
      let component = this;
      let params = {
        classId: component.get('classId'),
        courseId: component.get('courseId'),
        lesson,
        lessons,
        classMembers: component.get('classMembers')
      };

      if (component.get('isShowMilestoneReport')) {
        let milestoneReportParams = {
          unitId: lesson.get('unit_id'),
          lessonId: lesson.get('lesson_id'),
          unit: component.get('selectedUnit')
        };
        params = Object.assign(params, milestoneReportParams);
      } else {
        let courseMapReportParams = {
          unit: component.get('unit')
        };
        params = Object.assign(params, courseMapReportParams);
      }
      this.sendAction('onOpenLessonReport', params);
    },

    openStudentUnitReport(userId) {
      this.onOpenStudentUnitReport(userId);
    },

    onClickChart(userId, showReport) {
      if (showReport) {
        this.onOpenStudentUnitReport(userId);
      }
    }
  },

  // -------------------------------------------------------------------------
  // Events

  didRender() {
    this.handleAppContainerScroll();
  },

  didDestroyElement() {
    this.handleAppContainerScroll();
  },

  /**
   * Function to triggered once when the component element is first rendered.
   */
  didInsertElement() {
    this.handleScrollToFixHeader();
    this.openPullUp();
    this.slideToSelectedUnit();
    if (this.get('isShowMilestoneReport')) {
      this.loadMilestoneLessonsPerformanceData();
    } else {
      this.loadData();
    }
  },
  // -------------------------------------------------------------------------
  // Properties

  /**
   * ClassId belongs to this unit report.
   * @type {String}
   */
  classId: Ember.computed.alias('context.classId'),

  /**
   * CourseId belongs to this unit report.
   * @type {String}
   */
  courseId: Ember.computed.alias('context.courseId'),

  /**
   * Course belongs to this unit report.
   * @type {String}
   */
  course: Ember.computed.alias('context.course'),

  /**
   * Unit Id belongs to this unit report.
   * @type {String}
   */
  unitId: Ember.computed.alias('context.unitId'),

  /**
   * List of units mapped to course.
   * @type {Array}
   */
  units: Ember.computed('context.units', function() {
    let units = this.get('context.units').map(unit => {
      if (unit.get('performance.score') >= 0) {
        unit.set('performance.hasStarted', true);
      }
      return unit;
    });
    return units;
  }),

  /**
   * List of units has performance
   * @type {Array}
   */
  unitsHasPerformance: Ember.computed('units', function() {
    let units = this.get('units');
    return units.filterBy('performance.hasStarted', true);
  }),

  /**
   * unit
   * @type {Object}
   */
  unit: null,

  /**
   * Maintains list of unit items.
   * @type {Array}
   */
  lessons: Ember.A([]),

  /**
   * Selected unit.
   * @type {Object}
   */
  selectedUnit: Ember.computed.alias('context.unit'),

  /**
   * Propery to hide the default pullup.
   * @property {showPullUp}
   */
  showPullUp: false,

  /**
   * List of class members
   * @type {Object}
   */
  classMembers: Ember.computed.alias('context.classMembers'),

  /**
   *  Stutent  report data
   * @type {Object}
   */
  studentReportData: Ember.A([]),

  /**
   * It maintains the state of loading
   * @type {Boolean}
   */
  isLoading: false,

  /**
   * This attribute decide default sorting key
   * @type {String}
   */
  defaultSortCriteria: 'lastName',

  /**
   * Maintain the status of sort by firstName
   * @type {String}
   */
  sortByFirstnameEnabled: false,

  /**
   * Maintain the status of sort by lastName
   * @type {String}
   */
  sortByLastnameEnabled: true,

  /**
   * Maintain the status of sort by score
   * @type {String}
   */
  sortByScoreEnabled: false,

  /**
   * Maintains the state of student unit report
   * @type {Boolean}
   */
  showStudentUnitReport: false,

  /**
   * @property {String} frameworkCode
   */
  frameworkCode: Ember.computed.alias('class.preference.framework'),

  //--------------------------------------------------------------------------
  // Methods

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

  onClosePullUp() {
    let component = this;
    component.set('showStudentUnitReport', false);
    component.closePullUp(true);
  },

  closePullUp(closeAll) {
    let component = this;
    component.$().animate({
      top: '100%'
    },
    400,
    function() {
      component.set('showPullUp', false);
      if (closeAll) {
        component.sendAction('onClosePullUp');
      }
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

  handleScrollToFixHeader() {
    let component = this;
    component.$('.unit-report-container .report-content').scroll(function() {
      let scrollTop = component
        .$('.unit-report-container .report-content')
        .scrollTop();
      let scrollFixed = component.$(
        '.unit-report-container .report-content .pull-up-unit-report-listview .on-scroll-fixed'
      );
      let height =
        component
          .$('.unit-report-container .report-content .report-carousel')
          .height() +
        component
          .$('.unit-report-container .report-content .report-header-container')
          .height();
      if (scrollTop >= height) {
        let position = scrollTop - height;
        component.$(scrollFixed).css('top', `${position}px`);
      } else {
        component.$(scrollFixed).css('top', '0px');
      }
    });
  },

  slideToSelectedUnit() {
    let component = this;
    let units = component.get('unitsHasPerformance');
    let selectedUnit = component.get('selectedUnit');
    let selectedIndex = units.indexOf(selectedUnit);
    component
      .$('.unit-report-container #report-carousel-wrapper')
      .carousel(selectedIndex);
  },

  loadData() {
    let component = this;
    const classId = this.get('classId');
    let unitId = component.get('selectedUnit.id');
    let courseId = component.get('courseId');
    let classMembers = this.get('classMembers');
    component.set('isLoading', true);
    return Ember.RSVP
      .hash({
        unit: component.get('unitService').fetchById(courseId, unitId)
      })
      .then(({ unit }) => {
        if (!component.isDestroyed) {
          component.set('unit', unit);
          component.set('lessons', unit.get('children'));
        }
        return Ember.RSVP
          .hash({
            performance: component
              .get('performanceService')
              .findClassPerformanceByUnit(
                classId,
                courseId,
                unitId,
                classMembers
              )
          })
          .then(({ performance }) => {
            if (!component.isDestroyed) {
              component.calcluateLessonPerformance(performance);
              component.parseClassMemberAndPerformanceData(performance);
              component.set('sortByLastnameEnabled', true);
              component.set('sortByFirstnameEnabled', false);
              component.set('sortByScoreEnabled', false);
              component.set('isLoading', false);
              component.handleCarouselControl();
            }
          });
      });
  },

  calcluateLessonPerformance(performance) {
    let component = this;
    let lessons = component.get('lessons');
    lessons.map(function(lesson) {
      let lessonId = lesson.get('id');
      const averageScore = performance.calculateAverageScoreByItem(lessonId);
      const timeSpent = performance.calculateAverageTimeSpentByItem(lessonId);
      const completionDone = performance.calculateSumCompletionDoneByItem(
        lessonId
      );
      const completionTotal = performance.calculateSumCompletionTotalByItem(
        lessonId
      );
      lesson.set(
        'performance',
        Ember.Object.create({
          score: averageScore,
          timeSpent: timeSpent,
          hasStarted: averageScore > 0 || timeSpent > 0,
          isCompleted: completionDone > 0 && completionDone >= completionTotal
        })
      );
      return lesson;
    });
  },

  parseClassMemberAndPerformanceData(performance) {
    let component = this;
    let classMembers = component.get('classMembers');
    let users = Ember.A([]);
    classMembers.forEach(member => {
      let user = component.createUser(member);
      let lessons = component.get('lessons');
      let performanceData = performance.get('studentPerformanceData');
      let userId = member.get('id');
      let userPerformance = performanceData.findBy('user.id', userId);
      let resultSet = component.parsePerformanceLessonAndUserData(
        userId,
        lessons,
        userPerformance
      );
      user.set('userPerformanceData', resultSet.userPerformanceData);
      user.set('hasStarted', resultSet.hasStarted);
      user.set('score', resultSet.overAllScore);
      // Reform score value and store in score-use-for-sort field, to handle sort.
      // -1 defines not started.
      if (!resultSet.hasStarted) {
        user.set('score-use-for-sort', -1);
      } else {
        user.set('score-use-for-sort', resultSet.overAllScore);
      }
      user.set('difference', 100 - resultSet.overAllScore);
      users.pushObject(user);
    });
    users = users.sortBy(component.get('defaultSortCriteria'));
    component.set('studentReportData', users);
  },

  createUser(user) {
    return Ember.Object.create({
      id: user.get('id'),
      firstName: user.get('firstName'),
      lastName: user.get('lastName'),
      avatarUrl: user.get('avatarUrl')
    });
  },

  parsePerformanceLessonAndUserData(userId, lessons, userPerformance) {
    let userPerformanceData = Ember.A([]);
    let totalScore = 0;
    let totalTimeSpent = 0;
    let hasStarted = false;
    let numberlessonstarted = 0;
    let lessonResults = userPerformance.get('performanceData');
    lessons.forEach((lesson, index) => {
      let lessonId = lesson.get('id');
      let performanceData = Ember.Object.create({
        id: lesson.get('id'),
        sequence: index + 1
      });
      if (userPerformance) {
        let lessonResult = lessonResults.findBy('id', `${userId}@${lessonId}`);
        if (lessonResult) {
          performanceData.set('hasStarted', true);
          hasStarted = true;
          let score = lessonResult.get('score') ? lessonResult.get('score') : 0;
          performanceData.set('timeSpent', lessonResult.get('timeSpent'));
          performanceData.set('score', score);
          totalScore = totalScore + score;
          totalTimeSpent = totalTimeSpent + lessonResult.get('timeSpent');
          numberlessonstarted++;
        } else {
          performanceData.set('hasStarted', false);
        }
      } else {
        performanceData.set('hasStarted', false);
      }
      userPerformanceData.pushObject(performanceData);
    });
    let overAllScore =
      numberlessonstarted > 0
        ? Math.floor(totalScore / numberlessonstarted)
        : 0;
    let resultSet = {
      userPerformanceData: userPerformanceData,
      overAllScore: overAllScore,
      hasStarted: hasStarted,
      totalTimeSpent: totalTimeSpent
    };
    return resultSet;
  },

  handleCarouselControl() {
    let component = this;
    let selectedUnit = component.get('selectedUnit');
    let units = component.get('unitsHasPerformance');
    let currentIndex = units.indexOf(selectedUnit);
    if (units.length - 1 === 0) {
      component
        .$('.unit-report-container #report-carousel-wrapper .carousel-control')
        .addClass('in-active');
    } else {
      if (currentIndex === 0) {
        component
          .$(
            '.unit-report-container #report-carousel-wrapper .carousel-control.left'
          )
          .addClass('in-active');
      } else {
        component
          .$(
            '.unit-report-container #report-carousel-wrapper .carousel-control.left'
          )
          .removeClass('in-active');
      }
      if (currentIndex === units.length - 1) {
        component
          .$(
            '.unit-report-container #report-carousel-wrapper .carousel-control.right'
          )
          .addClass('in-active');
      } else {
        component
          .$(
            '.unit-report-container #report-carousel-wrapper .carousel-control.right'
          )
          .removeClass('in-active');
      }
    }
  },

  getUnitPerformanceForClassMember(userId) {
    let component = this;
    let studentReportData = component.get('studentReportData');
    let userPerformance = studentReportData.findBy('id', userId);
    if (userPerformance.get('hasStarted')) {
      return Ember.Object.create({
        score: userPerformance.get('score'),
        hasStarted: userPerformance.get('hasStarted')
      });
    }
  },

  onOpenStudentUnitReport(userId) {
    let component = this;
    if (component.get('isShowMilestoneReport')) {
      let milestone = component.get('selectedUnit');
      let activeMilestone = component.get('selectedUnit');
      let studentMilestone = Object.create(activeMilestone);
      let studentPerformance = component.getUnitPerformanceForClassMember(
        userId
      );
      studentMilestone.set(
        'performance',
        Ember.Object.create({
          scoreInPercentage: studentPerformance.get('score'),
          score: studentPerformance.get('score'),
          timeSpent: studentPerformance.get('timeSpent')
        })
      );
      component.set('activeMilestoneIndex', milestone.get('sequence') - 1);
      component.set('selectedStudentId', userId);
      component.set('studentMilestone', studentMilestone);
      component.set('isShowStudentMilestoneReport', true);
    } else {
      let unit = Ember.Object.create({
        id: component.get('unit.id'),
        title: component.get('unit.title'),
        bigIdeas: component.get('unit.bigIdeas'),
        performance: component.getUnitPerformanceForClassMember(userId)
      });
      let params = {
        classId: component.get('classId'),
        courseId: component.get('courseId'),
        unitId: component.get('unit.id'),
        unit: unit,
        units: component.get('units'),
        userId: userId
      };
      component.set('showStudentUnitReport', true);
      component.set('studentUnitReportContext', params);
    }
  },

  loadMilestoneLessonsPerformanceData() {
    const component = this;
    let milestone = component.get('selectedUnit');
    let lessons = milestone.get('lessons');
    return Ember.RSVP
      .hash({
        milestoneLessonsPerformanceData: component.fetchMilestoneLessonsPerformance(
          CONTENT_TYPES.ASSESSMENT
        ),
        lessons: lessons || component.fetchMilestoneLessons()
      })
      .then(({ lessons, milestoneLessonsPerformanceData }) => {
        component.set('lessons', lessons);
        component.getAggregatedLessonsPerformance(
          milestoneLessonsPerformanceData
        );
        component.parseStudentsLessonsPerformanceData(
          milestoneLessonsPerformanceData
        );
      });
  },

  fetchMilestoneLessons() {
    const component = this;
    let milestone = component.get('selectedUnit');
    const courseId = component.get('courseId');
    const milestoneId = milestone.get('milestone_id');
    return component
      .get('courseService')
      .getCourseMilestoneLessons(courseId, milestoneId);
  },

  fetchMilestoneLessonsPerformance(contentType) {
    const component = this;
    let milestone = component.get('selectedUnit');
    const milestoneId = milestone.get('milestone_id');
    const performanceService = component.get('performanceService');
    const classId = component.get('classId');
    const courseId = component.get('courseId');
    const frameworkCode = component.get('frameworkCode');
    return performanceService.getLessonsPerformanceByMilestoneId(
      classId,
      courseId,
      milestoneId,
      contentType,
      undefined,
      frameworkCode
    );
  },

  getAggregatedLessonsPerformance(lessonsPerformance) {
    const component = this;
    let lessons = component.get('lessons');
    if (lessons.length) {
      lessons.forEach((lesson, index) => {
        let lessonPerformanceData = Ember.Object.create({
          score: null,
          timeSpent: null,
          hasStarted: false,
          isCompleted: false
        });
        let lessonPerformance = lessonsPerformance.filterBy(
          'lessonId',
          lesson.get('lesson_id')
        );
        if (lessonPerformance.length) {
          let aggregatedScore = aggregateMilestonePerformanceScore(
            lessonPerformance
          );
          let aggregatedTimeSpent = aggregateMilestonePerformanceTimeSpent(
            lessonPerformance
          );
          lessonPerformanceData.set('score', aggregatedScore);
          lessonPerformanceData.set('timeSpent', aggregatedTimeSpent);
          lessonPerformanceData.set(
            'hasStarted',
            aggregatedScore > 0 || aggregatedTimeSpent > 0
          );
        }
        lesson.set('performance', lessonPerformanceData);
        lesson.set('sequence', index + 1);
      });
    }
  },

  parseStudentsLessonsPerformanceData(milestoneLessonsPerformanceData) {
    const component = this;
    let studentsLessonsPerformanceData = Ember.A([]);
    let classMembers = component.get('classMembers');
    let lessons = component.get('lessons');
    classMembers.map(student => {
      let studentLessonsPerformanceContext = Ember.Object.create({
        hasStarted: false,
        score: null,
        id: student.get('id'),
        firstName: student.get('firstName'),
        lastName: student.get('lastName'),
        avatarUrl: student.get('avatarUrl')
      });
      let userPerformanceData = Ember.A([]);
      let userLessonsPerformance = milestoneLessonsPerformanceData.filterBy(
        'userUid',
        student.get('id')
      );
      let studentPerformanceScore = 0;
      let lessonSeq = 1;
      let totalStudentPlayedLessons = userLessonsPerformance.length;
      let isStudentHasStarted = false;
      // let studentLessonsPerformanceDataContext = studentLessonsPerformanceContext.get('userPerformanceData');
      lessons.map(lesson => {
        let lessonPerformanceContext = Ember.Object.create({
          id: lesson.get('lesson_id'),
          hasStarted: false,
          sequence: lessonSeq
        });
        let lessonPerformance = userLessonsPerformance.findBy(
          'lessonId',
          lesson.get('lesson_id')
        );
        if (lessonPerformance) {
          lessonPerformanceContext.set(
            'score',
            lessonPerformance.get('performance.scoreInPercentage')
          );
          lessonPerformanceContext.set(
            'timeSpent',
            lessonPerformance.get('performance.timeSpent')
          );
          lessonPerformanceContext.set('hasStarted', true);
          studentPerformanceScore += lessonPerformance.get(
            'performance.scoreInPercentage'
          );
          isStudentHasStarted = true;
        }
        userPerformanceData.pushObject(
          Object.assign(lessonPerformanceContext, lesson)
        );
        lessonSeq++;
      });
      let studentMilestoneScoreInPercentage = totalStudentPlayedLessons
        ? roundFloat(studentPerformanceScore / totalStudentPlayedLessons)
        : 0;
      studentLessonsPerformanceContext.set(
        'score',
        studentMilestoneScoreInPercentage
      );
      studentLessonsPerformanceContext.set(
        'score-use-for-sort',
        studentMilestoneScoreInPercentage
      );
      studentLessonsPerformanceContext.set('hasStarted', isStudentHasStarted);
      studentLessonsPerformanceContext.set(
        'userPerformanceData',
        userPerformanceData
      );
      studentsLessonsPerformanceData.pushObject(
        studentLessonsPerformanceContext
      );
    });
    component.set('studentReportData', studentsLessonsPerformanceData);
  }
});
