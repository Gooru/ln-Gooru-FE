import Ember from 'ember';
import d3 from 'd3';
import {
  getGradeColor
} from 'gooru-web/utils/utils';

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
  subjectCode: Ember.computed.alias('course.subject'),

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
      component.drawAtcChart(component.parseClassAtcPerformanceSummary(students, atcPerformance));
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
          fullName: `${student.lastName} ${student.firstName}`,
          percentScore: 0,
          completedCompetencies: 0
        });
        let studentPerformanceSummary = performanceSummary.findBy('userId', student.id);
        if (studentPerformanceSummary) {
          togalMasteredCompetencies += studentPerformanceSummary.completedCompetencies - studentPerformanceSummary.inprogressCompetencies;
          studentPerformanceData.set('totalCompetencies', studentPerformanceSummary.totalCompetencies);
          studentPerformanceData.set('completedCompetencies', studentPerformanceSummary.completedCompetencies);
          studentPerformanceData.set('inprogressCompetencies', studentPerformanceSummary.inprogressCompetencies);
          studentPerformanceData.set('percentCompletion', studentPerformanceSummary.percentCompletion);
          studentPerformanceData.set('percentScore', studentPerformanceSummary.percentScore);
          studentPerformanceData.set('gradeId', studentPerformanceSummary.gradeId);
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
    var margin = {top: 50, right: 20, bottom: 30, left: 50},
      width = 830 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom;

    var xScale = d3.scale.linear()
      .domain([0, d3.max(dataset, function(d){ return d.totalCompetencies; })])
      .range([0, width]);

    var yScale = d3.scale.linear()
      .domain([0, 100])
      .range([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom');


    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left')
      .innerTickSize(-width)
      .outerTickSize(0)
      .tickPadding(10);

    var svg = d3.select(component.element).append('svg')
      .attr('class', 'navigator-atc-chart')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${  margin.left  },${  margin.top  })`);

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${  height  })`)
      .call(xAxis);

    svg.append('g')
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

    var tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'navigator-atc-tooltip')
      .on('mouseover', function() {
        return tooltip.style('visibility', 'visible');
      })
      .on('mouseout', function() {
        return tooltip.style('visibility', 'hidden');
      });

    var studentNodes = svg
      .selectAll('.student-nodes')
      .data(dataset)
      .enter()
      .append('g')
      .attr('transform', function(d) {
        return `translate(${xScale(d.completedCompetencies) + 12}, ${yScale(
          d.percentScore
        ) - 20})`;
      })
      .attr('class', 'node-point')
      .on('mouseover', function(data) {
        tooltip.style('visibility', 'hidden');
        tooltip.style('background-color', getGradeColor(data.percentScore));
        tooltip
          .html(component.renderTooltip(data))
          .style('left', `${d3.event.clientX}px`)
          .style('top', `${d3.event.clientY}px`);
        return tooltip.style('visibility', 'visible');
      })
      .on('mouseout', function() {
        return tooltip.style('visibility', 'hidden');
      });

    studentNodes
      .append('circle')
      .attr('cx', 5)
      .attr('cy', 5)
      .attr('r', 16)
      .style('fill', function(d) {
        return getGradeColor(d.percentScore);
      });

    studentNodes
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
   * @function renderTooltip
   * Method to render tooltip
   */
  renderTooltip(data) {
    var tooltipHtml = '<div class="user-profile-tooltip">';
    tooltipHtml += `<div class="display-profile-url" style="background-image: url(${data.thumbnail})"></div>`;
    tooltipHtml += `<div class="label-text">Fullname:</div><div>${data.fullName}</div>`;
    tooltipHtml += `<div class="label-text">Grade:</div><div>${data.gradeId}</div>`;
    tooltipHtml += `<div class="label-text">Score:</div><div class="user-performance-score">${data.percentScore}</div>`;
    tooltipHtml += `<div class="label-text">Completed Competencies:</div><div class="user-proficiency-count">${data.completedCompetencies}</div>`;
    tooltipHtml += `<div class="label-text">Inprogress Competencies:</div><div class="user-proficiency-count">${data.inprogressCompetencies}</div>`;
    tooltipHtml += `<div class="label-text">Mastered Competencies:</div><div class="user-proficiency-count">${data.completedCompetencies - data.inprogressCompetencies}</div>`;
    tooltipHtml += `<div class="label-text">Total Competencies:</div><div class="user-proficiency-count">${data.totalCompetencies}</div>`;
    return tooltipHtml;
  }
});
