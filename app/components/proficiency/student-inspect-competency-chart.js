import Ember from 'ember';
import d3 from 'd3';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['student-inspect-competency-chart'],

  // -------------------------------------------------------------------------
  // Dependencies

  session: Ember.inject.service('session'),

  /**
   * competency service dependency injection
   * @type {Object}
   */
  competencyService: Ember.inject.service('api-sdk/competency'),

  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyService: Ember.inject.service('api-sdk/taxonomy'),

  // -------------------------------------------------------------------------
  // Events

  didInsertElement() {
    let component = this;
    component.set('isLoading', true);
    component.fetchDomainLevelSummary();
  },

  didRender() {
    var component = this;
    component.$('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Action triggered when select a grade
     */
    onSelectGrade(gradeData) {
      let component = this;
      component.set('selectedGrade', gradeData);
      component.sendAction('onSelectGrade', gradeData);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {UUID} userId
   */
  userId: Ember.computed(function() {
    let component = this;
    return component.get('session.userId');
  }),

  /**
   * Different color range based on status
   * @type {Object}
   */
  colorsBasedOnStatus: Ember.Object.create({
    '0': '#e7e8e9',
    '1': '#1aa9eb',
    '2': '#006eb5',
    '3': '#006eb5',
    '4': '#006eb5',
    '5': '#006eb5'
  }),

  /**
   * @property {String} route0SuggestedCompetency
   */
  route0SuggestedCompetency: '#ef8f2f',

  /**
   * Width of the cell
   * @type {Number}
   */
  cellWidth: 30,

  /**
   * height of the cell
   * @type {Number}
   */
  cellHeight: 30,

  /**
   * It will have selected taxonomy subject courses
   * @type {Object}
   */
  taxonomyDomains: Ember.A(),

  /**
   * @property {Array} route0Contents
   */
  route0Contents: null,

  /**
   * @property {Array} domainLevelSummary
   */
  domainLevelSummary: null,

  /**
   * @property {Boolean} isRoute0Chart
   */
  isRoute0Chart: false,

  /**
   * @property {JSON} selectedGrade
   */
  selectedGrade: null,

  /**
   * @property {String} subjectCode
   */
  subjectCode: '',

  // -------------------------------------------------------------------------
  // Observers

  domainSummaryObserver: Ember.observer('domainLevelSummary', function() {
    let component = this;
    component.loadChartData();
  }),

  route0Observer: Ember.observer('route0Contents', function() {
    let component = this;
    component.loadChartData();
  }),

  gradeChangeObserver: Ember.observer('selectedGrade', function() {
    let component = this;
    component.getDomainGradeBoundry().then(() => {
      component.loadChartData();
    });
  }),


  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function loadDataBySubject
   * Method to fetch domain and co-ordinate data using subject id
   */
  loadChartData() {
    let component = this;
    let domainLevelSummary = component.get('domainLevelSummary');
    let route0Contents = component.get('route0Contents');
    let domainBoundaries = component.get('domainBoundaries');
    let route0Suggestions = route0Contents && route0Contents.status === 'pending' ? route0Contents.userCompetencyRoute.domains : null;
    if (component.get('isRoute0Chart')) {
      if (domainLevelSummary && route0Contents && domainBoundaries) {
        component.drawChart(component.parseChartData(domainLevelSummary, domainBoundaries, route0Suggestions));
      }
    } else {
      if (domainLevelSummary && domainBoundaries) {
        component.drawChart(component.parseChartData(domainLevelSummary, domainBoundaries, route0Suggestions));
      }
    }
  },

  /**
   * @function parseChartData
   */
  parseChartData(domainLevelSummary, domainBoundaries, route0Suggestions) {
    let component = this;
    let domainCompetencies = domainLevelSummary.domainCompetencies;
    let userCompetencies = domainLevelSummary.students.objectAt(0).userCompetencyMatrix;  //we always get one student data
    let chartData = Ember.A([]);
    let maxNumberOfCompetencies = 0;
    let taxonomyDomains = Ember.A([]);
    domainCompetencies.map( domain => {
      let competencies = domain.competencies;
      let domainCode = domain.domainCode;
      let domainName = domain.domainName;
      let domainSeq = domain.domainSeq;
      let userCompetencyMatrix = userCompetencies.findBy('domainCode', domainCode);
      let domainBoundary = domainBoundaries ? domainBoundaries.findBy('domainCode', domainCode) : null;
      let domainBoundaryCompetency = domainBoundary ? domainBoundary.highline : null;
      let userCompetenciesStatus = userCompetencyMatrix.competencies;
      let domainCompetenciesList = Ember.A([]);
      let route0SuggestedDomain = route0Suggestions ? route0Suggestions.findBy('domainCode', domainCode) : null;
      taxonomyDomains.push(domain);
      competencies.map( competency => {
        let competencyCode = competency.competencyCode;
        let competencySeq = competency.competencySeq;
        let competencyDesc = competency.competencyDesc;
        let competencyStudentDesc = competency.competencyStudentDesc;
        let competencyName = competency.competencyName;
        let competencyStatus = userCompetenciesStatus[`${competency.competencyCode}`];
        let isDoaminBoundaryCompetency = domainBoundaryCompetency === competency.competencyCode;
        let route0SuggestedCompetencies = route0SuggestedDomain ? route0SuggestedDomain.path : null;
        let route0suggestedCompetency = route0SuggestedCompetencies ? route0SuggestedCompetencies.findBy('competencyCode', competencyCode) : false;
        let isRoute0SuggestedCompetency = !!route0suggestedCompetency;
        let isMastery = parseInt(competencyStatus) > 1;
        let xAxisSeq = domainSeq;
        let yAxisSeq = competencySeq;

        let chartCellData = Ember.Object.create({
          competencyCode,
          competencySeq,
          competencyDesc,
          competencyStudentDesc,
          status: competencyStatus,
          competencyName,
          domainCode,
          domainSeq,
          domainName,
          isDoaminBoundaryCompetency,
          isMastery,
          xAxisSeq,
          yAxisSeq,
          isRoute0SuggestedCompetency
        });
        if (competencyStatus > 1) { //Mark as mastery to all competencies which status is more than 1
          domainCompetenciesList.forEach(data => {
            data.set('status', competencyStatus);
            data.set('isMastery', true);
          });
        }
        domainCompetenciesList.push(chartCellData);
      });

      let masteryCompetencies = domainCompetenciesList.filterBy('isMastery', true);
      if (masteryCompetencies && masteryCompetencies.length === 0) {
        domainCompetenciesList.objectAt(0).set('skyline', true);
      } else {
        let numberOfMasteryCompetency = masteryCompetencies.length - 1;
        domainCompetenciesList
          .objectAt(numberOfMasteryCompetency)
          .set('skyline', true);
        domainCompetenciesList
          .objectAt(numberOfMasteryCompetency)
          .set('mastered', true);
      }
      if (!domainBoundaryCompetency) {
        domainCompetenciesList.objectAt(0).set('isDoaminBoundaryCompetency', true);
      }
      maxNumberOfCompetencies = domainCompetenciesList.length > maxNumberOfCompetencies ? domainCompetenciesList.length : maxNumberOfCompetencies;
      chartData = chartData.concat(domainCompetenciesList);
    });
    component.set('chartHeight', maxNumberOfCompetencies * component.get('cellHeight'));
    component.set('taxonomyDomains', taxonomyDomains);
    component.set('chartData', chartData);
    return chartData;
  },

  /**
   * @function drawChart
   * Method to plot competency chart
   */
  drawChart(data) {
    let component = this;
    let numberOfColumns = component.get('taxonomyDomains.length');
    component.set('numberOfColumns', numberOfColumns);
    const colorsBasedOnStatus = component.get('colorsBasedOnStatus');
    const cellWidth = component.get('cellWidth');
    const cellHeight = component.get('cellHeight');
    const width = Math.round(numberOfColumns * cellWidth);
    component.set('width', width);
    const height = component.get('chartHeight');
    component.$('#student-inspect-competency-chart').empty();
    const svg = d3
      .select('#student-inspect-competency-chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    let cellContainer = svg.append('g').attr('id', 'cell-container');
    let skylineContainer = svg.append('g').attr('id', 'skyline-container');
    let domainBoundaryLineContainer = svg.append('g').attr('id', 'course-covered-line-container');
    component.set('skylineContainer', skylineContainer);
    component.set('domainBoundaryLineContainer', domainBoundaryLineContainer);
    const cards = cellContainer.selectAll('.competency').data(data);
    cards
      .enter()
      .append('rect')
      .attr('x', d => (d.xAxisSeq - 1) * cellWidth)
      .attr('y', d => (d.yAxisSeq - 1) * cellHeight)
      .attr('class', d => {
        let skylineClassName = d.skyline ? 'skyline-competency' : '';
        let domainBoundaryCompetency = d.isDoaminBoundaryCompetency ? 'domain-boundary' : '';
        return `competency competency-${d.xAxisSeq}-${d.yAxisSeq} ${skylineClassName} ${domainBoundaryCompetency}`;
      })

      .attr('width', cellWidth)
      .attr('height', cellHeight)
      .style('fill', '#EAEAEA')
      .transition()
      .duration(1000)
      .style('fill', d => {
        let colorCode = d.isRoute0SuggestedCompetency ? component.get('route0SuggestedCompetency') : colorsBasedOnStatus.get(d.status.toString());
        return colorCode;
      });
    cards.exit().remove();
    component.drawSkyline();
    component.drawDomainBoundaryLine();
  },

  /**
   * @function fetchDomainLevelSummary
   * Method to fetch domain level summary data
   */
  fetchDomainLevelSummary() {
    let component = this;
    let competencyService = component.get('competencyService');
    let classId = component.get('classId');
    let courseId = component.get('courseId');
    let studentId = component.get('userId');
    let filters = {
      classId,
      courseId,
      studentId
    };
    return Ember.RSVP.hash({
      domainLevelSummary: competencyService.getDomainLevelSummary(filters)
    })
      .then( ({domainLevelSummary}) => {
        component.set('domainLevelSummary', domainLevelSummary);
        return domainLevelSummary;
      });
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
      y1 = y1 === 0 ? y1 + 3 : y1 + cellHeight + 3;
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
        lastskyLinePoint.y2 = lastskyLinePoint.y2 + 3;
        curLinePoint.y1 = curLinePoint.y1 - 3;
      } else {
        lastskyLinePoint.y2 = lastskyLinePoint.y2 - 3;
        curLinePoint.y1 = curLinePoint.y1 + 3;
      }

      skyLineContainer
        .append('line')
        .attr('x1', lastskyLinePoint.x2)
        .attr('y1', lastskyLinePoint.y2)
        .attr('x2', curLinePoint.x1)
        .attr('y2', curLinePoint.y1)
        .attr('class', `sky-line-vertical-${cellIndex}`);
    }
  },

  /**
  * @function drawDomainBoundaryLine
  * Method to draw domain boundary line
  */
  drawDomainBoundaryLine() {
    let component = this;
    let skylineElements = component.$('.domain-boundary');
    let cellWidth = component.get('cellWidth');
    let cellHeight = component.get('cellHeight');
    let svg = component.get('domainBoundaryLineContainer');
    let cellIndex = 0;
    skylineElements.each(function(index) {
      let x1 = parseInt(component.$(skylineElements[index]).attr('x'));
      let y1 = parseInt(component.$(skylineElements[index]).attr('y'));
      y1 = y1 === 0 ? y1 + 1 : y1 + cellHeight + 1;
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
        .attr('class', `domain-boundary-line domain-boundary-line-${cellIndex}`);
      component.joinDomainBoundaryLinePoints(cellIndex, linePoint);
      cellIndex++;
    });
    component.$('.scrollable-chart').scrollTop(component.get('chartHeight'));
    component.set('isLoading', false);
  },

  /**
   * @function joinDomainBoundaryLinePoints
   * Method to draw vertical line to connects domain boundary line points, if necessary
   */
  joinDomainBoundaryLinePoints(cellIndex, curLinePoint) {
    let component = this;
    let lastSkyLineContainer = component.$(`.domain-boundary-line-${cellIndex - 1}`);
    let skyLineContainer = component.get('domainBoundaryLineContainer');
    let lastskyLinePoint = {
      x2: parseInt(lastSkyLineContainer.attr('x2')),
      y2: parseInt(lastSkyLineContainer.attr('y2'))
    };
    //Connect sky line points if last and current points are not same
    if (
      lastSkyLineContainer.length &&
      lastskyLinePoint.y2 !== curLinePoint.y1
    ) {

      skyLineContainer
        .append('line')
        .attr('x1', lastskyLinePoint.x2)
        .attr('y1', lastskyLinePoint.y2)
        .attr('x2', curLinePoint.x1)
        .attr('y2', curLinePoint.y1)
        .attr('class', `domain-boundary-line domain-boundary-line-${cellIndex}`);
    }
  },


  /**
   * @function getDomainGradeBoundry
   * Method to fetch domain grade boundary
   */
  getDomainGradeBoundry() {
    let component = this;
    let taxonomyService = component.get('taxonomyService');
    let destinationGrade = component.get('selectedGrade');
    let gradeId = destinationGrade.id;
    return Ember.RSVP.hash({
      domainBoundaries : Ember.RSVP.resolve(taxonomyService.fetchDomainGradeBoundaryBySubjectId(gradeId))
    })
      .then(({domainBoundaries}) => {
        component.set('domainBoundaries', domainBoundaries);
        return domainBoundaries;
      });
  }
});
