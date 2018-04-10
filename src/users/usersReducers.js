import { REQUEST_USERS, RECEIVE_USERS } from '../users/usersActions';

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
    default:
      return state
  }
}
