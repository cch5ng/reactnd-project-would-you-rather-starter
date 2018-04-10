import { _getQuestions } from '../_DATA';

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
