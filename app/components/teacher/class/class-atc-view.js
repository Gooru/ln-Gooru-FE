import Ember from 'ember';
import { getObjectsDeepCopy } from 'gooru-web/utils/utils';

export default Ember.Component.extend({
  classNames: ['class-atc-view'],

  classNameBindings: ['isMultiClassView:multi-class-view'],
  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * Analytics Service
   */
  analyticsService: Ember.inject.service('api-sdk/analytics'),

  /**
   * Class Service
   */
  classService: Ember.inject.service('api-sdk/class'),

  /**
   * Session Service
   */
  session: Ember.inject.service('session'),

  /**
   * Class Activities Service
   */
  classActivitiesService: Ember.inject.service('api-sdk/class-activity'),

  /**
   * Competency Service
   */
  competencyService: Ember.inject.service('api-sdk/competency'),

  /**
   * Struggling compentency service
   */
  strugglingCompetencyService: Ember.inject.service(
    'api-sdk/struggling-competency'
  ),

  /**
   * @type {CourseService} Service to retrieve course information
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyService: Ember.inject.service('api-sdk/taxonomy'),

  didInsertElement() {
    const component = this;
    if (component.get('isShowAtcView')) {
      if (component.get('class') && component.get('course')) {
        component.loadData();
      } else {
        component.loadClassData();
      }
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {UUID} courseId
   */
  courseId: Ember.computed.alias('course.id'),

  /**
   * @property {String} subjectCode
   */
  subjectCode: Ember.computed.alias('course.subject'),

  /**
   * @type {Boolean}
   * Property to check whether a class is premium
   */
  isPremiumClass: Ember.computed('class', function() {
    let component = this;
    const currentClass = component.get('class');
    let setting = currentClass.get('setting');
    return setting ? setting['course.premium'] : false;
  }),

  /**
   * @property {Boolean} isShowCompetencyCompletionReport
   */
  isShowCompetencyCompletionReport: false,

  /**
   * Maintains the value which of month activities displaying
   * @type {Integer}
   */
  activeMonth: Ember.computed(function() {
    return moment().format('MM');
  }),

  /**
   * @property {Boolean} isCurrentMonth
   */
  isCurrentMonth: Ember.computed('activeMonth', function() {
    const component = this;
    let activeMonth = component.get('activeMonth');
    let currentMonth = moment().format('MM');
    return activeMonth === currentMonth;
  }),

  /**
   * Maintains the value which of year activities displaying
   * @type {Integer}
   */
  activeYear: Ember.computed(function() {
    return moment().format('YYYY');
  }),

  /**
   * @property {String} userAgent
   */
  userAgent: 'desktop',

  /**
   * @property {Boolean} isExpandedView
   */
  isExpandedView: false,

  /**
   * @property {Boolean} isShowAtcView
   */
  isShowAtcView: Ember.computed('students', 'courseId', function() {
    const component = this;
    let isStudentsAvailable = component.get('students.length');
    let isCourseMapped = component.get('courseId');
    return isStudentsAvailable && isCourseMapped;
  }),

  /**
   * @property {Boolean} isShowActivitySearchContentPullup
   * Property to show/hide activity search content pullup
   */
  isShowActivitySearchContentPullup: false,

  /**
   * @property {String} defaultContentTypeToSuggest
   * Property to hold default content suggstion
   */
  defaultContentTypeToSuggest: 'collection',

  /**
   * @property {Array} selectedStudents
   * Property to hold list of students to suggest
   */
  selectedStudents: Ember.A([]),

  /**
   * @property {Json} classPreference
   */
  classPreference: Ember.computed.alias('class.preference'),

  /**
   * @property {Number} maxLimitToSuggestContent
   */
  maxLimitToSuggestContent: 6,

  /**
   * @property {Array} fwDomains
   */
  multiClassList: Ember.A([]),

  students: Ember.computed.alias('class.members'),

  /**
   * @property {Boolean} isShowStrugglingCompetencyReport
   * property hold the show / hide activity for grade competency
   */
  isShowStrugglingCompetencyReport: false,

  /**
   * @property {Boolean} isShowOtherGradeCompetency
   * property hold show/hide activity for other grade competency
   */
  isShowOtherGradeCompetency: false,

  /**
   * @property {Boolean} isShowGradeCompetency
   * property hold show/hide activity for struggling competency
   */
  isShowGradeCompetency: false,

  /**
   * @property {Array} gradeDomainsList
   * property hold struggling competency for current grade Domain
   */
  gradeDomainsList: [],

  /**
   * @property {Array} otherGradeCompetency
   * property hold struggling competency for other grade Domain
   */
  otherGradeCompetency: [],

  /**
   * @property {Array} otherGradeTopComp
   * property hold top competency for other grade domain
   */
  otherGradeTopComp: [],

  /**
   * @property {Number} gradeDomainIndex
   * property hold grade Domain index
   */
  gradeDomainIndex: null,

  /**
   * @property {Object} selectedCompetency
   * property hold selected competency
   */
  selectedCompetency: null,

  /**
   * @property {Array} collectionContents
   * property hold collection based on competency code
   */
  collectionContents: null,

  /**
   * @property {Boolean} isShowContentPreview
   * property help to show the preview collection from the competency pullup
   */
  isShowContentPreview: false,

  /**
   * @property {String} previewContentType
   * property hold the content type of the preview
   */
  previewContentType: null,

  /**
   * @property {Array} previewContent
   * property hold the content type of the preview
   */
  previewContent: null,

  /**
   * @property {Object} selectedContentForSchedule
   * property hold the selected sheduled content
   */
  selectedContentForSchedule: null,

  /**
   * @property {Array} memberGradeBounds
   */
  memberGradeBounds: Ember.computed.alias('class.memberGradeBounds'),

  /**
   * @property {Object} gradeRange
   */
  gradeRange: null,

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    //Action triggered when click a domain
    onSelectGrade(domainIndex) {
      const component = this;
      component.set('gradeDomainIndex', domainIndex);
      component.set('isShowGradeCompetency', true);
    },

    //Action triggered when click a grade
    onSelectOtherGrade(gradeIndex, domainIndex) {
      let component = this;
      this.set('gradeDomainIndex', {
        gradeIndex,
        domainIndex
      });
      component.set('isShowOtherGradeCompetency', true);
    },

    //Action triggered when click a competency
    onSelectCompetency(selectedCompetency) {
      let component = this;
      component.set('selectedCompetency', selectedCompetency);
      component.set('isShowStrugglingCompetencyReport', true);
    },

    //Action triggered when change month
    onChangeMonth() {
      const component = this;
      component.loadData();
      if (component.get('gradeRange')) {
        component.fetchStrugglingCompetency();
      }
    },

    //Action triggered when toggle domains to be reviewed list
    toggleView() {
      const component = this;
      component.set('isExpandedView', !component.get('isExpandedView'));
      let domainsCompletionReport = component.get('domainsCompletionReport');
      component.getDomainListToShow(domainsCompletionReport);
    },

    //Action triggered when click activities count box
    onRedirectToCA() {
      const component = this;
      const classId = component.get('classId');
      let month = component.get('activeMonth');
      let year = component.get('activeYear');
      let queryParams = {
        month,
        year
      };
      component
        .get('router')
        .transitionTo('teacher.class.class-activities', classId, {
          queryParams
        });
    },

    //Action triggered when click on competency suggestion
    onSuggestAtCompetency(
      competency,
      selectedContentType = null,
      selectedStudents = []
    ) {
      const component = this;
      let contextParams = {
        classId: component.get('classId'),
        class: component.get('class'),
        course: component.get('course'),
        courseId: component.get('courseId')
      };
      component.set('contextParams', contextParams);
      component.set('selectedCompetencyData', competency);
      component.set('isShowActivitySearchContentPullup', true);
      component.set(
        'selectedContentType',
        selectedContentType || component.get('defaultContentTypeToSuggest')
      );
      component.set('selectedStudents', selectedStudents);
    },

    //Action triggered at once an activity added into the DCA
    addedContentToDCA(activityData) {
      const component = this;
      let selectedStudents = component.get('selectedStudents');
      if (selectedStudents.length) {
        let studentIds = selectedStudents.map(student => {
          return student.get('id');
        });
        let activityId = activityData.get('id');
        component.assignStudentsToContent(studentIds, activityId);
      }
    },

    onToggleMultiClassSelector() {
      this.$(
        '.performance-overview-header .class-selector .multi-class-list'
      ).slideToggle();
    },

    onSelectSecondaryClass(secondaryClass) {
      this.sendAction('onSelectSecondaryClass', secondaryClass);
    },

    onRemoveClassView(secondaryClass) {
      this.sendAction('onRemoveClassView', secondaryClass);
    },

    // action trigger when close struggling competency pull up
    onClosePullUp(isCloseAll) {
      if (isCloseAll) {
        this.set('isShowOtherGradeCompetency', false);
        this.set('isShowGradeCompetency', false);
      }
      this.set('isShowContentPreview', false);
      this.set('isShowStrugglingCompetencyReport', false);
    },

    // action trigger when click backbutton in other grade pull up
    onCloseOtherGrade() {
      this.set('isShowOtherGradeCompetency', false);
    },

    // action trigger when click backbutton in pull up
    onCloseGradePullUp() {
      this.set('isShowGradeCompetency', false);
    },

    // Action trigger when click ah play button
    onPreviewContent(content) {
      let component = this;
      component.set(
        'previewContentType',
        content.get('format') || content.get('collectionType')
      );
      component.set('previewContent', content);
      component.set('isShowContentPreview', true);
    },

    // Action trigger when click add to class activity
    onAddCollectionToDCA(content) {
      let component = this;
      let classId = component.get('classId');
      let contentType = content.get('format');
      let contentId = content.get('id');
      let date = moment().format('YYYY-MM-DD');
      component
        .get('classActivitiesService')
        .addActivityToClass(classId, contentId, contentType, date)
        .then(() => {
          content.set('isAdded', true);
        });
    },

    /**
     * It will takes care of content will schedule for the specific date.
     * @param  {String} scheduleDate
     */
    onScheduleDate(scheduleDate, scheduleEndDate) {
      let component = this;
      let classId = component.get('classId');
      let contentType = component.get('selectedContentForSchedule.format');
      let contentId = component.get('selectedContentForSchedule.id');
      let datepickerEle = component.$('.ca-datepicker-schedule-container');
      datepickerEle.hide();
      let forMonth = moment(scheduleDate).format('MM');
      let forYear = moment(scheduleDate).format('YYYY');
      component
        .get('classActivitiesService')
        .addActivityToClass(
          classId,
          contentId,
          contentType,
          scheduleDate,
          forMonth,
          forYear,
          scheduleEndDate
        )
        .then(() => {
          component.set('selectedContentForSchedule.isScheduled', true);
        });
    },

    /**
     * It will takes care of content will schedule for the specific month.
     * @param  {Moment} Month
     * @param  {Moment} Year
     */
    onScheduleForMonth(forMonth, forYear) {
      let component = this;
      let classId = component.get('classId');
      let contentType = component.get('selectedContentForSchedule.format');
      let contentId = component.get('selectedContentForSchedule.id');
      let datepickerEle = component.$('.ca-datepicker-schedule-container');
      datepickerEle.hide();
      component
        .get('classActivitiesService')
        .addActivityToClass(
          classId,
          contentId,
          contentType,
          null,
          forMonth,
          forYear
        )
        .then(() => {
          component.set('selectedContentForSchedule.isScheduled', true);
        });
    },

    /**
     * Action get triggered when schedule content to CA got clicked
     */
    onScheduleContentToDCA(content) {
      let component = this;
      let datepickerEle = component.$('.ca-datepicker-schedule-container');
      datepickerEle.show();
      component.set('selectedContentForSchedule', content);
      component.set('endDate', null);
    },
    /**
     * Action triggered when the user click on close
     */
    onCloseDatePicker() {
      let datepickerEle = Ember.$('.ca-datepicker-schedule-container');
      datepickerEle.hide();
    }
  },

  // -------------------------------------------------------------------------
  // Functions

  loadClassData() {
    const component = this;
    const classId = component.get('classId');
    component.set('isLoading', true);
    Ember.RSVP.hash({
      classData: component.get('classService').readClassInfo(classId),
      classMembers: component.get('classService').readClassMembers(classId)
    }).then(({ classData, classMembers }) => {
      component.set('class', classData);
      component.set('class.members', classMembers.get('members'));
      component
        .get('courseService')
        .fetchById(classData.get('courseId'))
        .then(function(courseData) {
          component.set('class.course', courseData);
          component.set('course', courseData);
          component.loadData();
        });
    });
  },

  loadData() {
    const component = this;
    component.set('isLoading', true);
    component.fetchClassActivitiesCount();
    component
      .fetchDomainsCompletionReport()
      .then(function(domainsCompletionReport) {
        component.set('domainsCompletionReport', domainsCompletionReport);
        component.getDomainListToShow(domainsCompletionReport);
        component.set('isLoading', false);
        component.getStudentsGradeRange();
      });
  },

  /**
   * @function fetchClassActivitiesCount
   * Method to fetch activities count
   */
  fetchClassActivitiesCount() {
    const component = this;
    const classActivitiesService = component.get('classActivitiesService');
    const classId = component.get('classId');
    let month = component.get('activeMonth');
    let year = component.get('activeYear');
    return Ember.RSVP.hash({
      activitiesCount: Ember.RSVP.resolve(
        classActivitiesService.getMonthlyActivitiesCount(classId, month, year)
      )
    })
      .then(({ activitiesCount }) => {
        component.set('activitiesCount', activitiesCount);
        return activitiesCount;
      })
      .catch(function() {
        let activitiesCount = {
          scheduled: 0,
          unscheduled: 0
        };
        component.set('activitiesCount', activitiesCount);
      });
  },

  /**
   * @function fetchDomainsCompletionReport
   * Method to fetch domains completion report
   */
  fetchDomainsCompletionReport() {
    const component = this;
    const competencyService = component.get('competencyService');
    const classId = component.get('classId');
    let month = component.get('activeMonth');
    let year = component.get('activeYear');
    let agent = component.get('userAgent');
    let requestBody = {
      classId,
      month,
      year,
      agent
    };
    return Ember.RSVP.hash({
      domainsCompletionReport: Ember.RSVP.resolve(
        competencyService.getDomainsCompletionReport(requestBody)
      )
    }).then(({ domainsCompletionReport }) => {
      return domainsCompletionReport;
    });
  },

  /**
   * @function getDomainListToShow
   * Method to get domains list to show
   */
  getDomainListToShow(domainsCompletionReport) {
    const component = this;
    let domainsCompletionList = Ember.A([]);
    let notStartedCompletionList = Ember.A([]);
    if (domainsCompletionReport) {
      let domainsCompletionReportList = domainsCompletionReport.get(
        'domainsData'
      );
      let sortedReportList = domainsCompletionReportList.sortBy(
        'completionPercentage'
      );
      domainsCompletionList = sortedReportList.filter(function(domain) {
        return domain.completionPercentage;
      });
      notStartedCompletionList = sortedReportList.filter(function(domain) {
        return domain.completionPercentage === 0;
      });
    }
    component.set(
      'domainsCompletionList',
      domainsCompletionList.concat(notStartedCompletionList)
    );
    return domainsCompletionList;
  },

  /**
   * @function assignStudentsToContent
   * Method to assign list of students into an activity
   */
  assignStudentsToContent(studentIds, contentId) {
    const component = this;
    const classId = component.get('classId');
    component
      .get('classActivitiesService')
      .addUsersToActivity(classId, contentId, studentIds);
  },

  /**
   * @function fetchStrugglingCompetency
   * Method to fetach struggling competency
   */
  fetchStrugglingCompetency() {
    let component = this;
    let taxonomyService = component.get('taxonomyService');
    let subject = component.get('subjectCode');
    let fwk = component.get('class.preference.framework');
    let filters = {
      subject,
      fw_code: fwk
    };
    taxonomyService.fetchGradesBySubject(filters).then(grades => {
      let gradeRange = component.get('gradeRange');
      let startGrade = grades.findBy('id', gradeRange.minGrade);
      let startGradeIndex = grades.indexOf(startGrade);
      let endGrade = grades.findBy('id', gradeRange.maxGrade);
      let endGradeIndex = grades.indexOf(endGrade);
      let studentGrades = grades.slice(startGradeIndex, endGradeIndex + 1);
      let otherGradeList = [];
      if (studentGrades) {
        studentGrades.map(grade => {
          otherGradeList.push(grade.get('id'));
        });
      }
      let params = {
        grade: component.get('class.gradeCurrent'),
        classId: component.get('class.id'),
        month: component.get('activeMonth'),
        year: component.get('activeYear')
      };
      let otherGradeParams = {
        grade: otherGradeList.toString(),
        classId: component.get('class.id'),
        month: component.get('activeMonth'),
        year: component.get('activeYear')
      };
      otherGradeParams.grade = otherGradeList.toString();
      Ember.RSVP.hash({
        gradeLevelCompetency: component
          .get('strugglingCompetencyService')
          .fetchStrugglingCompetency(params),
        otherGradeLevelCompetency: component
          .get('strugglingCompetencyService')
          .fetchStrugglingCompetency(otherGradeParams)
      }).then(({ gradeLevelCompetency, otherGradeLevelCompetency }) => {
        if (gradeLevelCompetency && gradeLevelCompetency.length) {
          component.set(
            'gradeDomainsList',
            gradeLevelCompetency[0].get('domains')
          );
        }
        if (otherGradeLevelCompetency && otherGradeLevelCompetency.length) {
          let otherGradeTopComp = [];
          let cloneOtherGrade = getObjectsDeepCopy(otherGradeLevelCompetency);
          cloneOtherGrade
            .map(grade => grade.domains)
            .map((domains, gradeIndex) => {
              let competencyList = [];
              domains.forEach((domain, domainIndex) => {
                domain.competencies[0].domainIndex = domainIndex;
                domain.competencies[0].domainName = domain.domainName;
                competencyList.pushObject(domain.competencies[0]);
              });
              if (competencyList && competencyList.length) {
                let gradeLevelTopCompetency = competencyList.reduce(
                  (prevCompetency, currentCompetency) => {
                    return prevCompetency.studentsCount <
                      currentCompetency.studentsCount
                      ? currentCompetency
                      : prevCompetency;
                  }
                );
                if (gradeLevelTopCompetency) {
                  gradeLevelTopCompetency.gradeIndex = gradeIndex;
                  otherGradeTopComp.pushObject(gradeLevelTopCompetency);
                }
              }
            });
          component.set('otherGradeTopComp', otherGradeTopComp);
          component.set('otherGradeCompetency', otherGradeLevelCompetency);
        }
      });
    });
  },

  /**
   * @function getStudentsGradeRange
   *Method to get student grade range
   */
  getStudentsGradeRange() {
    let component = this;
    let memberGradeBounds = component.get('memberGradeBounds');
    let students = component.get('students');
    let availableGrade = [];
    if (students) {
      students.map(student => {
        let memberId = student.get('id');
        let grade = memberGradeBounds.findBy(memberId);
        if (grade) {
          let gradeBounds = grade.get(memberId);
          availableGrade.push(gradeBounds);
        }
      });
      let gradeAsc = availableGrade
        .sortBy('grade_lower_bound')
        .find(lowestGrade => lowestGrade.grade_lower_bound);
      let gradeDesc = availableGrade
        .sortBy('grade_upper_bound')
        .reverse()
        .find(highestGrade => highestGrade.grade_lower_bound);
      let minGrade =
        gradeAsc && gradeAsc.grade_lower_bound
          ? gradeAsc.grade_lower_bound
          : null;
      let maxGrade =
        gradeDesc && gradeDesc.grade_upper_bound
          ? gradeDesc.grade_upper_bound
          : null;
      if (minGrade && maxGrade) {
        component.set('gradeRange', {
          minGrade,
          maxGrade
        });
        component.fetchStrugglingCompetency();
      }
    }
  }
});
