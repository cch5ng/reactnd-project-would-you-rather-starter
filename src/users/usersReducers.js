import { REQUEST_USERS, RECEIVE_USERS } from '../users/usersActions';
import { REQUEST_ANSWER_UPDATE, RECEIVE_ANSWER_UPDATE, RECEIVE_SAVE_QUESTION
 } from '../questions/questionsActions';

const initStateUsers = {
  users: {}
}

export function users(state = initStateUsers, action) {
  switch(action.type) {
    case REQUEST_USERS:
      return {
        ...state,
        isRetrieving: action.isRetrieving,
      }
    case RECEIVE_USERS:
      return {
        ...state,
        users: action.users,
      }
    case RECEIVE_ANSWER_UPDATE:
      // TODO test 041118 that this worked
      return {
        ...state,
        users: {
          ...state.users,
          [action.authedUser]: {
            ...state.users[action.authedUser],
            answers: {
              ...state.users[action.authedUser].answers,
              [action.qid]: action.answer
            }
          }
        }
      }
    case RECEIVE_SAVE_QUESTION:
      let uid = action.question.author;
      return {
        ...state,
        users: {
          ...state.users,
          [uid]: {
            ...state.users[uid],
            questions: (state.users[uid]['questions']).concat(action.question.id)
          }
        }
      }

    default:
      return state
  }
}
