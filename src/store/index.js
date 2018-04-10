import { combineReducers } from 'redux';
import { login } from '../login/loginReducers';
import { users } from '../users/usersReducers';
import { questions } from '../questions/questionsReducers';

export default combineReducers({
  login,
  users,
  questions,
});
