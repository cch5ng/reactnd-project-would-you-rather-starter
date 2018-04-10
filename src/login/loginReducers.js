import { RECEIVE_LOGIN, RECEIVE_LOGOUT } from '../login/loginActions';

const initStateLogin = {
  isLoggedIn: false
}

export function login(state = initStateLogin, action) {
  switch(action.type) {
    case RECEIVE_LOGIN:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      }
    case RECEIVE_LOGOUT:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      }
    default:
      return state
  }
}
