import Ember from 'ember';

/**
 * Taxonomy Item
 *
 * @typedef {Object} TaxonomyItem
 */
export default Ember.Object.extend({

  /**
   * @property {TaxonomyItem[]} children - List of item's children
   */
  children: [],

  /**
   * @property {string} id - Item ID
   */
  id: null,

  /**
   * @property {boolean} isSelected - If this item has been selected or not.
   */
  isSelected: false,

  /**
   * @property {string} label - Text label for this item
   */
  label: null,

  /**
   * @property {Number} level - Depth of the item in the tree. Level values start at 1.
   */
  level: 1,

  /**
   * @property {TaxonomyItem} parent - Parent item or null if this is node is at the root of the tree.
   */
  parent: null,


  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function Calculate an array with the path to this item
   * @example
   * ["grandparent-id", "parent-id", "item-id"]
   * @return {String[]}
   */
  getPath: function() {
    var path = new Array(this.get('level'));
    this.constructPath(path);
    return path;
  },

  constructPath: function(resultArray) {
    var level = this.get('level');
    var parent = this.get('parent');

    resultArray[level - 1] = this.get('id');
    if (parent) {
      parent.constructPath(resultArray);
    }
  },

  /**
   * @function Find a taxonomy item by traversing down
   * a taxonomy item tree.
   * @return {TaxonomyItem | Null}
   */
  find: function(path) {
    var result = null;

    if (path && path.length) {
      let pathId = path[0];

      if (this.get('id') === pathId) {
        if (path.length === 1) {
          // This is it! There are no more elements in the path.
          result = this;
        } else {
          let children = this.get('children');
          for(let i = children.length - 1; i >= 0; --i) {
            result = children[i].find(path.slice(1));
            if (result) { break; }
          }
        }
      }
    }

    return result;
  }

});
