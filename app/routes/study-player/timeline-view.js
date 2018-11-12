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
    let parentModel = Object.assign({}, this.modelFor('study-player'));
    if (parentModel.barchartdata) {
      route.set('barChartData', parentModel.barchartdata);
    }
    if (parentModel.performanceSummary) {
      route.set('performanceSummary', parentModel.performanceSummary);
    }

    //route.loadDataBySubject(parentModel); //Uncommmet and clear data for vertical view
    /*  let performanceSummaryPromise = route.getPremiumAtcPerformanceSummary(
        parentModel
      ), */
    let timeLineDataPromise = route.getTimeLineData(parentModel);

    return Ember.RSVP.hash({
      timeLineData: timeLineDataPromise
    }).then(function(hash) {
      const timeLineData = hash.timeLineData;
      //perfromanceData: performanceSummaryPromise,
      // const perfromanceData = hash.perfromanceData; //Uncommmet and clear data for vertical view
      // parentModel.perfromanceData = route.parseAndGetChartData(perfromanceData);
      // route.set('vbarData', parentModel.perfromanceData);
      // //route.paintGraph(parentModel.perfromanceData);
      parentModel.timeData = timeLineData;
      parentModel.filterOptions = timeLineData.filterOptions;
      return parentModel;
    });
  },

  paintGraph(graphdata) {
    var height = 500;
    var x = d3.scale
      .linear()
      .domain([d3.max(graphdata), 0])
      .range([height, 0]);

    var svgCanvas = d3
      .select('.vbar')
      .append('svg')
      .attr('background', 'red');

    svgCanvas
      .selectAll('text')
      .data(graphdata)
      .enter()
      .append('text')
      .attr('r', 24)
      .attr('width', 20)
      .attr('fill', '#5d93d9')
      .attr('y', x)
      .attr('x', 24)
      .text(x);

    svgCanvas
      .selectAll('rect')
      .data(graphdata)
      .enter()
      .append('rect')
      .attr('x', 24)
      .attr('width', 20)
      .attr('fill', '#5d93d9')
      .attr('height', x);
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
    //let subjectId = parentModel.course.subject;
    let subjectId = parentModel.course.subject;
    //subjectId = subjectId.substring(subjectId.indexOf('.') + 1);

    route.set('isLoading', true);
    return Ember.RSVP.hash({
      competencyMatrixs: route
        .get('competencyService')
        .getCompetencyMatrixDomain(userId, subjectId),
      competencyMatrixCoordinates: route
        .get('competencyService')
        .getCompetencyMatrixCoordinates(subjectId)
    }).then(({ competencyMatrixs, competencyMatrixCoordinates }) => {
      route.set('isLoading', false);
      let resultSet = route.parseCompetencyData(
        competencyMatrixs,
        competencyMatrixCoordinates
      );
      //parsing not working

      // let resultSet = {
      //   competencyMatrixs: competencyMatrixs,
      //   competencyMatrixCoordinates: competencyMatrixCoordinates
      // };
      console.log('resultSet', resultSet); //eslint-disable-line
      //route.drawChart(resultSet);
    });
  },

  parseCompetencyData(competencyMatrixs, competencyMatrixCoordinates) {
    let route = this;
    const cellHeight = route.get('cellHeight');
    let taxonomyDomain = Ember.A();
    let domains = competencyMatrixCoordinates.get('domains');
    let currentXaxis = 1;
    let resultSet = Ember.A();
    let numberOfCellsInEachColumn = Ember.A();
    domains.forEach(domainData => {
      let domainCode = domainData.get('domainCode');
      let domainName = domainData.get('domainName');
      let domainSeq = domainData.get('domainSeq');
      let competencyMatrix = competencyMatrixs.domains.findBy(
        'domainCode',
        domainCode
      );
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
            status: status
          });
          if (status === 2 || status === 3 || status === 4 || status === 5) {
            mergeDomainData.forEach(data => {
              data.set('status', status);
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
      }
    });
    let height = cellHeight * Math.max(...numberOfCellsInEachColumn);
    route.set('height', height);
    route.set('taxonomyDomains', taxonomyDomain);
    return resultSet;
  }
});
