import Ember from 'ember';
import d3 from 'd3';
import { STUDY_PLAYER_BAR_COLOR } from 'gooru-web/config/config';
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['chrono-header'],

  /**
   * @property {String} color - Hex color value for the default bgd color of the bar chart
   */
  defaultBarColor: STUDY_PLAYER_BAR_COLOR,

  timeData: null,

  performanceSummary: null,

  activeResource: null,

  timeLineContainer: null,

  centerXPosition: null,

  observeActiveResource: Ember.observer('activeResource', function() {
    this.drawTimeLinePath();
  }),

  activeIndex: null,

  endDate: function() {
    let todaysDate = new Date();
    return this.uiDateFormat(todaysDate);
  }.property(),

  startDate: function() {
    return this.uiDateFormat(this.timeData.startDate);
  }.property(),

  uiDateFormat: function(givenDate) {
    givenDate = givenDate || new Date();
    if (typeof givenDate === 'string') {
      givenDate = new Date(givenDate);
    }
    let dateLocale = 'en-us',
      dateMonth = givenDate.toLocaleString(dateLocale, {
        month: 'short'
      }),
      dateYear = givenDate.toLocaleString(dateLocale, {
        year: '2-digit'
      }),
      dateDisplay = {
        mon: dateMonth,
        year: dateYear
      };
    return dateDisplay;
  },

  didInsertElement() {
    const component = this;
    component.drawTimeLinePath();
  },

  drawTimeLinePath() {
    const component = this;
    component.clearChart();
    let activeResource = component.get('activeResource');
    const width = component.$('#student-timeline')[0].clientWidth;
    const height = component.$('#student-timeline')[0].clientHeight;
    const svg = d3
      .select('#student-timeline')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'svg-path');
    component.set('timeLineContainer', svg);
    let activeResourceGroup = svg.append('g');
    let centerX = width / 2;
    component.set('centerXPosition', centerX);
    activeResourceGroup
      .append('circle')
      .attr('cx', centerX)
      .attr('cy', '35')
      .attr('r', 30)
      .style('fill', 'white')
      .attr('stroke', 'green');
    activeResourceGroup
      .append('foreignObject')
      .attr('x', centerX - 19)
      .attr('y', '21')
      .append('xhtml:div')
      .attr('class', () => {
        return activeResource.collectionType === 'collection'
          ? 'active-collection'
          : 'active-assessment';
      });

    component.calculateLeftNodes();
    component.calculateRightNodes();
    // component.drawPath();
    component.handleViewBox();
  },

  calculateLeftNodes() {
    let component = this;
    let resources = this.get('timeData');
    let activeIndex = this.get('activeIndex');
    let leftTimeLine = resources.slice(0, activeIndex);
    component.drawNodes(leftTimeLine.reverse(), false);
  },

  calculateRightNodes() {
    let component = this;
    let resources = this.get('timeData');
    let activeIndex = this.get('activeIndex');
    let rightTimeLine = resources.slice(activeIndex + 1, resources.length);
    component.drawNodes(rightTimeLine, true);
  },

  drawNodes(timeLine, isRight) {
    let component = this;
    let resources = this.get('timeData');
    const svg = component.get('timeLineContainer');
    const centerX = component.get('centerXPosition');
    let node = svg
      .selectAll('.student-node')
      .data(timeLine)
      .enter();
    let group = node.append('g');
    group
      .append('circle')
      .style('fill', d => {
        let color;
        if (d.pathId) {
          color = '#f29545';
        } else {
          color = '#0094de';
        }
        return color;
      })
      .attr('r', () => {
        return 10;
      })
      .attr('class', d => {
        return d.pathId ? 'suggestion' : '';
      })
      .attr('cx', (d, i) => {
        let xAxis = 50 + i * 30;
        return isRight ? centerX + xAxis : centerX - xAxis;
      })
      .attr('cy', d => {
        let position;
        if (d.pathId) {
          position = d.pathType === 'system' ? 45 : 25;
        } else {
          position = 35;
        }
        return position;
      });
    group
      .append('foreignObject')
      .attr('width', 22)
      .attr('height', 22)
      .attr('x', (d, i) => {
        let xAxis = i * 30;
        return isRight ? centerX + (39.5 + xAxis) : centerX - (60.5 + xAxis);
      })
      .attr('y', d => {
        let position;
        if (d.pathId) {
          position = d.pathType === 'system' ? 34 : 14;
        } else {
          position = 24;
        }
        return position;
      })
      .append('xhtml:div')
      .attr('class', d => {
        return d.collectionType === 'collection'
          ? 'collection-img'
          : 'assessment-img';
      });
    group.on('click', d => {
      let index = resources.map(x => x).indexOf(d);
      component.set('activeIndex', index);
      component.set('activeResource', d);
    });
  },

  handleViewBox() {
    var svg = document.getElementsByClassName('svg-path')[0];
    var bbox = svg.getBBox();
    svg.setAttribute(
      'viewBox',
      `${bbox.x - 10} ${bbox.y - 10} ${bbox.width + 20} ${bbox.height + 20}`
    );
    svg.setAttribute('width', `${bbox.width + 20}px`);
    svg.setAttribute('height', `${bbox.height + 20}px`);
  },

  willDestroyElement() {
    let component = this;
    component.clearChart();
  },

  clearChart() {
    let component = this;
    component.$('svg').remove();
  }
});
