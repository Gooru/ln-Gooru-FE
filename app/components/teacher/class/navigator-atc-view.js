import Ember from 'ember';
import d3 from 'd3';
import { getGradeColor, isCompatibleVW } from 'gooru-web/utils/utils';

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

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    const component = this;
    component.loadClassAtcData();
  },

  // -------------------------------------------------------------------------
  // Observers
  observeMonthChange: Ember.observer('month', function() {
    const component = this;
    component.loadClassAtcData();
  }),

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
      component.drawAtcChart(
        component.parseClassAtcPerformanceSummary(students, atcPerformance)
      );
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
  drawAtcChart(dataset) {
    const component = this;
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
      .orient('bottom');

    var yAxis = d3.svg
      .axis()
      .scale(yScale)
      .orient('left')
      .innerTickSize(-width)
      .outerTickSize(0)
      .tickPadding(10);

    var svg = d3
      .select(component.element)
      .append('svg')
      .attr('class', 'navigator-atc-chart')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

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
      .text('Performance');

    svg
      .append('g')
      .attr('transform', 'translate(-50, -30)')
      .append('text')
      .attr('class', 'placeholder')
      .attr('x', '50')
      .attr('y', '415')
      .text('competencies');

    let tooltipInterval = null;
    let tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'navigator-atc-tooltip');
    let tooltipContainer = Ember.$('.navigator-atc-tooltip');

    let studentNode = svg
      .selectAll('.student-nodes')
      .data(dataset)
      .enter()
      .append('g')
      .attr('transform', function(d) {
        return `translate(${xScale(d.completedCompetencies) +
          12}, ${yScale(d.percentScore) - 20})`;
      })
      .attr('class', 'node-point');

    studentNode.on('mouseout', function() {
      tooltipContainer.removeClass('active');
      Ember.run.cancel(tooltipInterval);
    });

    tooltip.on('mouseout', function() {
      tooltipContainer.removeClass('active');
      Ember.run.cancel(tooltipInterval);
    });

    if (!isCompatibleVW('medium')) {
      studentNode.on('mouseover', function(studentData) {
        let clientY = d3.event.clientY;
        let clientX = d3.event.clientX;
        let top = clientY > 420 ? clientY - 210 : clientY;
        let left = clientX > 600 ? clientX - 225 : clientX;
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
        tooltipContainer.addClass('active');
      });
    } else {
      studentNode.on('click', function(studentData) {
        tooltipInterval = component.studentProficiencyInfoTooltip(studentData);
        tooltipContainer.addClass('active');
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
  },

  /**
   * @function cleanUpChart
   * Method to clean up chart views as per requirement
   */
  cleanUpChart() {
    const axes = ['y'];
    axes.map(axis => {
      var axisContainer = d3.selectAll(`.${axis}.axis .tick`);
      axisContainer.attr('style', function() {
        var curAxisElement = d3.select(this);
        var curAxisText = curAxisElement.select('text');
        curAxisText.text(`${curAxisText.text()}%`);
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
    let tooltip = Ember.$('.navigator-atc-tooltip');
    return Ember.run.later(function() {
      if (tooltipPos) {
        tooltip.css(tooltipPos);
      }
      let tooltipHtml = component.$('.tooltip-html-container').html();
      tooltip.html(tooltipHtml);
      Ember.$('.navigator-atc-tooltip').addClass('active');
    }, 500);
  }
});
