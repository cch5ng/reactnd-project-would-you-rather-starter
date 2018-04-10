import { combineReducers } from 'redux';
import { login } from '../login/loginReducers';
import { users } from '../users/usersReducers';

export default combineReducers({
  login,
  users,
});
