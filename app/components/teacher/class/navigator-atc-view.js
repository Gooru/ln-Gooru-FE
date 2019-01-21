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

  drawAtcChart(dataset) {
    const component = this;

    var margin = {top: 20, right: 100, bottom: 30, left: 100},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var xScale = d3.scale.linear()
        .domain([0, d3.max(dataset, function(d){ return d.totalCompetencies; })])
        .range([0, width]);

    var yScale = d3.scale.linear()
        .domain([-10, 100])
        .range([height, -10]);

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");


    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .innerTickSize(-width)
        .outerTickSize(0)
        .tickPadding(10);

    var svg = d3.select(component.element).append("svg")
        .attr('class', 'navigator-atc-chart')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)

      svg.append("g")
          .attr("class", "y axis")
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
          return `translate(${xScale(d.completedCompetencies)}, ${yScale(
            d.percentScore
          )})`;
        })
        .attr('class', 'node-point');
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
  }
});
