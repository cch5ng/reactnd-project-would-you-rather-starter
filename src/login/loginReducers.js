import { RECEIVE_LOGIN, RECEIVE_LOGOUT } from '../login/loginActions';

const initStateLogin = {
  isLoggedIn: false,
  loggedInId: null,
}

export function login(state = initStateLogin, action) {
  switch(action.type) {
    case RECEIVE_LOGIN:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
        loggedInId: action.loggedInId,
      }
    case RECEIVE_LOGOUT:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
        loggedInId: action.loggedInId,
      }
    default:
      return state
  }
}
