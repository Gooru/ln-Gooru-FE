import Ember from 'ember';
import PrivateRouteMixin from 'gooru-web/mixins/private-route-mixin';
import d3 from 'd3';

export default Ember.Route.extend(PrivateRouteMixin, {
  queryParams: {
    classId: {
      as: 'class_id'
    }
  },

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @type {SessionService} Service to retrieve session information
   */
  session: Ember.inject.service('session'),

  chronoPerformanceService: Ember.inject.service('api-sdk/chrono-performance'),

  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service('api-sdk/class'),

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

  /**
   * Default page size
   */
  pageSize: 20,

  vbarDataChanged: Ember.observer('vbarData', function() {
    const route = this;
    var graphdata = route.get('vbarData');
    Ember.run.later(function() {
      route.paintGraph(graphdata);
    });
  }),

  beforeModel(transition) {
    if (!this.modelFor('study-player').barchartdata) {
      let studyPlayerController = this.controllerFor('study-player');
      studyPlayerController.set('study-player', transition);
      this.transitionTo('study-player');
    }
  },
  model: function(params) {
    this._super(...arguments);
    const route = this;
    const userId = this.get('session.userId');
    let parentModel = Object.assign({}, this.modelFor('study-player')),
      subjectId = parentModel.course.subject;

    if (parentModel.course.version !== 'premium') {
      subjectId = subjectId.substring(subjectId.indexOf('.') + 1);
    }
    if (parentModel.barchartdata) {
      route.set('barChartData', parentModel.barchartdata);
    }
    if (parentModel.performanceSummary) {
      route.set('performanceSummary', parentModel.performanceSummary);
    }

    const classId = params.classId;
    const classPromise = route.get('classService').readClassInfo(classId);

    let timeLineDataPromise = route.getTimeLineData(parentModel);

    return Ember.RSVP.hash({
      timeLineData: timeLineDataPromise,
      class: classPromise,
      competencyMatrixs: route
        .get('competencyService')
        .getCompetencyMatrixDomain(userId, subjectId)
    }).then(function(hash) {
      const timeLineData = hash.timeLineData;
      const competencyMatrix = hash.competencyMatrixs;
      timeLineData.get('activities').reverse();
      parentModel.timeData = timeLineData;
      parentModel.class = hash.class;
      parentModel.perfromanceData = route.getCompletion(competencyMatrix);
      route.set('vbarData', parentModel.perfromanceData);
      return parentModel;
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.set('timeData', model.timeData.activities);
    controller.set('startDate', model.timeData.activityStartDate);
    controller.set('class', model.class);
    controller.set('performanceSummary', model.performanceSummary);
    controller.set('course', model.course);
    controller.set('barchartdata', model.barchartdata);
  },

  actions: {
    //Consume these changes for route animation
    willTransition() {
      if (this.get('controller').get('isSysEvent') === 0) {
        return;
      }
      $('.timeLineViewContainer').animate(
        {
          '-webkit-transform': 'translate(500px,1000px)',
          top: '100vh',
          height: '0vh'
        },
        {
          duration: 400,
          complete: function() {
            $('.timeLineViewContainer').css({
              top: '100vh',
              height: '0vh'
            });
          }
        }
      );
    },
    didTransition() {
      //top to bottom - remove
      if (this.get('controller').get('isSysEvent') === 0) {
        return;
      }
      $('.timeLineViewContainer').css({
        top: '0vh'
      });
      Ember.run.later(function() {
        $('.timeLineViewContainer').animate(
          {
            '-webkit-transform': 'translate(500px,1000px)',
            /* top: '0vh', */
            height: '100vh'
          },
          {
            duration: 400
          }
        );
      });
    }
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
      {
        value: graphdataper.completed,
        colorcode: '#5d93d9'
      },
      {
        value: graphdataper.inprogress,
        colorcode: '#a8d4e4'
      },
      {
        value: graphdataper.notstarted,
        colorcode: '#cdd2d6'
      }
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

    svgCanvas
      .selectAll('rect')
      .data(graphdata)
      .enter()
      .append('rect')
      .attr('fill', d => d.colorcode)
      .attr('x', 27)
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('y', function(d) {
        let rt = yoffset;
        yoffset = yoffset + yScale(d.value);
        return rt;
      })
      .attr('width', 12)
      .attr('height', d => yScale(d.value));
  },

  getTimeLineData(parentModel) {
    var route = this;
    var { id, description, ...filterOption } = parentModel.context;
    filterOption.courseId = parentModel.course.id;
    filterOption.limit = route.pageSize;
    if (route.context && route.context.filterOptions) {
      filterOption = route.context.filterOptions;
    }
    return this.get(
      'chronoPerformanceService'
    ).getStudentPerformanceOfAllItemsInClass(filterOption);
  },

  getCompletion(competencyMatrixs) {
    var score = {
        total: 100,
        completed: 0,
        inprogress: 0,
        notstarted: 0
      },
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
