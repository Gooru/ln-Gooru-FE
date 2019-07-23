import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['self-grading', 'gru-self-grading-items'],

  offlineActivityService: Ember.inject.service(
    'api-sdk/offline-activity/offline-activity'
  ),

  session: Ember.inject.service('session'),

  didInsertElement() {
    const component = this;
    component.loadItemsToGrade();
  },

  actions: {
    onSelectGradeItem(gradeItem) {
      const component = this;
      component.set('selectedGradeItem', gradeItem);
      component.set('isShowOaSelfGrading', true);
    }
  },

  userId: Ember.computed.alias('session.userId'),

  isShowOaSelfGrading: false,

  selfGradeItems: Ember.A([]),

  itemsToGrade: Ember.A([]),

  loadItemsToGrade() {
    let component = this;
    const selfGradeItems = component.get('selfGradeItems');
    let itemsToGrade = Ember.A([]);
    selfGradeItems.map(function(item) {
      let gradeItem;
      gradeItem = component.createOaGradeItemObject(item);
      if (gradeItem) {
        itemsToGrade.push(gradeItem);
      }
    });
    Ember.RSVP.all(itemsToGrade).then(function(gradeItems) {
      component.set('itemsToGrade', gradeItems);
    });
  },

  /**
   * Creates the grade item information for activity level
   * @param {[]} grade item
   * @param {item} item
   */
  createOaGradeItemObject: function(item) {
    const component = this;
    const activityId = item.get('collectionId');
    const contentType = item.get('collectionType');
    const classId = component.get('classId');
    const itemObject = Ember.Object.create();
    return new Ember.RSVP.Promise(function(resolve, reject) {
      component
        .get('offlineActivityService')
        .readActivity(activityId)
        .then(function(oaContent) {
          itemObject.setProperties({
            classId,
            content: oaContent,
            contentType
          });
          resolve(itemObject);
        }, reject);
    });
  }
});
