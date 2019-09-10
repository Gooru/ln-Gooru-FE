import Ember from 'ember';

/**
 * @function domainGutToFwTransform
 * Method to return fw info or gut based on params
 */
export function domainGutToFwTransform(params /*, hash*/) {
  const fwDomains = params[0] || [];
  const gutCode = params[1];
  const gutValue = params[2];
  const lookupKeyName = params[3];
  const fwDomain = fwDomains.find(fwDomain => {
    return fwDomain[gutCode];
  });
  return fwDomain ? fwDomain[gutCode][`${lookupKeyName}`] : gutValue;
}

export default Ember.Helper.helper(domainGutToFwTransform);
