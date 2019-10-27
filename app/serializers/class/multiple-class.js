import Ember from 'ember';
import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  /**
   * Normalize an array of object mulitple class
   * @param payload the multiple class payload
   * @returns {Object[]}
   */
  normalizeMulitpleClass(payload) {
    let result = Ember.A([]);
    let secondaryClasses = payload ? payload.classes : Ember.A([]);
    if (payload.classes && secondaryClasses.length > 0) {
      secondaryClasses.forEach(secondaryClass => {
        result.push(
          Ember.Object.create({
            id: secondaryClass.id,
            title: secondaryClass.title,
            code: secondaryClass.code
          })
        );
      });
    }
    return result;
  }
});
