// helper functions

export function getArFromDict(dict) {
  let resultAr = Object.keys(dict).map(id => dict[id]);
  return resultAr;
}