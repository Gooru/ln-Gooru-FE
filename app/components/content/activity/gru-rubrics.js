import Ember from 'ember';
import ModalMixin from 'gooru-web/mixins/modal';
import Rubric from 'gooru-web/models/rubric/rubric';
import { RUBRIC_OFF_OPTIONS } from 'gooru-web/config/config';

export default Ember.Component.extend(ModalMixin, {
  /**
   * @property {Service} rubric service
   */
  rubricService: Ember.inject.service('api-sdk/rubric'),

  /**
   * @property {Service} session
   */
  session: Ember.inject.service('session'),

  actions: {
    /**
     * Action to save maxScore
     */
    updateContent: function() {
      this.get('updateContent')(this.get('tempModel'));
    },

    updateQuantity(val) {
      val = parseInt(val);
      if (val >= 0) {
        this.set('tempModel.maxScore', val);
        this.send('updateContent');
      } else {
        this.set('tempModel.maxScore', 0);
      }
    },

    inputTyping(val) {
      val = parseInt(val);
      if (val >= 0) {
        this.set('tempModel.maxScore', val);
      } else {
        this.set('tempModel.maxScore', 0);
      }
    },

    cancelChanges: function() {
      let maxScore = this.get('activityModel').maxScore;
      this.set('tempModel.maxScore', maxScore);
    },
    /**
     * Show modal with rubrics to choose one and associate it to the OA
     */
    showAddRubricModal: function(rubricsFor) {
      let component = this;
      const userId = component.get('session.userId');

      return component
        .get('rubricService')
        .getUserRubrics(userId)
        .then(function(rubrics) {
          return {
            oaId: component.get('tempModel.id'),
            userId,
            rubrics,
            rubricsFor: rubricsFor,
            callback: {
              success: function(oaRubric) {
                if (rubricsFor === 'teacher') {
                  component.teacherSuccessRubricCB(oaRubric);
                } else {
                  component.studentSuccessRubricCB(oaRubric);
                }
              }
            }
          };
        })
        .then(model =>
          component.send(
            'showModal',
            'content.modals.gru-add-rubric-to-oa',
            model,
            null,
            null
          )
        );
    },

    /**
     * Action after selecting an option for maximum points
     */
    onMaxScoreChange: function(newValue) {
      this.set('tempModel.maxScore', parseInt(newValue));
    },
    /**
     * Route to Rubric  edit with backurl in query params.
     */
    rubricEdit: function(rubricsId) {
      let queryParams = {
        backUrl: this.get('router.url')
      };
      this.get('router').transitionTo('content.rubric.edit', rubricsId, {
        queryParams
      });
    }
  },

  teacherSuccessRubricCB(oaRubric) {
    const component = this;
    if (component.get('isTeacherRubrics') && component.get('teacherRubrics')) {
      component.get('teacherRubrics').set('title', oaRubric.SourceRubric.title);
      component.get('teacherRubrics').set('id', oaRubric.NewRubricId);
    } else {
      let teacherRubric = Rubric.create(
        Ember.getOwner(component).ownerInjection(),
        {
          title: oaRubric.SourceRubric.title,
          id: oaRubric.NewRubricId,
          grader: 'Teacher'
        }
      );
      let rubric = Ember.A([teacherRubric]);
      component.set('tempModel.rubric', rubric);
      //Over writing as there cannot be student rubric before a teacher rubric
    }
  },

  studentSuccessRubricCB(oaRubric) {
    const component = this;
    if (component.get('isStudentRubrics') && component.get('studentRubrics')) {
      component.get('studentRubrics').set('title', oaRubric.SourceRubric.title);
      component.get('studentRubrics').set('id', oaRubric.NewRubricId);
    } else {
      let studentRubric = Rubric.create(
        Ember.getOwner(component).ownerInjection(),
        {
          title: oaRubric.SourceRubric.title,
          id: oaRubric.NewRubricId,
          grader: 'Self'
        }
      );
      let teacherRubric = component.get('teacherRubrics');
      let rubric = Ember.A([teacherRubric, studentRubric]);
      component.set('tempModel.rubric', rubric);
    }
  },
  isTeacherRubrics: function() {
    if (
      this.get('tempModel.rubric') &&
      this.get('tempModel.rubric').findBy('grader', 'Teacher')
    ) {
      let teachRubrics = this.get('tempModel.rubric').findBy(
        'grader',
        'Teacher'
      );
      return teachRubrics;
    }
  }.property('tempModel.rubric'),

  teacherRubrics: function() {
    if (
      this.get('tempModel.rubric') &&
      this.get('tempModel.rubric').findBy('grader', 'Teacher')
    ) {
      let teachRubrics = this.get('tempModel.rubric').findBy(
        'grader',
        'Teacher'
      );
      return teachRubrics;
    }
  }.property('tempModel.rubric'),

  isStudentRubrics: function() {
    if (
      this.get('tempModel.rubric') &&
      this.get('tempModel.rubric').findBy('grader', 'Self')
    ) {
      let teachRubrics = this.get('tempModel.rubric').findBy('grader', 'Self');
      return teachRubrics;
    }
  }.property('tempModel.rubric'),

  studentRubrics: function() {
    if (
      this.get('tempModel.rubric') &&
      this.get('tempModel.rubric').findBy('grader', 'Self')
    ) {
      let teachRubrics = this.get('tempModel.rubric').findBy('grader', 'Self');
      return teachRubrics;
    }
  }.property('tempModel.rubric'),

  /**
   * Toggle Options for the Advanced Edit button
   * @property {Ember.Array}
   */
  switchOptions: Ember.A([
    Ember.Object.create({
      label: 'Yes',
      value: true
    }),
    Ember.Object.create({
      label: 'No',
      value: false
    })
  ]),
  /**
   * Options for maximum points
   * @property {Array}
   */
  maximumOptions: Ember.computed(function() {
    let options = [];
    for (let i = 1; i <= RUBRIC_OFF_OPTIONS.MAX_SCORE; i += 1) {
      options.push({
        id: i,
        name: i
      });
    }
    return options;
  })
});
