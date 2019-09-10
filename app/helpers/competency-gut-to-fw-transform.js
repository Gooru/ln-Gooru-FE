import Ember from 'ember';

/**
 * @function competencyGutToFwTransform
 * Method to return fw info or gut based on params
 */
export function competencyGutToFwTransform(params /*, hash*/) {
  const fwCompetencies = params[0] || [];
  const gutCode = params[1];
  const gutValue = params[2];
  const lookupKeyName = params[3];
  const fwCompetency = fwCompetencies.find(fwCompetency => {
    return fwCompetency[gutCode];
  });
  return fwCompetency ? fwCompetency[gutCode][`${lookupKeyName}`] : gutValue;
}

export default Ember.Helper.helper(competencyGutToFwTransform);
