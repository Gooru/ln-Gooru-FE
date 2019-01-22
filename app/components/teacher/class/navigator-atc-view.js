import Ember from 'ember';
import d3 from 'd3';
import {
  getGradeColor,
  getSubjectIdFromSubjectBucket
} from 'gooru-web/utils/utils';

export default Ember.Component.extend({

  classNames: ['navigator-atc-view'],

  didInsertElement() {
    const component = this;
    component.drawAtcChart(component.get('dataset'));
  },

  didRender() {
    const component = this;
    console.log('rendered');
    Ember.$('.user-proficiency-count').on('click', function() {
      console.log('proficienecy clicked');
    });

  },

  drawAtcChart(dataset) {
    const component = this;

    var margin = {top: 20, right: 100, bottom: 30, left: 100},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

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
      .attr('x', '50')
      .attr('y', '445')
      .text('Performance');

    svg
      .append('g')
      .attr('transform', 'translate(-50, 20)')
      .append('text')
      .attr('class', 'placeholder')
      .attr('x', '50')
      .attr('y', '445')
      .text('competencies');

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
      });


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
    let component = this;
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
