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

  timeData: [
    {
      scoreInPercentage: 33,
      attempts: 1,
      collectionType: 'assessment',
      collectionId: '1e3ca9a9-44e8-432b-9b97-39286881b82b',
      title: 'CFU - Compare decimals to the hundredths place',
      sessionId: '0218c8de-bf28-466f-baab-a03e0eaea067',
      pathId: null,
      pathType: null,
      lastAccessed: '2018-12-14 09:05:54.908',
      timeSpent: 17000,
      reaction: 0,
      status: 'complete',
      gradingStatus: 'complete'
    },
    {
      scoreInPercentage: 50,
      attempts: 1,
      collectionType: 'assessment',
      collectionId: '1e3ca9a9-44e8-432b-9b97-39286881b82b',
      title: 'CFU - Compare decimals to the hundredths place',
      sessionId: 'a87ad180-fa44-4f6b-8519-8d805af3f058',
      pathId: 856,
      pathType: 'teacher',
      lastAccessed: '2018-12-13 08:26:04.694',
      timeSpent: 273000,
      reaction: 0,
      status: 'complete',
      gradingStatus: 'complete'
    },
    {
      scoreInPercentage: null,
      views: 1,
      collectionType: 'collection',
      collectionId: '8758909a-728b-4a24-bbf9-0632b80d1631',
      title: 'Compare decimals to the hundredths place',
      sessionId: 'aaf63402-0c1c-4b6e-99f7-e7f28a6b8af3',
      pathId: 856,
      pathType: 'teacher',
      lastAccessed: '2018-12-13 05:58:38.284',
      timeSpent: 7000,
      reaction: 0,
      status: 'complete',
      gradingStatus: 'complete'
    },
    {
      scoreInPercentage: 50,
      attempts: 1,
      collectionType: 'assessment',
      collectionId: '1e3ca9a9-44e8-432b-9b97-39286881b82b',
      title: 'CFU - Compare decimals to the hundredths place',
      sessionId: '510eb5d2-00d4-4a2c-aebe-2c0387cad2c6',
      pathId: 856,
      pathType: 'system',
      lastAccessed: '2018-12-13 05:58:09.205',
      timeSpent: 49000,
      reaction: 0,
      status: 'complete',
      gradingStatus: 'complete'
    },
    {
      scoreInPercentage: 0,
      attempts: 1,
      collectionType: 'assessment',
      collectionId: '869e9713-14ab-44d5-91fa-be33387aab04',
      title: 'MaxAnswerOptionAmt',
      sessionId: '59057b98-13df-4805-b81d-27ce8a155333',
      pathId: null,
      pathType: null,
      lastAccessed: '2018-12-12 09:26:20.364',
      timeSpent: 6000,
      reaction: 0,
      status: 'complete',
      gradingStatus: 'complete'
    },
    {
      scoreInPercentage: null,
      views: 1,
      collectionType: 'collection',
      collectionId: 'e0a7de54-0ac3-4abb-a28f-3871db7fc61f',
      title: 'Read, Write and Compare Numbers',
      sessionId: 'f00cb817-d530-45b8-952c-e926ae556604',
      pathId: null,
      pathType: null,
      lastAccessed: '2018-12-11 14:40:29.53',
      timeSpent: 305000,
      reaction: 0,
      status: 'in-progress',
      gradingStatus: 'complete'
    },
    {
      scoreInPercentage: 0,
      attempts: 1,
      collectionType: 'assessment',
      collectionId: '1e3ca9a9-44e8-432b-9b97-39286881b82b',
      title: 'CFU - Compare decimals to the hundredths place',
      sessionId: 'a7fef167-d336-43d5-976e-7ae6c7fe47f1',
      pathId: 856,
      pathType: 'system',
      lastAccessed: '2018-12-11 13:05:03.516',
      timeSpent: 5000,
      reaction: 0,
      status: 'complete',
      gradingStatus: 'complete'
    },
    {
      scoreInPercentage: null,
      views: 1,
      collectionType: 'collection',
      collectionId: 'b74a78e6-59e6-4b3e-ad89-fd9e1c30a078',
      title: 'Compare decimals to the hundredths place',
      sessionId: 'a0e672c1-b42f-4715-8ad8-a341988d3849',
      pathId: 220,
      pathType: 'teacher',
      lastAccessed: '2018-12-11 13:04:25.796',
      timeSpent: 2000,
      reaction: 0,
      status: 'complete',
      gradingStatus: 'complete'
    },
    {
      scoreInPercentage: null,
      views: 1,
      collectionType: 'collection',
      collectionId: 'af975dcc-0b90-4b8f-8a19-da356fcd0939',
      title: 'Comparing Decimals',
      sessionId: '606920fe-8554-4278-ac77-fc27389eedd4',
      pathId: null,
      pathType: null,
      lastAccessed: '2018-12-11 08:30:27.356',
      timeSpent: 10000,
      reaction: 3,
      status: 'complete',
      gradingStatus: 'complete'
    },
    {
      scoreInPercentage: null,
      views: 1,
      collectionType: 'collection',
      collectionId: 'f11cfb97-182f-4147-b790-3e393d0646f2',
      title: 'Multiplication as Comparison(4.OA.1)',
      sessionId: '5a66fb3d-7792-44b5-8d4a-33e600fd1b03',
      pathId: null,
      pathType: null,
      lastAccessed: '2018-12-10 12:35:15.297',
      timeSpent: 0,
      reaction: 0,
      status: 'in-progress',
      gradingStatus: 'complete'
    },
    {
      scoreInPercentage: null,
      views: 1,
      collectionType: 'collection',
      collectionId: '96c342cf-6b4d-4964-a209-eef9669c53b5',
      title: 'Comparing Large Numbers',
      sessionId: '4651204c-efe4-4512-a019-bbf8736bb9a0',
      pathId: null,
      pathType: null,
      lastAccessed: '2018-12-07 11:58:35.937',
      timeSpent: 94000,
      reaction: 0,
      status: 'in-progress',
      gradingStatus: 'complete'
    },
    {
      scoreInPercentage: 0,
      attempts: 1,
      collectionType: 'assessment',
      collectionId: '87da6c06-4dac-4f19-b1e9-9b86a1f23606',
      title: 'CFU - Read/write larger numbers all ways',
      sessionId: '7dbe8f58-4fca-4568-8904-66add5d6cec6',
      pathId: null,
      pathType: null,
      lastAccessed: '2018-12-07 11:56:39.494',
      timeSpent: 73000,
      reaction: 0,
      status: 'complete',
      gradingStatus: 'complete'
    },
    {
      scoreInPercentage: null,
      views: 1,
      collectionType: 'collection',
      collectionId: 'ebdd1cd4-aa6f-4097-8b41-394d1b84b564',
      title: 'Read/write larger numbers all ways',
      sessionId: '47c4274a-59d8-4b48-96cc-25389e315afd',
      pathId: 852,
      pathType: 'system',
      lastAccessed: '2018-12-07 11:53:55.28',
      timeSpent: 46000,
      reaction: 1,
      status: 'complete',
      gradingStatus: 'complete'
    },
    {
      scoreInPercentage: 0,
      attempts: 1,
      collectionType: 'assessment',
      collectionId: '87da6c06-4dac-4f19-b1e9-9b86a1f23606',
      title: 'CFU - Read/write larger numbers all ways',
      sessionId: '56367e38-5f50-4896-bb3f-3df809efd44d',
      pathId: null,
      pathType: null,
      lastAccessed: '2018-12-07 10:42:31.772',
      timeSpent: 12094000,
      reaction: 1,
      status: 'complete',
      gradingStatus: 'complete'
    },
    {
      scoreInPercentage: null,
      views: 1,
      collectionType: 'collection',
      collectionId: 'e0a7de54-0ac3-4abb-a28f-3871db7fc61f',
      title: 'Read, Write and Compare Numbers',
      sessionId: 'f7e6679b-9ba7-4093-a0b2-f548346fd75f',
      pathId: null,
      pathType: null,
      lastAccessed: '2018-12-07 07:45:45.692',
      timeSpent: 70000,
      reaction: 5,
      status: 'complete',
      gradingStatus: 'complete'
    },
    {
      scoreInPercentage: null,
      views: 1,
      collectionType: 'collection',
      collectionId: 'e0a7de54-0ac3-4abb-a28f-3871db7fc61f',
      title: 'Read, Write and Compare Numbers',
      sessionId: 'cbd65389-8fce-4465-a5f0-63333af8f6e3',
      pathId: null,
      pathType: null,
      lastAccessed: '2018-12-07 07:33:25.331',
      timeSpent: 156000,
      reaction: 5,
      status: 'complete',
      gradingStatus: 'complete'
    },
    {
      scoreInPercentage: null,
      views: 1,
      collectionType: 'collection',
      collectionId: 'e0a7de54-0ac3-4abb-a28f-3871db7fc61f',
      title: 'Read, Write and Compare Numbers',
      sessionId: '92b7d10a-787a-4d5c-a6a1-ca90e75d3419',
      pathId: 851,
      pathType: null,
      lastAccessed: '2018-12-07 06:45:39.964',
      timeSpent: 38000,
      reaction: 0,
      status: 'complete',
      gradingStatus: 'complete'
    },
    {
      scoreInPercentage: null,
      views: 1,
      collectionType: 'collection',
      collectionId: '3a4bfda7-441e-4d8e-a810-43f6800f81ce',
      title: 'Multiply and divide to solve word problems',
      sessionId: 'b1cb2bbd-9a2c-47c5-9a4d-f3db4caefe37',
      pathId: 851,
      pathType: 'system',
      lastAccessed: '2018-12-07 06:44:09.155',
      timeSpent: 0,
      reaction: 0,
      status: 'in-progress',
      gradingStatus: 'complete'
    },
    {
      scoreInPercentage: 0,
      attempts: 1,
      collectionType: 'assessment',
      collectionId: 'bb589aab-9a97-43c8-ba50-bc06482d8f21',
      title: 'CFU: Multiplication Comparison Word Problems',
      sessionId: 'aa5bc68e-3454-4b37-8414-5d5c9afd6813',
      pathId: null,
      pathType: null,
      lastAccessed: '2018-12-07 06:43:43.746',
      timeSpent: 2000,
      reaction: 0,
      status: 'complete',
      gradingStatus: 'complete'
    },
    {
      scoreInPercentage: null,
      views: 1,
      collectionType: 'collection',
      collectionId: 'fab22538-8c14-4b19-9d58-2ad7363adea8',
      title: 'Multiplicative Comparison Word Problems',
      sessionId: 'f1fa58a4-0427-4bce-8422-e52133edf354',
      pathId: null,
      pathType: null,
      lastAccessed: '2018-12-07 06:43:08.621',
      timeSpent: 17000,
      reaction: 0,
      status: 'complete',
      gradingStatus: 'complete'
    }
  ],

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
    let activeIndex = component.get('activeIndex');
    const width = component.$('#student-actvities').width();
    const svg = d3
      .select('#student-actvities')
      .append('svg')
      .attr('class', 'activities');
    component.set('timeLineContainer', svg);
    let activeResourceGroup = svg.append('g');
    let centerX = width / 2;
    component.set('centerXPosition', centerX);
    activeResourceGroup
      .append('circle')
      .attr('cx', centerX)
      .attr('cy', '35')
      .attr('class', `active node-${activeIndex}`);
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
    component.drawPath();
    component.handleView();
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

  drawPath() {
    let resources = this.get('timeData');
    let activeIndex = this.get('activeIndex');
    resources.forEach((resource, index) => {
      let node = this.$(`.node-${index}`);
      let nodeX = parseInt(node.attr('cx'));
      let nodeY = parseInt(node.attr('cy'));
      if (index === activeIndex) {
        nodeX += 22; //Active index has higher circle radius
      }
      if (index < resources.length - 1) {
        let nextIndex = index + 1;
        let nextResource = resources[nextIndex];
        let nextNode = this.$(`.node-${nextIndex}`);
        let nextNodeY = parseInt(nextNode.attr('cy'));
        if (nextResource.pathId) {
          if (nodeY === nextNodeY) {
            this.drawHorizontalLine(
              {
                x: nodeX,
                y: nodeY
              },
              nextResource.pathId
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
              nextResource.pathId
            );
          }
        } else {
          if (nodeY === nextNodeY) {
            this.drawHorizontalLine(
              {
                x: nodeX,
                y: nodeY
              },
              nextResource.pathId
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
              nextResource.pathId
            );
          }
        }
      }
    });
  },

  drawHorizontalLine(startPoint, isSuggestion) {
    const svg = this.get('timeLineContainer');
    svg
      .append('path')
      .attr('class', () => {
        return isSuggestion ? 'suggestion-line' : 'line';
      })
      .attr('d', `M ${startPoint.x + 8} ${startPoint.y} l 14 0`);
  },

  drawCurve(startPoint, points, isSuggestion) {
    const svg = this.get('timeLineContainer');
    svg
      .append('path')
      .attr('class', () => {
        return isSuggestion ? 'suggestion-curve' : 'curve';
      })
      .attr(
        'd',
        `M ${startPoint.x + 10} ${points.y} q 5 ${points.curve} 10 ${points.x}`
      );
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
      .attr('class', d => {
        let index = resources.map(x => x).indexOf(d);
        let className = d.pathId ? 'suggestion-activity' : 'activity';
        return `${className} node-${index}`;
      })
      .attr('cx', (d, i) => {
        let xAxis = 50 + i * 30;
        return isRight ? centerX + xAxis : centerX - xAxis;
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
        return isRight ? centerX + (39.5 + xAxis) : centerX - (60.5 + xAxis);
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
      let index = resources.map(x => x).indexOf(d);
      component.set('activeIndex', index);
      component.set('activeResource', d);
    });
  },

  handleView() {
    let component = this;
    const svg = component.$('.activities')[0];
    const bbox = svg.getBBox();
    let width = bbox.width + 20;
    let height = bbox.height + 20;
    let xPosition = bbox.x - 10;
    let yPosition = bbox.y - 10;
    svg.setAttribute('viewBox', `${xPosition} ${yPosition} ${width} ${height}`);
    svg.setAttribute('width', `${width}px`);
    svg.setAttribute('height', `${height}px`);
    // svg.setAttribute('style', `margin-left : ${xPosition}px`);
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
