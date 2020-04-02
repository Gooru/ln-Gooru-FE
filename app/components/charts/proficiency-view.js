import Ember from 'ember';
import d3 from 'd3';
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['proficiency-view'],

  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyService: Ember.inject.service('taxonomy'),

  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyProvider: Ember.inject.service('api-sdk/taxonomy'),

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    let component = this;
    let domainDataSet = component.get('domainDataSet');
    component.parseGradeLineBoundaries(domainDataSet);
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

    let domainBoundaryLineContainer = proficiencyChartContainer
      .append('g')
      .attr('id', 'domain-boundary-line-container');

    component.set('skylineContainer', skylineContainer);
    component.set('domainBoundaryLineContainer', domainBoundaryLineContainer);
    component.drawSkyline();
    component.drawDomainBoundaryLine();
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
        let highlineCompetencyClassName = d.highlineCompetency
          ? 'boundary-line'
          : '';
        return `${skylineClassName} domain-${domainSeq} competency-${d.competencySeq} fill-${d.competencyStatus} competency-cell ${highlineCompetencyClassName}`;
      })
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
    component.$('polyine').remove();
    let svg = component.get('skylineContainer');
    let skylinePoints = '';
    skylineElements.each(function(index) {
      let x1 = parseInt(component.$(skylineElements[index]).attr('x'));
      let y1 = parseInt(component.$(skylineElements[index]).attr('y'));
      y1 = y1 === 0 ? y1 : y1 + cellHeight;
      let x2 = x1 + cellWidth;
      let y2 = y1;
      skylinePoints += ` ${x1},${y1} ${x2},${y2}`;
    });
    svg.append('polyline').attr('points', skylinePoints);
  },

  /**
   * @function drawDomainBoundaryLine
   * Method to draw domain boundary line
   */
  drawDomainBoundaryLine() {
    let component = this;
    let cellWidth = component.get('cellWidth');
    let cellHeight = component.get('cellHeight');
    let svg = component.get('domainBoundaryLineContainer');
    let boundaryLineElements = component.$('.boundary-line');
    boundaryLineElements.each(function(boundaryLineSeq) {
      let x1 = parseInt(
        component.$(boundaryLineElements[boundaryLineSeq]).attr('x')
      );
      let y1 = parseInt(
        component.$(boundaryLineElements[boundaryLineSeq]).attr('y')
      );
      let isHighlineCompetency = component
        .$(boundaryLineElements[boundaryLineSeq])
        .hasClass('highline-competency');
      y1 = y1 === 0 && !isHighlineCompetency ? y1 + 3 : y1 + cellHeight + 3;
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
        .attr('class', function() {
          let className = 'boundary-line';
          return `${className} horizontal-line boundary-line-${boundaryLineSeq} grade-line`;
        });

      component.joinDomainBoundaryLinePoints(linePoint, boundaryLineSeq - 1);
    });
    component.set('isLoading', false);
  },

  /**
   * @function joinDomainBoundaryLinePoints
   * Method to draw vertical line to connects domain boundary line points, if necessary
   */
  joinDomainBoundaryLinePoints(curLinePoint, lastBoundaryLineSeq) {
    let component = this;
    let lastBoundaryLineContainer = component.$(
      `.boundary-line-${lastBoundaryLineSeq}`
    );
    let domainBoundaryLineContainer = component.get(
      'domainBoundaryLineContainer'
    );
    let lastBoundaryLinePoint = {
      x2: parseInt(lastBoundaryLineContainer.attr('x2')),
      y2: parseInt(lastBoundaryLineContainer.attr('y2'))
    };
    //Connect sky line points if last and current points are not same
    if (
      lastBoundaryLineContainer.length &&
      lastBoundaryLinePoint.y2 !== curLinePoint.y1
    ) {
      domainBoundaryLineContainer
        .append('line')
        .attr('x1', lastBoundaryLinePoint.x2)
        .attr('y1', lastBoundaryLinePoint.y2)
        .attr('x2', curLinePoint.x1)
        .attr('y2', curLinePoint.y1)
        .attr('class', () => {
          let className = 'boundary-line';
          return `${className} vertical-line grade-line`;
        });
    }
  },

  parseGradeLineBoundaries(domainCompetencyData) {
    const component = this;
    let domainBoundariesContainer = component.get('domainBoundariesContainer');
    if (domainBoundariesContainer) {
      domainCompetencyData.forEach(function(domainCompetency) {
        let competencies = domainCompetency.actualCompetencies;
        let domainGradeBoundary = domainBoundariesContainer.find(
          domain => domain.domainCode === domainCompetency.domainCode
        );
        let firstCompetency = competencies.objectAt(0);
        let curDomainHighLineCompetency = firstCompetency;
        let highlineCompetency = domainGradeBoundary
          ? competencies.find(
            competency =>
              competency.competencyCode === domainGradeBoundary.highline
          )
          : firstCompetency;
        if (highlineCompetency) {
          highlineCompetency.set('highlineCompetency', true);
          curDomainHighLineCompetency = highlineCompetency;
        }
        let className = curDomainHighLineCompetency.boundaryClass
          ? curDomainHighLineCompetency.boundaryClass
          : '';
        curDomainHighLineCompetency.boundaryClass = `${className} boundary-line`;
      });
    }
    return domainCompetencyData;
  }
});
