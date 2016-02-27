import Ember from 'ember';

export default Ember.Object.extend({

  /**
   * Serializes a list of assessment results
   * @param payload
   * @returns {*[]}
   */
  serializeSessionAssessments: function (payload) {
    let content = payload.content;
    return content.map(function(session){
      return session;
    });
  },

  /**
   * Serializes a assessment result
   * @param payload
   * @returns {*[]}
   */
  serializeOpenAssessment: function (payload) {
    return payload.content && payload.content.length > 0 ? payload.content[0] : null;
  }

});
