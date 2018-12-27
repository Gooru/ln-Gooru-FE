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

  draw: Ember.observer(
    'activities.[]',
    'activities.@each.selected',
    function() {
      this.drawTimeLinePath();
    }
  ),

  rightTimeLine: null,

  leftTimeLine: null,

  activities: null,

  selectedIndex: null,

  endDate: function() {
    let todaysDate = new Date();
    return this.uiDateFormat(todaysDate);
  }.property(),

  startDate: function() {
    return this.uiDateFormat(this.activities.startDate);
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

  didRender() {
    this.scrollToCenter();
  },

  drawTimeLinePath() {
    const component = this;
    component.clearChart();
    component.calculateLeftNodes();
    component.calculateRightNodes();
    component.drawActiveResource();
  },

  /**
   * Function to draw active resource
   */
  drawActiveResource() {
    const component = this;
    let selectedActivitiy = component
      .get('activities')
      .findBy('selected', true);
    let selectedIndex = component.get('activities').indexOf(selectedActivitiy);
    if (selectedIndex > -1) {
      component.set('selectedIndex', selectedIndex);
      const svg = d3
        .select('#active-resource')
        .append('svg')
        .attr('class', 'center-activities');
      let activeResourceGroup = svg.append('g');
      activeResourceGroup
        .append('circle')
        .attr('class', `active node-${selectedIndex}`);
      activeResourceGroup
        .append('foreignObject')
        .append('xhtml:div')
        .attr('class', () => {
          return selectedActivitiy.get('collectionType') === 'collection'
            ? 'active-collection'
            : 'active-assessment';
        });
    }
  },

  /**
   * Function to calculate left timeline
   */
  calculateLeftNodes() {
    let component = this;
    let resources = this.get('activities');
    let selectedIndex = this.get('selectedIndex');
    let leftTimeLine = resources.slice(0, selectedIndex);
    component.set('leftTimeLine', leftTimeLine);
    component.drawNodes(leftTimeLine, 'left');
    component.drawPath('left');
    component.handleView('left');
  },

  /**
   * Function to calculate right timeline
   */
  calculateRightNodes() {
    let component = this;
    let resources = this.get('activities');
    let selectedIndex = this.get('selectedIndex');
    let rightTimeLine = resources.slice(selectedIndex + 1, resources.length);
    component.set('rightTimeLine', rightTimeLine);
    component.drawNodes(rightTimeLine, 'right');
    component.handleView('right');
    component.drawPath('right');
  },

  /**
   * Function to draw nodes
   */
  drawPath(position) {
    let resources =
      position === 'right'
        ? this.get('rightTimeLine')
        : this.get('leftTimeLine');
    resources.forEach(resource => {
      let index = this.get('activities')
        .map(x => x)
        .indexOf(resource);
      let node = this.$(`.${position}-node-${index}`);
      let nodeX = parseInt(node.attr('cx'));
      let nodeY = parseInt(node.attr('cy'));
      if (index < this.get('activities').length - 1) {
        let nextIndex = index + 1;
        let nextResource = this.get('activities').get(nextIndex);
        let nextNode = this.$(`.${position}-node-${nextIndex}`);
        let nextNodeY = parseInt(nextNode.attr('cy'));
        if (nextResource && nextNode.length > 0) {
          if (nextResource.pathId) {
            if (nodeY === nextNodeY) {
              this.drawHorizontalLine(
                {
                  x: nodeX,
                  y: nodeY
                },
                nextResource.pathId,
                position
              );
            } else {
              this.drawCurve(
                {
                  x: nodeX,
                  y: nodeY
                },
                {
                  x: nextNodeY - nodeY,
                  y: nodeY,
                  curve: 0
                },
                nextResource.pathId,
                position
              );
            }
          } else {
            if (nodeY === nextNodeY) {
              this.drawHorizontalLine(
                {
                  x: nodeX,
                  y: nodeY
                },
                nextResource.pathId,
                position
              );
            } else {
              this.drawCurve(
                {
                  x: nodeX,
                  y: nodeY
                },
                {
                  x: nextNodeY - nodeY,
                  y: nodeY,
                  curve: 0
                },
                nextResource.pathId,
                position
              );
            }
          }
        }
      }
    });
  },

  /**
   * Function to draw horizontal line
   */
  drawHorizontalLine(startPoint, isSuggestion, position) {
    d3.select(`.${position}-activities`)
      .append('path')
      .attr('class', () => {
        return isSuggestion ? 'suggestion-line' : 'line';
      })
      .attr('d', `M ${startPoint.x + 8} ${startPoint.y} l 14 0`);
  },

  /**
   * Function to draw curve line
   */
  drawCurve(startPoint, points, isSuggestion, position) {
    d3.select(`.${position}-activities`)
      .append('path')
      .attr('class', () => {
        return isSuggestion ? 'suggestion-curve' : 'curve';
      })
      .attr(
        'd',
        `M ${startPoint.x + 10} ${points.y} q 5 ${points.curve} 10 ${points.x}`
      );
  },

  /**
   * Function to draw nodes
   */
  drawNodes(timeLine, position) {
    let component = this;
    let resources = this.get('activities');
    let isLeft = position === 'left';
    const svg = d3
      .select(`#${position}-activities`)
      .append('svg')
      .attr('class', `${position}-activities`);
    let node = svg
      .selectAll('.student-node')
      .data(timeLine)
      .enter();
    let group = node.append('g');
    group
      .append('circle')
      .attr('class', d => {
        let index = resources.map(x => x).indexOf(d);
        let className = d.pathId ? 'suggestion-activity' : 'activity';
        return `${className} ${position}-node-${index}`;
      })
      .attr('cx', (d, i) => {
        let xAxis = 10 + i * 30;
        return isLeft ? xAxis + 70 : xAxis;
      })
      .attr('cy', d => {
        let position;
        if (d.pathId) {
          position = d.pathType === 'teacher' ? 25 : 50;
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
        return isLeft ? xAxis + 70 : xAxis;
      })
      .attr('y', d => {
        let position;
        if (d.pathId) {
          position = d.pathType === 'teacher' ? 14 : 39;
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
      component.sendAction('onSelectCard', d);
    });
  },

  /**
   * Function to handle svg view
   */
  handleView(position) {
    let component = this;
    const svg = component.$(`.${position}-activities`)[0];
    const bbox = svg.getBBox();
    let width = bbox.width;
    let height = 5;
    let xPosition = bbox.x;
    let yPosition = 37;
    svg.setAttribute('viewBox', `${xPosition} ${yPosition} ${width} ${height}`);
    svg.setAttribute('width', `${width}px`);
    svg.setAttribute('height', `${yPosition}px`);
  },

  /**
   * Function to set scroll position
   */
  scrollToCenter() {
    let component = this;
    let activeOffset = component.$('#active-resource').offset().left;
    let activitiesOneHalfWidthContainer =
      component.$('.student-activities').width() / 2;
    let activeResourceWidth = component.$('#active-resource').width();
    component.$('.student-activities').animate(
      {
        scrollLeft:
          activeOffset - (activitiesOneHalfWidthContainer + activeResourceWidth)
      },
      'slow'
    );
  },

  willDestroyElement() {
    let component = this;
    component.clearChart();
  },

  /**
   * Function to clear svg
   */
  clearChart() {
    let component = this;
    component.$('svg').remove();
  }
});
