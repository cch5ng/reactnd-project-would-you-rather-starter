import { _getQuestions, _saveQuestionAnswer } from '../_DATA';

// sync actions for getting questions
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';

export function requestQuestions() {
  return {
    type: REQUEST_QUESTIONS,
    isRetrieving: true
  }
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    isRetrieving: false,
    questions
  }
}

export const fetchQuestions = () => dispatch => {
  dispatch(requestQuestions());

  // note that this pattern is not universal to all react/redux apps because of
  // the one-off nature of the _DATA.js file (normally would use body.json())
  return _getQuestions()
          .then(data => dispatch(receiveQuestions(data)));
}

// sync actions for updating question answers
export const REQUEST_ANSWER_UPDATE = 'REQUEST_ANSWER_UPDATE';
export const RECEIVE_ANSWER_UPDATE = 'RECEIVE_ANSWER_UPDATE';

export function requestAnswerUpdate() {
  return {
    type: REQUEST_ANSWER_UPDATE,
    isRetrieving: true
  }
}

export function receiveAnswerUpdate(authedUser, qid, answer) {
  console.log('authedUser: ' + authedUser);

  return {
    type: RECEIVE_ANSWER_UPDATE,
    isRetrieving: false,
    authedUser,
    qid,
    answer
  }
}

export const updateAnswer = (authedUser, qid, answer) => dispatch => {
  dispatch(requestAnswerUpdate());
  let paramsObj = {authedUser, qid, answer};

  // note that this pattern is not universal to all react/redux apps because of
  // the one-off nature of the _DATA.js file (normally would use body.json())
  _saveQuestionAnswer(paramsObj);
  dispatch(receiveAnswerUpdate(authedUser, qid, answer));
}
