import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../_DATA';

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

// sync actions for saving a new question
export const REQUEST_SAVE_QUESTION = 'REQUEST_SAVE_QUESTION';
export const RECEIVE_SAVE_QUESTION = 'RECEIVE_SAVE_QUESTION';

export function requestSaveQuestion() {
  return {
    type: REQUEST_SAVE_QUESTION,
    isRetrieving: true
  }
}

export function receiveSaveQuestion(question) {
  return {
    type: RECEIVE_SAVE_QUESTION,
    isRetrieving: false,
    question
  }
}

export const saveQuestion = ({optionOneText, optionTwoText, author}) => dispatch => {
  dispatch(requestSaveQuestion());

  // note that this pattern is not universal to all react/redux apps because of
  // the one-off nature of the _DATA.js file (normally would use body.json())
  return _saveQuestion({optionOneText, optionTwoText, author})
    .then((resp) => dispatch(receiveSaveQuestion(resp))
    )}
