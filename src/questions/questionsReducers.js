import { REQUEST_QUESTIONS, RECEIVE_QUESTIONS } from '../questions/questionsActions';

const initStateQuestions = {
  questions: {}
}

export function questions(state = initStateQuestions, action) {
  switch(action.type) {
    case REQUEST_QUESTIONS:
      return {
        ...state,
        isRetrieving: action.isRetrieving,
      }
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        questions: action.questions,
      }
    default:
      return state
  }
}
