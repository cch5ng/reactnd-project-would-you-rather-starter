// sync actions for login
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'
export const RECEIVE_LOGOUT = 'RECEIVE_LOGOUT'

export function receiveLogin() {
  return {
    type: RECEIVE_LOGIN,
    isLoggedIn: true
  }
}

export function receiveLogout() {
  return {
    type: RECEIVE_LOGOUT,
    isLoggedIn: false
  }
}
