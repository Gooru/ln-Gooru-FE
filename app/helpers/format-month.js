import Ember from 'ember';
import { parseMonth } from 'gooru-web/utils/utils';

/**
 * Give parse the given month to text
 */
export function formatMonth(params /*, hash*/) {
  return parseMonth(params);
}

export default Ember.Helper.helper(formatMonth);
