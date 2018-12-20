import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['student-inspect-destination-xs'],

  classNameBindings: ['type'],

  actions: {
    onClosePullUp() {
      let component = this;
      component.closePullUp();
    },

    onOpenPullUp() {
      let component = this;
      component.openPullUp();
    },

    /**
     * Action triggered when move to next screen
     */
    onMoveNext(curStep) {
      let component = this;
      component.sendAction('onMoveNext', curStep);
    },

    /**
     * Action triggered when toggle route0 course-map view expanded/collapsed
     */
    onToggleRoute0View() {
      let component = this;
      component.sendAction('onToggleRoute0View');
    },

    /**
     * Action triggered when accept route0 suggestion
     */
    onRoute0Accept() {
      let component = this;
      component.sendAction('onRoute0Accept');
    },

    /**
     * Action triggered when reject route0 suggestion
     */
    onRoute0Reject() {
      let component = this;
      component.sendAction('onRoute0Reject');
    }
  },

  openPullUp() {
    let component = this;
    if (!component.get('isExpanded')) {
      component.$().animate(
        {
          top: '10%'
        },
        400,
        function() {
          component.set('isExpanded', true);
        }
      );
    }
  },

  closePullUp() {
    let component = this;
    component.$().animate(
      {
        top: '90%'
      },
      400,
      function() {
        component.set('isExpanded', false);
      }
    );
  },

  didInsertElement() {
    if (this.type === 'route') {
      this.openPullUp();
    }
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Boolean} isExpanded
   */
  isExpanded: false,

  /**
   * @property {JSON} activeGrade
   */
  grade: null,

  /**
   * @property {Boolean} isRoute0
   */
  isRoute0: false
});
