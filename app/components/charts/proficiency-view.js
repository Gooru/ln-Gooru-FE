import Ember from 'ember';
import d3 from 'd3';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['proficiency-view'],

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    let component = this;
    let domainDataSet = component.get('domainDataSet');
    component.drawProficiencyView(domainDataSet);
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Number} maxNumberOfCompetencies
   */
  maxNumberOfCompetencies: 0,

  /**
   * @property {Number} chartHeight
   */
  chartHeight: 150,

  /**
   * @property {Number} cellWidth
   */
  cellWidth: 15,

  /**
   * @property {Number} cellHeight
   */
  cellHeight: Ember.computed('maxNumberOfCompetencies', function() {
    let component = this;
    let maxNumberOfCompetencies = component.get('maxNumberOfCompetencies');
    let chartHeight = component.get('chartHeight');
    return chartHeight / maxNumberOfCompetencies;
  }),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function drawProficiencyView
   * Method to draw a small size proficiency chart
   */
  drawProficiencyView(domainDataSet) {
    let component = this;
    let studentSeq = component.get('studentSeq');
    let numberOfDomains = domainDataSet.length;
    let cellWidth = component.get('cellWidth');
    let chartWidth = numberOfDomains * cellWidth;
    let chartHeight = component.get('chartHeight');
    const proficiencyChartContainer = d3
      .select(`.chart.proficiency-view-${studentSeq}`)
      .append('svg')
      .attr('width', chartWidth)
      .attr('height', chartHeight);
    const domainChartContainer = proficiencyChartContainer
      .append('g')
      .attr('id', 'chart-container');
    domainDataSet.map(dataSet => {
      component.drawDomainVerticalChart(domainChartContainer, dataSet);
    });
    let skylineContainer = proficiencyChartContainer
      .append('g')
      .attr('id', 'skyline-container');
    component.set('skylineContainer', skylineContainer);
    component.drawSkyline();
  },

  /**
   * @function drawDomainVerticalChart
   * Method to draw domain vertical chart
   */
  drawDomainVerticalChart(domainChartContainer, dataSet) {
    let component = this;
    let domainSeq = dataSet.domainSeq;
    let cellWidth = component.get('cellWidth');
    let cellHeight = component.get('cellHeight');
    let competencySeq = -1;
    let xSeq = (domainSeq - 1) * cellWidth;
    const cells = domainChartContainer
      .selectAll('.competency')
      .data(dataSet.actualCompetencies);
    cells
      .enter()
      .append('rect')
      .attr('class', d => {
        let skylineClassName = d.isSkyLineCompetency
          ? 'skyline-competency'
          : '';
        return `${skylineClassName} domain-${domainSeq} competency-${
          d.competencySeq
        } fill-${d.competencyStatus}`;
      })
      .attr('id', 'competency-cell')
      .attr('width', cellWidth)
      .attr('height', cellHeight)
      .attr('x', xSeq)
      .attr('y', () => {
        competencySeq++;
        return competencySeq * cellHeight;
      });
    cells.exit().remove();
  },

  /**
   * @function drawSkyline
   * Method to draw skyline over the competency cell
   */
  drawSkyline() {
    let component = this;
    let skylineElements = component.$('.skyline-competency');
    let cellWidth = component.get('cellWidth');
    let cellHeight = component.get('cellHeight');
    component.$('line').remove();
    let svg = component.get('skylineContainer');
    let cellIndex = 0;
    skylineElements.each(function(index) {
      let x1 = parseInt(component.$(skylineElements[index]).attr('x'));
      let y1 = parseInt(component.$(skylineElements[index]).attr('y'));
      y1 = y1 === 0 ? y1 : y1 + cellHeight;
      let x2 = x1 + cellWidth;
      let y2 = y1;
      let linePoint = {
        x1,
        y1,
        x2,
        y2
      };
      svg
        .append('line')
        .attr('x1', linePoint.x1)
        .attr('y1', linePoint.y1)
        .attr('x2', linePoint.x2)
        .attr('y2', linePoint.y2)
        .attr('class', `sky-line-${cellIndex}`);
      component.joinSkyLinePoints(cellIndex, linePoint);
      cellIndex++;
    });
  },

  /**
   * @function joinSkyLinePoints
   * Method to draw vertical line to connects sky line points, if necessary
   */
  joinSkyLinePoints(cellIndex, curLinePoint) {
    let component = this;
    let lastSkyLineContainer = component.$(`.sky-line-${cellIndex - 1}`);
    let skyLineContainer = component.get('skylineContainer');
    let lastskyLinePoint = {
      x2: parseInt(lastSkyLineContainer.attr('x2')),
      y2: parseInt(lastSkyLineContainer.attr('y2'))
    };
    //Connect sky line points if last and current points are not same
    if (
      lastSkyLineContainer.length &&
      lastskyLinePoint.y2 !== curLinePoint.y1
    ) {
      //Increase extra height to connect intersection points
      if (lastskyLinePoint.y2 > curLinePoint.y1) {
        lastskyLinePoint.y2 = lastskyLinePoint.y2;
        curLinePoint.y1 = curLinePoint.y1;
      } else {
        lastskyLinePoint.y2 = lastskyLinePoint.y2;
        curLinePoint.y1 = curLinePoint.y1;
      }

      skyLineContainer
        .append('line')
        .attr('x1', lastskyLinePoint.x2)
        .attr('y1', lastskyLinePoint.y2)
        .attr('x2', curLinePoint.x1)
        .attr('y2', curLinePoint.y1)
        .attr('class', `sky-line-vertical-${cellIndex}`);
    }
  }
});
