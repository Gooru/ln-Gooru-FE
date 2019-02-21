import Ember from 'ember';
import { SCREEN_SIZES } from 'gooru-web/config/config';
import { isCompatibleVW } from 'gooru-web/utils/utils';
export default Ember.Component.extend({
  classNames: ['grade-selector'],

  /**
   * @property {Boolean}
   * Property to store given screen value is compatible
   */
  isMobileView: isCompatibleVW(SCREEN_SIZES.LARGE),

  showGradeLimit: Ember.computed('isMobileView', function() {
    return this.get('isMobileView') ? 1 : 4;
  }),

  isSelectBaseLine: false,

  onSelectGrades: Ember.observer(
    'taxonomyGrades.@each.checked',
    'isSelectBaseLine',
    function() {
      let component = this;
      let taxonomyGrades = component.get('taxonomyGrades');
      let showGradeLimit = component.get('showGradeLimit');
      let selectedGrades = taxonomyGrades.filterBy('checked', true);
      if (selectedGrades.length < showGradeLimit) {
        component.set('visibleGrades', selectedGrades);
      } else {
        component.set('visibleGrades', selectedGrades.slice(0, showGradeLimit));
        component.set(
          'inVisibleGrades',
          selectedGrades.slice(showGradeLimit, selectedGrades.length)
        );
      }
    }
  ),

  didRender() {
    let component = this;
    component.$('.more').popover({
      html: true,
      trigger: 'hover',
      animation: true,
      placement: 'auto',
      content: () => {
        return component.$('.more-active-grades').html();
      }
    });
  },

  actions: {
    selectGrade(grade) {
      let component = this;
      grade.toggleProperty('checked');
      component.sendAction('onSelectGrade', grade);
    },

    onToggleBaseline() {
      let component = this;
      component.toggleProperty('isSelectBaseLine');
      component.sendAction('onToggleBaseline');
    },

    onCloseGrade(grade) {
      let component = this;
      grade.set('checked', false);
      component.sendAction('onSelectGrade', grade);
    }
  }
});
