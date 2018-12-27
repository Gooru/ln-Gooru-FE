import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['chrono-timeline'],

  // -------------------------------------------------------------------------
  // Properties

  timeData: Ember.A([]),

  activities: Ember.computed(
    'timeData.[]',
    'timeData.@each.selected',
    function() {
      return this.parseTimelineData();
    }
  ),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    onSelectCard(activity) {
      let component = this;
      let timeData = component.get('timeData');
      let selectedTimeData = timeData.findBy('selected', true);
      selectedTimeData.set('selected', false);
      activity.set('selected', true);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  init() {
    let component = this;
    component._super(...arguments);
    let timeData = component.get('timeData');
    let numberOfTimeData = timeData.length;
    let lastIndex = numberOfTimeData - 1;
    let selectedTimeData = timeData.objectAt(lastIndex);
    selectedTimeData.set('selected', true);
  },

  // -------------------------------------------------------------------------
  // Methods

  parseTimelineData() {
    let component = this;
    let timeData = component.get('timeData');

    let numberOfTimeData = timeData.length;
    if (numberOfTimeData > 0) {
      let selectedTimeData = timeData.findBy('selected', true);
      let selectedIndex = timeData.indexOf(selectedTimeData);
      let leftPosSeq = 1;
      let leftStartIndex = selectedIndex - 4;
      let leftEndIndex = leftStartIndex + 4;

      component.updatePosition(
        timeData,
        leftStartIndex,
        leftEndIndex,
        'left',
        leftPosSeq
      );
      component.updatePosition(timeData, 0, leftStartIndex, 'left', 0);

      let rightPosSeq = 1;
      let rightStartIndex = selectedIndex + 1;
      let rightEndIndex = rightStartIndex + 4;
      component.updatePosition(
        timeData,
        rightStartIndex,
        rightEndIndex,
        'right',
        rightPosSeq
      );
      component.updatePosition(
        timeData,
        rightEndIndex,
        numberOfTimeData,
        'right',
        0
      );
    }
    let activities = Ember.A([]);
    timeData.forEach(data => {
      activities.pushObject(data);
    });
    return activities;
  },

  updatePosition(timeData, startIndex, endIndex, position, positionSeq) {
    for (let index = startIndex; index < endIndex; index++) {
      let data = timeData.objectAt(index);
      let seq = positionSeq === 0 ? positionSeq : positionSeq++;
      if (data) {
        data.set('position', position);
        data.set('positionSeq', seq);
      }
    }
  }
});
