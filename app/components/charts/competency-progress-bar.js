import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['student-comptency-progress'],

  /**
   * @property {Object} competency
   */
  competency: null,

  didInsertElement() {
    this.parseCompetency();
  },

  didRender() {
    this._super(...arguments);
    let component = this;
    component.$('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
  },

  /**
   * @function parseCompetency
   * Method to calculate comptency status count and set height for div
   */
  parseCompetency() {
    let component = this;
    let competency = component.get('competency');
    let total =
      competency.inprogress + competency.notstarted + competency.completed;
    let completed =
      competency.completed === 0
        ? 0
        : Math.round((competency.completed / total) * 100);
    let inProgress =
      competency.inprogress === 0
        ? 0
        : Math.round((competency.inprogress / total) * 100);
    let notStarted =
      competency.notstarted === 0
        ? 0
        : Math.round((competency.notstarted / total) * 100);
    component.$('.completed').height(`${completed}%`);
    component.$('.in-progress').height(`${inProgress}%`);
    component.$('.not-started').height(`${notStarted}%`);
  }
});
