// helper functions

export function getArFromDict(dict) {
  let resultAr = Object.keys(dict).map(id => dict[id]);
  return resultAr;
}

/*
 * @param
 * @return
 *
 * Given an array and property, returns the sorted array by property (max => min)
 */
export function sortByPropertyDesc(ar, prop) {
  ar.sort((a, b) => {
    return b[prop] - a[prop];
  })

  return ar;
}

/*
 * @param
 * @return
 *
 * Given an array and property, returns the sorted array by property (min => max)
 */
export function sortByPropertyAsc(ar, prop) {
  ar.sort((a, b) => {
    return a[prop] - b[prop];
  })

  return ar;
}


export function getPrettyQuestion(qid, questionsDict) {
  if (questionsDict && qid) {
    let option1 = questionsDict[qid]['optionOne']['text'];
    let option2 = questionsDict[qid]['optionTwo']['text'];
    return `${option1} OR ${option2}?`
  }
  return
}
