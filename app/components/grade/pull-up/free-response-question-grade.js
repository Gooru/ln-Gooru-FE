import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {RubricService} Service to retrieve rubric information
   */
  rubricService: Ember.inject.service('api-sdk/rubric'),

  /**
   * @type {ProfileService} Service to retrieve profile information
   */
  profileService: Ember.inject.service('api-sdk/profile'),

  /**
   * @type {ProfileService} Service to retrieve question information
   */
  questionService: Ember.inject.service('api-sdk/question'),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['grade', 'backdrop-pull-ups', 'free-response-question-grade'],

  // -------------------------------------------------------------------------
  // Events

  /**
   * Function to triggered once when the component element is first rendered.
   */
  didInsertElement() {
    this.openPullUp();
    this.loadData();
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * ClassId belongs to this FRQ grade item.
   * @type {String}
   */
  classId: Ember.computed.alias('context.classId'),

  /**
   * CourseId belongs to this FRQ grade item.
   * @type {String}
   */
  courseId: Ember.computed.alias('context.courseId'),

  /**
   * Unit belongs to this FRQ grade item.
   * @type {Object}
   */
  unit: Ember.computed.alias('context.unit'),

  /**
   * Lesson belongs to this FRQ grade item.
   * @type {Object}
   */
  lesson: Ember.computed.alias('context.lesson'),

  /**
   * Collection of this FRQ grade item.
   * @type {Object}
   */
  collection: Ember.computed.alias('context.collection'),

  /**
   * Question of this FRQ grade item.
   * @type {Object}
   */
  question: Ember.computed.alias('context.question'),

  /**
   * Propery to hide the default pullup.
   * @property {Boolean}
   */
  showPullUp: false,

  /**
   * It maintains the state of loading
   * @type {Boolean}
   */
  isLoading: false,

  /**
   * List of users who need grading
   * @type {Array}
   */
  users: Ember.A([]),

  /**
   *  Rubric which is associated with question
   * @type {Object}
   */
  rubric: null,

  /**
   * Answer data provided by the users
   * @type {Object}
   */
  answer: null,

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered when the user invoke the pull up.
     **/
    onPullUpClose(closeAll) {
      this.closePullUp(closeAll);
    }
  },

  //--------------------------------------------------------------------------
  // Methods

  loadData() {
    let component = this;
    let classId = component.get('classId');
    let courseId = component.get('courseId');
    let unitId = component.get('unitId');
    let lessonId = component.get('lessonId');
    let collectionId = component.get('collection.id');
    let questionId = component.get('question.id');
    return Ember.RSVP.hash({
      question: this.get('questionService').readQuestion(questionId),
      users: this.get('rubricService').getStudentsForQuestion(
        questionId,
        classId,
        courseId,
        collectionId
      )
    })
      .then(({ users, question }) => {
        component.set('question', question);
        if (users.get('students') && users.get('students').length) {
          const studentId = users.get('students.firstObject');

          return Ember.RSVP.hash({
            answer: this.get('rubricService').getAnswerToGrade(
              studentId,
              classId,
              courseId,
              collectionId,
              questionId,
              unitId,
              lessonId
            ),
            rubric: question.get('rubric.id')
              ? this.get('rubricService').getRubric(question.get('rubric.id'))
              : null,
            userIds: users.get('students'),
            users: this.get('profileService').readMultipleProfiles(
              users.get('students')
            ),
            currentUserId: studentId,
            classId,
            questionId,
            courseId,
            collectionId,
            unitId,
            lessonId
          });
        }
      })
      .then(({ users, rubric, answer }) => {
        component.set('users', users);
        component.set('rubric', rubric);
        component.set('answer', answer);
      });
  },

  /**
   * Function to animate the  pullup from bottom to top
   */
  openPullUp() {
    let component = this;
    component.$().animate(
      {
        top: '10%'
      },
      400
    );
  },

  closePullUp(closeAll) {
    let component = this;
    component.$().animate(
      {
        top: '100%'
      },
      400,
      function() {
        component.set('showPullUp', false);
        if (closeAll) {
          component.sendAction('onClosePullUp');
        }
      }
    );
  }
});
