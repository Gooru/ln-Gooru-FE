import Ember from 'ember';
import PrivateRouteMixin from 'gooru-web/mixins/private-route-mixin';
import d3 from 'd3';

export default Ember.Route.extend(PrivateRouteMixin, {
  // -------------------------------------------------------------------------
  // Dependencies
  /**
  /**
   * @type {SessionService} Service to retrieve session information
   */
  session: Ember.inject.service('session'),

  chronoPerformanceService: Ember.inject.service('api-sdk/chrono-performance'),

  /**
   * competency service dependency injection
   * @type {Object}
   */
  competencyService: Ember.inject.service('api-sdk/competency'),

  /**
   * Analytics Service
   */
  analyticsService: Ember.inject.service('api-sdk/analytics'),

  barChartData: Ember.computed(function() {
    return this.modelFor('study-player').barChartData;
  }),

  vbarData: null,

  vbarDataChanged: Ember.observer('vbarData', function() {
    const route = this;
    var graphdata = route.get('vbarData');
    Ember.run.later(function() {
      route.paintGraph(graphdata);
    });
  }),

  /*
  //Consume these changes for route animation
  states: Ember.inject.service(),
  actions: {
    willTransition() {
      this.set('states.animate', true);
    }
  },
  afterModel() {
    this.set('states.animate', false);
  }, */
  beforeModel(transition) {
    if (!this.modelFor('study-player').barchartdata) {
      let studyPlayerController = this.controllerFor('study-player');
      studyPlayerController.set('study-player', transition);
      this.transitionTo('study-player');
    }
  },
  model: function() {
    this._super(...arguments);
    const route = this;
    const userId = this.get('session.userId');

    let parentModel = Object.assign({}, this.modelFor('study-player')),
      subjectId = parentModel.course.subject;
    subjectId = subjectId.substring(subjectId.indexOf('.') + 1);
    if (parentModel.barchartdata) {
      route.set('barChartData', parentModel.barchartdata);
    }
    if (parentModel.performanceSummary) {
      route.set('performanceSummary', parentModel.performanceSummary);
    }

    let timeLineDataPromise = route.getTimeLineData(parentModel);

    return Ember.RSVP.hash({
      timeLineData: timeLineDataPromise,
      competencyMatrixs: route
        .get('competencyService')
        .getCompetencyMatrixDomain(userId, subjectId)
    }).then(function(hash) {
      const timeLineData = hash.timeLineData,
        competencyMatrix = hash.competencyMatrixs;
      parentModel.perfromanceData = route.getCompletion(competencyMatrix);
      route.set('vbarData', parentModel.perfromanceData);
      parentModel.timeData = timeLineData;
      parentModel.filterOptions = timeLineData.filterOptions;
      return parentModel;
      //route.paintGraph(parentModel.perfromanceData);
    });
  },

  paintGraph(graphdatajsn) {
    var graphdata = [
      graphdatajsn.inprogress,
      graphdatajsn.notstarted,
      graphdatajsn.completed
    ];

    //Logic to convert to percent and show
    let total =
      graphdatajsn.inprogress +
      graphdatajsn.notstarted +
      graphdatajsn.completed;

    var graphdataper = graphdata;
    graphdataper.completed =
      graphdatajsn.completed === 0
        ? 0
        : Math.round((graphdatajsn.completed / total) * 100);
    graphdataper.inprogress =
      graphdatajsn.inprogress === 0
        ? 0
        : Math.round((graphdatajsn.inprogress / total) * 100);
    graphdataper.notstarted =
      graphdatajsn.notstarted === 0
        ? 0
        : Math.round((graphdatajsn.notstarted / total) * 100);

    graphdata = [
      { value: graphdataper.inprogress, colorcode: '#a8d4e4' },
      { value: graphdataper.notstarted, colorcode: '#cdd2d6' },
      { value: graphdataper.completed, colorcode: '#5d93d9' }
    ];

    //graphdata = [20, 10, 70];
    const height = 500,
      dmn = 100;

    var yoffset = 0;
    var yScale = d3.scale
      .linear()
      .domain([0, dmn])
      .range([0, height]);

    var svgCanvas = d3
      .select('.vbar')
      .html('')
      .append('svg')
      .attr('background', 'green');

    // svgCanvas
    //   .selectAll('circle')
    //   .data(graphdata)
    //   .enter()
    //   .append('circle')
    //   .attr('r', 24)
    //   .attr('width', 20)
    //   .attr('fill', '#5d93d9')
    //   .attr('cy', d=> yScale(d) )
    //   .attr('cx', 35);

    // svgCanvas
    //   .selectAll('text')
    //   .data(graphdata)
    //   .enter()
    //   .append('text')
    //   .attr('r', 24)
    //   .attr('width', 20)
    //   .attr('fill', '#5d93d9')
    //   .attr('y', d => yScale(d))
    //   .attr('x', 25)
    //   .text(d => d);

    svgCanvas
      .selectAll('rect')
      .data(graphdata)
      .enter()
      .append('rect')
      .attr('fill', d => d.colorcode)
      .attr('x', 24)
      .attr('y', function(d) {
        let rt = yoffset;
        yoffset = yoffset + yScale(d.value);
        return rt;
      })
      .attr('width', 20)
      .attr('height', d => yScale(d.value));
  },
  parseAndGetChartData(/* perfdata */) {
    return [20, 30, 50];
    /* return { total: 100, completed: 20, inprogress: 40, notstarted: 40 }; */
  },
  actions: {
    scrollRRight: function() {
      const route = this;
      route.currentModel.filterOptions.offset -= 2;
      route.refresh();
    },
    scrollLLeft: function() {
      const route = this;
      route.currentModel.filterOptions.offset += 2;
      this.refresh({ queryParams: { offsetlimit: 1 } });
    }
  },

  getTimeLineData(parentModel) {
    var route = this;
    var { id, description, ...filterOption } = parentModel.context;
    filterOption.courseId = parentModel.course.id;
    if (route.context && route.context.filterOptions) {
      filterOption = route.context.filterOptions;
    }

    return this.get(
      'chronoPerformanceService'
    ).getStudentPerformanceOfAllItemsInClass(filterOption);
  },
  setuproute(route, model) {
    this._super(...arguments);
    route.set('timeData', model.timeData);
  },

  /**
   * @function getPremiumAtcPerformanceSummary, uses ATC view discard this
   * Method to fetch premium class performance for the ATC view
   */
  getPremiumAtcPerformanceSummary(parentModel) {
    const route = this;
    const analyticsService = route.get('analyticsService');
    let classId = parentModel.context.classId;
    let courseId = parentModel.course.id;
    let subjectCode = parentModel.course.subject;
    subjectCode = subjectCode.substring(subjectCode.indexOf('.') + 1);
    return Ember.RSVP.resolve(
      analyticsService.getAtcPerformanceSummaryPremiumClass(
        classId,
        courseId,
        subjectCode
      )
    );
  },

  /**
   *
   * @param {} subjectId
   */
  loadDataBySubject(parentModel) {
    let route = this;
    const userId = this.get('session.userId');
    let subjectId = parentModel.course.subject;

    route.set('isLoading', true);
    return Ember.RSVP.hash({
      competencyMatrixs: route
        .get('competencyService')
        .getCompetencyMatrixDomain(userId, subjectId),
      competencyMatrixCoordinates: route
        .get('competencyService')
        .getCompetencyMatrixCoordinates(subjectId)
    }).then(({ competencyMatrixs }) => {
      route.set('isLoading', false);
      /*  let resultSet = route.parseCompetencyData(
        competencyMatrixs,
        competencyMatrixCoordinates
      ); */

      let resultSet = route.getCompletion(competencyMatrixs);

      console.log('resultSet', resultSet); //eslint-disable-line
      //route.drawChart(resultSet);
    });
  },

  getCompletion(competencyMatrixs) {
    /* competencyMatrixs..reduce(function( accumulator, currentValue, currentIndex, array ) { return accumulator + currentValue; }); */
    /*  var lt5 = competencyMatrixs.domains.reduce((returnlist, currentvalue) => { console.log('returnlist', returnlist); console.log('currentvalue', currentvalue); returnlist.competencies = Object.assign( returnlist.competencies, currentvalue.competencies ); return returnlist; }); */
    var score = { total: 100, completed: 0, inprogress: 0, notstarted: 0 },
      scoremap = {
        2: 'completed',
        3: 'completed',
        4: 'completed',
        1: 'inprogress',
        0: 'notstarted'
      };
    competencyMatrixs.domains.map(cm => {
      cm.competencies.map(citm => {
        score[scoremap[citm.status]] += 1;
      });
    });
    return score;
  }
});
