import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['inspect-competency', 'student-domain-performance'],

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Actions
  actions : {
    // Action triggered when click left/right arrow
    onClickArrow(direction) {
      let component = this;
      let scrollableContainer = component.$('.scrollable-container');
      let curPos = scrollableContainer.scrollLeft();
      let nextPos = direction === 'left' ? curPos - 200 : curPos + 200;
      scrollableContainer.animate({
        scrollLeft: nextPos
      }, 400);
    },

    //Action triggered when select a domain
    onSelectDomain(domain) {
      let component = this;
      component.sendAction('onSelectDomain', domain);
    },

    //Action triggered when click class view
    onClickClassView() {
      let component = this;
      component.sendAction('onClickClassView');
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {JSON} courseCoverageCount
   */
  courseCoverageCount: Ember.Object.create({
    'mastered': 0,
    'in-progress': 0,
    'not-started': 0
  }),

  /**
   * @property {Array} domainCoverageCount
   */
  domainCoverageCount: null,

  /**
   * @property {Number} totalCompetencies
   */
  totalCompetencies: 0


  // -------------------------------------------------------------------------
  // Methods


});
