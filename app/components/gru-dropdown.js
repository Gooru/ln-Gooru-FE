import Ember from 'ember';

/**
 * @typedef {object} GruDropdown
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {DropdownItem[]} dropdown items
   */
  items: Ember.A(),

  /**
   * @property {string} dropdown placeholder
   */
  placeholder: 'Select items',

  /**
   * @property {string} dropdown display field key, default value label
   */
  displayLabelFieldKey: 'label',

  /**
   * @property {Boolean} this will allow to render data based on range selection
   */
  allowItemsRangeSelection: false,

  /**
   * Based on range bound values will get render, For Example: If it's  "Lower", it will fetch the lower value's data set
   * @type {String}
   */
  rangeBound: 'lower',

  /**
   * @property {string} dropdown prompt
   */
  prompt: null,

  /**
   * Indicates if the dropdown should be split or not
   * @property {bool}
   */
  split: false,

  /**
   * Indicates if the dropdown should display the selected items text
   * @property {bool}
   */
  showSelection: true,

  /**
   *
   * @property {string} size class
   * @see bootstrap button dropdown
   */
  'btn-group-size': 'btn-group-lg',

  /**
   * @property {string} button type class
   */
  'btn-type': 'btn-default',

  /**
   * This is triggered when the drop down selection changes
   * @property {string} on selection action
   */
  onChangeAction: null,

  /**
   * It maintains the selected item id
   * @type {String}
   */
  selectedItemId: null,

  /**
   * It maintains the selected item key
   * @type {String}
   */
  selectedItemKey: 'id',

  /**
   * @property {string} selection text
   */
  selectedText: function() {
    const component = this,
      selectedItem = component.get('selectedItem'),
      showSelection = component.get('showSelection'),
      displayLabelFieldKey = component.get('displayLabelFieldKey');
    return showSelection && selectedItem
      ? selectedItem.get(displayLabelFieldKey)
      : component.get('placeholder');
  }.property('selectedItem'),

  /**
   * Maintains the value selected item association key.
   * @type {String}
   */
  selectedItemAssocId: null,

  /**
   * Maintains state of dropdown is editable ot not
   * @type {Boolean}
   */
  allowEdit: true,

  // -------------------------------------------------------------------------
  // Events

  /**
   * DidInsertElement ember event
   */
  didInsertElement: function() {
    this._super(...arguments);
    const component = this,
      element = component.$(component.get('element'));

    var count = -1;
    element.find('.keep-open-yes').on({
      click: function(e) {
        const $target = component.$(e.target);
        if ($target.hasClass('item') || $target.hasClass('no-close')) {
          count = 2; // the hide event is called twice per click
        }
      },

      'hide.bs.dropdown': function() {
        count -= 1;
        return count < 0;
      }
    });
    this.renderDataBasedOnRangeSelection();
    this.chooseSelectedItem();
  },

  /**
   * willDestroyElement event
   */
  willDestroyElement: function() {
    const component = this,
      element = component.$(component.get('element'));
    element.find('.keep-open-yes').off('click', 'hide.bs.dropdown');
  },

  // -------------------------------------------------------------------------
  // Observers

  /**
   * This will observer the range slection field value and render data based on it.
   */
  onChangeRange: Ember.observer('selectedItemId', function() {
    this.renderDataBasedOnRangeSelection();
  }),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * When an items is selected
     * @param {DropdownItem} item
     */
    onItemSelected: function(item) {
      const component = this;
      component.set('selectedItem', item);
      if (component.get('onChangeAction')) {
        component.sendAction(
          'onChangeAction',
          component.get('selectedItem'),
          component.get('selectedItemAssocId')
        );
      }
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  renderDataBasedOnRangeSelection() {
    let component = this;
    let items = component.get('items');
    component.set('displayItems', items);
    let allowItemsRangeSelection = component.get('allowItemsRangeSelection');
    if (allowItemsRangeSelection) {
      let rangeSelectionFieldKey = component.get('selectedItemKey');
      let rangeSelectionFieldValue = component.get('selectedItemId');
      let rangeBound = component.get('rangeBound');

      let rangeSelectionItem = items.findBy(
        rangeSelectionFieldKey,
        rangeSelectionFieldValue
      );
      if (rangeSelectionItem) {
        let rangeSelectionItems = Ember.A();
        let rangeSelectionIndex = items.indexOf(rangeSelectionItem);
        if (rangeBound === 'upper') {
          rangeSelectionItems = items.slice(rangeSelectionIndex);
        } else {
          rangeSelectionItems = items.slice(0, rangeSelectionIndex + 1);
        }
        component.set('displayItems', rangeSelectionItems);
      }
    }
  },

  chooseSelectedItem() {
    let component = this;
    let selectedItemId = component.get('selectedItemId');
    if (selectedItemId) {
      let selectedItemKey = component.get('selectedItemKey');
      let selectedItem = component
        .get('items')
        .findBy(selectedItemKey, selectedItemId);
      component.set('selectedItem', selectedItem);
    }
  }
});
