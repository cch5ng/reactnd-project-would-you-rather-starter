// helper functions

/*
 * @param {obj} where key is id and value is object; typically format of redux store
 * @return [{obj}, {obj}, ...]
 *
 * Given a dictionary (object), returns the array of objects
 */
export function getArFromDict(dict) {
  let resultAr = Object.keys(dict).map(id => dict[id]);
  return resultAr;
}

/*
 * @param [{obj}, {obj}]; obj like {prop: val, id: mid, ...}
 * @return [{obj}, {obj}]
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
 * @param 
 * @return 
 *
 * 
 */
export function getPrettyQuestion(qid, questionsDict) {
  if (questionsDict && qid) {
    let option1 = questionsDict[qid]['optionOne']['text'];
    let option2 = questionsDict[qid]['optionTwo']['text'];
    return `${option1} OR ${option2}?`
  }
  return
}

/*
 * @param {obj} {question_id: <selected_answer>}
 * @param {obj} {question_id: {question_obj}}
 * @return {ar} [id, id]
 *
 * 
 */
export function getUnansweredQuestions(userAnswers, allQuestions) {
  let unansweredQuestions;
  let answeredSet;
  if (userAnswers) {
    answeredSet = new Set(Object.keys(userAnswers));
  }
  let allQuestionsSet;
  if (allQuestions) {
    allQuestionsSet = new Set(Object.keys(allQuestions));
  }

  if (allQuestionsSet && answeredSet) {
    unansweredQuestions = [...allQuestionsSet].filter(qid => !answeredSet.has(qid))
  }

  return unansweredQuestions;
}

/*
 * @param {int}
 * @param {int}
 *
 * 
 */
export function getPercentVoted(numVotes, totalUsers) {
  return Math.round(numVotes / totalUsers * 100);
}

/*
 * @param {ar} [{user}, ...]
 * @return {ar} [{user}, ...]
 *
 * Given array of users, sorts by number of questions answered (max => min)
 * Did not abstract this with other helpers because need to sort by number of
 * keys for answers object value
 */
export function sortByAnswersCount(ar) {
  ar.sort((a, b) => {
    let bNumAnswers = Object.keys(b.answers).length;
    let aNumAnswers = Object.keys(a.answers).length;
    return bNumAnswers - aNumAnswers;
  });
  return ar;
}
