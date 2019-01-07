import Ember from 'ember';
/**
 * search value
 * @param {object} source1
 * @param {object} searchhash
 */
export function lookupValue(source1, searchhash) {
  let { searchVal, source } = searchhash;

  // console.log('lookup value', searchVal);
  // console.log('lookup source', source);

  let resultObjet =
      source && source.length > 0 ? source.find(c => c[searchVal]) : null,
    result = resultObjet ? Object.values(resultObjet) : null;

  // console.log('lookup result', result);
  return result ? result[0] : result;
}

export default Ember.Helper.helper(lookupValue);
