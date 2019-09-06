/**
 * Learner proficiency matrix domain chart
 *
 * @module
 * @augments ember/Component
 */
import Ember from 'ember';
import d3 from 'd3';
import { SCREEN_SIZES } from 'gooru-web/config/config';

export default Ember.Component.extend({
  //------------------------------------------------------------------------
  //Dependencies

  i18n: Ember.inject.service(),

  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomy: Ember.inject.service('taxonomy'),

  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyService: Ember.inject.service('api-sdk/taxonomy'),

  /**
   * @property {NavigateMapService}
   */
  navigateMapService: Ember.inject.service('api-sdk/navigate-map'),

  session: Ember.inject.service('session'),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['learner-proficiency-domain-matrix'],

  // -------------------------------------------------------------------------
  // Events

  init() {
    let component = this;
    component._super(...arguments);
    component.set('isBaseLineDrawn', false);
    component.set('activeGradeList', Ember.A([]));
    component.set('domainBoundariesContainer', Ember.A([]));
  },

  didInsertElement() {
    let maxHeight = this.$('.scrollable-chart').height() - 50;
    this.set('maxHeight', maxHeight);
  },

  didRender() {
    let component = this;
    component.$('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
    component
      .$('[data-toggle="tooltip"]')
      .tooltip()
      .removeClass('show-tooltip')
      .addClass('show-tooltip');
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    onToggleToShowGUTC() {
      let component = this;
      component.toggleProperty('showGutCompetency');
    },
    // Action triggered when toggle chart view
    onToggleChart() {
      let component = this;
      component.toggleProperty('isExpandChartEnabled');
      let cellHeight = component.get('isExpandChartEnabled')
        ? component.get('expandedCellHeight')
        : component.get('compressedCellHeight');
      let maxNumberOfCellsInEachColumn = component.get(
        'maxNumberOfCellsInEachColumn'
      );
      component.set('height', maxNumberOfCellsInEachColumn * cellHeight);
      component.set('cellHeight', cellHeight);
      component.drawChart(component.get('chartData'));

      if (component.get('isSelectBaseLine')) {
        component.onToggleBaseline();
      }

      if (component.get('selectedDomain')) {
        component.send('domainFocusIn', component.get('selectedDomain'));
      }

      if (component.get('selectedCompetency')) {
        component.competencyFocusIn();
      }
    },

    onToggleBaseline() {
      let component = this;
      component.toggleProperty('isSelectBaseLine');
    },

    onSelectGrade(gradeData) {
      let component = this;
      component.selectGrade(gradeData);
    },

    // Action triggered when domain is selected
    onDomainSelect(domain) {
      let component = this;
      component.set('selectedDomain', domain);
      component.sendAction('onDomainSelect', domain);
    },

    // Action triggered when domain is clicked or hover in
    domainFocusIn(domain) {
      let component = this;
      component.$('#render-proficiency-matrix').addClass('highlight');
      component.$('.competency').removeClass('active active-cell');
      component.$(`.competency-${domain.domainSeq}`).addClass('active');
    },

    // Action triggered when domain is un-clicked or hover out
    domainFocusOut() {
      let component = this;
      let domain = component.get('selectedDomain');
      let competency = component.get('selectedCompetency');
      component.$('#render-proficiency-matrix').removeClass('highlight');
      component.$('.competency').removeClass('active');
      //Focus In when selected domain is already exists
      if (domain) {
        component.send('domainFocusIn', domain);
      }

      if (!domain && competency) {
        component.competencyFocusIn();
      }
    }
  },

  blockChartContainer(selectedCompetency) {
    let component = this;
    const cellWidth = component.get('cellWidth');
    const cellHeight = component.get('cellHeight');
    const width = component.get('width');
    let selectedElement = component.$(
      `.competency-${selectedCompetency.xAxisSeq}-${selectedCompetency.yAxisSeq}`
    );
    const x = selectedElement.attr('x');
    const y = selectedElement.attr('y');
    let xAxisSeq = x ? parseInt(x) + 1 : -500;
    let yAxisSeq = y ? parseInt(y) + 1 : 0;
    component
      .$('.selected-competency')
      .removeClass('hidden')
      .addClass('visible');
    component.set(
      'blockAttribute',
      Ember.Object.create({
        containerWidth: width,
        status: selectedCompetency.status,
        width: cellWidth,
        height: cellHeight,
        top: yAxisSeq,
        isMappedWithFramework: selectedCompetency.isMappedWithFramework,
        left: xAxisSeq
      })
    );
  },

  // Action triggered when competency is clicked or hover in
  competencyFocusIn() {
    let component = this;
    let selectedCompetency = component.get('selectedCompetency');
    if (!selectedCompetency.get('xAxisSeq')) {
      selectedCompetency = component
        .get('chartData')
        .findBy('competencyCode', selectedCompetency.get('competencyCode'));
    }
    component.blockChartContainer(selectedCompetency);
  },

  // Action triggered when competency is un-clicked or hover out
  competencyFocusOut() {
    let component = this;
    component
      .$('.selected-competency')
      .removeClass('visible')
      .addClass('hidden');
  },

  // -------------------------------------------------------------------------
  // Observers

  /**
   * subjectId  change will call the function
   */
  onChangeSubject: Ember.observer('subject', function() {
    let component = this;
    if (component.get('subject')) {
      component.set('chartData', {});
      component.set('activeGradeList', Ember.A([]));
      component.set('domainBoundariesContainer', Ember.A([]));
      component.competencyFocusOut();
    }
    return null;
  }),

  onDomainChange: Ember.observer('selectedDomain', function() {
    let component = this;
    let selectedDomain = component.get('selectedDomain');
    if (selectedDomain) {
      component.send('domainFocusIn', selectedDomain);
    } else {
      component.send('domainFocusOut');
    }
  }),

  onCompetencyChange: Ember.observer('selectedCompetency', function() {
    let component = this;
    let selectedCompetency = component.get('selectedCompetency');
    if (selectedCompetency) {
      component.competencyFocusIn();
    } else {
      component.competencyFocusOut();
    }
  }),

  comptencyMatrixObserver: Ember.observer(
    'competencyMatrixDomains',
    'competencyMatrixCoordinates',
    function() {
      let component = this;
      component.set('selectedDomain', null);
      component.set('selectedCompetency', null);
      component.loadChartData();
    }
  ),
  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Boolean} showGutCompetency
   */
  showGutCompetency: false,

  /**
   * @property {Array} domainBoundariesContainer
   */
  domainBoundariesContainer: Ember.A([]),

  /**
   * @property {Array} activeGradeList
   */
  activeGradeList: Ember.A([]),

  /**
   * @property {Number} width
   */
  width: 780,

  /**
   * @property {Number} height
   */
  height: 700,

  /**
   * User id of competency matrix to plot
   * @type {String}
   */
  userId: null,

  /**
   * @property {Number} compressedCellHeight
   */
  compressedCellHeight: 6,

  /**
   * @property {Number} expandedCellHeight
   */
  expandedCellHeight: 32,

  /**
   * Width of the cell
   * @type {Number}
   */
  cellWidth: 32,

  /**
   * height of the cell
   * @type {Number}
   */
  cellHeight: 6,

  /**
   * It will have selected taxonomy subject courses
   * @type {Object}
   */
  taxonomyDomains: Ember.A(),

  /**
   * @type {Object}
   * Property to store user selected subject
   */
  subject: null,

  /**
   * @type {Boolean}
   * Property to show/hide loading spinner
   */
  isLoading: false,

  /**
   * It  will have chart value width scroll width handling
   * @type {String}
   */
  isTaxonomyDomainsAvailable: Ember.computed('taxonomyDomains', function() {
    let component = this;
    let length = component.get('taxonomyDomains').length;
    return length > 0;
  }),

  /**
   * It maintains the number of cells in each column
   * @type {Number}
   */
  numberOfCellsInEachColumn: 0,

  /**
   * It decide  the max number of cells in each column
   * @type {Number}
   */
  maxNumberOfCellsInEachColumn: 20,

  /**
   * skyline container
   * @type {Object}
   */
  skylineContainer: null,

  /**
   * @type {Json}
   * Currently selected/active month and year
   */
  timeLine: {},

  /**
   * @type {Boolean}
   * Check is baseline already shown or not
   */
  isBaseLineDrawn: false,

  /**
   * @type {Array}
   * Baseline points
   */
  baselinePoints: Ember.A([]),

  /**
   * @property {Boolean} isExpandChartEnabled
   */
  isExpandChartEnabled: false,

  /**
   * @property {Array} taxonomyGrades
   */
  taxonomyGrades: Ember.A([]),

  /**
   * @property {String} subjectCode
   */
  subjectCode: Ember.computed('subject', function() {
    let component = this;
    let subject = component.get('subject');
    return subject ? subject.id : '';
  }),
  /**
   * Observer {Boolean} toggle baseline select
   */
  baseLineToggle: Ember.observer('isSelectBaseLine', function() {
    let component = this;
    component.onToggleBaseline();
  }),

  blockAttribute: null,

  /**
   * @property {Array} studentMasteredCompetencies
   * It has competencies info which is mastered by the student
   */
  studentMasteredCompetencies: Ember.computed(function() {
    const component = this;
    const navigateMapService = component.get('navigateMapService');
    let studentMasteredCompetencies = navigateMapService
      .getLocalStorage()
      .getItem(navigateMapService.getMasteredCompetenciesKey());
    return studentMasteredCompetencies
      ? JSON.parse(studentMasteredCompetencies)
      : Ember.A([]);
  }),

  /**
   * This property will decide to show expanded/compress button or not.
   * @property {Boolean}
   */
  showExpandedButton: false,

  /**
   * Maintains the maximum Width of the chart.
   */
  maxWidth: Ember.computed(function() {
    const screenWidth = screen.width;
    return screenWidth <= SCREEN_SIZES.SMALL ? screenWidth - 15 : 600;
  }),

  /**
   * Maintains the maximum Height of the chart.
   */
  maxHeight: 300,

  /**
   * @property {Number} thresholdDomainCount
   * Property to maintain threshold domain count
   * Currently it refers to math subject domain size
   */
  thresholdDomainCount: 14,

  // -------------------------------------------------------------------------
  // Methods
  /**
   * @function onToggleBaseline
   * Action triggered when toggle baseline visibility
   */
  onToggleBaseline() {
    let component = this;
    if (!component.get('isSelectBaseLine')) {
      component.$('#baseline-container').addClass('hidden-line');
    } else {
      component.$('#baseline-container').removeClass('hidden-line');
    }
  },

  /**
   * @function selectGrade
   * Action triggered when select a grade
   */
  selectGrade(gradeData) {
    let component = this;
    let activeGradeList = component.get('activeGradeList');
    let domainBoundariesContainer = component.get('domainBoundariesContainer');
    let selectedGradeSeq = gradeData.sequence;
    let selectedGradeLine = component.$(`.grade-${gradeData.sequence}-line`);
    if (activeGradeList[`${selectedGradeSeq}`]) {
      delete activeGradeList[`${selectedGradeSeq}`];
      selectedGradeLine.addClass('hidden-line');
    } else {
      activeGradeList.clear();
      activeGradeList[`${gradeData.sequence}`] = gradeData;
      if (!domainBoundariesContainer[`${selectedGradeSeq}`]) {
        component
          .fetchDomainGradeBoundary(gradeData)
          .then(function(domainBoundary) {
            domainBoundariesContainer[`${selectedGradeSeq}`] = domainBoundary;
            component.loadChartData();
          });
      } else {
        component.loadChartData();
      }
      selectedGradeLine.removeClass('hidden-line');
    }
    component.set('domainBoundariesContainer', domainBoundariesContainer);
    component.set('activeGradeList', activeGradeList);
  },

  /**
   * @function loadChartData
   * Method to collect chart data
   */
  loadChartData() {
    let component = this;
    let competencyMatrixDomains = component.get('competencyMatrixDomains');
    let competencyMatrixCoordinates = component.get(
      'competencyMatrixCoordinates'
    );
    if (competencyMatrixDomains && competencyMatrixCoordinates) {
      let chartData = component.parseChartData(
        competencyMatrixDomains,
        competencyMatrixCoordinates
      );
      component.drawChart(chartData);
      const cellHeight = component.get('cellHeight');
      const expandedCellHeight = component.get('expandedCellHeight');
      if (cellHeight <= expandedCellHeight) {
        component.set('showExpandedButton', true);
        component.set('isExpandChartEnabled', false);
      } else {
        component.set('showExpandedButton', false);
        component.set('isExpandChartEnabled', true);
      }
      component.set('chartData', chartData);
      if (component.get('isPlayerProficiency')) {
        component.highlightStudentMasteredCompetency(chartData);
      }
    }
    component.onToggleBaseline();
  },
  /**
   * @function fetchDomainGradeBoundary
   * Method to fetch domain grade boundary
   */
  fetchDomainGradeBoundary(gradeData) {
    let component = this;
    let taxonomyService = component.get('taxonomyService');
    let gradeId = gradeData ? gradeData.id : null;
    return Ember.RSVP.hash({
      domainBoundary: gradeId
        ? Ember.RSVP.resolve(
          taxonomyService.fetchDomainGradeBoundaryBySubjectId(gradeId)
        )
        : Ember.RSVP.resolve(null)
    }).then(({ domainBoundary }) => {
      return domainBoundary;
    });
  },

  /**
   * @function parseCompetencyData
   * Method to parse raw competency matrix and co-ordinate data to plot the chart
   */
  parseChartData(competencyMatrixs, competencyMatrixCoordinates) {
    let component = this;
    const cellHeight = component.get('cellHeight');
    let taxonomyDomain = Ember.A();
    let domains = competencyMatrixCoordinates.get('domains');
    let currentXaxis = 1;
    let resultSet = Ember.A();
    let numberOfCellsInEachColumn = Ember.A();
    if (component.get('isPlayerProficiency')) {
      component.populateStudentMasteredCompetency(competencyMatrixs);
    }
    domains.forEach(domainData => {
      let domainCode = domainData.get('domainCode');
      let domainName = domainData.get('domainName');
      let domainSeq = domainData.get('domainSeq');
      let competencyMatrix = competencyMatrixs.findBy('domainCode', domainCode);
      let competencyMatrixByCompetency = competencyMatrix
        ? competencyMatrix.get('competencies')
        : [];
      if (competencyMatrix && competencyMatrixByCompetency.length > 0) {
        taxonomyDomain.pushObject(domainData);
        let mergeDomainData = Ember.A();
        competencyMatrixByCompetency.forEach(competency => {
          let competencyCode = competency.get('competencyCode');
          let competencyName = competency.get('competencyName');
          let competencySeq = competency.get('competencySeq');
          let status = competency.get('status');
          let data = Ember.Object.create({
            domainName: domainName,
            domainCode: domainCode,
            domainSeq: domainSeq,
            competencyCode: competencyCode,
            competencyName: competencyName,
            competencySeq: competencySeq,
            fwDomainCode: competency.get('fwDomainCode'),
            fwDomainName: competency.get('fwDomainName'),
            framework: competency.get('framework'),
            isMappedWithFramework: competency.get('isMappedWithFramework'),
            competencyStudentDesc: competency.get('competencyStudentDesc'),
            status: status
          });
          if (status > 1) {
            mergeDomainData.forEach(data => {
              data.set('isMastery', true);
            });
            data.set('isMastery', true);
          }
          mergeDomainData.pushObject(data);
        });
        let masteredCompetencies = mergeDomainData.filterBy('isMastery', true);
        if (masteredCompetencies && masteredCompetencies.length === 0) {
          mergeDomainData.objectAt(0).set('skyline', true);
        } else {
          let numberOfMasteredCompetency = masteredCompetencies.length - 1;
          mergeDomainData
            .objectAt(numberOfMasteredCompetency)
            .set('skyline', true);
          mergeDomainData
            .objectAt(numberOfMasteredCompetency)
            .set('mastered', true);
        }

        let cellIndex = 1;
        numberOfCellsInEachColumn.push(mergeDomainData.length);
        mergeDomainData.forEach(data => {
          data.set('xAxisSeq', currentXaxis);
          data.set('yAxisSeq', cellIndex);
          resultSet.pushObject(data);
          cellIndex++;
        });
        currentXaxis = currentXaxis + 1;
        mergeDomainData = component.parseGradeLineBoundaries(
          mergeDomainData,
          domainCode
        );
      }
    });
    let height = cellHeight * Math.max(...numberOfCellsInEachColumn);
    component.set(
      'maxNumberOfCellsInEachColumn',
      Math.max(...numberOfCellsInEachColumn)
    );
    component.set('height', height);
    component.set('taxonomyDomains', taxonomyDomain);
    return resultSet;
  },

  /**
   * @function parseGradeLineBoundaries
   * Method will extract all the grade boundary competencies by domain wise
   */
  parseGradeLineBoundaries(domainCompetencyData, domainCode) {
    let component = this;
    let domainBoundariesContainer = component.get('domainBoundariesContainer');
    if (domainBoundariesContainer) {
      domainBoundariesContainer.forEach(function(domainsBoundary, gradeSeq) {
        let curDomainBoundaryData = domainsBoundary.findBy(
          'domainCode',
          domainCode
        );
        let firstCompetency = domainCompetencyData.objectAt(0);
        let curDomainHighLineCompetency = curDomainBoundaryData
          ? domainCompetencyData.findBy(
            'competencyCode',
            curDomainBoundaryData.highline
          ) || firstCompetency
          : firstCompetency;
        let className = curDomainHighLineCompetency.boundaryClass
          ? curDomainHighLineCompetency.boundaryClass
          : '';
        curDomainHighLineCompetency.boundaryClass = `${className} boundary-line-${gradeSeq}`;
      });
    }
    return domainCompetencyData;
  },

  /**
   * @function drawChart
   * Method to draw competency chart
   */
  drawChart(data) {
    let component = this;
    let cellSizeInRow = component.get('taxonomyDomains');
    let numberOfCellsInEachColumn = cellSizeInRow.length;
    let extendedChartHeight = 15;
    component.set('numberOfCellsInEachColumn', numberOfCellsInEachColumn);
    let cellWidth = component.get('cellWidth');
    let cellHeight = component.get('cellHeight');
    const maxWidth = component.get('maxWidth');
    const maxHeight = component.get('maxHeight');
    const maxCellsInDomain = component.get('maxNumberOfCellsInEachColumn');
    const thresholdDomainCount = component.get('thresholdDomainCount');
    let width = Math.round(numberOfCellsInEachColumn * cellWidth) + 5;
    if (numberOfCellsInEachColumn <= thresholdDomainCount || width < maxWidth) {
      cellWidth = Math.round(maxWidth / numberOfCellsInEachColumn);
      component.set('cellWidth', cellWidth);
      width = Math.round(numberOfCellsInEachColumn * cellWidth) + 5;
    }
    component.set('width', width);
    let height = component.get('height') + extendedChartHeight;
    if (height < maxHeight) {
      cellHeight = Math.round(maxHeight / maxCellsInDomain);
      component.set('cellHeight', cellHeight);
      height = Math.round(maxCellsInDomain * cellHeight) + 5;
    }

    component.$('#render-proficiency-matrix svg').remove();
    component.$('#render-proficiency-matrix').height(height);
    const svg = d3
      .select('#render-proficiency-matrix')
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    let cellContainer = svg.append('g').attr('id', 'cell-container');
    let skylineContainer = svg.append('g').attr('id', 'skyline-container');
    let domainBoundaryLineContainer = svg
      .append('g')
      .attr('id', 'domain-boundary-line-container');
    let baseLineContainer = svg
      .append('g')
      .attr('id', 'baseline-container')
      .attr('class', 'hidden-line');
    component.set('skylineContainer', skylineContainer);
    component.set('baseLineContainer', baseLineContainer);
    component.set('domainBoundaryLineContainer', domainBoundaryLineContainer);
    const cards = cellContainer.selectAll('.competency').data(data);
    cards
      .enter()
      .append('rect')
      .attr('x', d => (d.xAxisSeq - 1) * cellWidth)
      .attr('y', d => (d.yAxisSeq - 1) * cellHeight)
      .attr('copy-yaxis', d => (d.yAxisSeq - 1) * cellHeight)
      .attr('width', cellWidth)
      .attr('height', cellHeight)
      .attr('yaxis-seq', d => d.yAxisSeq)
      .attr('class', d => {
        let skylineClassName = d.skyline ? 'skyline-competency' : '';
        let masteredCompetencyClassName = d.mastered
          ? 'mastered-competncy'
          : '';
        let domainBoundaryCompetency = d.isDomainBoundaryCompetency
          ? 'domain-boundary'
          : '';
        let noFrameWorkClass = !d.isMappedWithFramework ? 'no-framework' : '';
        return `competency ${noFrameWorkClass} ${skylineClassName} competency-${
          d.xAxisSeq
        } competency-${d.xAxisSeq}-${
          d.yAxisSeq
        } fillArea${d.status.toString()} ${domainBoundaryCompetency} ${
          d.boundaryClass
        } ${masteredCompetencyClassName}`;
      })
      .on('click', function(d) {
        component.selectCompetency(d);
      });

    cards.exit().remove();
    component.$('.scrollable-chart').scrollTop(height);
    component.drawSkyline();
    component.drawBaseLine();
    component.drawDomainBoundaryLine();
    component.showGutCompetencyColorGradient();
  },

  selectCompetency(competency) {
    let component = this;
    component.set('selectedCompetency', competency);
    let competencyMatrixDomains = component.get('competencyMatrixDomains');
    let domainCode = competency.get('domainCode');
    let domainCompetencyList = competencyMatrixDomains.findBy(
      'domainCode',
      domainCode
    );
    component.sendAction(
      'onSelectCompetency',
      competency,
      domainCompetencyList
    );
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
      let isMasteredCompetency = component
        .$(skylineElements[index])
        .hasClass('mastered-competncy');
      y1 = y1 === 0 && !isMasteredCompetency ? y1 + 3 : y1 + cellHeight + 3;
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
    component.showDropShadow();
  },

  showGutCompetencyColorGradient() {
    const chartContainer = d3.select('#render-proficiency-matrix svg');
    var svgDefs = chartContainer.append('defs');
    var linearGradient = svgDefs
      .append('linearGradient')
      .attr('id', 'linearGradient')
      .attr('x2', '0%')
      .attr('y2', '100%');
    linearGradient
      .append('stop')
      .attr('class', 'stop-top')
      .attr('offset', '0');
    linearGradient
      .append('stop')
      .attr('class', 'stop-bottom')
      .attr('offset', '1');
  },

  /**
   * @function showDropShadow
   * Method to show a drop shadow in skyline
   */
  showDropShadow() {
    let component = this;
    const chartContainer = d3.select('#render-proficiency-matrix svg');
    let skylineContainer = component.get('skylineContainer');
    let filterContainer = chartContainer
      .append('defs')
      .append('filter')
      .attr('id', 'shadow');
    filterContainer
      .append('feDropShadow')
      .attr('dx', '0')
      .attr('dy', '0')
      .attr('stdDeviation', '4');
    skylineContainer
      .append('line')
      .attr('x1', 0)
      .attr('y1', 30)
      .attr('x2', 0)
      .attr('y2', 30)
      .attr('class', `sky-line-${-1} dummy-line`);
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
   * @function drawBaseLine
   * Method to draw base line over the competency
   */
  drawBaseLine() {
    let component = this;
    let subjectBucket = component.get('subjectBucket');
    let subjectId = component.get('subject.id');
    let isOwnSubject = subjectBucket.split(subjectId).length > 1;
    let cellWidth = component.get('cellWidth');
    let cellHeight = component.get('cellHeight');
    if (!component.get('isBaseLineDrawn') || isOwnSubject) {
      let userProficiencyBaseLine = component.get('userProficiencyBaseLine');
      let competencyMatrixCoordinates = component.get(
        'competencyMatrixCoordinates'
      );
      let baseLineDomains = userProficiencyBaseLine.domains;
      let domains = competencyMatrixCoordinates.domains;
      let cellIndex = 0;
      let baselinePoints = Ember.A([]);
      domains.map(domain => {
        let domainData = baseLineDomains.findBy(
          'domainCode',
          domain.domainCode
        );
        let domainCompetencies = domainData ? domainData.competencies : [];
        let domainWiseMasteredCompetencies = Ember.A([]);
        domainCompetencies.map(competency => {
          //Consider only the mastered competencies
          if (competency.status === 4 || competency.status === 5) {
            domainWiseMasteredCompetencies.push(competency);
          }
        });
        let numberOfMasteredCompetency = domainWiseMasteredCompetencies.length;
        let masteredCompetencyHighestSeq = numberOfMasteredCompetency
          ? domainWiseMasteredCompetencies[numberOfMasteredCompetency - 1]
            .competencySeq
          : 0;
        let x1 = cellIndex * cellWidth;
        let y1 = cellHeight * masteredCompetencyHighestSeq; //stroke width
        let isSkyLineContainer = component.$(
          `.sky-line-vertical-${cellIndex + 1}`
        );
        //check skyline is present in the cell and adjust y1 height
        y1 =
          y1 === parseInt(isSkyLineContainer.attr('y1')) - 6 ||
          y1 === parseInt(isSkyLineContainer.attr('y1')) ||
          y1 === 0
            ? y1 + 3
            : y1;

        let x2 = x1 + cellWidth;
        let y2 = y1;

        let linePoint = {
          x1: x1,
          x2: x2,
          y1: y1,
          y2: y2,
          isHorizontal: true
        };
        baselinePoints.push(linePoint);
        component.set('baselinePoints', baselinePoints);
        cellIndex++;
      });
      component.drawVerticalBaseLine();
      component.sendAction(
        'onShownBaseLine',
        userProficiencyBaseLine.lastUpdated
      );
      component.set('isBaseLineDrawn', true);
    }
    if (component.$('.baseline-toggle').hasClass('active-baseline')) {
      component.$('#baseline-container').removeClass('hidden-line');
    }
  },

  /**
   * @function drawVerticalBaseLine
   * Method to draw vertical base line points
   */
  drawVerticalBaseLine() {
    let component = this;
    let baselinePoints = component.get('baselinePoints');
    let index = 0;
    baselinePoints.map(baselinePoint => {
      component.joinBaseLinePoints(index, baselinePoint, baselinePoints);
      index++;
    });
    component.drawHorizontalBaseline();
  },

  /**
   * @function drawHorizontalBaseline
   * Method to draw horizontal line to connects vertical base line points
   */
  drawHorizontalBaseline() {
    let component = this;
    let baselinePoints = component.get('baselinePoints');
    let baseLineContainer = d3.select('#baseline-container');
    let index = 0;
    baselinePoints.map(baselinePoint => {
      if (index > 0) {
        let baseLineContainer = component.$(`.base-line-vertical-${index - 1}`);
        if (baseLineContainer.length > 0) {
          baselinePoint.x1 = baseLineContainer.attr('x2');
        }
      }

      //Increase x2 position when no vertical baseline
      let nextSkyLineContainer = component.$(`.sky-line-vertical-${index + 1}`);
      let nextBaseLineVerticalContainer = component.$(
        `.base-line-vertical-${index}`
      );
      if (
        !nextBaseLineVerticalContainer.length &&
        nextSkyLineContainer.length &&
        baselinePoint.y1 <= 6
      ) {
        baselinePoint.x2 = baselinePoint.x2 + 6;
      }

      let x2 = baselinePoint.x2;
      let x1 = baselinePoint.x1;
      let y1 = baselinePoint.y1;
      let y2 = baselinePoint.y2;
      baseLineContainer
        .append('line')
        .attr('x1', x1)
        .attr('y1', y1)
        .attr('x2', x2)
        .attr('y2', y2)
        .attr('class', `base-line-${index}`);
      index++;
    });
  },

  /**
   * @function joinBaseLinePoints
   * Method to draw vertical line to connects base line points, if necessary
   */
  joinBaseLinePoints(cellIndex, curLinePoint, baselinePoints) {
    let component = this;
    let nextBaseLineContainer = baselinePoints[cellIndex + 1];
    if (nextBaseLineContainer && nextBaseLineContainer.isHorizontal) {
      let baseLineContainer = component.get('baseLineContainer');
      if (nextBaseLineContainer.y2 !== curLinePoint.y1) {
        let linePoint = {
          x1: curLinePoint.x2,
          x2: curLinePoint.x2,
          y1: curLinePoint.y1,
          y2: nextBaseLineContainer.y2,
          isHorizontal: false
        };

        baseLineContainer
          .append('line')
          .attr('x1', linePoint.x1)
          .attr('y1', linePoint.y1)
          .attr('x2', linePoint.x2)
          .attr('y2', linePoint.y2) //Join baseline with the skyline border
          .attr('class', `base-line-vertical-${cellIndex}`);
      }
    }
  },

  /**
   * @function drawDomainBoundaryLine
   * Method to draw domain boundary line
   */
  drawDomainBoundaryLine() {
    let component = this;
    let activeGradeList = component.get('activeGradeList');
    let cellWidth = component.get('cellWidth');
    let cellHeight = component.get('cellHeight');
    let svg = component.get('domainBoundaryLineContainer');
    activeGradeList.forEach(function(gradeData, gradeSeq) {
      let isClassGrade = gradeData.get('id') === component.get('classGrade');
      let boundaryLineElements = component.$(`.boundary-line-${gradeSeq}`);
      boundaryLineElements.each(function(boundaryLineSeq) {
        let x1 = parseInt(
          component.$(boundaryLineElements[boundaryLineSeq]).attr('x')
        );
        let y1 = parseInt(
          component.$(boundaryLineElements[boundaryLineSeq]).attr('y')
        );
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
          .attr('class', function() {
            let className = isClassGrade
              ? 'class-boundary-line'
              : 'boundary-line';
            return `${className} horizontal-line boundary-line-${gradeSeq}-${boundaryLineSeq} grade-${gradeSeq}-line`;
          });

        component.joinDomainBoundaryLinePoints(
          linePoint,
          boundaryLineSeq - 1,
          gradeSeq,
          isClassGrade
        );
      });
    });

    component.set('isLoading', false);
  },

  /**
   * @function joinDomainBoundaryLinePoints
   * Method to draw vertical line to connects domain boundary line points, if necessary
   */
  joinDomainBoundaryLinePoints(
    curLinePoint,
    lastBoundaryLineSeq,
    gradeSeq,
    isClassGrade
  ) {
    let component = this;
    let lastBoundaryLineContainer = component.$(
      `.boundary-line-${gradeSeq}-${lastBoundaryLineSeq}`
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
          let className = isClassGrade
            ? 'class-boundary-line'
            : 'boundary-line';
          return `${className} vertical-line grade-${gradeSeq}-line`;
        });
    }
  },

  willDestroyElement() {
    let component = this;
    component.clearChart();
    component.set('isShowMatrixChart', false);
  },

  clearChart() {
    let component = this;
    component.$('svg').remove();
  },

  /**
   * @function populateStudentMasteredCompetency
   * Method to populate mastered competency through studyplayer
   */
  populateStudentMasteredCompetency(competencyMatrixs) {
    const component = this;
    let studentMasteredCompetencies = component.get(
      'studentMasteredCompetencies'
    );
    studentMasteredCompetencies.map(studentMasteredCompetency => {
      const domainCode = studentMasteredCompetency.domainCode;
      const competencyCode = studentMasteredCompetency.competencyCode;
      let domainCompetencies = competencyMatrixs.findBy(
        'domainCode',
        domainCode
      );
      let competencies = domainCompetencies.get('competencies');
      let masteredCompetency = competencies.findBy(
        'competencyCode',
        competencyCode
      );
      let masteredCompetencyPos = competencies.indexOf(masteredCompetency);
      let masteredCompetencies = competencies.slice(0, masteredCompetencyPos);
      masteredCompetencies.map(competency => {
        competency.set('study-infered', true);
        competency.set('status', 2);
      });
      masteredCompetency.set('status', 4);
      masteredCompetency.set('study-mastered', true);
    });
  },

  /**
   * @function highlightStudentMasteredCompetency
   * Method to highlight recently mastered competency
   */
  highlightStudentMasteredCompetency(chartData) {
    const component = this;
    let studentMasteredCompetencies = component.get(
      'studentMasteredCompetencies'
    );
    let masteredCompetency = studentMasteredCompetencies.findBy(
      'isHighLight',
      true
    );
    if (masteredCompetency) {
      let masteredCompetencyChartElement = chartData.findBy(
        'competencyCode',
        masteredCompetency.competencyCode
      );
      //Select competency which is recently mastered
      if (!component.isDestroyed) {
        component.set('selectedCompetency', masteredCompetencyChartElement);
        component.blockChartContainer(masteredCompetencyChartElement);
        component.selectCompetency(masteredCompetencyChartElement);
      }
    }
  }
});
