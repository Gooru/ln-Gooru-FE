import Ember from 'ember';

export function competencyLoTransform(params /*, hash*/ ) {
  const fwCompetencies = params[0] || [];
  const gutCode = params[1];
  const lookupKeyName = params[2];
  const showGutCompetency = params[3];
  const delimiterText = params[4];
  const fwCompetency = fwCompetencies.find(fwCompetency => {
    return fwCompetency[gutCode];
  });
  if (!showGutCompetency && fwCompetency) {
    return `${delimiterText} ${fwCompetency[gutCode][`${lookupKeyName}`]}`;
  }
}

export default Ember.Helper.helper(competencyLoTransform);
