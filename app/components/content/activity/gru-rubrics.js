import Ember from 'ember';
import ModalMixin from 'gooru-web/mixins/modal';
import Rubric from 'gooru-web/models/rubric/rubric';

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
              success: function(/* rubricAssociated */) {
                return true;
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
     * Route to Rubric  edit with backurl in query params.
     */
    rubricEdit: function(rubricsId) {
      let queryParams = {
        backUrl: this.get('router.url')
      };
      this.get('router').transitionTo('content.rubric.edit', rubricsId, {
        queryParams
      });
    },
    /**
     * Disassociates the rubric from the question
     */
    removeRubric: function(associatedRubricId) {
      let component = this;
      let tempModel = component.get('tempModel');
      let rubric = Rubric.create(Ember.getOwner(this).ownerInjection(), {
        increment: 0.5,
        maxScore: 1
      });

      component
        .get('rubricService')
        .deleteRubric(associatedRubricId)
        .then(function() {
          component.set('model.rubric', null);
          tempModel.set('rubric', rubric);

          component.setProperties({
            isPanelExpanded: true,
            isEditingInline: true,
            isEditingNarration: false,
            editImagePicker: false
          });
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
  }.property(),

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
  }.property(),

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
  ])
});
