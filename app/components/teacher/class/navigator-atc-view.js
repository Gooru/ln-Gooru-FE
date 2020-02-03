import Ember from 'ember';
import d3 from 'd3';
import { getGradeColor, isCompatibleVW } from 'gooru-web/utils/utils';
import { SCREEN_SIZES } from 'gooru-web/config/config';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['navigator-atc-view'],

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * Analytics Service
   */
  analyticsService: Ember.inject.service('api-sdk/analytics'),

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    const component = this;
    component.loadClassAtcData();
  },

  didDestroyElement() {
    const component = this;
    component.set('atcPerformanceSummary', Ember.A([]));
  },

  // -------------------------------------------------------------------------
  // Observers
  observeMonthChange: Ember.observer('month', function() {
    const component = this;
    component.loadClassAtcData();
  }),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    //Action triggered when click on student perf in tooltip
    onShowStudentPerformance(student, type) {
      const component = this;
      const classId = component.get('classId');
      component.$('.navigator-atc-tooltip').removeClass('active');
      let queryParams = {
        studentId: student.get('id')
      };
      let redirectTo = 'student-learner-proficiency';
      if (type === 'report') {
        queryParams.tab = 'student-report';
        redirectTo = 'course-map';
      }
      component
        .get('router')
        .transitionTo(`teacher.class.${redirectTo}`, classId, {
          queryParams
        });
    },

    onResetZoom() {
      this.drawAtcChart();
      this.set('isZoomed', false);
    },

    onSelectStudent(studentData) {
      const component = this;
      component.set(
        'tooltipInterval',
        component.studentProficiencyInfoTooltip(
          studentData,
          this.$('.navigator-atc-student-list').position()
        )
      );
      if (component.get('isMobileView')) {
        const nodeElement = component.$(`.node-${studentData.get('seq')}`);
        component.set('isShowTooltip', true);
        component.$(nodeElement).addClass('active-node');
        let selectedNodePos = component.$(nodeElement).position();
        component.highlightStudentProfile(selectedNodePos);
      }
    },

    onCloseTooltip() {
      const component = this;
      component.removeTooltip();
      component.$('.navigator-atc-student-list').addClass('active');
    },

    onCloseListCard() {
      const component = this;
      component.removeStudentListCard();
      component.set('isShowListCard', false);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Object} course
   */
  course: Ember.computed.alias('classData.course'),

  /**
   * @property {UUID} classId
   */
  classId: Ember.computed.alias('classData.id'),

  /**
   * @property {UUID} courseId
   */
  courseId: Ember.computed.alias('course.id'),

  /**
   * @property {Array} students
   */
  students: Ember.computed.alias('classData.members'),

  /**
   * @property {String} subjectCode
   */
  subjectCode: Ember.computed.alias('classData.preference.subject'),

  /**
   * @property {Date} firstDayOfMonth
   */
  firstDayOfMonth: Ember.computed('month', 'year', function() {
    const component = this;
    let month = component.get('month');
    let year = component.get('year');
    let date = `${year}-${month}-01`;
    return moment(date).format('YYYY-MM-DD');
  }),

  /**
   * @property {Boolean} isMobileView
   */
  isMobileView: isCompatibleVW(SCREEN_SIZES.MEDIUM),

  /**
   * @property {Boolean} isShowTooltip
   */
  isShowTooltip: false,

  /**
   * @property {Array} atcPerformanceSummary
   * Property to for atc performance summary data set
   */
  atcPerformanceSummary: Ember.A([]),

  /**
   * @property {Boolean} isZoomed
   * Property to show/hide reset chart button
   */
  isZoomed: false,

  groupedStudentList: Ember.A([]),

  tooltipInterval: null,

  studentListTooltipInterval: null,

  /**
   * @property {Boolean} isShowListCard
   * Property to check whether the list card is visible or not (only for mobile devices)
   */
  isShowListCard: false,

  // -------------------------------------------------------------------------
  // Functions

  /**
   * @function loadClassAtcData
   * Method to load atc chart data
   */
  loadClassAtcData() {
    const component = this;
    component.fetchClassAtcPerforamnceSummary().then(function(atcPerformance) {
      let students = component.get('students');
      component.set(
        'atcPerformanceSummary',
        component.parseClassAtcPerformanceSummary(students, atcPerformance)
      );
      component.drawAtcChart();
    });
  },

  /**
   * @function parseClassAtcPerformanceSummary
   * Method to parse atch performance summary data
   */
  parseClassAtcPerformanceSummary(students, performanceSummary) {
    const component = this;
    let parsedPerformanceSummary = Ember.A([]);
    let togalMasteredCompetencies = 0;
    if (students && students.length) {
      students.forEach((student, index) => {
        let studentPerformanceData = Ember.Object.create({
          id: student.id,
          thumbnail: student.avatarUrl,
          firstName: student.firstName,
          lastName: student.lastName,
          fullName: `${student.lastName} ${student.firstName}`,
          percentScore: 0,
          completedCompetencies: 0
        });
        let studentPerformanceSummary = performanceSummary.findBy(
          'userId',
          student.id
        );
        if (studentPerformanceSummary) {
          togalMasteredCompetencies +=
            studentPerformanceSummary.completedCompetencies;
          let notStartedCompetencies =
            studentPerformanceSummary.totalCompetencies -
            (studentPerformanceSummary.completedCompetencies +
              studentPerformanceSummary.inprogressCompetencies);
          studentPerformanceData.set(
            'totalCompetencies',
            studentPerformanceSummary.totalCompetencies
          );
          studentPerformanceData.set(
            'completedCompetencies',
            studentPerformanceSummary.completedCompetencies
          );
          studentPerformanceData.set(
            'inprogressCompetencies',
            studentPerformanceSummary.inprogressCompetencies
          );
          studentPerformanceData.set(
            'notStartedCompetencies',
            notStartedCompetencies
          );
          studentPerformanceData.set(
            'percentCompletion',
            studentPerformanceSummary.percentCompletion
          );
          studentPerformanceData.set(
            'percentScore',
            studentPerformanceSummary.percentScore
          );
          studentPerformanceData.set(
            'gradeId',
            studentPerformanceSummary.gradeId || '--'
          );

          studentPerformanceData.set(
            'grade',
            studentPerformanceSummary.grade || '--'
          );
          studentPerformanceData.set('seq', index + 1);
          parsedPerformanceSummary.push(studentPerformanceData);
        }
      });
    }
    component.set('togalMasteredCompetencies', togalMasteredCompetencies);
    return parsedPerformanceSummary;
  },

  /**
   * @function fetchClassAtcPerforamnceSummary
   * Method to fetch class atc performance summary
   */
  fetchClassAtcPerforamnceSummary() {
    const component = this;
    const analyticsService = component.get('analyticsService');
    let classId = component.get('classId');
    let courseId = component.get('courseId');
    let subjectCode = component.get('subjectCode');
    let filters = {
      month: component.get('month'),
      year: component.get('year')
    };
    return Ember.RSVP.resolve(
      analyticsService.getAtcPerformanceSummaryPremiumClass(
        classId,
        courseId,
        subjectCode,
        filters
      )
    );
  },

  /**
   * @function drawAtcChart
   * Method to draw atc chart
   */
  drawAtcChart() {
    const component = this;
    let dataset = component.get('atcPerformanceSummary');
    component.$('svg').remove();
    var margin = {
        top: 50,
        right: 20,
        bottom: 30,
        left: 50
      },
      width = 830 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom;

    var xScale = d3.scale
      .linear()
      .domain([
        0,
        d3.max(dataset, function(d) {
          return d.totalCompetencies;
        })
      ])
      .range([0, width]);

    var yScale = d3.scale
      .linear()
      .domain([0, 100])
      .range([height, 0]);

    var xAxis = d3.svg
      .axis()
      .scale(xScale)
      .orient('bottom')
      .outerTickSize(0)
      .tickPadding(10);

    dataset.forEach(studentData => {
      studentData.set(
        'xAxis',
        xScale(studentData.completedCompetencies).toFixed(2)
      );
      studentData.set('yAxis', yScale(studentData.percentScore).toFixed(2));
    });

    dataset = component.groupItemsByPos(dataset);
    var yAxis = d3.svg
      .axis()
      .scale(yScale)
      .orient('left')
      .innerTickSize(-width)
      .outerTickSize(0)
      .tickPadding(10);

    var chartZoomConfig = d3.behavior
      .zoom()
      .scaleExtent([1, Infinity])
      .x(xScale)
      .y(yScale);

    let svgWidth = width + margin.left + margin.right;
    let svgHeight = height + margin.top + margin.bottom;

    var svg = d3
      .select(component.element)
      .append('svg')
      .attr('class', 'navigator-atc-chart')
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .call(chartZoomConfig)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const studentNodes = svg.append('g').attr('class', 'student-nodes');

    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    svg
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    svg
      .append('g')
      .attr('transform', 'translate(-460, 500) rotate(-90)')
      .append('text')
      .attr('class', 'placeholder')
      .attr('x', '130')
      .attr('y', '445')
      .text(
        component
          .get('i18n')
          .t('teacher-landing.class.class-management-tab.performance').string
      );

    svg
      .append('g')
      .attr('transform', 'translate(-50, -21)')
      .append('text')
      .attr('class', 'placeholder')
      .attr('x', '50')
      .attr('y', '415')
      .text(
        component.get('i18n').t('teacher-landing.class.atc-view.progress-label')
          .string
      );

    let tooltipInterval = null;
    let studentListTooltipInterval = null;
    let tooltip = d3
      .select(component.element)
      .append('div')
      .attr('class', 'navigator-atc-tooltip');
    let tooltipContainer = component.$('.navigator-atc-tooltip');
    let activeStudentContainer = component.$('.active-student-container');
    // Student list card tooltip config
    const studentListTooltip = d3
      .select(component.element)
      .append('div')
      .attr('class', 'navigator-atc-student-list');
    const studentListCardContainer = component.$('.navigator-atc-student-list');

    let studentNode = studentNodes
      .selectAll('.student-nodes')
      .data(dataset)
      .enter()
      .append('g')
      .attr('transform', function(d) {
        return `translate(${parseFloat(d.xAxis) +
          12}, ${parseFloat(d.yAxis) - 20})`;
      })
      .attr('class', function(d) {
        return `node-point node-${d.get('seq')}`;
      });

    tooltip.on('mouseout', function() {
      component.removeTooltip(tooltipInterval);
    });

    studentListTooltip.on('mouseout', () => {
      component.removeStudentListCard(studentListTooltipInterval);
    });

    tooltip.on('click', function() {
      component.removeTooltip(tooltipInterval);
    });

    if (!component.get('isMobileView')) {
      studentNode.on('mouseover', function(studentData) {
        let clientY = d3.event.clientY;
        let clientX = d3.event.clientX;
        let top = clientY > 420 ? clientY - 185 : clientY;
        let left = clientX > 600 ? clientX - 225 : clientX;
        top = d3.event.pageY;
        left = d3.event.pageX;
        let tooltipPos = {
          top: `${top}px`,
          left: `${left}px`
        };
        const groupedStudentList = dataset.filterBy(
          'group',
          studentData.get('group')
        );
        if (groupedStudentList.length > 1) {
          studentListTooltipInterval = component.setupStudentListTooltip(
            groupedStudentList,
            tooltipPos
          );
          component.set(
            'studentListTooltipInterval',
            studentListTooltipInterval
          );
        } else {
          tooltipInterval = component.studentProficiencyInfoTooltip(
            studentData,
            tooltipPos
          );
          component.set('tooltipInterval', tooltipInterval);
        }
      });

      tooltip.on('mouseover', function() {
        component.set('isShowTooltip', true);
        tooltipContainer.addClass('active');
      });

      studentListTooltip.on('mouseover', function() {
        studentListCardContainer.addClass('active');
      });

      studentNode.on('mouseout', function() {
        activeStudentContainer.addClass('hidden');
        studentListCardContainer.removeClass('active');
        component.removeTooltip(tooltipInterval);
      });
    } else {
      studentNode.on('click', function(studentData) {
        const groupedStudentList = dataset.filterBy(
          'group',
          studentData.get('group')
        );
        if (groupedStudentList.length > 1) {
          studentListTooltipInterval = component.setupStudentListTooltip(
            groupedStudentList
          );
          component.set(
            'studentListTooltipInterval',
            studentListTooltipInterval
          );
        } else {
          tooltipInterval = component.studentProficiencyInfoTooltip(
            studentData
          );
          component.set('isShowTooltip', true);
          component.set('isShowListCard', false);
          component.$(this).addClass('active-node');
          let selectedNodePos = component.$(this).position();
          component.highlightStudentProfile(selectedNodePos);
          component.set('tooltipInterval', tooltipInterval);
        }
      });
    }
    let profileOuterRadius = component.get('isMobileView') ? 35 : 16;
    studentNode
      .append('circle')
      .attr('cx', 5)
      .attr('cy', 5)
      .attr('r', profileOuterRadius)
      .style('fill', function(d) {
        return getGradeColor(d.percentScore);
      });

    let profileWidth = component.get('isMobileView') ? 60 : 24;
    let profileHeigth = component.get('isMobileView') ? 60 : 24;
    let profileX = component.get('isMobileView') ? -25 : -7;
    let profileY = component.get('isMobileView') ? -25 : -7;

    studentNode
      .append('svg:image')
      .attr('class', 'student-profile')
      .attr('x', profileX)
      .attr('y', profileY)
      .attr({
        'xlink:href': function(d) {
          return d.thumbnail;
        },
        width: profileWidth,
        height: profileHeigth
      });
    component.cleanUpChart();
    /**
     * @function zoomHandler
     * Method to handle zoom event and rerender chart points
     */
    function zoomHandler() {
      svg.select('.x.axis').call(xAxis);
      svg.select('.y.axis').call(yAxis);
      studentNode
        // Reposition node point based on current axis level
        .attr('transform', function(d) {
          let xPoint = xScale(d.completedCompetencies).toFixed(2);
          let yPoint = yScale(d.percentScore).toFixed(2);
          d.set('xAxis', xPoint);
          d.set('yAxis', yPoint);
          return `translate(${xPoint}, ${yPoint})`;
        })
        // Hide student node points after reach chart edge
        .attr('class', function(d) {
          let xPoint = xScale(d.completedCompetencies);
          let yPoint = yScale(d.percentScore);
          let className = 'node-point';
          if (
            xPoint < 15 ||
            yPoint <= 0 ||
            xPoint >= svgWidth - 100 ||
            yPoint >= svgHeight - 100
          ) {
            className += ' hidden';
          }
          return className;
        });
      component.cleanUpChart();
      component.set('isZoomed', true);
    }
    // Bind zoom handler with zoom event
    chartZoomConfig.on('zoom', zoomHandler);
  },

  /**
   * @function cleanUpChart
   * Method to clean up chart views as per requirement
   */
  cleanUpChart() {
    const axes = ['x', 'y'];
    axes.map(axis => {
      var axisContainer = d3.selectAll(this.$(`.${axis}.axis .tick`));
      axisContainer.attr('style', function() {
        var curAxisElement = d3.select(this);
        var curAxisText = curAxisElement.select('text');
        var curAxisTransform = d3.transform(curAxisElement.attr('transform'));
        var curAxisXpoint = curAxisTransform
          ? curAxisTransform.translate[0]
          : 0;
        var curAxisYpoint = curAxisTransform
          ? curAxisTransform.translate[1]
          : 0;
        var tickClass = 'tick';
        if (
          (axis === 'y' && curAxisYpoint > 260) ||
          (axis === 'x' && curAxisXpoint < 230)
        ) {
          tickClass += ' no-label';
        }
        curAxisElement.attr('class', tickClass);
        if (axis === 'y') {
          curAxisText.text(`${curAxisText.text()}%`);
        }
      });
    });
  },

  /**
   * @function studentProficiencyInfoTooltip
   * Method to show student info tooltip
   */
  studentProficiencyInfoTooltip(studentData, tooltipPos) {
    let component = this;
    component.set('studentData', studentData);
    let tooltip = component.$('.navigator-atc-tooltip');
    return Ember.run.later(function() {
      let tooltipHtml = component.$('.tooltip-html-container').html();
      tooltip.html(tooltipHtml);
      if (tooltipPos) {
        tooltip.css(tooltipPos);
      }
      component.$('.navigator-atc-tooltip').addClass('active');
    }, 500);
  },

  setupStudentListTooltip(studentList, tooltipPos) {
    const component = this;
    let tooltip = component.$('.navigator-atc-student-list');
    component.set('groupedStudentList', studentList);
    return Ember.run.later(function() {
      let cardContainer = component
        .$('.student-list-card-html-container')
        .html();
      tooltip.html(cardContainer);
      if (tooltipPos) {
        tooltip.css(tooltipPos);
      }
      component.$('.navigator-atc-student-list').addClass('active');
      component.set('isShowListCard', true);
    }, 500);
  },

  /**
   * @function highlightStudentProfile
   * Method to highlight selected student
   */
  highlightStudentProfile(position) {
    const component = this;
    return Ember.run.later(function() {
      let activeStudentContainer = component.$('.active-student-container');
      activeStudentContainer.css(position).removeClass('hidden');
    }, 500);
  },

  /**
   * @function removeTooltip
   * Method to remove tooltip from the atc chart
   */
  removeTooltip(tooltipInterval) {
    const component = this;
    component.set('isShowTooltip', false);
    component.$('.navigator-atc-tooltip').removeClass('active');
    component.$('.node-point').removeClass('active-node');
    Ember.run.cancel(tooltipInterval);
  },

  removeStudentListCard(tooltipInterval) {
    const component = this;
    component.$('.navigator-atc-student-list').removeClass('active');
    Ember.run.cancel(tooltipInterval);
    component.set('studentListTooltipInterval', null);
  },

  groupItemsByPos(dataset = Ember.A([])) {
    if (dataset.length) {
      const sortedByScoreDataset = dataset.sortBy('percentScore');
      for (let i = 0; i < sortedByScoreDataset.length; i++) {
        let sourceItem = sortedByScoreDataset[i];
        let sourceXaxis = parseFloat(sourceItem.get('xAxis'));
        let sourceYaxis = parseFloat(sourceItem.get('yAxis'));
        if (!sourceItem.get('group')) {
          for (let j = 0; j < sortedByScoreDataset.length; j++) {
            let compareItem = sortedByScoreDataset[j];
            let compareXAxis = parseFloat(compareItem.get('xAxis'));
            let compareYAxis = parseFloat(compareItem.get('yAxis'));
            let xDiff = Math.abs(sourceXaxis - compareXAxis);
            let yDiff = Math.abs(sourceYaxis - compareYAxis);
            let xDiffGroup = this.get('isMobileView') ? 30 : 20;
            let yDiffGroup = this.get('isMobileView') ? 16 : 8;
            if (xDiff <= xDiffGroup && yDiff <= yDiffGroup) {
              compareItem.set('group', i + 1);
            }
          }
        }
      }
      return sortedByScoreDataset;
    }
    return dataset;
  }
});
