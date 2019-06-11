import Ember from 'ember';
import { getGradeColor } from 'gooru-web/utils/utils';
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['rubric-category-container'],

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Maintains the state of the read or write mode.
   * @type {Boolean}
   */
  isReadOnly: false,

  // -------------------------------------------------------------------------
  // Events

  /**
   * Function to triggered once when the component element is after rendered
   */
  didRender() {
    this._super(...arguments);
    let component = this;
    component.setupTooltip();
    if (component.get('isReadOnly')) {
      component.disableClickEvent();
    }
  },

  actions: {
    /**
     * Action get triggered when comment icon got toggle.
     */
    onShowAddCommentBox(categoryIndex) {
      let component = this;
      let element = component.$(`#grade-rubric-category-${categoryIndex}`);
      if (element.hasClass('comment-active')) {
        element.find('.grade-comment-section').slideUp(400, function() {
          element.removeClass('comment-active');
        });
      } else {
        element.find('.grade-comment-section').slideDown(400, function() {
          element.addClass('comment-active');
        });
      }
    },

    /**
     * Action triggered when clear the category level choosen
     * @param  {Object} category
     */
    unSelectCategoryLevel(category) {
      category.set('scoreInPrecentage', null);
      let levels = category.get('levels');
      if (levels && levels.length > 0) {
        levels.findBy('selected', true).set('selected', false);
      }
      category.set('selected', false);
    }
  },

  disableClickEvent() {
    let component = this;
    component.$('.grade-info-popover').off('click');
  },

  setupTooltip() {
    let component = this;
    let categories = component.get('categories');
    component.$('.grade-info-popover').popover({
      placement: 'top auto',
      container: 'body',
      trigger: 'manual'
    });
    let isMobile = window.matchMedia('only screen and (max-width: 768px)');
    if (isMobile.matches) {
      component.$('.close-popover').click(function() {
        component.$('.grade-info-popover').popover('hide');
      });
    }
    component.$('.grade-info-popover').on('click', function() {
      let levelIndex = component.$(this).data('level');
      let categoryIndex = component.$(this).data('category');
      let category = categories.objectAt(categoryIndex);
      let level = category.get('levels').objectAt(levelIndex);
      category.get('levels').map(level => {
        level.set('selected', false);
      });
      level.set('selected', true);
      let totalPoints = category.get('totalPoints');
      let scoreInPrecentage = Math.floor(
        (level.get('score') / totalPoints) * 100
      );
      category.set('scoreInPrecentage', scoreInPrecentage);
      category.set('selected', true);
      if (isMobile.matches) {
        component
          .$('.grade-info-popover')
          .not(this)
          .popover('hide');
        component.$(this).popover('show');
        Ember.$('.popover-title')
          .append('<span class="close-popover">x</span>')
          .css('background-color', getGradeColor(scoreInPrecentage));
      }
    });
    if (!isMobile.matches) {
      component.$('.grade-info-popover').on('mouseleave', function() {
        $(this).popover('hide');
      });
      component.$('.grade-info-popover').on('mouseenter', function() {
        let levelIndex = component.$(this).data('level');
        let categoryIndex = component.$(this).data('category');
        let category = categories.objectAt(categoryIndex);
        let totalPoints = category.get('totalPoints');
        let level = category.get('levels').objectAt(levelIndex);
        $(this).popover('show');
        if (category.get('allowsScoring')) {
          let scoreInPrecentage = Math.floor(
            (level.get('score') / totalPoints) * 100
          );
          Ember.$('.popover-title').css(
            'background-color',
            getGradeColor(scoreInPrecentage)
          );
        } else {
          Ember.$('.popover-title').hide();
        }
      });
    }
  }
});
