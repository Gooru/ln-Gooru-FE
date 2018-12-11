import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['inspect-competency', 'student-domain-performance'],

  // -------------------------------------------------------------------------
  // Events

  init() {
    this._super(...arguments);
    $(window).on('resize', this.handleResize.bind(this));
  },

  didInsertElement() {
    this.handleResize();
  },

  // -------------------------------------------------------------------------
  // Actions
  actions : {
    // Action triggered when click left/right arrow
    onClickArrow(direction) {
      let component = this;
      let curDeviceVW = window.screen.width;
      let mobilePotraitVW = component.get('mobilePotraitVW');
      if (curDeviceVW <= mobilePotraitVW) {
        component.mobilePotraitScroller(direction);
      } else {
        let scrollableContainer = component.$('.scrollable-container');
        let curPos = scrollableContainer.scrollLeft();
        let nextPos = direction === 'left' ? curPos - 232 : curPos + 232;
        scrollableContainer.animate({
          scrollLeft: nextPos
        }, 400);
      }
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
    },

    //Action triggered when select a student
    onSelectStudent(student) {
      let component = this;
      component.sendAction('onSelectStudent', student);
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
  totalCompetencies: 0,

  /**
   * @property {Number} mobilePotraitVW
   */
  mobilePotraitVW: 639,

  /**
   * @property {Boolean} isMobilePotraitView
   */
  isMobilePotraitView: false,


  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function mobilePotraitScroller
   * Method to handle potrait mode scroller
   */
  mobilePotraitScroller(direction) {
    let component = this;
    const $domainsPerformanceContainer = component.$('.domains-performance-container');
    const $domainsCoverageContainer = component.$('.domains-coverage-container');
    let curDeviceVW = window.screen.width;
    let curPerfPos = $domainsPerformanceContainer.scrollLeft();
    let curCoveragePos = $domainsCoverageContainer.scrollLeft();
    let scrollablePos = curDeviceVW - 142;
    let nextPerfPos = direction === 'left' ? curPerfPos - scrollablePos : curPerfPos + scrollablePos;
    let nextCoveragePos = direction === 'left' ? curCoveragePos - curDeviceVW : curCoveragePos + curDeviceVW;
    $domainsPerformanceContainer.animate({
      scrollLeft: nextPerfPos
    }, 400);
    $domainsCoverageContainer.animate({
      scrollLeft: nextCoveragePos
    }, 400);
  },

  /**
   * @function handleResize
   * Method to handle screen resize events
   */
  handleResize() {
    let component = this;
    let curDeviceVW = window.screen.width;
    let mobilePotraitVW = component.get('mobilePotraitVW');
    component.set('isMobilePotraitView', curDeviceVW <= mobilePotraitVW);
    let scrollableContainer = component.$('.scrollable-container');
    scrollableContainer.animate({
      scrollLeft: 0
    }, 400);
  }

});
