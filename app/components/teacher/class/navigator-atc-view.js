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
      this.set('isShowResetButton', false);
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
   * @property {Boolean} isShowResetButton
   * Property to show/hide reset chart button
   */
  isShowResetButton: false,

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
      students.map(student => {
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
    const dataset = component.get('atcPerformanceSummary');
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
      .attr('class', 'chart-area')
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
    let tooltip = d3
      .select(component.element)
      .append('div')
      .attr('class', 'navigator-atc-tooltip');
    let tooltipContainer = component.$('.navigator-atc-tooltip');
    let activeStudentContainer = component.$('.active-student-container');

    let studentNode = studentNodes
      .selectAll('.student-nodes')
      .data(dataset)
      .enter()
      .append('g')
      .attr('transform', function(d) {
        return `translate(${xScale(d.completedCompetencies) +
          12}, ${yScale(d.percentScore) - 20})`;
      })
      .attr('class', 'node-point');

    tooltip.on('mouseout', function() {
      component.removeTooltip(tooltipInterval);
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
        tooltipInterval = component.studentProficiencyInfoTooltip(
          studentData,
          tooltipPos
        );
      });
      tooltip.on('mouseover', function() {
        component.set('isShowTooltip', true);
        tooltipContainer.addClass('active');
      });
      studentNode.on('mouseout', function() {
        component.set('isShowTooltip', false);
        tooltipContainer.removeClass('active');
        component.$('.node-point').removeClass('active-node');
        activeStudentContainer.addClass('hidden');
        Ember.run.cancel(tooltipInterval);
      });
    } else {
      studentNode.on('click', function(studentData) {
        component.set('isShowTooltip', true);
        tooltipInterval = component.studentProficiencyInfoTooltip(studentData);
        tooltipContainer.addClass('active');
        component.$(this).addClass('active-node');
        let selectedNodePos = component.$(this).position();
        component.highlightStudentProfile(selectedNodePos);
      });
    }

    studentNode
      .append('circle')
      .attr('cx', 5)
      .attr('cy', 5)
      .attr('r', 16)
      .style('fill', function(d) {
        return getGradeColor(d.percentScore);
      });

    studentNode
      .append('svg:image')
      .attr('class', 'student-profile')
      .attr('x', -7)
      .attr('y', -7)
      .attr({
        'xlink:href': function(d) {
          return d.thumbnail;
        },
        width: 24,
        height: 24
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
          let xPoint = xScale(d.completedCompetencies);
          let yPoint = yScale(d.percentScore);
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
      component.set('isShowResetButton', true);
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
  }
});
