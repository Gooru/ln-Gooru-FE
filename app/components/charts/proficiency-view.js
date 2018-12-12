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
      .data(dataSet.competencies);
    cells
      .enter()
      .append('rect')
      .attr('class', d => {
        return `domain-${domainSeq} competency-${d.competencySeq} fill-${
          d.competencyStatus
        }`;
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
  }
});
