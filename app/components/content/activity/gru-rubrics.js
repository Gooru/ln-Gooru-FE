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
                if (
                  component.get('isTeacherRubrics') &&
                  component.get('teacherRubrics')
                ) {
                  component
                    .get('teacherRubrics')
                    .set('title', oaRubric.SourceRubric.title);
                  component
                    .get('teacherRubrics')
                    .set('id', oaRubric.NewRubricId);
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

  /**
   * Toggle Options for the Advanced Edit button
   * @property {Ember.Array}
   */
  switchOptions: Ember.A([
    Ember.Object.create({
      label: 'On',
      value: true
    }),
    Ember.Object.create({
      label: 'Off',
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
