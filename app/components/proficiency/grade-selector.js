import Ember from 'ember';
export default Ember.Component.extend({
  classNames: ['grade-selector'],

  isSelectBaseLine: false,

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

  didInsertElement() {
    let component = this;
    Ember.run.schedule('afterRender', component, function() {
      if (component.get('classGrade')) {
        let taxonomyGrades = component.get('taxonomyGrades');
        let classGrade = taxonomyGrades.findBy(
          'id',
          component.get('classGrade')
        );
        if (classGrade) {
          classGrade.set('isClassGrade', true);
          component.send('selectGrade', classGrade);
        }
      }
    });
  },

  actions: {
    selectGrade(grade) {
      let component = this;
      component.set('activeGrade', grade);
      component.sendAction('onSelectGrade', grade);
    },

    onToggleBaseline() {
      let component = this;
      component.toggleProperty('isSelectBaseLine');
      component.sendAction('onToggleBaseline');
    },

    onCloseGrade(grade) {
      let component = this;
      component.set('activeGrade', null);
      component.sendAction('onSelectGrade', grade);
    }
  }
});
