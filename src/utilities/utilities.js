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

export function getPrettyQuestion(qid, questionsDict) {
  if (questionsDict && qid) {
    let option1 = questionsDict[qid]['optionOne']['text'];
    let option2 = questionsDict[qid]['optionTwo']['text'];
    return `${option1} OR ${option2}?`
  }
  return
}

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

export function getPercentVoted(numVotes, totalUsers) {
  return numVotes / totalUsers * 100;
}
