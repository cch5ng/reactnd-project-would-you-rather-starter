import { REQUEST_QUESTIONS, RECEIVE_QUESTIONS, REQUEST_ANSWER_UPDATE,
RECEIVE_ANSWER_UPDATE } from '../questions/questionsActions';

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
        isRetrieving: action.isRetrieving,
        questions: action.questions,
      }
    case REQUEST_ANSWER_UPDATE:
      return {
        ...state,
        isRetrieving: action.isRetrieving,
      }
    case RECEIVE_ANSWER_UPDATE:
      // TODO 041118 test this worked
      return {
        ...state,
        isRetrieving: action.isRetrieving,
        questions: {...state.questions,
          [action.qid]: {
            ...state.questions[action.qid],
            [action.answer]: {
              ...state.questions[action.qid][action.answer],
              votes: state.questions[action.qid][action.answer].votes.concat([action.authedUser])
          }
        }
        },
      }
    default:
      return state
  }
}
