import { _getUsers } from '../_DATA';

// sync actions for getting users
export const REQUEST_USERS = 'REQUEST_USERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';

export function requestUsers() {
  return {
    type: REQUEST_USERS,
    isRetrieving: true
  }
}

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    isRetrieving: false,
    users
  }
}

export const fetchUsers = () => dispatch => {
  dispatch(requestUsers());

  // note that this pattern is not universal to all react/redux apps because of
  // the one-off nature of the _DATA.js file (normally would use body.json())
  return _getUsers()
          .then(data => dispatch(receiveUsers(data)));
}
