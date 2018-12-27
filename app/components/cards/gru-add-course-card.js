import Ember from 'ember';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import { PLAYER_WINDOW_NAME, PLAYER_EVENT_SOURCE } from 'gooru-web/config/config';
import { getEndpointUrl } from 'gooru-web/utils/endpoint-config';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['add-course', 'featured-course-card'],

  // -------------------------------------------------------------------------
  // Events
  didRender() {
    var component = this;
    component.$('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });
  },

  actions: {
    onPlayCourse(courseId) {
      let playerURL = `${getEndpointUrl()}/content/courses/play/${courseId}?source=${
        PLAYER_EVENT_SOURCE.RGO
      }`;
      window.open(playerURL, PLAYER_WINDOW_NAME);
    },

    onAddCourse(courseId) {
      let component = this;
      component.sendAction('onAddCourse', courseId);
    },

    onRemixCourse(courseId) {
      let component = this;
      component.sendAction('onRemixCourse', courseId);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * course object
   * @type {Object}
   */
  course: null,

  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  tags: Ember.computed('course.taxonomy.[]', function() {
    return TaxonomyTag.getTaxonomyTags(this.get('course.taxonomy'));
  }),


  isPremiumCourse: Ember.computed('course', function() {
    let controller = this;
    let course = controller.get('course');
    let courseVersion = course.version;
    return courseVersion === 'premium';
  })
});
